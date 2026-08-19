// ./routes/StackNavigator.js
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from "react-native";
import Course_history from "../screens/Course_history";
import CourseDetails from "../components/Course-history/CourseDetails";
import Parent_Course_History_Page from "../components/Course-history/Parent_Course_History_Page";

class CourseHistoryNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        } 
    }

    render() {
        const { 
            is_course_history_home,
            is_course_detail_page,
            is_parent_course_history_page
        } = this.props;
        return (
            <View style={{ flex:1 }}>
                {
                    is_course_history_home ?
                        <Course_history />
                    :null
                }
                {
                    is_course_detail_page ?
                        <CourseDetails />
                    :null
                }
                {
                    is_parent_course_history_page ?
                        <Parent_Course_History_Page />
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
        is_course_detail_page           : state.navigation.is_course_detail_page,
        is_course_history_home          : state.navigation.is_course_history_home,
        is_parent_course_history_page   : state.navigation.is_parent_course_history_page,

    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CourseHistoryNavigation);