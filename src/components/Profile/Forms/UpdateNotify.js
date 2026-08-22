import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Animated,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../../assets/styles/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';
import { UpdateNotificationPermissionAction } from '../../../reducers/actions/index.js';

const NOTIF_SETTINGS_KEY = 'notificationSettings';

class UpdateNotify extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            savingIds: [],
            activeTab: 'notifications', // 'notifications' | 'subscriptions'
            selectedChild: null,
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this._loadNotifInfo();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.school_notification_list !== this.props.school_notification_list) {
            this._loadNotifInfo();
        }
    }

    _loadNotifInfo = async () => {
        const { school_notification_list } = this.props;
        const baseList = Array.isArray(school_notification_list) ? school_notification_list : [];

        let cachedSettings = {};
        try {
            const cached = await AsyncStorage.getItem(NOTIF_SETTINGS_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    cachedSettings = parsed;
                }
            }
        } catch (error) {
            console.log('Erreur lecture cache notifications:', error);
        }

        if (baseList.length === 0) {
            const cachedValues = Object.keys(cachedSettings).length > 0 ? Object.values(cachedSettings) : [];
            this.setState({ notifications: cachedValues });
            return;
        }

        const notifications = baseList.map((notif) => {
            const cachedNotif = cachedSettings[notif.notif_id];
            return {
                notif_id: notif.notif_id,
                notif_name: notif.notif_name,
                notif_description: this._stripHtml(notif.notif_description),
                can_received_alert: cachedNotif
                    ? !!cachedNotif.can_received_alert
                    : !!notif.can_received_alert,
            };
        });

        this.setState({ notifications });
        this._persistNotifications(notifications);
    };

    _persistNotifications = async (notifications) => {
        if (!Array.isArray(notifications)) return;
        try {
            const settingsObject = {};
            notifications.forEach((notif) => {
                if (notif && notif.notif_id !== undefined) {
                    settingsObject[notif.notif_id] = notif;
                }
            });
            await AsyncStorage.setItem(NOTIF_SETTINGS_KEY, JSON.stringify(settingsObject));
        } catch (error) {
            console.log('Erreur sauvegarde cache notifications:', error);
        }
    };

    _stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    _onChangeNotification = (notif) => {
        const updatedNotif = {
            ...notif,
            can_received_alert: !notif.can_received_alert,
        };

        const updatedNotifications = this.state.notifications.map((item) =>
            item.notif_id === updatedNotif.notif_id ? updatedNotif : item
        );

        this.setState({ notifications: updatedNotifications });
        this._persistNotifications(updatedNotifications);
        this._autoSaveNotification(updatedNotif);
    };

    _autoSaveNotification = async (updatedNotif) => {
        const { user_token } = this.props;

        this.setState((prevState) => ({
            savingIds: [...prevState.savingIds, updatedNotif.notif_id],
        }));

        const payload = {
            token: user_token,
            notifications: [
                {
                    notif_id: updatedNotif.notif_id,
                    can_received_alert: updatedNotif.can_received_alert,
                },
            ],
        };

        let result;
        try {
            result = await UpdateNotificationPermissionAction(payload, { silent: true });
        } catch (error) {
            result = { success: false, error };
        }

        this.setState((prevState) => ({
            savingIds: prevState.savingIds.filter((id) => id !== updatedNotif.notif_id),
        }));

        if (!result || !result.success) {
            Toast.show({
                type: 'info',
                props: {
                    title: 'Synchronisation',
                    description: 'Modifications sauvegardées localement.',
                },
            });
        }
    };

    getChildrenList = () => {
        const { gardian_infos } = this.props;
        if (!gardian_infos || typeof gardian_infos !== 'object') return [];
        if (Array.isArray(gardian_infos.student_list)) return gardian_infos.student_list;
        if (gardian_infos.gardian_infos && Array.isArray(gardian_infos.gardian_infos.student_list)) {
            return gardian_infos.gardian_infos.student_list;
        }
        return [];
    };

    renderTabs = () => {
        const { activeTab } = this.state;

        return (
            <View style={profilstyle.tabRow}>
                <TouchableOpacity
                    style={[profilstyle.tabBtn, activeTab === 'notifications' && profilstyle.tabBtnActive]}
                    onPress={() => this.setState({ activeTab: 'notifications' })}
                    activeOpacity={0.8}
                >
                    <Icon
                        name="bell-outline"
                        size={16}
                        color={activeTab === 'notifications' ? COLORS.textDark : COLORS.textMuted}
                    />
                    <Text
                        style={[
                            styles.textBold,
                            profilstyle.tabText,
                            activeTab === 'notifications' && profilstyle.tabTextActive,
                        ]}
                    >
                        Mes notifications
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[profilstyle.tabBtn, activeTab === 'subscriptions' && profilstyle.tabBtnActive]}
                    onPress={() => this.setState({ activeTab: 'subscriptions' })}
                    activeOpacity={0.8}
                >
                    <Icon
                        name="account-child-outline"
                        size={18}
                        color={activeTab === 'subscriptions' ? COLORS.textDark : COLORS.textMuted}
                    />
                    <Text
                        style={[
                            styles.textBold,
                            profilstyle.tabText,
                            activeTab === 'subscriptions' && profilstyle.tabTextActive,
                        ]}
                    >
                        Autres notifications
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderNotificationList = () => {
        const { notifications, savingIds } = this.state;

        if (!Array.isArray(notifications) || notifications.length === 0) {
            return (
                <View style={profilstyle.emptyContainer}>
                    <Icon name="bell-off-outline" size={48} color={COLORS.accentGold} />
                    <Text style={[styles.textBold, profilstyle.emptyTitle]}>Aucune notification réglable</Text>
                    <Text style={[styles.text, profilstyle.emptyText]}>
                        Aucun canal de notification disponible pour le moment.
                    </Text>
                </View>
            );
        }

        return notifications.map((notif) => {
            const isSaving = savingIds.includes(notif.notif_id);

            return (
                <View key={notif.notif_id} style={profilstyle.notifCard}>
                    <View style={profilstyle.notifInfo}>
                        <Text style={[styles.textBold, profilstyle.notifTitle]}>{notif.notif_name}</Text>
                        {notif.notif_description !== '' && (
                            <Text style={[styles.text, profilstyle.notifDesc]}>{notif.notif_description}</Text>
                        )}
                    </View>

                    <View style={profilstyle.switchWrapper}>
                        {isSaving ? (
                            <ActivityIndicator size="small" color={COLORS.accentGold} />
                        ) : (
                            <Switch
                                value={notif.can_received_alert}
                                onValueChange={() => this._onChangeNotification(notif)}
                                trackColor={{ false: '#334155', true: COLORS.accentGold }}
                                thumbColor={COLORS.textPrimary}
                            />
                        )}
                    </View>
                </View>
            );
        });
    };

    render() {
        const { activeTab, selectedChild } = this.state;
        const childrenList = this.getChildrenList();
        const childrenDropdownData = childrenList.map((child) => ({
            label: child.name || `${child.first_name} ${child.last_name}`,
            value: child.id,
        }));

        return (
            <SafeAreaView style={profilstyle.containerform}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={profilstyle.topGlow} pointerEvents="none" />
                <View style={profilstyle.bottomGlow} pointerEvents="none" />

                {/* Navigation Bar */}
                <View style={profilstyle.headerNav}>
                    <TouchableOpacity
                        style={profilstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={profilstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, profilstyle.headerTitle]}>Préférences d'Alerte</Text>
                    </View>
                </View>

                <Animated.ScrollView
                    contentContainerStyle={profilstyle.scrollContent}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderTabs()}

                    {activeTab === 'notifications' ? (
                        <View style={profilstyle.formContainer}>{this.renderNotificationList()}</View>
                    ) : (
                        <View style={profilstyle.formContainer}>
                            <View style={profilstyle.cardItem}>
                                <View style={profilstyle.fieldHeader}>
                                    <Icon name="face-man-profile" size={20} color={COLORS.accentGold} />
                                    <Text style={[styles.textBold, profilstyle.label]}>
                                        Sélectionnez un profil rattaché
                                    </Text>
                                </View>

                                <Dropdown
                                    style={profilstyle.dropdown}
                                    placeholderStyle={profilstyle.dropdownPlaceholder}
                                    selectedTextStyle={profilstyle.dropdownSelectedText}
                                    itemTextStyle={profilstyle.dropdownItemText}
                                    itemContainerStyle={profilstyle.dropdownItemContainer}
                                    containerStyle={profilstyle.dropdownMenu}
                                    activeColor="rgba(255, 179, 0, 0.2)"
                                    data={childrenDropdownData}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Choisir un enfant..."
                                    value={selectedChild}
                                    onChange={(item) => this.setState({ selectedChild: item.value })}
                                />
                            </View>

                            {selectedChild && (
                                <View style={profilstyle.childInfoBox}>
                                    <Icon name="information-outline" size={24} color={COLORS.accentCyan} />
                                    <Text style={[styles.text, profilstyle.childInfoText]}>
                                        Synchronisation des paramètres de notifications pour le profil sélectionné.
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </Animated.ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchProfilPageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
    site_infos: state.auth.site_infos,
    gardian_infos: state.auth.gardian_infos,
    school_notification_list: state.auth.school_notification_list,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNotify);