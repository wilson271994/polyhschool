import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, Text, Image, ImageBackground, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { historystyle } from '../../assets/styles/history.js';
import { styles } from '../../assets/styles/index.js';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { switchCourseDetailsAction, switchStudentChooseAccountPageAction } from '../../navigations/rootNavigation.js';

const COURSES_DATA = {
    'Physique': [
        { id: 'p1', title: 'Énergie cinétique', teacher: 'M Tefouet', progress: '95%', status: 'En cours' },
        { id: 'p2', title: 'Thermodynamique', teacher: 'Mme Kamga', progress: '45%', status: 'En cours' },
        { id: 'p3', title: 'Mécanique quantique', teacher: 'Pr Fomethe', progress: '78%', status: 'En cours' },
        { id: 'p4', title: 'Électromagnétisme', teacher: 'M Njankouo', progress: '30%', status: 'En cours' },
        { id: 'p5', title: 'Optique géométrique', teacher: 'M Tefouet', progress: '100%', status: 'Terminés' },
    ],
    'Chimie': [
        { id: 'c1', title: 'Chimie Organique', teacher: 'M Soap', progress: '60%', status: 'En cours' },
        { id: 'c2', title: "Nombre d'Oxydation", teacher: 'M Soap', progress: '100%', status: 'Terminés' },
        { id: 'c3', title: 'Équilibre chimique', teacher: 'M Soap', progress: '100%', status: 'Terminés' },
    ],
    'Mathématiques': [
        { id: 'm1', title: 'Fonctions exponentielles', teacher: 'M Kofi', progress: '82%', status: 'En cours' },
        { id: 'm2', title: 'Dérivées', teacher: 'M Kofi', progress: '100%', status: 'Terminés' },
        { id: 'm3', title: 'Intégrales', teacher: 'M Kofi', progress: '55%', status: 'En cours' },
    ],
    'Informatique': [
        { id: 'i1', title: 'Programmation mobile', teacher: 'M Tchinda', progress: '100%', status: 'Terminés' },
        { id: 'i2', title: 'Base de données', teacher: 'Mme Djomo', progress: '100%', status: 'Terminés' },
        { id: 'i3', title: 'Réseaux informatiques', teacher: 'M Kamdem', progress: '100%', status: 'Terminés' },
        { id: 'i4', title: 'Algorithmique avancée', teacher: 'Pr Nguemo', progress: '100%', status: 'Terminés' },
    ],
};

const SUBJECTS = Object.keys(COURSES_DATA);

class HistoryIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'En cours',
            selectedSubject: 'Tous',
            isVisibleTckCrModal: false,
        }
    };

    getAllCourses = () => {
        let all = [];
        Object.values(COURSES_DATA).forEach(courses => {
            all = [...all, ...courses];
        });
        return all;
    };

    getFilteredCourses = () => {
        const { activeTab, selectedSubject } = this.state;
        let courses = selectedSubject === 'Tous'
            ? this.getAllCourses()
            : COURSES_DATA[selectedSubject] || [];

        return courses.filter(course => course.status === activeTab);
    };

    _navigateToDetails = () => {
        switchCourseDetailsAction(true)
    }

    _navigateToChooseAccount = () => {
        switchStudentChooseAccountPageAction(true);
    };

    _handleGoBack = () => {
        if (this.props.onBack) {
            this.props.onBack();
        }
    }

    renderWelcomeScreen = () => (
        <View style={historystyle.welcomeContainer}>
            <View style={historystyle.welcomeVideoContainer}>
                <Video
                    source={require('../../assets/videos/welcome.mp4')}
                    style={historystyle.welcomeVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[historystyle.welcomeTitle, styles.textBold]}>
                BIENVENUE SUR POLYH SCHOOL
            </Text>

            <Text style={[historystyle.welcomeMessage, styles.text]}>
                Pour profiter des services rattachés à cette application,{'\n'}
                vous devez souscrire à une école.
            </Text>

            <View style={historystyle.welcomeIconRow}>
                <Icon name="school" size={28} color="#FFD700" />
                <Icon name="book-open-page-variant" size={28} color="#FFD700" />
                <Icon name="account-group" size={28} color="#FFD700" />
            </View>

            {/* <TouchableOpacity
                style={historystyle.subscribeButton}
                onPress={this._navigateToChooseAccount}
                activeOpacity={0.8}
            >
                <Icon name="school-outline" size={22} color="#FFF" />
                <Text style={[historystyle.subscribeButtonText, styles.textBold]}>
                    Souscrire à une école
                </Text>
                <Icon name="chevron-right" size={22} color="#FFF" />
            </TouchableOpacity> */}
        </View>
    );

    renderWaitingAdmission = () => (
        <View style={historystyle.waitingContainer}>
            <View style={historystyle.waitingVideoContainer}>
                <Video
                    source={require('../../assets/videos/waiting.mp4')}
                    style={historystyle.waitingVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[historystyle.waitingTitle, styles.textBold]}>
                Admission en cours de validation
            </Text>

            <Text style={[historystyle.waitingMessage, styles.text]}>
                Votre admission est en cours de traitement par l'administration.{'\n'}
                Veuillez patienter, cela peut prendre quelques instants.
            </Text>
        </View>
    );


    renderHeader = (showIcons = true) => {
        const isSecondary = !!this.props.onBack;
        return (
            <View style={historystyle.header}>
                {isSecondary ? (
                    <TouchableOpacity style={historystyle.backButton} onPress={this._handleGoBack} activeOpacity={0.7}>
                        <Icon name="arrow-left" size={24} color="#FFF" />
                    </TouchableOpacity>
                ) : null}
                <Text style={[historystyle.headerTitle, styles.textBold]}>Évolution des cours</Text>
                {showIcons ? (
                    <View style={historystyle.headerIcons}>
                        <TouchableOpacity style={historystyle.headerIconContainer}>
                            <Icon name="magnify" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>
        );
    };

    renderVerticalCourseCard = (course) => (
        <TouchableOpacity
            key={course.id}
            style={historystyle.courseCard}
            onPress={this._navigateToDetails}
            activeOpacity={0.8}
        >
            <Image
                source={require('../../assets/images/group.png')}
                style={historystyle.courseIcon}
            />
            <View style={historystyle.courseDetails}>
                <Text style={[historystyle.courseTitle, styles.textBold]}>
                    {course.title}
                </Text>
                <Text style={[historystyle.courseTeacher, styles.text]}>
                    {course.teacher}
                </Text>
            </View>
            <Text style={[historystyle.courseProgress, styles.textBold]}>
                {course.progress} achevé
            </Text>
        </TouchableOpacity>
    );

    renderSubjectFilter = () => (
        <View style={historystyle.subjectFilterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={historystyle.subjectFilterScroll}
            >
                <TouchableOpacity
                    style={[
                        historystyle.subjectChip,
                        this.state.selectedSubject === 'Tous' && historystyle.subjectChipActive,
                    ]}
                    onPress={() => this.setState({ selectedSubject: 'Tous' })}
                >
                    <Text style={[
                        historystyle.subjectChipText,
                        styles.textBold,
                        this.state.selectedSubject === 'Tous' && historystyle.subjectChipTextActive,
                    ]}>
                        Tous
                    </Text>
                </TouchableOpacity>
                {SUBJECTS.map(subject => (
                    <TouchableOpacity
                        key={subject}
                        style={[
                            historystyle.subjectChip,
                            this.state.selectedSubject === subject && historystyle.subjectChipActive,
                        ]}
                        onPress={() => this.setState({ selectedSubject: subject })}
                    >
                        <Text style={[
                            historystyle.subjectChipText,
                            styles.textBold,
                            this.state.selectedSubject === subject && historystyle.subjectChipTextActive,
                        ]}>
                            {subject}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    render() {
        const { activeTab, selectedSubject } = this.state;
        const { is_school_user, is_admission_approved } = this.props;
        const filteredCourses = this.getFilteredCourses();

        let content;
        let showHeaderIcons = true;

        if (!is_school_user && !is_admission_approved) {
            content = this.renderWelcomeScreen();
            showHeaderIcons = false;
        } else if (!is_school_user && is_admission_approved) {
            content = this.renderWelcomeScreen();
            showHeaderIcons = false;
        } else if (is_school_user && !is_admission_approved) {
            content = this.renderWaitingAdmission();
            showHeaderIcons = false;
        } else {
            content = (
                <>
                    <View style={historystyle.filterContainer}>
                        <View style={historystyle.tabContainer}>
                            <TouchableOpacity
                                style={[historystyle.tabButton, activeTab === 'En cours' && historystyle.tabButtonActive]}
                                onPress={() => this.setState({ activeTab: 'En cours' })}
                            >
                                <Icon name="book-open-page-variant" size={18} color={activeTab === 'En cours' ? '#fff' : '#555'} />
                                <Text style={[historystyle.tabButtonText, activeTab === 'En cours' && historystyle.tabButtonTextActive]}>
                                    En cours
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[historystyle.tabButton, activeTab === 'Terminés' && historystyle.tabButtonActive]}
                                onPress={() => this.setState({ activeTab: 'Terminés' })}
                            >
                                <Icon name="check-circle" size={18} color={activeTab === 'Terminés' ? '#fff' : '#555'} />
                                <Text style={[historystyle.tabButtonText, activeTab === 'Terminés' && historystyle.tabButtonTextActive]}>
                                    Terminés
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.renderSubjectFilter()}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={historystyle.mainScrollContent}
                    >
                        <View style={historystyle.verticalSectionHeader}>
                            <Text style={[historystyle.verticalSectionTitle, styles.textBold]}>
                                {selectedSubject === 'Tous'
                                    ? (activeTab === 'En cours' ? 'Tous les cours en cours' : 'Tous les cours terminés')
                                    : `${selectedSubject} - ${activeTab === 'En cours' ? 'En cours' : 'Terminés'}`
                                }
                            </Text>
                            <Text style={[historystyle.courseCount, styles.text]}>
                                {filteredCourses.length} cours
                            </Text>
                        </View>

                        <View style={historystyle.verticalGrid}>
                            {filteredCourses.map(course => this.renderVerticalCourseCard(course))}
                            {filteredCourses.length === 0 && (
                                <Text style={[historystyle.emptyText, styles.text]}>
                                    {activeTab === 'Terminés'
                                        ? `Aucun cours terminé ${selectedSubject !== 'Tous' ? `dans ${selectedSubject}` : ''} pour le moment.`
                                        : `Aucun cours en cours ${selectedSubject !== 'Tous' ? `dans ${selectedSubject}` : ''}.`}
                                </Text>
                            )}
                        </View>

                        <View style={{ height: 30 }} />
                    </ScrollView>
                </>
            );
        }

        return (
            <View style={historystyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    {this.renderHeader(showHeaderIcons)}
                    {content}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchStudentChooseAccountPageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        is_admission_approved   : state.auth.is_admission_approved,
        is_school_user          : state.auth.is_school_user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(HistoryIndex);