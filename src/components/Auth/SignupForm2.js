import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Linking,
    StatusBar
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../assets/styles/index.js';
import { sigupstyle } from '../../assets/styles/signup.js';
import { switchSignupForm1Action, switchSignupForm3Action } from '../../navigations/rootNavigation.js';
import { SignupAction } from '../../reducers/actions/index.js';

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
            passwordVisible: false,
            password1: '',
            password2: '',
            sexe: null,
            country: '',
            nationality: '',
            address: '',
            city: '',
            cities: [],
            type_user: '',
            field: '',
            classe: '',
            admission_type: '',
            hasDocuments: false,
            focusedInput: null,
            confidCountryFocus: false,
            confidNationalityFocus: false,
            confidCityFocus: false,
            confidGenderFocus: false,
        };
    }

    componentDidMount() {
        this._PersistForm2(); 
    }

    componentDidUpdate(prevProps) {
        // Re-charger les villes si les infos du site se chargent après le mount initial
        if (!prevProps.site_infos?.countries && this.props.site_infos?.countries && this.state.country) {
            const selectedCountry = this.props.site_infos.countries.find((c) => c.id === this.state.country);
            if (selectedCountry) {
                this.setState({ cities: selectedCountry.cities || [] });
            }
        }
    }

    // Restore stored user details and city list from AsyncStorage
    _PersistForm2 = async () => {
        try {
            const form2data = await AsyncStorage.getItem('Dataform2');
            const form1data = await AsyncStorage.getItem('DataForm1');
            const chooseData = await AsyncStorage.getItem('DataChoose');
            const reqDocs = await AsyncStorage.getItem('RequiredDocuments');
            const { site_infos } = this.props;

            var type_user = null;
            if (chooseData) {
                const parsed = JSON.parse(chooseData);
                type_user = parsed.type_user;
            }

            var hasDocuments = false;
            if (reqDocs) {
                const parsedDocs = JSON.parse(reqDocs);
                hasDocuments = Array.isArray(parsedDocs) && parsedDocs.length > 0;
            }

            if (form1data) {
                const data = JSON.parse(form1data);
                this.setState({
                    field: data.field || '',
                    classe: data.classe || '',
                    admission_type: data.admission_type || '',
                });
            }

            if (form2data) {
                const persistdata = JSON.parse(form2data);

                // Reconstitution de la liste des villes si un pays avait déjà été choisi
                let restoredCities = [];
                if (persistdata.country && site_infos?.countries?.length) {
                    const matchedCountry = site_infos.countries.find((c) => c.id === persistdata.country);
                    if (matchedCountry) {
                        restoredCities = matchedCountry.cities || [];
                    }
                }

                this.setState({
                    sexe: persistdata.sexe || null,
                    country: persistdata.country || null,
                    nationality: persistdata.nationality || null,
                    city: persistdata.city || null,
                    cities: restoredCities,
                    address: persistdata.address || '',
                    password1: persistdata.password1 || '',
                    password2: persistdata.password2 || '',
                    acceptCondition: persistdata.acceptCondition || false,
                    type_user: persistdata.type_user || type_user || '',
                    hasDocuments,
                });
            } else {
                this.setState({ type_user, hasDocuments });
            }
        } catch (e) {
            console.error('Error loading step 2 stored data:', e);
        }
    };

    // Toggle terms acceptance checkbox state
    _onChangeAcceptCondition = () => {
        this.setState((prevState) => ({
            acceptCondition: !prevState.acceptCondition,
        }));
    };

    // Toggle password visibility state
    _togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };

    // Open external terms & policies URL
    _redirectPolicy = (url) => {
        if (url) Linking.openURL(url);
    };

    // Navigate back to Step 1 form
    _navigateToForm1 = () => {
        switchSignupForm1Action(true);
    };

    _passwordValidation = () => this.state.password1 === this.state.password2 && this.state.password1 !== '';
    _acceptConditionValidation = () => this.state.acceptCondition;

    // Dispatch final registration request
    _authSignup = async () => {
        const { country, city, password1, password2, sexe, acceptCondition, address, field, classe, admission_type, type_user } = this.state;

        if (!country || !city || !password1 || !password2 || !sexe || !address || !this._passwordValidation() || !this._acceptConditionValidation()) {
            if (!country) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre pays.' } });
            if (!city) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre ville.' } });
            if (!sexe) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre sexe.' } });
            if (!address) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre adresse.' } });
            if (!this._passwordValidation()) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Les mots de passe ne correspondent pas.' } });
            if (!this._acceptConditionValidation()) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez accepter les conditions.' } });
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
            console.error('Error retrieving schoolId:', e);
        }

        const form1data = await AsyncStorage.getItem('DataForm1');
        let username = '';
        let first_name = '';
        let last_name = '';
        let email = '';
        let birthday_date = '';
        let phone = '';

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
        formdata.append('sexe', sexe?.label || sexe);
        formdata.append('country', country);
        formdata.append('city', city?.id || city || '');
        formdata.append('address', address);
        formdata.append('password1', password1);
        formdata.append('password2', password2);
        formdata.append('acceptCondition', acceptCondition);
        formdata.append('school', school);

        const isStudent = type_user === 'school_student';
        if (isStudent) {
            formdata.append('field', field || '');
            formdata.append('classe', classe || '');
            formdata.append('admission_type', admission_type || '');
        }

        SignupAction(formdata);
    };

    // Cache step 2 form data locally
    _saveForm2Data = async () => {
        const { country, nationality, city, password1, password2, sexe, acceptCondition, address, field, classe, admission_type, type_user } = this.state;

        if (!country || !city || !nationality || !password1 || !password2 || !sexe || !address || !this._passwordValidation() || !this._acceptConditionValidation()) {
            if (!sexe) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre sexe.' } });
            if (!nationality) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre pays d\'origine.' } });
            if (!country) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre pays de résidence.' } });
            if (!city) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre ville.' } });
            if (!address) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez renseigner votre quartier/adresse.' } });
            if (!this._passwordValidation()) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Les mots de passe ne correspondent pas.' } });
            if (!this._acceptConditionValidation()) Toast.show({ type: 'error', props: { title: 'Erreur', description: 'Veuillez accepter les conditions.' } });
            return false;
        }

        const form2DataToSave = {
            sexe,
            country,
            nationality,
            city: city?.id || city || '', // Sauvegarde de l'ID ou de la valeur sélectionnée
            address,
            password1,
            password2,
            acceptCondition,
            field: field || '',
            classe: classe || '',
            admission_type: admission_type || '',
            type_user,
        };

        await AsyncStorage.removeItem('Dataform2');
        await AsyncStorage.setItem('Dataform2', JSON.stringify(form2DataToSave));
        return true;
    };

    _continueToForm3 = async () => {
        const isValid = await this._saveForm2Data();
        if (isValid) {
            switchSignupForm3Action(true);
        }
    };

    _toggleCountry = (item) => {
        if (!item || !item.id) return;
        this.setState({
            country: item.id,
            cities: item.cities || [],
            city: '', // Réinitialise la ville au changement de pays
        });
    };

    _toggleNationality = (item) => {
        if (!item || !item.id) return;
        this.setState({
            nationality: item.id,
        });
    };

    _toggleCity = (item) => {
        if (!item) return;
        this.setState({
            city: item.id || item,
        });
    };

    render() {
        const { is_loading, site_infos } = this.props;
        const {
            country, nationality, city, password1, password2, passwordVisible, cities, address,
            acceptCondition, confidCountryFocus, confidNationalityFocus, confidCityFocus,
            confidGenderFocus, sexe, type_user, hasDocuments, focusedInput
        } = this.state;

        const countriesUnavailable = !site_infos?.countries?.length;

        const isStudent = type_user === 'school_student';
        const needsForm3 = isStudent && hasDocuments;

        const pageTitle = needsForm3 ? 'Inscription (Étape 2/3)' : 'Inscription (Étape 2/2)';
        const buttonLabel = needsForm3 ? 'Continuer (2/3)' : 'Soumettre (2/2)';

        return (
            <View style={sigupstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Ambient Glowing Orbs */}
                <View style={sigupstyle.topGlow} />
                <View style={sigupstyle.bottomGlow} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={sigupstyle.scrollContent}
                >
                    {/* Header Bar */}
                    <View style={sigupstyle.headerRow}>
                        <TouchableOpacity
                            style={sigupstyle.backButton}
                            onPress={this._navigateToForm1}
                            activeOpacity={0.7}
                        >
                            <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Logo & Compact Header Section */}
                    <View style={sigupstyle.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={sigupstyle.logo}
                            resizeMode="contain"
                        />
                        <Text style={[styles.textBold, sigupstyle.brandBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, sigupstyle.title]}>{pageTitle}</Text>
                        <Text style={[styles.text, sigupstyle.slogan]}>
                            L'intelligence qui transforme l'école pour bâtir la nation.
                        </Text>
                    </View>

                    {/* Glass Form Container */}
                    <View style={sigupstyle.inputContainer}>

                        {/* Sexe Dropdown */}
                        <Text style={[styles.text, sigupstyle.label]}>Sexe *</Text>
                        <Dropdown
                            style={[sigupstyle.dropdown, confidGenderFocus && sigupstyle.dropdownFocused]}
                            placeholderStyle={sigupstyle.placeholderStyle}
                            selectedTextStyle={sigupstyle.selectedTextStyle}
                            inputSearchStyle={sigupstyle.inputSearchStyle}
                            containerStyle={sigupstyle.dropdownContainer}
                            itemTextStyle={sigupstyle.itemTextStyle}
                            data={datagender}
                            labelField="label"
                            valueField="value"
                            placeholder="Choisir votre sexe..."
                            value={sexe}
                            onFocus={() => this.setState({ confidGenderFocus: true })}
                            onBlur={() => this.setState({ confidGenderFocus: false })}
                            onChange={(item) => this.setState({ sexe: item })}
                            renderLeftIcon={() => (
                                <Foundation name="male-female" size={18} color="#f6a100" style={{ marginRight: 8 }} />
                            )}
                        />

                        {/* Country of Origin / Nationality Dropdown */}
                        <Text style={[styles.text, sigupstyle.label]}>Pays d'origine *</Text>
                        <Dropdown
                            style={[sigupstyle.dropdown, confidNationalityFocus && sigupstyle.dropdownFocused]}
                            placeholderStyle={sigupstyle.placeholderStyle}
                            selectedTextStyle={sigupstyle.selectedTextStyle}
                            inputSearchStyle={sigupstyle.inputSearchStyle}
                            containerStyle={sigupstyle.dropdownContainer}
                            itemTextStyle={sigupstyle.itemTextStyle}
                            data={countriesUnavailable ? [] : site_infos.countries}
                            labelField="name"
                            valueField="id"
                            placeholder={countriesUnavailable ? '⚠ Connexion instable...' : 'Choisir votre pays d\'origine'}
                            value={nationality}
                            search
                            searchPlaceholder="Rechercher..."
                            onFocus={() => this.setState({ confidNationalityFocus: true })}
                            onBlur={() => this.setState({ confidNationalityFocus: false })}
                            onChange={(item) => this._toggleNationality(item)}
                            renderLeftIcon={() => (
                                <Foundation name="flag" size={18} color="#f6a100" style={{ marginRight: 8 }} />
                            )}
                            disable={countriesUnavailable}
                        />

                        {/* Residence Country & City Row */}
                        <View style={sigupstyle.rowFields}>
                            <View style={sigupstyle.colField}>
                                <Text style={[styles.text, sigupstyle.label]}>Résidence *</Text>
                                <Dropdown
                                    style={[sigupstyle.dropdown, confidCountryFocus && sigupstyle.dropdownFocused]}
                                    placeholderStyle={sigupstyle.placeholderStyle}
                                    selectedTextStyle={sigupstyle.selectedTextStyle}
                                    inputSearchStyle={sigupstyle.inputSearchStyle}
                                    containerStyle={sigupstyle.dropdownContainer}
                                    itemTextStyle={sigupstyle.itemTextStyle}
                                    data={countriesUnavailable ? [] : site_infos.countries}
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Pays"
                                    value={country}
                                    search
                                    searchPlaceholder="Rechercher..."
                                    onFocus={() => this.setState({ confidCountryFocus: true })}
                                    onBlur={() => this.setState({ confidCountryFocus: false })}
                                    onChange={(item) => this._toggleCountry(item)}
                                    disable={countriesUnavailable}
                                />
                            </View>

                            <View style={sigupstyle.colField}>
                                <Text style={[styles.text, sigupstyle.label]}>Ville *</Text>
                                <Dropdown
                                    style={[sigupstyle.dropdown, confidCityFocus && sigupstyle.dropdownFocused]}
                                    placeholderStyle={sigupstyle.placeholderStyle}
                                    selectedTextStyle={sigupstyle.selectedTextStyle}
                                    inputSearchStyle={sigupstyle.inputSearchStyle}
                                    containerStyle={sigupstyle.dropdownContainer}
                                    itemTextStyle={sigupstyle.itemTextStyle}
                                    data={cities}
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Ville"
                                    value={city}
                                    search
                                    searchPlaceholder="Rechercher..."
                                    onFocus={() => this.setState({ confidCityFocus: true })}
                                    onBlur={() => this.setState({ confidCityFocus: false })}
                                    onChange={(item) => this._toggleCity(item)}
                                    disable={cities.length === 0}
                                />
                            </View>
                        </View>

                        {/* Address / Neighborhood Input */}
                        <Text style={[styles.text, sigupstyle.label]}>Quartier / Adresse *</Text>
                        <View style={[sigupstyle.inputWrapper, focusedInput === 'address' && sigupstyle.inputWrapperFocused]}>
                            <Icon name="map-marker-outline" size={18} color={focusedInput === 'address' ? '#f6a100' : '#64748B'} style={sigupstyle.inputIcon} />
                            <TextInput
                                style={[styles.textBold, sigupstyle.input]}
                                placeholder="Ex: Akwa, Rue Deido..."
                                placeholderTextColor="#64748B"
                                value={address}
                                onChangeText={(text) => this.setState({ address: text })}
                                onFocus={() => this.setState({ focusedInput: 'address' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Password Input */}
                        <Text style={[styles.text, sigupstyle.label]}>Mot de passe *</Text>
                        <View style={[sigupstyle.inputWrapper, focusedInput === 'password1' && sigupstyle.inputWrapperFocused]}>
                            <Icon name="lock-outline" size={18} color={focusedInput === 'password1' ? '#f6a100' : '#64748B'} style={sigupstyle.inputIcon} />
                            <TextInput
                                style={[styles.textBold, sigupstyle.input]}
                                placeholder="Créer un mot de passe"
                                placeholderTextColor="#64748B"
                                value={password1}
                                onChangeText={(text) => this.setState({ password1: text })}
                                onFocus={() => this.setState({ focusedInput: 'password1' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                secureTextEntry={!passwordVisible}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={this._togglePasswordVisibility} style={{ padding: 4 }}>
                                <Entypo name={passwordVisible ? 'eye-with-line' : 'eye'} size={18} color={passwordVisible ? '#f6a100' : '#64748B'} />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <Text style={[styles.text, sigupstyle.label]}>Confirmer le mot de passe *</Text>
                        <View style={[sigupstyle.inputWrapper, focusedInput === 'password2' && sigupstyle.inputWrapperFocused]}>
                            <Icon name="lock-check-outline" size={18} color={focusedInput === 'password2' ? '#f6a100' : '#64748B'} style={sigupstyle.inputIcon} />
                            <TextInput
                                style={[styles.textBold, sigupstyle.input]}
                                placeholder="Confirmer le mot de passe"
                                placeholderTextColor="#64748B"
                                value={password2}
                                onChangeText={(text) => this.setState({ password2: text })}
                                onFocus={() => this.setState({ focusedInput: 'password2' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                secureTextEntry={!passwordVisible}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Checkbox Section for Terms & Conditions */}
                        <View style={sigupstyle.checkboxContainer}>
                            <TouchableOpacity
                                style={[sigupstyle.checkbtn, acceptCondition && sigupstyle.checkbtnSelected]}
                                onPress={this._onChangeAcceptCondition}
                                activeOpacity={0.8}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                {acceptCondition && <FontAwesome name="check" size={12} color="#011638" />}
                            </TouchableOpacity>

                            <Text style={[styles.text, sigupstyle.conditiontext]}>
                                En créant votre compte, vous acceptez les{' '}
                                <Text
                                    style={[styles.textBold, sigupstyle.conditionlink]}
                                    onPress={() => this._redirectPolicy('https://poly-h.com/terms')}
                                >
                                    conditions d'utilisation
                                </Text>{' '}
                                et de{' '}
                                <Text
                                    style={[styles.textBold, sigupstyle.conditionlink]}
                                    onPress={() => this._redirectPolicy('https://poly-h.com/privacy')}
                                >
                                    confidentialité
                                </Text>.
                            </Text>
                        </View>

                        {/* Submit / Continue Button */}
                        <TouchableOpacity
                            onPress={needsForm3 ? this._continueToForm3 : this._authSignup}
                            style={sigupstyle.button}
                            disabled={is_loading}
                            activeOpacity={0.85}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#011638" />
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.textBold, sigupstyle.buttonText]}>
                                        {buttonLabel}
                                    </Text>
                                    <Entypo name="arrow-right" size={18} color="#011638" style={{ marginLeft: 8 }} />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchSignupForm1Action,
            switchSignupForm3Action,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    site_infos: state.auth.site_infos,
    selectedSchool: state.auth.selectedSchool,
});

export default connect(mapStateToProps, mapDispatchToProps)(signUpForm2);