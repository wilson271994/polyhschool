import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {View, Text,TouchableOpacity, Image, TextInput, StyleSheet, Modal, Platform, SafeAreaView, Switch, Button, ActivityIndicator, ImageBackground, ScrollView, Linking, TouchableHighlight} from 'react-native';
import Moment from 'moment';
import { SectionGrid } from 'react-native-super-grid';
import 'moment/locale/fr';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker'; // Pour les listes déroulantes
import { IS_AUTH_ERROR, PAGE_TITLE, ROOT_NAVIGATION } from '../../../reducers/actions/types.js';
import FontAwesome6  from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons.js';
import {switchHeaderAction} from '../../../reducers/actions/index.js';
import { styles } from '../../../assets/styles/index.js';


class VideoIndex extends PureComponent {

  constructor(props){
    super(props); 
    this.state = {
        is_loading:false,
        searchText : 
        '',
    };

};

  state = {
    notificationsEnabled: true,
    backgroundPlayEnabled: false,
    autoplayEnabled: true,
    darkModeEnabled: false,
  };

  toggleSwitch = (name) => {
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  };

  _navigateToSupport = () => {
    const {navigation} = this.props; 
    store.dispatch({type:ROOT_NAVIGATION, value:navigation});
    navigation.navigate('Support');
}


_closeAlert = () => {
  this.setState({
      is_alert:false,
      is_loading:false
  });
  store.dispatch({type:IS_AUTH_ERROR, value:false});
}

_fechtData = async () => {
  await switchHeaderAction(true);  


} 

  render() {
    const {is_alert, alert_title, alert_subtitle, is_loading} = this.state;
    const {navigation} = this.props; 
    return (
        <SafeAreaView style={videostyle.container2}>
            <View style={videostyle.container2}>
                <ScrollView contentContainerStyle={videostyle.scrollContainer}>

                    <ScrollView style={videostyle.scroll}>
                         
                        <View style={videostyle.state}>
                            <TouchableOpacity>
                                <View style={videostyle.visio}>
                                    <Text style={videostyle.text}>Regardez</Text>
                                    <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.Image} />

                                </View>
                            </TouchableOpacity>
                        </View>   

                        <View style={videostyle.state}>
                            <TouchableOpacity>
                                <View style={videostyle.visio}>
                                    <Text style={videostyle.text}>Regardez</Text>
                                    <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.Image} />

                                </View>
                            </TouchableOpacity>
                        </View>          
                    </ScrollView>


                    <ScrollView horizontal>
                        

                        <View style={{ flexDirection: 'row' }}>
                            {Array(1).fill(0).map((_, index) => (
                                <TouchableOpacity key={index} style={videostyle.videoItem}>
                                    <View style={videostyle.containervideo}>
                                            <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.image} />
                                            <View style={videostyle.videoContainer}>
                                                <View style={videostyle.see}>
                                                    <Text style={videostyle.text}>Regardez</Text>
                                                </View>
                                            </View>                                    
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            {Array(1).fill(0).map((_, index) => (
                                <TouchableOpacity key={index} style={videostyle.videoItem}>
                                    <View style={videostyle.containervideo}>
                                            <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.image} />
                                            <View style={videostyle.videoContainer}>
                                                <View style={videostyle.see}>
                                                    <Text style={videostyle.text} >Regardez</Text>
                                                </View>
                                            </View>                                    
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            {Array(1).fill(0).map((_, index) => (
                                <TouchableOpacity key={index} style={videostyle.videoItemItem}>
                                    <View style={videostyle.containervideo}>
                                            <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.image} />
                                            <View style={videostyle.videoContainer}>
                                                <View style={videostyle.see}>
                                                    <Text style={videostyle.text} >Regardez</Text>
                                                </View>
                                            </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </ScrollView >

                    <View style={videostyle.contain}>

                        <View style={videostyle.state}>
                            <TouchableOpacity>
                                <View style={videostyle.visio}>
                                    <Text style={videostyle.text}>Regardez</Text>
                                    <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.Image} />

                                </View>
                            </TouchableOpacity>
                        </View>  

                        <View style={videostyle.state}>
                            <TouchableOpacity>
                                <View style={videostyle.visio}>
                                    <Text style={videostyle.text}>Regardez</Text>
                                    <Image  source={require('../../../assets/images/lion.jpg')} style={videostyle.Image} />

                                </View>
                            </TouchableOpacity>
                        </View> 

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>


     
    );
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

export default connect(mapStateToProps, mapDispatchToProps, null)(VideoIndex);