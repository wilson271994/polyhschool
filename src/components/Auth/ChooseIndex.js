import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from '../../assets/styles/index.js';
import { choosestyle } from '../../assets/styles/choose.js';
import { switchLoginFormAction, switchSchoolSelectionAction } from '../../navigations/rootNavigation.js';

const dataaccount = [
    {
        label: 'Étudiant / Élève',
        subtitle: 'Accédez à vos cours, notes, emplois du temps et ressources.',
        value: 'school_student',
        icon: 'school',
    },
    {
        label: 'Parent / Tuteur',
        subtitle: 'Suivez la scolarité, la présence et les paiements de vos enfants.',
        value: 'school_student_tutor',
        icon: 'human-male',
    },
];

class ChooseIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: null,
        };
    }

    componentDidMount() {
        this._PersistData();
    }

    // Restore previously saved user account choice from AsyncStorage
    _PersistData = async () => {
        try {
            const choosedata = await AsyncStorage.getItem('DataChoose');
            if (choosedata) {
                const data = JSON.parse(choosedata);
                const userChoice = data.type_user;
                if (userChoice) {
                    this.setState({ selectedType: userChoice });
                }
            }
        } catch (e) {
            console.error('Error loading account choice:', e);
        }
    };

    // Save selected account type locally
    _selectAccountType = async (value) => {
        this.setState({ selectedType: value });
        try {
            const datachoose = JSON.stringify({ type_user: value });
            await AsyncStorage.setItem('DataChoose', datachoose);
        } catch (e) {
            console.error('Error persisting account choice:', e);
        }
    };

    // Navigate back to the login screen
    _navigateToLogin = () => {
        switchLoginFormAction(true);
    };

    // Validate choice and navigate to school selection step
    _NavigateToForm = async () => {
        const { selectedType } = this.state;

        if (selectedType) {
            switchSchoolSelectionAction(true);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Choix requis',
                text2: 'Veuillez sélectionner un type de compte pour continuer.',
            });
        }
    };

    render() {
        const { is_loading } = this.props;
        const { selectedType } = this.state;

        return (
            <View style={choosestyle.container}>
                <StatusBar barStyle="light-content" backgroundColor="#011638" />

                {/* Ambient Glowing Orbs */}
                <View style={choosestyle.topGlow} />
                <View style={choosestyle.centerGlow} />
                <View style={choosestyle.bottomGlow} />

                <ScrollView
                    contentContainerStyle={choosestyle.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header Bar - Back Button */}
                    <View style={choosestyle.headerRow}>
                        <TouchableOpacity
                            style={choosestyle.backButton}
                            onPress={this._navigateToLogin}
                            activeOpacity={0.7}
                        >
                            <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Institution Logo & Slogan */}
                    <View style={choosestyle.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={choosestyle.logo}
                            resizeMode="contain"
                        />
                        <Text style={[styles.textBold, choosestyle.brandBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, choosestyle.title]}>Créer un compte</Text>
                        <Text style={[styles.text, choosestyle.subtitle]}>
                            Sélectionnez votre profil d'utilisateur pour personnaliser votre expérience.
                        </Text>
                    </View>

                    {/* Interactive Profile Selection Cards */}
                    <View style={choosestyle.cardsContainer}>
                        {dataaccount.map((item) => {
                            const isSelected = selectedType === item.value;
                            return (
                                <TouchableOpacity
                                    key={item.value}
                                    activeOpacity={0.85}
                                    style={[
                                        choosestyle.roleCard,
                                        isSelected && choosestyle.roleCardSelected,
                                    ]}
                                    onPress={() => this._selectAccountType(item.value)}
                                >
                                    <View style={choosestyle.roleHeader}>
                                        <View
                                            style={[
                                                choosestyle.iconContainer,
                                                isSelected && choosestyle.iconContainerSelected,
                                            ]}
                                        >
                                            <MaterialCommunityIcons
                                                name={item.icon}
                                                size={28}
                                                color={isSelected ? '#011638' : '#f6a100'}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                choosestyle.radioButton,
                                                isSelected && choosestyle.radioButtonSelected,
                                            ]}
                                        >
                                            {isSelected && <Entypo name="check" size={14} color="#011638" />}
                                        </View>
                                    </View>

                                    <Text
                                        style={[
                                            styles.textBold,
                                            choosestyle.roleTitle,
                                            isSelected && choosestyle.roleTitleSelected,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    <Text style={[styles.text, choosestyle.roleDescription]}>
                                        {item.subtitle}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Master CTA Button */}
                    <TouchableOpacity
                        onPress={this._NavigateToForm}
                        style={[
                            choosestyle.button,
                            !selectedType && choosestyle.buttonDisabled,
                            is_loading && { opacity: 0.7 },
                        ]}
                        disabled={is_loading || !selectedType}
                        activeOpacity={0.85}
                    >
                        {is_loading ? (
                            <ActivityIndicator size="small" color="#011638" />
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textBold, choosestyle.buttonText]}>Continuer</Text>
                                <Entypo name="arrow-right" size={18} color="#011638" style={{ marginLeft: 8 }} />
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Login Link */}
                    <TouchableOpacity
                        onPress={this._navigateToLogin}
                        style={{ marginTop: 24 }}
                    >
                        <Text style={[styles.text, choosestyle.loginLinkText]}>
                            Vous avez déjà un compte ?{' '}
                            <Text style={[styles.textBold, choosestyle.loginLinkBold]}>Se connecter</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            switchLoginFormAction,
            switchSchoolSelectionAction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIndex);