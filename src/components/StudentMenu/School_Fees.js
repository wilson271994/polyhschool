import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Animated,
    Modal,
    TextInput,
    Alert,
    StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { feestyle } from '../../assets/styles/schoolfees.js';
import { styles } from '../../assets/styles/index.js';
import { switchHomePageAction } from '../../navigations/rootNavigation.js';

class School_Fees extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();

        this.state = {
            selectedTab: 'Frais payé', // 'Frais payé' | 'Moratoire'
            moratoireFilter: 'Tous',
            scrollY: new Animated.Value(0),

            monthlyFees: [
                { id: 1, month: 'Septembre 2025', dueDate: '2025-09-05', amount: 50000, paid: true },
                { id: 2, month: 'Octobre 2025', dueDate: '2025-10-05', amount: 50000, paid: true },
                { id: 8, month: 'Avril 2026', dueDate: '2026-04-05', amount: 50000, paid: false },
                { id: 9, month: 'Mai 2026', dueDate: '2026-05-05', amount: 50000, paid: false },
            ],

            paymentHistory: [
                { id: 101, month: 'Septembre 2025', amount: 50000, date: '2025-09-03', method: 'Mobile Money' },
                { id: 102, month: 'Octobre 2025', amount: 50000, date: '2025-10-02', method: 'Carte Bancaire' },
                { id: 103, month: 'Novembre 2025', amount: 50000, date: '2025-11-04', method: 'Espèces' },
                { id: 104, month: 'Décembre 2025', amount: 120000, date: '2025-12-01', method: 'Virement Bancaire' },
                { id: 105, month: 'Janvier 2026', amount: 50000, date: '2026-01-10', method: 'Mobile Money' },
            ],

            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            selectedDueDate: null,
            filterMonth: 'Tous',
            filterYear: 'Tous',

            moratoires: [
                {
                    id: 'm1',
                    reason: 'Difficultés financières temporaires',
                    amount: 75000,
                    deadline: '30/04/2026',
                    requestDate: '12 Fév 2026',
                    status: 'En attente',
                },
                {
                    id: 'm2',
                    reason: 'Problème familial',
                    amount: 150000,
                    deadline: '15/05/2026',
                    requestDate: '01 Mar 2026',
                    status: 'Validé',
                },
            ],

            isMoratoireModalVisible: false,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            moratoireDeadlineInput: '',
            deadlineError: '',
            parentConsent: false,
            studentName: '',
            isLoadingStudentName: false,
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => switchHomePageAction(true);

    renderHeader = () => {
        return (
            <View style={feestyle.headerBar}>
                <TouchableOpacity
                    style={feestyle.backButton}
                    onPress={this._navigateToMenu}
                    activeOpacity={0.7}
                >
                    <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.textBold, feestyle.headerTitle]}>
                    Frais de Scolarité
                </Text>
            </View>
        );
    };

    markAsPaid = (id) => {
        const fee = this.state.monthlyFees.find((item) => item.id === id);
        if (!fee || fee.paid) return;

        const paymentDate = new Date().toISOString().split('T')[0];
        this.setState((prev) => ({
            monthlyFees: prev.monthlyFees.map((item) =>
                item.id === id ? { ...item, paid: true } : item
            ),
            paymentHistory: [
                {
                    id: Date.now(),
                    month: fee.month,
                    amount: fee.amount,
                    date: paymentDate,
                    method: 'Mobile Money',
                },
                ...prev.paymentHistory,
            ],
        }));
        Alert.alert('Succès', 'Votre règlement a été enregistré avec succès.');
    };

    hasDueDate = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return this.state.monthlyFees.some((fee) => fee.dueDate === dateKey);
    };

    getDueInfo = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return this.state.monthlyFees.find((fee) => fee.dueDate === dateKey);
    };

    changeMonth = (delta) => {
        this.setState((prev) => {
            let newMonth = prev.currentMonth + delta;
            let newYear = prev.currentYear;
            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            } else if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }
            return { currentMonth: newMonth, currentYear: newYear };
        });
    };

    goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            selectedDueDate: null,
        });
    };

    renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate } = this.state;

        // Jour de la semaine du 1er du mois (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const cells = [];
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        // 1. Ajouter les cases vides pour décaler le 1er jour sous le bon en-tête
        for (let i = 0; i < firstDay; i++) {
            cells.push(<View key={`empty-${i}`} style={feestyle.dayCellEmpty} />);
        }

        // 2. Générer les jours du mois
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasDue = this.hasDueDate(currentYear, currentMonth, day);
            const dueInfo = hasDue ? this.getDueInfo(currentYear, currentMonth, day) : null;

            const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getDate() === day;

            const isToday = isCurrentMonth && day === today.getDate();

            cells.push(
                <TouchableOpacity
                    key={day}
                    style={feestyle.dayCellTouch}
                    activeOpacity={0.7}
                    onPress={() =>
                        this.setState({
                            selectedDate: new Date(currentYear, currentMonth, day),
                            selectedDueDate: hasDue ? dateKey : null,
                        })
                    }
                >
                    <View
                        style={[
                            feestyle.dayCellContent,
                            hasDue && (dueInfo?.paid ? feestyle.duePaidDayCell : feestyle.dueUnpaidDayCell),
                            isToday && feestyle.todayCell,
                            isSelected && feestyle.selectedCell,
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                feestyle.dayText,
                                hasDue && feestyle.dueDayText,
                                isToday && feestyle.todayDayText,
                                isSelected && feestyle.selectedDayText,
                            ]}
                        >
                            {day}
                        </Text>

                        {hasDue && (
                            <View
                                style={[
                                    feestyle.statusPulseDot,
                                    { backgroundColor: dueInfo?.paid ? '#10B981' : '#EF4444' },
                                ]}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            );
        }
        return cells;
    };

    getFilteredHistory = () => {
        const { paymentHistory, filterMonth, filterYear } = this.state;
        return paymentHistory.filter((item) => {
            const yearMatch = filterYear === 'Tous' || item.date.startsWith(filterYear);
            const monthMatch = filterMonth === 'Tous' || item.month.toLowerCase().includes(filterMonth.toLowerCase());
            return yearMatch && monthMatch;
        });
    };

    getFilteredHistoryTotal = () => {
        return this.getFilteredHistory().reduce((sum, item) => sum + item.amount, 0);
    };

    renderMonthlyItem = ({ item }) => {
        const isSelected = this.state.selectedDueDate === item.dueDate;
        return (
            <View
                style={[
                    feestyle.monthlyCard,
                    item.paid && feestyle.paidMonthlyCard,
                    isSelected && feestyle.selectedMonthlyCard,
                ]}
            >
                <View style={feestyle.monthInfo}>
                    <Text style={[styles.textBold, feestyle.monthName]}>{item.month}</Text>
                    <Text style={[styles.text, feestyle.dueDate]}>Échéance : {item.dueDate}</Text>
                    <Text style={[styles.textBold, feestyle.amount]}>
                        {item.amount.toLocaleString()} FCFA
                    </Text>
                </View>
                {item.paid ? (
                    <View style={feestyle.paidBadge}>
                        <Icon name="check-circle" size={18} color="#10B981" />
                        <Text style={[styles.textBold, feestyle.paidText]}>Payé</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={feestyle.payButton}
                        onPress={() => this.markAsPaid(item.id)}
                        activeOpacity={0.8}
                    >
                        <Icon name="wallet-outline" size={16} color="#011638" />
                        <Text style={[styles.textBold, feestyle.payButtonText]}>Payer</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    renderPaymentHistoryItem = ({ item }) => (
        <View style={feestyle.historyCard}>
            <View style={feestyle.historyLeft}>
                <View style={feestyle.historyIconBox}>
                    <Icon name="cash-fast" size={20} color="#f6a100" />
                </View>
                <View style={feestyle.historyInfo}>
                    <Text style={[styles.textBold, feestyle.historyMonth]}>{item.month}</Text>
                    <Text style={[styles.text, feestyle.historyDate]}>{item.date}</Text>
                </View>
            </View>
            <View style={feestyle.historyRight}>
                <Text style={[styles.textBold, feestyle.historyAmount]}>
                    +{item.amount.toLocaleString()} FCFA
                </Text>
                <Text style={[styles.text, feestyle.historyMethod]}>{item.method}</Text>
            </View>
        </View>
    );

    _openMoratoireModal = () => {
        const name = this.props.user_infos?.name || `${this.props.user_infos?.first_name || ''} ${this.props.user_infos?.last_name || ''}`.trim() || 'l\'étudiant';
        this.setState({
            isMoratoireModalVisible: true,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            moratoireDeadlineInput: '',
            deadlineError: '',
            parentConsent: false,
            studentName: name,
        });
    };

    _closeMoratoireModal = () => {
        this.setState({
            isMoratoireModalVisible: false,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            moratoireDeadlineInput: '',
            deadlineError: '',
            parentConsent: false,
        });
    };

    _formatDeadline = (text) => {
        let cleaned = text.replace(/\D/g, '').substring(0, 8);
        let formatted = cleaned;

        if (cleaned.length > 2) {
            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        if (cleaned.length > 4) {
            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4);
        }
        return formatted;
    };

    _validateDeadline = (dateStr) => {
        if (dateStr.length !== 10) return false;
        const [jj, mm, aaaa] = dateStr.split('/').map(Number);
        if (isNaN(jj) || isNaN(mm) || isNaN(aaaa)) return false;
        if (aaaa < 2024 || aaaa > 2100) return false;
        if (mm < 1 || mm > 12) return false;
        if (jj < 1 || jj > 31) return false;

        const date = new Date(aaaa, mm - 1, jj);
        return date.getFullYear() === aaaa && date.getMonth() === mm - 1 && date.getDate() === jj;
    };

    _handleDeadlineChange = (text) => {
        const formatted = this._formatDeadline(text);
        this.setState({ moratoireDeadlineInput: formatted });

        if (formatted.length === 10) {
            if (!this._validateDeadline(formatted)) {
                this.setState({ deadlineError: 'Date invalide', moratoireDeadline: null });
            } else {
                const [jj, mm, aaaa] = formatted.split('/').map(Number);
                const date = new Date(aaaa, mm - 1, jj);
                this.setState({ deadlineError: '', moratoireDeadline: date });
            }
        } else {
            this.setState({ deadlineError: '', moratoireDeadline: null });
        }
    };

    formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    handleMoratoireSubmit = () => {
        const { moratoireReason, moratoireAmount, moratoireDeadline, parentConsent, moratoires } = this.state;

        if (!moratoireReason.trim()) {
            Alert.alert('Erreur', 'Veuillez indiquer le motif du moratoire');
            return;
        }
        if (!moratoireAmount.trim() || isNaN(moratoireAmount)) {
            Alert.alert('Erreur', 'Veuillez saisir un montant valide');
            return;
        }
        if (!moratoireDeadline) {
            Alert.alert('Erreur', 'Veuillez entrer une date butoir valide (JJ/MM/AAAA)');
            return;
        }
        if (!parentConsent) {
            Alert.alert('Erreur', 'Vous devez accepter les conditions pour soumettre la demande.');
            return;
        }

        const newMoratoire = {
            id: Date.now().toString(),
            reason: moratoireReason.trim(),
            amount: parseInt(moratoireAmount, 10),
            deadline: this.formatDate(moratoireDeadline),
            requestDate: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }),
            status: 'En attente',
        };

        this.setState({ moratoires: [newMoratoire, ...moratoires] });
        this._closeMoratoireModal();
        Alert.alert('Succès', 'Votre demande de moratoire a été enregistrée avec succès.');
    };

    getFilteredMoratoires = () => {
        const { moratoires, moratoireFilter } = this.state;
        if (moratoireFilter === 'Tous') return moratoires;
        return moratoires.filter((m) => m.status === moratoireFilter);
    };

    renderMoratoireItem = ({ item }) => {
        const isApproved = item.status === 'Validé';
        const isPending = item.status === 'En attente';
        const statusColor = isApproved ? '#10B981' : isPending ? '#f6a100' : '#EF4444';

        return (
            <View style={feestyle.moratoireCard}>
                <View style={feestyle.moratoireHeader}>
                    <Icon name="file-document-edit-outline" size={20} color="#f6a100" />
                    <Text style={[styles.textBold, feestyle.moratoireReason]}>{item.reason}</Text>
                </View>

                <Text style={[styles.text, feestyle.moratoireAmount]}>
                    Montant : <Text style={styles.textBold}>{item.amount.toLocaleString()} FCFA</Text>
                </Text>
                <Text style={[styles.text, feestyle.moratoireDate]}>
                    Date d'échéance accordée : <Text style={{ color: '#FFFFFF' }}>{item.deadline}</Text>
                </Text>
                <Text style={[styles.text, feestyle.moratoireDate]}>
                    Demandé le {item.requestDate}
                </Text>

                <View style={feestyle.moratoireStatusRow}>
                    <View style={[feestyle.statusIndicator, { backgroundColor: statusColor }]} />
                    <Text style={[styles.textBold, feestyle.moratoireStatus, { color: statusColor }]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        );
    };

    renderFilterContainer = () => {
        const { selectedTab, moratoireFilter } = this.state;
        const moratoireStatuses = ['Tous', 'En attente', 'Validé', 'Rejeté'];

        return (
            <View style={feestyle.filterContainer}>
                <View style={feestyle.tabContainer}>
                    <TouchableOpacity
                        style={[feestyle.tabButton, selectedTab === 'Frais payé' && feestyle.tabButtonActive]}
                        onPress={() => this.setState({ selectedTab: 'Frais payé' })}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name="cash-check"
                            size={18}
                            color={selectedTab === 'Frais payé' ? '#011638' : '#94A3B8'}
                        />
                        <Text
                            style={[
                                styles.text,
                                feestyle.tabButtonText,
                                selectedTab === 'Frais payé' && [styles.textBold, feestyle.tabButtonTextActive],
                            ]}
                        >
                            Échéances & Payes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[feestyle.tabButton, selectedTab === 'Moratoire' && feestyle.tabButtonActive]}
                        onPress={() => this.setState({ selectedTab: 'Moratoire' })}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name="clock-alert-outline"
                            size={18}
                            color={selectedTab === 'Moratoire' ? '#011638' : '#94A3B8'}
                        />
                        <Text
                            style={[
                                styles.text,
                                feestyle.tabButtonText,
                                selectedTab === 'Moratoire' && [styles.textBold, feestyle.tabButtonTextActive],
                            ]}
                        >
                            Demandes Moratoire
                        </Text>
                    </TouchableOpacity>
                </View>

                {selectedTab === 'Moratoire' && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        <View style={feestyle.filterChips}>
                            {moratoireStatuses.map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    style={[
                                        feestyle.filterChip,
                                        moratoireFilter === status && feestyle.filterChipActive,
                                    ]}
                                    onPress={() => this.setState({ moratoireFilter: status })}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            feestyle.filterChipText,
                                            moratoireFilter === status && [styles.textBold, feestyle.filterChipTextActive],
                                        ]}
                                    >
                                        {status}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        );
    };

    render() {
        const {
            monthlyFees,
            selectedDueDate,
            filterMonth,
            filterYear,
            selectedTab,
            currentMonth,
            currentYear,
        } = this.state;

        const { student_infos } = this.props;

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const displayedFees = selectedDueDate
            ? monthlyFees.filter((item) => item.dueDate === selectedDueDate)
            : monthlyFees;

        const filteredMoratoires = this.getFilteredMoratoires();
        const filteredHistory = this.getFilteredHistory();

        const installments = student_infos?.class_fees_installment || [];
        const paidInstallments = student_infos?.student_installment_paid || [];
        const unpaidInstallments = student_infos?.student_installment_notpaid || [];

        const totalFees = installments.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
        const paidFees = paidInstallments.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
        const remainingFees = unpaidInstallments.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

        return (
            <SafeAreaView style={feestyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Ambient Glows */}
                <View style={feestyle.topGlow} pointerEvents="none" />
                <View style={feestyle.bottomGlow} pointerEvents="none" />

                {this.renderHeader()}

                <Animated.ScrollView
                    style={{ flex: 1 }}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 110 }}
                >
                    {this.renderFilterContainer()}

                    {selectedTab === 'Frais payé' ? (
                        <>
                            {/* Carte Résumé Statistique */}
                            <View style={feestyle.statsContainer}>
                                <View style={feestyle.statCard}>
                                    <Text style={[styles.textBold, feestyle.statValue]}>
                                        {totalFees.toLocaleString()} FCFA
                                    </Text>
                                    <Text style={[styles.text, feestyle.statLabel]}>Total Annuel</Text>
                                </View>

                                <View style={feestyle.statCardDivider} />

                                <View style={feestyle.statCard}>
                                    <Text style={[styles.textBold, feestyle.statValueGreen]}>
                                        {paidFees.toLocaleString()} FCFA
                                    </Text>
                                    <Text style={[styles.text, feestyle.statLabel]}>Payé</Text>
                                </View>

                                <View style={feestyle.statCardDivider} />

                                <View style={feestyle.statCard}>
                                    <Text style={[styles.textBold, feestyle.statValueRed]}>
                                        {remainingFees.toLocaleString()} FCFA
                                    </Text>
                                    <Text style={[styles.text, feestyle.statLabel]}>Reste</Text>
                                </View>
                            </View>

                            {/* Calendrier Échéancier */}
                            <View style={feestyle.calendarCard}>
                                <View style={feestyle.calendarNav}>
                                    <TouchableOpacity onPress={() => this.changeMonth(-1)} style={feestyle.navBtn}>
                                        <Icon name="chevron-left" size={22} color="#FFFFFF" />
                                    </TouchableOpacity>
                                    <Text style={[styles.textBold, feestyle.monthLabel]}>
                                        {monthNames[currentMonth]} {currentYear}
                                    </Text>
                                    <TouchableOpacity onPress={this.goToToday} style={feestyle.todayButton}>
                                        <Icon name="calendar-today" size={16} color="#f6a100" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.changeMonth(1)} style={feestyle.navBtn}>
                                        <Icon name="chevron-right" size={22} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>

                                <View style={feestyle.weekHeader}>
                                    {daysOfWeek.map((d) => (
                                        <Text key={d} style={[styles.text, feestyle.weekText]}>
                                            {d}
                                        </Text>
                                    ))}
                                </View>

                                <View style={feestyle.daysGrid}>{this.renderMonthlyGrid()}</View>
                            </View>

                            {/* Section Mensualités */}
                            <View style={feestyle.sectionGlass}>
                                <Text style={[styles.textBold, feestyle.sectionTitle]}>
                                    {selectedDueDate ? `Échéance du ${selectedDueDate}` : 'Toutes les Échéances'}
                                </Text>
                                <FlatList
                                    data={displayedFees}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={this.renderMonthlyItem}
                                    scrollEnabled={false}
                                    ListEmptyComponent={
                                        <Text style={[styles.text, feestyle.emptyText]}>
                                            Aucune échéance enregistrée pour cette date.
                                        </Text>
                                    }
                                />
                            </View>

                            {/* Section Historique */}
                            <View style={feestyle.sectionGlass}>
                                <Text style={[styles.textBold, feestyle.sectionTitle]}>Historique des Paiements</Text>

                                <View style={feestyle.filterGroupRow}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {['Tous', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février'].map((m) => (
                                            <TouchableOpacity
                                                key={m}
                                                style={[
                                                    feestyle.subFilterChip,
                                                    filterMonth === m && feestyle.subFilterChipActive,
                                                ]}
                                                onPress={() => this.setState({ filterMonth: m })}
                                            >
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        feestyle.subFilterText,
                                                        filterMonth === m && [styles.textBold, feestyle.subFilterTextActive],
                                                    ]}
                                                >
                                                    {m}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                <FlatList
                                    data={filteredHistory}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={this.renderPaymentHistoryItem}
                                    scrollEnabled={false}
                                    ListEmptyComponent={
                                        <Text style={[styles.text, feestyle.emptyText]}>
                                            Aucun versement correspondant trouvé.
                                        </Text>
                                    }
                                />
                            </View>
                        </>
                    ) : (
                        /* Liste des Moratoires */
                        <View style={feestyle.sectionGlass}>
                            <Text style={[styles.textBold, feestyle.sectionTitle]}>Mes Demandes de Moratoire</Text>
                            <FlatList
                                data={filteredMoratoires}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={this.renderMoratoireItem}
                                scrollEnabled={false}
                                ListEmptyComponent={
                                    <Text style={[styles.text, feestyle.emptyText]}>
                                        Aucune demande enregistrée sous ce filtre.
                                    </Text>
                                }
                            />
                        </View>
                    )}
                </Animated.ScrollView>

                {/* Bouton Flottant (Nouvelle demande) */}
                {selectedTab === 'Moratoire' && (
                    <TouchableOpacity
                        style={feestyle.floatingButton}
                        onPress={this._openMoratoireModal}
                        activeOpacity={0.8}
                    >
                        <Icon name="plus" size={26} color="#011638" />
                    </TouchableOpacity>
                )}

                {/* Modal de Soumission Moratoire */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isMoratoireModalVisible}
                    onRequestClose={this._closeMoratoireModal}
                >
                    <View style={feestyle.modalOverlay}>
                        <TouchableOpacity
                            style={feestyle.modalBackdrop}
                            activeOpacity={1}
                            onPress={this._closeMoratoireModal}
                        />
                        <View style={feestyle.modalContainer}>
                            <View style={feestyle.modalHandle} />
                            <View style={feestyle.modalHeader}>
                                <Text style={[styles.textBold, feestyle.modalTitle]}>Nouveau Moratoire</Text>
                                <TouchableOpacity onPress={this._closeMoratoireModal} activeOpacity={0.7}>
                                    <Icon name="close" size={22} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 12 }}>
                                <Text style={[styles.textBold, feestyle.modalLabel]}>Motif justificatif *</Text>
                                <TextInput
                                    style={[styles.text, feestyle.modalInput]}
                                    placeholder="Expliquez brièvement votre raison..."
                                    placeholderTextColor="#64748B"
                                    value={this.state.moratoireReason}
                                    onChangeText={(text) => this.setState({ moratoireReason: text })}
                                    maxLength={200}
                                />

                                <Text style={[styles.textBold, feestyle.modalLabel]}>Montant concerné (FCFA) *</Text>
                                <TextInput
                                    style={[styles.text, feestyle.modalInput]}
                                    placeholder="Ex: 75000"
                                    placeholderTextColor="#64748B"
                                    value={this.state.moratoireAmount}
                                    onChangeText={(text) => this.setState({ moratoireAmount: text })}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />

                                <Text style={[styles.textBold, feestyle.modalLabel]}>Date d'échéance souhaitée *</Text>
                                <TextInput
                                    style={[
                                        styles.text,
                                        feestyle.modalInput,
                                        this.state.deadlineError ? { borderColor: '#EF4444' } : null,
                                    ]}
                                    placeholder="JJ/MM/AAAA"
                                    placeholderTextColor="#64748B"
                                    value={this.state.moratoireDeadlineInput}
                                    onChangeText={this._handleDeadlineChange}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                                {this.state.deadlineError ? (
                                    <Text style={[styles.text, feestyle.errorText]}>{this.state.deadlineError}</Text>
                                ) : null}

                                <TouchableOpacity
                                    style={feestyle.checkboxRow}
                                    onPress={() => this.setState((prev) => ({ parentConsent: !prev.parentConsent }))}
                                    activeOpacity={0.7}
                                >
                                    <Icon
                                        name={this.state.parentConsent ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                        size={22}
                                        color={this.state.parentConsent ? '#f6a100' : '#64748B'}
                                    />
                                    <Text style={[styles.text, feestyle.checkboxLabel]}>
                                        Je m'engage formellement au paiement avant la date sollicitée pour l'étudiant(e){' '}
                                        <Text style={styles.textBold}>{this.state.studentName}</Text>.
                                    </Text>
                                </TouchableOpacity>

                                <View style={feestyle.modalButtonsContainer}>
                                    <TouchableOpacity
                                        style={feestyle.modalCancelButton}
                                        onPress={this._closeMoratoireModal}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[styles.textBold, feestyle.modalCancelText]}>Annuler</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            feestyle.modalValidateButton,
                                            (!this.state.moratoireReason.trim() ||
                                                !this.state.moratoireAmount.trim() ||
                                                !this.state.moratoireDeadline ||
                                                !this.state.parentConsent) && { opacity: 0.5 },
                                        ]}
                                        onPress={this.handleMoratoireSubmit}
                                        disabled={
                                            !this.state.moratoireReason.trim() ||
                                            !this.state.moratoireAmount.trim() ||
                                            !this.state.moratoireDeadline ||
                                            !this.state.parentConsent
                                        }
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[styles.textBold, feestyle.modalValidateText]}>Soumettre</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchHomePageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    student_infos: state.auth.student_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(School_Fees);