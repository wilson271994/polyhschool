import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View, Text, TouchableOpacity, Image, ImageBackground,
    ScrollView, Dimensions, FlatList, Animated
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FetchShoolUserInfos, switchHeaderAction } from '../../../reducers/actions/index.js';
import { styles } from '../../../assets/styles/index.js';
import { parentstyle } from '../../../assets/styles/parent.js';
import ParentBanner from './ParentBanner.js';
import {
    switchRegister1Action,
    switchSchoolSelectionParentAction,
    switchStudentMenuAction,
    switchStudentChooseAccountPageAction
} from '../../../navigations/rootNavigation.js';
import AwesomeAlert from 'react-native-awesome-alerts';

const DEFAULT_PP = require('../../../assets/images/profil.png');

class HomeParentIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_alert: false,
            alert_title: '',
            alert_subtitle: '',
            isInitialLoading: true,
            isRefreshing: false,
        };
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this._fetchData();
        this._handleRefresh();
    }

    _startSpin = () => {
        this.spinValue.setValue(0);
        Animated.loop(
            Animated.timing(this.spinValue, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ).start();
    };

    _stopSpin = () => {
        this.spinValue.stopAnimation();
        this.spinValue.setValue(0);
    };

    _handleRefresh = async () => {
        const { user_token } = this.props;
        this.setState({ isRefreshing: true, isInitialLoading: true });
        this._startSpin();
        try {
            await FetchShoolUserInfos(user_token);
        } catch (e) {
            console.error('Erreur de rafraîchissement', e);
        }
        setTimeout(() => {
            this._stopSpin();
            this.setState({ isRefreshing: false, isInitialLoading: false });
        }, 1500);
    };

    _fetchData = async () => {
        await switchHeaderAction(true);
    };

    _navigateToRegister = () => {
        switchSchoolSelectionParentAction(true);
    };

    _navigateToChildDetails = (child) => {
        switchStudentMenuAction(true);
    };

    _navigateToChooseAccount = () => {
        switchStudentChooseAccountPageAction(true);
    };

    _closeAlert = () => {
        this.setState({ is_alert: false });
    };

    _togglePopUp = (message = "Votre demande d'admission est en cours de traitement") => {
        this.setState({
            is_alert: true,
            alert_title: 'Action impossible',
            alert_subtitle: message,
        });
    };

    getStudentList = () => {
        const { gardian_infos } = this.props;
        if (!gardian_infos) return [];
        if (Array.isArray(gardian_infos.student_list)) return gardian_infos.student_list;
        if (Array.isArray(gardian_infos.gardian_infos?.student_list)) return gardian_infos.gardian_infos.student_list;
        return [];
    };

    getAdmissionList = () => {
        const { gardian_infos } = this.props;
        if (!gardian_infos) return [];
        if (Array.isArray(gardian_infos.admission_list)) return gardian_infos.admission_list;
        if (Array.isArray(gardian_infos.gardian_infos?.admission_list)) return gardian_infos.gardian_infos.admission_list;
        return [];
    };

    renderWelcomeScreen = () => (
        <View style={parentstyle.welcomeContainer}>
            <View style={parentstyle.welcomeVideoContainer}>
                <Video
                    source={require('../../../assets/videos/welcome.mp4')}
                    style={parentstyle.welcomeVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="contain"
                    paused={false}
                />
            </View>
            <Text style={[parentstyle.welcomeTitle, styles.textBold]}>
                BIENVENUE SUR POLYH SCHOOL
            </Text>
            <Text style={[parentstyle.welcomeMessage, styles.text]}>
                Pour profiter des services rattachés à cette application,{'\n'}
                vous devez souscrire à une école.
            </Text>
            <View style={parentstyle.welcomeIconRow}>
                <Icon name="school" size={28} color="#FFD700" />
                <Icon name="book-open-page-variant" size={28} color="#FFD700" />
                <Icon name="account-group" size={28} color="#FFD700" />
            </View>
            <TouchableOpacity
                style={parentstyle.subscribeButton}
                onPress={this._navigateToChooseAccount}
                activeOpacity={0.8}
            >
                <Icon name="school-outline" size={22} color="#FFF" />
                <Text style={[parentstyle.subscribeButtonText, styles.textBold]}>
                    Souscrire à une école
                </Text>
                <Icon name="chevron-right" size={22} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    renderWaitingAdmission = () => {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={parentstyle.waitingContainer}>
                <View style={parentstyle.waitingVideoContainer}>
                    <Video
                        source={require('../../../assets/videos/waiting.mp4')}
                        style={parentstyle.waitingVideo}
                        repeat={true}
                        muted={true}
                        resizeMode="contain"
                        paused={false}
                    />
                </View>
                <Text style={[parentstyle.waitingTitle, styles.textBold]}>
                    Admission en cours de validation
                </Text>
                <Text style={[parentstyle.waitingMessage, styles.text]}>
                    Votre admission est en cours de traitement par l'administration.{'\n'}
                    Veuillez patienter, cela peut prendre quelques instants.
                </Text>
                {this.state.isRefreshing ? (
                    <TouchableOpacity style={parentstyle.refreshButton} disabled>
                        <Animated.View style={{ transform: [{ rotate: spin }] }}>
                            <Icon name="refresh" size={20} color="#FFF" />
                        </Animated.View>
                        <Text style={[parentstyle.refreshButtonText, styles.textBold]}>Chargement...</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={parentstyle.refreshButton} onPress={this._handleRefresh}>
                        <Icon name="refresh" size={20} color="#FFF" />
                        <Text style={[parentstyle.refreshButtonText, styles.textBold]}>Rafraîchir la page</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    renderStudentCard = ({ item }) => (
        <TouchableOpacity
            style={parentstyle.childCard}
            onPress={() => this._navigateToChildDetails(item)}
            activeOpacity={0.8}
        >
            <View style={[parentstyle.statusBadge, item.isActive ? parentstyle.statusActive : parentstyle.statusInactive]}>
                <View style={[parentstyle.statusDot, item.isActive ? parentstyle.statusDotActive : parentstyle.statusDotInactive]} />
                <Text style={[parentstyle.statusText, styles.textBold]}>
                    {item.isActive ? 'Actif' : 'Inactif'}
                </Text>
            </View>
            <View style={parentstyle.childImageContainer}>
                <Image source={item.pp || DEFAULT_PP} style={parentstyle.childImage} />
                <View style={parentstyle.childImageBorder} />
            </View>
            <Text style={[parentstyle.childName, styles.textBold]} numberOfLines={2}>
                {item.name || `${item.first_name} ${item.last_name}`}
            </Text>
            <Text style={[parentstyle.childClass, styles.text]}>
                {item.classe?.name || item.classe || 'Classe non définie'}
            </Text>
            <View style={parentstyle.arrowContainer}>
                <Icon name="chevron-right" size={20} color="#FFF" />
            </View>
        </TouchableOpacity>
    );

    renderAdmissionCard = ({ item }) => (
        <TouchableOpacity
            style={parentstyle.childCard}
            onPress={() => this._togglePopUp()}
            activeOpacity={0.8}
        >
            <View style={[parentstyle.statusBadge, parentstyle.statusInactive]}>
                <View style={[parentstyle.statusDot, parentstyle.statusDotInactive]} />
                <Text style={[parentstyle.statusText, styles.textBold]}>En cours</Text>
            </View>
            <View style={parentstyle.childImageContainer}>
                <Image source={DEFAULT_PP} style={parentstyle.childImage} />
                <View style={parentstyle.childImageBorder} />
            </View>
            <Text style={[parentstyle.childName, styles.textBold]} numberOfLines={2}>
                {item.first_name} {item.last_name}
            </Text>
            <Text style={[parentstyle.childClass, styles.text]}>
                {item.classe?.name || 'Admission en cours'}
            </Text>
            <View style={parentstyle.arrowContainer}>
                <Icon name="chevron-right" size={20} color="#FFF" />
            </View>
        </TouchableOpacity>
    );

    renderListHeader = (count, title = "Liste des souscriptions") => (
        <View style={parentstyle.listHeader}>
            <View style={parentstyle.listHeaderLeft}>
                <Icon name="account-group-outline" size={20} color="#FFD700" />
                <Text style={[parentstyle.listTitle, styles.textBold]}>{title}</Text>
            </View>
            <Text style={[parentstyle.listSubtitle, styles.text]}>
                {count} enfant{count > 1 ? 's' : ''}
            </Text>
        </View>
    );

    renderAddButton = () => (
        <TouchableOpacity
            style={parentstyle.addChildButton}
            onPress={this._navigateToRegister}
            activeOpacity={0.8}
        >
            <View style={parentstyle.addChildButtonInner}>
                <View style={parentstyle.addChildIconCircle}>
                    <Icon name="plus" size={26} color="#FFF" />
                </View>
                <View style={parentstyle.addChildTextContainer}>
                    <Text style={[parentstyle.addChildTitle, styles.textBold]}>Ajouter un enfant</Text>
                    <Text style={[parentstyle.addChildSubtitle, styles.text]}>
                        Inscrivez un nouvel élève à votre compte
                    </Text>
                </View>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.4)" />
            </View>
        </TouchableOpacity>
    );

    render() {
        const { is_alert, alert_title, alert_subtitle, isInitialLoading } = this.state;
        const { user_infos, is_school_user } = this.props;

        if (isInitialLoading) {
            return (
                <View style={parentstyle.container}>
                    <ImageBackground
                        source={require('../../../assets/images/background.png')}
                        style={styles.backgroundapp}
                        resizeMode="cover"
                    >
                        {this.renderWaitingAdmission()}
                    </ImageBackground>
                </View>
            );
        }

        if (!is_school_user) {
            return (
                <View style={parentstyle.container}>
                    <ImageBackground
                        source={require('../../../assets/images/background.png')}
                        style={styles.backgroundapp}
                        resizeMode="cover"
                    >
                        {this.renderWelcomeScreen()}
                    </ImageBackground>
                </View>
            );
        }



        const studentList = this.getStudentList();
        const admissionList = this.getAdmissionList();

        return (
            <View style={parentstyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <ScrollView
                        contentContainerStyle={parentstyle.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <ParentBanner />
                        <View style={parentstyle.subcontainer}>
                            <Text style={[styles.textBold, parentstyle.Text]}>
                                Heureux de vous revoir Mr {user_infos?.name || user_infos?.first_name || 'Parent'}
                            </Text>

                            <View style={parentstyle.financeContainer}>
                                <Text style={[parentstyle.financeTitle, styles.textBold]}>
                                    <Icon name="wallet-outline" size={16} color="#FFD700" /> Bilan financier
                                </Text>
                                <View style={parentstyle.topNavButtonsContainer}>
                                    <TouchableOpacity style={parentstyle.topNavLink1} disabled>
                                        <Image source={require('../../../assets/images/wallet.png')} style={parentstyle.Icon1} />
                                        <View style={parentstyle.expenseView}>
                                            <Text style={[styles.textBold, parentstyle.topNavText]} numberOfLines={2}>
                                                Dépenses annuelles
                                            </Text>
                                            <Text style={[styles.textBold, parentstyle.text]}>
                                                {user_infos?.wallet || '0'} F
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={parentstyle.topNavLink1} disabled>
                                        <Image source={require('../../../assets/images/bonus.png')} style={parentstyle.Icon1} />
                                        <View style={parentstyle.expenseView} />
                                        <Text style={[styles.textBold, parentstyle.topNavText]}>Bonus</Text>
                                        <Text style={[styles.textBold, parentstyle.text]}>
                                            {user_infos?.bonus || '0'} F
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {studentList.length > 0 && (
                                <>
                                    {this.renderListHeader(studentList.length, "Mes enfants inscrits")}
                                    <FlatList
                                        data={studentList}
                                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                                        renderItem={this.renderStudentCard}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        scrollEnabled={false}
                                        contentContainerStyle={{ paddingHorizontal: 8 }}
                                    />
                                </>
                            )}

                            {admissionList.length > 0 && (
                                <>
                                    {this.renderListHeader(admissionList.length, "Admissions en cours")}
                                    <FlatList
                                        data={admissionList}
                                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                                        renderItem={this.renderAdmissionCard}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        scrollEnabled={false}
                                        contentContainerStyle={{ paddingHorizontal: 8 }}
                                    />
                                </>
                            )}

                            {studentList.length === 0 && admissionList.length === 0 && (
                                <View style={parentstyle.emptyContainer}>
                                    <Icon name="account-child-outline" size={50} color="rgba(255,255,255,0.3)" />
                                    <Text style={[parentstyle.addChildSubtitle, styles.text]}>
                                        Aucun enfant inscrit pour le moment
                                    </Text>
                                </View>
                            )}

                            {this.renderAddButton()}
                        </View>
                    </ScrollView>

                    <AwesomeAlert
                        show={is_alert}
                        title={alert_title}
                        titleStyle={[styles.textBold, styles.titlealert]}
                        message={alert_subtitle}
                        messageStyle={[styles.text, styles.descriptionalert]}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="J'ai compris"
                        confirmButtonStyle={[styles.text, styles.btnalert]}
                        confirmButtonColor="#1B497D"
                        onConfirmPressed={this._closeAlert}
                    />
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHeaderAction,
        switchRegister1Action,
        switchStudentMenuAction,
        FetchShoolUserInfos,
        switchSchoolSelectionParentAction,
        switchStudentChooseAccountPageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    gardian_infos: state.auth.gardian_infos || state.auth.gardian_infos?.gardian_infos,
    user_token: state.auth.user_token,
    is_school_user: state.auth.is_school_user,
});

export default connect(mapStateToProps, mapDispatchToProps, null)(HomeParentIndex);