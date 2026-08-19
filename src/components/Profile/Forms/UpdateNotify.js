
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ImageBackground, Animated, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { styles } from '../../../assets/styles/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

const NOTIF_SETTINGS_KEY = 'notificationSettings';

class UpdateNotify extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            savingIds: [],

            activeTab: 'notifications',
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

        if (!cachedSettings || typeof cachedSettings !== 'object') {
            cachedSettings = {};
        }

        if (baseList.length === 0) {
            const cachedValues = Object.keys(cachedSettings).length > 0
                ? Object.values(cachedSettings)
                : [];
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
            console.log('Valeurs envoyées dans _updateNotify:', payload);
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
                    description: 'Enregistré localement, la synchronisation reprendra dès que possible.',
                }
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

    renderFilterContainer = () => {
        const { activeTab } = this.state;
        return (
            <View style={profilstyle.filterContainer}>
                <View style={profilstyle.tabContainer}>
                    <TouchableOpacity
                        style={[profilstyle.tabButton, activeTab === 'notifications' && profilstyle.tabButtonActive]}
                        onPress={() => this.setState({ activeTab: 'notifications' })}
                    >
                        <FontAwesome5Icon name="bell" size={14} color={activeTab === 'notifications' ? '#fff' : '#555'} />
                        <Text style={[profilstyle.tabButtonText, activeTab === 'notifications' && profilstyle.tabButtonTextActive]}>
                            Mes notifications
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[profilstyle.tabButton, activeTab === 'subscriptions' && profilstyle.tabButtonActive]}
                        onPress={() => this.setState({ activeTab: 'subscriptions' })}
                    >
                        <FontAwesome5Icon name="user-friends" size={14} color={activeTab === 'subscriptions' ? '#fff' : '#555'} />
                        <Text style={[profilstyle.tabButtonText, activeTab === 'subscriptions' && profilstyle.tabButtonTextActive]}>
                            Autres notifications
                        </Text>
                    </TouchableOpacity>
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
            <Animated.View style={[profilstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={profilstyle.headerSection}>
                        <View style={profilstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={profilstyle.headerButton}
                                onPress={this._navigateToProfil}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={profilstyle.headertext}>
                            <Text style={[profilstyle.headerTitle, styles.textBold]}>
                                Paramètres des notifications
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    renderNotificationList = () => {
        const { notifications, savingIds } = this.state;

        if (!Array.isArray(notifications) || notifications.length === 0) {
            return (
                <Text style={[styles.text, { color: '#fff', textAlign: 'center', marginTop: 12 }]}>
                    Aucune notification disponible pour le moment.
                </Text>
            );
        }

        return notifications.map((notif) => {
            const isSaving = savingIds.includes(notif.notif_id);
            return (
                <View key={notif.notif_id} style={profilstyle.formcheckitem}>
                    <View style={profilstyle.labelcheckitem}>
                        <Text style={[styles.textBold, profilstyle.label]}>{notif.notif_name}</Text>
                        <Text style={[styles.text, profilstyle.sublabel]}>{notif.notif_description}</Text>
                    </View>
                    <View style={profilstyle.checkbtncont}>
                        {isSaving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <TouchableOpacity
                                onPress={() => this._onChangeNotification(notif)}
                                style={[profilstyle.checkbtn, notif.can_received_alert ? profilstyle.ischeckbtn : '']}
                            >
                                {notif.can_received_alert ? <FontAwesome5Icon name='check' style={profilstyle.ischeckicon} /> : null}
                            </TouchableOpacity>

                        )}

                        {/* <TouchableOpacity onPress={this._updateNotify}
                            style={profilstyle.submitButton}
                            disabled={is_loading}>
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={[styles.textBold, profilstyle.submitBtnText]}>Enregistrer</Text>
                            )}
                        </TouchableOpacity> */}
                    </View>
                </View>
            );
        });
    };

    render() {
        const { activeTab, selectedChild } = this.state;
        const childrenList = this.getChildrenList();
        const childrenDropdownData = childrenList.map(child => ({
            label: child.name || `${child.first_name} ${child.last_name}`,
            value: child.id,
        }));

        return (
            <View style={profilstyle.containerform}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={profilstyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={profilstyle.section}>
                            <View style={styles.section}>
                                <View style={styles.back}>
                                    <TouchableOpacity onPress={this._navigateToProfil}>
                                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.sectionTitle, styles.textBold]}>Paramètres des notifications</Text>
                            </View>
                        </View>

                        {this.renderFilterContainer()}

                        {activeTab === 'notifications' ? (
                            <View style={profilstyle.formcontainer}>
                                {this.renderNotificationList()}
                            </View>
                        ) : (
                            <View style={profilstyle.formcontainer}>
                                <Text style={[styles.textBold, profilstyle.label, { marginBottom: 12 }]}>
                                    Sélectionnez un enfant pour voir ses informations
                                </Text>
                                <Dropdown
                                    style={[styles.text, profilstyle.inputContainer, { marginBottom: 20 }]}
                                    placeholderStyle={[profilstyle.placeholderStyle, styles.text]}
                                    selectedTextStyle={[profilstyle.selectedTextStyle, styles.textBold]}
                                    itemTextStyle={[profilstyle.itemTextStyle, styles.text]}
                                    containerStyle={profilstyle.containeritemdrop}
                                    iconStyle={profilstyle.iconStyle}
                                    dropdownPosition="auto"
                                    data={childrenDropdownData}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Choisir un enfant"
                                    value={selectedChild}
                                    onChange={item => this.setState({ selectedChild: item.value })}
                                    renderLeftIcon={() => <FontAwesome5Icon name="child" color="#FFF" style={{ marginRight: 8 }} />}
                                />
                                {selectedChild && (
                                    <View style={{ marginTop: 16 }}>
                                        <Text style={[styles.text, { color: '#fff', textAlign: 'center' }]}>
                                            Fonctionnalité à venir : détails de l'enfant sélectionné.
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}

                        <View style={{ height: 60 }} />
                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchProfilPageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
    site_infos: state.auth.site_infos,
    gardian_infos: state.auth.gardian_infos,
    school_notification_list: state.auth.school_notification_list,
});

export default connect(mapStateToProps, mapDispatchToProps, null)(UpdateNotify);
