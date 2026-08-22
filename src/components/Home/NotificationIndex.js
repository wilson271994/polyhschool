import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    StatusBar,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { switchHeaderAction } from '../../reducers/actions/index.js';
import { styles } from '../../assets/styles/index.js';
import { notifstyle } from '../../assets/styles/notification.js';
import { COLORS } from '../../assets/styles/theme.js';
import { switchHomePageAction } from '../../navigations/rootNavigation.js';

class Notifications extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            filterTab: 'all', // 'all' | 'unread'
            notifications: [
                {
                    id: '1',
                    name: 'Mr. Paul',
                    message: 'Vous a envoyé un nouveau devoir de Python.',
                    time: 'Il y a 4 min',
                    read: false,
                    type: 'assignment',
                },
                {
                    id: '2',
                    name: 'Lony Eric',
                    message: 'Vous a envoyé un message direct.',
                    time: 'Il y a 12 min',
                    read: false,
                    type: 'message',
                },
                {
                    id: '3',
                    name: 'Poly-H School',
                    message: 'Annonce importante concernant le calendrier des examens.',
                    time: 'Il y a 1h',
                    read: true,
                    type: 'system',
                },
                {
                    id: '4',
                    name: 'Mr. Paul',
                    message: 'Publication des notes de l’examen final.',
                    time: 'Il y a 2h',
                    read: true,
                    type: 'grade',
                },
                {
                    id: '5',
                    name: 'Administration',
                    message: 'Mise à jour du programme de cours pour le trimestre.',
                    time: 'Hier',
                    read: true,
                    type: 'system',
                },
            ],
        };
    }

    _backToHome = () => {
        switchHomePageAction(true);
    };

    _toggleReadStatus = (id) => {
        this.setState((prevState) => ({
            notifications: prevState.notifications.map((item) =>
                item.id === id ? { ...item, read: !item.read } : item
            ),
        }));
    };

    _markAllAsRead = () => {
        this.setState((prevState) => ({
            notifications: prevState.notifications.map((item) => ({
                ...item,
                read: true,
            })),
        }));
    };

    _getNotificationIcon = (type) => {
        switch (type) {
            case 'assignment':
                return { name: 'file-document-outline', color: COLORS.accentGold };
            case 'message':
                return { name: 'message-text-outline', color: COLORS.accentCyan };
            case 'grade':
                return { name: 'school-outline', color: '#10B981' };
            default:
                return { name: 'bell-outline', color: COLORS.accentGold };
        }
    };

    renderNotification = ({ item }) => {
        const iconConfig = this._getNotificationIcon(item.type);

        return (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => this._toggleReadStatus(item.id)}
                style={[
                    notifstyle.cardContainer,
                    !item.read && notifstyle.cardUnread,
                ]}
            >
                {!item.read && <View style={notifstyle.unreadIndicator} />}

                {/* Badge d'icône */}
                <View
                    style={[
                        notifstyle.iconBadge,
                        { backgroundColor: `${iconConfig.color}15`, borderColor: `${iconConfig.color}30` },
                    ]}
                >
                    <Icon name={iconConfig.name} size={20} color={iconConfig.color} />
                </View>

                {/* Contenu textuel */}
                <View style={notifstyle.contentWrapper}>
                    <View style={notifstyle.headerRow}>
                        <Text style={[styles.textBold, notifstyle.senderName]} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text style={[styles.text, notifstyle.timeText]}>{item.time}</Text>
                    </View>
                    <Text
                        style={[
                            styles.text,
                            notifstyle.messageText,
                            !item.read && notifstyle.messageTextUnread,
                        ]}
                        numberOfLines={2}
                    >
                        {item.message}
                    </Text>
                </View>

                {/* Statut / Actions */}
                <TouchableOpacity
                    style={notifstyle.actionBtn}
                    onPress={() => this._toggleReadStatus(item.id)}
                >
                    <Icon
                        name={item.read ? 'check-all' : 'circle-medium'}
                        size={18}
                        color={item.read ? COLORS.textMuted : COLORS.accentGold}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    renderEmptyComponent = () => (
        <View style={notifstyle.emptyContainer}>
            <View style={notifstyle.emptyIconBg}>
                <Icon name="bell-off-outline" size={40} color={COLORS.accentGold} />
            </View>
            <Text style={[styles.textBold, notifstyle.emptyTitle]}>
                Aucune notification
            </Text>
            <Text style={[styles.text, notifstyle.emptySubtitle]}>
                Vous êtes à jour ! Aucune notification ne correspond à vos critères.
            </Text>
        </View>
    );

    render() {
        const { searchQuery, notifications, filterTab } = this.state;

        const filteredNotifications = notifications.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.message.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterTab === 'unread' ? !item.read : true;
            return matchesSearch && matchesFilter;
        });

        const unreadCount = notifications.filter((item) => !item.read).length;

        return (
            <SafeAreaView style={notifstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Orbes d'ambiance Poly-H */}
                <View style={notifstyle.topGlow} pointerEvents="none" />
                <View style={notifstyle.bottomGlow} pointerEvents="none" />

                {/* Header Bar */}
                <View style={notifstyle.header}>
                    <TouchableOpacity
                        style={notifstyle.backButton}
                        onPress={this._backToHome}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={notifstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, notifstyle.headerBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, notifstyle.headerTitle]}>Notifications</Text>
                    </View>

                    {unreadCount > 0 && (
                        <TouchableOpacity
                            style={notifstyle.markReadHeaderBtn}
                            onPress={this._markAllAsRead}
                        >
                            <Icon name="check-all" size={18} color={COLORS.accentGold} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Search Bar Input */}
                <View style={notifstyle.searchWrapper}>
                    <Icon name="magnify" size={20} color={COLORS.textMuted} />
                    <TextInput
                        style={[styles.text, notifstyle.searchInput]}
                        placeholder="Rechercher une notification..."
                        placeholderTextColor={COLORS.textMuted}
                        value={searchQuery}
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                    />
                    {searchQuery !== '' && (
                        <TouchableOpacity onPress={() => this.setState({ searchQuery: '' })}>
                            <Icon name="close-circle" size={18} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Filter Tabs */}
                <View style={notifstyle.tabRow}>
                    <TouchableOpacity
                        style={[notifstyle.tabBtn, filterTab === 'all' && notifstyle.tabBtnActive]}
                        onPress={() => this.setState({ filterTab: 'all' })}
                    >
                        <Text
                            style={[
                                styles.textBold,
                                notifstyle.tabText,
                                filterTab === 'all' && notifstyle.tabTextActive,
                            ]}
                        >
                            Toutes ({notifications.length})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[notifstyle.tabBtn, filterTab === 'unread' && notifstyle.tabBtnActive]}
                        onPress={() => this.setState({ filterTab: 'unread' })}
                    >
                        <Text
                            style={[
                                styles.textBold,
                                notifstyle.tabText,
                                filterTab === 'unread' && notifstyle.tabTextActive,
                            ]}
                        >
                            Non lues ({unreadCount})
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* List View */}
                <FlatList
                    data={filteredNotifications}
                    renderItem={this.renderNotification}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={notifstyle.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={this.renderEmptyComponent}
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchHeaderAction,
            switchHomePageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);