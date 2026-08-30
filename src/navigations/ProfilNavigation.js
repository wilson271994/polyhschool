// ./routes/StackNavigator.js
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from "react-native";
import UpdateProfil from "../components/Profile/Forms/UpdateProfil";
// // import UpdateProfil from "../components/Profile/Modal"
import Settings from "../screens/Settings";
import FAQsIndex from "../components/Profile/FAQsIndex";
import TransactionHistory from "../components/Profile/TransactionHistory";
import UpdateNotify from "../components/Profile/Forms/UpdateNotify";
import UpdateKYC from "../components/Profile/Forms/UpdateKYC";
import UpdateLanguage from "../components/Profile/Forms/UpdateLanguage";
import AddDescription from "../components/Profile/Forms/AddDescription";
import UpdateAthentificator from "../components/Profile/Forms/UpdateAthentificator";
import UpdatePassword from "../components/Profile/Forms/UpdatePassword";
import Support from "../components/Profile/Support/Support";
import SupportChat from "../components/Profile/Support/SupportChat";

class ProfilNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        } 
    }

    render() {
        const { 
            is_profil_home,
            is_profil_update_info,
            is_profil_update_kyc,
            is_profil_update_notif,
            is_profil_faq, 
            is_profil_referal,
            is_transaction_history,
            is_update_language_page,
            is_add_description_page,
            is_update_authentification_page,
            is_update_password_page,
            is_support_home,
            is_support_chat
        } = this.props;
        return (
            <View style={{ flex:1 }}>
                {
                    is_profil_home ?
                        <Settings />
                    :null
                }
                {
                    is_profil_update_info ?
                        <UpdateProfil />
                    :null
                }
                {
                    is_profil_update_kyc ? 
                        <UpdateKYC />
                    :null
                }
                {
                    is_profil_update_notif ?
                        <UpdateNotify />
                    :null
                }
                {
                    is_profil_faq ?
                        <FAQsIndex />
                    :null
                } 
                {
                    is_support_home ?
                        <Support />
                    :null
                }
                {
                    is_support_chat ?
                        <SupportChat />
                    :null
                }
                {
                    is_transaction_history ?
                        <TransactionHistory />
                    :null
                } 
                {
                    is_update_language_page ?
                        <UpdateLanguage />
                    :null
                }
                {
                    is_add_description_page ?
                        <AddDescription />
                    :null
                }
                {
                    is_update_authentification_page ?
                        <UpdateAthentificator />
                    :null
                }
                
                {
                    is_update_password_page ?
                        <UpdatePassword />
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
        is_profil_home                          : state.navigation.is_profil_home,
        is_profil_update_info                   : state.navigation.is_profil_update_info,
        is_profil_update_notif                  : state.navigation.is_profil_update_notif,
        is_profil_update_kyc                    : state.navigation.is_profil_update_kyc,
        is_profil_faq                           : state.navigation.is_profil_faq,
        is_profil_referal                       : state.navigation.is_profil_referal,
        is_transaction_history                  : state.navigation.is_transaction_history,
        is_update_language_page                 : state.navigation.is_update_language_page,
        is_add_description_page                 : state.navigation.is_add_description_page,
        is_update_authentification_page         : state.navigation.is_update_authentification_page,
        is_update_password_page                 : state.navigation.is_update_password_page,
        is_support_home                         : state.navigation.is_support_home,
        is_support_chat                         : state.navigation.is_support_chat
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(ProfilNavigation);