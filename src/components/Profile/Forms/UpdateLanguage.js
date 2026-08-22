import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Alert,
    TextInput,
    Modal,
    ScrollView,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { styles } from '../../../assets/styles/index.js';
import { languagestyle } from '../../../assets/styles/updatelanguage.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français', region: 'Europe / Afrique' },
    { code: 'en', name: 'English', flag: '🇬🇧', native: 'English', region: 'International' },
];

const currencies = [
    { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', flag: '🌍', region: 'africa' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', region: 'europe' },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', region: 'america' },
];

class UpdateLanguage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'fr',
            selectedCurrency: 'XOF',
            languageModalVisible: false,
            currencyModalVisible: false,
            languageSearchText: '',
            currencySearchText: '',
            currencyFilter: 'all',
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    selectLanguage = (code) => {
        this.setState({ selectedLanguage: code, languageModalVisible: false, languageSearchText: '' });
    };

    selectCurrency = (code) => {
        this.setState({ selectedCurrency: code, currencyModalVisible: false, currencySearchText: '' });
    };

    savePreferences = () => {
        const { selectedLanguage, selectedCurrency } = this.state;
        const selectedLang = languages.find((l) => l.code === selectedLanguage);
        const selectedCurr = currencies.find((c) => c.code === selectedCurrency);

        Alert.alert(
            "✨ Préférences sauvegardées",
            `🌐 Langue : ${selectedLang.name}\n💰 Devise : ${selectedCurr.name} (${selectedCurr.symbol})\n\nVos paramètres régionaux ont été mis à jour.`,
            [{ text: "Compris", onPress: this._navigateToProfil }]
        );
    };

    getFilteredLanguages = () => {
        const { languageSearchText } = this.state;
        return languages.filter(
            (lang) =>
                lang.name.toLowerCase().includes(languageSearchText.toLowerCase()) ||
                lang.native.toLowerCase().includes(languageSearchText.toLowerCase()) ||
                lang.code.toLowerCase().includes(languageSearchText.toLowerCase())
        );
    };

    getFilteredCurrencies = () => {
        const { currencySearchText, currencyFilter } = this.state;
        let filtered = currencies;

        if (currencyFilter !== 'all') {
            filtered = currencies.filter((curr) => curr.region === currencyFilter);
        }

        return filtered.filter(
            (currency) =>
                currency.name.toLowerCase().includes(currencySearchText.toLowerCase()) ||
                currency.code.toLowerCase().includes(currencySearchText.toLowerCase()) ||
                currency.symbol.toLowerCase().includes(currencySearchText.toLowerCase())
        );
    };

    renderLanguageModal = () => {
        const { languageModalVisible, languageSearchText, selectedLanguage } = this.state;
        const filteredLanguages = this.getFilteredLanguages();

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={languageModalVisible}
                onRequestClose={() => this.setState({ languageModalVisible: false })}
            >
                <View style={languagestyle.modalOverlay}>
                    <View style={languagestyle.modalContainer}>
                        <View style={languagestyle.modalHeader}>
                            <Text style={[styles.textBold, languagestyle.modalTitle]}>🌐 Choisir une langue</Text>
                            <TouchableOpacity onPress={() => this.setState({ languageModalVisible: false })}>
                                <Icon name="close" size={24} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={languagestyle.searchContainer}>
                            <Icon name="magnify" size={20} color={COLORS.textMuted} />
                            <TextInput
                                style={[styles.text, languagestyle.searchInput]}
                                placeholder="Rechercher une langue..."
                                placeholderTextColor={COLORS.textMuted}
                                value={languageSearchText}
                                onChangeText={(text) => this.setState({ languageSearchText: text })}
                            />
                        </View>

                        <ScrollView style={languagestyle.modalList}>
                            {filteredLanguages.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    style={[
                                        languagestyle.modalItem,
                                        selectedLanguage === lang.code && languagestyle.modalItemSelected,
                                    ]}
                                    onPress={() => this.selectLanguage(lang.code)}
                                >
                                    <Text style={languagestyle.modalFlag}>{lang.flag}</Text>
                                    <View style={languagestyle.modalItemInfo}>
                                        <Text style={[styles.textBold, languagestyle.modalItemName]}>{lang.name}</Text>
                                        <Text style={[styles.text, languagestyle.modalItemNative]}>{lang.native}</Text>
                                    </View>
                                    {selectedLanguage === lang.code && (
                                        <Icon name="check-circle" size={20} color={COLORS.accentGold} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    renderCurrencyModal = () => {
        const { currencyModalVisible, currencySearchText, currencyFilter, selectedCurrency } = this.state;
        const filteredCurrencies = this.getFilteredCurrencies();

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={currencyModalVisible}
                onRequestClose={() => this.setState({ currencyModalVisible: false })}
            >
                <View style={languagestyle.modalOverlay}>
                    <View style={languagestyle.modalContainer}>
                        <View style={languagestyle.modalHeader}>
                            <Text style={[styles.textBold, languagestyle.modalTitle]}>💰 Choisir une devise</Text>
                            <TouchableOpacity onPress={() => this.setState({ currencyModalVisible: false })}>
                                <Icon name="close" size={24} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        {/* Chips de filtres */}
                        <View style={languagestyle.filterChips}>
                            {[
                                { id: 'all', label: 'Toutes' },
                                { id: 'africa', label: 'Afrique' },
                                { id: 'europe', label: 'Europe' },
                                { id: 'america', label: 'Amériques' },
                            ].map((chip) => (
                                <TouchableOpacity
                                    key={chip.id}
                                    style={[languagestyle.chip, currencyFilter === chip.id && languagestyle.chipActive]}
                                    onPress={() => this.setState({ currencyFilter: chip.id })}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            languagestyle.chipText,
                                            currencyFilter === chip.id && languagestyle.chipTextActive,
                                        ]}
                                    >
                                        {chip.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={languagestyle.searchContainer}>
                            <Icon name="magnify" size={20} color={COLORS.textMuted} />
                            <TextInput
                                style={[styles.text, languagestyle.searchInput]}
                                placeholder="Rechercher une devise..."
                                placeholderTextColor={COLORS.textMuted}
                                value={currencySearchText}
                                onChangeText={(text) => this.setState({ currencySearchText: text })}
                            />
                        </View>

                        <ScrollView style={languagestyle.modalList}>
                            {filteredCurrencies.map((currency) => (
                                <TouchableOpacity
                                    key={currency.code}
                                    style={[
                                        languagestyle.modalItem,
                                        selectedCurrency === currency.code && languagestyle.modalItemSelected,
                                    ]}
                                    onPress={() => this.selectCurrency(currency.code)}
                                >
                                    <Text style={languagestyle.modalFlag}>{currency.flag}</Text>
                                    <View style={languagestyle.modalItemInfo}>
                                        <Text style={[styles.textBold, languagestyle.modalItemName]}>{currency.name}</Text>
                                        <Text style={[styles.text, languagestyle.modalItemNative]}>
                                            {currency.code} ({currency.symbol})
                                        </Text>
                                    </View>
                                    {selectedCurrency === currency.code && (
                                        <Icon name="check-circle" size={20} color={COLORS.accentCyan} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        const { selectedLanguage, selectedCurrency } = this.state;
        const selectedLang = languages.find((l) => l.code === selectedLanguage);
        const selectedCurr = currencies.find((c) => c.code === selectedCurrency);

        return (
            <SafeAreaView style={languagestyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={languagestyle.topGlow} pointerEvents="none" />
                <View style={languagestyle.bottomGlow} pointerEvents="none" />

                {/* Navigation Bar */}
                <View style={languagestyle.headerNav}>
                    <TouchableOpacity
                        style={languagestyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={languagestyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, languagestyle.headerTitle]}>Paramètres Régionaux</Text>
                    </View>
                </View>

                <Animated.ScrollView
                    contentContainerStyle={languagestyle.scrollContent}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Section Langue */}
                    <View style={languagestyle.sectionCard}>
                        <View style={languagestyle.cardHeader}>
                            <Icon name="translate" size={20} color={COLORS.accentGold} />
                            <Text style={[styles.textBold, languagestyle.cardTitle]}>Langue d'affichage</Text>
                        </View>

                        <TouchableOpacity
                            style={languagestyle.selectionTrigger}
                            onPress={() => this.setState({ languageModalVisible: true })}
                            activeOpacity={0.8}
                        >
                            <Text style={languagestyle.flagText}>{selectedLang?.flag}</Text>
                            <View style={languagestyle.triggerTextWrapper}>
                                <Text style={[styles.textBold, languagestyle.triggerTitle]}>{selectedLang?.name}</Text>
                                <Text style={[styles.text, languagestyle.triggerSubtitle]}>{selectedLang?.native}</Text>
                            </View>
                            <Icon name="chevron-down" size={20} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    </View>

                    {/* Section Devise */}
                    <View style={languagestyle.sectionCard}>
                        <View style={languagestyle.cardHeader}>
                            <Icon name="currency-usd" size={20} color={COLORS.accentCyan} />
                            <Text style={[styles.textBold, languagestyle.cardTitle]}>Devise principale</Text>
                        </View>

                        <TouchableOpacity
                            style={languagestyle.selectionTrigger}
                            onPress={() => this.setState({ currencyModalVisible: true })}
                            activeOpacity={0.8}
                        >
                            <Text style={languagestyle.flagText}>{selectedCurr?.flag}</Text>
                            <View style={languagestyle.triggerTextWrapper}>
                                <Text style={[styles.textBold, languagestyle.triggerTitle]}>{selectedCurr?.name}</Text>
                                <Text style={[styles.text, languagestyle.triggerSubtitle]}>
                                    {selectedCurr?.code} - {selectedCurr?.symbol}
                                </Text>
                            </View>
                            <Icon name="chevron-down" size={20} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    </View>

                    {/* Carte Aperçu */}
                    <View style={languagestyle.previewCard}>
                        <Text style={[styles.textBold, languagestyle.previewTitle]}>📋 Synthèse des préférences</Text>
                        <View style={languagestyle.previewRow}>
                            <Icon name="earth" size={18} color={COLORS.accentGold} />
                            <Text style={[styles.text, languagestyle.previewText]}>
                                Langue active : <Text style={styles.textBold}>{selectedLang?.name}</Text>
                            </Text>
                        </View>
                        <View style={languagestyle.previewRow}>
                            <Icon name="cash-multiple" size={18} color={COLORS.accentCyan} />
                            <Text style={[styles.text, languagestyle.previewText]}>
                                Affichage des prix : <Text style={styles.textBold}>{selectedCurr?.symbol}</Text> ({selectedCurr?.code})
                            </Text>
                        </View>
                    </View>

                    {/* Bouton de Sauvegarde */}
                    <TouchableOpacity
                        style={languagestyle.saveButton}
                        onPress={this.savePreferences}
                        activeOpacity={0.85}
                    >
                        <Icon name="check-circle-outline" size={20} color={COLORS.textDark} style={{ marginRight: 8 }} />
                        <Text style={[styles.textBold, languagestyle.saveButtonText]}>
                            Appliquer les préférences
                        </Text>
                    </TouchableOpacity>
                </Animated.ScrollView>

                {this.renderLanguageModal()}
                {this.renderCurrencyModal()}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchProfilPageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLanguage);