import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    StatusBar,
    Linking
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../assets/styles/index.js';
import { loginstyle } from '../../assets/styles/login.js';
import { COLORS } from '../../assets/styles/theme.js';
import { store } from '../../reducers/store.js';
import { AUTH_ERROR_MESSAGE, IS_AUTH_ERROR, IS_LOADING } from '../../reducers/actions/types.js';
import { LoginAction, checkAuthDataAction } from '../../reducers/actions/index.js';
import { switchChooseFormAction } from '../../navigations/rootNavigation.js';

class LoginPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordVisible: false,
            focusedInput: null,
            copyrightDate: new Date(),
        };
    }

    componentDidMount() {
        checkAuthDataAction();
        store.dispatch({ type: IS_LOADING, value: false });
    }

    _togglePassVisible = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };

    onForgotPasswordPress = () => {
        // Navigation mot de passe oublié
    };

    _redirectPolicy = (url) => {
        if (url) Linking.openURL(url);
    };

    _closeAlert = () => {
        store.dispatch({ type: IS_AUTH_ERROR, value: false });
        store.dispatch({ type: IS_LOADING, value: false });
    };

    _authSignup = () => {
        switchChooseFormAction(true);
    };

    _loginSubmit = () => {
        const { username, password } = this.state;
        if (username.trim() === '') {
            store.dispatch({ type: IS_AUTH_ERROR, value: true });
            store.dispatch({ type: AUTH_ERROR_MESSAGE, value: "Veuillez saisir votre nom d'utilisateur." });
            return;
        }
        if (password.trim() === '') {
            store.dispatch({ type: IS_AUTH_ERROR, value: true });
            store.dispatch({ type: AUTH_ERROR_MESSAGE, value: 'Veuillez saisir votre mot de passe.' });
            return;
        }

        LoginAction({ username, password });
    };

    render() {
        const { is_loading, is_auth_error, auth_error_message } = this.props;
        const { username, password, passwordVisible, focusedInput, copyrightDate } = this.state;

        return (
            <SafeAreaView style={loginstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Dynamic Glows (Poly-H Theme) */}
                <View style={loginstyle.topGlow} pointerEvents="none" />
                <View style={loginstyle.centerGlow} pointerEvents="none" />
                <View style={loginstyle.bottomGlow} pointerEvents="none" />

                <ScrollView
                    contentContainerStyle={loginstyle.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Logo & Branding */}
                    <View style={loginstyle.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={loginstyle.logo}
                            resizeMode="contain"
                        />
                        <Text style={[styles.textBold, loginstyle.brandBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, loginstyle.slogan]}>
                            L'intelligence qui transforme l'école pour bâtir la nation.
                        </Text>
                        <Text style={[styles.text, loginstyle.welcome]}>
                            Connectez-vous à votre espace académique haut de gamme.
                        </Text>
                    </View>

                    {/* Glassmorphic Card */}
                    <View style={loginstyle.glassCard}>
                        {is_auth_error && (
                            <View style={loginstyle.errorBanner}>
                                <Entypo name="warning" size={16} color="#F43F5E" style={{ marginRight: 8 }} />
                                <Text style={[styles.text, loginstyle.errorBannerText]}>
                                    {auth_error_message}
                                </Text>
                                <TouchableOpacity onPress={this._closeAlert} style={{ marginLeft: 'auto' }}>
                                    <Entypo name="cross" size={18} color="#F43F5E" />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Username Input */}
                        <View
                            style={[
                                loginstyle.inputWrapper,
                                focusedInput === 'username' && loginstyle.inputWrapperFocused,
                            ]}
                        >
                            <Image
                                source={require('../../assets/images/person.png')}
                                style={[
                                    loginstyle.inputIcon,
                                    focusedInput === 'username' && { tintColor: COLORS.accentGold },
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={[styles.textBold, loginstyle.inputText]}
                                placeholder="Nom d'utilisateur"
                                placeholderTextColor={COLORS.textMuted}
                                value={username}
                                onChangeText={(text) => this.setState({ username: text })}
                                onFocus={() => this.setState({ focusedInput: 'username' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                autoCapitalize="none"
                                editable={!is_loading}
                            />
                        </View>

                        {/* Password Input */}
                        <View
                            style={[
                                loginstyle.inputWrapper,
                                focusedInput === 'password' && loginstyle.inputWrapperFocused,
                            ]}
                        >
                            <Image
                                source={require('../../assets/images/lock.png')}
                                style={[
                                    loginstyle.inputIcon,
                                    focusedInput === 'password' && { tintColor: COLORS.accentGold },
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={[styles.textBold, loginstyle.inputText]}
                                placeholder="Mot de passe"
                                placeholderTextColor={COLORS.textMuted}
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onChangeText={(val) => this.setState({ password: val })}
                                onFocus={() => this.setState({ focusedInput: 'password' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                editable={!is_loading}
                            />
                            <TouchableOpacity
                                disabled={is_loading}
                                onPress={this._togglePassVisible}
                                style={loginstyle.eyeButton}
                            >
                                <Entypo
                                    name={passwordVisible ? 'eye-with-line' : 'eye'}
                                    size={18}
                                    color={passwordVisible ? COLORS.accentGold : COLORS.textMuted}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity
                            disabled={is_loading}
                            onPress={this.onForgotPasswordPress}
                            style={{ alignSelf: 'flex-end', marginBottom: 20 }}
                        >
                            <Text style={[styles.textBold, loginstyle.forgotPasswordText]}>
                                Mot de passe oublié ?
                            </Text>
                        </TouchableOpacity>

                        {/* Master CTA Button */}
                        <TouchableOpacity
                            disabled={is_loading}
                            activeOpacity={0.85}
                            style={[loginstyle.loginButton, is_loading && { opacity: 0.7 }]}
                            onPress={this._loginSubmit}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color={COLORS.textDark} />
                            ) : (
                                <Text style={[styles.textBold, loginstyle.loginButtonText]}>
                                    Se Connecter
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Link to Signup */}
                        <View style={loginstyle.createAccountContainer}>
                            <Text style={[styles.text, loginstyle.noAccountText]}>
                                Vous n'avez pas de compte ?{' '}
                            </Text>
                            <TouchableOpacity disabled={is_loading} onPress={this._authSignup}>
                                <Text style={[styles.textBold, loginstyle.createAccountText]}>
                                    Créer ici
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={loginstyle.footerContainer}>
                        <View style={loginstyle.footerLinksRow}>
                            <TouchableOpacity onPress={() => this._redirectPolicy('https://poly-h.com/about')}>
                                <Text style={[styles.text, loginstyle.footerLink]}>À propos</Text>
                            </TouchableOpacity>
                            <Text style={loginstyle.footerDot}>•</Text>
                            <TouchableOpacity onPress={() => this._redirectPolicy('https://poly-h.com/contact')}>
                                <Text style={[styles.text, loginstyle.footerLink]}>Contact</Text>
                            </TouchableOpacity>
                            <Text style={loginstyle.footerDot}>•</Text>
                            <TouchableOpacity onPress={() => this._redirectPolicy('https://poly-h.com/terms')}>
                                <Text style={[styles.text, loginstyle.footerLink]}>Conditions</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.text, loginstyle.copyrightText]}>
                            © {copyrightDate.getFullYear()} Polyvalent House International. All rights reserved.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            LoginAction,
            switchChooseFormAction,
            checkAuthDataAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    is_auth_error: state.auth.is_auth_error,
    auth_error_message: state.auth.auth_error_message,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);