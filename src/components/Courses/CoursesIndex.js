import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ImageBackground, FlatList } from 'react-native';
import Video from 'react-native-video';
import 'moment/locale/fr';
import { store } from '../../reducers/store.js';
import { IS_AUTH_ERROR } from '../../reducers/actions/types.js';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import { coursestyle } from '../../assets/styles/courses.js';
import { styles } from '../../assets/styles/index.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { switchAdvanceCourseSearchAction, switchCourseVideoAction, switchStudentChooseAccountPageAction } from '../../navigations/rootNavigation.js';

const COURSES_DATA = {
    'Physique': [
        { id: 'p1', title: 'Énergie cinétique', teacher: 'M Tefouet' },
        { id: 'p2', title: 'Énergie potentielle', teacher: 'M Tefouet' },
        { id: 'p3', title: 'Mouvement rectiligne', teacher: 'M Tefouet' },
        { id: 'p4', title: 'Erreurs et incertitudes', teacher: 'M Tefouet' },
        { id: 'p5', title: 'Ondes mécaniques', teacher: 'M Tefouet' },
    ],
    'Chimie': [
        { id: 'c1', title: 'Chimie Organique', teacher: 'M Soap' },
        { id: 'c2', title: "Nombre d'Oxydation", teacher: 'M Soap' },
        { id: 'c3', title: 'Équilibre chimique', teacher: 'M Soap' },
    ],
    'Mathématiques': [
        { id: 'm1', title: 'Fonctions exponentielles', teacher: 'M Kofi' },
        { id: 'm2', title: 'Dérivées', teacher: 'M Kofi' },
        { id: 'm3', title: 'Intégrales', teacher: 'M Kofi' },
        { id: 'm4', title: 'Probabilités', teacher: 'M Kofi' },
    ],
};

const ALL_COURSES = Object.entries(COURSES_DATA).flatMap(([subject, courses]) =>
    courses.map(course => ({ ...course, subject }))
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
        this.setState({ is_alert: false, is_loading: false });
        store.dispatch({ type: IS_AUTH_ERROR, value: false });
    }

    _navigateToVideo = () => {
        switchCourseVideoAction(true)
    }

    _fechtData = async () => {
        await switchHeaderAction(true);
    }

    goToAdvancedSearch = () => {
        switchAdvanceCourseSearchAction(true)
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
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[coursestyle.welcomeTitle, styles.textBold]}>
                BIENVENUE SUR POLYH SCHOOL
            </Text>

            <Text style={[coursestyle.welcomeMessage, styles.text]}>
                Pour profiter des services rattachés à cette application,{'\n'}
                vous devez souscrire à une école.
            </Text>

            <View style={coursestyle.welcomeIconRow}>
                <Icon name="school" size={28} color="#FFD700" />
                <Icon name="book-open-page-variant" size={28} color="#FFD700" />
                <Icon name="account-group" size={28} color="#FFD700" />
            </View>

            {/* <TouchableOpacity
                style={coursestyle.subscribeButton}
                onPress={this._navigateToChooseAccount}
                activeOpacity={0.8}
            >
                <Icon name="school-outline" size={22} color="#FFF" />
                <Text style={[coursestyle.subscribeButtonText, styles.textBold]}>
                    Souscrire à une école
                </Text>
                <Icon name="chevron-right" size={22} color="#FFF" />
            </TouchableOpacity> */}
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
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[coursestyle.waitingTitle, styles.textBold]}>
                Admission en cours de validation
            </Text>

            <Text style={[coursestyle.waitingMessage, styles.text]}>
                Votre admission est en cours de traitement par l'administration.{'\n'}
                Veuillez patienter, cela peut prendre quelques instants.
            </Text>
        </View>
    );

    renderHeader = (showSearch = true) => {
        const isSecondary = !!this.props.onBack;
        return (
            <View style={coursestyle.header}>
                {isSecondary ? (
                    <TouchableOpacity style={coursestyle.backButton} onPress={this._handleGoBack} activeOpacity={0.7}>
                        <Icon name="arrow-left" size={24} color="#FFF" />
                    </TouchableOpacity>
                ) : null}
                <Text style={[coursestyle.headerTitle, styles.textBold]}>Mes cours</Text>
                {showSearch ? (
                    <TouchableOpacity style={coursestyle.searchContainer} onPress={this.goToAdvancedSearch} activeOpacity={0.8}>
                        <Icon name="magnify" size={22} color="#FFF" />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>
        );
    };

    renderCourseItem = ({ item }) => (
        <TouchableOpacity onPress={this._navigateToVideo} style={coursestyle.courseCard}>
            <Image
                source={require('../../assets/images/lion.jpg')}
                style={coursestyle.courseIcon}
                resizeMode="cover"
            />
            <View style={coursestyle.courseDetails}>
                <Text style={[coursestyle.courseTitle, styles.textBold]}>{item.title}</Text>
                <Text style={[coursestyle.courseTeacher, styles.text]}>{item.teacher}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
    );

    render() {
        const { is_school_user, is_admission_approved } = this.props;

        let content;

        if (!is_school_user && !is_admission_approved) {
            content = this.renderWelcomeScreen();
        } else if (!is_school_user && is_admission_approved) {
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
                    ListHeaderComponent={
                        <Text style={[coursestyle.subjectTitle, styles.textBold, { paddingHorizontal: 20, paddingTop: 16 }]}>
                            Physique
                        </Text>
                    }
                />
            );
        }

        const showSearch = is_school_user && is_admission_approved;

        return (
            <SafeAreaView style={coursestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    {this.renderHeader(showSearch)}
                    {content}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchHeaderAction,
            switchCourseVideoAction,
            switchAdvanceCourseSearchAction,
            switchStudentChooseAccountPageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_infos                  : state.auth.user_infos,
        is_admission_approved       : state.auth.is_admission_approved,
        is_school_user              : state.auth.is_school_user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CoursesIndex);