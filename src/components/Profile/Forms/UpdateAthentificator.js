import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Animated,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../../assets/styles/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { UpdateNotificationPermissionAction } from '../../../reducers/actions/index.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

class UpdateAuthentification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            enable_biometric: false,
            enable_face_id: false,
            enable_email_auth: true,
            enable_sms_auth: false,
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this._loadAuthSettings();
    }

    _loadAuthSettings = () => {
        const { user_infos } = this.props;
        if (user_infos) {
            this.setState({
                enable_biometric: !!user_infos.can_use_biometrics,
                enable_face_id: !!user_infos.can_use_face_id,
                enable_email_auth: user_infos.can_use_email_2fa !== undefined ? !!user_infos.can_use_email_2fa : true,
                enable_sms_auth: !!user_infos.can_use_sms_2fa,
            });
        }
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    _updateAuthSettings = () => {
        const { user_token } = this.props;
        const { enable_biometric, enable_face_id, enable_email_auth, enable_sms_auth } = this.state;

        const data = JSON.stringify({
            token: user_token,
            can_use_biometrics: enable_biometric,
            can_use_face_id: enable_face_id,
            can_use_email_2fa: enable_email_auth,
            can_use_sms_2fa: enable_sms_auth,
        });

        UpdateNotificationPermissionAction(data);
    };

    render2FAItem = (title, subtitle, iconName, iconColor, value, onValueChange) => (
        <View style={profilstyle.cardItem}>
            <View style={profilstyle.authItemContent}>
                <View style={[profilstyle.authIconContainer, { backgroundColor: `${iconColor}15` }]}>
                    <Icon name={iconName} size={22} color={iconColor} />
                </View>
                <View style={profilstyle.authTextWrapper}>
                    <Text style={[styles.textBold, profilstyle.authTitle]}>{title}</Text>
                    <Text style={[styles.text, profilstyle.authSubtitle]}>{subtitle}</Text>
                </View>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#334155', true: COLORS.accentGold }}
                    thumbColor={COLORS.textPrimary}
                />
            </View>
        </View>
    );

    render() {
        const { is_loading } = this.props;
        const { enable_biometric, enable_face_id, enable_email_auth, enable_sms_auth } = this.state;

        return (
            <SafeAreaView style={profilstyle.containerform}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={profilstyle.topGlow} pointerEvents="none" />
                <View style={profilstyle.bottomGlow} pointerEvents="none" />

                {/* Header Bar */}
                <View style={profilstyle.headerNav}>
                    <TouchableOpacity
                        style={profilstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={profilstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, profilstyle.headerTitle]}>Sécurité & 2FA</Text>
                    </View>
                </View>

                <Animated.ScrollView
                    contentContainerStyle={profilstyle.scrollContent}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Card d'Information */}
                    <View style={profilstyle.infoBox2FA}>
                        <Icon name="shield-check" size={26} color={COLORS.accentGold} />
                        <Text style={[styles.text, profilstyle.infoBox2FAText]}>
                            Activez la double authentification pour protéger la connexion à votre compte et vos transactions académiques.
                        </Text>
                    </View>

                    <View style={profilstyle.formContainer}>
                        {this.render2FAItem(
                            'Empreinte digitale',
                            "Autoriser la connexion rapide par capteur d'empreinte",
                            'fingerprint',
                            COLORS.accentGold,
                            enable_biometric,
                            (val) => this.setState({ enable_biometric: val })
                        )}

                        {this.render2FAItem(
                            'Reconnaissance faciale',
                            "Autoriser la validation par reconnaissance faciale (Face ID)",
                            'face-recognition',
                            COLORS.accentCyan,
                            enable_face_id,
                            (val) => this.setState({ enable_face_id: val })
                        )}

                        {this.render2FAItem(
                            'Vérification par Email',
                            "Recevoir un code de sécurité à 6 chiffres par e-mail",
                            'email-outline',
                            COLORS.accentGold,
                            enable_email_auth,
                            (val) => this.setState({ enable_email_auth: val })
                        )}

                        {this.render2FAItem(
                            'Vérification par SMS',
                            'Recevoir un code de confirmation par SMS sur votre mobile',
                            'message-lock-outline',
                            COLORS.accentCyan,
                            enable_sms_auth,
                            (val) => this.setState({ enable_sms_auth: val })
                        )}

                        {/* Bouton de Soumission */}
                        <TouchableOpacity
                            onPress={this._updateAuthSettings}
                            style={profilstyle.submitButton}
                            activeOpacity={0.85}
                            disabled={is_loading}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color={COLORS.textDark} />
                            ) : (
                                <>
                                    <Icon name="shield-lock-outline" size={20} color={COLORS.textDark} style={{ marginRight: 8 }} />
                                    <Text style={[styles.textBold, profilstyle.submitBtnText]}>
                                        Enregistrer la sécurité 2FA
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </Animated.ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            UpdateNotificationPermissionAction,
            switchProfilPageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAuthentification);