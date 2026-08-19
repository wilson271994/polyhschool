import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import MessageIndex from '../components/Message/MessageIndex.js';

class Messages extends PureComponent {
    constructor(props){
        super(props); 
        state = {}
    };

    componentDidMount(){
    } 

    render(){
        return(
            <MessageIndex /> 
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

export default connect(mapStateToProps, mapDispatchToProps, null)(Messages);