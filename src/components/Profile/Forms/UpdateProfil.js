import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput, Animated, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../../../assets/styles/index.js';
import Toast from 'react-native-toast-message';
import Foundation from 'react-native-vector-icons/Foundation';
import { checkAuthDataAction, UpdateProfilAction } from '../../../reducers/actions/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UpdateProfil extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            countryFocus: false,
            country: '',
            cityFocus: false,
            city: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            scrollY: new Animated.Value(0),
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this._fetchNecessaryData();
    }

    _fetchNecessaryData = () => {
        const { user_infos, site_infos } = this.props;

        
        this.setState({
            country             : user_infos.country,
            city                : user_infos.city,
            first_name          : user_infos.first_name,
            last_name           : user_infos.last_name,
            phone               : user_infos.phone,
            email               : user_infos.email
        })
        checkAuthDataAction();
    }

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    }

    _toggleCountry = (item) => {
        this.setState({ country: item.id })
        this.setState({ cities: item.cities });
    }

    _updateProfil = () => {
        const { navigation, user_token } = this.props;
        const { first_name, last_name, phone, email, country, city } = this.state;

        const formdata = new FormData();

        formdata.append('token', user_token);
        formdata.append('first_name', first_name);
        formdata.append('last_name', last_name);
        formdata.append('email', email);
        formdata.append('phone', phone);
        formdata.append('country', country);
        formdata.append('city', city?.id || city || '');

        console.log('FormData prêt pour envoi:', {
            _parts: formdata._parts.map(part => ({
                champ: part[0],
                valeur: part[1]
            }))
        });

        UpdateProfilAction(formdata, navigation);
    }

    _toggleCountry = (item) => {
        if (!item || !item.id) return;
        this.setState({
            country: item.id,
            cities: item.cities || []
        });
    }

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[profilstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={profilstyle.headerSection}>
                        <View style={profilstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={profilstyle.headerButton}
                                onPress={this._navigateToProfil}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={profilstyle.headertext}>
                            <Text style={[profilstyle.headerTitle, styles.textBold]}>Informations Personnelles</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };
    render() {
        const { user_infos, is_loading, site_infos } = this.props;
        const {
            countryFocus,
            country,
            cityFocus,
            city,
            cities,
            first_name,
            last_name,
            email,
            phone,
        } = this.state;
        
        const countriesUnavailable = !site_infos?.countries?.length;

        return (
            <View style={profilstyle.containerform}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={profilstyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={profilstyle.headerform}>
                            <View style={profilstyle.section}>
                                <View style={styles.section}>
                                    <View style={styles.back}>
                                        <TouchableOpacity onPress={this._navigateToProfil}>
                                            <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.sectionTitle, styles.textBold]}>Informations personnelles</Text>
                                </View>
                            </View>
                        </View>

                        <View style={profilstyle.formcontainer}>
                        
                            <View style={profilstyle.formitem}>
                                <Text style={[styles.text, profilstyle.label]}>Nom</Text>
                                <TextInput
                                    style={[profilstyle.inputContainer, styles.textBold, profilstyle.inputext]}
                                    placeholder="Saisir votre nom"
                                    placeholderTextColor='#FFF'
                                    onChangeText={text => this.setState({ first_name: text })}
                                    value={first_name}
                                />
                            </View>

                            <View style={profilstyle.formitem}>
                                <Text style={[styles.text, profilstyle.text]}>Prenom</Text>
                                <TextInput
                                    style={[profilstyle.inputContainer, styles.textBold, profilstyle.inputext]}
                                    placeholder="Saisir votre prenom"
                                    placeholderTextColor='#FFF'
                                    onChangeText={text => this.setState({ last_name: text })}
                                    value={last_name}
                                />
                            </View>

                            <View style={profilstyle.formitem}>
                                <Text style={[styles.text, profilstyle.label]}>Téléphone</Text>
                                <TextInput
                                    style={[profilstyle.inputContainer, styles.textBold, profilstyle.inputext]}
                                    placeholder="Saisir votre numéro de téléphone"
                                    placeholderTextColor='#FFF'
                                    onChangeText={text => this.setState({ phone: text })}
                                    keyboardType="numeric"
                                    value={phone}
                                />
                            </View>

                            <View style={profilstyle.formitem}>
                                <Text style={[styles.text, profilstyle.label, profilstyle.inputext]}>Adresse email</Text>
                                <TextInput
                                    style={[profilstyle.inputContainer, styles.textBold, profilstyle.inputext]}
                                    placeholder="Saisir votre adresse email"
                                    placeholderTextColor='#FFF'
                                    onChangeText={text => this.setState({ phone: text })}
                                    keyboardType="email-address"
                                    value={email}
                                />
                            </View>

                            <View style={profilstyle.formitem}>
                                <Text style={[styles.text, profilstyle.label]}>Votre pays de résidence</Text>
                                <Dropdown
                                    style={[styles.text, profilstyle.inputContainer, countryFocus]}
                                    placeholderStyle={[profilstyle.placeholderStyle, styles.text]}
                                    selectedTextStyle={[profilstyle.selectedTextStyle, styles.textBold]}
                                    itemTextStyle={[profilstyle.itemTextStyle, styles.text]}
                                    containerStyle={profilstyle.containeritemdrop}
                                    iconStyle={profilstyle.iconStyle}
                                    dropdownPosition='auto'
                                    data={countriesUnavailable ? [] : site_infos.countries}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={countriesUnavailable ? '⚠ Connexion instable...' : (!countryFocus ? 'Choisir votre Pays de résidence' : '...')}
                                    value={country}
                                    onFocus={() => this.setState({ countryFocus: true })}
                                    onBlur={() => this.setState({ countryFocus: false })}
                                    onChange={item => this._toggleCountry(item)}
                                    renderLeftIcon={() => (<Foundation name='flag' color="#FFF"/>)}
                                    disable={countriesUnavailable}
                                    onPress={() => { }}
                                />
                            </View>

                            <View style={profilstyle.formitem}>
                                <Text style={[styles.text, profilstyle.label]}>Votre ville de résidence</Text>
                                <Dropdown
                                    style={[styles.text, profilstyle.inputContainer, cityFocus]}
                                    placeholderStyle={[profilstyle.placeholderStyle, styles.text]}
                                    selectedTextStyle={[profilstyle.selectedTextStyle, styles.textBold]}
                                    itemTextStyle={[profilstyle.itemTextStyle, styles.text]}
                                    containerStyle={profilstyle.containeritemdrop}
                                    iconStyle={profilstyle.iconStyle}
                                    dropdownPosition='auto'
                                    data={cities}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={!cityFocus ? 'Choisir votre Ville de résidence' : '...'}
                                    value={city}
                                    onFocus={() => this.setState({ cityFocus: true })}
                                    onBlur={() => this.setState({ cityFocus: false })}
                                    onChange={item => this.setState({ city: item })}
                                    renderLeftIcon={() => (<Foundation name='map' color="#FFF" />)}
                                    disable={false}
                                    onPress={() => { }}
                                />
                            </View>

                            <TouchableOpacity onPress={this._updateProfil}
                                style={profilstyle.submitButton}
                                disabled={is_loading ? true : false}
                            >
                                {
                                    is_loading ?
                                        <ActivityIndicator size="small" color="#fff" />
                                        :
                                        <Text style={[styles.textBold, profilstyle.submitBtnText]}>Enregistrer</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 60 }} />
                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            checkAuthDataAction,
            switchProfilPageAction,
            UpdateProfilAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        is_loading      : state.loader.is_loading,
        user_infos      : state.auth.user_infos,
        user_token      : state.auth.user_token,
        site_infos      : state.auth.site_infos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(UpdateProfil);