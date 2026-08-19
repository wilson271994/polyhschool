import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Switch } from 'react-native';
import 'moment/locale/fr';
import { switchHeaderAction, LogoutAction } from '../../reducers/actions/index.js';
import { styles } from '../../assets/styles/index.js';
import { settingstyle } from '../../assets/styles/setting.js';
import AwesomeAlert from 'react-native-awesome-alerts';
import { C } from '../../assets/styles/chat.js';
import { switchAddDescriptionPageAction, switchFaqsPageAction, switchKycPageAction, switchProfilUpdateInfoAction, switchSupportHomeAction, switchTransactionHistoryPageAction, switchUpdateAuthentificationPageAction, switchUpdateLanguagePageAction, switchUpdateNotifyPageAction, switchUpdatePasswordPageAction } from '../../navigations/rootNavigation.js'

class SettingIndex extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            searchText:'',
            notificationsEnabled: true,
            backgroundPlayEnabled: false,
            autoplayEnabled: true,
            darkModeEnabled: false,
        };

    };


    componentDidMount() {
    }

    _toggleDarkMode = (value) => {
        this.setState({ darkModeEnabled: value });
    };


    toggleSwitch = (name) => {
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    };
    _navigateToProfilUpdate = () => {
        switchProfilUpdateInfoAction(true);
    }
    _navigateToDescription = () => {
        switchAddDescriptionPageAction(true);
    }
    _navigateToSupport = () => {
        switchSupportHomeAction(true);
    }
    _navigateToNotifyUpdate = () => {
        switchUpdateNotifyPageAction(true);
    }
    _navigateToFaqs = () => {
        switchFaqsPageAction(true);
    }
    _navigateToKYC = () => {
        switchKycPageAction(true);
    }
    _navigateToTransactions = () => {
        switchTransactionHistoryPageAction(true);
    }
    _navigateToAuthentification = () => {
        switchUpdateAuthentificationPageAction(true);
    }
    _navigateToUpdatePassword = () => {
        switchUpdatePasswordPageAction(true);
    }
    _navigateToLanguage = () => {
        switchUpdateLanguagePageAction(true);
    }

    _closeAlert = () => {
        this.setState({
            is_alert: false,
            is_loading: false
        });
    }

    _fechtData = async () => {
        await switchHeaderAction(true);
    }



    _toggleLogout = () => {
        this.setState({
            is_alert: true,
            alert_title: 'Déconnexion du système.',
            alert_subtitle: 'Êtes-vous sûr de vouloir éffectuer cette action ?'
        });
    }

    _logOut = () => {
        const { user_token } = this.props
        const data = {
            token: user_token
        }
        LogoutAction(data);
    }

    render() {
        const { is_alert, alert_title, alert_subtitle, is_loading, darkModeEnabled} = this.state;
        const { isVisibleTckCrModal } = this.state;
        return (
            <View style={[settingstyle.container]}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={settingstyle.header}>
                        <Text style={[settingstyle.headerTitle, styles.textBold]}>Mon compte</Text>
                    </View>
                    <ScrollView contentContainerStyle={settingstyle.scrollContainer}>
                        <Text style={[styles.textBold, settingstyle.sectionTitle]}>Paramétrages</Text>
                        <View style={settingstyle.bloccontainer}>
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem} onPress={this._navigateToProfilUpdate}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/account.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Informations personnelles</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Mettre à jour nom, prénom, etc.</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem} onPress={this._navigateToDescription}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/describe.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>A propos</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Parlez-nous de vous.</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem} onPress={this._navigateToKYC}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/kyc.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Mise à jour du KYC</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Identifiez-vous</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem} onPress={this._navigateToNotifyUpdate}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/notification.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Notifications</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Gestion des notifications</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity
                                    onPress={this._navigateToLanguage}
                                    style={settingstyle.flexrowitem}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/language.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Langage & devise</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Modifier la langue et la devise</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/theme.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Thème</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Mode nuit</Text>
                                    </View>
                                    <View style={settingstyle.switchContainer}>
                                        <Switch
                                            value={darkModeEnabled}
                                            onValueChange={this._toggleDarkMode}
                                            trackColor={{ false: '#555', true: C.accent2 }}
                                            thumbColor={darkModeEnabled ? '#fff' : '#ccc'}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <Text style={[styles.textBold, settingstyle.sectionTitle]}>Sécurité</Text>
                        <View style={settingstyle.bloccontainer}>
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity
                                    onPress={this._navigateToAuthentification}
                                    style={settingstyle.flexrowitem}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/padlock.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Double authetification(2FA)</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Augmenter votre niveau de sécurité</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity
                                    onPress={this._navigateToUpdatePassword}
                                    style={settingstyle.flexrowitem}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/password.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Gestion de mots de passe</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Gerer vos mots de passe</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text style={[styles.textBold, settingstyle.sectionTitle]}>Journal des transactions</Text>
                        <View style={settingstyle.bloccontainer}>
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity
                                    onPress={this._navigateToTransactions}
                                    style={settingstyle.flexrowitem}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/visacard.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Historique des transactions</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Consultez vos paiements</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[styles.textBold, settingstyle.sectionTitle]}>Supports</Text>
                        <View style={settingstyle.bloccontainer}>
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity
                                    onPress={this._navigateToFaqs}
                                    style={settingstyle.flexrowitem}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/info.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>FAQs</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Gérer vos portefeuilles</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem} onPress={this._navigateToSupport}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/referral.png')} style={settingstyle.iconimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Support</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Support client</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[styles.textBold, settingstyle.sectionTitle]}>Authentification</Text>
                        <View style={settingstyle.bloccontainer}>
                            <View style={settingstyle.paramitem}>
                                <TouchableOpacity style={settingstyle.flexrowitem} onPress={this._toggleLogout}>
                                    <View style={settingstyle.containericonimg}>
                                        <Image source={require('../../assets/images/logout.png')} style={settingstyle.logoutimage} />
                                    </View>
                                    <View style={settingstyle.labelmenucont}>
                                        <Text style={[styles.textBold, settingstyle.itemlisttext]}>Déconnexion</Text>
                                        <Text style={[styles.text, settingstyle.itemlisthelptext]}>Cloturez cette session</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Componnent Alert */}
                    <AwesomeAlert
                        show={is_alert}
                        title={alert_title}
                        titleStyle={[styles.textBold, styles.titlealert]}
                        message={alert_subtitle}
                        messageStyle={[styles.text, styles.descriptionalert]}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="Je me déconnecte"
                        confirmButtonStyle={[styles.text, styles.btnalert]}
                        confirmButtonColor="#1B497D"
                        onConfirmPressed={this._logOut}
                    />
                </ImageBackground>
            </View>
        );
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchHeaderAction,
            switchProfilUpdateInfoAction,
            LogoutAction,
            switchFaqsPageAction,
            switchSupportHomeAction,
            switchTransactionHistoryPageAction,
            switchUpdateNotifyPageAction,
            switchKycPageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_token: state.auth.user_token,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(SettingIndex);