import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as globalStyles, styles } from '../../assets/styles';
import { sigupstyle } from '../../assets/styles/signup';
import { switchNewAdmissionTypePageAction, switchStudentChoolSelectedPageAction } from '../../navigations/rootNavigation';
import { EventEmitter } from 'react-native';
import { SchoolAppSubscription } from '../../reducers/actions';

class New_Student_Form extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            speciality: '',
            classe: '',
            type_user: '',
            selectedSchoolId: '',
            isFocusSpeciality: false,
            isFocusClasse: false,
            type_user: '',
            classeList: []
        };
    }

    componentDidMount() {
        //this._loadSchoolAndData();
    }

    //_loadSchoolAndData = async () => {
    //   const chooseData = await AsyncStorage.getItem('DataChoose');
    //    const schoolData = await AsyncStorage.getItem('SelectedSchoolId');

    //    var type_user = null;
    //    var schoolId = null;

    //    if (chooseData) {
    //        const parsed = JSON.parse(chooseData);
    //        type_user = parsed.type_user;
    //    }

    //    if (schoolData) {
    //        const parsed = JSON.parse(schoolData);
    //        schoolId = parsed.school;
    //    }

    //    this.setState({ type_user, selectedSchoolId: schoolId });

        // ✅ CORRECTION ICI
    //    const form1data = await AsyncStorage.getItem('DataForm1');
    //    if (form1data) {
    //        try {
    //            const data = JSON.parse(form1data);
    //            this.setState({
    //                speciality: data.speciality || '',
    //                classe: data.classe || '',
    //            });
    //        } catch (e) {
    //            console.error("Erreur parsing DataForm1", e);
    //        }
    //    }
    //};


    _navigateToChoose = () => switchStudentChoolSelectedPageAction(true);

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


    // _SubmitForm = async () => {
    //     const { speciality, classe, type_user } = this.state;
    //     const isStudent = type_user === 'school_student';

    //     if (isStudent && (!speciality || !classe)) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Erreur',
    //             text2: 'Veuillez sélectionner une filière et une classe.'
    //         });
    //         return;
    //     }

    //     var school = '';
    //     try {
    //         const selectedSchool = await AsyncStorage.getItem('SelectedSchoolId');
    //         if (selectedSchool) {
    //             const parsedSchool = JSON.parse(selectedSchool);
    //             school = parsedSchool.school !== undefined ? parsedSchool.school : parsedSchool;
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération du schoolId:', error);
    //     }

    //     const formDataToSave = { speciality, classe };
    //     await AsyncStorage.setItem('DataForm1', JSON.stringify(formDataToSave));

    //     const data = new FormData();
    //     data.append('speciality', speciality);
    //     data.append('classe', classe);
    //     data.append('type_user', type_user);
    //     data.append('token', user_token);
    //     data.append('school', school);

    //     //await AsyncStorage.setItem('DataForm1', data);
    //     SchoolAppSubscription(data);
    //     switchNewAdmissionTypePageAction(true)
    // };



    _navigateToAdmission = async () => {
            const { speciality, classe, type_user } = this.state;
            const isStudent = type_user === 'school_student';
    
            if (isStudent && (!speciality || !classe)) {
                Toast.show({ type: 'error', text1: 'Erreur', text2: 'Veuillez sélectionner une filière et une classe.' });
                return;
            }
    
            const data = JSON.stringify({
                birthday_date,
                speciality: isStudent ? speciality : '',
                classe: isStudent ? classe : '',
            });
    
            await AsyncStorage.setItem('DataNewForm', data);
            switchNewAdmissionTypePageAction(true);
        };







    render() {
        const {
            speciality, classe, type_user,
            isFocusSpeciality, isFocusClasse, classeList
        } = this.state;

        const { selectedSchool, is_loading } = this.props;
        const isStudent = type_user === 'school_student';

        //Récupérer les spécialités et les classes de l'école sélectionnée
        const specialitiesList = (selectedSchool.specialities ? selectedSchool.specialities : []).map(item => ({
            id: item.speciality.id,
            name: item.speciality.name,
            classes: item.classes || [],
        }));

        return (
            <View style={sigupstyle.container}>
                <ImageBackground source={require('../../assets/images/background.png')} style={styles.backgroundapp} resizeMode="cover">
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={sigupstyle.back}>
                            <TouchableOpacity onPress={this._navigateToChoose}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={sigupstyle.logoContainer}>
                            <Image source={require('../../assets/images/logo.png')} style={sigupstyle.logo} />
                            <Text style={[sigupstyle.slogan, globalStyles.textBold]}>Beyond imagination</Text>
                        </View>

                        <View style={sigupstyle.inputContainer}>


                            {isStudent && (
                                <>
                                    <Text style={[sigupstyle.label, styles.text]}>Spécialité/série</Text>
                                    <Dropdown
                                        style={sigupstyle.dropdown}
                                        placeholderStyle={sigupstyle.placeholderStyle}
                                        selectedTextStyle={sigupstyle.selectedTextStyle}
                                        inputSearchStyle={sigupstyle.inputSearchStyle}
                                        iconStyle={sigupstyle.iconStyle}
                                        containerStyle={sigupstyle.dropdownContainer}
                                        itemContainerStyle={sigupstyle.itemContainerStyle}
                                        itemTextStyle={sigupstyle.itemTextStyle}
                                        data={specialitiesList}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={specialitiesList.length === 0 ? '⚠ Aucune spécialité disponible' : 'Choisir votre spécialité'}
                                        value={speciality}
                                        search
                                        searchPlaceholder="Rechercher une spécialité..."
                                        onFocus={() => this.setState({ isFocusSpeciality: true })}
                                        onBlur={() => this.setState({ isFocusSpeciality: false })}
                                        onChange={this._handleSpecialityChange}
                                        disable={is_loading ? true : false}
                                    />

                                    <Text style={[sigupstyle.label, styles.text]}>Classe</Text>
                                    <Dropdown
                                        style={sigupstyle.dropdown}
                                        placeholderStyle={sigupstyle.placeholderStyle}
                                        selectedTextStyle={sigupstyle.selectedTextStyle}
                                        inputSearchStyle={sigupstyle.inputSearchStyle}
                                        iconStyle={sigupstyle.iconStyle}
                                        containerStyle={sigupstyle.dropdownContainer}
                                        itemContainerStyle={sigupstyle.itemContainerStyle}
                                        itemTextStyle={sigupstyle.itemTextStyle}
                                        data={classeList ? classeList : []}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={!classeList ? "Sélectionner une classe" : '⚠ Aucune classe disponible'}
                                        value={classe}
                                        search
                                        searchPlaceholder="Rechercher une classe..."
                                        onFocus={() => this.setState({ isFocusClasse: true })}
                                        onBlur={() => this.setState({ isFocusClasse: false })}
                                        onChange={this._handleClasseChange}
                                        disable={is_loading ? true : false}
                                    />
                                </>
                            )}
                        </View>

                        <TouchableOpacity onPress={this._navigateToAdmission} style={sigupstyle.button}>
                            <Text style={[sigupstyle.buttonText, globalStyles.textBold]}>Continuer</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <View style={{ height: 25 }} />
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchStudentChoolSelectedPageAction,
        switchNewAdmissionTypePageAction

    }, dispatch)
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    selectedSchool: state.auth.selectedSchool,
});

export default connect(mapStateToProps, mapDispatchToProps)(New_Student_Form);