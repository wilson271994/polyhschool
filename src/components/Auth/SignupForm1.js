import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../assets/styles/index.js';
import { sigupstyle } from '../../assets/styles/signup.js';
import { switchSchoolSelectionAction, switchSignupForm2Action } from '../../navigations/rootNavigation.js';

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
            field: '',
            classe: '',
            admission_type: '',
            required_documents: [],
            type_user: '',
            selectedSchoolId: '',
            birthdayError: '',
            isFocusField: false,
            isFocusClasse: false,
            isFocusAdmission: false,
            focusedInput: null,
            classeList: [],
        };
    }

    componentDidMount() {
        this._loadSchoolAndData();
    }

    _getUniqueClasses = (classesArray = []) => {
        const seen = new Set();
        return classesArray.filter((cls) => {
            if (!cls || !cls.id || seen.has(cls.id)) return false;
            seen.add(cls.id);
            return true;
        });
    };

    _loadSchoolAndData = async () => {
        try {
            const chooseData = await AsyncStorage.getItem('DataChoose');
            const schoolData = await AsyncStorage.getItem('SelectedSchoolId');
            const { selectedSchool } = this.props;

            let type_user = null;
            let schoolId = null;

            if (chooseData) {
                const parsed = JSON.parse(chooseData);
                type_user = parsed.type_user;
            }

            if (schoolData) {
                const parsed = JSON.parse(schoolData);
                schoolId = parsed.school;
            }

            this.setState({ type_user, selectedSchoolId: schoolId });

            const form1data = await AsyncStorage.getItem('DataForm1');
            if (form1data) {
                const data = JSON.parse(form1data);

                let restoredClasseList = [];
                if (data.field && selectedSchool?.fields) {
                    const selectedFieldObj = selectedSchool.fields.find(
                        (item) => (item?.field?.id || item?.id) === data.field
                    );
                    if (selectedFieldObj) {
                        const rawClasses = selectedFieldObj.classes || selectedFieldObj.field?.classes || [];
                        restoredClasseList = this._getUniqueClasses(rawClasses);
                    }
                }

                this.setState({
                    username: data.username || '',
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    birthday_date: data.birthday_date || '',
                    phone: data.phone || '',
                    field: data.field || '',
                    classe: data.classe || '',
                    admission_type: data.admission_type || '',
                    required_documents: data.required_documents || [],
                    classeList: restoredClasseList,
                });
            }
        } catch (e) {
            console.error('Erreur restauration Form1:', e);
        }
    };

    _formatPhone = (text) => {
        let cleaned = text.replace(/\D/g, '').substring(0, 9);
        let formatted = cleaned;
        if (cleaned.length > 1) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1);
        if (cleaned.length > 3) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3);
        if (cleaned.length > 5) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5);
        if (cleaned.length > 7) formatted = cleaned.slice(0, 1) + ' ' + cleaned.slice(1, 3) + ' ' + cleaned.slice(3, 5) + ' ' + cleaned.slice(5, 7) + ' ' + cleaned.slice(7);
        return formatted;
    };

    _handlePhoneChange = (text) => this.setState({ phone: this._formatPhone(text) });

    _formatBirthday = (text) => {
        let cleaned = text.replace(/\D/g, '').substring(0, 8);
        let formatted = cleaned;
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
        this.setState({
            birthday_date: formatted,
            birthdayError: formatted.length === 10 && !this._validateBirthday(formatted) ? 'Date invalide' : '',
        });
    };

    _navigateToChoose = () => switchSchoolSelectionAction(true);

    _handleFieldChange = (item) => {
        const rawClasses = item.classes || [];
        this.setState({
            field: item.id,
            classeList: this._getUniqueClasses(rawClasses),
            classe: '',
        });
    };

    _handleClasseChange = (item) => {
        this.setState({ classe: item.id });
    };

    _handleAdmissionTypeChange = async (item) => {
        const documents = item.documentlist || [];
        this.setState({
            admission_type: item.id,
            required_documents: documents,
        });

        try {
            await AsyncStorage.setItem('RequiredDocuments', JSON.stringify(documents));
        } catch (e) {
            console.error('Erreur stockage des documents:', e);
        }
    };

    _navigateToForm2 = async () => {
        const { username, first_name, last_name, email, phone, birthday_date, field, classe, admission_type, required_documents, type_user } = this.state;
        const isStudent = type_user === 'school_student';

        if (!username || !first_name || !last_name || !email || !birthday_date || !phone) {
            Toast.show({
                type: 'error',
                props: { text: 'Erreur', message: 'Veuillez remplir tous les champs obligatoires.' },
            });
            return;
        }

        if (isStudent && (!field || !classe || !admission_type)) {
            Toast.show({
                type: 'error',
                props: { text: 'Erreur', message: 'Veuillez sélectionner le type d\'admission, la filière et la classe.' },
            });
            return;
        }

        if (!isStudent) {
            await AsyncStorage.setItem('RequiredDocuments', JSON.stringify([]));
        }

        const data = JSON.stringify({
            username,
            first_name,
            last_name,
            email,
            phone,
            birthday_date,
            admission_type: isStudent ? admission_type : '',
            field: isStudent ? field : '',
            classe: isStudent ? classe : '',
            required_documents: isStudent ? required_documents : [],
        });
        await AsyncStorage.removeItem('DataForm1');
        await AsyncStorage.setItem('DataForm1', data);
        switchSignupForm2Action(true);
    };

    render() {
        const {
            first_name, last_name, username, email, phone, birthday_date,
            birthdayError, field, classe, admission_type, type_user, required_documents,
            isFocusField, isFocusClasse, isFocusAdmission, classeList, focusedInput
        } = this.state;

        const { selectedSchool, is_loading } = this.props;
        const isStudent = type_user === 'school_student';
        const hasDocuments = required_documents && required_documents.length > 0;

        const stepLabel = (isStudent && hasDocuments) ? 'Continuer (1/3)' : 'Continuer (1/2)';
        const headerTitle = (isStudent && hasDocuments) ? 'Inscription (Étape 1/3)' : 'Inscription (Étape 1/2)';

        const admissionTypesList = (selectedSchool?.adm_documents || []).map((doc) => ({
            id: doc.id,
            name: doc.name,
            description: doc.description,
            documentlist: doc.documentlist || [],
        }));

        const fieldList = (selectedSchool?.fields || []).map((item) => ({
            id: item?.field?.id || item?.id,
            name: item?.field?.name || item?.name,
            classes: item?.classes || item?.field?.classes || [],
        }));

        return (
            <View style={sigupstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                <View style={sigupstyle.topGlow} />
                <View style={sigupstyle.bottomGlow} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={sigupstyle.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={sigupstyle.headerRow}>
                        <TouchableOpacity style={sigupstyle.backButton} onPress={this._navigateToChoose} activeOpacity={0.7}>
                            <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={sigupstyle.logoContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={sigupstyle.logo} resizeMode="contain" />
                        <Text style={[styles.textBold, sigupstyle.brandBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, sigupstyle.title]}>{headerTitle}</Text>
                        <Text style={[styles.text, sigupstyle.slogan]}>
                            L'intelligence qui transforme l'école pour bâtir la nation.
                        </Text>
                    </View>

                    <View style={sigupstyle.inputContainer}>
                        <View style={sigupstyle.rowFields}>
                            <View style={sigupstyle.colField}>
                                <Text style={[styles.text, sigupstyle.label]}>Prénom *</Text>
                                <View style={[sigupstyle.inputWrapper, focusedInput === 'first_name' && sigupstyle.inputWrapperFocused]}>
                                    <TextInput
                                        style={[styles.textBold, sigupstyle.input]}
                                        placeholder="Prénom"
                                        placeholderTextColor="#64748B"
                                        value={first_name}
                                        onChangeText={(t) => this.setState({ first_name: t })}
                                        onFocus={() => this.setState({ focusedInput: 'first_name' })}
                                        onBlur={() => this.setState({ focusedInput: null })}
                                        autoCapitalize="words"
                                    />
                                </View>
                            </View>

                            <View style={sigupstyle.colField}>
                                <Text style={[styles.text, sigupstyle.label]}>Nom *</Text>
                                <View style={[sigupstyle.inputWrapper, focusedInput === 'last_name' && sigupstyle.inputWrapperFocused]}>
                                    <TextInput
                                        style={[styles.textBold, sigupstyle.input]}
                                        placeholder="Nom"
                                        placeholderTextColor="#64748B"
                                        value={last_name}
                                        onChangeText={(t) => this.setState({ last_name: t })}
                                        onFocus={() => this.setState({ focusedInput: 'last_name' })}
                                        onBlur={() => this.setState({ focusedInput: null })}
                                        autoCapitalize="words"
                                    />
                                </View>
                            </View>
                        </View>

                        <Text style={[styles.text, sigupstyle.label]}>Nom d'utilisateur *</Text>
                        <View style={[sigupstyle.inputWrapper, focusedInput === 'username' && sigupstyle.inputWrapperFocused]}>
                            <Icon name="at" size={20} color={focusedInput === 'username' ? '#f6a100' : '#64748B'} style={sigupstyle.inputIcon} />
                            <TextInput
                                style={[styles.textBold, sigupstyle.input]}
                                placeholder="Nom d'utilisateur"
                                placeholderTextColor="#64748B"
                                value={username}
                                onChangeText={(t) => this.setState({ username: t })}
                                onFocus={() => this.setState({ focusedInput: 'username' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                autoCapitalize="none"
                            />
                        </View>

                        <Text style={[styles.text, sigupstyle.label]}>Email *</Text>
                        <View style={[sigupstyle.inputWrapper, focusedInput === 'email' && sigupstyle.inputWrapperFocused]}>
                            <Icon name="email-outline" size={20} color={focusedInput === 'email' ? '#f6a100' : '#64748B'} style={sigupstyle.inputIcon} />
                            <TextInput
                                style={[styles.textBold, sigupstyle.input]}
                                placeholder="exemple@email.com"
                                placeholderTextColor="#64748B"
                                value={email}
                                onChangeText={(t) => this.setState({ email: t })}
                                onFocus={() => this.setState({ focusedInput: 'email' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={sigupstyle.rowFields}>
                            <View style={sigupstyle.colField}>
                                <Text style={[styles.text, sigupstyle.label]}>Naissance *</Text>
                                <View style={[sigupstyle.inputWrapper, focusedInput === 'birthday_date' && sigupstyle.inputWrapperFocused, birthdayError ? { borderColor: '#F87171' } : null]}>
                                    <TextInput
                                        style={[styles.textBold, sigupstyle.input]}
                                        placeholder="AAAA-MM-JJ"
                                        placeholderTextColor="#64748B"
                                        value={birthday_date}
                                        onChangeText={this._handleBirthdayChange}
                                        onFocus={() => this.setState({ focusedInput: 'birthday_date' })}
                                        onBlur={() => this.setState({ focusedInput: null })}
                                        keyboardType="numeric"
                                        maxLength={10}
                                    />
                                </View>
                            </View>

                            <View style={sigupstyle.colField}>
                                <Text style={[styles.text, sigupstyle.label]}>Téléphone *</Text>
                                <View style={[sigupstyle.inputWrapper, focusedInput === 'phone' && sigupstyle.inputWrapperFocused]}>
                                    <TextInput
                                        style={[styles.textBold, sigupstyle.input]}
                                        placeholder="6 XX XX XX"
                                        placeholderTextColor="#64748B"
                                        value={phone}
                                        onChangeText={this._handlePhoneChange}
                                        onFocus={() => this.setState({ focusedInput: 'phone' })}
                                        onBlur={() => this.setState({ focusedInput: null })}
                                        keyboardType="phone-pad"
                                        maxLength={14}
                                    />
                                </View>
                            </View>
                        </View>

                        {birthdayError ? (
                            <View style={sigupstyle.errorBanner}>
                                <Icon name="alert-circle" size={14} color="#F87171" />
                                <Text style={[styles.textBold, sigupstyle.errorText]}>{birthdayError}</Text>
                            </View>
                        ) : null}

                        {isStudent && (
                            <>
                                <Text style={[styles.text, sigupstyle.label]}>Type d'admission *</Text>
                                <Dropdown
                                    style={[sigupstyle.dropdown, isFocusAdmission && sigupstyle.dropdownFocused]}
                                    placeholderStyle={sigupstyle.placeholderStyle}
                                    selectedTextStyle={sigupstyle.selectedTextStyle}
                                    inputSearchStyle={sigupstyle.inputSearchStyle}
                                    containerStyle={sigupstyle.dropdownContainer}
                                    itemTextStyle={sigupstyle.itemTextStyle}
                                    data={admissionTypesList}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={admissionTypesList.length === 0 ? '⚠ Aucun type' : 'Sélectionner le type d\'admission'}
                                    value={admission_type}
                                    onFocus={() => this.setState({ isFocusAdmission: true })}
                                    onBlur={() => this.setState({ isFocusAdmission: false })}
                                    onChange={this._handleAdmissionTypeChange}
                                    disable={is_loading || admissionTypesList.length === 0}
                                    renderLeftIcon={() => (
                                        <Icon name="card-account-details-outline" size={18} color="#f6a100" style={{ marginRight: 8 }} />
                                    )}
                                />

                                <Text style={[styles.text, sigupstyle.label]}>Filière *</Text>
                                <Dropdown
                                    style={[sigupstyle.dropdown, isFocusField && sigupstyle.dropdownFocused]}
                                    placeholderStyle={sigupstyle.placeholderStyle}
                                    selectedTextStyle={sigupstyle.selectedTextStyle}
                                    inputSearchStyle={sigupstyle.inputSearchStyle}
                                    containerStyle={sigupstyle.dropdownContainer}
                                    itemTextStyle={sigupstyle.itemTextStyle}
                                    data={fieldList}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={fieldList.length === 0 ? '⚠ Aucune filière' : 'Choisir votre filière'}
                                    value={field}
                                    search
                                    searchPlaceholder="Rechercher..."
                                    onFocus={() => this.setState({ isFocusField: true })}
                                    onBlur={() => this.setState({ isFocusField: false })}
                                    onChange={this._handleFieldChange}
                                    disable={is_loading || fieldList.length === 0}
                                    renderLeftIcon={() => (
                                        <Icon name="school-outline" size={18} color="#f6a100" style={{ marginRight: 8 }} />
                                    )}
                                />

                                <Text style={[styles.text, sigupstyle.label]}>Classe *</Text>
                                <Dropdown
                                    style={[sigupstyle.dropdown, isFocusClasse && sigupstyle.dropdownFocused]}
                                    placeholderStyle={sigupstyle.placeholderStyle}
                                    selectedTextStyle={sigupstyle.selectedTextStyle}
                                    inputSearchStyle={sigupstyle.inputSearchStyle}
                                    containerStyle={sigupstyle.dropdownContainer}
                                    itemTextStyle={sigupstyle.itemTextStyle}
                                    data={classeList}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={classeList.length === 0 ? '⚠ Aucune classe' : 'Sélectionner une classe'}
                                    value={classe}
                                    search
                                    searchPlaceholder="Rechercher..."
                                    onFocus={() => this.setState({ isFocusClasse: true })}
                                    onBlur={() => this.setState({ isFocusClasse: false })}
                                    onChange={this._handleClasseChange}
                                    disable={is_loading || classeList.length === 0}
                                    renderLeftIcon={() => (
                                        <Icon name="google-classroom" size={18} color="#f6a100" style={{ marginRight: 8 }} />
                                    )}
                                />
                            </>
                        )}

                        <TouchableOpacity onPress={this._navigateToForm2} style={sigupstyle.button} activeOpacity={0.85} disabled={is_loading}>
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#011638" />
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.textBold, sigupstyle.buttonText]}>{stepLabel}</Text>
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
    ...bindActionCreators({ switchSchoolSelectionAction, switchSignupForm2Action }, dispatch),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    selectedSchool: state.auth.selectedSchool,
});

export default connect(mapStateToProps, mapDispatchToProps)(signupForm1);