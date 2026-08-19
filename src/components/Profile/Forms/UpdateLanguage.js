import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, ImageBackground, TextInput, Modal, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { languagestyle } from '../../../assets/styles/updatelanguage';
import { styles } from '../../../assets/styles';
import { switchProfilPageAction } from '../../../navigations/rootNavigation';

const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français', region: 'Europe' },
    { code: 'en', name: 'English', flag: '🇬🇧', native: 'English', region: 'Amérique du Nord' },
];

const currencies = [
    { code: 'XOF', name: 'Franc CFA', symbol: 'CFA', flag: '🌍', rate: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 655.96 },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 600 },
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
            animateButton: false,
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    }

    selectLanguage = (code) => {
        this.setState({ selectedLanguage: code, languageModalVisible: false, languageSearchText: '' });
        this.animateSelection();
    };

    selectCurrency = (code) => {
        this.setState({ selectedCurrency: code, currencyModalVisible: false, currencySearchText: '' });
        this.animateSelection();
    };

    animateSelection = () => {
        this.setState({ animateButton: true });
        setTimeout(() => this.setState({ animateButton: false }), 300);
    };

    savePreferences = () => {
        const { selectedLanguage, selectedCurrency } = this.state;
        const selectedLang = languages.find(l => l.code === selectedLanguage);
        const selectedCurr = currencies.find(c => c.code === selectedCurrency);

        Alert.alert(
            "✨ Préférences sauvegardées ✨",
            `🌐 Langue : ${selectedLang.name}\n💰 Devise : ${selectedCurr.name} (${selectedCurr.symbol})\n\nVos préférences seront appliquées dans toute l'application.`,
            [{ text: "Super !", style: "default" }]
        );
    };

    getFilteredLanguages = () => {
        const { languageSearchText } = this.state;
        return languages.filter(lang =>
            lang.name.toLowerCase().includes(languageSearchText.toLowerCase()) ||
            lang.native.toLowerCase().includes(languageSearchText.toLowerCase()) ||
            lang.code.toLowerCase().includes(languageSearchText.toLowerCase()) ||
            lang.region.toLowerCase().includes(languageSearchText.toLowerCase())
        );
    };

    getFilteredCurrencies = () => {
        const { currencySearchText, currencyFilter } = this.state;
        let filtered = currencies;

        if (currencyFilter !== 'all') {
            filtered = currencies.filter(curr =>
                currencyFilter === 'africa' ? ['XOF', 'MAD'].includes(curr.code) :
                    currencyFilter === 'europe' ? ['EUR', 'GBP', 'CHF'].includes(curr.code) :
                        currencyFilter === 'america' ? ['USD', 'CAD'].includes(curr.code) :
                            currencyFilter === 'asia' ? ['CNY', 'JPY'].includes(curr.code) : true
            );
        }

        return filtered.filter(currency =>
            currency.name.toLowerCase().includes(currencySearchText.toLowerCase()) ||
            currency.code.toLowerCase().includes(currencySearchText.toLowerCase()) ||
            currency.symbol.toLowerCase().includes(currencySearchText.toLowerCase())
        );
    };

    renderLanguageModal = () => {
        const { languageModalVisible, languageSearchText } = this.state;
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
                            <Text style={[languagestyle.modalTitle, styles.textBold]}>🌐 Choisir une langue</Text>
                            <TouchableOpacity onPress={() => this.setState({ languageModalVisible: false })}>
                                <Icon name="close" size={28} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={languagestyle.searchContainer}>
                            <Icon name="magnify" size={20} color="#999" style={languagestyle.searchIcon} />
                            <TextInput
                                style={[languagestyle.searchInput, styles.text]}
                                placeholder="Rechercher une langue..."
                                placeholderTextColor="#999"
                                value={languageSearchText}
                                onChangeText={(text) => this.setState({ languageSearchText: text })}
                            />
                            {languageSearchText !== '' && (
                                <TouchableOpacity onPress={() => this.setState({ languageSearchText: '' })}>
                                    <Icon name="close-circle" size={20} color="#999" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <ScrollView style={languagestyle.modalList}>
                            {filteredLanguages.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    style={[
                                        languagestyle.modalItem,
                                        this.state.selectedLanguage === lang.code && languagestyle.modalItemSelected
                                    ]}
                                    onPress={() => this.selectLanguage(lang.code)}
                                >
                                    <Text style={languagestyle.modalFlag}>{lang.flag}</Text>
                                    <View style={languagestyle.modalItemInfo}>
                                        <Text style={[languagestyle.modalItemName, styles.text]}>{lang.name}</Text>
                                        <Text style={[languagestyle.modalItemNative, styles.text]}>{lang.native}</Text>
                                        <Text style={[languagestyle.modalItemRegion, styles.text]}>{lang.region}</Text>
                                    </View>
                                    {this.state.selectedLanguage === lang.code && (
                                        <Icon name="check-circle" size={20} color="#1B497D" />
                                    )}
                                </TouchableOpacity>
                            ))}
                            {filteredLanguages.length === 0 && (
                                <View style={languagestyle.noResults}>
                                    <Icon name="emoticon-sad" size={40} color="#ccc" />
                                    <Text style={[languagestyle.noResultsText, styles.text]}>Aucune langue trouvée</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    renderCurrencyModal = () => {
        const { currencyModalVisible, currencySearchText, currencyFilter } = this.state;
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
                            <Text style={[languagestyle.modalTitle, styles.textBold]}>💰 Choisir une devise</Text>
                            <TouchableOpacity onPress={() => this.setState({ currencyModalVisible: false })}>
                                <Icon name="close" size={28} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={languagestyle.filterChips}>
                            <TouchableOpacity
                                style={[languagestyle.chip, currencyFilter === 'all' && languagestyle.chipActive]}
                                onPress={() => this.setState({ currencyFilter: 'all' })}
                            >
                                <Text style={[languagestyle.chipText, styles.text, currencyFilter === 'all' && languagestyle.chipTextActive, styles.text,]}>
                                    🌍 Toutes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[languagestyle.chip, currencyFilter === 'africa' && languagestyle.chipActive]}
                                onPress={() => this.setState({ currencyFilter: 'africa' })}
                            >
                                <Text style={[languagestyle.chipText, styles.text, currencyFilter === 'africa' && languagestyle.chipTextActive, styles.text,]}>
                                    🌍 Afrique
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[languagestyle.chip, currencyFilter === 'europe' && languagestyle.chipActive]}
                                onPress={() => this.setState({ currencyFilter: 'europe' })}
                            >
                                <Text style={[languagestyle.chipText, styles.text, currencyFilter === 'europe' && languagestyle.chipTextActive, styles.text,]}>
                                    🇪🇺 Europe
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[languagestyle.chip, currencyFilter === 'america' && languagestyle.chipActive]}
                                onPress={() => this.setState({ currencyFilter: 'america' })}
                            >
                                <Text style={[languagestyle.chipText, styles.text, currencyFilter === 'america' && languagestyle.chipTextActive, styles.text,]}>
                                    🌎 Amériques
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[languagestyle.chip, currencyFilter === 'asia' && languagestyle.chipActive]}
                                onPress={() => this.setState({ currencyFilter: 'asia' })}
                            >
                                <Text style={[languagestyle.chipText, styles.text, currencyFilter === 'asia' && languagestyle.chipTextActive, styles.text,]}>
                                    🌏 Asie
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={languagestyle.searchContainer}>
                            <Icon name="magnify" size={20} color="#999" style={languagestyle.searchIcon} />
                            <TextInput
                                style={[languagestyle.searchInput, styles.text]}
                                placeholder="Rechercher une devise..."
                                placeholderTextColor="#999"
                                value={currencySearchText}
                                onChangeText={(text) => this.setState({ currencySearchText: text })}
                            />
                            {currencySearchText !== '' && (
                                <TouchableOpacity onPress={() => this.setState({ currencySearchText: '' })}>
                                    <Icon name="close-circle" size={20} color="#999" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <ScrollView style={languagestyle.modalList}>
                            {filteredCurrencies.map((currency) => (
                                <TouchableOpacity
                                    key={currency.code}
                                    style={[
                                        languagestyle.modalItem,
                                        this.state.selectedCurrency === currency.code && languagestyle.modalItemSelected
                                    ]}
                                    onPress={() => this.selectCurrency(currency.code)}
                                >
                                    <Text style={languagestyle.modalFlag}>{currency.flag}</Text>
                                    <View style={languagestyle.modalItemInfo}>
                                        <Text style={[languagestyle.modalItemName, styles.text]}>{currency.name}</Text>
                                        <Text style={[languagestyle.modalItemNative, styles.text]}>{currency.code} - {currency.symbol}</Text>
                                    </View>
                                    {this.state.selectedCurrency === currency.code && (
                                        <Icon name="check-circle" size={20} color="#1B497D" />
                                    )}
                                </TouchableOpacity>
                            ))}
                            {filteredCurrencies.length === 0 && (
                                <View style={languagestyle.noResults}>
                                    <Icon name="emoticon-sad" size={40} color="#ccc" />
                                    <Text style={[languagestyle.noResultsText, styles.text]}>Aucune devise trouvée</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };
    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[languagestyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={languagestyle.headerSection}>
                        <View style={languagestyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={languagestyle.headerButton}
                                onPress={this._navigateToProfil}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={languagestyle.headertext}>
                            <Text style={[languagestyle.headerTitle, styles.textBold]}>Paramètres régionaux</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };
    render() {
        const { selectedLanguage, selectedCurrency, animateButton } = this.state;
        const selectedLang = languages.find(l => l.code === selectedLanguage);
        const selectedCurr = currencies.find(c => c.code === selectedCurrency);

        return (
            <View style={languagestyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={languagestyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={languagestyle.Header}>
                            <View style={styles.section}>
                                <View style={styles.back}>
                                    <TouchableOpacity onPress={this._navigateToProfil}>
                                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.sectionTitle, styles.textBold]}>Paramètres régionaux</Text>
                            </View>
                        </View>

                        <View style={languagestyle.section}>
                            <View style={languagestyle.sectionHeader}>
                                <Icon name="translate" size={20} color="#1B497D" />
                                <Text style={[languagestyle.sectionTitle, styles.textBold]}>Langue de l'application</Text>
                            </View>

                            <TouchableOpacity
                                style={languagestyle.selectionCard}
                                onPress={() => this.setState({ languageModalVisible: true })}
                            >
                                <View style={languagestyle.selectionLeft}>
                                    <Text style={languagestyle.selectionFlag}>{selectedLang?.flag}</Text>
                                    <View>
                                        <Text style={[languagestyle.selectionTitle, styles.text]}>{selectedLang?.name}</Text>
                                        <Text style={[languagestyle.selectionSubtitle, styles.text]}>{selectedLang?.native}</Text>
                                    </View>
                                </View>
                                <Icon name="chevron-down" size={20} color="#1B497D" />
                            </TouchableOpacity>
                        </View>

                        <View style={languagestyle.section}>
                            <View style={languagestyle.sectionHeader}>
                                <Icon name="currency-usd" size={20} color="#1B497D" />
                                <Text style={[languagestyle.sectionTitle, styles.textBold]}>Devise principale</Text>
                            </View>

                            <TouchableOpacity
                                style={languagestyle.selectionCard}
                                onPress={() => this.setState({ currencyModalVisible: true })}
                            >
                                <View style={languagestyle.selectionLeft}>
                                    <Text style={languagestyle.selectionFlag}>{selectedCurr?.flag}</Text>
                                    <View>
                                        <Text style={[languagestyle.selectionTitle, styles.text]}>{selectedCurr?.name}</Text>
                                        <Text style={[languagestyle.selectionSubtitle, styles.text]}>{selectedCurr?.code} - {selectedCurr?.symbol}</Text>
                                    </View>
                                </View>
                                <Icon name="chevron-down" size={20} color="#1B497D" />
                            </TouchableOpacity>
                        </View>

                        <View style={languagestyle.previewCard}>
                            <Text style={[languagestyle.previewTitle, styles.textBold]}>📋 Aperçu</Text>
                            <View style={languagestyle.previewRow}>
                                <Icon name="translate" size={20} color="#1B497D" />
                                <Text style={[languagestyle.previewText, styles.text]}>
                                    Langue: {selectedLang?.name} ({selectedLang?.native})
                                </Text>
                            </View>
                            <View style={languagestyle.previewRow}>
                                <Icon name="currency-usd" size={20} color="#1B497D" />
                                <Text style={[languagestyle.previewText, styles.text]}>
                                    Devise: {selectedCurr?.name} ({selectedCurr?.symbol})
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                languagestyle.saveButton,
                                animateButton && languagestyle.saveButtonAnimate
                            ]}
                            onPress={this.savePreferences}
                        >
                            <Text style={[languagestyle.saveButtonText, styles.textBold]}>Enregistrer mes préférences</Text>
                        </TouchableOpacity>

                        <View style={{ height: 50 }} />
                    </Animated.ScrollView>

                    {this.renderLanguageModal()}
                    {this.renderCurrencyModal()}
                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchProfilPageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLanguage);