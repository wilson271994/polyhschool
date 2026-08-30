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

import { feestyle } from '../../../assets/styles/schoolfees.js';
import { styles } from '../../../assets/styles/index.js';
import { switchHomePageAction } from '../../../navigations/rootNavigation.js';
import Moment from 'moment';
import 'moment/locale/fr';
import { COLORS } from '../../../assets/styles/theme.js';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { CreateFeeExtensionAction } from '../../../reducers/actions/index.js';

class Fees extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            selectedTab: 'Frais payé', // 'Frais payé' | 'Moratoire'
            moratoireFilter: 'Tous',
            scrollY: new Animated.Value(0),
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            selectedDueDate: null, 
            filterMonth: 'Tous',
            filterYear: 'Tous',
            moratoires: [],
            isMoratoireModalVisible: false,
            moratoireReason: '',
            moratoireAmount: '',
            moratoireDeadline: null,
            moratoireDeadlineInput: '',
            deadlineError: '',
            parentConsent: false,
            studentName: '',
            isLoadingStudentName: false,
            isFocusInstallment:false,
            selectedInstallment:''
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToHome = () => switchHomePageAction(true);

    _hasDueDate = (year, month, day) => {
        const { student_infos } = this.props;
        const installments = student_infos?.fee_installment || [];
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return installments?.some((fee) => fee.due_date === dateKey);
    };

    _getDueInfo = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return this.state.monthlyFees.find((fee) => fee.dueDate === dateKey);
    };

    _changeMonth = (delta) => {
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

    _goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            selectedDueDate: null,
        });
    };

    _renderMonthlyGrid = () => {
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
            const hasDue = this._hasDueDate(currentYear, currentMonth, day);
            const dueInfo = hasDue ? this._getDueInfo(currentYear, currentMonth, day) : null;

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

    _getFilteredHistory = () => {
        const { filterMonth, filterYear } = this.state;
        const { student_infos } = this.props;
        const paymentHistory = student_infos?.fee_installment || [];
        return paymentHistory.filter((item) => {
            const yearMatch = filterYear === 'Tous' || item.created_date.startsWith(filterYear);
            const monthMatch = filterMonth === 'Tous' || Moment(item.created_date).format('MMMM').toLowerCase().includes(filterMonth.toLowerCase()); 
            return yearMatch && monthMatch; 
        });
    };

    _getFilteredHistoryTotal = () => {
        return this._getFilteredHistory().reduce((sum, item) => Number(sum) + Number(item.amount), 0);
    };

    __renderMonthlyItem = ({ item }) => {
        const isSelected = this.state.selectedDueDate === item.due_date;
        const choosedate = this.state.selectedDate;
        return (
            <View
                style={[
                    feestyle.monthlyCard,
                    item.is_pay && feestyle.paidMonthlyCard,
                    isSelected && feestyle.selectedMonthlyCard,
                ]}
            >
                <View style={feestyle.monthInfo}>
                    <Text style={[styles.textBold, feestyle.monthName]}>{Moment(item.due_date).format('MMMM')}</Text>   
                    <Text style={[styles.text, feestyle.dueDate]}>Échéance : {Moment(item.due_date).format('D MMMM YYYY')}</Text> 
                    <Text style={[styles.textBold, feestyle.amount]}>
                        {item.amount.toLocaleString()} FCFA 
                    </Text>
                </View>
                {item.is_pay ? (
                    <View style={feestyle.paidBadge}>
                        <Icon name="check-circle" size={18} color="#10B981" />
                        <Text style={[styles.textBold, feestyle.paidText]}>Payé</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={feestyle.payButton}
                        onPress={() => this._markAsPaid(item.id)}
                        activeOpacity={0.8}
                    >
                        <Icon name="wallet-outline" size={16} color="#011638" />
                        <Text style={[styles.textBold, feestyle.payButtonText]}>Payer</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    _renderPaymentHistoryItem = ({ item }) => (
        <View style={feestyle.historyCard}>
            <View style={feestyle.historyLeft}>
                <View style={feestyle.historyIconBox}>
                    <Icon name="cash-fast" size={20} color="#f6a100" />
                </View>
                <View style={feestyle.historyInfo}>
                    <Text style={[styles.textBold, feestyle.historyMonth]}>{Moment(item.created_date).format('MMMM')}</Text>
                    <Text style={[styles.textBold, feestyle.historyNote]}>{item.note}</Text>
                    <Text style={[styles.text, feestyle.historyDate]}>{Moment(item.created_date).format('D MMMM YYYY HH:MM')}</Text> 
                </View>
            </View>
            <View style={feestyle.historyRight}>
                <Text style={[styles.textBold, item.is_pay ? feestyle.historyAmount : feestyle.historyunPaidAmount]}>
                    {item.is_pay ? '+' : '-'} {item.amount.toLocaleString()} FCFA
                </Text>
                <Text style={[styles.text, feestyle.historyMethod]}>{item.method}</Text>
            </View>
        </View>
    );

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

    _formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    /**
     * MANAGE MORATOIRE
     */
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

    _handleMoratoireInstallmentChange = (data) => {
        this.setState({selectedInstallment:data});
    }

    _submitMoratoire = () => {
        const { moratoireReason, moratoireAmount, moratoireDeadline, parentConsent, selectedInstallment, moratoires } = this.state;
        const {student_infos, user_token} = this.props;
        const fee_extension_list = student_infos.fee_extension;
        if (!selectedInstallment) {
            Toast.show({
                type: 'error',
                props: { title: 'Erreur', description: 'Veuillez indiquer le motif du moratoire'}
            });
            return;
        }
        if (!moratoireReason.trim()) {
            Toast.show({
                type: 'error',
                props: { title: 'Erreur', description: 'Veuillez indiquer le motif du moratoire'}
            });
            return;
        }
        if (!moratoireAmount.trim() || isNaN(moratoireAmount)) {
            Toast.show({
                type: 'error',
                props: { title: 'Erreur', description: 'Veuillez saisir un montant valide'}
            });
            return;
        }
        if (!moratoireDeadline) {
            Toast.show({
                type: 'error',
                props: { title: 'Erreur', description: 'Veuillez entrer une date butoir valide (JJ/MM/AAAA)'}
            });
            return;
        }
        if (!parentConsent) {
            Toast.show({
                type: 'error',
                props: { title: 'Erreur', description: 'Vous devez accepter les conditions pour soumettre la demande.'}
            });
            return;
        }
        var formData = new FormData();
        formData.append('token', user_token);
        formData.append('school', student_infos.school_id);
        formData.append('student', student_infos.id);
        formData.append('classe', student_infos.classe.id);
        formData.append('schoolfee', selectedInstallment.id);
        formData.append('reason', moratoireReason);
        formData.append('promise_amount', moratoireAmount);
        formData.append('promise_date', Moment(moratoireDeadline).format('YYYY-MM-DD'));
        CreateFeeExtensionAction(formData, fee_extension_list, this._closeMoratoireModal);
    };

    _getFilteredMoratoires = () => {
        const { moratoireFilter } = this.state;
        const { student_infos } = this.props;
        var fee_extension_list = student_infos.fee_extension;
        if (moratoireFilter === 'Tous') return fee_extension_list;
        if (moratoireFilter === 'Validé') return fee_extension_list.filter((item) => item.is_approved);
        if (moratoireFilter === 'En attente') return fee_extension_list.filter((item) => !item.is_approved && !item.is_rejected);
        if (moratoireFilter === 'Rejeté') return fee_extension_list.filter((item) => item.is_rejected);
    };

    _renderMoratoireItem = ({ item }) => {
        const isApproved = item.is_approved;
        const isPending = !item.is_approved;
        const isRejected = item.is_rejected;
        const statusColor = isApproved ? '#10B981' : isPending ? '#f6a100' : isRejected ? '#EF4444' : '#36D1DC';
        const status = item.is_approved ? 'Validé' : !item.is_approved && !item.is_rejected ? 'En attente' :  item.is_rejected ? 'Rejeté' : 'Non disponible'; 
        return (
            <View style={feestyle.moratoireCard}>
                <View style={feestyle.moratoireHeader}>
                    <Icon name="file-document-edit-outline" size={20} color="#f6a100" />
                    <Text style={[styles.textBold, feestyle.moratoireReason]}>{item.reason}</Text>
                </View>

                <Text style={[styles.text, feestyle.moratoireAmount]}>
                    Montant promis : <Text style={styles.textBold}>{item.promise_amount.toLocaleString()} FCFA</Text>
                </Text>

                <Text style={[styles.text, feestyle.moratoireAmount]}>
                    Montant approuvé : <Text style={styles.textBold}>{item.authorize_amount.toLocaleString()} FCFA</Text>
                </Text>

                <Text style={[styles.text, feestyle.moratoireDate]}>
                    Date d'échéance accordée : <Text style={{ color: '#FFFFFF' }}>{item.authorize_date ? Moment(item.authorize_date).format('D MMMM YYYY') : 'Donnée non disponible'}</Text>
                </Text>
                <Text style={[styles.text, feestyle.moratoireDate]}>
                    Demandé le {Moment(item.created_date).format('D MMMM YYYY')}
                </Text>

                <View style={feestyle.moratoireStatusRow}>
                    <View style={[feestyle.statusIndicator, { backgroundColor: statusColor }]} />
                    <Text style={[styles.textBold, feestyle.moratoireStatus, { color: statusColor }]}>
                        {status}
                    </Text>
                </View>
            </View>
        );
    };

    /**
     * 
     * @returns END MORATOIRE FUNCTION
     */

    _renderFilterContainer = () => {
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
                            {moratoireStatuses.map((status, key) => (
                                <TouchableOpacity
                                    key={key}
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
            selectedDueDate,
            filterMonth,
            selectedTab,
            currentMonth,
            currentYear,
            selectedInstallment,
        } = this.state;

        const { student_infos } = this.props;

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const filteredMoratoires = this._getFilteredMoratoires();
        const filteredHistory = this._getFilteredHistory();

        const installments = student_infos?.fee_installment || [];
        const totalFees = installments?.reduce((sum, item) => Number(sum) + (Number(item.amount)), 0) || 0;
        const paidFees = installments?.reduce((sum, item) => item.is_pay ? Number(sum) + (Number(item.amount)) : 0, 0) || 0; 
        const remainingFees = installments?.reduce((sum, item) => !item.is_pay ? Number(sum) + (Number(item.amount)) : 0, 0) || 0;

        const displayedFees = selectedDueDate
            ? installments.filter((item) => item.due_date === selectedDueDate)
            : installments;

        return (
            <SafeAreaView style={feestyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} /> 

                {/* Ambient Glows */}
                <View style={feestyle.topGlow} pointerEvents="none" />
                <View style={feestyle.bottomGlow} pointerEvents="none" />

                <View style={feestyle.headerBar}>
                    <TouchableOpacity
                        style={feestyle.backButton}
                        onPress={this._navigateToHome}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={[styles.textBold, feestyle.headerTitle]}>
                        Frais de Scolarité
                    </Text>
                </View>

                <Animated.ScrollView
                    style={{ flex: 1 }}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 110 }}
                >
                    {this._renderFilterContainer()}

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
                                    <TouchableOpacity onPress={() => this._changeMonth(-1)} style={feestyle.navBtn}>
                                        <Icon name="chevron-left" size={22} color="#FFFFFF" />
                                    </TouchableOpacity>
                                    <Text style={[styles.textBold, feestyle.monthLabel]}>
                                        {monthNames[currentMonth]} {currentYear}
                                    </Text>
                                    <TouchableOpacity onPress={this._goToToday} style={feestyle.todayButton}>
                                        <Icon name="calendar-today" size={16} color="#f6a100" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._changeMonth(1)} style={feestyle.navBtn}>
                                        <Icon name="chevron-right" size={22} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>

                                <View style={feestyle.weekHeader}>
                                    {daysOfWeek.map((d, key) => (
                                        <Text key={key} style={[styles.text, feestyle.weekText]}>
                                            {d}
                                        </Text>
                                    ))}
                                </View>

                                <View style={feestyle.daysGrid}>{this._renderMonthlyGrid()}</View>
                            </View>

                            {/* Section Mensualités */}
                            <View style={feestyle.sectionGlass}>
                                <Text style={[styles.textBold, feestyle.sectionTitle]}>
                                    {selectedDueDate ? `Échéance du ${selectedDueDate}` : 'Toutes les Échéances'}
                                </Text>
                                <FlatList
                                    data={displayedFees}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={this.__renderMonthlyItem}
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
                                                    style={[feestyle.filterChipText, filterMonth === m && feestyle.filterChipTextActive]}
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
                                    renderItem={this._renderPaymentHistoryItem}
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
                                renderItem={this._submitMoratoire}
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
                                <Text style={[styles.textBold, feestyle.modalLabel]}>Echéance concernée *</Text>
                                <Dropdown
                                    style={[feestyle.dropdown]}
                                    placeholderStyle={feestyle.placeholderStyle}
                                    selectedTextStyle={feestyle.selectedTextStyle}
                                    inputSearchStyle={feestyle.inputSearchStyle}
                                    containerStyle={feestyle.dropdownContainer}
                                    itemTextStyle={feestyle.itemTextStyle}
                                    data={installments}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={installments.length === 0 ? '⚠ Aucune echéance' : 'Sélectionner une echéance'}
                                    value={selectedInstallment}
                                    search
                                    searchPlaceholder="Rechercher..."
                                    onFocus={() => this.setState({ isFocusInstallment: true })}
                                    onBlur={() => this.setState({ isFocusInstallment: false })}
                                    onChange={this._handleMoratoireInstallmentChange}
                                    renderLeftIcon={() => (
                                        <Icon name="cube" size={18} color={COLORS.accentGold} style={{ marginRight: 8 }} />
                                    )}
                                />

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
                                        onPress={this._handleMoratoireSubmit}
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
    user_token: state.auth.user_token,
    student_infos: state.auth.student_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Fees);