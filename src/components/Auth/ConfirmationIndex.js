import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../assets/styles';
import { sigupstyle } from '../../assets/styles/signup';
import { AccountActivationAction, resentActivationCodeAction } from '../../reducers/actions';
import { switchSignupForm2Action } from '../../navigations/rootNavigation';

class Activation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            confirmationCode: '',
            isFocused: false,
        };
    }

    _navigateToForm2 = () => {
        switchSignupForm2Action(true);
    };

    _activateAccount = async () => {
        const { confirmationCode } = this.state;
        const signup_info = await AsyncStorage.getItem('DataForm1');

        if (!confirmationCode) {
            Toast.show({
                type: 'error',
                props: {
                    title: "Une erreur s'est produite !",
                    description: 'Veuillez saisir le code reçu par email.',
                },
            });
            return;
        }

        if (!signup_info) {
            Toast.show({
                type: 'error',
                props: {
                    title: "Une erreur s'est produite !",
                    description: "Fermez l'application et recommencez la création de votre compte.",
                },
            });
            return;
        }

        const signup_info_json = JSON.parse(signup_info);

        const activatedata = new FormData();
        activatedata.append('email', signup_info_json.email);
        activatedata.append('code', confirmationCode);

        AccountActivationAction(activatedata);
    };

    _resentActivateCode = async () => {
        const signup_info = await AsyncStorage.getItem('DataForm1');
        const signup_school_info = await AsyncStorage.getItem('SelectedSchoolId');

        if (!signup_info && !signup_school_info) {
            Toast.show({
                type: 'error',
                props: {
                    title: "Une erreur s'est produite !",
                    description: "Fermez l'application et recommencez la création de votre compte.",
                },
            });
            return;
        }

        const signup_info_json = JSON.parse(signup_info);
        const signup_school_info_json = JSON.parse(signup_school_info);

        const formdata = new FormData();
        formdata.append('email', signup_info_json.email);
        formdata.append('school', signup_school_info_json.school);

        resentActivationCodeAction(formdata);
    };

    render() {
        const { is_loading } = this.props;
        const { confirmationCode, isFocused } = this.state;

        return (
            <View style={sigupstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Ambient Glowing Orbs */}
                <View style={sigupstyle.topGlow} />
                <View style={sigupstyle.bottomGlow} />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={sigupstyle.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header Bar */}
                        <View style={sigupstyle.headerRow}>
                            <TouchableOpacity
                                style={sigupstyle.backButton}
                                onPress={this._navigateToForm2}
                                activeOpacity={0.7}
                            >
                                <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        {/* Logo & Header Section */}
                        <View style={sigupstyle.logoContainer}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={sigupstyle.logo}
                                resizeMode="contain"
                            />
                            <Text style={[styles.textBold, sigupstyle.brandBadge]}>POLY-H SCHOOL</Text>
                            <Text style={[styles.textBold, sigupstyle.title]}>Activation du compte</Text>
                            <Text style={[styles.text, sigupstyle.slogan]}>
                                Un code d'activation vous a été envoyé par email. Veuillez le saisir ci-dessous pour valider votre compte.
                            </Text>
                        </View>

                        {/* Form Glass Container */}
                        <View style={sigupstyle.inputContainer}>
                            <Text style={[styles.text, sigupstyle.label]}>Code de confirmation *</Text>
                            <View style={[sigupstyle.inputWrapper, isFocused && sigupstyle.inputWrapperFocused]}>
                                <Icon
                                    name="shield-key-outline"
                                    size={20}
                                    color={isFocused ? '#f6a100' : '#64748B'}
                                    style={sigupstyle.inputIcon}
                                />
                                <TextInput
                                    style={[styles.textBold, sigupstyle.input, { letterSpacing: 2 }]}
                                    placeholder="Entrez votre code"
                                    placeholderTextColor="#64748B"
                                    onChangeText={(code) => this.setState({ confirmationCode: code })}
                                    value={confirmationCode}
                                    keyboardType="numeric"
                                    onFocus={() => this.setState({ isFocused: true })}
                                    onBlur={() => this.setState({ isFocused: false })}
                                />
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity
                                onPress={this._activateAccount}
                                style={sigupstyle.button}
                                disabled={is_loading}
                                activeOpacity={0.85}
                            >
                                {is_loading ? (
                                    <ActivityIndicator size="small" color="#011638" />
                                ) : (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.textBold, sigupstyle.buttonText]}>Confirmer</Text>
                                        <Entypo name="check" size={18} color="#011638" style={{ marginLeft: 8 }} />
                                    </View>
                                )}
                            </TouchableOpacity>

                            {/* Resend Code Section */}
                            <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={[styles.text, { color: '#94A3B8', fontSize: 13 }]}>
                                    Vous n'avez pas reçu de code ?
                                </Text>
                                <TouchableOpacity onPress={this._resentActivateCode} activeOpacity={0.7}>
                                    <Text style={[styles.textBold, { color: '#f6a100', fontSize: 13, marginLeft: 6 }]}>
                                        Renvoyer
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            resentActivationCodeAction,
            AccountActivationAction,
            switchSignupForm2Action,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Activation);