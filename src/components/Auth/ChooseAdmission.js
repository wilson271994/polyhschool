import React, { PureComponent } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, ImageBackground, Alert } from 'react-native';
import { styles } from '../../assets/styles';
import { choosestyle } from '../../assets/styles/choose.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { switchLoginFormAction, switchUpdloadDocumentPageAction, switchSignupForm2Action } from '../../navigations/rootNavigation.js';

const dataaccount = [
    { label: 'Inscription', value: 'school_student_inscription', id: 1 },
    { label: 'Tranfert', value: 'school_student_transfert', id: 2 },
];

class AdmissionIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            admission_type: '',
            isFocus: false,
        };
    }

    componentDidMount() {
        this._PersistData();
    }

    _PersistData = async () => {
        const chooseAdmission = await AsyncStorage.getItem('DataAdmission');
        if (chooseAdmission) {
            const admission = JSON.parse(chooseAdmission);
            if (admission.admission_id) {
                const matched = dataaccount.find(item => item.id === admission.admission_id);
                this.setState({ admission_type: matched || null });
            }
        }
    };

    _navigateToLogin = () => {
        switchSignupForm2Action(true);
    };

    _handleAdmissionChange = async (item) => {
        this.setState({ admission_type: item });
        try {
            const dataadmission = JSON.stringify({ admission_id: item.id });
            await AsyncStorage.setItem('DataAdmission', dataadmission);
        } catch (e) {
            console.error('Erreur de sauvegarde du choix d\'admission', e);
        }
    };

    _NavigateToForm = async () => {
        const { admission_type } = this.state;

        if (!admission_type?.id) {
            Alert.alert(
                "Type d'admission requis",
                "Veuillez sélectionner un type d'admission (Inscription ou Transfert) avant de continuer.",
                [{ text: 'OK' }]
            );
            return;
        }

        switchUpdloadDocumentPageAction(true);
    };

    render() {
        const { is_loading } = this.props;
        const { admission_type, isFocus } = this.state;

        return (
            <View style={choosestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <ScrollView contentContainerStyle={choosestyle.scrollContainer}>
                        <View style={choosestyle.back}>
                            <TouchableOpacity onPress={this._navigateToLogin}>
                                <Image style={choosestyle.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={choosestyle.logoContainer}>
                            <Image source={require('../../assets/images/logo.png')} style={choosestyle.logo} />
                            <Text style={[choosestyle.slogan, styles.textBold]}>Beyond imagination</Text>
                        </View>

                        <View style={[choosestyle.inputRow, styles.textBold]}>
                            <View style={choosestyle.dropdownWrapper}>
                                <Image source={require('../../assets/images/profil.png')} style={choosestyle.icon} resizeMode="contain" />
                                <Dropdown
                                    style={[choosestyle.dropdown, isFocus && { borderColor: '#007AFF' }]}
                                    placeholderStyle={choosestyle.placeholderStyle}
                                    selectedTextStyle={choosestyle.selectedTextStyle}
                                    itemTextStyle={choosestyle.itemTextStyle}
                                    data={dataaccount}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Choisir votre admission.."
                                    value={admission_type}
                                    onFocus={() => this.setState({ isFocus: true })}
                                    onBlur={() => this.setState({ isFocus: false })}
                                    onChange={this._handleAdmissionChange}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={this._NavigateToForm}
                            style={choosestyle.button}
                            disabled={is_loading}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={[styles.textBold, choosestyle.buttonText]}>Continuer</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({ is_loading: state.loader.is_loading });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    switchLoginFormAction,
    switchUpdloadDocumentPageAction,
    switchSignupForm2Action
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdmissionIndex);