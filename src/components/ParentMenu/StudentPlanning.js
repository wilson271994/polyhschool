import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, Animated, TouchableOpacity, Image, ImageBackground, } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { planningstyle } from '../../assets/styles/studentplanning';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';


const mockSchedule = {
    '2026-03-10': [
        { id: 1, subject: 'Mathématiques', lesson: 'Algèbre Linéaire - Matrices', start: '08:00', end: '10:00', teacher: 'M. Dupont', room: 'Salle 102' }
    ],
    '2026-03-18': [
        { id: 2, subject: 'Physique', lesson: 'Optique Géométrique', start: '14:00', end: '16:00', teacher: 'M. Legrand', room: 'Labo 04' }
    ],
    '2026-03-19': [
        { id: 3, subject: 'Anglais', lesson: 'Grammar & Vocabulary', start: '09:00', end: '11:00', teacher: 'M. Bernard', room: '205' }
    ],
    '2026-03-20': [
        { id: 4, subject: 'Histoire-Géo', lesson: 'La Guerre Froide', start: '10:15', end: '12:15', teacher: 'Mme Martin', room: 'Amphi B' }
    ],
};

class StudentPlanning extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            schedule: mockSchedule,
            scrollY: new Animated.Value(0),
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
        });
    };

    changeMonth = (delta) => {
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


    hasClasses = (year, month, day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return !!(this.state.schedule[dateKey] && this.state.schedule[dateKey].length > 0);
    };

    renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate } = this.state;
        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startWeekday = (firstDay.getDay() + 6) % 6; // Lundi = 0

        const cells = [];
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        for (let i = 0; i < startWeekday; i++) {
            cells.push(<View key={`empty-${i}`} style={planningstyle.dayEmpty} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const hasClass = this.hasClasses(currentYear, currentMonth, day);
            const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
            const isToday = isCurrentMonth && dateObj.getDate() === today.getDate();

            cells.push(
                <TouchableOpacity
                    key={day}
                    style={[
                        planningstyle.dayCell,
                        isToday && planningstyle.todayCell,
                        isSelected && planningstyle.selectedCell,
                        hasClass && planningstyle.hasClassCell,
                        !hasClass && planningstyle.noClassCell,
                    ]}
                    onPress={() => this.setState({ selectedDate: dateObj })}
                >
                    <Text style={[
                        planningstyle.dayText,
                        isToday && planningstyle.todayDayText, styles.textBold,
                        isSelected && planningstyle.selectedDayText, styles.textBold,
                        hasClass && planningstyle.hasClassDayText,
                    ]}>
                        {day}
                    </Text>

                    {/* Point indicateur sur TOUS les jours */}
                    <View style={[
                        planningstyle.classDot,
                        hasClass ? planningstyle.hasClassDot : planningstyle.noClassDot,
                        isSelected && { backgroundColor: '#fff' }
                    ]} />
                </TouchableOpacity>
            );
        }

        return cells;
    };


    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[planningstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={planningstyle.headerSection}>
                        <View style={planningstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={planningstyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={planningstyle.headertext}>
                            <Text style={[planningstyle.headerTitle, styles.textBold]}>Mon Planning</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };


    render() {
        const { currentMonth, currentYear, selectedDate, schedule } = this.state;
        const dateKey = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
        const dayClasses = schedule[dateKey] || [];

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        return (
            <SafeAreaView style={planningstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >

                    <Animated.ScrollView
                        style={planningstyle.container}
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
                            <Text style={[styles.sectionTitle, styles.textBold,]}>Mon Planning</Text>
                        </View>

                        <View style={planningstyle.calendarCard}>
                            <View style={planningstyle.calendarNav}>
                                <TouchableOpacity onPress={() => this.changeMonth(-1)} style={planningstyle.navBtn}>
                                    <Icon name="chevron-left" size={24} color="#4B5563" />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>

                                <Text style={[planningstyle.monthLabel, styles.textBold,]}>
                                    {monthNames[currentMonth]} {currentYear}
                                </Text>
                                <TouchableOpacity onPress={this.goToToday} style={planningstyle.todayButton}>
                                    <Icon name="calendar-today" size={20} color="#1976D2" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeMonth(1)} style={planningstyle.navBtn}>
                                    <Icon name="chevron-right" size={24} color="#4B5563" />
                                </TouchableOpacity>

                            </View>

                            <View style={planningstyle.weekHeader}>
                                {daysOfWeek.map(d => (
                                    <Text key={d} style={planningstyle.weekText}>{d}</Text>
                                ))}
                            </View>

                            <View style={planningstyle.daysGrid}>
                                {this.renderMonthlyGrid()}
                            </View>
                        </View>

                        <View style={planningstyle.detailsContainer}>
                            <Text style={[planningstyle.detailsTitle, styles.textBold]}>
                                Cours du {selectedDate.toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long'
                                })}
                            </Text>

                            {dayClasses.length === 0 ? (
                                <View style={planningstyle.emptyState}>
                                    <Text style={[planningstyle.emptyText, styles.text]}>Aucun cours prévu pour cette journée.</Text>
                                </View>
                            ) : (
                                dayClasses.map(item => (
                                    <View key={item.id} style={planningstyle.classCard}>
                                        <View style={planningstyle.timeColumn}>
                                            <Text style={[planningstyle.startTime, styles.textBold]}>{item.start}</Text>
                                            <View style={planningstyle.timeLine} />
                                            <Text style={[planningstyle.endTime, styles.text]}>{item.end}</Text>
                                        </View>
                                        <View style={planningstyle.classInfo}>
                                            <View style={planningstyle.subjectHeader}>
                                                <Text style={[planningstyle.subjectTitle, styles.textBold]}>{item.subject}</Text>
                                                <View style={planningstyle.roomBadge}>
                                                    <Text style={[planningstyle.roomText, styles.textBold]}>{item.room}</Text>
                                                </View>
                                            </View>
                                            <View style={planningstyle.detailRow}>
                                                <Icon name="book" size={14} color="#6366F1" />
                                                <Text style={[planningstyle.lessonText, styles.text]} numberOfLines={1}>{item.lesson}</Text>
                                            </View>
                                            <View style={planningstyle.detailRow}>
                                                <Icon name="account-tie" size={14} color="#6B7280" />
                                                <Text style={[planningstyle.teacherText, styles.text]}>{item.teacher}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>
                        <View style={{ height: 50 }} />
                    </Animated.ScrollView>

                    {this.renderHeader()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchStudentMenuAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentPlanning);