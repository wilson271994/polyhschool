import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { planningstyle } from '../../../assets/styles/studentplanning';
import { COLORS } from '../../../assets/styles/theme';
import { switchHomePageAction } from '../../../navigations/rootNavigation';
import { styles } from '../../../assets/styles';

class Planning extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            schedule: {},
        };
    }

    componentDidMount() {
        this._buildSchedule();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.student_infos !== this.props.student_infos) {
            this._buildSchedule();
        }
    }

    _formatDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    _buildSchedule = () => {
        const { student_infos } = this.props;
        const allTodayCourse = student_infos?.all_timetable || student_infos?.student_infos?.all_timetable || [];
        const schedule = allTodayCourse.reduce((acc, item) => {
            const dateKey = item?.date || item?.course_date || item?.start_date || '';
            if (!dateKey) return acc;

            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push({
                id          : item?.id || undefined,
                subject     : item?.course.course_name || '--',
                start_time  : item?.period_start_time || '--',
                end_time    : item?.period_end_time || '--',
                teacher     : item?.teacher.staff.name || '--',
                sector      : item?.sector.name || '--', 
                lessons     : item?.lessontimetable || []
            });
            return acc;
        }, {});

        this.setState({ schedule });
    };

    _navigateToHome = () => {
        switchHomePageAction(true);
    };

    _goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
        });
    };

    _changeMonth = (delta) => {
        this.setState(prev => {
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

    _hasClasses = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return !!(this.state.schedule[dateKey] && this.state.schedule[dateKey].length > 0);
    };

    _renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate } = this.state;
        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Dimanche = 0, Lundi = 1, ..., Samedi = 6
        const startWeekday = firstDay.getDay();

        const cells = [];
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        // 1. Cases vides avant le 1er du mois
        for (let i = 0; i < startWeekday; i++) {
            cells.push(<View key={`empty-${i}`} style={planningstyle.dayCellWrapper} />);
        }

        // 2. Jours du mois
        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const hasClass = this._hasClasses(currentYear, currentMonth, day);
            const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
            const isToday = isCurrentMonth && dateObj.getDate() === today.getDate();

            cells.push(
                <View key={day} style={planningstyle.dayCellWrapper}>
                    <TouchableOpacity
                        style={[
                            planningstyle.dayCell,
                            hasClass && planningstyle.hasClassCell,
                            isToday && planningstyle.todayCell,
                            isSelected && planningstyle.selectedCell,
                        ]}
                        onPress={() => this.setState({ selectedDate: dateObj })}
                        activeOpacity={0.75}
                    >
                        <Text style={[
                            planningstyle.dayText,
                            hasClass && planningstyle.hasClassDayText,
                            isToday && planningstyle.todayDayText,
                            isSelected && planningstyle.selectedDayText,
                        ]}>
                            {day}
                        </Text>

                        <View style={[
                            planningstyle.classDot,
                            hasClass ? planningstyle.hasClassDot : planningstyle.noClassDot,
                            isSelected && { backgroundColor: COLORS.textDark }
                        ]} />
                    </TouchableOpacity>
                </View>
            );
        }

        return cells;
    };

    render() {
        const { currentMonth, currentYear, selectedDate } = this.state;

        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const dateKey = selectedDate ? this._formatDateKey(selectedDate) : '';
        const dayClasses = this.state.schedule[dateKey] || [];
        return (
            <SafeAreaView style={planningstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary}/>

                {/* Halo Lumineux Poly-H */}
                <View style={planningstyle.topGlow} pointerEvents="none" />
                <View style={planningstyle.bottomGlow} pointerEvents="none" />

                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 110 }}
                >
                    {/* En-tête local propre (sans dépendre de styles externes) */}
                    <View style={planningstyle.localHeader}>
                        <TouchableOpacity
                            style={planningstyle.btnBackCustom}
                            onPress={this._navigateToHome}
                            activeOpacity={0.7}
                        >
                            <Icon name="chevron-left" size={26} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <Text style={planningstyle.localTitleText}>
                            Calendrier des cours
                        </Text>
                    </View>

                    {/* Calendrier Mensuel */}
                    <View style={planningstyle.calendarCard}>
                        <View style={planningstyle.calendarNav}>
                            <TouchableOpacity onPress={() => this._changeMonth(-1)} style={planningstyle.navBtn}>
                                <Icon name="chevron-left" size={22} color={COLORS.textPrimary} />
                            </TouchableOpacity>

                            <Text style={planningstyle.monthLabel}>
                                {monthNames[currentMonth]} {currentYear}
                            </Text>

                            <TouchableOpacity onPress={this._goToToday} style={planningstyle.todayButton}>
                                <Icon name="calendar-today" size={18} color={COLORS.accentGold} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this._changeMonth(1)} style={planningstyle.navBtn}>
                                <Icon name="chevron-right" size={22} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={planningstyle.weekHeader}>
                            {daysOfWeek.map(d => (
                                <View key={d} style={planningstyle.dayCellWrapper}>
                                    <Text style={planningstyle.weekText}>{d}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={planningstyle.daysGrid}>
                            {this._renderMonthlyGrid()}
                        </View>
                    </View>

                    {/* Liste des cours pour le jour sélectionné */}
                    <View style={planningstyle.detailsContainer}>
                        <Text style={planningstyle.detailsTitle}>
                            Cours du {selectedDate.toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}
                        </Text>

                        {dayClasses.length === 0 ? (
                            <View style={planningstyle.emptyState}>
                                <Icon name="calendar-blank-outline" size={38} color={COLORS.textMuted} />
                                <Text style={planningstyle.emptyText}>
                                    Aucun cours prévu pour cette journée.
                                </Text>
                            </View>
                        ) : (
                            dayClasses.map(item => (
                                <View key={item.id} style={planningstyle.classCard}>
                                    <View style={planningstyle.timeColumn}>
                                        <Text style={planningstyle.startTime}>{item.start_time}</Text>
                                        <View style={planningstyle.timeLine} />
                                        <Text style={planningstyle.endTime}>{item.end_time}</Text>
                                    </View>

                                    <View style={planningstyle.classInfo}>
                                        <View style={planningstyle.subjectHeader}>
                                            <Text style={planningstyle.subjectTitle} numberOfLines={1}>
                                                {item.subject}
                                            </Text>
                                            <View style={planningstyle.roomBadge}>
                                                <Text style={planningstyle.roomText}>Salle : {item.sector}</Text>
                                            </View>
                                        </View>

                                        <View style={planningstyle.detailRow}>
                                            <Icon name="book-open-variant" size={14} color={COLORS.accentCyan} />
                                            {
                                                item.lessons ?
                                                    item.lessons.map((less, key) => 
                                                        <View style={planningstyle.containerlesson} key={key}>
                                                            <Text style={[styles.textBold, planningstyle.lessonText]} numberOfLines={1}>
                                                                Lecon : {less.lesson.lesson_name}
                                                            </Text>
                                                            <Text style={[styles.text, planningstyle.lessonTime]} numberOfLines={1}>
                                                                Periode : {less.period_start_time} - {less.period_end_time}
                                                            </Text>
                                                            <Text style={[styles.text, planningstyle.lessonTime]} numberOfLines={1}>
                                                                Statut : {less.is_complete ? 'Termine' : 'En cours'}
                                                            </Text>
                                                        </View>
                                                    )
                                                :null
                                            }
                                        </View>

                                        <View style={planningstyle.detailRow}>
                                            <Icon name="account-tie" size={14} color={COLORS.textMuted} />
                                            <Text style={planningstyle.teacherText} numberOfLines={1}>
                                                {item.teacher}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHomePageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    student_infos: state.auth.student_infos || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Planning);