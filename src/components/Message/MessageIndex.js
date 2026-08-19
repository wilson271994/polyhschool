import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, Animated, SafeAreaView, ImageBackground, FlatList, ScrollView } from 'react-native';
import 'moment/locale/fr';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/index.js';
import { messagestyle } from '../../assets/styles/message.js';
import { switchAdvanceMessageFilterPageAction, switchArchivedMessagePageAction, switchChatPageAction, switchContactPageAction } from '../../navigations/rootNavigation.js';
import { SwipeablePanel } from 'rn-swipeable-panel';

class MessageIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Toutes',
            isVisibleMenu: false,
            chats: [
                // {
                //     id: 1,
                //     name: "Yann",
                //     avatar: require('../../assets/images/profil.png'),
                //     lastMsg: "Je suis déjà rentrée",
                //     time: "14:48",
                //     unread: 0,
                //     pinned: true,
                // },
            ],
            fabOpacity: new Animated.Value(1),
        };
    }

    get isEmpty() {
        return this.getFilteredChats().length === 0;
    }

    getFilteredChats = () => {
        const { chats, activeTab } = this.state;

        switch (activeTab) {
            case 'Non lues':
                return chats.filter(chat => chat.unread > 0);
            case 'Favoris':
                return chats.filter(chat => chat.pinned);
            case 'Groupes':
                return chats.filter(chat =>
                    chat.name.toLowerCase().includes('groupe') ||
                    chat.name.includes('Group')
                );
            default:
                return chats;
        }
    };

    _navigateToChat = () => {
        switchChatPageAction(true);
    };
    _navigateToContact = () => {
        switchContactPageAction(true);
    };
    _navigateToArchivedMessages = () => {
        switchArchivedMessagePageAction(true);
    };
    _goToSearch = () => {
        switchAdvanceMessageFilterPageAction(true);
    };
    _openMenu = () => {
        this.setState({ isVisibleMenu: true });
    };
    _closeMenu = () => {
        this.setState({ isVisibleMenu: false });
    };

    renderTabs = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={messagestyle.tabsContainer}
        >
            {['Toutes', 'Non lues', 'Favoris', 'Groupes'].map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        messagestyle.tab,
                        this.state.activeTab === tab && messagestyle.tabActive
                    ]}
                    onPress={() => this.setState({ activeTab: tab })}
                >
                    <Text style={[
                        messagestyle.tabText, styles.text,
                        this.state.activeTab === tab && messagestyle.tabTextActive, styles.textBold
                    ]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    renderEmptyState = () => (
        <View style={messagestyle.emptyContainer}>

            <View style={messagestyle.emptyIconContainer}>
                <Icon name="message-text-outline" size={64} color="#A0AEC0" />
            </View>


            <Text style={[messagestyle.emptyTitle, styles.textBold]}>
                Aucune discussion
            </Text>


            <Text style={[messagestyle.emptyMessage, styles.text]}>
                Vous n'avez pas encore de messages.{'\n'}
                Cliquez sur le bouton + pour démarrer une nouvelle discussion.
            </Text>
        </View>
    );

    renderChat = ({ item }) => (
        <TouchableOpacity
            style={messagestyle.chatRow} activeOpacity={0.8}
            onPress={this._navigateToChat}>
            <Image source={item.avatar} style={messagestyle.avatar} />
            <View style={messagestyle.chatInfo}>
                <Text style={[messagestyle.chatName, styles.textBold]}>{item.name}</Text>
                <Text style={[messagestyle.lastMessage, styles.text]} numberOfLines={1}>{item.lastMsg}</Text>
            </View>
            <View style={messagestyle.chatRight}>
                <Text style={[messagestyle.time, styles.text]}>{item.time}</Text>
                {item.unread > 0 && (
                    <View style={messagestyle.unreadBadge}>
                        <Text style={[messagestyle.unreadText, styles.textBold]}>{item.unread}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        const threshold = 150;

        Animated.timing(this.state.fabOpacity, {
            toValue: scrollY > threshold ? 0.25 : 1,
            duration: 180,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const filteredChats = this.getFilteredChats();

        return (
            <SafeAreaView style={messagestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={messagestyle.header}>
                        <Text style={[messagestyle.headerTitle, styles.textBold]}>Discussions</Text>
                        <View style={messagestyle.headerIcons}>
                            <TouchableOpacity
                                style={messagestyle.searchButton}
                                onPress={this._goToSearch} activeOpacity={0.9}>
                                <Icon name="magnify" size={24} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._openMenu} style={{ marginLeft: 20 }}>
                                <Icon name="dots-vertical" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.renderTabs()}

                    {this.isEmpty ? (
                        <View style={messagestyle.mainContent}>
                            {this.renderEmptyState()}
                        </View>
                    ) : (
                        <FlatList
                            data={filteredChats}
                            keyExtractor={item => item.id.toString()}
                            renderItem={this.renderChat}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={messagestyle.listContent}
                            onScroll={this.handleScroll}
                            scrollEventThrottle={16}
                        />
                    )}

                    <Animated.View style={[messagestyle.fab, { opacity: this.state.fabOpacity }]}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={messagestyle.fabInner}
                            onPress={this._navigateToContact}
                        >
                            <Icon name="plus" size={32} color="#fff" />
                        </TouchableOpacity>
                    </Animated.View>

                    <SwipeablePanel
                        fullWidth={true}
                        openLarge={true}
                        closeOnTouchOutside={true}
                        showCloseButton={true}
                        isActive={this.state.isVisibleMenu}
                        onClose={this._closeMenu}
                        onPressCloseButton={this._closeMenu}
                        style={messagestyle.containermenu}
                        barContainerStyle={messagestyle.swipablepanelbarstyle}
                        closeRootStyle={messagestyle.swipablepanelcloseicon}
                    >
                        <ScrollView style={messagestyle.menuitemscroll}>
                            <TouchableOpacity onPress={this._navigateToContact} style={messagestyle.headermenuitem}>
                                <Icon name="comment-outline" size={24} color="#1B497D" />
                                <Text style={[messagestyle.menulisttext, styles.text]}>Nouveau message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this._closeMenu(); }} style={messagestyle.headermenuitem}>
                                <Icon name="account-group-outline" size={24} color="#1B497D" />
                                <Text style={[messagestyle.menulisttext, styles.text]}>Nouveau groupe</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._navigateToArchivedMessages} style={messagestyle.headermenuitem}>
                                <Icon name="archive-outline" size={24} color="#1B497D" />
                                <Text style={[messagestyle.menulisttext, styles.text]}>Archivées</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this._closeMenu(); }} style={messagestyle.headermenuitem}>
                                <Icon name="cog-outline" size={24} color="#1B497D" />
                                <Text style={[messagestyle.menulisttext, styles.text]}>Paramètres</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </SwipeablePanel>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchHeaderAction,
            switchChatPageAction,
            switchAdvanceMessageFilterPageAction,
            switchContactPageAction,
            switchArchivedMessagePageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_infos: state.auth.user_infos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndex);