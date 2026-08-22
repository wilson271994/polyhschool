import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StatusBar,
    SafeAreaView,
    Animated,
    Easing,
    StyleSheet,
    Platform
} from "react-native";
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles as globalStyles, styles } from "../assets/styles/index.js";
import { COLORS } from "../assets/styles/theme.js";

import AuthNavigation from "../navigations/AuthNvigation.js";
import HomeNavigation from "../navigations/HomeNavigation.js";
import CourseNavigation from "../navigations/CourseNavigation.js";
import MessageNavigation from "../navigations/MessageNavigation.js";
import CourseHistoryNavigation from "../navigations/CourseHistoryNavigation";
import ProfilNavigation from "../navigations/ProfilNavigation.js";

import {
    switchHomePageAction,
    switchCoursePageAction,
    switchMessagePageAction,
    switchProfilPageAction,
    switchCourseHistoryPageAction,
    switchNotifHomeAction,
    switchSupportHomeAction
} from "../navigations/rootNavigation.js";

import { FetchShoolUserInfos } from "../reducers/actions/index.js";
import { navStyles } from "../assets/styles/base.js";

class BaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.borderAnim = new Animated.Value(0);
        this.borderAnimationLoop = null;
    }

    componentDidMount() {
        this._loadData();
        if (this.props.is_loading) {
            this._startBorderAnimation();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.is_loading !== this.props.is_loading) {
            if (this.props.is_loading) {
                this._startBorderAnimation();
            } else {
                this._stopBorderAnimation();
            }
        }
    }

    _startBorderAnimation = () => {
        this.borderAnim.setValue(0);
        this.borderAnimationLoop = Animated.loop(
            Animated.timing(this.borderAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        );
        this.borderAnimationLoop.start();
    };

    _stopBorderAnimation = () => {
        if (this.borderAnimationLoop) {
            this.borderAnimationLoop.stop();
        }
        Animated.timing(this.borderAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    _loadData = async () => {
        const user_token_data = await AsyncStorage.getItem('userToken');
        if (user_token_data != null) {
            const user_token_data_parse = JSON.parse(user_token_data);
            await FetchShoolUserInfos(user_token_data_parse);
        }
    };

    _navigateToNotification = () => {
        switchNotifHomeAction(true);
    };

    _navigateToSupport = () => {
        switchSupportHomeAction(true);
    };

    renderHeader = () => {
        return (
            <View style={navStyles.header}>
                <TouchableOpacity style={navStyles.logoContainer} activeOpacity={0.8}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={navStyles.logoImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <View style={navStyles.headermiddle}>
                    <Text style={[styles.textBold, navStyles.headermiddletext]}>Poly-H School</Text>
                    <Text style={[styles.textBold, navStyles.headermiddlesubtext]}>L'intelligence qui transforme l'école pour bâtir la nation.</Text>
                    <Text style={[styles.textBold, navStyles.headermiddlesubsubtext]}>Au-delà de l'imagination</Text>
                </View>

                <View style={navStyles.headerRight}>
                    <TouchableOpacity
                        onPress={this._navigateToSupport}
                        style={navStyles.headerBtn}
                        activeOpacity={0.75}
                    >
                        <View style={navStyles.videoWrapper}>
                            <Video
                                source={require('../assets/Gif/support.mp4')}
                                style={navStyles.supportVideo}
                                resizeMode="cover"
                                repeat={true}
                                muted={true}
                                controls={false}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._navigateToNotification}
                        style={navStyles.headerBtn}
                        activeOpacity={0.75}
                    >
                        <View style={navStyles.iconWrapper}>
                            <Icon name="bell-outline" size={22} color={COLORS.textPrimary} />
                            <View style={navStyles.notifBadge}>
                                <Text style={navStyles.notifBadgeText}>2</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    renderFooter = () => {
        const {
            is_home_page,
            is_course_page,
            is_message_page,
            is_profil_page,
            is_course_history_page,
            is_loading,
        } = this.props;

        const animatedBorderColor = this.borderAnim.interpolate({
            inputRange: [0, 0.33, 0.66, 1],
            outputRange: [
                COLORS.accentGold,
                COLORS.accentCyan,
                COLORS.success,
                COLORS.accentGold,
            ],
        });

        const navItems = [
            {
                key: 'home',
                label: 'Accueil',
                active: is_home_page,
                icon: 'home-variant',
                iconInactive: 'home-variant-outline',
                action: () => switchHomePageAction(true),
            },
            {
                key: 'course',
                label: 'Cours',
                active: is_course_page,
                icon: 'book-open-page-variant',
                iconInactive: 'book-open-page-variant-outline',
                action: () => switchCoursePageAction(true),
            },
            {
                key: 'message',
                label: 'Messages',
                active: is_message_page,
                icon: 'chat-processing',
                iconInactive: 'chat-processing-outline',
                action: () => switchMessagePageAction(true),
            },
            {
                key: 'profile',
                label: 'Profil',
                active: is_profil_page,
                icon: 'account-circle',
                iconInactive: 'account-circle-outline',
                action: () => switchProfilPageAction(true),
            },
            {
                key: 'history',
                label: 'Suivi',
                active: is_course_history_page,
                icon: 'chart-box',
                iconInactive: 'chart-box-outline',
                action: () => switchCourseHistoryPageAction(true),
            },
        ];

        return (
            <View style={navStyles.bottomNavContainer} pointerEvents="box-none">
                <Animated.View
                    style={[
                        navStyles.bottomNav,
                        {
                            borderColor: is_loading ? animatedBorderColor : COLORS.borderGold,
                            borderWidth: is_loading ? 2 : 1,
                        },
                    ]}
                >
                    {navItems.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            onPress={item.action}
                            style={navStyles.navItem}
                            activeOpacity={0.8}
                        >
                            <View style={[item.active ? navStyles.iconBoxActive : navStyles.iconBox]}>
                                <Icon
                                    name={item.active ? item.icon : item.iconInactive}
                                    size={item.active ? 22 : 20}
                                    color={item.active ? COLORS.bgPrimary : COLORS.textMuted}
                                />
                            </View>
                            <Text
                                style={[item.active ? navStyles.navLabelActive : navStyles.navLabel]}
                                numberOfLines={1}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            </View>
        );
    };

    render() {
        const {
            is_home_page,
            is_course_page,
            is_message_page,
            is_profil_page,
            is_course_history_page,
            is_authenticated,
        } = this.props;

        return (
            <SafeAreaView style={navStyles.mainContainer}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {is_authenticated && this.renderHeader()}

                <View style={navStyles.bodyContainer}>
                    {is_authenticated ? (
                        <>
                            {is_home_page && <HomeNavigation />}
                            {is_course_page && <CourseNavigation />}
                            {is_message_page && <MessageNavigation />}
                            {is_profil_page && <ProfilNavigation />}
                            {is_course_history_page && <CourseHistoryNavigation />}
                        </>
                    ) : (
                        <AuthNavigation />
                    )}
                </View>

                {is_authenticated && this.renderFooter()}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHomePageAction,
        switchCoursePageAction,
        switchMessagePageAction,
        switchCourseHistoryPageAction,
        switchProfilPageAction,
        FetchShoolUserInfos
    }, dispatch)
});

const mapStateToProps = (state) => ({
    is_authenticated: state.auth.is_authenticated,
    user_infos: state.auth.user_infos,
    is_loading: state.loader.is_loading,
    is_home_page: state.navigation.is_home_page,
    is_course_page: state.navigation.is_course_page,
    is_message_page: state.navigation.is_message_page,
    is_course_history_page: state.navigation.is_course_history_page,
    is_profil_page: state.navigation.is_profil_page,
    user_token: state.auth.user_token,
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);