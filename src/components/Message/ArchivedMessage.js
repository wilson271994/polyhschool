import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ImageBackground, FlatList, } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/index';
import { messagestyle } from '../../assets/styles/message';
import { archivedstyle } from '../../assets/styles/archivedmessage';
import { switchChatPageAction, switchMessagePageAction } from '../../navigations/rootNavigation';

class ArchivedMessages extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            archivedChats: [
                {
                    id: 3,
                    name: 'Chris',
                    avatar: require('../../assets/images/profil.png'),
                    lastMsg: "Yo",
                    time: "13:47",
                    unread: 0,
                    archived: true,
                    archivedDate: '02/03/2026',
                },
                {
                    id: 7,
                    name: 'Arielle',
                    avatar: require('../../assets/images/profil.png'),
                    lastMsg: "Ok",
                    time: "10:31",
                    unread: 1,
                    archived: true,
                    archivedDate: '28/02/2026',
                },
                {
                    id: 10,
                    name: 'Arielle (groupe)',
                    avatar: require('../../assets/images/profil.png'),
                    lastMsg: "Rendez-vous demain",
                    time: "Hier",
                    unread: 0,
                    archived: true,
                    archivedDate: '15/03/2026',
                },
            ],
        };
    }

    _openChat = (item) => {
        switchChatPageAction(true);
    };

    _goBack = () => {
        switchMessagePageAction(true);
    };

    _unarchiveChat = (id) => {
        this.setState(prevState => ({
            archivedChats: prevState.archivedChats.filter(chat => chat.id !== id),
        }));
    };

    _unarchiveAll = () => {
        this.setState({ archivedChats: [] });
    };

    renderArchivedChat = ({ item }) => (
        <TouchableOpacity
            style={[messagestyle.chatRow, { backgroundColor: 'rgba(255,255,255,0.05)' }]}
            activeOpacity={0.8}
            onPress={() => this._openChat(item)}
        >
            <Image source={item.avatar} style={messagestyle.avatar} />
            <View style={messagestyle.chatInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[messagestyle.chatName, styles.textBold]}>{item.name}</Text>
                    <View style={archivedstyle.archivedBadge}>
                        <Icon name="archive" size={12} color="#FFF" />
                        <Text style={archivedstyle.archivedBadgeText}>Archivé</Text>
                    </View>
                </View>
                <Text style={[messagestyle.lastMessage, styles.text]} numberOfLines={1}>
                    {item.lastMsg}
                </Text>
            </View>
            <View style={messagestyle.chatRight}>
                <Text style={[messagestyle.time, styles.text]}>{item.time}</Text>
                {item.unread > 0 && (
                    <View style={messagestyle.unreadBadge}>
                        <Text style={[messagestyle.unreadText, styles.textBold]}>{item.unread}</Text>
                    </View>
                )}
                <TouchableOpacity
                    onPress={() => this._unarchiveChat(item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={{ marginTop: 6 }}
                >
                    <Icon name="archive-arrow-up-outline" size={20} color="#ECB818" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { archivedChats } = this.state;
        const count = archivedChats.length;

        return (
            <SafeAreaView style={messagestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={messagestyle.header}>

                        <TouchableOpacity onPress={this._goBack} style={archivedstyle.backButton}>
                            <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={[messagestyle.headerTitle, styles.textBold]}>
                                Archivées
                            </Text>
                            {count > 0 && (
                                <Text style={archivedstyle.subtitle}>
                                    {count} conversation{count > 1 ? 's' : ''} archivée{count > 1 ? 's' : ''}
                                </Text>
                            )}
                        </View>
                        {count > 0 && (
                            <TouchableOpacity
                                onPress={this._unarchiveAll}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Icon name="delete-sweep-outline" size={24} color="#FFF" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {count > 0 ? (
                        <FlatList
                            data={archivedChats}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={this.renderArchivedChat}
                            contentContainerStyle={messagestyle.listContent}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View style={archivedstyle.emptyContainer}>
                            <Icon name="archive-outline" size={64} color="#aaa" />
                            <Text style={[archivedstyle.emptyText, styles.text]}>
                                Aucune conversation archivée
                            </Text>
                            <Text style={[archivedstyle.emptySubtext, styles.text]}>
                                Les conversations que vous archivez apparaîtront ici.
                            </Text>
                        </View>
                    )}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchChatPageAction,
            switchMessagePageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedMessages);