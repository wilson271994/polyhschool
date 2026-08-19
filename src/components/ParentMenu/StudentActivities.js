import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, Animated, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { styles } from '../../assets/styles';
import { activitiestyles, COLORS } from '../../assets/styles/studentactivities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';

class StudentActivities extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'my',
            scrollY: new Animated.Value(0),

            // Filtres
            selectedType: 'Tous',
            sortOrder: 'default',

            myActivities: [
                { id: 1, title: "Club de Football", day: "Mardi & Jeudi", time: "16h30 - 18h00", location: "Stade Municipal", icon: "soccer", color: "#f39c12", type: "Sport" },
                { id: 3, title: "Cours de Piano", day: "Vendredi", time: "17h00 - 18h30", location: "Conservatoire", icon: "piano", color: "#3498db", type: "Art" },
            ],

            allActivities: [
                { id: 1, title: "Club de Football", day: "Mardi & Jeudi", time: "16h30 - 18h00", location: "Stade Municipal", icon: "soccer", color: "#f39c12", type: "Sport" },
                { id: 2, title: "Atelier Théâtre", day: "Mercredi", time: "14h00 - 16h00", location: "Salle Polyvalente", icon: "theater", color: "#e74c3c", type: "Art" },
                { id: 3, title: "Cours de Piano", day: "Vendredi", time: "17h00 - 18h30", location: "Conservatoire", icon: "piano", color: "#3498db", type: "Art" },
                { id: 4, title: "Club Robotique", day: "Lundi", time: "15h30 - 17h00", location: "Salle Informatique", icon: "robot", color: "#2ecc71", type: "Technologie" },
                { id: 5, title: "Club de Danse", day: "Mercredi", time: "17h00 - 18h30", location: "Salle de Danse", icon: "dance-ballroom", color: "#9C27B0", type: "Art" },
            ],

            schoolActivities: [
                { id: 1, title: "Sortie pédagogique - Musée des Sciences", date: "28 Mars 2026", type: "sortie" },
                { id: 2, title: "Conseil de Classe 3ème", date: "05 Avril 2026", type: "reunion" },
                { id: 3, title: "Compétition sportive inter-établissements", date: "12 Avril 2026", type: "sport" },
                { id: 4, title: "Spectacle de fin d'année", date: "20 Juin 2026", type: "spectacle" },
                { id: 5, title: "Examens Blancs", date: "15 - 20 Mai 2026", type: "examen" },
            ],

            timelineData: [
                { month: "Mars", events: "Club Foot + Théâtre", progress: 100, color: "#6c5ce7" },
                { month: "Avril", events: "Robotique + Sortie Musée", progress: 75, color: "#3498db" },
                { month: "Mai", events: "Examens Blancs + Piano", progress: 45, color: "#f39c12" },
                { month: "Juin", events: "Compétition + Spectacle", progress: 20, color: "#e74c3c" },
            ],
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
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
                    >
                        <Icon name="account-circle" size={18} color={activeTab === 'my' ? '#FFF' : '#636E72'} />
                        <Text style={[activitiestyles.tabButtonText, activeTab === 'my' && activitiestyles.tabButtonTextActive]}>
                            Mes Activités
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[activitiestyles.tabButton, activeTab === 'other' && activitiestyles.tabButtonActive]}
                        onPress={() => this.selectTab('other')}
                    >
                        <Icon name="school" size={18} color={activeTab === 'other' ? '#FFF' : '#636E72'} />
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
                                >
                                    <Text style={[activitiestyles.filterChipText, selectedType === type && activitiestyles.filterChipTextActive]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Barre de résultats */}
                <View style={activitiestyles.resultsBar}>
                    <Text style={[activitiestyles.resultsCount, styles.text]}>
                        {filteredActivities.length} résultat{filteredActivities.length > 1 ? 's' : ''}
                    </Text>
                    <View style={activitiestyles.resultsActions}>
                        <TouchableOpacity style={activitiestyles.sortButton} onPress={this.toggleSort}>
                            <Icon
                                name={sortOrder === 'asc' ? 'sort-alphabetical-ascending' : sortOrder === 'desc' ? 'sort-alphabetical-descending' : 'sort-variant'}
                                size={18}
                                color="#1B497D"
                            />
                        </TouchableOpacity>
                        {selectedType !== 'Tous' && (
                            <TouchableOpacity style={activitiestyles.resetButton} onPress={this.resetFilters}>
                                <Icon name="filter-remove" size={18} color="#FF7675" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    renderExtraActivity = ({ item }) => (
        <TouchableOpacity style={activitiestyles.activityCard} activeOpacity={0.9}>
            <View style={[activitiestyles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} size={32} color={item.color} />
            </View>
            <View style={activitiestyles.activityInfo}>
                <Text style={[activitiestyles.activityTitle, styles.textBold]}>{item.title}</Text>
                <Text style={[activitiestyles.activityDetail, styles.text]}>
                    {item.day} • {item.time}
                </Text>
                <Text style={[activitiestyles.activityLocation, styles.text]}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    renderTimeline = () => {
        const { timelineData } = this.state;
        return (
            <View style={activitiestyles.timelineContainer}>
                <Text style={[activitiestyles.sectiontitleblack, styles.textBold]}>Activités continues</Text>
                <View style={activitiestyles.timeline}>
                    {timelineData.map((item, index) => (
                        <View key={index} style={activitiestyles.timelineItem}>
                            <View style={[activitiestyles.timelineDot, { backgroundColor: item.color }]} />
                            {index < timelineData.length - 1 && <View style={activitiestyles.timelineLine} />}
                            <View style={activitiestyles.timelineContent}>
                                <Text style={[activitiestyles.timelineMonth, styles.textBold]}>{item.month}</Text>
                                <Text style={[activitiestyles.timelineEvents, styles.textBold]}>{item.events}</Text>
                                <View style={activitiestyles.progressBarContainer}>
                                    <View style={[activitiestyles.progressBar, { width: `${item.progress}%`, backgroundColor: item.color }]} />
                                </View>
                                <Text style={[activitiestyles.progressText, styles.text]}>{item.progress}% complété</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[activitiestyles.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={activitiestyles.headerSection}>
                        <View style={activitiestyles.headerbuttonContainer}>
                            <TouchableOpacity style={activitiestyles.headerButton} onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={activitiestyles.headertext}>
                            <Text style={[activitiestyles.headerTitle, styles.textBold]}>Activités & Calendrier</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const filteredActivities = this.getFilteredAndSortedActivities();

        return (
            <SafeAreaView style={activitiestyles.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={activitiestyles.container}
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
                            <Text style={[styles.sectionTitle, styles.textBold]}>Activités & Calendrier</Text>
                        </View>

                        {/* ✅ Filter container de StudentProject */}
                        {this.renderFilterContainer()}

                        {/* Liste des activités */}
                        <View style={activitiestyles.section}>
                            <FlatList
                                data={filteredActivities}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={this.renderExtraActivity}
                                scrollEnabled={false}
                                contentContainerStyle={{ paddingHorizontal: 16 }}
                                ListEmptyComponent={
                                    <Text style={activitiestyles.emptyText}>
                                        Aucune activité trouvée.
                                    </Text>
                                }
                            />
                        </View>

                        <View style={activitiestyles.section}>
                            <Text style={[activitiestyles.sectionTitle, styles.textBold]}>
                                <Icon name="calendar" size={18} color="#FFF" /> Calendrier Scolaire
                            </Text>
                            {this.state.schoolActivities.map((item) => (
                                <View key={item.id} style={activitiestyles.calendarItem}>
                                    <View style={activitiestyles.calendarDate}>
                                        <Text style={activitiestyles.calendarDay}>{item.date}</Text>
                                    </View>
                                    <View style={activitiestyles.calendarContent}>
                                        <Text style={[activitiestyles.calendarTitle, styles.textBold]}>{item.title}</Text>
                                        <Text style={[activitiestyles.calendarType, styles.text]}>
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

                        {this.renderTimeline()}

                        <Text style={[activitiestyles.footer, styles.text]}>
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </Text>

                        <View style={{ height: 30 }} />
                    </Animated.ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentActivities);