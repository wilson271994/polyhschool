import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground } from 'react-native';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import { styles } from '../../assets/styles/index.js';
import { notifstyle } from '../../assets/styles/notification.js';
import { switchHomePageAction } from '../../navigations/rootNavigation.js';

class Notifications extends PureComponent {
    state = {
        searchQuery: '',
        notifications: [
            {
                id: '1',
                name: 'Mr. Paul',
                message: 'Sent you an assignment',
                time: '4 mins ago',
                read: true,
            },
            {
                id: '2',
                name: 'Lony eric',
                message: 'sent you a new message',
                time: '4 mins ago',
                read: true,
            },
            {
                id: '3',
                name: 'Poly-H School',
                message: 'New update announcement',
                time: '4 mins ago',
                read: true,
            },
            {
                id: '4',
                name: 'Mr. Paul',
                message: 'Marks on python exams',
                time: '4 mins ago',
                read: false,
            },
            {
                id: '5',
                name: 'Mr. Paul',
                message: 'Course programme',
                time: '4 mins ago',
                read: false,
            },
            {
                id: '6',
                name: 'Mr. Paul',
                message: 'Course programme',
                time: '4 mins ago',
                read: false,
            },
            {
                id: '7',
                name: 'Mr. Paul',
                message: 'Course programme',
                time: '4 mins ago',
                read: false,
            },
        ],
    };
    _backToHome = () => {
        switchHomePageAction(true);
    }

    renderNotification = ({ item }) => (

        <View style={notifstyle.notificationItem}>
            <Image
                source={require('../../assets/images/group.png')}
                style={notifstyle.avatar}
            />
            <View style={notifstyle.notificationContent}>
                <Text style={[notifstyle.name, styles.textBold]}>{item.name}</Text>
                <Text style={[notifstyle.message, styles.textBold]}>{item.message}</Text>
            </View>
            <View style={notifstyle.notificationActions}>
                <TouchableOpacity style={notifstyle.readIcon}>
                    <Text style={[notifstyle.readText, styles.textBold]}>{item.read ? '✓' : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={notifstyle.optionsIcon}>
                    <Text style={[notifstyle.optionsText, styles.textBold]}>⋮</Text>
                </TouchableOpacity>
            </View>
            <Text style={notifstyle.time}>{item.time}</Text>
        </View>
    );

    render() {
        const { searchQuery, notifications } = this.state;

        return (
            <View style={notifstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._backToHome}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Notifications</Text>
                    </View>

                    {/* Barre de recherche */}
                    <TextInput
                        style={[notifstyle.searchBar, styles.textBold]}
                        placeholder="Recherche"
                        value={searchQuery}
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                    />

                    {/* Liste des notifications */}
                    <FlatList
                        data={notifications.filter((item) =>
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.message.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                        renderItem={this.renderNotification}
                        keyExtractor={(item) => item.id}
                        style={notifstyle.notificationList}
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
            switchHomePageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_infos: state.auth.user_infos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Notifications);