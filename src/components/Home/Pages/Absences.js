import React, { PureComponent } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { styles } from '../../../assets/styles';
import { absencestyle } from '../../../assets/styles/studentabsences';
import { switchHomePageAction } from '../../../navigations/rootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Absences extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            absences: this.getMockAbsences(),
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

    goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
        });
    };


    getMockAbsences = () => {
        const data = {};
        const todayStr = new Date().toISOString().split('T')[0];

        data[todayStr] = [
            { id: 1, title: 'Cours d\'Anglais', start: '08:00', end: '10:00', comment: 'Élève absent sans motif préalable.', type: 'Injustifié' },
            { id: 2, title: 'Physique-Chimie', start: '10:15', end: '12:15', comment: 'Rendez-vous médical signalé par les parents.', type: 'Justifié' }
        ];

        const future = new Date();
        future.setDate(future.getDate() + 2);
        const futureStr = future.toISOString().split('T')[0];
        data[futureStr] = [
            { id: 3, title: 'Mathématiques', start: '14:00', end: '16:00', comment: 'Retard de 20 minutes constaté.', type: 'Retard' }
        ];

        return data;
    };

    changeMonth = (delta) => {
        let { currentMonth, currentYear } = this.state;
        currentMonth += delta;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        this.setState({ currentMonth, currentYear });
    };

    renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate, absences } = this.state;
        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startWeekday = (firstDay.getDay() + 6) % 6; // Ajusté pour commencer le Lundi

        const cells = [];
        for (let i = 0; i < startWeekday; i++) {
            cells.push(<View key={`empty-${i}`} style={absencestyle.dayEmpty} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const dateKey = dateObj.toISOString().split('T')[0];
            const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
            const hasAbsence = absences[dateKey] && absences[dateKey].length > 0;
            const isToday = dateObj.toDateString() === new Date().toDateString();

            cells.push(
                <TouchableOpacity
                    key={day}
                    style={[
                        absencestyle.dayCell,
                        isSelected && absencestyle.selectedCell, absencestyle.daycell,
                        isToday && !isSelected && absencestyle.todayCell
                    ]}
                    onPress={() => this.setState({ selectedDate: dateObj })}
                >
                    <Text style={[
                        absencestyle.dayText, styles.textBold,
                        isSelected && absencestyle.selectedDayText, styles.textBold,
                        isToday && !isSelected && absencestyle.todayDayText, styles.textBold,
                    ]}>
                        {day}
                    </Text>
                    {hasAbsence && (
                        <View style={[absencestyle.absenceDot, isSelected && { backgroundColor: '#fff' }]} />
                    )}
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
            <Animated.View style={[absencestyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={absencestyle.headerSection}>
                        <View style={absencestyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={absencestyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={absencestyle.headertext}>
                            <Text style={[absencestyle.headerTitle, styles.textBold]}>Suivi des présences</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { currentMonth, currentYear, selectedDate, absences } = this.state;
        const dateKey = selectedDate.toISOString().split('T')[0];
        const selectedDayAbsences = absences[dateKey] || [];

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        return (
            <View style={absencestyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={absencestyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToMenu}>
                                    <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold,]}>Suivi des présences</Text>
                        </View>

                        <View style={absencestyle.calendarCard}>
                            <View style={absencestyle.calendarNav}>



                                <TouchableOpacity onPress={() => this.changeMonth(-1)} style={absencestyle.navBtn}>
                                    <Icon name="chevron-left" size={24} color="#4B5563" />
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>
                                <Text style={[absencestyle.monthLabel, styles.textBold,]}>
                                    {monthNames[currentMonth]} {currentYear}
                                </Text>

                                <TouchableOpacity onPress={this.goToToday} style={absencestyle.todayButton}>
                                    <Icon name="calendar-today" size={22} color="#1976D2" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.changeMonth(1)} style={absencestyle.navBtn}>
                                    <Icon name="chevron-right" size={24} color="#4B5563" />
                                </TouchableOpacity>
                            </View>


                            <View style={absencestyle.weekHeader}>
                                {daysOfWeek.map(d => (
                                    <Text key={d} style={[absencestyle.weekText, styles.textBold]}>{d}</Text>
                                ))}
                            </View>
                            <View style={absencestyle.daysGrid}>
                                {this.renderMonthlyGrid()}
                            </View>
                        </View>


                        <View style={absencestyle.detailsContainer}>
                            <Text style={[absencestyle.detailsTitle, styles.text]}>
                                Détails du {selectedDate.toLocaleDateString('fr-FR')}
                            </Text>

                            {selectedDayAbsences.length === 0 ? (
                                <View style={absencestyle.emptyState}>
                                    <Text style={[absencestyle.emptyText, styles.text]}>Aucune absence enregistrée pour ce jour.</Text>
                                </View>
                            ) : (
                                selectedDayAbsences.map(item => (
                                    <View key={item.id} style={absencestyle.absenceItem}>
                                        <View style={absencestyle.absenceHeader}>
                                            <Text style={[absencestyle.courseTitle, styles.text]}>{item.title}</Text>
                                            <View style={[absencestyle.badge, { backgroundColor: item.type === 'Injustifié' ? '#FEE2E2' : '#E0E7FF' }]}>
                                                <Text style={[absencestyle.badgeText, { color: item.type === 'Injustifié' ? '#991B1B' : '#3730A3' }, styles.text]}>
                                                    {item.type}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={absencestyle.infoRow}>
                                            <Icon name="clock" size={14} color="#6B7280" />
                                            <Text style={[absencestyle.infoText, styles.text]}>{item.start} - {item.end}</Text>
                                        </View>

                                        <View style={absencestyle.commentBox}>
                                            <Icon name="comment" size={14} color="#9CA3AF" />
                                            <Text style={[absencestyle.commentText, styles.text]}>{item.comment}</Text>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>
                    </Animated.ScrollView>

                    {this.renderHeader()}
                </ImageBackground>
                <View style={{ height: 50 }} />
            </View>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Absences);