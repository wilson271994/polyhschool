import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { ImageBackground,View } from 'react-native';
import 'moment/locale/fr';
import Swiper from 'react-native-swiper'
import cover from '../../../assets/images/biblio.jpg';

import { parentstyle } from '../../../assets/styles/parent.js';

const child_list = [
    {
        'id'    : 1,
        'name' : 'Favorit book one',
        'label' : 'favorit',
        'cover' : require('../../../assets/images/biblio.jpg')
    },
    {
        'id'    : 2,
        'name' : 'Favorit book two',
        'label' : 'favorit',
        'cover' : require('../../../assets/images/biblio.jpg')
    },
    {
        'id'    : 2,
        'name' : 'Favorit book three',
        'label' : 'favorit',
        'cover' : require('../../../assets/images/biblio.jpg')
    }
]

class ParentBanner extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
        }
    };

    render(){
        const {is_loading} = this.props;
        return( 
            <View style={[parentstyle.container3]}>
                {
                    child_list.length > 0 ?
                        <Swiper 
                            style={parentstyle.containerbanner}
                            showsButtons={true}
                            autoplay={true}
                            autoplayTimeout={5}
                            scrollEnabled
                            dot={false}
                            containerStyle={parentstyle.swiperstyle}>
                                {
                                    child_list ?
                                        child_list.map((item, i) => 
                                            <View style={parentstyle.bannerchild} key={i}>
                                                <ImageBackground
                                                    key={i}
                                                    source={item.cover}
                                                    style={parentstyle.backgroundimagebanner}
                                                />
                                            </View>
                                         
                                    )
                                    :null
                                }
                        </Swiper>
                    :null
                }

            </View>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(ParentBanner);