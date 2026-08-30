import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { activitiestyles } from '../../../assets/styles/studentactivities';
import { COLORS } from '../../../assets/styles/theme';
import { switchHomePageAction } from '../../../navigations/rootNavigation';
import { styles } from '../../../assets/styles';

class Activities extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'my',
            selectedType: 'Tous',
            sortOrder: 'default',

            myActivities: [
                { id: 1, title: "Club de Football", day: "Mardi & Jeudi", time: "16h30 - 18h00", location: "Stade Municipal", icon: "soccer", color: COLORS.accentGold, type: "Sport" },
                { id: 3, title: "Cours de Piano", day: "Vendredi", time: "17h00 - 18h30", location: "Conservatoire", icon: "piano", color: COLORS.accentCyan, type: "Art" },
            ],

            allActivities: [
                { id: 1, title: "Club de Football", day: "Mardi & Jeudi", time: "16h30 - 18h00", location: "Stade Municipal", icon: "soccer", color: COLORS.accentGold, type: "Sport" },
                { id: 2, title: "Atelier Théâtre", day: "Mercredi", time: "14h00 - 16h00", location: "Salle Polyvalente", icon: "theater", color: "#F43F5E", type: "Art" },
                { id: 3, title: "Cours de Piano", day: "Vendredi", time: "17h00 - 18h30", location: "Conservatoire", icon: "piano", color: COLORS.accentCyan, type: "Art" },
                { id: 4, title: "Club Robotique", day: "Lundi", time: "15h30 - 17h00", location: "Salle Informatique", icon: "robot", color: "#10B981", type: "Technologie" },
                { id: 5, title: "Club de Danse", day: "Mercredi", time: "17h00 - 18h30", location: "Salle de Danse", icon: "dance-ballroom", color: "#8B5CF6", type: "Art" },
            ],

            schoolActivities: [
                { id: 1, title: "Sortie pédagogique - Musée des Sciences", date: "28 Mars 2026", type: "sortie" },
                { id: 2, title: "Conseil de Classe 3ème", date: "05 Avril 2026", type: "reunion" },
                { id: 3, title: "Compétition sportive inter-établissements", date: "12 Avril 2026", type: "sport" },
                { id: 4, title: "Spectacle de fin d'année", date: "20 Juin 2026", type: "spectacle" },
                { id: 5, title: "Examens Blancs", date: "15 - 20 Mai 2026", type: "examen" },
            ],

            timelineData: [
                { month: "Mars", events: "Club Foot + Théâtre", progress: 100, color: "#8B5CF6" },
                { month: "Avril", events: "Robotique + Sortie Musée", progress: 75, color: COLORS.accentCyan },
                { month: "Mai", events: "Examens Blancs + Piano", progress: 45, color: COLORS.accentGold },
                { month: "Juin", events: "Compétition + Spectacle", progress: 20, color: "#F43F5E" },
            ],
        };
    }

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    getActivityTypes = () => {
        const { allActivities } = this.state;
        const types = allActivities.map(a => a.type);
        return ['Tous', ...new Set(types)];
    };

    getFilteredAndSortedActivities = () => {
        const { activeTab, myActivities, allActivities, selectedType, sortOrder } = this.state;

        let activities;
        if (activeTab === 'my') {
            activities = [...myActivities];
        } else {
            const myIds = new Set(myActivities.map(a => a.id));
            activities = allActivities.filter(activity => !myIds.has(activity.id));
        }

        if (selectedType !== 'Tous') {
            activities = activities.filter(a => a.type === selectedType);
        }

        if (sortOrder === 'asc') {
            activities.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'desc') {
            activities.sort((a, b) => b.title.localeCompare(a.title));
        }

        return activities;
    };

    selectTab = (tab) => this.setState({ activeTab: tab });
    selectType = (type) => this.setState({ selectedType: type });

    toggleSort = () => {
        this.setState(prev => ({
            sortOrder: prev.sortOrder === 'asc' ? 'desc' : prev.sortOrder === 'desc' ? 'default' : 'asc'
        }));
    };

    resetFilters = () => {
        this.setState({ selectedType: 'Tous', sortOrder: 'default' });
    };

    renderFilterContainer = () => {
        const { activeTab, selectedType, sortOrder } = this.state;
        const typeList = this.getActivityTypes();
        const filteredActivities = this.getFilteredAndSortedActivities();

        return (
            <View style={activitiestyles.filterContainer}>
                <View style={activitiestyles.tabContainer}>
                    <TouchableOpacity
                        style={[activitiestyles.tabButton, activeTab === 'my' && activitiestyles.tabButtonActive]}
                        onPress={() => this.selectTab('my')}
                        activeOpacity={0.8}
                    >
                        <Icon name="account-circle" size={18} color={activeTab === 'my' ? COLORS.textDark : COLORS.textMuted} />
                        <Text style={[activitiestyles.tabButtonText, activeTab === 'my' && activitiestyles.tabButtonTextActive]}>
                            Mes Activités
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[activitiestyles.tabButton, activeTab === 'other' && activitiestyles.tabButtonActive]}
                        onPress={() => this.selectTab('other')}
                        activeOpacity={0.8}
                    >
                        <Icon name="school" size={18} color={activeTab === 'other' ? COLORS.textDark : COLORS.textMuted} />
                        <Text style={[activitiestyles.tabButtonText, activeTab === 'other' && activitiestyles.tabButtonTextActive]}>
                            Autres Activités
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={activitiestyles.filterRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={activitiestyles.filterChips}>
                            {typeList.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[activitiestyles.filterChip, selectedType === type && activitiestyles.filterChipActive]}
                                    onPress={() => this.selectType(type)}
                                    activeOpacity={0.75}
                                >
                                    <Text style={[activitiestyles.filterChipText, selectedType === type && activitiestyles.filterChipTextActive]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View style={activitiestyles.resultsBar}>
                    <Text style={activitiestyles.resultsCount}>
                        {filteredActivities.length} résultat{filteredActivities.length > 1 ? 's' : ''}
                    </Text>
                    <View style={activitiestyles.resultsActions}>
                        <TouchableOpacity style={activitiestyles.sortButton} onPress={this.toggleSort} activeOpacity={0.8}>
                            <Icon
                                name={sortOrder === 'asc' ? 'sort-alphabetical-ascending' : sortOrder === 'desc' ? 'sort-alphabetical-descending' : 'sort-variant'}
                                size={18}
                                color={COLORS.accentGold}
                            />
                        </TouchableOpacity>
                        {selectedType !== 'Tous' && (
                            <TouchableOpacity style={activitiestyles.resetButton} onPress={this.resetFilters} activeOpacity={0.8}>
                                <Icon name="filter-remove" size={18} color="#F43F5E" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    renderExtraActivity = ({ item }) => (
        <TouchableOpacity style={activitiestyles.activityCard} activeOpacity={0.85}>
            <View style={[activitiestyles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} size={28} color={item.color} />
            </View>
            <View style={activitiestyles.activityInfo}>
                <Text style={activitiestyles.activityTitle}>{item.title}</Text>
                <Text style={activitiestyles.activityDetail}>
                    {item.day} • {item.time}
                </Text>
                <Text style={activitiestyles.activityLocation}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    renderTimeline = () => {
        const { timelineData } = this.state;
        return (
            <View style={activitiestyles.timelineContainer}>
                <Text style={activitiestyles.sectiontitleblack}>Activités continues</Text>
                <View style={activitiestyles.timeline}>
                    {timelineData.map((item, index) => (
                        <View key={index} style={activitiestyles.timelineItem}>
                            <View style={[activitiestyles.timelineDot, { backgroundColor: item.color }]} />
                            {index < timelineData.length - 1 && <View style={activitiestyles.timelineLine} />}
                            <View style={activitiestyles.timelineContent}>
                                <Text style={activitiestyles.timelineMonth}>{item.month}</Text>
                                <Text style={activitiestyles.timelineEvents}>{item.events}</Text>
                                <View style={activitiestyles.progressBarContainer}>
                                    <View style={[activitiestyles.progressBar, { width: `${item.progress}%`, backgroundColor: item.color }]} />
                                </View>
                                <Text style={activitiestyles.progressText}>{item.progress}% complété</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    render() {
        const filteredActivities = this.getFilteredAndSortedActivities();

        return (
            <SafeAreaView style={activitiestyles.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={activitiestyles.topGlow} pointerEvents="none" />
                <View style={activitiestyles.bottomGlow} pointerEvents="none" />

                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 110 }}
                >
                    <View style={activitiestyles.localHeader}>
                        <TouchableOpacity
                            style={activitiestyles.btnBackCustom}
                            onPress={this._navigateToMenu}
                            activeOpacity={0.7}
                        >
                            <Icon name="chevron-left" size={26} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <Text style={activitiestyles.localTitleText}>
                            Activités & Calendrier
                        </Text>
                    </View>

                    {/* Filtres et onglets */}
                    {this.renderFilterContainer()}

                    {/* Liste des activités filtrées */}
                    <View style={activitiestyles.section}>
                        <FlatList
                            data={filteredActivities}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={this.renderExtraActivity}
                            scrollEnabled={false}
                            ListEmptyComponent={
                                <Text style={activitiestyles.emptyText}>
                                    Aucune activité trouvée.
                                </Text>
                            }
                        />
                    </View>

                    {/* Calendrier Scolaire */}
                    <View style={activitiestyles.section}>
                        <Text style={activitiestyles.sectionTitle}>
                            <Icon name="calendar" size={18} color={COLORS.accentGold} style={{ marginRight: 6 }} /> Calendrier Scolaire
                        </Text>
                        {this.state.schoolActivities.map((item) => (
                            <View key={item.id} style={activitiestyles.calendarItem}>
                                <View style={activitiestyles.calendarDate}>
                                    <Text style={activitiestyles.calendarDay}>{item.date}</Text>
                                </View>
                                <View style={activitiestyles.calendarContent}>
                                    <Text style={activitiestyles.calendarTitle}>{item.title}</Text>
                                    <Text style={activitiestyles.calendarType}>
                                        {item.type === 'sortie' && 'Sortie pédagogique'}
                                        {item.type === 'reunion' && 'Réunion'}
                                        {item.type === 'sport' && 'Événement sportif'}
                                        {item.type === 'spectacle' && 'Spectacle'}
                                        {item.type === 'examen' && 'Évaluation'}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Timeline des activités */}
                    {this.renderTimeline()}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);