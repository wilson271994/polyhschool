import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Animated,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

import { styles } from '../../../assets/styles/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { checkAuthDataAction, UpdateProfilAction } from '../../../reducers/actions/index.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

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
        const { user_infos } = this.props;
        if (user_infos) {
            this.setState({
                country: user_infos.country || '',
                city: user_infos.city || '',
                first_name: user_infos.first_name || '',
                last_name: user_infos.last_name || '',
                phone: user_infos.phone || '',
                email: user_infos.email || '',
            });
        }
        checkAuthDataAction();
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    _toggleCountry = (item) => {
        if (!item || !item.id) return;
        this.setState({
            country: item.id,
            cities: item.cities || [],
            city: '', // Réinitialise la ville au changement de pays
        });
    };

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

        UpdateProfilAction(formdata, navigation);
    };

    render() {
        const { is_loading, site_infos } = this.props;
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
            <SafeAreaView style={profilstyle.containerform}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Orbes d'ambiance Poly-H */}
                <View style={profilstyle.topGlow} pointerEvents="none" />
                <View style={profilstyle.bottomGlow} pointerEvents="none" />

                {/* Navigation Header Bar */}
                <View style={profilstyle.headerNav}>
                    <TouchableOpacity
                        style={profilstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={profilstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, profilstyle.headerTitle]}>Informations Personnelles</Text>
                    </View>
                </View>

                <Animated.ScrollView
                    contentContainerStyle={profilstyle.scrollContent}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={profilstyle.formContainer}>
                        {/* Nom */}
                        <View style={profilstyle.cardItem}>
                            <View style={profilstyle.fieldHeader}>
                                <Icon name="account-outline" size={20} color={COLORS.accentGold} />
                                <Text style={[styles.textBold, profilstyle.label]}>Nom de famille</Text>
                            </View>
                            <TextInput
                                style={[styles.text, profilstyle.textInput]}
                                placeholder="Saisir votre nom"
                                placeholderTextColor={COLORS.textMuted}
                                onChangeText={(text) => this.setState({ first_name: text })}
                                value={first_name}
                            />
                        </View>

                        {/* Prénom */}
                        <View style={profilstyle.cardItem}>
                            <View style={profilstyle.fieldHeader}>
                                <Icon name="account-details-outline" size={20} color={COLORS.accentCyan} />
                                <Text style={[styles.textBold, profilstyle.label]}>Prénom</Text>
                            </View>
                            <TextInput
                                style={[styles.text, profilstyle.textInput]}
                                placeholder="Saisir votre prénom"
                                placeholderTextColor={COLORS.textMuted}
                                onChangeText={(text) => this.setState({ last_name: text })}
                                value={last_name}
                            />
                        </View>

                        {/* Téléphone */}
                        <View style={profilstyle.cardItem}>
                            <View style={profilstyle.fieldHeader}>
                                <Icon name="phone-outline" size={20} color={COLORS.accentGold} />
                                <Text style={[styles.textBold, profilstyle.label]}>Numéro de téléphone</Text>
                            </View>
                            <TextInput
                                style={[styles.text, profilstyle.textInput]}
                                placeholder="Ex: 6XXXXXXXX"
                                placeholderTextColor={COLORS.textMuted}
                                onChangeText={(text) => this.setState({ phone: text })}
                                keyboardType="numeric"
                                value={phone}
                            />
                        </View>

                        {/* Email */}
                        <View style={profilstyle.cardItem}>
                            <View style={profilstyle.fieldHeader}>
                                <Icon name="email-outline" size={20} color={COLORS.accentCyan} />
                                <Text style={[styles.textBold, profilstyle.label]}>Adresse email</Text>
                            </View>
                            <TextInput
                                style={[styles.text, profilstyle.textInput]}
                                placeholder="exemple@poly-h.com"
                                placeholderTextColor={COLORS.textMuted}
                                onChangeText={(text) => this.setState({ email: text })}
                                keyboardType="email-address"
                                value={email}
                            />
                        </View>

                        {/* Pays */}
                        <View style={profilstyle.cardItem}>
                            <View style={profilstyle.fieldHeader}>
                                <Foundation name="flag" size={18} color={COLORS.accentGold} />
                                <Text style={[styles.textBold, profilstyle.label]}>Pays de résidence</Text>
                            </View>
                            <Dropdown
                                style={[profilstyle.dropdown, countryFocus && profilstyle.dropdownFocus]}
                                placeholderStyle={profilstyle.dropdownPlaceholder}
                                selectedTextStyle={profilstyle.dropdownSelectedText}
                                itemTextStyle={profilstyle.dropdownItemText}
                                itemContainerStyle={profilstyle.dropdownItemContainer}
                                containerStyle={profilstyle.dropdownMenu}
                                activeColor="rgba(255, 179, 0, 0.2)"
                                data={countriesUnavailable ? [] : site_infos.countries}
                                labelField="name"
                                valueField="id"
                                placeholder={
                                    countriesUnavailable
                                        ? 'Chargement des pays...'
                                        : 'Sélectionner votre pays'
                                }
                                value={country}
                                onFocus={() => this.setState({ countryFocus: true })}
                                onBlur={() => this.setState({ countryFocus: false })}
                                onChange={(item) => this._toggleCountry(item)}
                                disable={countriesUnavailable}
                            />
                        </View>

                        {/* Ville */}
                        <View style={profilstyle.cardItem}>
                            <View style={profilstyle.fieldHeader}>
                                <Foundation name="map" size={18} color={COLORS.accentCyan} />
                                <Text style={[styles.textBold, profilstyle.label]}>Ville de résidence</Text>
                            </View>
                            <Dropdown
                                style={[profilstyle.dropdown, cityFocus && profilstyle.dropdownFocus]}
                                placeholderStyle={profilstyle.dropdownPlaceholder}
                                selectedTextStyle={profilstyle.dropdownSelectedText}
                                itemTextStyle={profilstyle.dropdownItemText}
                                itemContainerStyle={profilstyle.dropdownItemContainer}
                                containerStyle={profilstyle.dropdownMenu}
                                activeColor="rgba(54, 209, 220, 0.2)"
                                data={cities}
                                labelField="name"
                                valueField="id"
                                placeholder="Sélectionner votre ville"
                                value={city}
                                onFocus={() => this.setState({ cityFocus: true })}
                                onBlur={() => this.setState({ cityFocus: false })}
                                onChange={(item) => this.setState({ city: item })}
                            />
                        </View>

                        {/* Bouton de soumission */}
                        <TouchableOpacity
                            onPress={this._updateProfil}
                            style={profilstyle.submitButton}
                            activeOpacity={0.85}
                            disabled={is_loading}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color={COLORS.textDark} />
                            ) : (
                                <Text style={[styles.textBold, profilstyle.submitBtnText]}>
                                    Enregistrer les modifications
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </Animated.ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            checkAuthDataAction,
            switchProfilPageAction,
            UpdateProfilAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
    site_infos: state.auth.site_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfil);