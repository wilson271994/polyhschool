import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Animated, StatusBar, Modal, Share, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { faqstyle, C } from '../../assets/styles/faqs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchProfilPageAction, switchSupportHomeAction } from '../../navigations/rootNavigation';
import { styles } from '../../assets/styles';


const FAQ_DATA = [
    {
        id: 1,
        category: "Général",
        question: "Comment créer un compte ?",
        answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' sur l'écran d'accueil. Remplissez le formulaire avec vos informations personnelles (nom, email, mot de passe). Vous recevrez un email de confirmation avec un lien pour activer votre compte. Une fois l'email confirmé, vous pourrez vous connecter et accéder à toutes les fonctionnalités.",
        icon: "account-plus",
        votes: 45,
        views: 1234,
    },
    {
        id: 2,
        category: "Général",
        question: "Comment réinitialiser mon mot de passe ?",
        answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur l'écran de connexion. Entrez votre adresse email et vous recevrez un lien pour réinitialiser votre mot de passe. Suivez les instructions dans l'email pour créer un nouveau mot de passe sécurisé.",
        icon: "lock-reset",
        votes: 32,
        views: 892,
    },
    {
        id: 3,
        category: "Paiement",
        question: "Quels sont les modes de paiement acceptés ?",
        answer: "Nous acceptons les paiements par carte bancaire (Visa, MasterCard, American Express), Mobile Money (MTN Momo, Orange Money), et les transferts bancaires. Tous les paiements sont sécurisés par un système de cryptage SSL 256 bits pour garantir la sécurité de vos transactions.",
        icon: "credit-card",
        votes: 67,
        views: 2341,
    },
    {
        id: 4,
        category: "Paiement",
        question: "Comment obtenir un remboursement ?",
        answer: "Pour obtenir un remboursement, contactez notre service client dans les 14 jours suivant votre achat. Les remboursements sont traités sous 5 à 10 jours ouvrables selon votre mode de paiement. Vous devrez fournir la preuve d'achat et expliquer la raison du remboursement.",
        icon: "cash-refund",
        votes: 28,
        views: 1567,
    },
    {
        id: 5,
        category: "Technique",
        question: "L'application ne se charge pas correctement",
        answer: "Vérifiez votre connexion internet. Si le problème persiste, essayez de fermer complètement l'application et de la rouvrir. Vous pouvez également vider le cache dans les paramètres de l'application. Si rien ne fonctionne, contactez notre support technique avec les détails de votre appareil.",
        icon: "cellphone-cog",
        votes: 89,
        views: 3456,
    },
    {
        id: 6,
        category: "Technique",
        question: "Comment mettre à jour l'application ?",
        answer: "La mise à jour se fait automatiquement via votre store (Google Play ou App Store). Pour vérifier manuellement, allez dans votre store, recherchez notre application et cliquez sur 'Mettre à jour' si disponible. Assurez-vous d'avoir suffisamment d'espace de stockage.",
        icon: "update",
        votes: 23,
        views: 678,
    },
    {
        id: 7,
        category: "Compte",
        question: "Comment supprimer mon compte ?",
        answer: "Pour supprimer définitivement votre compte, allez dans Paramètres > Compte > Supprimer mon compte. Vous devrez confirmer votre mot de passe. Attention : cette action est irréversible et toutes vos données seront supprimées définitivement.",
        icon: "account-remove",
        votes: 41,
        views: 2100,
    },
    {
        id: 8,
        category: "Compte",
        question: "Comment changer mon adresse email ?",
        answer: "Rendez-vous dans Paramètres > Informations personnelles > Email. Entrez votre nouveau email et votre mot de passe pour confirmer. Un email de vérification sera envoyé à votre nouvelle adresse pour valider le changement.",
        icon: "email-edit",
        votes: 19,
        views: 543,
    },
    {
        id: 9,
        category: "Sécurité",
        question: "Comment activer la double authentification ?",
        answer: "Pour activer la double authentification (2FA), allez dans Paramètres > Sécurité > Double Authentification. Vous pouvez utiliser une application comme Google Authenticator ou recevoir des codes par SMS. Cela renforcera la sécurité de votre compte.",
        icon: "shield-lock",
        votes: 56,
        views: 1890,
    },
    {
        id: 10,
        category: "Sécurité",
        question: "Que faire en cas de compte piraté ?",
        answer: "Contactez immédiatement notre support via support@application.com. Changez votre mot de passe dans les plus brefs délais et vérifiez vos récentes activités. Désactivez les sessions actives depuis Paramètres > Sécurité > Sessions actives.",
        icon: "alert-circle",
        votes: 34,
        views: 987,
    },
];

const CATEGORIES = ["Toutes", "Général", "Paiement", "Technique", "Compte", "Sécurité"];

class FAQsIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            selectedCategory: "Toutes",
            expandedId: null,
            showContactModal: false,
            feedbackMessage: "",
            feedbackRating: 0,
            showFeedbackToast: false,
            scrollY: new Animated.Value(0),
        };
        this.searchInputRef = null;
    }

    getFilteredFAQs = () => {
        let filtered = FAQ_DATA;


        if (this.state.selectedCategory !== "Toutes") {
            filtered = filtered.filter(faq => faq.category === this.state.selectedCategory);
        }


        if (this.state.searchQuery.trim()) {
            const query = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(faq =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query) ||
                faq.category.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    toggleExpand = (id) => {
        this.setState(prevState => ({
            expandedId: prevState.expandedId === id ? null : id
        }));
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    }
    _navigateToSupport = () => {
        switchSupportHomeAction(true);
    }
    handleVote = (id, type) => {

        console.log(`Vote ${type} pour la FAQ ${id}`);
        this.showTemporaryToast("Merci pour votre retour !");
    };

    shareFAQ = async (faq) => {
        try {
            await Share.share({
                message: `${faq.question}\n\nRéponse: ${faq.answer.substring(0, 100)}...\n\nTéléchargez l'application pour en savoir plus !`,
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

    handleContactSupport = () => {
        this.setState({ showContactModal: true });
    };

    submitFeedback = () => {
        const { feedbackMessage, feedbackRating } = this.state;
        if (feedbackMessage.trim()) {
            console.log("Feedback envoyé:", { message: feedbackMessage, rating: feedbackRating });
            this.showTemporaryToast("Merci pour votre message !");
            this.setState({ showContactModal: false, feedbackMessage: "", feedbackRating: 0 });
        } else {
            this.showTemporaryToast("Veuillez écrire votre message");
        }
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[faqstyle.header, { opacity: headerOpacity }]}>
                <View style={faqstyle.headerSection}>
                    <View style={faqstyle.headertext}>
                        <Text style={[faqstyle.headerTitle, styles.textBold]}>Centre d'Aide</Text>
                    </View>
                    <View style={faqstyle.headerbuttonContainer}>
                        <TouchableOpacity
                            style={faqstyle.headerButton}
                            onPress={this._navigateToProfil}
                        >
                            <Icon name="close" size={20} color={C.text} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>
        );
    };

    renderHero = () => {
        return (
            <View style={faqstyle.heroSection}>
                <View style={faqstyle.heroContent}>
                    <TouchableOpacity
                        style={faqstyle.headerButton1}
                        onPress={this._navigateToProfil}
                    >
                        <Icon name="close" size={24} color={C.text} />
                    </TouchableOpacity>
                    <Icon name="frequently-asked-questions" size={60} color={C.accent} />
                    <Text style={[faqstyle.heroTitle, styles.textBold]}>Comment pouvons-nous vous aider ?</Text>
                    <Text style={[faqstyle.heroSubtitle, styles.text]}>
                        Trouvez des réponses rapides à vos questions
                    </Text>
                </View>

                <View style={faqstyle.searchContainer}>
                    <Icon name="magnify" size={24} color={C.textMuted} style={faqstyle.searchIcon} />
                    <TextInput
                        ref={ref => this.searchInputRef = ref}
                        style={[faqstyle.searchInput, styles.text]}
                        placeholder="Rechercher une question..."
                        placeholderTextColor={C.textMuted}
                        value={this.state.searchQuery}
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                    />
                    {this.state.searchQuery !== "" && (
                        <TouchableOpacity onPress={() => this.setState({ searchQuery: "" })}>
                            <Icon name="close-circle" size={20} color={C.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    renderCategories = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={faqstyle.categoriesContainer}
                contentContainerStyle={faqstyle.categoriesContent}
            >
                {CATEGORIES.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            faqstyle.categoryChip,
                            this.state.selectedCategory === category && faqstyle.categoryChipActive
                        ]}
                        onPress={() => this.setState({ selectedCategory: category })}
                    >
                        <Text style={[
                            faqstyle.categoryChipText, styles.textBold,
                            this.state.selectedCategory === category && faqstyle.categoryChipTextActive
                        ]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    renderFAQItem = (faq, index) => {
        const isExpanded = this.state.expandedId === faq.id;

        return (
            <Animated.View key={faq.id} style={faqstyle.faqCard}>
                <TouchableOpacity
                    style={faqstyle.faqHeader}
                    onPress={() => this.toggleExpand(faq.id)}
                    activeOpacity={0.9}
                >
                    <View style={faqstyle.faqHeaderLeft}>
                        <View style={faqstyle.faqIconContainer}>
                            <Icon name={faq.icon} size={24} color={C.accent} />
                        </View>
                        <View style={faqstyle.faqInfo}>
                            <View style={faqstyle.faqCategoryBadge}>
                                <Text style={[faqstyle.faqCategoryText, styles.textBold]}>{faq.category}</Text>
                            </View>
                            <Text style={[faqstyle.faqQuestion, styles.textBold]}>{faq.question}</Text>
                        </View>
                    </View>
                    <Animated.View style={{
                        transform: [{
                            rotate: isExpanded ? '180deg' : '0deg'
                        }]
                    }}>
                        <Icon name="chevron-down" size={24} color={C.textMuted} />
                    </Animated.View>
                </TouchableOpacity>

                {isExpanded && (
                    <Animated.View style={faqstyle.faqAnswerContainer}>
                        <Text style={[faqstyle.faqAnswer, styles.text]}>{faq.answer}</Text>

                        <View style={faqstyle.faqActions}>
                            <View style={faqstyle.faqStats}>
                                <View style={faqstyle.statItem}>
                                    <Icon name="thumb-up-outline" size={16} color={C.textMuted} />
                                    <Text style={[faqstyle.statText, styles.text]}>{faq.votes}</Text>
                                </View>
                                <View style={faqstyle.statItem}>
                                    <Icon name="eye-outline" size={16} color={C.textMuted} />
                                    <Text style={[faqstyle.statText, styles.text]}>{faq.views}</Text>
                                </View>
                            </View>

                            <View style={faqstyle.actionButtons}>
                                <TouchableOpacity
                                    style={faqstyle.actionButton}
                                    onPress={() => this.handleVote(faq.id, 'up')}
                                >
                                    <Icon name="thumb-up" size={18} color={C.accent} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={faqstyle.actionButton}
                                    onPress={() => this.handleVote(faq.id, 'down')}
                                >
                                    <Icon name="thumb-down" size={18} color={C.textMuted} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={faqstyle.actionButton}
                                    onPress={() => this.shareFAQ(faq)}
                                >
                                    <Icon name="share-variant" size={18} color={C.textMuted} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                )}
            </Animated.View>
        );
    };

    renderContactSection = () => {
        return (
            <View style={faqstyle.contactSection}>
                <Text style={faqstyle.contactTitle}>Vous n'avez pas trouvé votre réponse ?</Text>
                <Text style={[faqstyle.contactSubtitle, styles.text]}>
                    Notre équipe de support est là pour vous aider
                </Text>
                <TouchableOpacity
                    style={faqstyle.contactButton}
                    onPress={this._navigateToSupport}
                    // onPress={this.handleContactSupport}
                >
                    <Icon name="headset" size={20} color="#fff" />
                    <Text style={[faqstyle.contactButtonText, styles.textBold]}>Contacter le support</Text>
                </TouchableOpacity>
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
                    <View style={faqstyle.modalContainer}>
                        <View style={faqstyle.modalHeader}>
                            <Text style={faqstyle.modalTitle}>Contacter le support</Text>
                            <TouchableOpacity onPress={() => this.setState({ showContactModal: false })}>
                                <Icon name="close" size={24} color={C.textMuted} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={[faqstyle.modalLabel, styles.textBold]}>Comment évaluez-vous notre aide ?</Text>
                            <View style={faqstyle.ratingContainer}>
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <TouchableOpacity
                                        key={rating}
                                        style={[
                                            faqstyle.ratingStar,
                                            feedbackRating >= rating && faqstyle.ratingStarActive
                                        ]}
                                        onPress={() => this.setState({ feedbackRating: rating })}
                                    >
                                        <Icon
                                            name={feedbackRating >= rating ? "star" : "star-outline"}
                                            size={32}
                                            color={feedbackRating >= rating ? "#FFD700" : C.textMuted}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={[faqstyle.modalLabel, styles.textBold]}>Votre message</Text>
                            <TextInput
                                style={faqstyle.modalInput}
                                multiline
                                numberOfLines={5}
                                placeholder="Décrivez votre problème..."
                                placeholderTextColor={C.textMuted}
                                value={feedbackMessage}
                                onChangeText={(text) => this.setState({ feedbackMessage: text })}
                            />

                            <TouchableOpacity
                                style={faqstyle.modalSubmitButton}
                                onPress={this.submitFeedback}
                            >
                                <Text style={faqstyle.modalSubmitText}>Envoyer</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    renderFloatingButton = () => {
        const scrollY = this.state.scrollY;
        const translateY = scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[faqstyle.floatingButton, { transform: [{ translateY }] }]}>
                <TouchableOpacity
                    style={faqstyle.floatingButtonTouch}
                    onPress={() => this.scrollViewRef?.scrollTo({ y: y, animated: true })}
                >
                    <Icon name="chevron-up" size={28} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    renderToast = () => {
        const { showFeedbackToast } = this.state;
        if (!showFeedbackToast) return null;

        return (
            <View style={faqstyle.toast}>
                <Icon name="check-circle" size={20} color={C.accent} />
                <Text style={[faqstyle.toastText, styles.text]}>{showFeedbackToast}</Text>
            </View>
        );
    };

    render() {
        const filteredFAQs = this.getFilteredFAQs();

        return (
            <View style={faqstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >

                    <Animated.ScrollView
                        ref={ref => this.scrollViewRef = ref}
                        style={faqstyle.scrollView}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >
                        {this.renderHero()}
                        {this.renderCategories()}

                        <View style={faqstyle.faqList}>
                            {filteredFAQs.length > 0 ? (
                                filteredFAQs.map((faq, index) => this.renderFAQItem(faq, index))
                            ) : (
                                <View style={faqstyle.emptyState}>
                                    <Icon name="help-circle-outline" size={80} color={C.textMuted} />
                                    <Text style={[faqstyle.emptyStateTitle, styles.textBold]}>Aucun résultat trouvé</Text>
                                    <Text style={[faqstyle.emptyStateSubtitle, styles.text]}>
                                        Essayez d'autres mots-clés ou parcourez les catégories
                                    </Text>
                                </View>
                            )}
                        </View>

                        {this.renderContactSection()}
                        <View style={{ height: 10 }} />
                        <View style={faqstyle.footer} />
                    </Animated.ScrollView>

                    {this.renderHeader()}
                    {this.renderFloatingButton()}
                    {this.renderContactModal()}
                    {this.renderToast()}

                </ImageBackground>
            </View>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchProfilPageAction,
        switchSupportHomeAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQsIndex);