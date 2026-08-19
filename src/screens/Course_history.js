import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import CourseHistory from '../components/Course-history/Course-history.js';
import Parent_Course_History_Page from '../components/Course-history/Parent_Course_History_Page.js';

class Course_history extends PureComponent {
    constructor(props){
        super(props); 
        this.state = {
            showCourseHistory   : false,
            selectedChild       : null,
        }
    };



    _navigateToCourseHistory = (child)  => {
        this.setState({
            showCourseHistory   : true,
            selectedChild       : child,
        });
    }

    _navigateBackToParent = () => {
        this.setState({
            showCourseHistory   : false,
            selectedChild       : null,
        });
    }

    _loadData = () => {
    }

    render(){
        const { is_parent }             = this.props
        const { showCourseHistory }     = this.state;

        if(showCourseHistory){
            return (
                <CourseHistory
                onBack={this._navigateBackToParent}
                selectedChild={this.state.selectedChild}
                />
            );
        }

        if(is_parent) {
            return (
                <CourseHistory onBack={null} />
            );
        }

        return(
            <Parent_Course_History_Page
            onNavigateToCourses={this._navigateToCourseHistory}
            /> 
        )
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        state,
        is_parent       : state.auth.is_parent
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Course_history);