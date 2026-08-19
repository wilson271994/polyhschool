// ./routes/StackNavigator.js
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from "react-native";
import SignupForm1 from "../components/Auth/SignupForm1";
import SignupForm2 from "../components/Auth/SignupForm2";
import ChooseIndex from "../components/Auth/ChooseIndex";
import LoginPage from "../components/Auth/LoginPage";
import ConfirmationIndex from "../components/Auth/ConfirmationIndex";
import SchoolSelection from "../components/Auth/Pages/SchoolSelection";
import SchoolDetail from "../components/Auth/Pages/SchoolDetail";
import ChooseAdmission from "../components/Auth/ChooseAdmission";
import UploadAdmissionDocument from "../components/Auth/SignupForm3";
import SignupForm3 from "../components/Auth/SignupForm3";

class AuthNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        } 
    }

    render() {
        const { 
            is_login_form,
            is_choose_form,
            is_signup1_form,
            is_signup2_form,
            is_signup3_form,
            is_activation_form,
            is_school_selection_page,
            is_school_details_page,
            is_school_admission_page
        } = this.props;
        console.log(
            is_login_form,
            is_choose_form,
            is_signup1_form,
            is_signup2_form,
            is_signup3_form,
            is_activation_form,
            is_school_selection_page,
            is_school_details_page,
            is_school_admission_page,
        )
        return (
            <View style={{ flex:1 }}>
                {
                    is_login_form ?
                        <LoginPage />
                    :null
                }
                {
                    is_choose_form ?
                        <ChooseIndex />
                    :null
                }
                {
                    is_school_selection_page ? 
                        <SchoolSelection/>
                    :null
                }
                {
                    is_school_details_page ? 
                        <SchoolDetail />
                    :null
                }
                {
                    is_signup1_form ?
                        <SignupForm1 />
                    :null
                }
                {
                    is_signup2_form ? 
                        <SignupForm2 />
                    :null
                }
                {
                    is_signup3_form ?
                        <SignupForm3 />
                    :null
                }
                {
                    is_activation_form ? 
                        <ConfirmationIndex />
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
        is_login_form                       : state.navigation.is_login_form,
        is_choose_form                      : state.navigation.is_choose_form,
        is_signup1_form                     : state.navigation.is_signup1_form,
        is_signup2_form                     : state.navigation.is_signup2_form,
        is_signup3_form                     : state.navigation.is_signup3_form,
        is_activation_form                  : state.navigation.is_activation_form,
        is_school_selection_page            : state.navigation.is_school_selection_page,
        is_school_details_page              : state.navigation.is_school_details_page,
        is_school_admission_page            : state.navigation.is_school_admission_page,
        is_upload_admission_document_page   : state.navigation.is_upload_admission_document_page,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(AuthNavigation);