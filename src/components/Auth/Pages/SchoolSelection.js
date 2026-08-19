import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
    ActivityIndicator,
    StatusBar,
    Animated,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { schoolstyle } from '../../../assets/styles/school.js';
import { styles } from '../../../assets/styles/index.js';
import {
    switchChooseFormAction,
    switchSchoolDetailsAction,
    setSelectedSchoolAction,
    switchSignupForm1Action,
} from '../../../navigations/rootNavigation.js';
import { BASE_URL } from '../../../api/config.js';
import { store } from '../../../reducers/store.js';
import { SET_SELECTED_SCHOOL } from '../../../reducers/actions/types.js';

const { width } = Dimensions.get('window');

// Animated Item Wrapper for lively list entrance
class AnimatedSchoolCard extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),
        slideAnim: new Animated.Value(20),
        scaleAnim: new Animated.Value(1),
    };

    componentDidMount() {
        const { index } = this.props;
        // Staggered entrance animation
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 80,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.slideAnim, {
                toValue: 0,
                duration: 400,
                delay: index * 80,
                useNativeDriver: true,
            }),
        ]).start();
    }

    onPressIn = () => {
        Animated.spring(this.state.scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    onPressOut = () => {
        Animated.spring(this.state.scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const { children } = this.props;
        return (
            <Animated.View
                style={{
                    opacity: this.state.fadeAnim,
                    transform: [
                        { translateY: this.state.slideAnim },
                        { scale: this.state.scaleAnim }
                    ],
                }}
            >
                {children({ onPressIn: this.onPressIn, onPressOut: this.onPressOut })}
            </Animated.View>
        );
    }
}

class School_Selection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            selectedSchoolId: null,
            localRatings: {},
            isSearchFocused: false,
        };
    }

    // Navigate back to the role selection page
    _NavigateToChoose = () => {
        console.log('Navigating back to role selection...');
        switchChooseFormAction(true);
    };

    // Open detailed school profile modal/screen
    _NavigateToSchoolsDetails = (school) => {
        setSelectedSchoolAction(school);
        switchSchoolDetailsAction(true);
    };

    // Persist selected school and proceed to step 1 of registration
    _NavigateToForm1 = async (item) => {
        this.setState({ selectedSchoolId: item.id });
        try {
            const choosedata = await AsyncStorage.getItem('DataChoose');
            const typeData = choosedata ? JSON.parse(choosedata) : {};
            await AsyncStorage.setItem(
                'SelectedSchoolId',
                JSON.stringify({
                    school: item.id,
                    type_user: typeData.type_user,
                })
            );

            store.dispatch({ type: SET_SELECTED_SCHOOL, value: item });
            switchSignupForm1Action(true, item.id);
        } catch (e) {
            console.error('Error saving selected school:', e);
        }
    };

    // Update star rating locally for interactive feedback
    updateEtoiles = (schoolId, nouveauNombreEtoiles) => {
        const { school_infos } = this.props;
        const schools = school_infos?.schools || [];
        const school = schools.find((s) => s.id === schoolId);

        const maxEtoiles = school?.maxEtoiles || 5;

        if (school && nouveauNombreEtoiles >= 0 && nouveauNombreEtoiles <= maxEtoiles) {
            this.setState(
                (prevState) => ({
                    localRatings: {
                        ...prevState.localRatings,
                        [schoolId]: nouveauNombreEtoiles,
                    },
                }),
                () => {
                    Alert.alert('Évaluation', `Note attribuée : ${nouveauNombreEtoiles} / ${maxEtoiles}`);
                }
            );
        }
    };

    // Render star rating bar for a school item
    renderEtoiles = (school) => {
        const etoiles = [];
        const maxEtoiles = school.maxEtoiles || 5;
        const currentEtoiles = this.state.localRatings[school.id] ?? (school.etoiles || 0);

        for (let i = 1; i <= maxEtoiles; i++) {
            etoiles.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => this.updateEtoiles(school.id, i)}
                    activeOpacity={0.7}
                >
                    <Icon
                        name={i <= currentEtoiles ? 'star' : 'star-outline'}
                        size={15}
                        color={i <= currentEtoiles ? '#ECB818' : '#475569'}
                        style={schoolstyle.etoileIcon}
                    />
                </TouchableOpacity>
            );
        }

        return (
            <View style={schoolstyle.etoilesContainer}>
                {etoiles}
                <Text style={[styles.text, schoolstyle.noteTexte]}>
                    ({currentEtoiles}/{maxEtoiles})
                </Text>
            </View>
        );
    };

    // Sort schools descending by rating
    sortSchoolsByStars = (schools) => {
        return [...schools].sort((a, b) => (b.etoiles || 0) - (a.etoiles || 0));
    };

    // Filter schools by search term and sort by rating
    filterAndSortSchools = () => {
        const { school_infos } = this.props;
        const { search } = this.state;

        let filteredSchools = school_infos?.schools ? [...school_infos.schools] : [];

        if (search && search.trim() !== '') {
            const query = search.toLowerCase();
            filteredSchools = filteredSchools.filter(
                (school) =>
                    school.name?.toLowerCase().includes(query) ||
                    school.about?.toLowerCase().includes(query) ||
                    school.address?.toLowerCase().includes(query)
            );
        }

        return this.sortSchoolsByStars(filteredSchools);
    };

    // Render individual school card item with touch animations
    renderSchoolItem = (item, index) => {
        const logoUrl = item.logo ? `${BASE_URL}${item.logo}` : null;

        return (
            <AnimatedSchoolCard key={item.id || index} index={index}>
                {({ onPressIn, onPressOut }) => (
                    <View style={schoolstyle.cardContainer}>

                        {/* Top Accent Line */}
                        <View style={schoolstyle.topHighlightLine} />

                        {/* Card Header: School Logo & Basic Info */}
                        <View style={schoolstyle.cardHeader}>
                            <View style={schoolstyle.logoWrapper}>
                                {logoUrl ? (
                                    <Image
                                        source={{ uri: logoUrl }}
                                        style={schoolstyle.schoolLogo}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Icon name="school" size={28} color="#ECB818" />
                                )}
                            </View>

                            <View style={schoolstyle.headerInfo}>
                                <View style={schoolstyle.titleRow}>
                                    <Text style={[styles.textBold, schoolstyle.schoolName]} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <View style={schoolstyle.verifiedBadge}>
                                        <Icon name="check-decagram" size={14} color="#ECB818" />
                                    </View>
                                </View>

                                <Text style={[styles.text, schoolstyle.schoolAddress]} numberOfLines={1}>
                                    <Icon name="map-marker-outline" size={12} color="#94A3B8" />
                                    {' '}{item.address || 'Adresse non renseignée'}
                                </Text>
                                {this.renderEtoiles(item)}
                            </View>
                        </View>

                        <View style={schoolstyle.cardDivider} />

                        {/* Card Body: Success Rates & Academic Stats */}
                        <View style={schoolstyle.cardBody}>
                            <Text style={[styles.textBold, schoolstyle.sectionSubtitle]}>
                                Taux de réussite aux examens
                            </Text>

                            <View style={schoolstyle.statsRow}>
                                <View style={schoolstyle.statBadge}>
                                    <View style={schoolstyle.statIconBg}>
                                        <Icon name="file-certificate-outline" size={14} color="#ECB818" />
                                    </View>
                                    <View style={{ marginLeft: 6 }}>
                                        <Text style={[styles.text, schoolstyle.statLabel]}>Examens</Text>
                                        <Text style={[styles.textBold, schoolstyle.statValue]}>94.7%</Text>
                                    </View>
                                </View>

                                <View style={schoolstyle.statBadge}>
                                    <View style={schoolstyle.statIconBg}>
                                        <Icon name="pencil-outline" size={14} color="#38BDF8" />
                                    </View>
                                    <View style={{ marginLeft: 6 }}>
                                        <Text style={[styles.text, schoolstyle.statLabel]}>Intermédiaires</Text>
                                        <Text style={[styles.textBold, schoolstyle.statValueBlue]}>98.0%</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Card Footer: Action Buttons */}
                        <View style={schoolstyle.cardFooter}>
                            <TouchableOpacity
                                style={schoolstyle.seeMoreButton}
                                onPress={() => this._NavigateToSchoolsDetails(item)}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.textBold, schoolstyle.seeMoreText]}>Détails</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={schoolstyle.selectButton}
                                onPress={() => this._NavigateToForm1(item)}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                activeOpacity={0.85}
                            >
                                <Text style={[styles.textBold, schoolstyle.selectText]}>Sélectionner</Text>
                                <Entypo name="chevron-right" size={16} color="#0B1320" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </AnimatedSchoolCard>
        );
    };

    // Render activity indicator at the bottom of the list during loading
    renderFooter = () => {
        const { is_loading } = this.props;
        if (!is_loading) return null;
        return (
            <View style={schoolstyle.loadingContainer}>
                <ActivityIndicator size="small" color="#ECB818" />
                <Text style={[styles.text, schoolstyle.loadingText]}>
                    Mise à jour des établissements...
                </Text>
            </View>
        );
    };

    // Render placeholder when search query returns no school
    renderEmptyList = () => {
        const { is_loading } = this.props;
        if (is_loading) return null;

        return (
            <View style={schoolstyle.emptyContainer}>
                <View style={schoolstyle.emptyIconBg}>
                    <Icon name="school-outline" size={48} color="#ECB818" />
                </View>
                <Text style={[styles.textBold, schoolstyle.emptyTitle]}>
                    Aucun établissement trouvé
                </Text>
                <Text style={[styles.text, schoolstyle.emptySubtitle]}>
                    Aucun résultat ne correspond à votre recherche.{'\n'}
                    Vérifiez l'orthographe ou tentez un autre mot-clé.
                </Text>
            </View>
        );
    };

    render() {
        const sortedFilteredSchools = this.filterAndSortSchools();
        const { search, isSearchFocused } = this.state;
        const { is_loading } = this.props;

        return (
            <View style={schoolstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#0B1320" />

                {/* Dynamic Background Glows */}
                <View style={schoolstyle.topGlow} />
                <View style={schoolstyle.centerGlow} />
                <View style={schoolstyle.bottomGlow} />

                {/* Top Header Section */}
                <View style={schoolstyle.headerContainer}>
                    <TouchableOpacity
                        style={schoolstyle.backButton}
                        onPress={this._NavigateToChoose}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <View style={schoolstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, schoolstyle.headerBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, schoolstyle.headerTitle]}>
                            Sélection de l'école
                        </Text>
                    </View>
                </View>

                {/* Search Bar Input */}
                <View
                    style={[
                        schoolstyle.searchWrapper,
                        isSearchFocused && schoolstyle.searchWrapperFocused,
                    ]}
                >
                    <Icon name="magnify" size={22} color={isSearchFocused ? '#ECB818' : '#64748B'} />
                    <TextInput
                        style={[styles.text, schoolstyle.searchInput]}
                        placeholder="Rechercher par nom, ville ou description..."
                        placeholderTextColor="#64748B"
                        value={search}
                        onChangeText={(text) => this.setState({ search: text })}
                        onFocus={() => this.setState({ isSearchFocused: true })}
                        onBlur={() => this.setState({ isSearchFocused: false })}
                    />
                    {search !== '' && (
                        <TouchableOpacity onPress={() => this.setState({ search: '' })}>
                            <Icon name="close-circle" size={18} color="#64748B" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Search Result Counter */}
                {!is_loading && (
                    <View style={schoolstyle.resultRow}>
                        <Text style={[styles.text, schoolstyle.resultCount]}>
                            <Text style={styles.textBold}>{sortedFilteredSchools.length}</Text> établissement{sortedFilteredSchools.length > 1 ? 's' : ''} disponible{sortedFilteredSchools.length > 1 ? 's' : ''}
                        </Text>
                        <View style={schoolstyle.pulseDot} />
                    </View>
                )}

                {/* Schools List View */}
                <FlatList
                    data={sortedFilteredSchools}
                    renderItem={({ item, index }) => this.renderSchoolItem(item, index)}
                    keyExtractor={(item, index) => item.id?.toString() || `school-${index}`}
                    style={schoolstyle.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={this.renderEmptyList}
                    ListFooterComponent={this.renderFooter}
                    contentContainerStyle={
                        sortedFilteredSchools.length === 0 && !is_loading
                            ? { flex: 1, justifyContent: 'center' }
                            : { paddingBottom: 40 }
                    }
                    initialNumToRender={8}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchChooseFormAction,
            switchSignupForm1Action,
            switchSchoolDetailsAction,
            setSelectedSchoolAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    root_navigation: state.navigation.root_navigation,
    school_infos: state.auth.school_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(School_Selection);