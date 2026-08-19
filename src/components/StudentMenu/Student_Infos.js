import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    StatusBar,
    SafeAreaView,
    Modal,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../assets/styles/index.js';
import { switchHomePageAction } from '../../navigations/rootNavigation.js';
import { BASE_URL } from '../../api/config.js';
import { studentinfostyle } from '../../assets/styles/studentinfos.js';

class child_Infos extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            today: today,
            selectedDate: today,
            selectedSequenceId: null,
            selectedSequenceName: 'Toutes les séquences',
            showSequenceModal: false,
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    getStudentData = () => {
        const { student_infos } = this.props;
        if (!student_infos) return {};

        if (student_infos.admission || student_infos.student) {
            return student_infos;
        }

        if (student_infos.student_infos) {
            return student_infos.student_infos;
        }

        return {};
    };

    getSequences = () => {
        const data = this.getStudentData();
        const sequences = data.sequences || data.student_infos?.sequences || [];
        return Array.isArray(sequences) ? sequences : [];
    };

    getSequenceOptions = () => {
        const sequences = this.getSequences();
        return [
            { label: 'Toutes les séquences', value: null },
            ...sequences.map((seq) => ({
                label: `${seq.sequence || seq.name || ''} ${seq.date ? `(${seq.date})` : ''}`.trim(),
                value: seq.id,
            })),
        ];
    };

    _selectSequence = (item) => {
        this.setState({
            selectedSequenceId: item.value,
            selectedSequenceName: item.label,
            showSequenceModal: false,
        });
    };

    getFilteredResults = () => {
        const { selectedSequenceId } = this.state;
        const sequences = this.getSequences();
        const data = this.getStudentData();

        if (!selectedSequenceId) {
            return data.courses || [];
        }

        const selectedSequence = sequences.find((s) => s.id === selectedSequenceId);
        return selectedSequence?.courses || [];
    };

    _openSequenceModal = () => this.setState({ showSequenceModal: true });
    _closeSequenceModal = () => this.setState({ showSequenceModal: false });

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
        });
    };

    _safeString = (value, fallback = 'N/A') => {
        if (value === null || value === undefined || value === '') return fallback;
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    };

    renderHeader = () => {
        return (
            <View style={studentinfostyle.headerBar}>
                <TouchableOpacity
                    style={studentinfostyle.backButton}
                    onPress={this._navigateToMenu}
                    activeOpacity={0.7}
                >
                    <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.textBold, studentinfostyle.headerTitle]}>
                    Informations Personnelles
                </Text>
            </View>
        );
    };

    renderCalendar = () => {
        const { currentMonth, currentYear, selectedDate, today } = this.state;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        const cells = [];

        // Cases vides de début de mois pour aligner sous le bon jour
        for (let i = 0; i < firstDay; i++) {
            cells.push(<View key={`empty-${i}`} style={studentinfostyle.dayCellEmpty} />);
        }

        // Cases des jours du mois
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getDate() === day;

            const isToday = isCurrentMonth && day === today.getDate();

            cells.push(
                <TouchableOpacity
                    key={day}
                    style={studentinfostyle.dayCellTouch}
                    activeOpacity={0.7}
                    onPress={() =>
                        this.setState({
                            selectedDate: new Date(currentYear, currentMonth, day),
                        })
                    }
                >
                    <View
                        style={[
                            studentinfostyle.dayCellContent,
                            isToday && studentinfostyle.todayCell,
                            isSelected && studentinfostyle.selectedCell,
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                studentinfostyle.dayText,
                                isToday && studentinfostyle.todayDayText,
                                isSelected && studentinfostyle.selectedDayText,
                            ]}
                        >
                            {day}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View style={studentinfostyle.calendarCard}>
                {/* Barre de navigation du calendrier */}
                <View style={studentinfostyle.calendarNav}>
                    <TouchableOpacity onPress={() => this.changeMonth(-1)} style={studentinfostyle.navBtn}>
                        <Icon name="chevron-left" size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={[styles.textBold, studentinfostyle.monthTitle]}>
                        {monthNames[currentMonth]} {currentYear}
                    </Text>

                    <TouchableOpacity onPress={this.goToToday} style={studentinfostyle.todayButton}>
                        <Icon name="calendar-today" size={16} color="#f6a100" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.changeMonth(1)} style={studentinfostyle.navBtn}>
                        <Icon name="chevron-right" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* En-tête des jours de la semaine */}
                <View style={studentinfostyle.weekHeader}>
                    {daysOfWeek.map((wd) => (
                        <Text key={wd} style={[styles.textBold, studentinfostyle.weekText]}>
                            {wd}
                        </Text>
                    ))}
                </View>

                {/* Grille des jours */}
                <View style={studentinfostyle.daysGrid}>{cells}</View>
            </View>
        );
    };

    renderSequenceItem = ({ item }) => {
        const isSelected = this.state.selectedSequenceId === item.value;
        return (
            <TouchableOpacity
                style={[studentinfostyle.sequenceItem, isSelected && studentinfostyle.sequenceItemActive]}
                onPress={() => this._selectSequence(item)}
                activeOpacity={0.7}
            >
                <Text style={[styles.textBold, studentinfostyle.sequenceItemText, isSelected && studentinfostyle.sequenceItemTextActive]}>
                    {item.label}
                </Text>
                {isSelected && <Icon name="check-circle" size={20} color="#f6a100" />}
            </TouchableOpacity>
        );
    };

    render() {
        const { user_infos } = this.props;
        const { showSequenceModal, selectedSequenceName } = this.state;

        const data = this.getStudentData();
        const admission = data.admission || {};
        const student = data.student || {};
        const classe = data.classe || {};
        const field = admission.speciality || {};

        const courses = this.getFilteredResults();

        const imagePP = user_infos?.pp ? BASE_URL + user_infos.pp : '';
        const avatarUri = imagePP || 'https://i.pravatar.cc/150?img=68';

        const fullName = user_infos?.name || `${user_infos?.first_name || ''} ${user_infos?.last_name || ''}`.trim() || 'Étudiant';
        const rollNumber = this._safeString(admission.roll_number, 'STU-00124');
        const className = this._safeString(classe?.name, 'Classe non assignée');
        const departmentName = this._safeString(field?.name, 'Général');

        return (
            <SafeAreaView style={studentinfostyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Halo lumineux d'arrière-plan */}
                <View style={studentinfostyle.topGlow} pointerEvents="none" />
                <View style={studentinfostyle.bottomGlow} pointerEvents="none" />

                {this.renderHeader()}

                <Animated.ScrollView
                    style={studentinfostyle.container}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 110 }}
                >
                    {/* Carte Profil Étudiant */}
                    <View style={studentinfostyle.glassCard}>
                        <View style={studentinfostyle.profileHeader}>
                            <Image source={{ uri: avatarUri }} style={studentinfostyle.avatar} />
                            <View style={studentinfostyle.headerText}>
                                <Text style={[styles.textBold, studentinfostyle.name]}>{fullName}</Text>
                                <Text style={[styles.text, studentinfostyle.stuId]}>Matricule : {rollNumber}</Text>
                                <View style={studentinfostyle.classBadge}>
                                    <Icon name="google-classroom" size={12} color="#f6a100" style={{ marginRight: 4 }} />
                                    <Text style={[styles.textBold, studentinfostyle.classBadgeText]}>{className}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={studentinfostyle.divider} />

                        <Text style={[styles.textBold, studentinfostyle.subTitle]}>Détails de l'étudiant</Text>

                        <View style={studentinfostyle.detailItem}>
                            <Text style={[styles.textBold, studentinfostyle.detailLabel]}>Département :</Text>
                            <Text style={[styles.text, studentinfostyle.detailValue]}>{departmentName}</Text>
                        </View>
                        <View style={studentinfostyle.detailItem}>
                            <Text style={[styles.textBold, studentinfostyle.detailLabel]}>Sexe :</Text>
                            <Text style={[styles.text, studentinfostyle.detailValue]}>{this._safeString(admission?.sexe || user_infos?.sexe, 'Masculin')}</Text>
                        </View>
                        <View style={studentinfostyle.detailItem}>
                            <Text style={[styles.textBold, studentinfostyle.detailLabel]}>Téléphone :</Text>
                            <Text style={[styles.text, studentinfostyle.detailValue]}>{this._safeString(student?.phone || user_infos?.phone)}</Text>
                        </View>
                        <View style={studentinfostyle.detailItem}>
                            <Text style={[styles.textBold, studentinfostyle.detailLabel]}>Email :</Text>
                            <Text style={[styles.text, studentinfostyle.detailValue]}>{this._safeString(student?.email || user_infos?.email)}</Text>
                        </View>
                        <View style={studentinfostyle.detailItem}>
                            <Text style={[styles.textBold, studentinfostyle.detailLabel]}>Naissance :</Text>
                            <Text style={[styles.text, studentinfostyle.detailValue]}>{this._safeString(student?.birthday_date)}</Text>
                        </View>

                        <Text style={[styles.textBold, studentinfostyle.subTitle]}>À propos</Text>
                        <Text style={[styles.text, studentinfostyle.aboutText]}>
                            {this._safeString(student?.about, "Aucune description disponible.")}
                        </Text>

                        <Text style={[styles.textBold, studentinfostyle.subTitle]}>Certification</Text>
                        <Text style={[styles.text, studentinfostyle.aboutText]}>
                            {this._safeString(student?.certification, "Aucune certification enregistrée.")}
                        </Text>
                    </View>

                    {/* Section Activité */}
                    <View style={studentinfostyle.glassCard}>
                        <Text style={[styles.textBold, studentinfostyle.sectionTitle]}>Activité & Assiduité</Text>

                        {this.renderCalendar()}

                        <View style={studentinfostyle.activityNote}>
                            <View style={studentinfostyle.noteHeaderRow}>
                                <Icon name="clock-check-outline" size={16} color="#f6a100" />
                                <Text style={[styles.textBold, studentinfostyle.noteDay]}>Présence :</Text>
                            </View>
                            <Text style={[styles.text, studentinfostyle.noteText]}>
                                L'étudiant fait preuve d'une excellente assiduité et participe régulièrement aux cours.
                            </Text>
                        </View>
                    </View>

                    {/* Section Examens Séquentiels */}
                    <View style={studentinfostyle.glassCard}>
                        <Text style={[styles.textBold, studentinfostyle.sectionTitle]}>Examens Séquentiels</Text>

                        <TouchableOpacity
                            style={studentinfostyle.filterButton}
                            onPress={this._openSequenceModal}
                            activeOpacity={0.8}
                        >
                            <Icon name="filter-variant" size={18} color="#f6a100" />
                            <Text style={[styles.textBold, studentinfostyle.filterButtonText]}>
                                {selectedSequenceName}
                            </Text>
                            <Icon name="chevron-down" size={18} color="#f6a100" />
                        </TouchableOpacity>

                        <View style={studentinfostyle.resultTable}>
                            <View style={studentinfostyle.tableHeader}>
                                <Text style={[styles.textBold, studentinfostyle.tableHeaderCell, { flex: 2 }]}>Matière</Text>
                                <Text style={[styles.textBold, studentinfostyle.tableHeaderCell, { flex: 1 }]}>Note</Text>
                                <Text style={[styles.textBold, studentinfostyle.tableHeaderCell, { flex: 1 }]}>Appréciation</Text>
                            </View>

                            {courses.length > 0 ? (
                                courses.map((item, index) => {
                                    const markStr = this._safeString(item.mark, '-');
                                    const isFail = markStr.startsWith('0') || markStr.startsWith('1') || markStr.startsWith('2') || markStr.startsWith('3') || markStr.startsWith('4') || markStr.startsWith('5') || markStr.startsWith('6') || markStr.startsWith('7') || markStr.startsWith('8') || markStr.startsWith('9') ? parseFloat(markStr) < 10 : false;

                                    return (
                                        <View key={index} style={studentinfostyle.tableRow}>
                                            <Text style={[styles.text, studentinfostyle.tableCell, { flex: 2, textAlign: 'left', paddingLeft: 8 }]}>
                                                {this._safeString(item.course_name || item.subject)}
                                            </Text>
                                            <Text style={[styles.textBold, studentinfostyle.tableCell, { flex: 1, color: isFail ? '#EF4444' : '#10B981' }]}>
                                                {markStr}
                                            </Text>
                                            <Text style={[styles.text, studentinfostyle.tableCell, { flex: 1 }, isFail && studentinfostyle.failText]}>
                                                {this._safeString(item.grade, 'N/A')}
                                            </Text>
                                        </View>
                                    );
                                })
                            ) : (
                                <Text style={[styles.text, studentinfostyle.noResult]}>
                                    Aucun résultat disponible pour cette séquence.
                                </Text>
                            )}
                        </View>
                    </View>
                </Animated.ScrollView>

                {/* Modal de sélection de Séquence */}
                <Modal
                    visible={showSequenceModal}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={this._closeSequenceModal}
                >
                    <View style={studentinfostyle.modalOverlay}>
                        <TouchableOpacity
                            style={studentinfostyle.modalBackdrop}
                            activeOpacity={1}
                            onPress={this._closeSequenceModal}
                        />
                        <View style={studentinfostyle.modalContent}>
                            <View style={studentinfostyle.modalHandle} />
                            <View style={studentinfostyle.modalHeader}>
                                <Text style={[styles.textBold, studentinfostyle.modalTitle]}>Choisir une séquence</Text>
                                <TouchableOpacity onPress={this._closeSequenceModal} activeOpacity={0.7}>
                                    <Icon name="close" size={22} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={this.getSequenceOptions()}
                                renderItem={this.renderSequenceItem}
                                keyExtractor={(item) => item.value?.toString() || 'all'}
                                contentContainerStyle={studentinfostyle.sequenceList}
                                showsVerticalScrollIndicator={false}
                            />
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
    student_infos: state.auth.student_infos || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(child_Infos);