import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { C } from '../../assets/styles/chat';
import { contactprofilestyle } from '../../assets/styles/contactProfile';
import { switchChatPageAction, switchContactNotificationPageAction } from '../../navigations/rootNavigation';
import { styles } from '../../assets/styles';

class ContactProfile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                name: 'Ingénieur 👷',
                status: 'en ligne',
                phone: '+237 6 99 88 77 66',
                about: 'Hello ! Je suis disponible.',
                avatar: require('../../assets/images/profil.png'),
            },
        };
    }

    _goBack = () => {
        switchChatPageAction(true);
    };

    _navigateToContactNotification = () => {
        switchContactNotificationPageAction(true);
    };
    render() {
        const { contact } = this.state;

        return (
            <View style={contactprofilestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={contactprofilestyle.header}>
                        <TouchableOpacity onPress={this._goBack} style={contactprofilestyle.backButton}>
                            <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                        </TouchableOpacity>
                        <Text style={[contactprofilestyle.headerTitle, styles.textBold]}>Profile</Text>
                    </View>

                    <ScrollView
                        contentContainerStyle={contactprofilestyle.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={contactprofilestyle.profileSection}>
                            <Image source={contact.avatar} style={contactprofilestyle.avatar} />
                            <Text style={[contactprofilestyle.name, styles.textBold]}>{contact.name}</Text>
                            <Text style={[contactprofilestyle.status, styles.text]}>{contact.status}</Text>
                        </View>

                        <View style={contactprofilestyle.card}>
                            <Text style={[contactprofilestyle.cardTitle, styles.textBold]}>Infos</Text>
                            <View style={contactprofilestyle.infoRow}>
                                <Icon name="phone-outline" size={22} color={C.accent2} />
                                <Text style={[contactprofilestyle.infoText, styles.text]}>{contact.phone}</Text>
                            </View>
                            <View style={contactprofilestyle.separator} />
                            <View style={contactprofilestyle.infoRow}>
                                <Icon name="information-outline" size={22} color={C.accent2} />
                                <Text style={[contactprofilestyle.infoText, styles.text]}>{contact.about}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={contactprofilestyle.card}
                            onPress={() => {
                                alert('Médias, liens et docs');
                            }}
                        >
                            <View style={contactprofilestyle.optionRow}>
                                <Icon name="paperclip" size={22} color={C.accent2} />
                                <Text style={[contactprofilestyle.optionText, styles.text]}>Médias, liens et docs</Text>
                                <Icon name="chevron-right" size={22} color={C.textMuted} style={contactprofilestyle.arrowIcon} />
                            </View>
                        </TouchableOpacity>

                        <View style={contactprofilestyle.card}>
                            <TouchableOpacity 
                            onPress={this._navigateToContactNotification}
                            style={contactprofilestyle.optionRow}>
                                <Icon name="bell-off-outline" size={22} color={C.accent2} />
                                <Text style={[contactprofilestyle.optionText, styles.text]}>Désactiver les notifications</Text>
                            </TouchableOpacity>
                            <View style={contactprofilestyle.separator} />
                        </View>

                        <View style={contactprofilestyle.card}>
                            <TouchableOpacity style={contactprofilestyle.optionRow}>
                                <Icon name="flag-outline" size={22} color={C.red} />
                                <Text style={[contactprofilestyle.optionText, styles.text, { color: C.red }]}>Signaler</Text>
                            </TouchableOpacity>
                            <View style={contactprofilestyle.separator} />
                            <TouchableOpacity style={contactprofilestyle.optionRow}>
                                <Icon name="block-helper" size={22} color={C.red} />
                                <Text style={[contactprofilestyle.optionText, styles.text, { color: C.red }]}>Bloquer</Text>
                            </TouchableOpacity>
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
            switchContactNotificationPageAction
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile);