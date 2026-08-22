import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../../assets/styles/index.js';
import { descriptionstyle } from '../../../assets/styles/description.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

class AddDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.user_infos?.description || '',
            maxLength: 180,
            isFocused: false,
        };
    }

    _navigateToProfil = () => {
        Keyboard.dismiss();
        switchProfilPageAction(true);
    };

    handleSave = () => {
        const { description } = this.state;
        if (description.trim().length === 0) return;

        Keyboard.dismiss();
        // Action de mise à jour si nécessaire, puis retour
        this._navigateToProfil();
    };

    render() {
        const { description, maxLength, isFocused } = this.state;
        const charactersLeft = maxLength - description.length;
        const hasDescription = description.trim().length > 0;

        // Détermination de la couleur du compteur
        let counterColor = COLORS.textMuted;
        if (charactersLeft <= 20) counterColor = '#F59E0B'; // Avertissement
        if (charactersLeft <= 5) counterColor = '#EF4444';  // Limite atteinte

        return (
            <SafeAreaView style={descriptionstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Orbes d'ambiance Poly-H */}
                <View style={descriptionstyle.topGlow} pointerEvents="none" />
                <View style={descriptionstyle.bottomGlow} pointerEvents="none" />

                {/* Header Bar */}
                <View style={descriptionstyle.headerNav}>
                    <TouchableOpacity
                        style={descriptionstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={descriptionstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, descriptionstyle.headerTitle]}>Ma Biographie</Text>
                    </View>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={descriptionstyle.keyboardView}
                >
                    <View style={descriptionstyle.contentWrapper}>
                        {/* Card de Saisie */}
                        <View style={[descriptionstyle.inputCard, isFocused && descriptionstyle.inputCardFocused]}>
                            <View style={descriptionstyle.cardHeader}>
                                <View style={descriptionstyle.titleRow}>
                                    <Icon name="text-account" size={22} color={COLORS.accentGold} />
                                    <Text style={[styles.textBold, descriptionstyle.cardTitle]}>À propos de vous</Text>
                                </View>

                                {/* Compteur de caractères */}
                                <Text style={[styles.textBold, descriptionstyle.characterCount, { color: counterColor }]}>
                                    {description.length} / {maxLength}
                                </Text>
                            </View>

                            <TextInput
                                style={[styles.text, descriptionstyle.textInput]}
                                multiline
                                placeholder="Rédigez une courte présentation pour votre profil académique..."
                                placeholderTextColor={COLORS.textMuted}
                                value={description}
                                onChangeText={(text) => this.setState({ description: text })}
                                maxLength={maxLength}
                                textAlignVertical="top"
                                onFocus={() => this.setState({ isFocused: true })}
                                onBlur={() => this.setState({ isFocused: false })}
                                autoFocus={true}
                            />
                        </View>

                        <Text style={[styles.text, descriptionstyle.helpText]}>
                            Cette description sera visible par les membres et l'administration de votre établissement.
                        </Text>
                    </View>

                    {/* Bouton Enregistrer au-dessus du clavier */}
                    <View style={descriptionstyle.bottomSaveContainer}>
                        <TouchableOpacity
                            onPress={this.handleSave}
                            style={[
                                descriptionstyle.saveButton,
                                hasDescription ? descriptionstyle.saveButtonActive : descriptionstyle.saveButtonInactive,
                            ]}
                            disabled={!hasDescription}
                            activeOpacity={0.85}
                        >
                            <Icon
                                name="check-circle-outline"
                                size={20}
                                color={hasDescription ? COLORS.textDark : COLORS.textMuted}
                                style={{ marginRight: 8 }}
                            />
                            <Text
                                style={[
                                    styles.textBold,
                                    hasDescription ? descriptionstyle.saveTextActive : descriptionstyle.saveTextInactive,
                                ]}
                            >
                                Enregistrer ma bio
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        { switchProfilPageAction },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDescription);