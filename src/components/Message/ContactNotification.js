import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchChatPageAction } from '../../navigations/rootNavigation';
import { C } from '../../assets/styles/chat';
import { contactnotificationstyle } from '../../assets/styles/contactnotification';
import { styles } from '../../assets/styles';


class ContactNotification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notificationsEnabled: true,
            silentModeEnabled: false,
            soundEnabled: true,
            vibrateEnabled: true,
        };
    }

    _goBack = () => {
        switchChatPageAction(true);
    };

    _toggleNotification = (value) => {
        this.setState({ notificationsEnabled: value });
    };

    _toggleSilentMode = (value) => {
        this.setState({ silentModeEnabled: value });
    };

    _toggleSound = (value) => {
        this.setState({ soundEnabled: value });
    };

    _toggleVibrate = (value) => {
        this.setState({ vibrateEnabled: value });
    };

    render() {
        const {
            notificationsEnabled,
            silentModeEnabled,
            soundEnabled,
            vibrateEnabled,
        } = this.state;

        return (
            <View style={contactnotificationstyle.container}>

                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={contactnotificationstyle.header}>
                        <TouchableOpacity onPress={this._goBack} style={contactnotificationstyle.backButton}>
                            <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                        </TouchableOpacity>
                        <Text style={[contactnotificationstyle.headerTitle, styles.textBold]}>Notifications</Text>
                        <View style={contactnotificationstyle.headerRight} />
                    </View>

                    <ScrollView
                        contentContainerStyle={contactnotificationstyle.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={contactnotificationstyle.card}>
                            <Text style={[contactnotificationstyle.cardTitle, styles.textBold]}>Notifications</Text>

                            <View style={contactnotificationstyle.row}>
                                <View style={contactnotificationstyle.rowIcon}>
                                    <Icon name="bell-outline" size={22} color={C.accent2} />
                                </View>
                                <View style={contactnotificationstyle.rowTextContainer}>
                                    <Text style={[contactnotificationstyle.rowTitle, styles.textBold]}>Autoriser les notifications</Text>
                                    <Text style={[contactnotificationstyle.rowSubtitle, styles.text]}>Recevoir les alertes de messages</Text>
                                </View>
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={this._toggleNotification}
                                    trackColor={{ false: '#555', true: C.accent2 }}
                                    thumbColor={notificationsEnabled ? '#fff' : '#ccc'}
                                />
                            </View>

                            <View style={contactnotificationstyle.separator} />

                            <View style={contactnotificationstyle.row}>
                                <View style={contactnotificationstyle.rowIcon}>
                                    <Icon name="volume-off" size={22} color={C.accent2} />
                                </View>
                                <View style={contactnotificationstyle.rowTextContainer}>
                                    <Text style={[contactnotificationstyle.rowTitle, styles.textBold]}>Son</Text>
                                    <Text style={[contactnotificationstyle.rowSubtitle, styles.text]}>Jouer un son pour les nouveaux messages</Text>
                                </View>
                                <Switch
                                    value={soundEnabled}
                                    onValueChange={this._toggleSound}
                                    trackColor={{ false: '#555', true: C.accent2 }}
                                    thumbColor={soundEnabled ? '#fff' : '#ccc'}
                                />
                            </View>

                            <View style={contactnotificationstyle.separator} />

                            <View style={contactnotificationstyle.row}>
                                <View style={contactnotificationstyle.rowIcon}>
                                    <Icon name="vibrate" size={22} color={C.accent2} />
                                </View>
                                <View style={contactnotificationstyle.rowTextContainer}>
                                    <Text style={[contactnotificationstyle.rowTitle, styles.textBold]}>Vibreur</Text>
                                    <Text style={[contactnotificationstyle.rowSubtitle, styles.text]}>Vibrer pour les notifications</Text>
                                </View>
                                <Switch
                                    value={vibrateEnabled}
                                    onValueChange={this._toggleVibrate}
                                    trackColor={{ false: '#555', true: C.accent2 }}
                                    thumbColor={vibrateEnabled ? '#fff' : '#ccc'}
                                />
                            </View>
                        </View>

                        <View style={contactnotificationstyle.card}>
                            <Text style={contactnotificationstyle.cardTitle}>Mode silencieux</Text>

                            <View style={contactnotificationstyle.row}>
                                <View style={contactnotificationstyle.rowIcon}>
                                    <Icon name="sleep" size={22} color={C.accent2} />
                                </View>
                                <View style={contactnotificationstyle.rowTextContainer}>
                                    <Text style={[contactnotificationstyle.rowTitle, styles.textBold]}>Désactiver les sons</Text>
                                    <Text style={[contactnotificationstyle.rowSubtitle, styles.text]}>
                                        Les notifications arriveront sans son ni vibration
                                    </Text>
                                </View>
                                <Switch
                                    value={silentModeEnabled}
                                    onValueChange={this._toggleSilentMode}
                                    trackColor={{ false: '#555', true: C.accent2 }}
                                    thumbColor={silentModeEnabled ? '#fff' : '#ccc'}
                                />
                            </View>
                        </View>

                        <View style={{ height: 40 }} />
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchChatPageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactNotification);