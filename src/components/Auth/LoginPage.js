import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
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
            focusedInput: null, // 'username' | 'password'
            copyrightDate: new Date(),
        };
    }

    componentDidMount() {
        checkAuthDataAction();
        store.dispatch({ type: IS_LOADING, value: false });
    }

    // Toggle password visibility state
    _togglePassVisible = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };

    // Trigger forgot password flow
    onForgotPasswordPress = () => {
        // Navigate to forgot password screen
    };

    // Helper for opening external privacy policy or terms URLs
    _redirectPolicy = (url) => {
        if (url) Linking.openURL(url);
    };

    // Close inline error message banner
    _closeAlert = () => {
        store.dispatch({ type: IS_AUTH_ERROR, value: false });
        store.dispatch({ type: IS_LOADING, value: false });
    };

    // Redirect user to sign up flow
    _authSignup = () => {
        switchChooseFormAction(true);
    };

    // Validate form fields and dispatch login action
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
            <View style={loginstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Ambient Glowing Orbs */}
                <View style={loginstyle.topGlow} />
                <View style={loginstyle.centerGlow} />
                <View style={loginstyle.bottomGlow} />

                <ScrollView
                    contentContainerStyle={loginstyle.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Logo & Institution Branding */}
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

                    {/* Glassmorphic Login Card */}
                    <View style={loginstyle.glassCard}>

                        {/* Inline Error Banner */}
                        {is_auth_error && (
                            <View style={loginstyle.errorBanner}>
                                <Entypo name="warning" size={16} color="#F87171" style={{ marginRight: 8 }} />
                                <Text style={[styles.text, loginstyle.errorBannerText]}>
                                    {auth_error_message}
                                </Text>
                                <TouchableOpacity onPress={this._closeAlert} style={{ marginLeft: 'auto' }}>
                                    <Entypo name="cross" size={18} color="#F87171" />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Username Input Field */}
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
                                    focusedInput === 'username' && { tintColor: '#f6a100' },
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={[styles.textBold, loginstyle.inputText]}
                                placeholder="Nom d'utilisateur"
                                placeholderTextColor="#64748B"
                                value={username}
                                onChangeText={(text) => this.setState({ username: text })}
                                onFocus={() => this.setState({ focusedInput: 'username' })}
                                onBlur={() => this.setState({ focusedInput: null })}
                                autoCapitalize="none"
                                editable={!is_loading}
                            />
                        </View>

                        {/* Password Input Field */}
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
                                    focusedInput === 'password' && { tintColor: '#f6a100' },
                                ]}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={[styles.textBold, loginstyle.inputText]}
                                placeholder="Mot de passe"
                                placeholderTextColor="#64748B"
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
                                    color={passwordVisible ? '#f6a100' : '#64748B'}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Forgot Password Link */}
                        <TouchableOpacity
                            disabled={is_loading}
                            onPress={this.onForgotPasswordPress}
                            style={{ alignSelf: 'flex-end', marginBottom: 24 }}
                        >
                            <Text style={[styles.textBold, loginstyle.forgotPasswordText]}>
                                Mot de passe oublié ?
                            </Text>
                        </TouchableOpacity>

                        {/* Master CTA Login Button */}
                        <TouchableOpacity
                            disabled={is_loading}
                            activeOpacity={0.85}
                            style={[loginstyle.loginButton, is_loading && { opacity: 0.7 }]}
                            onPress={this._loginSubmit}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#011638" />
                            ) : (
                                <Text style={[styles.textBold, loginstyle.loginButtonText]}>
                                    Se Connecter
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Account Creation Link */}
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

                    {/* Footer & Policy Links */}
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
                            <Text style={loginstyle.footerDot}>•</Text>
                            <TouchableOpacity onPress={() => this._redirectPolicy('https://poly-h.com/privacy')}>
                                <Text style={[styles.text, loginstyle.footerLink]}>Confidentialité</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.text, loginstyle.copyrightText]}>
                            © {copyrightDate.getFullYear()} Polyvalent House International. All rights reserved.
                        </Text>
                        <Text style={[styles.textBold, loginstyle.developerTag]}>
                            Designed by Poly-H Technologies
                        </Text>
                    </View>
                </ScrollView>
            </View>
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