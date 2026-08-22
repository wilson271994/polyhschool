import React, { PureComponent } from 'react';
import {
    SafeAreaView, View, Text, TouchableOpacity, ScrollView,
    FlatList, ImageBackground, Animated, Image, Modal, TextInput, Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { feestyle, COLORS } from '../../assets/styles/schoolfees';
import { styles } from '../../assets/styles';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';

class SchoolFees extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();

        this.state = {
            selectedTab: 'Frais payé',
            moratoireFilter: 'Tous',

            totalFees: 450000,
            paidFees: 270000,
            remainingFees: 180000,
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
            filterYear: '2025',

            moratoires: [
                {
                    id: 'm1',
                    reason: 'Difficultés financières temporaires',
                    amount: 75000,
                    deadline: '30/04/2026',
                    requestDate: '12 Février 2026',
                    status: 'En attente',
                },
                {
                    id: 'm2',
                    reason: 'Problème familial',
                    amount: 150000,
                    deadline: '15/05/2026',
                    requestDate: '01 Mars 2026',
                    status: 'Validé',
                },
            ],

            isMoratoireModalVisible: false,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            moratoireDeadlineInput: '',
            deadlineError: '',          // nouveau : message d'erreur
            parentConsent: false,
            studentName: '',
            isLoadingStudentName: false,
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true)
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={[feestyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={feestyle.headerSection}>
                        <View style={feestyle.headerbuttonContainer}>
                            <TouchableOpacity style={feestyle.headerButton} onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={feestyle.headertext}>
                            <Text style={[feestyle.headerTitle, styles.textBold]}>Frais de Scolarité</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    // ---- Marquer comme payé ----
    markAsPaid = (id) => {
        const fee = this.state.monthlyFees.find(item => item.id === id);
        if (!fee || fee.paid) return;

        const paymentDate = new Date().toISOString().split('T')[0];
        this.setState(prev => ({
            monthlyFees: prev.monthlyFees.map(item =>
                item.id === id ? { ...item, paid: true } : item
            ),
            paidFees: prev.paidFees + fee.amount,
            remainingFees: prev.remainingFees - fee.amount,
            paymentHistory: [
                {
                    id: Date.now(),
                    month: fee.month,
                    amount: fee.amount,
                    date: paymentDate,
                    method: 'Paiement via App',
                },
                ...prev.paymentHistory,
            ],
        }));
    };

    // ---- Calendrier principal (frais) ----
    hasDueDate = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return this.state.monthlyFees.some(fee => fee.dueDate === dateKey);
    };

    getDueInfo = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return this.state.monthlyFees.find(fee => fee.dueDate === dateKey);
    };

    changeMonth = (delta) => {
        this.setState(prev => {
            let newMonth = prev.currentMonth + delta;
            let newYear = prev.currentYear;
            if (newMonth < 0) { newMonth = 11; newYear--; }
            else if (newMonth > 11) { newMonth = 0; newYear++; }
            return { currentMonth: newMonth, currentYear: newYear };
        });
    };

    goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
        });
    };

    renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate } = this.state;
        const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Dimanche
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startWeekday = firstDay;

        const cells = [];
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        for (let i = 0; i < startWeekday; i++) {
            cells.push(<View key={`empty-${i}`} style={feestyle.dayEmpty} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasDue = this.hasDueDate(currentYear, currentMonth, day);
            const dueInfo = hasDue ? this.getDueInfo(currentYear, currentMonth, day) : null;
            const isSelected = selectedDate &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getDate() === day;
            const isToday = isCurrentMonth && day === today.getDate();

            cells.push(
                <TouchableOpacity
                    key={day}
                    style={[
                        feestyle.dayCell,
                        isToday && feestyle.todayCell,
                        isSelected && feestyle.selectedCell,
                        !isToday && { backgroundColor: '#E5E7EB', borderColor: '#D1D5DB' },
                    ]}
                    onPress={() => this.setState({ selectedDate: new Date(currentYear, currentMonth, day) })}
                >
                    <Text style={[
                        feestyle.dayText,
                        isToday && feestyle.todayDayText,
                        isSelected && feestyle.selectedDayText,
                    ]}>
                        {day}
                    </Text>
                    {hasDue && (
                        <View style={[
                            feestyle.classDot,
                            dueInfo.paid ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#EF4444' }
                        ]} />
                    )}
                </TouchableOpacity>
            );
        }
        return cells;
    };

    // ---- Historique ----
    getFilteredHistory = () => {
        const { paymentHistory, filterMonth, filterYear } = this.state;
        return paymentHistory.filter(item => {
            const yearMatch = filterYear === 'Tous' || item.date.startsWith(filterYear);
            const monthMatch = filterMonth === 'Tous' || item.month.includes(filterMonth);
            return yearMatch && monthMatch;
        });
    };

    getFilteredHistoryTotal = () => {
        return this.getFilteredHistory().reduce((sum, item) => sum + item.amount, 0);
    };

    renderMonthlyItem = ({ item }) => {
        const isSelected = this.state.selectedDueDate === item.dueDate;
        return (
            <View style={[
                feestyle.monthlyCard,
                item.paid && feestyle.paidMonthlyCard,
                isSelected && feestyle.selectedMonthlyCard
            ]}>
                <View style={feestyle.monthInfo}>
                    <Text style={[feestyle.monthName, styles.textBold]}>{item.month}</Text>
                    <Text style={[feestyle.dueDate, styles.text]}>Échéance : {item.dueDate}</Text>
                    <Text style={[feestyle.amount, styles.textBold]}>{item.amount.toLocaleString()} F</Text>
                </View>
                {item.paid ? (
                    <View style={feestyle.paidBadge}>
                        <Icon name="check-circle" size={22} color="#4CAF50" />
                        <Text style={[feestyle.paidText, styles.textBold]}>Payé</Text>
                    </View>
                ) : (
                    <TouchableOpacity style={feestyle.payButton} onPress={() => this.markAsPaid(item.id)}>
                        <Icon name="credit-card" size={22} color="#FFF" />
                        <Text style={[feestyle.payButtonText, styles.textBold]}>Payer</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    renderPaymentHistoryItem = ({ item }) => (
        <View style={feestyle.historyCard}>
            <View style={feestyle.historyLeft}>
                <Icon name="calendar-check" size={24} color="#6c5ce7" />
                <View style={feestyle.historyInfo}>
                    <Text style={[feestyle.historyMonth, styles.textBold]}>{item.month}</Text>
                    <Text style={[feestyle.historyDate, styles.text]}>{item.date}</Text>
                </View>
            </View>
            <View style={feestyle.historyRight}>
                <Text style={[feestyle.historyAmount, styles.textBold]}>+{item.amount.toLocaleString()} F</Text>
                <Text style={[feestyle.historyMethod, styles.text]}>{item.method}</Text>
            </View>
        </View>
    );

    // ---- Récupération du nom de l'élève ----
    fetchUserName = async () => {
        this.setState({ isLoadingStudentName: true });
        try {
            const response = await fetch('https://votre-api.com/api/user/profile', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (data && data.name) {
                this.setState({ studentName: data.name, isLoadingStudentName: false });
            } else {
                this.setState({
                    studentName: this.props.user_infos?.name || 'Étudiant',
                    isLoadingStudentName: false
                });
            }
        } catch (error) {
            this.setState({
                studentName: this.props.user_infos?.name || 'Étudiant',
                isLoadingStudentName: false
            });
        }
    };

    // ---- Moratoire : ouverture / fermeture ----
    _openMoratoireModal = async () => {
        this.setState({
            isMoratoireModalVisible: true,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            moratoireDeadlineInput: '',
            deadlineError: '',      // réinitialiser l'erreur
            parentConsent: false,
        });
        await this.fetchUserName();
    };

    _closeMoratoireModal = () => {
        this.setState({
            isMoratoireModalVisible: false,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            parentConsent: false,
        });
    };

    // ---- Gestion automatique de la date butoir (inspirée de signUpForm1) ----
    _formatDeadline = (text) => {
        // Garder uniquement les chiffres, maximum 8
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
        if (aaaa < 2000 || aaaa > 2100) return false;
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

    // ---- Soumission du moratoire ----
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
        Alert.alert('Succès', 'Votre demande de moratoire a été enregistrée. Elle est en attente de validation.');
    };

    // ---- Filtres et affichage des moratoires ----
    getFilteredMoratoires = () => {
        const { moratoires, moratoireFilter } = this.state;
        if (moratoireFilter === 'Tous') return moratoires;
        return moratoires.filter(m => m.status === moratoireFilter);
    };

    renderMoratoireItem = ({ item }) => {
        const statusColor = item.status === 'Validé' ? '#4CAF50' : item.status === 'En attente' ? '#f59e0b' : '#636E72';
        return (
            <View style={feestyle.moratoireCard}>
                <View style={feestyle.moratoireHeader}>
                    <Icon name="file-document-outline" size={22} color="#1B497D" />
                    <Text style={[feestyle.moratoireReason, styles.textBold]}>{item.reason}</Text>
                </View>
                <Text style={[feestyle.moratoireAmount, styles.text]}>Montant : {item.amount.toLocaleString()} F</Text>
                <Text style={[feestyle.moratoireDate, styles.text]}>Date butoir : {item.deadline}</Text>
                <Text style={[feestyle.moratoireDate, styles.text]}>Demandé le {item.requestDate}</Text>
                <View style={feestyle.moratoireStatusRow}>
                    <Icon name="circle" size={10} color={statusColor} />
                    <Text style={[feestyle.moratoireStatus, { color: statusColor }]}>{item.status}</Text>
                </View>
            </View>
        );
    };

    // ---- Barre d'onglets et filtres ----
    renderFilterContainer = () => {
        const { selectedTab, moratoireFilter } = this.state;
        const moratoireStatuses = ['Tous', 'En attente', 'Validé', 'Rejeté'];

        return (
            <View style={feestyle.filterContainer}>
                <View style={feestyle.tabContainer}>
                    <TouchableOpacity
                        style={[feestyle.tabButton, selectedTab === 'Frais payé' && feestyle.tabButtonActive]}
                        onPress={() => this.setState({ selectedTab: 'Frais payé' })}
                    >
                        <Icon name="cash-check" size={18} color={selectedTab === 'Frais payé' ? '#FFF' : '#636E72'} />
                        <Text style={[feestyle.tabButtonText, selectedTab === 'Frais payé' && feestyle.tabButtonTextActive]}>
                            Frais payé
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[feestyle.tabButton, selectedTab === 'Moratoire' && feestyle.tabButtonActive]}
                        onPress={() => this.setState({ selectedTab: 'Moratoire' })}
                    >
                        <Icon name="clock-alert-outline" size={18} color={selectedTab === 'Moratoire' ? '#FFF' : '#636E72'} />
                        <Text style={[feestyle.tabButtonText, selectedTab === 'Moratoire' && feestyle.tabButtonTextActive]}>
                            Moratoire
                        </Text>
                    </TouchableOpacity>
                </View>

                {selectedTab === 'Moratoire' && (
                    <View style={feestyle.filterRow}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={feestyle.filterChips}>
                                {moratoireStatuses.map((status) => (
                                    <TouchableOpacity
                                        key={status}
                                        style={[feestyle.filterChip, moratoireFilter === status && feestyle.filterChipActive]}
                                        onPress={() => this.setState({ moratoireFilter: status })}
                                    >
                                        <Text style={[feestyle.filterChipText, moratoireFilter === status && feestyle.filterChipTextActive]}>
                                            {status}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}

                <View style={feestyle.resultsBar}>
                    <Text style={[feestyle.resultsCount, styles.text]}>
                        {selectedTab === 'Frais payé'
                            ? `${this.state.monthlyFees.length} échéance${this.state.monthlyFees.length > 1 ? 's' : ''}`
                            : `${this.getFilteredMoratoires().length} moratoire${this.getFilteredMoratoires().length > 1 ? 's' : ''}`
                        }
                    </Text>
                    <View style={feestyle.resultsActions}>
                        <TouchableOpacity style={feestyle.sortButton}>
                            <Icon name="sort-calendar-descending" size={20} color="#1B497D" />
                        </TouchableOpacity>
                        {selectedTab === 'Moratoire' && moratoireFilter !== 'Tous' && (
                            <TouchableOpacity
                                style={feestyle.resetButton}
                                onPress={() => this.setState({ moratoireFilter: 'Tous' })}
                            >
                                <Icon name="filter-remove" size={18} color="#FF7675" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    // ---- Rendu principal ----
    render() {
        const {
            totalFees, paidFees, remainingFees, monthlyFees,
            selectedDueDate, filterMonth, filterYear, selectedTab
        } = this.state;

        const filteredHistory = this.getFilteredHistory();
        const filteredTotal = this.getFilteredHistoryTotal();

        const { currentMonth, currentYear } = this.state;
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const selectedDueInfo = selectedDueDate
            ? monthlyFees.find(f => f.dueDate === selectedDueDate)
            : null;

        const displayedFees = selectedDueDate
            ? monthlyFees.filter(item => item.dueDate === selectedDueDate)
            : monthlyFees;

        const filteredMoratoires = this.getFilteredMoratoires();

        return (
            <SafeAreaView style={feestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={feestyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToMenu}>
                                    <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold]}>Frais de Scolarité</Text>
                        </View>

                        {this.renderFilterContainer()}

                        {selectedTab === 'Frais payé' ? (
                            <>
                                {/* Statistiques */}
                                <View style={feestyle.statsContainer}>
                                    <View style={feestyle.statCard}>
                                        <Text style={[feestyle.statValue, styles.textBold]}>{totalFees.toLocaleString()} F</Text>
                                        <Text style={[feestyle.statLabel, styles.textBold]}>Total Annuel</Text>
                                    </View>
                                    <View style={feestyle.statCard}>
                                        <Text style={[feestyle.statValue, { color: '#4CAF50' }, styles.textBold]}>
                                            {paidFees.toLocaleString()} F
                                        </Text>
                                        <Text style={[feestyle.statLabel, styles.textBold]}>Payé</Text>
                                    </View>
                                    <View style={feestyle.statCard}>
                                        <Text style={[feestyle.statValue, { color: '#e74c3c' }, styles.textBold]}>
                                            {remainingFees.toLocaleString()} F
                                        </Text>
                                        <Text style={[feestyle.statLabel, styles.textBold]}>Restant</Text>
                                    </View>
                                </View>

                                {/* Calendrier principal */}
                                <View style={feestyle.calendarCard}>
                                    <View style={feestyle.calendarNav}>
                                        <TouchableOpacity onPress={() => this.changeMonth(-1)} style={feestyle.navBtn}>
                                            <Icon name="chevron-left" size={24} color="#4B5563" />
                                        </TouchableOpacity>
                                        <Text style={[feestyle.monthLabel, styles.textBold]}>
                                            {monthNames[currentMonth]} {currentYear}
                                        </Text>
                                        <TouchableOpacity onPress={this.goToToday} style={feestyle.todayButton}>
                                            <Icon name="calendar-today" size={20} color="#1976D2" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.changeMonth(1)} style={feestyle.navBtn}>
                                            <Icon name="chevron-right" size={24} color="#4B5563" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={feestyle.weekHeader}>
                                        {daysOfWeek.map(d => <Text key={d} style={feestyle.weekText}>{d}</Text>)}
                                    </View>
                                    <View style={feestyle.daysGrid}>
                                        {this.renderMonthlyGrid()}
                                    </View>
                                </View>

                                {/* Échéance sélectionnée */}
                                {selectedDueInfo && (
                                    <View style={feestyle.selectedDueCard}>
                                        <Text style={[feestyle.selectedDueTitle, styles.textBold]}>
                                            Échéance du {selectedDueDate}
                                        </Text>
                                        <Text style={feestyle.selectedDueMonth}>{selectedDueInfo.month}</Text>
                                        <Text style={feestyle.selectedDueAmount}>
                                            {selectedDueInfo.amount.toLocaleString()} F
                                        </Text>
                                        <View style={feestyle.statusContainer}>
                                            <Icon
                                                name={selectedDueInfo.paid ? "check-circle" : "clock-outline"}
                                                size={22}
                                                color={selectedDueInfo.paid ? "#4CAF50" : "#f59e0b"}
                                            />
                                            <Text style={[
                                                feestyle.selectedDueStatus,
                                                selectedDueInfo.paid ? styles.textGreen : styles.textOrange
                                            ]}>
                                                {selectedDueInfo.paid ? 'Payé' : 'En attente de paiement'}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {/* Mensualités */}
                                <View style={feestyle.monthlySection}>
                                    <Text style={[feestyle.sectionTitle, styles.textBold]}>
                                        {selectedDueDate ? "Échéance sélectionnée" : "Mensualités"}
                                    </Text>
                                    <FlatList
                                        data={displayedFees}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={this.renderMonthlyItem}
                                        scrollEnabled={false}
                                        ListEmptyComponent={
                                            <Text style={feestyle.emptyText}>Aucune échéance pour cette date</Text>
                                        }
                                    />
                                </View>

                                {/* Historique des paiements */}
                                <View style={feestyle.historySection}>
                                    <Text style={[feestyle.sectionTitle, styles.textBold]}>Historique des Paiements</Text>

                                    <View style={feestyle.filterContainer}>
                                        <View style={feestyle.filterGroup}>
                                            <Text style={[feestyle.filterLabel, styles.textBold]}>Mois</Text>
                                            <View style={feestyle.filterButtons}>
                                                {['Tous', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai'].map(month => (
                                                    <TouchableOpacity
                                                        key={month}
                                                        style={[feestyle.filterButton, filterMonth === month && feestyle.filterButtonActive]}
                                                        onPress={() => this.setState({ filterMonth: month })}
                                                    >
                                                        <Text style={[feestyle.filterButtonText, filterMonth === month && feestyle.filterButtonTextActive, styles.textBold]}>
                                                            {month}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>

                                        <View style={feestyle.filterGroup}>
                                            <Text style={[feestyle.filterLabel, styles.textBold]}>Année</Text>
                                            <View style={feestyle.filterButtons}>
                                                {['Tous', '2025', '2026'].map(year => (
                                                    <TouchableOpacity
                                                        key={year}
                                                        style={[feestyle.filterButton, filterYear === year && feestyle.filterButtonActive]}
                                                        onPress={() => this.setState({ filterYear: year })}
                                                    >
                                                        <Text style={[feestyle.filterButtonText, filterYear === year && feestyle.filterButtonTextActive, styles.textBold]}>
                                                            {year}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    </View>

                                    <View style={feestyle.totalFilteredCard}>
                                        <Text style={[feestyle.totalFilteredLabel, styles.text]}>Total des paiements filtrés</Text>
                                        <Text style={[feestyle.totalFilteredAmount, styles.textBold]}>
                                            {filteredTotal.toLocaleString()} F
                                        </Text>
                                    </View>

                                    <FlatList
                                        data={filteredHistory}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={this.renderPaymentHistoryItem}
                                        scrollEnabled={false}
                                        ListEmptyComponent={
                                            <Text style={[feestyle.emptyText, styles.text]}>Aucun paiement trouvé pour les filtres sélectionnés</Text>
                                        }
                                    />
                                </View>
                            </>
                        ) : (
                            /* Onglet Moratoire */
                            <View style={feestyle.moratoireListContainer}>
                                <FlatList
                                    data={filteredMoratoires}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={this.renderMoratoireItem}
                                    scrollEnabled={false}
                                    ListEmptyComponent={
                                        <Text style={[feestyle.emptyText, styles.text]}>Aucune demande de moratoire</Text>
                                    }
                                />
                            </View>
                        )}

                        <View style={{ height: 50 }} />
                    </Animated.ScrollView>

                    {/* Bouton + pour Moratoire */}
                    {selectedTab === 'Moratoire' && (
                        <TouchableOpacity style={feestyle.floatingButton} onPress={this._openMoratoireModal} activeOpacity={0.8}>
                            <Icon name="plus" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}

                    {/* Modal de demande de moratoire */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isMoratoireModalVisible}
                        onRequestClose={this._closeMoratoireModal}
                    >
                        <View style={feestyle.modalOverlay}>
                            <View style={feestyle.modalContainer}>
                                <View style={feestyle.modalHeader}>
                                    <Text style={[feestyle.modalTitle, styles.textBold]}>Nouvelle demande de moratoire</Text>
                                    <TouchableOpacity onPress={this._closeMoratoireModal}>
                                        <Icon name="close" size={24} color="#999" />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {/* Motif */}
                                    <Text style={[feestyle.modalLabel, styles.textBold]}>Motif *</Text>
                                    <TextInput
                                        style={feestyle.modalInput}
                                        placeholder="Raison de la demande"
                                        placeholderTextColor="#999"
                                        value={this.state.moratoireReason}
                                        onChangeText={(text) => this.setState({ moratoireReason: text })}
                                        maxLength={200}
                                    />

                                    {/* Montant */}
                                    <Text style={[feestyle.modalLabel, styles.textBold]}>Montant concerné (FCFA) *</Text>
                                    <TextInput
                                        style={feestyle.modalInput}
                                        placeholder="Ex: 150000"
                                        placeholderTextColor="#999"
                                        value={this.state.moratoireAmount}
                                        onChangeText={(text) => this.setState({ moratoireAmount: text })}
                                        keyboardType="numeric"
                                        maxLength={10}
                                    />

                                    {/* Date butoir – TextInput avec formatage et validation automatiques */}
                                    <Text style={[feestyle.modalLabel, styles.textBold]}>Date butoir *</Text>
                                    <View style={feestyle.modalInputWrapper}>
                                        <TextInput
                                            style={[
                                                feestyle.modalInput,
                                                this.state.deadlineError ? { borderColor: '#FF6B6B' } : null
                                            ]}
                                            placeholder="JJ/MM/AAAA"
                                            placeholderTextColor="#999"
                                            value={this.state.moratoireDeadlineInput}
                                            onChangeText={this._handleDeadlineChange}
                                            keyboardType="numeric"
                                            maxLength={10}
                                        />
                                        {this.state.deadlineError ? (
                                            <View style={feestyle.errorContainer}>
                                                <Icon name="alert-circle" size={16} color="#FF6B6B" />
                                                <Text style={feestyle.errorText}>{this.state.deadlineError}</Text>
                                            </View>
                                        ) : null}
                                    </View>

                                    {/* Case à cocher */}
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, gap: 10 }}
                                        onPress={() => this.setState(prev => ({ parentConsent: !prev.parentConsent }))}
                                        activeOpacity={0.7}
                                    >
                                        <Icon
                                            name={this.state.parentConsent ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                            size={24}
                                            color={this.state.parentConsent ? COLORS.primary : COLORS.textLight}
                                        />
                                        <Text style={[feestyle.checkboxLabel, styles.text]}>
                                            En soumettant ce formulaire, j'accepte les conditions suivantes : en cas de non-respect de l'engagement, l'élève{' '}
                                            {this.state.isLoadingStudentName ? (
                                                <Text style={styles.textBold}>Chargement...</Text>
                                            ) : (
                                                <Text style={styles.textBold}>{this.state.studentName || '_______'}</Text>
                                            )}{' '}
                                            ne sera plus admis au sein de l'établissement.
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Boutons */}
                                    <View style={feestyle.modalButtonsContainer}>
                                        <TouchableOpacity
                                            style={[feestyle.modalButton, feestyle.modalCancelButton]}
                                            onPress={this._closeMoratoireModal}
                                        >
                                            <Text style={[feestyle.modalCancelButtonText, styles.textBold]}>Annuler</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                feestyle.modalButton,
                                                feestyle.modalValidateButton,
                                                (!this.state.moratoireReason.trim() ||
                                                    !this.state.moratoireAmount.trim() ||
                                                    isNaN(this.state.moratoireAmount) ||
                                                    !this.state.moratoireDeadline ||
                                                    !this.state.parentConsent) && { opacity: 0.5 }
                                            ]}
                                            onPress={this.handleMoratoireSubmit}
                                            disabled={
                                                !this.state.moratoireReason.trim() ||
                                                !this.state.moratoireAmount.trim() ||
                                                isNaN(this.state.moratoireAmount) ||
                                                !this.state.moratoireDeadline ||
                                                !this.state.parentConsent
                                            }
                                        >
                                            <Text style={[feestyle.modalValidateButtonText, styles.textBold]}>Soumettre</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    {this.renderHeader()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchStudentMenuAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolFees);