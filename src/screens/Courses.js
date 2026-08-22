import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CoursesIndex from '../components/Courses/CoursesIndex.js';
import Course_Parent_Page from '../components/Courses/Course_Parent_Page.js';

class Courses extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCoursesIndex    : true,
            selectedChild       : null,
        };
    }

    _navigateToCoursesIndex = (child) => {
        this.setState({
            showCoursesIndex: true,
            selectedChild: child,
        });
    }

    _navigateBackToParent = () => {
        this.setState({
            showCoursesIndex: false,
            selectedChild: null,
        });
    }

    render() {
        const { is_parent } = this.props;
        const { showCoursesIndex } = this.state;
        console.log(showCoursesIndex, 'dddd')
        if (showCoursesIndex) {
            return (
                <CoursesIndex
                    onBack={this._navigateBackToParent}
                    selectedChild={this.state.selectedChild}
                />
            );
        }

        if (is_parent) {
            return (
                <Course_Parent_Page 
                    onNavigateToCourses={this._navigateToCoursesIndex} 
                />
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({}, dispatch),
});

const mapStateToProps = (state) => ({
    is_parent: state.auth.is_parent
});

export default connect(mapStateToProps, mapDispatchToProps, null)(Courses);