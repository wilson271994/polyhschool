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
    SafeAreaView
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { childinfostyle } from '../../assets/styles/studentinfos.js';
import { styles } from '../../assets/styles/index.js';
import { switchStudentMenuAction } from '../../navigations/rootNavigation.js';
import { BASE_URL } from '../../api/config.js';

class childInfos extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            today: new Date(),
            selectedFilter: 'Tous',
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    resultsData = [
        { subject: 'Mathématiques', mark: '95/100', grade: 'Très bien' },
        { subject: 'Anglais', mark: '88/100', grade: 'Bien' },
        { subject: 'Littérature', mark: '55/100', grade: 'Assez bien' },
        { subject: 'Physique', mark: '32/100', grade: 'Médiocre' },
        { subject: 'Chimie', mark: '75/100', grade: 'Bien' },
        { subject: 'Biologie', mark: '63/100', grade: 'Assez bien' },
    ];

    filterOptions = [
        { label: 'Tous les résultats', value: 'Tous' },
        { label: 'Mathématiques', value: 'Mathématiques' },
        { label: 'Anglais', value: 'Anglais' },
        { label: 'Littérature', value: 'Littérature' },
        { label: 'Physique', value: 'Physique' },
        { label: 'Chimie', value: 'Chimie' },
        { label: 'Biologie', value: 'Biologie' },
    ];

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    getFilteredResults = () => {
        const { selectedFilter } = this.state;
        if (selectedFilter === 'Tous') return this.resultsData;

        return this.resultsData.filter(item => {
            return item.subject.toLowerCase() === selectedFilter.toLowerCase() ||
                item.grade.toLowerCase().includes(selectedFilter.toLowerCase());
        });
    };

    getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    renderHeader = () => {
        return (
            <View style={childinfostyle.headerBar}>
                <TouchableOpacity
                    style={childinfostyle.backButton}
                    onPress={this._navigateToMenu}
                    activeOpacity={0.7}
                >
                    <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.textBold, childinfostyle.headerTitle]}>
                    Informations de l'Étudiant
                </Text>
            </View>
        );
    };

    renderCalendar = () => {
        const { currentMonth, currentYear, today } = this.state;
        const currentDay = today.getDate();
        const daysInMonth = this.getDaysInMonth(currentMonth, currentYear);
        const firstDay = this.getFirstDayOfMonth(currentMonth, currentYear);

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<View key={`empty-${i}`} style={childinfostyle.dayEmpty} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isHighlighted = day === currentDay;
            days.push(
                <View
                    key={day}
                    style={[childinfostyle.day, isHighlighted && childinfostyle.dayActive]}
                >
                    <Text style={[styles.text, childinfostyle.dayText, isHighlighted && childinfostyle.dayTextActive]}>
                        {day}
                    </Text>
                </View>
            );
        }

        return (
            <View style={childinfostyle.calendarCard}>
                <View style={childinfostyle.calendarHeader}>
                    <Icon name="calendar-month-outline" size={20} color="#f6a100" />
                    <Text style={[styles.textBold, childinfostyle.monthTitle]}>
                        {monthNames[currentMonth]} {currentYear}
                    </Text>
                </View>

                <View style={childinfostyle.weekDays}>
                    {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((wd) => (
                        <Text key={wd} style={[styles.text, childinfostyle.weekDayText]}>
                            {wd}
                        </Text>
                    ))}
                </View>

                <View style={childinfostyle.daysGrid}>{days}</View>
            </View>
        );
    };

    render() {
        const { user_infos, student_infos } = this.props;
        const filteredResults = this.getFilteredResults();

        const avatarUri = user_infos?.pp
            ? BASE_URL + user_infos.pp
            : 'https://i.pravatar.cc/150?img=68';

        const fullName = user_infos?.name || `${user_infos?.first_name || ''} ${user_infos?.last_name || ''}`.trim() || 'Étudiant';
        const studentId = student_infos?.student_code || user_infos?.username || 'STU-00124';
        const className = student_infos?.classe?.name || student_infos?.class?.name || 'Classe non assignée';

        return (
            <SafeAreaView style={childinfostyle.Container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Ambient Glowing Orbs */}
                <View style={childinfostyle.topGlow} pointerEvents="none" />
                <View style={childinfostyle.bottomGlow} pointerEvents="none" />

                {this.renderHeader()}

                <Animated.ScrollView
                    style={childinfostyle.container}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {/* Carte Profil Étudiant */}
                    <View style={childinfostyle.glassCard}>
                        <View style={childinfostyle.profileHeader}>
                            <Image source={{ uri: avatarUri }} style={childinfostyle.avatar} />
                            <View style={childinfostyle.headerText}>
                                <Text style={[styles.textBold, childinfostyle.name]}>{fullName}</Text>
                                <Text style={[styles.text, childinfostyle.stuId]}>ID : {studentId}</Text>
                                <View style={childinfostyle.classBadge}>
                                    <Icon name="google-classroom" size={12} color="#f6a100" style={{ marginRight: 4 }} />
                                    <Text style={[styles.textBold, childinfostyle.classBadgeText]}>{className}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={childinfostyle.divider} />

                        <Text style={[styles.textBold, childinfostyle.subTitle]}>Détails de l'étudiant</Text>

                        <View style={childinfostyle.detailItem}>
                            <Text style={[styles.textBold, childinfostyle.detailLabel]}>Sexe :</Text>
                            <Text style={[styles.text, childinfostyle.detailValue]}>{user_infos?.sexe || 'Masculin'}</Text>
                        </View>
                        <View style={childinfostyle.detailItem}>
                            <Text style={[styles.textBold, childinfostyle.detailLabel]}>Téléphone :</Text>
                            <Text style={[styles.text, childinfostyle.detailValue]}>{user_infos?.phone || '+237 600 000 000'}</Text>
                        </View>
                        <View style={childinfostyle.detailItem}>
                            <Text style={[styles.textBold, childinfostyle.detailLabel]}>Email :</Text>
                            <Text style={[styles.text, childinfostyle.detailValue]}>{user_infos?.email || 'etudiant@poly-h.com'}</Text>
                        </View>
                        <View style={childinfostyle.detailItem}>
                            <Text style={[styles.textBold, childinfostyle.detailLabel]}>Adresse :</Text>
                            <Text style={[styles.text, childinfostyle.detailValue]}>{user_infos?.address || 'Non spécifiée'}</Text>
                        </View>

                        <Text style={[styles.textBold, childinfostyle.subTitle]}>À propos</Text>
                        <Text style={[styles.text, childinfostyle.aboutText]}>
                            Passionné(e) par les sciences et le développement personnel. Élève assidu(e) et très investi(e) dans le travail d'équipe.
                        </Text>
                    </View>

                    {/* Section Activité / Assiduité */}
                    <View style={childinfostyle.glassCard}>
                        <Text style={[styles.textBold, childinfostyle.sectionTitle]}>Activité & Assiduité</Text>

                        {this.renderCalendar()}

                        <View style={childinfostyle.activityNote}>
                            <View style={childinfostyle.noteHeaderRow}>
                                <Icon name="clock-check-outline" size={16} color="#f6a100" />
                                <Text style={[styles.textBold, childinfostyle.noteDay]}>Présence :</Text>
                            </View>
                            <Text style={[styles.text, childinfostyle.noteText]}>
                                Excellente assiduité cette semaine, présent(e) et ponctuel(le) à tous les cours.
                            </Text>
                        </View>

                        <View style={childinfostyle.activityNote}>
                            <View style={childinfostyle.noteHeaderRow}>
                                <Icon name="book-check-outline" size={16} color="#10B981" />
                                <Text style={[styles.textBold, childinfostyle.noteDayGreen]}>Devoirs :</Text>
                            </View>
                            <Text style={[styles.text, childinfostyle.noteText]}>
                                Tous les devoirs de la semaine ont été complétés et soumis à temps.
                            </Text>
                        </View>
                    </View>

                    {/* Section Résultats */}
                    <View style={childinfostyle.glassCard}>
                        <Text style={[styles.textBold, childinfostyle.sectionTitle]}>Tableau de résultats</Text>

                        <View style={childinfostyle.dropdownContainer}>
                            <Dropdown
                                style={childinfostyle.dropdown}
                                placeholderStyle={childinfostyle.placeholderStyle}
                                selectedTextStyle={childinfostyle.selectedTextStyle}
                                itemTextStyle={[styles.text, childinfostyle.itemTextStyle]}
                                containerStyle={childinfostyle.containeritemdrop}
                                data={this.filterOptions}
                                maxHeight={250}
                                labelField="label"
                                valueField="value"
                                placeholder="Filtrer les résultats..."
                                value={this.state.selectedFilter}
                                onChange={item => this.setState({ selectedFilter: item.value })}
                                renderLeftIcon={() => (
                                    <Icon name="filter-variant" size={18} color="#f6a100" style={{ marginRight: 8 }} />
                                )}
                            />
                        </View>

                        <View style={childinfostyle.resultTable}>
                            <View style={childinfostyle.tableHeader}>
                                <Text style={[styles.textBold, childinfostyle.tableHeaderCell]}>Matière</Text>
                                <Text style={[styles.textBold, childinfostyle.tableHeaderCell]}>Note</Text>
                                <Text style={[styles.textBold, childinfostyle.tableHeaderCell]}>Remarque</Text>
                            </View>

                            {filteredResults.map((item, index) => {
                                const isFail = item.mark.startsWith('3') || item.grade.includes('Médiocre');
                                return (
                                    <View key={index} style={childinfostyle.tableRow}>
                                        <Text style={[styles.text, childinfostyle.tableCell]}>{item.subject}</Text>
                                        <Text style={[styles.textBold, childinfostyle.tableCell, { color: isFail ? '#EF4444' : '#10B981' }]}>
                                            {item.mark}
                                        </Text>
                                        <Text style={[styles.text, childinfostyle.tableCell, isFail && childinfostyle.failText]}>
                                            {item.grade}
                                        </Text>
                                    </View>
                                );
                            })}

                            {filteredResults.length === 0 && (
                                <Text style={[styles.text, childinfostyle.noResult]}>Aucun résultat correspondant</Text>
                            )}
                        </View>
                    </View>
                </Animated.ScrollView>
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
    student_infos: state.auth.student_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(childInfos);