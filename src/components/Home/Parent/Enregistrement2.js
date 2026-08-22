import React, { Component } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Linking, ImageBackground, Platform } from 'react-native';
import { styles } from '../../../assets/styles';
import 'moment/locale/fr';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { switchParentAdmissionTypeAction, switchRegister1Action } from '../../../navigations/rootNavigation.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addChildAction } from '../../../reducers/actions/index.js';
import { registerstyle } from '../../../assets/styles/enregistrement.js';


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
            confidCountryFocus: false,
            confidCityFocus: false,
            confidGenderFocus: false,
            confidNationalityFocus: false,
            password1: '',
            sexe: '',
            country: '',
            nationality: '',
            address: '',
            city: '',
            account: '',
            is_alert: false,
            alert_title: '',
            alert_subtitle: '',
            cities: [],
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
                nationality: persistdata.nationality || null,
                city: persistdata.city || null,
                address: persistdata.address || '',
                acceptCondition: persistdata.acceptCondition || false,
            });
        }
    };

    _onChangeAcceptCondition = () => {
        this.setState({ acceptCondition: !this.state.acceptCondition });
    };

    _redirectPolicy = (url) => {
        Linking.openURL(url);
    };

    _navigateToForm1 = () => {
        switchRegister1Action(true);
    };


    _saveForm2Data = async () => {
        const { country, nationality, city, password1, password2, sexe, acceptCondition, address, speciality, classe } = this.state;

        if (!country || !city || !nationality || !password1 || !password2 || !sexe || !address || !this._passwordValidation() || !this._acceptConditionValidation()) {
            if (!country)
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Veuillez renseigner votre pays.'
                });
            if (!nationality)
                Toast.show({
                    type: 'erreur',
                    text1: 'erreur',
                    text2: 'Veuillez renseigner votre pays d\'origine.'
                });
            if (!city)
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Veuillez renseigner votre ville.'
                });
            if (!sexe)
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Veuillez renseigner votre sexe.'
                });
            if (!address)
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Veuillez renseigner votre adresse.'
                });
            if (!this._passwordValidation())
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Les mots de passe ne correspondent pas.'
                });
            if (!this._acceptConditionValidation())
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Veuillez accepter les conditions.'
                });
            return false;
        }

        const form2DataToSave = {
            sexe,
            country,
            nationality,
            city: city?.id || city || '',
            address,
            password1,
            password2,
            acceptCondition,
            speciality: speciality || '',
            classe: classe || '',
        };

        await AsyncStorage.setItem('Dataform2', JSON.stringify(form2DataToSave));
        return true;
    };

    _continueToUpload = async () => {
        const isValid = await this._saveForm2Data();
        if (isValid) {
            switchParentAdmissionTypeAction(true)
        }
    };




    _acceptConditionValidation = () => this.state.acceptCondition;

    // _authSignup = async () => {
    //     const { country, city, sexe, acceptCondition, address, speciality, classe, nationality } = this.state;
    //     const { user_token, gardiant_infos } = this.props;

    //     if (!country || !city || !nationality || !sexe || !address || !this._acceptConditionValidation()) {
    //         if (!country)
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Erreur',
    //                 text2: 'Veuillez renseigner votre pays.'
    //             });
    //         if (!nationality)
    //             Toast.show({
    //                 type: 'erreur',
    //                 text1: 'erreur',
    //                 text2: 'Veuillez renseigner votre pays d\'origine.'
    //             });
    //         if (!city)
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Erreur',
    //                 text2: 'Veuillez renseigner votre ville.'
    //             });
    //         if (!sexe)
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Erreur',
    //                 text2: 'Veuillez renseigner votre sexe.'
    //             });
    //         if (!address)
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Erreur',
    //                 text2: 'Veuillez renseigner votre adresse.'
    //             });
    //         if (!this._acceptConditionValidation())
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Erreur',
    //                 text2: 'Veuillez accepter les conditions.'
    //             });
    //         return;
    //     }

    //     var school = '';
    //     try {
    //         const selectedSchoolRaw = await AsyncStorage.getItem('SelectedSchoolId');
    //         if (selectedSchoolRaw) {
    //             const parsed = JSON.parse(selectedSchoolRaw);
    //             school = parsed.school !== undefined ? parsed.school : parsed;
    //         }
    //     } catch (e) {
    //         console.error('Erreur lors de la récupération du schoolId :', e);
    //     }

    //     const form1data = await AsyncStorage.getItem('DataForm1');
    //     var username = '';
    //     var first_name = '';
    //     var last_name = '';
    //     var email = '';
    //     var birthday_date = '';
    //     var phone = '';
    //     if (form1data !== null) {
    //         const unpackdata = JSON.parse(form1data);
    //         if (unpackdata.username !== '') username = unpackdata.username;
    //         if (unpackdata.first_name !== '') first_name = unpackdata.first_name;
    //         if (unpackdata.last_name !== '') last_name = unpackdata.last_name;
    //         if (unpackdata.email !== '') email = unpackdata.email;
    //         if (unpackdata.birthday_date !== '') birthday_date = unpackdata.birthday_date;
    //         if (unpackdata.phone !== '') phone = unpackdata.phone;
    //     }

    //     const formdata = new FormData();

    //     formdata.append('username', username);
    //     formdata.append('first_name', first_name);
    //     formdata.append('last_name', last_name);
    //     formdata.append('email', email);
    //     formdata.append('birthday_date', birthday_date);
    //     formdata.append('phone', phone);
    //     formdata.append('sexe', sexe.label);
    //     formdata.append('country', country);
    //     formdata.append('city', city?.id || city || '');
    //     formdata.append('address', address);
    //     formdata.append('acceptCondition', acceptCondition);
    //     formdata.append('school', school);
    //     formdata.append('speciality', speciality),
    //         formdata.append('classe', classe),
    //         formdata.append('token', user_token);

    //     console.log('FormData prêt pour envoi:', {
    //         _parts: formdata._parts.map(part => ({
    //             champ: part[0],
    //             valeur: part[1]
    //         }))
    //     });

    //     var gardiant_data = gardiant_infos

    //     addChildAction(formdata, gardiant_data);
    // };

    _toggleNationality = (item) => {
        if (!item || !item.id) return;
        this.setState({
            nationality: item.id,
        });
    }

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
            country, city, cities, address, nationality,
            acceptCondition, confidCountryFocus, confidCityFocus, confidNationalityFocus,
            confidGenderFocus, sexe
        } = this.state;

        const countriesUnavailable = !site_infos?.countries?.length;

        return (
            <View style={registerstyle.container}>
                <ImageBackground source={require('../../../assets/images/background.png')} style={styles.backgroundapp} resizeMode="cover">
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                        <View style={registerstyle.back}>
                            <TouchableOpacity onPress={this._navigateToForm1} activeOpacity={0.7}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={registerstyle.logoContainer}>
                            <Image source={require('../../../assets/images/logo.png')} style={registerstyle.logo} />
                            <Text style={[registerstyle.slogan, styles.textBold]}>Inscription d'un nouvel étudiant</Text>
                        </View>

                        <View style={registerstyle.inputContainer}>

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="human" size={18} color="#FFF" /> Sexe
                            </Text>
                            <Dropdown
                                style={[registerstyle.dropdown, confidGenderFocus]}
                                placeholderStyle={[registerstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[registerstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[registerstyle.itemTextStyle, styles.text]}
                                containerStyle={registerstyle.dropdownContainer}
                                itemContainerStyle={registerstyle.itemContainerStyle}
                                inputSearchStyle={registerstyle.searchText}
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
                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="flag" size={18} color="#FFF" />Pays d'origine
                            </Text>
                            <Dropdown
                                style={[registerstyle.dropdown, confidNationalityFocus]}
                                placeholderStyle={[registerstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[registerstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[registerstyle.itemTextStyle, styles.text]}
                                containerStyle={registerstyle.dropdownContainer}
                                itemContainerStyle={registerstyle.itemContainerStyle}
                                inputSearchStyle={registerstyle.searchText}
                                search={true}
                                dropdownPosition='auto'
                                data={countriesUnavailable ? [] : site_infos.countries}
                                labelField="name"
                                valueField="id"
                                placeholder={countriesUnavailable ? '⚠ Connexion instable...' : (!confidNationalityFocus ? 'Choisir votre Pays d\'origine' : '...')}
                                value={nationality}
                                onFocus={() => this.setState({ confidNationalityFocus: true })}
                                onBlur={() => this.setState({ confidNationalityFocus: false })}
                                onChange={item => this._toggleNationality(item)}
                                renderLeftIcon={() => (<Foundation name='flag' color="#FFF" />)}
                                disable={countriesUnavailable}
                                onPress={() => { }}
                            />

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="flag" size={18} color="#FFF" />Pays de résidence
                            </Text>
                            <Dropdown
                                style={[registerstyle.dropdown, confidCountryFocus]}
                                placeholderStyle={[registerstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[registerstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[registerstyle.itemTextStyle, styles.text]}
                                containerStyle={registerstyle.dropdownContainer}
                                itemContainerStyle={registerstyle.itemContainerStyle}
                                inputSearchStyle={registerstyle.searchText}
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

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="city" size={18} color="#FFF" /> Ville
                            </Text>
                            <Dropdown
                                style={[registerstyle.dropdown, confidCityFocus]}
                                placeholderStyle={[registerstyle.placeholderStyle, styles.text]}
                                selectedTextStyle={[registerstyle.selectedTextStyle, styles.text]}
                                itemTextStyle={[registerstyle.itemTextStyle, styles.text]}
                                containerStyle={registerstyle.dropdownContainer}
                                itemContainerStyle={registerstyle.itemContainerStyle}
                                inputSearchStyle={registerstyle.searchText}
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

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="map" size={18} color="#FFF" /> Quartier
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <TextInput
                                    style={[registerstyle.input, styles.textBold]}
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

                            <View style={registerstyle.checkboxContainer}>
                                <View style={registerstyle.containercondition}>
                                    <TouchableOpacity
                                        style={registerstyle.checkbtn}
                                        onPress={this._onChangeAcceptCondition}
                                        activeOpacity={0.7}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        {acceptCondition ? <FontAwesome name='check' style={registerstyle.checkicon} /> : <Text></Text>}
                                    </TouchableOpacity>
                                    <Text style={[styles.text, registerstyle.conditiontext]}>
                                        En créant votre compte, vous acceptez les
                                        <TouchableOpacity onPress={this._redirectPolicy.bind(this, 'https://japapmessenger.com/terms/terms')} activeOpacity={0.7}>
                                            <Text style={[styles.text, registerstyle.conditionlink]}> conditions </Text>
                                        </TouchableOpacity>
                                        d'utilisations et de
                                        <TouchableOpacity onPress={this._redirectPolicy.bind(this, 'https://japapmessenger.com/terms/privacy-policy')} activeOpacity={0.7}>
                                            <Text style={[styles.text, registerstyle.conditionlink]}> confidentialités </Text>
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={this._continueToUpload}
                            style={registerstyle.button}
                            disabled={is_loading}
                            activeOpacity={0.7}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={[styles.textBold, registerstyle.buttonText]}>Continuer</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={{ height: 30 }} />
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchRegister1Action,
        switchParentAdmissionTypeAction,
        addChildAction,
    }, dispatch),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    site_infos: state.auth.site_infos,

});

export default connect(mapStateToProps, mapDispatchToProps, null)(signUpForm2);




