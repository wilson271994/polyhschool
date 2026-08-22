import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { courseparentstyle } from '../../assets/styles/course_parent.js';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import { switchRegister1Action, switchStudentChooseAccountPageAction } from '../../navigations/rootNavigation.js';
import { styles } from '../../assets/styles/index.js';

const child_list = [
    {
        id: 1,
        name: 'Dumerile Jacques',
        classe: '3ème A',
        image: require('../../assets/images/profil.png'),
        isActive: true,
    },
    {
        id: 2,
        name: 'Dumerile Jacques',
        classe: '6ème B',
        image: require('../../assets/images/profil.png'),
        isActive: true,
    },
    {
        id: 3,
        name: 'Dumerile Jacques',
        classe: 'Terminale D',
        image: require('../../assets/images/profil.png'),
        isActive: false,
    },
];

class Parent_Course_History_Page extends PureComponent {

    componentDidMount() {
        this._fechtData();
    }

    _fechtData = async () => {
        await switchHeaderAction(true);
    }

    _navigateToRegister = () => {
        switchRegister1Action(true);
    }

    _navigateToChooseAccount = () => {
        switchStudentChooseAccountPageAction(true);
    };

    _navigateToCoursesIndex = (item) => {
        if (this.props.onNavigateToCourses) {
            this.props.onNavigateToCourses(item);
        }
    }

    renderWelcomeScreen = () => (
        <View style={courseparentstyle.welcomeContainer}>
            <View style={courseparentstyle.welcomeVideoContainer}>
                <Video
                    source={require('../../assets/videos/welcome.mp4')}
                    style={courseparentstyle.welcomeVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[courseparentstyle.welcomeTitle, styles.textBold]}>
                BIENVENUE SUR POLYH SCHOOL
            </Text>

            <Text style={[courseparentstyle.welcomeMessage, styles.text]}>
                Pour profiter des services rattachés à cette application,{'\n'}
                vous devez souscrire à une école.
            </Text>

            <View style={courseparentstyle.welcomeIconRow}>
                <Icon name="school" size={28} color="#FFD700" />
                <Icon name="book-open-page-variant" size={28} color="#FFD700" />
                <Icon name="account-group" size={28} color="#FFD700" />
            </View>

            {/* <TouchableOpacity
                style={courseparentstyle.subscribeButton}
                onPress={this._navigateToChooseAccount}
                activeOpacity={0.8}
            >
                <Icon name="school-outline" size={22} color="#FFF" />
                <Text style={[courseparentstyle.subscribeButtonText, styles.textBold]}>
                    Souscrire à une école
                </Text>
                <Icon name="chevron-right" size={22} color="#FFF" />
            </TouchableOpacity> */}
        </View>
    );

    renderWaitingAdmission = () => (
        <View style={courseparentstyle.waitingContainer}>
            <View style={courseparentstyle.waitingVideoContainer}>
                <Video
                    source={require('../../assets/videos/waiting.mp4')}
                    style={courseparentstyle.waitingVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[courseparentstyle.waitingTitle, styles.textBold]}>
                Admission en cours de validation
            </Text>

            <Text style={[courseparentstyle.waitingMessage, styles.text]}>
                Votre admission est en cours de traitement par l'administration.{'\n'}
                Veuillez patienter, cela peut prendre quelques instants.
            </Text>
        </View>
    );

    renderChildCard = ({ item }) => (
        <TouchableOpacity
            style={courseparentstyle.childCard}
            onPress={() => this._navigateToCoursesIndex(item)}
            activeOpacity={0.8}
        >
            <View style={[courseparentstyle.statusBadge, item.isActive ? courseparentstyle.statusActive : courseparentstyle.statusInactive]}>
                <View style={[courseparentstyle.statusDot, item.isActive ? courseparentstyle.statusDotActive : courseparentstyle.statusDotInactive]} />
                <Text style={[courseparentstyle.statusText, styles.textBold]}>
                    {item.isActive ? 'Actif' : 'Inactif'}
                </Text>
            </View>

            <View style={courseparentstyle.childImageContainer}>
                <Image source={item.image} style={courseparentstyle.childImage} />
                <View style={courseparentstyle.childImageBorder} />
            </View>

            <Text style={[courseparentstyle.childName, styles.textBold]} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={[courseparentstyle.childClass, styles.text]}>
                {item.classe}
            </Text>

            <View style={courseparentstyle.arrowContainer}>
                <Icon name="chevron-right" size={22} color="#FFF" />
            </View>
        </TouchableOpacity>
    );

    renderListHeader = () => (
        <View style={courseparentstyle.listHeader}>
            <Text style={[courseparentstyle.listTitle, styles.textBold]}>
                Mes souscriptions
            </Text>
            <Text style={[courseparentstyle.listSubtitle, styles.text]}>
                {child_list.length} souscription{child_list.length > 1 ? 's' : ''} enregistrée{child_list.length > 1 ? 's' : ''}
            </Text>
        </View>
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
                    data={child_list}
                    renderItem={this.renderChildCard}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={courseparentstyle.childGrid}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderListHeader}
                    ListFooterComponentStyle={{ paddingBottom: 30 }}
                    ListEmptyComponent={
                        <View style={courseparentstyle.emptyContainer}>
                            <Icon name="account-group-outline" size={64} color="#A0AEC0" />
                            <Text style={[courseparentstyle.emptyText, styles.textBold]}>
                                Aucun enfant inscrit
                            </Text>
                            <Text style={[courseparentstyle.emptySubtext, styles.text]}>
                                Ajoutez un enfant pour commencer à suivre ses cours
                            </Text>
                        </View>
                    }
                />
            );
        }

        return (
            <View style={courseparentstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    {content}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchRegister1Action,
            switchStudentChooseAccountPageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_infos              : state.auth.user_infos,
        is_school_user          : state.auth.is_school_user,
        is_admission_approved   : state.auth.is_admission_approved,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Parent_Course_History_Page);