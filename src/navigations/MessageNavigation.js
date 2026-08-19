// ./routes/StackNavigator.js
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from "react-native";
import Messages from "../screens/Messages";
import ChatIndex from "../components/Message/ChatIndex";
import AdvanceMessageFilter from "../components/Message/AdvanceMessageFilter";
import ContactIndex from "../components/Message/ContactIndex";
import ContactProfile from "../components/Message/ContactProfile";
import ContactNotification from "../components/Message/ContactNotification";
import ContactMedia from "../components/Message/ContactMedia";
import ArchivedMessage from "../components/Message/ArchivedMessage";

class CourseNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        } 
    }

    render() {
        const { 
            is_message_home,
            is_chat_index_page,
            is_advance_message_search_page,
            is_contact_page,
            is_contact_profile_page,
            is_contact_notification_page,
            is_media_chat_page,
            is_archived_message_page,
        } = this.props;
        console.log(
             is_message_home,
            is_chat_index_page,
            is_advance_message_search_page,
            is_contact_page,
            is_contact_profile_page,
            is_contact_notification_page,
            is_media_chat_page,
            is_archived_message_page
        )
        return (
            <View style={{ flex:1 }}>
                {
                    is_message_home ?
                        <Messages />
                    :null
                }
                {
                    is_chat_index_page ?
                        <ChatIndex />
                    :null
                }
                {
                    is_advance_message_search_page ?
                        <AdvanceMessageFilter />
                    :null
                }
                {
                    is_contact_page ?
                        <ContactIndex />
                    :null
                }
                {
                    is_contact_profile_page ?
                        <ContactProfile />
                    :null
                }
                {
                    is_contact_notification_page ?
                        <ContactNotification />
                    :null
                }
                {
                    is_media_chat_page ?
                        <ContactMedia />
                    :null
                }
                {
                    is_archived_message_page ?
                        <ArchivedMessage />
                    :null
                }
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({}, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
       is_message_home                      : state.navigation.is_message_home,
       is_chat_index_page                   : state.navigation.is_chat_index_page,
       is_advance_message_search_page       : state.navigation.is_advance_message_search_page,
       is_contact_page                      : state.navigation.is_contact_page,
       is_contact_profile_page              : state.navigation.is_contact_profile_page,
       is_contact_notification_page         : state.navigation.is_contact_notification_page,
       is_media_chat_page                   : state.navigation.is_media_chat_page,
       is_archived_message_page             : state.navigation.is_archived_message_page

    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CourseNavigation);