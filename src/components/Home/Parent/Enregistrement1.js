import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as globalStyles, styles } from '../../../assets/styles';
import { switchRegister2Action, switchSchoolSelectionParentAction } from '../../../navigations/rootNavigation';

import { EventEmitter } from 'react-native';
import { registerstyle } from '../../../assets/styles/enregistrement';

class signupForm1 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            birthday_date: '',
            phone: '',
            speciality: '',
            classe: '',
            selectedSchoolId: '',
            birthdayError: '',
            isFocusSpeciality: false,
            isFocusClasse: false,
            classeList: []
        };
    }

    componentDidMount() {
        this._loadSchoolAndData();
    }

    _loadSchoolAndData = async () => {
        const schoolData = await AsyncStorage.getItem('SelectedSchoolId');

        var schoolId = null;

        if (schoolData) {
            const parsed = JSON.parse(schoolData);
            schoolId = parsed.school;
        }

        this.setState({ selectedSchoolId: schoolId });

        const form1data = await AsyncStorage.removeItem('DataForm1');
        if (form1data) {
            const data = JSON.parse(form1data);
            this.setState({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                birthday_date: data.birthday_date,
                phone: data.phone,
                speciality: data.speciality,
                classe: data.classe,
            });
        }
    };

    _formatPhone = (text) => {
        var cleaned = text.replace(/\D/g, '').substring(0, 9);
        var formatted = cleaned;
        if (cleaned.length > 1) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1);
        if (cleaned.length > 3) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3);
        if (cleaned.length > 5) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5);
        if (cleaned.length > 7) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5, 7) + ' ' + cleaned.slice(7);
        return formatted;
    };

    _handlePhoneChange = (text) => this.setState({ phone: this._formatPhone(text) });

    _formatBirthday = (text) => {
        var cleaned = text.replace(/\D/g, '').substring(0, 8);
        var formatted = cleaned;
        if (cleaned.length > 4) formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4);
        if (cleaned.length > 6) formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4, 6) + '-' + cleaned.slice(6);
        return formatted;
    };

    _validateBirthday = (dateStr) => {
        if (dateStr.length !== 10) return false;
        const [aaaa, mm, jj] = dateStr.split('-').map(Number);
        if (isNaN(aaaa) || isNaN(mm) || isNaN(jj)) return false;
        if (aaaa < 1900 || aaaa > 2026) return false;
        if (mm < 1 || mm > 12) return false;
        if (jj < 1 || jj > 31) return false;
        const date = new Date(aaaa, mm - 1, jj);
        return date.getFullYear() === aaaa && date.getMonth() === mm - 1 && date.getDate() === jj;
    };

    _handleBirthdayChange = (text) => {
        const formatted = this._formatBirthday(text);
        this.setState({ birthday_date: formatted });
        this.setState({ birthdayError: (formatted.length === 10 && !this._validateBirthday(formatted)) ? 'Date invalide' : '' });
    };

    _navigateToChoose = () => {
        switchSchoolSelectionParentAction(true)
    };

    _handleSpecialityChange = (item) => {
        this.setState({
            speciality: item.id,
            classeList: item.classes
        });
    };

    _handleClasseChange = (item) => {
        console.log(item.id)
        this.setState({ classe: item.id })
    }


    _navigateToForm2 = async () => {
        const { username, first_name, last_name, email, phone, birthday_date, speciality, classe } = this.state;

        if (!username || !first_name || !last_name || !email || !birthday_date || !speciality || !classe || !phone) {
            Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez remplir tous les champs obligatoires.' });
            return;
        }

        console.log(username, first_name, last_name, email, phone, birthday_date, speciality, classe );

        console.log('Entrée de la fonction2')

        const data = JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            birthday_date: birthday_date,
            speciality: speciality,
            classe: classe,
        });
        console.log(data)
        await AsyncStorage.setItem('DataForm1', data);
        switchRegister2Action(true);
    };

    render() {
        const {
            first_name, last_name, username, email, phone, birthday_date,
            birthdayError, speciality, classe,
            isFocusSpeciality, isFocusClasse, classeList
        } = this.state;

        const { selectedSchool, is_loading } = this.props;

        
        const specialitiesList = (selectedSchool?.specialities || []).map(item => ({
            id: item?.speciality?.id || item?.id,
            name: item?.speciality?.name || item?.name,
            classes: item?.classes || [],
        }));

        return (
            <View style={registerstyle.container}>
                <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.backgroundapp} resizeMode="cover">
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={registerstyle.back}>
                            <TouchableOpacity onPress={this._navigateToChoose}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={registerstyle.logoContainer}>
                            <Image source={require('../../../assets/images/logo.png')} style={registerstyle.logo} />
                            <Text style={[registerstyle.slogan, globalStyles.textBold]}>Inscription d'un nouvel étudiant</Text>
                        </View>

                        <View style={registerstyle.inputContainer}>

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="account-outline" size={18} color="#FFF" />
                                Prénom
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <Icon name="account-outline" size={22} color="rgba(255,255,255,0.7)" style={registerstyle.inputIcon} />
                                <TextInput style={[registerstyle.input, globalStyles.textBold]}
                                    placeholder="Prénom"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={first_name}
                                    onChangeText={t => this.setState({ first_name: t })}
                                    autoCapitalize="words"
                                />
                            </View>

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="account-outline" size={18} color="#FFF" />
                                Nom
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <Icon name="account-outline" size={22} color="rgba(255,255,255,0.7)" style={registerstyle.inputIcon} />
                                <TextInput style={[registerstyle.input, globalStyles.textBold]}
                                    placeholder="Nom"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={last_name}
                                    onChangeText={t => this.setState({ last_name: t })}
                                    autoCapitalize="words"
                                />
                            </View>

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="at" size={18} color="#FFF" />
                                Nom d'utilisateur
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <Icon name="at" size={22} color="rgba(255,255,255,0.7)" style={registerstyle.inputIcon} />
                                <TextInput style={[registerstyle.input, globalStyles.textBold]}
                                    placeholder="Nom d'utilisateur"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={username}
                                    onChangeText={t => this.setState({ username: t })}
                                    autoCapitalize="none"
                                />
                            </View>

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="email-outline" size={18} color="#FFF" />
                                Email
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <Icon name="email-outline" size={22} color="rgba(255,255,255,0.7)" style={registerstyle.inputIcon} />
                                <TextInput style={[registerstyle.input, globalStyles.textBold]}
                                    placeholder="Email"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={email}
                                    onChangeText={t => this.setState({ email: t })}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="calendar-outline" size={18} color="#FFF" />
                                Date de naissance
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <Icon name="calendar-outline" size={22} color="rgba(255,255,255,0.7)" style={registerstyle.inputIcon} />
                                <TextInput style={[registerstyle.input, globalStyles.textBold, birthdayError ? { borderColor: '#FF6B6B' } : null]}
                                    placeholder="AAAA-MM-JJ"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={birthday_date}
                                    onChangeText={this._handleBirthdayChange}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                                {
                                    birthdayError ? <View style={registerstyle.errorContainer}>
                                        <Icon name="alert-circle" size={16} color="#FF6B6B" />
                                        <Text style={registerstyle.errorText}>{birthdayError}</Text>
                                    </View>
                                        :
                                        null
                                }
                            </View>


                            <Text style={[registerstyle.label, styles.text]}>
                                <Icon name="phone-outline" size={18} color="#FFF" />
                                Téléphone
                            </Text>
                            <View style={registerstyle.inputWrapper}>
                                <Icon name="phone-outline" size={22} color="rgba(255,255,255,0.7)" style={registerstyle.inputIcon} />
                                <TextInput style={[registerstyle.input, globalStyles.textBold]}
                                    placeholder="X XX XX XX XX"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    value={phone}
                                    onChangeText={this._handlePhoneChange}
                                    keyboardType="phone-pad"
                                    maxLength={14}
                                />
                            </View>

                            <Text style={[registerstyle.label, styles.text]}>Filière</Text>
                            <Dropdown
                                style={registerstyle.dropdown}
                                placeholderStyle={registerstyle.placeholderStyle}
                                selectedTextStyle={registerstyle.selectedTextStyle}
                                inputSearchStyle={registerstyle.inputSearchStyle}
                                iconStyle={registerstyle.iconStyle}
                                containerStyle={registerstyle.dropdownContainer}
                                itemContainerStyle={registerstyle.itemContainerStyle}
                                itemTextStyle={registerstyle.itemTextStyle}
                                data={specialitiesList}
                                labelField="name"
                                valueField="id"
                                placeholder={specialitiesList.length === 0 ? '⚠ Aucune filière disponible' : 'Choisir votre filière'}

                                value={speciality}
                                search
                                searchPlaceholder="Rechercher une filière..."
                                onFocus={() => this.setState({ isFocusSpeciality: true })}
                                onBlur={() => this.setState({ isFocusSpeciality: false })}
                                onChange={this._handleSpecialityChange}
                                disable={is_loading ? true : false}
                            />

                            <Text style={[registerstyle.label, styles.text]}>Classe</Text>
                            <Dropdown
                                style={registerstyle.dropdown}
                                placeholderStyle={registerstyle.placeholderStyle}
                                selectedTextStyle={registerstyle.selectedTextStyle}
                                inputSearchStyle={registerstyle.inputSearchStyle}
                                iconStyle={registerstyle.iconStyle}
                                containerStyle={registerstyle.dropdownContainer}
                                itemContainerStyle={registerstyle.itemContainerStyle}
                                itemTextStyle={registerstyle.itemTextStyle}

                                data={classeList || []}
                                labelField="name"
                                valueField="id"
                                placeholder={classeList?.length === 0 ? '⚠ Aucune classe disponible' : 'Sélectionner une classe'}

                                value={classe}
                                search
                                searchPlaceholder="Rechercher une classe..."
                                onFocus={() => this.setState({ isFocusClasse: true })}
                                onBlur={() => this.setState({ isFocusClasse: false })}
                                onChange={this._handleClasseChange}
                                disable={is_loading ? true : false}
                            />
                        </View>

                        <TouchableOpacity onPress={this._navigateToForm2} style={registerstyle.button}>
                            <Text style={[registerstyle.buttonText, globalStyles.textBold]}>Continuer</Text>
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
        switchSchoolSelectionParentAction,
        switchRegister2Action
    }, dispatch)
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    selectedSchool: state.auth.selectedSchool,
});

export default connect(mapStateToProps, mapDispatchToProps)(signupForm1);