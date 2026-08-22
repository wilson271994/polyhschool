import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { store } from '../../reducers/store.js';
import { IS_AUTH_ERROR } from '../../reducers/actions/types.js';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import { coursestyle } from '../../assets/styles/courses.js';
import { styles } from '../../assets/styles/index.js';
import { COLORS } from '../../assets/styles/theme.js';
import {
    switchAdvanceCourseSearchAction,
    switchCourseVideoAction,
    switchStudentChooseAccountPageAction,
} from '../../navigations/rootNavigation.js';

const COURSES_DATA = {
    Physique: [
        { id: 'p1', title: 'Énergie cinétique', teacher: 'M. Tefouet', duration: '45 min' },
        { id: 'p2', title: 'Énergie potentielle', teacher: 'M. Tefouet', duration: '30 min' },
        { id: 'p3', title: 'Mouvement rectiligne', teacher: 'M. Tefouet', duration: '50 min' },
        { id: 'p4', title: 'Erreurs et incertitudes', teacher: 'M. Tefouet', duration: '25 min' },
        { id: 'p5', title: 'Ondes mécaniques', teacher: 'M. Tefouet', duration: '40 min' },
    ],
    Chimie: [
        { id: 'c1', title: 'Chimie Organique', teacher: 'M. Soap', duration: '35 min' },
        { id: 'c2', title: "Nombre d'Oxydation", teacher: 'M. Soap', duration: '20 min' },
        { id: 'c3', title: 'Équilibre chimique', teacher: 'M. Soap', duration: '45 min' },
    ],
    Mathématiques: [
        { id: 'm1', title: 'Fonctions exponentielles', teacher: 'M. Kofi', duration: '50 min' },
        { id: 'm2', title: 'Dérivées et Limites', teacher: 'M. Kofi', duration: '40 min' },
        { id: 'm3', title: 'Calcul Intégral', teacher: 'M. Kofi', duration: '55 min' },
        { id: 'm4', title: 'Probabilités conditionnelles', teacher: 'M. Kofi', duration: '30 min' },
    ],
};

const ALL_COURSES = Object.entries(COURSES_DATA).flatMap(([subject, courses]) =>
    courses.map((course) => ({ ...course, subject }))
);

class CoursesIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            searchText: '',
        };
    }

    componentDidMount() {
        this._fechtData();
    }

    _closeAlert = () => {
        this.setState({ is_loading: false });
        store.dispatch({ type: IS_AUTH_ERROR, value: false });
    };

    _navigateToVideo = () => {
        switchCourseVideoAction(true);
    };

    _fechtData = async () => {
        await switchHeaderAction(true);
    };

    goToAdvancedSearch = () => {
        switchAdvanceCourseSearchAction(true);
    };

    _navigateToChooseAccount = () => {
        switchStudentChooseAccountPageAction(true);
    };

    _handleGoBack = () => {
        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    renderWelcomeScreen = () => (
        <View style={coursestyle.welcomeContainer}>
            <View style={coursestyle.welcomeVideoContainer}>
                <Video
                    source={require('../../assets/videos/welcome.mp4')}
                    style={coursestyle.welcomeVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="cover"
                    paused={false}
                />
            </View>

            <Text style={[styles.textBold, coursestyle.welcomeTitle]}>
                BIENVENUE SUR POLY-H SCHOOL
            </Text>

            <Text style={[styles.text, coursestyle.welcomeMessage]}>
                Pour accéder à vos cours et contenus pédagogiques,{'\n'}veuillez souscrire auprès d'un établissement partenaire.
            </Text>

            <View style={coursestyle.welcomeIconRow}>
                <View style={coursestyle.iconBadge}>
                    <Icon name="school" size={24} color={COLORS.accentGold} />
                </View>
                <View style={coursestyle.iconBadge}>
                    <Icon name="book-open-page-variant" size={24} color={COLORS.accentGold} />
                </View>
                <View style={coursestyle.iconBadge}>
                    <Icon name="account-group" size={24} color={COLORS.accentGold} />
                </View>
            </View>

            <TouchableOpacity
                style={coursestyle.subscribeButton}
                onPress={this._navigateToChooseAccount}
                activeOpacity={0.85}
            >
                <Icon name="school-outline" size={20} color={COLORS.textDark} />
                <Text style={[styles.textBold, coursestyle.subscribeButtonText]}>
                    Souscrire à une école
                </Text>
                <Icon name="chevron-right" size={20} color={COLORS.textDark} />
            </TouchableOpacity>
        </View>
    );

    renderWaitingAdmission = () => (
        <View style={coursestyle.waitingContainer}>
            <View style={coursestyle.waitingVideoContainer}>
                <Video
                    source={require('../../assets/videos/waiting.mp4')}
                    style={coursestyle.waitingVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="cover"
                    paused={false}
                />
            </View>

            <Text style={[styles.textBold, coursestyle.waitingTitle]}>
                Admission en cours de traitement
            </Text>

            <Text style={[styles.text, coursestyle.waitingMessage]}>
                Votre demande de souscription est en cours de validation par l'administration.{'\n'}
                Vous recevrez une notification dès sa finalisation.
            </Text>
        </View>
    );

    renderHeader = (showSearch = true) => {
        const isSecondary = !!this.props.onBack;

        return (
            <View style={coursestyle.headerNav}>
                <View style={coursestyle.headerTitleWrapper}>
                    <Text style={[styles.textBold, coursestyle.headerTitle]}>Mes Cours</Text>
                </View>

                {showSearch && (
                    <TouchableOpacity
                        style={coursestyle.searchButton}
                        onPress={this.goToAdvancedSearch}
                        activeOpacity={0.8}
                    >
                        <Icon name="magnify" size={20} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    renderCourseItem = ({ item, index }) => {
        const showSubjectHeader =
            index === 0 || ALL_COURSES[index - 1].subject !== item.subject;

        return (
            <View>
                {showSubjectHeader && (
                    <View style={coursestyle.subjectHeaderContainer}>
                        <Icon name="bookmark-outline" size={18} color={COLORS.accentGold} />
                        <Text style={[styles.textBold, coursestyle.subjectTitle]}>
                            {item.subject}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={this._navigateToVideo}
                    style={coursestyle.courseCard}
                    activeOpacity={0.85}
                >
                    <View style={coursestyle.courseIconContainer}>
                        <Icon name="play-circle-outline" size={26} color={COLORS.accentGold} />
                    </View>

                    <View style={coursestyle.courseDetails}>
                        <Text style={[styles.textBold, coursestyle.courseTitle]}>
                            {item.title}
                        </Text>
                        <Text style={[styles.text, coursestyle.courseTeacher]}>
                            {item.teacher} • {item.duration}
                        </Text>
                    </View>

                    <Icon name="chevron-right" size={22} color={COLORS.textMuted} />
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const { is_school_user, is_admission_approved } = this.props;

        var content;

        if (!is_school_user) {
            content = this.renderWelcomeScreen();
        } else if (is_school_user && !is_admission_approved) {
            content = this.renderWaitingAdmission();
        } else {
            content = (
                <FlatList
                    data={ALL_COURSES}
                    renderItem={this.renderCourseItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={coursestyle.listContent}
                    showsVerticalScrollIndicator={false}
                />
            );
        }

        const showSearch = is_school_user && is_admission_approved;

        return (
            <SafeAreaView style={coursestyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Halo d'ambiance */}
                <View style={coursestyle.topGlow} pointerEvents="none" />
                <View style={coursestyle.bottomGlow} pointerEvents="none" />

                {this.renderHeader(showSearch)}
                {content}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchHeaderAction,
            switchCourseVideoAction,
            switchAdvanceCourseSearchAction,
            switchStudentChooseAccountPageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    is_admission_approved: state.auth.is_admission_approved,
    is_school_user: state.auth.is_school_user,
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesIndex);