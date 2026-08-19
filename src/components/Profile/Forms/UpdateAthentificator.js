import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput, Animated, ActivityIndicator } from 'react-native';
import { UpdateNotificationPermissionAction } from '../../../reducers/actions/index.js';
import { styles } from '../../../assets/styles/index.js';
import Toast from 'react-native-toast-message';
import { profilstyle } from '../../../assets/styles/profil.js';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

class UpdateAuthentification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            receive_announce: false,
            send_money: false,
            receive_money: false,
            payment_issue: false,
            special_offer: false,
            user_experience: false,
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this._loadNotifInfo();
    }

    _loadNotifInfo = () => {
        const { user_infos } = this.props;
        this.setState({
            receive_announce: user_infos.can_notif_announce,
            send_money: user_infos.can_notif_send_money,
            receive_money: user_infos.can_notif_receive_money,
            payment_issue: user_infos.can_notif_error_trans,
            special_offer: user_infos.can_notif_special_offer,
            user_experience: user_infos.can_notif_user_feedback,
        })
    }

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    }

    _toggleReceiveAnounce = () => {
        const { receive_announce } = this.state;
        this.setState({ receive_announce: !receive_announce });
    }

    _toggleSendMoney = () => {
        const { send_money } = this.state;
        this.setState({ send_money: !send_money });
    }

    _toggleReceiveMoney = () => {
        const { receive_money } = this.state;
        this.setState({ receive_money: !receive_money });
    }

    _togglePaymentIssueMoney = () => {
        const { payment_issue } = this.state;
        this.setState({ payment_issue: !payment_issue });
    }

    _toggleSpecialOffer = () => {
        const { special_offer } = this.state;
        this.setState({ special_offer: !special_offer });
    }

    _toggleUserExperience = () => {
        const { user_experience } = this.state;
        this.setState({ user_experience: !user_experience });
    }

    _updateNotify = () => {
        const { user_token } = this.props;
        const { receive_announce, send_money, receive_money, payment_issue, special_offer, user_experience } = this.state;
        const data = JSON.stringify({
            token: user_token,
            can_notif_announce: receive_announce,
            can_notif_send_money: send_money,
            can_notif_receive_money: receive_money,
            can_notif_error_trans: payment_issue,
            can_notif_special_offer: special_offer,
            can_notif_user_feedback: user_experience,
        })
        UpdateNotificationPermissionAction(data)
    }
    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[profilstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={profilstyle.headerSection}>
                        <View style={profilstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={profilstyle.headerButton}
                                onPress={this._navigateToProfil}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={profilstyle.headertext}>
                            <Text style={[profilstyle.headerTitle, styles.textBold]}>Authentification à double facteur(2FA)</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };
    render() {
        const { user_infos, is_loading, site_infos } = this.props;
        const {
            receive_announce,
            send_money,
            receive_money,
            payment_issue,
            special_offer,
            user_experience
        } = this.state;
        return (
            <View style={profilstyle.containerform}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={profilstyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={profilstyle.section}>
                            <View style={styles.section}>
                                <View style={styles.back}>
                                    <TouchableOpacity onPress={this._navigateToProfil}>
                                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.sectionTitle, styles.textBold,]}>Authentification à double facteur(2FA)</Text>
                            </View>
                        </View>

                        <View style={profilstyle.formcontainer}>

                            
                

                            <View style={profilstyle.formcheckitem}>
                                <View style={profilstyle.labelcheckitem}>
                                    <Text style={[styles.textBold, profilstyle.label]}>Empreinte digitale</Text>
                                    <Text style={[styles.text, profilstyle.sublabel]}>Autoriser l'authentification par empreinte digitale</Text>
                                </View>
                                <View style={profilstyle.checkbtncont}>
                                    <TouchableOpacity onPress={this._toggleSpecialOffer}
                                        style={[profilstyle.checkbtn, special_offer ? profilstyle.ischeckbtn : '']}>
                                        {
                                            special_offer ?
                                                <FontAwesome5Icon name='check' style={profilstyle.ischeckicon} />
                                                : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={profilstyle.formcheckitem}>
                                <View style={profilstyle.labelcheckitem}>
                                    <Text style={[styles.textBold, profilstyle.label]}>Reconnaissance faciale</Text>
                                    <Text style={[styles.text, profilstyle.sublabel]}>Autoriser l'authentification par reconnaissance faciale</Text>
                                </View>
                                <View style={profilstyle.checkbtncont}>
                                    <TouchableOpacity onPress={this._toggleReceiveAnounce}
                                        style={[profilstyle.checkbtn, receive_announce ? profilstyle.ischeckbtn : '']}>
                                        {
                                            receive_announce ?
                                                <FontAwesome5Icon name='check' style={profilstyle.ischeckicon} />
                                                : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={profilstyle.formcheckitem}>
                                <View style={profilstyle.labelcheckitem}>
                                    <Text style={[styles.textBold, profilstyle.label]}>Vérification par Email</Text>
                                    <Text style={[styles.text, profilstyle.sublabel]}>Autoriser l'authentification par envoir d'email</Text>
                                </View>
                                <View style={profilstyle.checkbtncont}>
                                    <TouchableOpacity onPress={this._toggleReceiveAnounce}
                                        style={[profilstyle.checkbtn, receive_announce ? profilstyle.ischeckbtn : '']}>
                                        {
                                            receive_announce ?
                                                <FontAwesome5Icon name='check' style={profilstyle.ischeckicon} />
                                                : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={profilstyle.formcheckitem}>
                                <View style={profilstyle.labelcheckitem}>
                                    <Text style={[styles.textBold, profilstyle.label]}>Vérification par SMS</Text>
                                    <Text style={[styles.text, profilstyle.sublabel]}>Autoriser l'authentification par envoie de sms</Text>
                                </View>
                                <View style={profilstyle.checkbtncont}>
                                    <TouchableOpacity onPress={this._toggleReceiveAnounce}
                                        style={[profilstyle.checkbtn, receive_announce ? profilstyle.ischeckbtn : '']}>
                                        {
                                            receive_announce ?
                                                <FontAwesome5Icon name='check' style={profilstyle.ischeckicon} />
                                                : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity onPress={this._updateNotify}
                                style={profilstyle.submitButton}
                                disabled={is_loading ? true : false}
                            >
                                {
                                    is_loading ?
                                        <ActivityIndicator size="small" color="#fff" />
                                        :
                                        <Text style={[styles.textBold, profilstyle.submitBtnText]}>Enregistrer</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 60 }} />
                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            UpdateNotificationPermissionAction,
            switchProfilPageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        is_loading: state.loader.is_loading,
        user_infos: state.auth.user_infos,
        user_token: state.auth.user_token,
        site_infos: state.auth.site_infos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(UpdateAuthentification);