import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Animated,
    StatusBar,
    Modal,
    Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { faqstyle } from '../../assets/styles/faqs';
import { styles } from '../../assets/styles';
import { COLORS } from '../../assets/styles/theme';
import {
    switchProfilPageAction,
    switchSupportHomeAction,
} from '../../navigations/rootNavigation';

const FAQ_DATA = [
    {
        id: 1,
        category: 'Général',
        question: 'Comment créer un compte ?',
        answer:
            "Pour créer un compte, cliquez sur le bouton 'S'inscrire' sur l'écran d'accueil. Remplissez le formulaire avec vos informations personnelles. Vous recevrez un e-mail de confirmation pour valider l'activation.",
        icon: 'account-plus-outline',
        votes: 45,
        views: 1234,
    },
    {
        id: 2,
        category: 'Général',
        question: 'Comment réinitialiser mon mot de passe ?',
        answer:
            "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur l'écran de connexion. Entrez votre adresse e-mail et suivez les instructions envoyées par e-mail.",
        icon: 'lock-reset',
        votes: 32,
        views: 892,
    },
    {
        id: 3,
        category: 'Paiement',
        question: 'Quels sont les modes de paiement acceptés ?',
        answer:
            'Nous acceptons les cartes bancaires (Visa, MasterCard), Mobile Money (MTN MoMo, Orange Money) ainsi que les virements bancaires sécurisés par cryptage SSL.',
        icon: 'credit-card-outline',
        votes: 67,
        views: 2341,
    },
    {
        id: 4,
        category: 'Paiement',
        question: 'Comment obtenir un reçu ou un remboursement ?',
        answer:
            "Chaque paiement génère un reçu téléchargeable. Pour toute demande de remboursement, contactez le service comptabilité de l'établissement sous 14 jours.",
        icon: 'cash-refund',
        votes: 28,
        views: 1567,
    },
    {
        id: 5,
        category: 'Technique',
        question: "L'application ne se charge pas correctement",
        answer:
            "Vérifiez votre connexion réseau. Si le souci persiste, redémarrez l'application ou videz le cache dans les paramètres système de votre mobile.",
        icon: 'cellphone-cog',
        votes: 89,
        views: 3456,
    },
    {
        id: 6,
        category: 'Compte',
        question: 'Comment changer mon adresse e-mail ?',
        answer:
            "Rendez-vous dans Paramètres > Profil. Modifiez le champ e-mail et confirmez avec votre mot de passe de sécurité.",
        icon: 'email-edit-outline',
        votes: 19,
        views: 543,
    },
    {
        id: 7,
        category: 'Sécurité',
        question: 'Comment activer la double authentification ?',
        answer:
            'Allez dans Paramètres > Sécurité & 2FA. Vous pouvez activer la vérification par empreinte, reconnaissance faciale ou code par SMS/E-mail.',
        icon: 'shield-lock-outline',
        votes: 56,
        views: 1890,
    },
];

const CATEGORIES = ['Toutes', 'Général', 'Paiement', 'Technique', 'Compte', 'Sécurité'];

class FAQsIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            selectedCategory: 'Toutes',
            expandedId: null,
            showContactModal: false,
            feedbackMessage: '',
            feedbackRating: 0,
            showFeedbackToast: false,
            scrollY: new Animated.Value(0),
        };
    }

    getFilteredFAQs = () => {
        let filtered = FAQ_DATA;

        if (this.state.selectedCategory !== 'Toutes') {
            filtered = filtered.filter((faq) => faq.category === this.state.selectedCategory);
        }

        if (this.state.searchQuery.trim()) {
            const query = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (faq) =>
                    faq.question.toLowerCase().includes(query) ||
                    faq.answer.toLowerCase().includes(query) ||
                    faq.category.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    toggleExpand = (id) => {
        this.setState((prevState) => ({
            expandedId: prevState.expandedId === id ? null : id,
        }));
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    _navigateToSupport = () => {
        switchSupportHomeAction(true);
    };

    handleVote = (id, type) => {
        this.showTemporaryToast('Merci pour votre retour !');
    };

    shareFAQ = async (faq) => {
        try {
            await Share.share({
                message: `${faq.question}\n\nRéponse: ${faq.answer}\n\nRetrouvez plus d'infos sur l'application Poly-H School !`,
                title: faq.question,
            });
        } catch (error) {
            console.log(error);
        }
    };

    showTemporaryToast = (message) => {
        this.setState({ showFeedbackToast: message });
        setTimeout(() => this.setState({ showFeedbackToast: false }), 3000);
    };

    submitFeedback = () => {
        const { feedbackMessage } = this.state;
        if (feedbackMessage.trim()) {
            this.showTemporaryToast('Votre message a été transmis au support.');
            this.setState({ showContactModal: false, feedbackMessage: '', feedbackRating: 0 });
        } else {
            this.showTemporaryToast('Veuillez saisir votre message.');
        }
    };

    renderHero = () => (
        <View style={faqstyle.heroSection}>
            <View style={faqstyle.heroBadge}>
                <Icon name="help-circle-outline" size={24} color={COLORS.accentGold} />
                <Text style={[styles.textBold, faqstyle.heroBadgeText]}>CENTRE D'ASSISTANCE</Text>
            </View>
            <Text style={[styles.textBold, faqstyle.heroTitle]}>Comment pouvons-nous vous aider ?</Text>

            <View style={faqstyle.searchBox}>
                <Icon name="magnify" size={20} color={COLORS.textMuted} />
                <TextInput
                    style={[styles.text, faqstyle.searchInput]}
                    placeholder="Rechercher une réponse..."
                    placeholderTextColor={COLORS.textMuted}
                    value={this.state.searchQuery}
                    onChangeText={(text) => this.setState({ searchQuery: text })}
                />
                {this.state.searchQuery !== '' && (
                    <TouchableOpacity onPress={() => this.setState({ searchQuery: '' })}>
                        <Icon name="close-circle" size={18} color={COLORS.textMuted} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    renderCategories = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={faqstyle.categoriesRow}
            contentContainerStyle={{ gap: 8 }}
        >
            {CATEGORIES.map((category) => {
                const isActive = this.state.selectedCategory === category;
                return (
                    <TouchableOpacity
                        key={category}
                        style={[faqstyle.categoryChip, isActive && faqstyle.categoryChipActive]}
                        onPress={() => this.setState({ selectedCategory: category })}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.textBold, faqstyle.chipText, isActive && faqstyle.chipTextActive]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );

    renderFAQItem = (faq) => {
        const isExpanded = this.state.expandedId === faq.id;

        return (
            <View key={faq.id} style={faqstyle.faqCard}>
                <TouchableOpacity
                    style={faqstyle.faqHeader}
                    onPress={() => this.toggleExpand(faq.id)}
                    activeOpacity={0.85}
                >
                    <View style={faqstyle.faqTitleGroup}>
                        <Icon name={faq.icon} size={20} color={COLORS.accentGold} />
                        <Text style={[styles.textBold, faqstyle.faqQuestion]}>{faq.question}</Text>
                    </View>
                    <Icon
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={22}
                        color={COLORS.textMuted}
                    />
                </TouchableOpacity>

                {isExpanded && (
                    <View style={faqstyle.faqBody}>
                        <Text style={[styles.text, faqstyle.faqAnswer]}>{faq.answer}</Text>

                        <View style={faqstyle.faqFooter}>
                            <View style={faqstyle.faqStats}>
                                <Icon name="eye-outline" size={14} color={COLORS.textMuted} />
                                <Text style={[styles.text, faqstyle.statText]}>{faq.views} vues</Text>
                            </View>

                            <View style={faqstyle.actionButtons}>
                                <TouchableOpacity
                                    style={faqstyle.actionBtn}
                                    onPress={() => this.handleVote(faq.id, 'up')}
                                >
                                    <Icon name="thumb-up-outline" size={16} color={COLORS.accentCyan} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={faqstyle.actionBtn}
                                    onPress={() => this.shareFAQ(faq)}
                                >
                                    <Icon name="share-variant-outline" size={16} color={COLORS.textMuted} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    renderContactModal = () => {
        const { showContactModal, feedbackMessage, feedbackRating } = this.state;

        return (
            <Modal
                visible={showContactModal}
                transparent
                animationType="slide"
                onRequestClose={() => this.setState({ showContactModal: false })}
            >
                <View style={faqstyle.modalOverlay}>
                    <View style={faqstyle.modalContent}>
                        <View style={faqstyle.modalHeader}>
                            <Text style={[styles.textBold, faqstyle.modalTitle]}>✉️ Contacter l'assistance</Text>
                            <TouchableOpacity onPress={() => this.setState({ showContactModal: false })}>
                                <Icon name="close" size={24} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={[styles.textBold, faqstyle.modalLabel]}>Évaluez votre expérience</Text>
                            <View style={faqstyle.ratingRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => this.setState({ feedbackRating: star })}
                                    >
                                        <Icon
                                            name={feedbackRating >= star ? 'star' : 'star-outline'}
                                            size={28}
                                            color={feedbackRating >= star ? COLORS.accentGold : COLORS.textMuted}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={[styles.textBold, faqstyle.modalLabel]}>Votre message</Text>
                            <TextInput
                                style={[styles.text, faqstyle.modalInput]}
                                multiline
                                numberOfLines={4}
                                placeholder="Décrivez en détail votre requête..."
                                placeholderTextColor={COLORS.textMuted}
                                value={feedbackMessage}
                                onChangeText={(text) => this.setState({ feedbackMessage: text })}
                            />

                            <TouchableOpacity
                                style={faqstyle.modalSubmitBtn}
                                onPress={this.submitFeedback}
                                activeOpacity={0.85}
                            >
                                <Text style={[styles.textBold, faqstyle.modalSubmitText]}>
                                    Envoyer ma demande
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        const filteredFAQs = this.getFilteredFAQs();
        const { showFeedbackToast } = this.state;

        return (
            <SafeAreaView style={faqstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={faqstyle.topGlow} pointerEvents="none" />
                <View style={faqstyle.bottomGlow} pointerEvents="none" />

                {/* Navigation Bar */}
                <View style={faqstyle.headerNav}>
                    <TouchableOpacity
                        style={faqstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={faqstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, faqstyle.headerTitle]}>Foire Aux Questions</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={faqstyle.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderHero()}
                    {this.renderCategories()}

                    <View style={faqstyle.faqList}>
                        {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq) => this.renderFAQItem(faq))
                        ) : (
                            <View style={faqstyle.emptyState}>
                                <Icon name="file-search-outline" size={48} color={COLORS.accentGold} />
                                <Text style={[styles.textBold, faqstyle.emptyTitle]}>Aucune question trouvée</Text>
                                <Text style={[styles.text, faqstyle.emptySubtitle]}>
                                    Essayez de rechercher avec d'autres mots-clés.
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Section Support Client */}
                    <View style={faqstyle.contactCard}>
                        <Icon name="headset" size={32} color={COLORS.accentGold} />
                        <Text style={[styles.textBold, faqstyle.contactTitle]}>
                            Vous ne trouvez pas votre réponse ?
                        </Text>
                        <Text style={[styles.text, faqstyle.contactSubtitle]}>
                            Notre équipe d'assistance académique est à votre écoute.
                        </Text>
                        <TouchableOpacity
                            style={faqstyle.contactButton}
                            onPress={this._navigateToSupport}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.textBold, faqstyle.contactButtonText]}>
                                Contacter le support
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {this.renderContactModal()}

                {showFeedbackToast && (
                    <View style={faqstyle.toast}>
                        <Icon name="check-circle" size={18} color={COLORS.accentGold} />
                        <Text style={[styles.text, faqstyle.toastText]}>{showFeedbackToast}</Text>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchProfilPageAction,
            switchSupportHomeAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQsIndex);