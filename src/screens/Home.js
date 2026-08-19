import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeIndex from '../components/Home/HomeIndex';
import HomeParent from '../components/Home/Parent/HomeParent';

class Course_history extends PureComponent {
    constructor(props) {
        super(props);
        state = {}
    };

    componentDidMount() {
    }

    _loadData = () => {
    }

    render() {
        const { is_parent } = this.props
        return (
            is_parent ?
                <>
                    < HomeParent />
                </>
            :
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
        is_parent: state.auth.is_parent
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Course_history);