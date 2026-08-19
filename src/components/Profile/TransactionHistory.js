import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Animated, Modal, Alert, ImageBackground, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { switchProfilPageAction } from '../../navigations/rootNavigation';
import { transactionstyle } from '../../assets/styles/transactionhistory';
import { styles } from '../../assets/styles';

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
            scrollYvalue: 0,
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
                { id: '12', name: 'Décembre' }
            ],
            paymentMethods: [
                { id: 'all', name: 'Tous', icon: '💳' },
                { id: 'carte', name: 'Carte bancaire', icon: '💳' },
                { id: 'especes', name: 'Espèces', icon: '💰' },
                { id: 'virement', name: 'Virement', icon: '🏦' },
                { id: 'cheque', name: 'Chèque', icon: '📝' },
                { id: 'mobile', name: 'Mobile Money', icon: '📱' }
            ],
            statusOptions: [
                { id: 'all', name: 'Tous', color: '#6B7280' },
                { id: 'completed', name: 'Payé', color: '#10b981' },
                { id: 'pending', name: 'En attente', color: '#f59e0b' }
            ],
            activeFilters: 0
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
    }

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
                description: 'Frais de scolarité - 2ème trimestre'
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
                description: 'Frais de scolarité + Activités'
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
                description: 'Sortie scolaire'
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
                description: 'Frais de scolarité - 2ème trimestre'
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
                description: 'Activités sportives'
            },
            {
                id: '6',
                childName: 'Thomas Petit',
                className: 'CE1 - Section A',
                amount: 140000,
                paymentMethod: 'carte',
                date: '2026-02-25',
                time: '13:40:05',
                status: 'completed',
                transactionId: 'TXN-006-2026',
                description: 'Frais de scolarité'
            },
            {
                id: '7',
                childName: 'Emma Martin',
                className: 'CP - Section A',
                amount: 30000,
                paymentMethod: 'mobile',
                date: '2026-02-18',
                time: '17:12:59',
                status: 'completed',
                transactionId: 'TXN-007-2026',
                description: 'Bibliothèque'
            },
            {
                id: '8',
                childName: 'Chloé Dubois',
                className: '6ème - Section A',
                amount: 200000,
                paymentMethod: 'virement',
                date: '2026-01-10',
                time: '10:25:47',
                status: 'completed',
                transactionId: 'TXN-008-2026',
                description: 'Frais de scolarité - 1er trimestre'
            }
        ];

        this.setState({
            transactions: mockData,
            filteredTransactions: mockData
        }, this.updateActiveFiltersCount);
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
        this.setState({ activeFilters: count });
    };

    // Fonction pour appliquer la recherche
    performSearch = () => {
        const { transactions, selectedMonth, selectedPaymentMethod, selectedStatus, minAmount, maxAmount, searchQuery } = this.state;

        let filtered = [...transactions];

        // Filtre par recherche
        if (searchQuery && searchQuery !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(transaction =>
                transaction.childName.toLowerCase().includes(query) ||
                transaction.description.toLowerCase().includes(query) ||
                transaction.transactionId.toLowerCase().includes(query) ||
                transaction.className.toLowerCase().includes(query)
            );
        }

        // Filtre par mois
        if (selectedMonth !== 'all') {
            filtered = filtered.filter(transaction => {
                const transactionMonth = transaction.date.split('-')[1];
                return transactionMonth === selectedMonth;
            });
        }

        // Filtre par moyen de paiement
        if (selectedPaymentMethod !== 'all') {
            filtered = filtered.filter(transaction =>
                transaction.paymentMethod === selectedPaymentMethod
            );
        }

        // Filtre par statut
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(transaction =>
                transaction.status === selectedStatus
            );
        }

        // Filtre par montant minimum
        if (minAmount && minAmount !== '') {
            const min = parseFloat(minAmount);
            if (!isNaN(min)) {
                filtered = filtered.filter(transaction => transaction.amount >= min);
            }
        }

        // Filtre par montant maximum
        if (maxAmount && maxAmount !== '') {
            const max = parseFloat(maxAmount);
            if (!isNaN(max)) {
                filtered = filtered.filter(transaction => transaction.amount <= max);
            }
        }

        this.setState({ filteredTransactions: filtered });
        this.updateActiveFiltersCount();
    };

    applyFilters = () => {
        this.performSearch();
        this.toggleFilterModal();
    };

    clearFilters = () => {
        this.setState({
            selectedMonth: 'all',
            selectedPaymentMethod: 'all',
            selectedStatus: 'all',
            minAmount: '',
            maxAmount: '',
            searchQuery: '',
            filteredTransactions: this.state.transactions
        }, () => {
            this.updateActiveFiltersCount();
            this.toggleFilterModal();
        });
    };

    toggleFilterModal = () => {
        this.setState(prevState => ({ showFilterModal: !prevState.showFilterModal }));
    };

    formatAmount = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0
        }).format(amount);
    };

    formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    getPaymentMethodIcon = (method) => {
        const methods = {
            carte: '💳',
            especes: '💰',
            virement: '🏦',
            cheque: '📝',
            mobile: '📱'
        };
        return methods[method] || '💳';
    };

    getStatusColor = (status) => {
        return status === 'completed' ? '#10b981' : '#f59e0b';
    };

    getStatusText = (status) => {
        return status === 'completed' ? '✓ Payé' : '⏳ En attente';
    };

    renderheader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        console.log(headerOpacity)
        return (
            <Animated.View style={[transactionstyle.Header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={transactionstyle.headerSection}>
                        <View style={transactionstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={transactionstyle.HeaderButton}
                                onPress={this._navigateToProfil}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={transactionstyle.headertext}>
                            <Text style={[transactionstyle.HeaderTitle, styles.textBold]}>Historique des transactions</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    renderTransactionItem = ({ item }) => {
        return (
            <TouchableOpacity style={transactionstyle.transactionCard}>
                <View style={transactionstyle.cardHeader}>
                    <View style={transactionstyle.childInfo}>
                        <View style={transactionstyle.avatarContainer}>
                            <Text style={[transactionstyle.avatarText, styles.textBold]}>{item.childName.charAt(0)}</Text>
                        </View>
                        <View>
                            <Text style={[transactionstyle.childName, styles.textBold]}>{item.childName}</Text>
                            <Text style={[transactionstyle.className, styles.text]}>{item.className}</Text>
                        </View>
                    </View>
                    <View style={[transactionstyle.statusBadge, { backgroundColor: this.getStatusColor(item.status) + '15' }]}>
                        <Text style={[transactionstyle.statusText, styles.textBold, { color: this.getStatusColor(item.status) }]}>
                            {this.getStatusText(item.status)}
                        </Text>
                    </View>
                </View>

                <View style={transactionstyle.cardDetails}>
                    <View style={transactionstyle.detailRow}>
                        <View style={transactionstyle.detailItem}>
                            <Text style={[transactionstyle.detailLabel, styles.text]}>Montant</Text>
                            <Text style={[transactionstyle.amountText, styles.text]}>{this.formatAmount(item.amount)}</Text>
                        </View>
                        <View style={transactionstyle.detailItem}>
                            <Text style={[transactionstyle.detailLabel, styles.text]}>Paiement</Text>
                            <View style={transactionstyle.paymentMethod}>
                                <Text style={[transactionstyle.paymentIcon, styles.text]}>{this.getPaymentMethodIcon(item.paymentMethod)}</Text>
                                <Text style={[transactionstyle.paymentText, styles.text]}>
                                    {this.state.paymentMethods.find(m => m.id === item.paymentMethod)?.name || item.paymentMethod}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={transactionstyle.detailRow}>
                        <View style={transactionstyle.detailItem}>
                            <Text style={[transactionstyle.detailLabel, styles.text]}>Date</Text>
                            <Text style={[transactionstyle.detailValue, styles.textBold]}>{this.formatDate(item.date)}</Text>
                        </View>
                        <View style={transactionstyle.detailItem}>
                            <Text style={[transactionstyle.detailLabel, styles.text]}>Heure</Text>
                            <Text style={[transactionstyle.detailValue, styles.textBold]}>{this.formatTime(item.time)}</Text>
                        </View>
                    </View>

                    <Text style={[transactionstyle.description, styles.text]}>{item.description}</Text>
                    <Text style={[transactionstyle.transactionId, styles.text]}>ID: {item.transactionId}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderFilterModal = () => {
        const { showFilterModal, selectedMonth, selectedPaymentMethod, selectedStatus, minAmount, maxAmount, searchQuery, months, paymentMethods, statusOptions } = this.state;

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
                            <Text style={[transactionstyle.modalTitle, styles.textBold]}>Filtres avancés</Text>
                            <TouchableOpacity onPress={this.toggleFilterModal}>
                                <Text style={transactionstyle.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Recherche */}
                            <Text style={[transactionstyle.filterLabel, styles.textBold]}>Recherche</Text>
                            <View style={transactionstyle.searchContainer}>
                                <Icon name="magnify" size={20} color="#999" />
                                <TextInput
                                    style={[transactionstyle.searchInput, styles.text, { color: '#000' }]}
                                    placeholder="Nom, description ou ID..."
                                    placeholderTextColor="#999"
                                    value={searchQuery}
                                    onChangeText={(text) => this.setState({ searchQuery: text })}
                                    onSubmitEditing={this.performSearch}
                                />
                            </View>

                            {/* Mois */}
                            <Text style={[transactionstyle.filterLabel, styles.textBold]}>Mois</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={transactionstyle.filterScroll}>
                                {months.map(month => (
                                    <TouchableOpacity
                                        key={month.id}
                                        style={[
                                            transactionstyle.filterChip,
                                            selectedMonth === month.id && transactionstyle.filterChipActive
                                        ]}
                                        onPress={() => this.setState({ selectedMonth: month.id })}
                                    >
                                        <Text style={[
                                            transactionstyle.filterChipText, styles.text,
                                            selectedMonth === month.id && transactionstyle.filterChipTextActive
                                        ]}>
                                            {month.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Moyen de paiement */}
                            <Text style={[transactionstyle.filterLabel, styles.textBold]}>Moyen de paiement</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={transactionstyle.filterScroll}>
                                {paymentMethods.map(method => (
                                    <TouchableOpacity
                                        key={method.id}
                                        style={[
                                            transactionstyle.filterChip,
                                            selectedPaymentMethod === method.id && transactionstyle.filterChipActive
                                        ]}
                                        onPress={() => this.setState({ selectedPaymentMethod: method.id })}
                                    >
                                        <Text style={[transactionstyle.filterChipIcon, styles.text]}>{method.icon}</Text>
                                        <Text style={[
                                            transactionstyle.filterChipText, styles.text,
                                            selectedPaymentMethod === method.id && transactionstyle.filterChipTextActive
                                        ]}>
                                            {method.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Statut */}
                            <Text style={[transactionstyle.filterLabel, styles.textBold]}>Statut</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={transactionstyle.filterScroll}>
                                {statusOptions.map(status => (
                                    <TouchableOpacity
                                        key={status.id}
                                        style={[
                                            transactionstyle.filterChip,
                                            selectedStatus === status.id && transactionstyle.filterChipActive
                                        ]}
                                        onPress={() => this.setState({ selectedStatus: status.id })}
                                    >
                                        <Text style={[
                                            transactionstyle.filterChipText, styles.text,
                                            selectedStatus === status.id && transactionstyle.filterChipTextActive
                                        ]}>
                                            {status.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Montant */}
                            <Text style={[transactionstyle.filterLabel, styles.textBold]}>Montant (XAF)</Text>
                            <View style={transactionstyle.amountRangeContainer}>
                                <View style={transactionstyle.amountInputWrapper}>
                                    <Text style={[transactionstyle.amountPrefix, styles.text]}>Min</Text>
                                    <TextInput
                                        style={[transactionstyle.amountInput, styles.text, { color: '#000' }]}
                                        placeholder="0"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                        value={minAmount}
                                        onChangeText={(text) => this.setState({ minAmount: text })}
                                    />
                                </View>
                                <Text style={[transactionstyle.amountSeparator, styles.text]}>-</Text>
                                <View style={transactionstyle.amountInputWrapper}>
                                    <Text style={[transactionstyle.amountPrefix, styles.text]}>Max</Text>
                                    <TextInput
                                        style={[transactionstyle.amountInput, styles.text, { color: '#000' }]}
                                        placeholder="∞"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                        value={maxAmount}
                                        onChangeText={(text) => this.setState({ maxAmount: text })}
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        <View style={transactionstyle.modalFooter}>
                            <TouchableOpacity style={transactionstyle.clearButton} onPress={this.clearFilters}>
                                <Text style={[transactionstyle.clearButtonText, styles.text]}>Tout effacer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={transactionstyle.applyButton} onPress={this.applyFilters}>
                                <Text style={[transactionstyle.applyButtonText, styles.text]}>Appliquer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    renderHeader = () => {
        const { filteredTransactions, activeFilters } = this.state;
        const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

        return (
            <View style={transactionstyle.header}>


                <View style={transactionstyle.headerTop}>
                    <TouchableOpacity onPress={this._navigateToProfil} style={transactionstyle.backContainer}>
                        <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                    </TouchableOpacity>
                    <View style={transactionstyle.headerTextContainer}>
                        <Text style={[transactionstyle.headerTitle, styles.textBold]}>Transactions</Text>
                        <Text style={[transactionstyle.headerSubtitle, styles.text]}>Frais scolaires</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={transactionstyle.filterButton}
                            onPress={this.toggleFilterModal}
                        >
                            
                        <Icon name="magnify" style={transactionstyle.icon} />
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={transactionstyle.statsRow}>
                    <View style={transactionstyle.statItem}>
                        <Text style={[transactionstyle.statValue, styles.textBold]}>{filteredTransactions.length}</Text>
                        <Text style={[transactionstyle.statLabel, styles.text]}>Transactions</Text>
                    </View>
                    <View style={transactionstyle.statDivider} />
                    <View style={transactionstyle.statItem}>
                        <Text style={[transactionstyle.statValue, styles.textBold]}>{this.formatAmount(totalAmount)}</Text>
                        <Text style={[transactionstyle.statLabel, styles.text]}>Total</Text>
                    </View>
                </View>
            </View>
        );
    };

    renderEmptyState = () => {
        return (
            <View style={transactionstyle.emptyState}>
                <Text style={transactionstyle.emptyIcon}>📭</Text>
                <Text style={[transactionstyle.emptyTitle, styles.textBold]}>Aucune transaction</Text>
                <Text style={[transactionstyle.emptyText, styles.text]}>Aucune transaction ne correspond à vos critères</Text>
                <TouchableOpacity style={transactionstyle.clearFiltersButton} onPress={this.clearFilters}>
                    <Text style={[transactionstyle.clearFiltersText, styles.textBold]}>Effacer les filtres</Text>
                </TouchableOpacity>
            </View>
        );
    };


    _handleScroll = (event) => { 
        const scrollY = event.nativeEvent.contentOffset.y;
        const scrollX = event.nativeEvent.contentOffset.x;
        this.setState({
            scrollY:new Animated.Value(scrollY),
            scrollYvalue:scrollY,
        });

        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        )
        console.log(scrollX, scrollY)
    };


    render() {
        const { filteredTransactions, scrollYvalue } = this.state;
        return (
            <SafeAreaView style={transactionstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        ref={ref => this.scrollViewRef = ref}
                        style={transactionstyle.scrollView}
                        showsVerticalScrollIndicator={false}
                        onScroll={this._handleScroll}
                        scrollEventThrottle={16}
                    >
                        {this.renderHeader()}
                        <FlatList
                            data={filteredTransactions}
                            keyExtractor={(item) => item.id}
                            renderItem={this.renderTransactionItem}
                            contentContainerStyle={transactionstyle.listContainer}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={this.renderEmptyState}
                            scrollEnabled={false}
                        />
                    </Animated.ScrollView>
                    {
                        scrollYvalue > 16 ? this.renderheader() : null
                    }
                    {this.renderFilterModal()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);