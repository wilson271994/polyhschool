import React, { Component } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Linking, ImageBackground, Platform } from 'react-native';
import { styles } from '../../assets/styles';
import 'moment/locale/fr';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { sigupstyle } from '../../assets/styles/signup.js';
import { SignupAction, UpdateNotificationPermissionAction } from '../../reducers/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { switchSignupForm1Action } from '../../navigations/rootNavigation.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const datagender = [
    { label: 'Masculin', value: '0' },
    { label: 'Féminin', value: '1' },
];

class signUpForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            street: '',
            acceptCondition: false,
            password2Visible: false,
            confidCountryFocus: false,
            confidCityFocus: false,
            confidGenderFocus: false,
            password1: '',
            password2: '',
            sexe: '',
            country: '',
            address: '',
            city: '',
            account: '',
            is_alert: false,
            alert_title: '',
            alert_subtitle: '',
            cities: [],
            type_user: '',
            speciality: '',
            classe: '',
        };
    }

    componentDidMount() {
        this._PersistForm2();
    }

    _PersistForm2 = async () => {
        const form2data = await AsyncStorage.getItem('Dataform2');
        const form1data = await AsyncStorage.getItem('DataForm1');
        const chooseData = await AsyncStorage.getItem('DataChoose');

        let type_user = null;
        if (chooseData) {
            const parsed = JSON.parse(chooseData);
            type_user = parsed.type_user;
        }

        if (form1data) {
            const data = JSON.parse(form1data);
            this.setState({
                speciality: data.speciality,
                classe: data.classe
            });
        }

        if (form2data) {
            const persistdata = JSON.parse(form2data);
            this.setState({
                sexe: persistdata.sexe || null,
                country: persistdata.country || null,
                city: persistdata.city || null,
                address: persistdata.address || '',
                password1: persistdata.password1 || '',
                password2: persistdata.password2 || '',
                acceptCondition: persistdata.acceptCondition || false,
                type_user: type_user,
            });
        } else {
            this.setState({ type_user });
        }
    };

    _onChangeAcceptCondition = () => {
        this.setState({ acceptCondition: !this.state.acceptCondition });
    };

    _redirectPolicy = (url) => {
        Linking.openURL(url);
    };

    _navigateToForm1 = () => {
        switchSignupForm1Action(true);
    };

    _passwordValidation = () => this.state.password1 === this.state.password2;
    _acceptConditionValidation = () => this.state.acceptCondition;

    _authSignup = async () => {
        const { country, city, password1, password2, sexe, acceptCondition, address, speciality, classe, type_user } = this.state;

        if (!country || !city || !password1 || !password2 || !sexe || !address || !this._passwordValidation() || !this._acceptConditionValidation()) {
            if (!country) Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez renseigner votre pays.' });
            if (!city) Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez renseigner votre ville.' });
            if (!sexe) Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez renseigner votre sexe.' });
            if (!address) Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez renseigner votre adresse.' });
            if (!this._passwordValidation()) Toast.show({ type: 'error', text1: 'Erreur', text2: 'Les mots de passe ne correspondent pas.' });
            if (!this._acceptConditionValidation()) Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez accepter les conditions.' });
            return;
        }

        let school = '';
        try {
            const selectedSchoolRaw = await AsyncStorage.getItem('SelectedSchoolId');
            if (selectedSchoolRaw) {
                const parsed = JSON.parse(selectedSchoolRaw);
                school = parsed.school !== undefined ? parsed.school : parsed;
            }
        } catch (e) {
            console.error('Erreur lors de la récupération du schoolId :', e);
        }

        const form1data = await AsyncStorage.getItem('DataForm1');
        var username = '';
        var first_name = '';
        var last_name = '';
        var email = '';
        var birthday_date = '';
        var phone = '';
        if (form1data !== null) {
            const unpackdata = JSON.parse(form1data);
            if (unpackdata.username !== '') username = unpackdata.username;
            if (unpackdata.first_name !== '') first_name = unpackdata.first_name;
            if (unpackdata.last_name !== '') last_name = unpackdata.last_name;
            if (unpackdata.email !== '') email = unpackdata.email;
            if (unpackdata.birthday_date !== '') birthday_date = unpackdata.birthday_date;
            if (unpackdata.phone !== '') phone = unpackdata.phone;
        }

        const formdata = new FormData();

        formdata.append('type_user', type_user);
        formdata.append('username', username);
        formdata.append('first_name', first_name);
        formdata.append('last_name', last_name);
        formdata.append('email', email);
        formdata.append('birthday_date', birthday_date);
        formdata.append('phone', phone);
        formdata.append('sexe', sexe.label);
        formdata.append('country', country);
        formdata.append('city', city?.id || city || '');
        formdata.append('address', address);
        formdata.append('password1', password1);
        formdata.append('password2', password2);
        formdata.append('acceptCondition', acceptCondition);
        formdata.append('school', school);

        const isStudent = type_user === 'school_student';
        if (isStudent) {
            formdata.append('speciality', speciality || '');
            formdata.append('classe', classe || '');
        }

        console.log('FormData prêt pour envoi:', {
            _parts: formdata._parts.map(part => ({
                champ: part[0],
                valeur: part[1]
            }))
        });

        SignupAction(formdata);
    };

    _toggleCountry = (item) => {
        if (!item || !item.id) return;
        this.setState({
            country: item.id,
            cities: item.cities || []
        });
    }

    render() {
        const { is_loading, site_infos } = this.props;
        const {
            country, city, password1, password2, cities, address,
            acceptCondition, confidCountryFocus, confidCityFocus,
            confidGenderFocus, sexe
        } = this.state;

        const countriesUnavailable = !site_infos?.countries?.length;

        return (
            <View style={sigupstyle.container}>
                <ImageBackground source={require('../../assets/images/background.png')} style={styles.backgroundapp} resizeMode="cover">
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                        <View style={sigupstyle.back}>
                            <TouchableOpacity onPress={this._navigateToForm1} activeOpacity={0.7}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={sigupstyle.logoContainer}>
                            <Image source={require('../../assets/images/logo.png')} style={sigupstyle.logo} />
                            <Text style={[sigupstyle.slogan, styles.textBold]}>Beyond imagination</Text>
                        </View>

                        <View style={sigupstyle.inputContainer}>

                            <Text style={[sigupstyle.label, styles.text]}>
                                <Icon name="human" size={18} color="#FFF" /> Sexe
                            </Text>
                            <Dropdown
                                style={[sigupstyle.dropdown, confidGenderFocus]}
                                placeholderStyle={[sigupstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[sigupstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[sigupstyle.itemTextStyle, styles.text]}
                                containerStyle={sigupstyle.dropdownContainer}
                                itemContainerStyle={sigupstyle.itemContainerStyle}
                                inputSearchStyle={sigupstyle.searchText}
                                search={true}
                                dropdownPosition='auto'
                                data={datagender}
                                labelField="label"
                                valueField="value"
                                placeholder={!confidGenderFocus ? 'Choisir votre sexe...' : '...'}
                                value={sexe}
                                onFocus={() => this.setState({ confidGenderFocus: true })}
                                onBlur={() => this.setState({ confidGenderFocus: false })}
                                onChange={item => this.setState({ sexe: item })}
                                renderLeftIcon={() => (<Foundation name='male-female' color="#FFF" />)}
                                disable={false}
                                onPress={() => { }}
                            />

                            <Text style={[sigupstyle.label, styles.text]}>
                                <Icon name="flag" size={18} color="#FFF" />Pays
                            </Text>
                            <Dropdown
                                style={[sigupstyle.dropdown, confidCountryFocus]}
                                placeholderStyle={[sigupstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[sigupstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[sigupstyle.itemTextStyle, styles.text]}
                                containerStyle={sigupstyle.dropdownContainer}
                                itemContainerStyle={sigupstyle.itemContainerStyle}
                                inputSearchStyle={sigupstyle.searchText}
                                search={true}
                                dropdownPosition='auto'
                                data={countriesUnavailable ? [] : site_infos.countries}
                                labelField="name"
                                valueField="id"
                                placeholder={countriesUnavailable ? '⚠ Connexion instable...' : (!confidCountryFocus ? 'Choisir votre Pays' : '...')}
                                value={country}
                                onFocus={() => this.setState({ confidCountryFocus: true })}
                                onBlur={() => this.setState({ confidCountryFocus: false })}
                                onChange={item => this._toggleCountry(item)}
                                renderLeftIcon={() => (<Foundation name='flag' color="#FFF" />)}
                                disable={countriesUnavailable}
                                onPress={() => { }}
                            />

                            <Text style={[sigupstyle.label, styles.text]}>
                                <Icon name="city" size={18} color="#FFF" /> Ville
                            </Text>
                            <Dropdown
                                style={[sigupstyle.dropdown, confidCityFocus]}
                                placeholderStyle={[sigupstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[sigupstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[sigupstyle.itemTextStyle, styles.text]}
                                containerStyle={sigupstyle.dropdownContainer}
                                itemContainerStyle={sigupstyle.itemContainerStyle}
                                inputSearchStyle={sigupstyle.searchText}
                                search={true}
                                dropdownPosition='auto'
                                data={cities}
                                labelField="name"
                                valueField="id"
                                placeholder={!confidCityFocus ? 'Choisir votre Ville' : '...'}
                                value={city}
                                onFocus={() => this.setState({ confidCityFocus: true })}
                                onBlur={() => this.setState({ confidCityFocus: false })}
                                onChange={item => this.setState({ city: item })}
                                renderLeftIcon={() => (<Foundation name='map' color="#FFF" />)}
                                disable={false}
                                onPress={() => { }}
                            />

                            <Text style={[sigupstyle.label, styles.text]}>
                                <Icon name="map" size={18} color="#FFF" /> Quartier
                            </Text>
                            <View style={sigupstyle.inputWrapper}>
                                <TextInput
                                    style={[sigupstyle.input, styles.textBold]}
                                    placeholder="Votre adresse"
                                    placeholderTextColor="#eee"
                                    value={address}
                                    onChangeText={(text) => this.setState({ address: text })}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                />
                            </View>

                            <Text style={[sigupstyle.label, styles.text]}>
                                <Icon name="lock" size={18} color="#FFF" /> Mot de passe
                            </Text>
                            <View style={sigupstyle.inputWrapper}>
                                <TextInput
                                    style={[sigupstyle.input, styles.textBold]}
                                    placeholder="Mot de passe"
                                    placeholderTextColor="#eee"
                                    value={password1}
                                    onChangeText={(text) => this.setState({ password1: text })}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    secureTextEntry={!this.state.password2Visible}
                                />
                            </View>

                            <Text style={[sigupstyle.label, styles.text]}>
                                <Icon name="lock" size={18} color="#FFF" /> Confirmer le mot de passe
                            </Text>
                            <View style={sigupstyle.inputWrapper}>
                                <TextInput
                                    style={[sigupstyle.input, styles.textBold]}
                                    placeholder="Confirmer le mot de passe"
                                    placeholderTextColor="#eee"
                                    value={password2}
                                    onChangeText={(text) => this.setState({ password2: text })}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    secureTextEntry={!this.state.password2Visible}
                                />
                            </View>

                            <View style={sigupstyle.checkboxContainer}>
                                <View style={sigupstyle.containercondition}>
                                    <TouchableOpacity
                                        style={sigupstyle.checkbtn}
                                        onPress={this._onChangeAcceptCondition}
                                        activeOpacity={0.7}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        {acceptCondition ? <FontAwesome name='check' style={sigupstyle.checkicon} /> : <Text></Text>}
                                    </TouchableOpacity>
                                    <Text style={[styles.text, sigupstyle.conditiontext]}>
                                        En créant votre compte, vous acceptez les
                                        <TouchableOpacity onPress={this._redirectPolicy.bind(this, 'https://japapmessenger.com/terms/terms')} activeOpacity={0.7}>
                                            <Text style={[styles.text, sigupstyle.conditionlink]}> conditions </Text>
                                        </TouchableOpacity>
                                        d'utilisations et de
                                        <TouchableOpacity onPress={this._redirectPolicy.bind(this, 'https://japapmessenger.com/terms/privacy-policy')} activeOpacity={0.7}>
                                            <Text style={[styles.text, sigupstyle.conditionlink]}> confidentialités </Text>
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={this._authSignup}
                            style={sigupstyle.button}
                            disabled={is_loading}
                            activeOpacity={0.7}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={[styles.textBold, sigupstyle.buttonText]}>Continuer</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchSignupForm1Action }, dispatch),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    site_infos: state.auth.site_infos,
});

export default connect(mapStateToProps, mapDispatchToProps, null)(signUpForm2);




























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
                    source={require('../../../assets/images/background.png')}
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
