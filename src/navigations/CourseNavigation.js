// ./routes/StackNavigator.js
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from "react-native";
import Courses from "../screens/Courses";
import VideoIndex from "../components/Courses/VideoIndex";
import AdvanceCoursFilter from "../components/Courses/AdvanceCoursFilter";
import Course_Parent_Page from "../components/Courses/Course_Parent_Page";

class CourseNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        } 
    }

    render() {
        const { 
            is_course_home,
            is_video_page,
            is_advance_course_search,
            is_course_parent_page,
        } = this.props;
        return (
            <View style={{ flex:1 }}>
                {
                    is_course_home ?
                        <Courses />
                    :null
                }
                {
                    is_video_page ?
                        <VideoIndex />
                    :null
                }
                {
                    is_advance_course_search ?
                        <AdvanceCoursFilter />
                    :null
                }
                {
                    is_course_parent_page ?
                        <Course_Parent_Page />
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
        is_course_home                  : state.navigation.is_course_home,
        is_video_page                   : state.navigation.is_video_page,
        is_advance_course_search        : state.navigation.is_advance_course_search,
        is_course_parent_page           : state.navigation.is_course_parent_page

    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CourseNavigation);