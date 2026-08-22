import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Switch,
    StatusBar,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AwesomeAlert from 'react-native-awesome-alerts';

import { styles } from '../../assets/styles/index.js';
import { settingstyle } from '../../assets/styles/setting.js';
import { COLORS } from '../../assets/styles/theme.js';
import { BASE_URL } from '../../api/config.js';
import { switchHeaderAction, LogoutAction } from '../../reducers/actions/index.js';
import {
    switchAddDescriptionPageAction,
    switchFaqsPageAction,
    switchKycPageAction,
    switchProfilUpdateInfoAction,
    switchSupportHomeAction,
    switchTransactionHistoryPageAction,
    switchUpdateAuthentificationPageAction,
    switchUpdateLanguagePageAction,
    switchUpdateNotifyPageAction,
    switchUpdatePasswordPageAction,
    switchHomePageAction,
    switchSupportPageFromProfilAction
} from '../../navigations/rootNavigation.js';

class SettingIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            is_alert: false,
            alert_title: '',
            alert_subtitle: '',
            notificationsEnabled: true,
            darkModeEnabled: true,
        };
    }

    _backToHome = () => switchHomePageAction(true);
    _toggleDarkMode = (value) => this.setState({ darkModeEnabled: value });

    _navigateToProfilUpdate = () => switchProfilUpdateInfoAction(true);
    _navigateToDescription = () => switchAddDescriptionPageAction(true);
    _navigateToSupport = () => switchSupportHomeAction(true);
    _navigateToNotifyUpdate = () => switchUpdateNotifyPageAction(true);
    _navigateToFaqs = () => switchFaqsPageAction(true);
    _navigateToKYC = () => switchKycPageAction(true);
    _navigateToTransactions = () => switchTransactionHistoryPageAction(true);
    _navigateToAuthentification = () => switchUpdateAuthentificationPageAction(true);
    _navigateToUpdatePassword = () => switchUpdatePasswordPageAction(true);
    _navigateToLanguage = () => switchUpdateLanguagePageAction(true);

    _toggleLogout = () => {
        this.setState({
            is_alert: true,
            alert_title: 'Déconnexion du système',
            alert_subtitle: 'Êtes-vous sûr de vouloir vous déconnecter de votre session ?',
        });
    };

    _closeAlert = () => {
        this.setState({ is_alert: false });
    };

    _logOut = () => {
        this.setState({ is_alert: false });
        const { user_token } = this.props;
        LogoutAction({ token: user_token });
    };

    renderMenuItem = (iconName, iconColor, title, subtitle, onPress, rightElement = null) => (
        <TouchableOpacity
            style={settingstyle.paramitem}
            onPress={onPress}
            activeOpacity={0.75}
            disabled={!onPress && !rightElement}
        >
            <View style={[settingstyle.containericonimg, { backgroundColor: `${iconColor}15` }]}>
                <Icon name={iconName} size={22} color={iconColor} />
            </View>
            <View style={settingstyle.labelmenucont}>
                <Text style={[styles.textBold, settingstyle.itemlisttext]}>{title}</Text>
                <Text style={[styles.text, settingstyle.itemlisthelptext]}>{subtitle}</Text>
            </View>
            {rightElement ? (
                rightElement
            ) : (
                <Entypo name="chevron-right" size={18} color={COLORS.textMuted} />
            )}
        </TouchableOpacity>
    );

    render() {
        const { is_alert, alert_title, alert_subtitle, darkModeEnabled } = this.state;
        const { user_infos } = this.props;

        const userPP = user_infos?.pp ? BASE_URL + user_infos.pp : null;
        const userName = user_infos?.name || `${user_infos?.first_name || ''} ${user_infos?.last_name || ''}`.trim() || 'Utilisateur';

        return (
            <SafeAreaView style={settingstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Dynamic Glows (Poly-H Theme) */}
                <View style={settingstyle.topGlow} pointerEvents="none" />
                <View style={settingstyle.bottomGlow} pointerEvents="none" />

                {/* Top Header */}
                <View style={settingstyle.headerContainer}>
                    <TouchableOpacity style={settingstyle.backButton} onPress={this._backToHome} activeOpacity={0.7}>
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <View style={settingstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, settingstyle.headerTitle]}>Mon Compte</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={settingstyle.scrollContainer} showsVerticalScrollIndicator={false}>
                    {/* User Hero ID Card */}
                    <View style={settingstyle.userCard}>
                        <View style={settingstyle.avatarContainer}>
                            {userPP ? (
                                <Image source={{ uri: userPP }} style={settingstyle.avatarImage} />
                            ) : (
                                <Icon name="account-circle" size={54} color={COLORS.accentGold} />
                            )}
                        </View>
                        <View style={settingstyle.userInfo}>
                            <Text style={[styles.textBold, settingstyle.userName]}>{userName}</Text>
                            <Text style={[styles.text, settingstyle.userEmail]}>{user_infos?.email || 'compte.etudiant@poly-h.com'}</Text>
                        </View>
                    </View>

                    {/* Section: Paramètres Généraux */}
                    <Text style={[styles.textBold, settingstyle.sectionTitle]}>GÉNÉRAL</Text>
                    <View style={settingstyle.bloccontainer}>
                        {this.renderMenuItem('account-edit-outline', COLORS.accentGold, 'Informations personnelles', 'Mettre à jour nom, prénom, profil', this._navigateToProfilUpdate)}
                        {this.renderMenuItem('information-outline', COLORS.accentCyan, 'À propos', 'Description et détails de votre profil', this._navigateToDescription)}
                        {this.renderMenuItem('card-account-details-outline', COLORS.accentGold, 'Mise à jour KYC', 'Vérification de vos pièces d’identité', this._navigateToKYC)}
                        {this.renderMenuItem('bell-outline', COLORS.accentCyan, 'Notifications', 'Gestion des préférences d’alertes', this._navigateToNotifyUpdate)}
                        {this.renderMenuItem('translate', COLORS.accentGold, 'Langue & Devise', 'Préférences régionales', this._navigateToLanguage)}
                        {this.renderMenuItem(
                            'theme-light-dark',
                            COLORS.accentCyan,
                            'Mode Sombre',
                            'Activer le thème nuit',
                            null,
                            <Switch
                                value={darkModeEnabled}
                                onValueChange={this._toggleDarkMode}
                                trackColor={{ false: '#334155', true: COLORS.accentGold }}
                                thumbColor={COLORS.textPrimary}
                            />
                        )}
                    </View>

                    {/* Section: Sécurité */}
                    <Text style={[styles.textBold, settingstyle.sectionTitle]}>SÉCURITÉ & CONFIDENTIALITÉ</Text>
                    <View style={settingstyle.bloccontainer}>
                        {this.renderMenuItem('shield-lock-outline', COLORS.accentGold, 'Double Authentification (2FA)', 'Renforcer la sécurité du compte', this._navigateToAuthentification)}
                        {this.renderMenuItem('key-outline', COLORS.accentCyan, 'Mot de passe', 'Modifier votre mot de passe d’accès', this._navigateToUpdatePassword)}
                    </View>

                    {/* Section: Finances */}
                    <Text style={[styles.textBold, settingstyle.sectionTitle]}>FINANCES & TRANSACTIONS</Text>
                    <View style={settingstyle.bloccontainer}>
                        {this.renderMenuItem('credit-card-clock-outline', COLORS.accentGold, 'Historique des transactions', 'Consultez vos paiements et reçus', this._navigateToTransactions)}
                    </View>

                    {/* Section: Support */}
                    <Text style={[styles.textBold, settingstyle.sectionTitle]}>SUPPORT & AIDE</Text>
                    <View style={settingstyle.bloccontainer}>
                        {this.renderMenuItem('help-circle-outline', COLORS.accentCyan, 'FAQs', 'Foire aux questions fréquentes', this._navigateToFaqs)}
                        {this.renderMenuItem('headset', COLORS.accentGold, 'Support Client', 'Contacter l’assistance technique', this._navigateToSupport)}
                    </View>

                    {/* Section: Session */}
                    <Text style={[styles.textBold, settingstyle.sectionTitle]}>SESSION</Text>
                    <View style={settingstyle.bloccontainer}>
                        <TouchableOpacity style={settingstyle.paramitem} onPress={this._toggleLogout} activeOpacity={0.75}>
                            <View style={[settingstyle.containericonimg, { backgroundColor: 'rgba(244, 63, 94, 0.15)' }]}>
                                <Icon name="logout" size={22} color="#F43F5E" />
                            </View>
                            <View style={settingstyle.labelmenucont}>
                                <Text style={[styles.textBold, settingstyle.logoutText]}>Se déconnecter</Text>
                                <Text style={[styles.text, settingstyle.itemlisthelptext]}>Fermer la session actuelle</Text>
                            </View>
                            <Entypo name="chevron-right" size={18} color="#F43F5E" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Modal d'alerte Premium */}
                <AwesomeAlert
                    show={is_alert}
                    title={alert_title}
                    titleStyle={[styles.textBold, settingstyle.alertTitle]}
                    message={alert_subtitle}
                    messageStyle={[styles.text, settingstyle.alertMessage]}
                    closeOnTouchOutside={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Annuler"
                    confirmText="Déconnexion"
                    cancelButtonStyle={settingstyle.alertCancelBtn}
                    confirmButtonStyle={settingstyle.alertConfirmBtn}
                    cancelButtonTextStyle={settingstyle.alertCancelText}
                    confirmButtonTextStyle={settingstyle.alertConfirmText}
                    overlayStyle={{ backgroundColor: 'rgba(1, 22, 56, 0.85)' }}
                    contentContainerStyle={settingstyle.alertContainer}
                    onCancelPressed={this._closeAlert}
                    onConfirmPressed={this._logOut}
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchHeaderAction,
            switchProfilUpdateInfoAction,
            LogoutAction, 
            switchFaqsPageAction,
            switchSupportHomeAction,
            switchTransactionHistoryPageAction,
            switchUpdateNotifyPageAction,
            switchKycPageAction,
            switchSupportPageFromProfilAction
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_token: state.auth.user_token,
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingIndex);