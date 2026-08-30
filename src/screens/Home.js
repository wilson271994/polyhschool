import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeIndex from '../components/Home/HomeIndex';
import HomeParent from '../components/Home/Parent/HomeParent';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        state = {}
    };

    render() {
        return (
            < HomeIndex />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Home);