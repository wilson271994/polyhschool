import React, { PureComponent } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { styles } from '../../assets/styles';
import { choosestyle } from '../../assets/styles/choose.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { switchHomePageAction, switchStudentChoolSelectedPageAction } from '../../navigations/rootNavigation.js';

const dataaccount = [
    { label: 'Parent/Tuteur', value: 'school_student_tutor' },
    { label: 'Etudiant', value: 'school_student' },
];

class Choose_account extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type_user: null,
            isFocus: false,
        };
    }

    componentDidMount() {
        this._PersistData();
    }

    _PersistData = async () => {
        const choosedata = await AsyncStorage.getItem('DataChoose');
        if (choosedata) {
            const data = JSON.parse(choosedata);
            this.setState({ type_user: data.type_user ? { value: data.type_user } : null });
        }
    };

    _navigateToHome = () => {
        switchHomePageAction(true);
    };

    _NavigateToForm = async () => {
        const { type_user } = this.state;

        if (type_user?.value) {
            const datachoose = JSON.stringify({ type_user: type_user.value });
            await AsyncStorage.setItem('DataChoose', datachoose);
            switchStudentChoolSelectedPageAction(true);
        } else {
            Toast.show({
                type: 'error',
                props: {
                    title: 'Une erreur s\'est produite !',
                    description: 'Veuillez renseigner votre type d\'utilisateur.',
                }
            });
        }
    };

    render() {
        const { is_loading } = this.props;
        const { type_user, isFocus } = this.state;

        return (
            <View style={choosestyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <ScrollView contentContainerStyle={choosestyle.scrollContainer}>
                        <View style={choosestyle.back}>
                            <TouchableOpacity onPress={this._navigateToHome}>
                                <Image style={choosestyle.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={choosestyle.logoContainer}>
                            <Image source={require('../../assets/images/logo.png')} style={choosestyle.logo} />
                            <Text style={[choosestyle.slogan, styles.textBold]}>Beyond imagination</Text>
                        </View>

                        <View style={[choosestyle.inputRow, styles.textBold]}>
                            <View style={choosestyle.dropdownWrapper}>
                                <Image source={require('../../assets/images/profil.png')} style={choosestyle.icon} resizeMode="contain" />
                                <Dropdown
                                    style={[choosestyle.dropdown, isFocus && { borderColor: '#007AFF' }]}
                                    placeholderStyle={choosestyle.placeholderStyle}
                                    selectedTextStyle={choosestyle.selectedTextStyle}
                                    itemTextStyle={choosestyle.itemTextStyle}
                                    data={dataaccount}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Choisir votre compte..."
                                    value={type_user}
                                    onFocus={() => this.setState({ isFocus: true })}
                                    onBlur={() => this.setState({ isFocus: false })}
                                    onChange={item => this.setState({ type_user: item })}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            onPress={this._NavigateToForm}
                            style={choosestyle.button}
                            disabled={is_loading}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={[styles.textBold, choosestyle.buttonText]}>Continuer</Text>
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    switchHomePageAction,
    switchStudentChoolSelectedPageAction,
}, dispatch);

const mapStateToProps = (state) => ({ is_loading: state.loader.is_loading });

export default connect(mapStateToProps, mapDispatchToProps)(Choose_account);