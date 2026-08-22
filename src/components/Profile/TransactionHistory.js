import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    Modal,
    StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { switchProfilPageAction } from '../../navigations/rootNavigation';
import { transactionstyle } from '../../assets/styles/transactionhistory';
import { styles } from '../../assets/styles';
import { COLORS } from '../../assets/styles/theme';

class TransactionHistory extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            filteredTransactions: [],
            selectedMonth: 'all',
            selectedPaymentMethod: 'all',
            selectedStatus: 'all',
            minAmount: '',
            maxAmount: '',
            searchQuery: '',
            showFilterModal: false,
            scrollY: new Animated.Value(0),
            months: [
                { id: 'all', name: 'Tous' },
                { id: '01', name: 'Janvier' },
                { id: '02', name: 'Février' },
                { id: '03', name: 'Mars' },
                { id: '04', name: 'Avril' },
                { id: '05', name: 'Mai' },
                { id: '06', name: 'Juin' },
                { id: '07', name: 'Juillet' },
                { id: '08', name: 'Août' },
                { id: '09', name: 'Septembre' },
                { id: '10', name: 'Octobre' },
                { id: '11', name: 'Novembre' },
                { id: '12', name: 'Décembre' },
            ],
            paymentMethods: [
                { id: 'all', name: 'Tous', icon: 'credit-card-outline' },
                { id: 'carte', name: 'Carte bancaire', icon: 'credit-card-outline' },
                { id: 'especes', name: 'Espèces', icon: 'cash' },
                { id: 'virement', name: 'Virement', icon: 'bank-outline' },
                { id: 'cheque', name: 'Chèque', icon: 'file-document-outline' },
                { id: 'mobile', name: 'Mobile Money', icon: 'cellphone-check' },
            ],
            statusOptions: [
                { id: 'all', name: 'Tous' },
                { id: 'completed', name: 'Payé' },
                { id: 'pending', name: 'En attente' },
            ],
            activeFiltersCount: 0,
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this.loadTransactions();
    }

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    loadTransactions = () => {
        const mockData = [
            {
                id: '1',
                childName: 'Emma Martin',
                className: 'CP - Section A',
                amount: 150000,
                paymentMethod: 'carte',
                date: '2026-04-15',
                time: '14:30:25',
                status: 'completed',
                transactionId: 'TXN-001-2026',
                description: 'Frais de scolarité - 2ème trimestre',
            },
            {
                id: '2',
                childName: 'Lucas Bernard',
                className: 'CM2 - Section B',
                amount: 125000,
                paymentMethod: 'virement',
                date: '2026-04-10',
                time: '09:15:42',
                status: 'completed',
                transactionId: 'TXN-002-2026',
                description: 'Frais de scolarité + Activités',
            },
            {
                id: '3',
                childName: 'Emma Martin',
                className: 'CP - Section A',
                amount: 50000,
                paymentMethod: 'especes',
                date: '2026-03-28',
                time: '16:45:10',
                status: 'completed',
                transactionId: 'TXN-003-2026',
                description: 'Sortie scolaire',
            },
            {
                id: '4',
                childName: 'Chloé Dubois',
                className: '6ème - Section A',
                amount: 175000,
                paymentMethod: 'cheque',
                date: '2026-03-20',
                time: '11:20:33',
                status: 'pending',
                transactionId: 'TXN-004-2026',
                description: 'Frais de scolarité - 2ème trimestre',
            },
            {
                id: '5',
                childName: 'Lucas Bernard',
                className: 'CM2 - Section B',
                amount: 75000,
                paymentMethod: 'mobile',
                date: '2026-03-15',
                time: '08:55:18',
                status: 'completed',
                transactionId: 'TXN-005-2026',
                description: 'Activités sportives',
            },
        ];

        this.setState({
            transactions: mockData,
            filteredTransactions: mockData,
        });
    };

    updateActiveFiltersCount = () => {
        const { selectedMonth, selectedPaymentMethod, selectedStatus, minAmount, maxAmount, searchQuery } = this.state;
        let count = 0;
        if (selectedMonth !== 'all') count++;
        if (selectedPaymentMethod !== 'all') count++;
        if (selectedStatus !== 'all') count++;
        if (minAmount && minAmount !== '') count++;
        if (maxAmount && maxAmount !== '') count++;
        if (searchQuery && searchQuery !== '') count++;
        this.setState({ activeFiltersCount: count });
    };

    performSearch = () => {
        const { transactions, selectedMonth, selectedPaymentMethod, selectedStatus, minAmount, maxAmount, searchQuery } = this.state;
        let filtered = [...transactions];

        if (searchQuery && searchQuery !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (t) =>
                    t.childName.toLowerCase().includes(query) ||
                    t.description.toLowerCase().includes(query) ||
                    t.transactionId.toLowerCase().includes(query) ||
                    t.className.toLowerCase().includes(query)
            );
        }

        if (selectedMonth !== 'all') {
            filtered = filtered.filter((t) => t.date.split('-')[1] === selectedMonth);
        }

        if (selectedPaymentMethod !== 'all') {
            filtered = filtered.filter((t) => t.paymentMethod === selectedPaymentMethod);
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter((t) => t.status === selectedStatus);
        }

        if (minAmount && minAmount !== '') {
            const min = parseFloat(minAmount);
            if (!isNaN(min)) filtered = filtered.filter((t) => t.amount >= min);
        }

        if (maxAmount && maxAmount !== '') {
            const max = parseFloat(maxAmount);
            if (!isNaN(max)) filtered = filtered.filter((t) => t.amount <= max);
        }

        this.setState({ filteredTransactions: filtered }, this.updateActiveFiltersCount);
    };

    applyFilters = () => {
        this.performSearch();
        this.toggleFilterModal();
    };

    clearFilters = () => {
        this.setState(
            {
                selectedMonth: 'all',
                selectedPaymentMethod: 'all',
                selectedStatus: 'all',
                minAmount: '',
                maxAmount: '',
                searchQuery: '',
                filteredTransactions: this.state.transactions,
            },
            () => {
                this.updateActiveFiltersCount();
                if (this.state.showFilterModal) this.toggleFilterModal();
            }
        );
    };

    toggleFilterModal = () => {
        this.setState((prevState) => ({ showFilterModal: !prevState.showFilterModal }));
    };

    formatAmount = (amount) => {
        return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
    };

    formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    getPaymentMethodIcon = (method) => {
        const icons = {
            carte: 'credit-card-outline',
            especes: 'cash',
            virement: 'bank-outline',
            cheque: 'file-document-outline',
            mobile: 'cellphone-check',
        };
        return icons[method] || 'credit-card-outline';
    };

    renderTransactionItem = ({ item }) => {
        const isCompleted = item.status === 'completed';

        return (
            <TouchableOpacity style={transactionstyle.transactionCard} activeOpacity={0.8}>
                <View style={transactionstyle.cardHeader}>
                    <View style={transactionstyle.childInfo}>
                        <View style={transactionstyle.avatarContainer}>
                            <Text style={[styles.textBold, transactionstyle.avatarText]}>
                                {item.childName.charAt(0)}
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.textBold, transactionstyle.childName]}>{item.childName}</Text>
                            <Text style={[styles.text, transactionstyle.className]}>{item.className}</Text>
                        </View>
                    </View>

                    <View
                        style={[
                            transactionstyle.statusBadge,
                            isCompleted ? transactionstyle.statusBadgeSuccess : transactionstyle.statusBadgePending,
                        ]}
                    >
                        <Text
                            style={[
                                styles.textBold,
                                transactionstyle.statusText,
                                isCompleted ? transactionstyle.statusTextSuccess : transactionstyle.statusTextPending,
                            ]}
                        >
                            {isCompleted ? '✓ Payé' : '⏳ En attente'}
                        </Text>
                    </View>
                </View>

                <View style={transactionstyle.cardDetails}>
                    <Text style={[styles.textBold, transactionstyle.amountText]}>
                        {this.formatAmount(item.amount)}
                    </Text>
                    <Text style={[styles.text, transactionstyle.description]}>{item.description}</Text>

                    <View style={transactionstyle.metaRow}>
                        <View style={transactionstyle.metaItem}>
                            <Icon
                                name={this.getPaymentMethodIcon(item.paymentMethod)}
                                size={14}
                                color={COLORS.textMuted}
                            />
                            <Text style={[styles.text, transactionstyle.metaText]}>
                                {this.state.paymentMethods.find((m) => m.id === item.paymentMethod)?.name || item.paymentMethod}
                            </Text>
                        </View>

                        <View style={transactionstyle.metaItem}>
                            <Icon name="calendar-clock" size={14} color={COLORS.textMuted} />
                            <Text style={[styles.text, transactionstyle.metaText]}>
                                {this.formatDate(item.date)} • {item.time.substring(0, 5)}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.text, transactionstyle.transactionId]}>Réf : {item.transactionId}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderFilterModal = () => {
        const {
            showFilterModal,
            selectedMonth,
            selectedPaymentMethod,
            selectedStatus,
            minAmount,
            maxAmount,
            searchQuery,
            months,
            paymentMethods,
            statusOptions,
        } = this.state;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilterModal}
                onRequestClose={this.toggleFilterModal}
            >
                <View style={transactionstyle.modalOverlay}>
                    <View style={transactionstyle.modalContent}>
                        <View style={transactionstyle.modalHeader}>
                            <Text style={[styles.textBold, transactionstyle.modalTitle]}>🔍 Filtres avancés</Text>
                            <TouchableOpacity onPress={this.toggleFilterModal}>
                                <Icon name="close" size={24} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 12 }}>
                            {/* Mot-clé */}
                            <Text style={[styles.textBold, transactionstyle.filterLabel]}>Recherche par mot-clé</Text>
                            <View style={transactionstyle.searchBox}>
                                <Icon name="magnify" size={20} color={COLORS.textMuted} />
                                <TextInput
                                    style={[styles.text, transactionstyle.searchInput]}
                                    placeholder="Enfant, motif, ID..."
                                    placeholderTextColor={COLORS.textMuted}
                                    value={searchQuery}
                                    onChangeText={(text) => this.setState({ searchQuery: text })}
                                />
                            </View>

                            {/* Mois */}
                            <Text style={[styles.textBold, transactionstyle.filterLabel]}>Mois de règlement</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={transactionstyle.chipRow}>
                                {months.map((m) => (
                                    <TouchableOpacity
                                        key={m.id}
                                        style={[
                                            transactionstyle.chip,
                                            selectedMonth === m.id && transactionstyle.chipActive,
                                        ]}
                                        onPress={() => this.setState({ selectedMonth: m.id })}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                transactionstyle.chipText,
                                                selectedMonth === m.id && transactionstyle.chipTextActive,
                                            ]}
                                        >
                                            {m.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Moyen de paiement */}
                            <Text style={[styles.textBold, transactionstyle.filterLabel]}>Mode de paiement</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={transactionstyle.chipRow}>
                                {paymentMethods.map((pm) => (
                                    <TouchableOpacity
                                        key={pm.id}
                                        style={[
                                            transactionstyle.chip,
                                            selectedPaymentMethod === pm.id && transactionstyle.chipActive,
                                        ]}
                                        onPress={() => this.setState({ selectedPaymentMethod: pm.id })}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                transactionstyle.chipText,
                                                selectedPaymentMethod === pm.id && transactionstyle.chipTextActive,
                                            ]}
                                        >
                                            {pm.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Statut */}
                            <Text style={[styles.textBold, transactionstyle.filterLabel]}>Statut de transaction</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={transactionstyle.chipRow}>
                                {statusOptions.map((st) => (
                                    <TouchableOpacity
                                        key={st.id}
                                        style={[
                                            transactionstyle.chip,
                                            selectedStatus === st.id && transactionstyle.chipActive,
                                        ]}
                                        onPress={() => this.setState({ selectedStatus: st.id })}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                transactionstyle.chipText,
                                                selectedStatus === st.id && transactionstyle.chipTextActive,
                                            ]}
                                        >
                                            {st.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Plage de Montants */}
                            <Text style={[styles.textBold, transactionstyle.filterLabel]}>Fourchette de montant (FCFA)</Text>
                            <View style={transactionstyle.amountRangeWrapper}>
                                <TextInput
                                    style={[styles.text, transactionstyle.amountInput]}
                                    placeholder="Min"
                                    placeholderTextColor={COLORS.textMuted}
                                    keyboardType="numeric"
                                    value={minAmount}
                                    onChangeText={(t) => this.setState({ minAmount: t })}
                                />
                                <Text style={[styles.text, { color: COLORS.textMuted }]}>à</Text>
                                <TextInput
                                    style={[styles.text, transactionstyle.amountInput]}
                                    placeholder="Max"
                                    placeholderTextColor={COLORS.textMuted}
                                    keyboardType="numeric"
                                    value={maxAmount}
                                    onChangeText={(t) => this.setState({ maxAmount: t })}
                                />
                            </View>
                        </ScrollView>

                        <View style={transactionstyle.modalFooter}>
                            <TouchableOpacity style={transactionstyle.clearBtn} onPress={this.clearFilters}>
                                <Text style={[styles.textBold, transactionstyle.clearBtnText]}>Réinitialiser</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={transactionstyle.applyBtn} onPress={this.applyFilters}>
                                <Text style={[styles.textBold, transactionstyle.applyBtnText]}>Appliquer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    renderEmptyState = () => (
        <View style={transactionstyle.emptyState}>
            <Icon name="receipt-text-remove-outline" size={54} color={COLORS.accentGold} />
            <Text style={[styles.textBold, transactionstyle.emptyTitle]}>Aucune transaction trouvée</Text>
            <Text style={[styles.text, transactionstyle.emptyText]}>
                Aucun résultat ne correspond à vos filtres actuels.
            </Text>
            <TouchableOpacity style={transactionstyle.resetFiltersBtn} onPress={this.clearFilters}>
                <Text style={[styles.textBold, transactionstyle.resetFiltersText]}>Effacer tous les filtres</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        const { filteredTransactions, activeFiltersCount } = this.state;
        const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

        return (
            <SafeAreaView style={transactionstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={transactionstyle.topGlow} pointerEvents="none" />
                <View style={transactionstyle.bottomGlow} pointerEvents="none" />

                {/* Navigation Bar */}
                <View style={transactionstyle.headerNav}>
                    <TouchableOpacity
                        style={transactionstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={transactionstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, transactionstyle.headerTitle]}>Historique des Paiements</Text>
                    </View>

                    <TouchableOpacity
                        style={transactionstyle.filterTriggerBtn}
                        onPress={this.toggleFilterModal}
                        activeOpacity={0.8}
                    >
                        <Icon name="filter-variant" size={20} color={COLORS.textPrimary} />
                        {activeFiltersCount > 0 && (
                            <View style={transactionstyle.filterBadgeDot}>
                                <Text style={transactionstyle.filterBadgeText}>{activeFiltersCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Bannières de statistiques synthétiques */}
                <View style={transactionstyle.statsBanner}>
                    <View style={transactionstyle.statBox}>
                        <Text style={[styles.textBold, transactionstyle.statNumber]}>
                            {filteredTransactions.length}
                        </Text>
                        <Text style={[styles.text, transactionstyle.statLabel]}>Règlements</Text>
                    </View>

                    <View style={transactionstyle.statDivider} />

                    <View style={transactionstyle.statBox}>
                        <Text style={[styles.textBold, transactionstyle.statNumberGold]}>
                            {this.formatAmount(totalAmount)}
                        </Text>
                        <Text style={[styles.text, transactionstyle.statLabel]}>Volume Total</Text>
                    </View>
                </View>

                <FlatList
                    data={filteredTransactions}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderTransactionItem}
                    contentContainerStyle={transactionstyle.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={this.renderEmptyState}
                />

                {this.renderFilterModal()}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({}, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);