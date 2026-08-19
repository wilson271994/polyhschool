import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Modal, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { librarystyle, COLORS } from '../../assets/styles/student_library';
import { setSelectedBookAction, switchHomePageAction, switchStudentBookDetailsPageAction, } from '../../navigations/rootNavigation';
import { styles } from '../../assets/styles';

const DUMMY_BOOKS = [
    {
        id: '1', title: "L'Art de la Guerre", author: 'Sun Tzu',
        cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg',
        category: 'Philosophie', isRecommended: true, isNew: false,
        subscriptionTier: 'premium',
        content: ["Chapitre 1\n\nL’art de la guerre est d’une importance vitale...", "..."],
    },
    {
        id: '2', title: '1984', author: 'George Orwell',
        cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg',
        category: 'Science-Fiction', isRecommended: true, isNew: false,
        subscriptionTier: 'basic',
        content: ["Chapitre 1\n\nC’était une journée d’avril froide...", "..."],
    },
    {
        id: '3', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry',
        cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg',
        category: 'Conte', isRecommended: true, isNew: false,
        subscriptionTier: 'premium',
        content: ["Chapitre 1\n\nLorsque j’avais six ans...", "..."],
    },
    {
        id: '4', title: 'Les Misérables', author: 'Victor Hugo',
        cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg',
        category: 'Roman', isRecommended: false, isNew: false,
        subscriptionTier: 'basic',
        content: ["Livre I : Un juste\n\nEn 1815...", "..."],
    },
    {
        id: '5', title: 'Crime et Châtiment', author: 'Fiodor Dostoïevski',
        cover: 'https://covers.openlibrary.org/b/id/7265236-L.jpg',
        category: 'Roman', isRecommended: true, isNew: false,
        subscriptionTier: 'premium',
        content: ["Première partie, Chapitre 1\n\nPar une exceptionnelle chaleur...", "..."],
    },
    {
        id: '6', title: "L'Étranger", author: 'Albert Camus',
        cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg',
        category: 'Philosophie', isRecommended: false, isNew: true,
        subscriptionTier: 'basic',
        content: [],
    },
    {
        id: '7', title: 'Notre-Dame de Paris', author: 'Victor Hugo',
        cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg',
        category: 'Roman', isRecommended: false, isNew: true,
        subscriptionTier: 'premium',
        content: [],
    },
    {
        id: '8', title: 'Don Quichotte', author: 'Miguel de Cervantes',
        cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg',
        category: 'Aventure', isRecommended: false, isNew: true,
        subscriptionTier: 'basic',
        content: [],
    },
    {
        id: '9', title: 'Le Comte de Monte-Cristo', author: 'Alexandre Dumas',
        cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg',
        category: 'Aventure', isRecommended: true, isNew: false,
        subscriptionTier: 'premium',
        content: [],
    },
    {
        id: '10', title: 'Orgueil et Préjugés', author: 'Jane Austen',
        cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg',
        category: 'Roman', isRecommended: false, isNew: true,
        subscriptionTier: 'basic',
        content: [],
    },
    {
        id: '11', title: 'Les Fleurs du Mal', author: 'Charles Baudelaire',
        cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg',
        category: 'Poésie', isRecommended: true, isNew: false,
        subscriptionTier: 'premium',
        content: [],
    },
    {
        id: '12', title: 'Germinal', author: 'Émile Zola',
        cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg',
        category: 'Roman', isRecommended: false, isNew: true,
        subscriptionTier: 'basic',
        content: [],
    },
];

const CATEGORIES = ['Tous', 'Philosophie', 'Science-Fiction', 'Conte', 'Roman', 'Aventure', 'Poésie'];

const SUBSCRIPTION_PLANS = [
    { id: 'basic_monthly', name: 'Basique', period: 'Mensuel', duration: 'monthly', price: '4,99 FCFA', color: '#63B3ED' },
    { id: 'basic_quarterly', name: 'Basique', period: 'Trimestriel', duration: 'quarterly', price: '12,99 FCFA', color: '#63B3ED', badge: '−15 %' },
    { id: 'basic_annual', name: 'Basique', period: 'Annuel', duration: 'annual', price: '44,99 FCFA', color: '#63B3ED', badge: '−25 %' },
    { id: 'premium_monthly', name: 'Premium', period: 'Mensuel', duration: 'monthly', price: '9,99 FCFA', color: COLORS.gold },
    { id: 'premium_quarterly', name: 'Premium', period: 'Trimestriel', duration: 'quarterly', price: '24,99 FCFA', color: COLORS.gold, badge: '−18 %' },
    { id: 'premium_annual', name: 'Premium', period: 'Annuel', duration: 'annual', price: '89,99 FCFA', color: COLORS.gold, badge: '−30 %' },
];

class Student_Library extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            books: DUMMY_BOOKS,
            loading: false,
            showSubscriptionModal: false,
            selectedPlan: null,
            searchQuery: '',
            selectedCategory: 'Tous',
            showSearch: false,
        };
    }

    componentDidMount() { this.fetchBooks(); }

    _navigateToMenu = () => { switchHomePageAction(true); };

    fetchBooks = () => {
        this.setState({ loading: true });
        setTimeout(() => { this.setState({ books: DUMMY_BOOKS, loading: false }); }, 800);
    };

    openSubscriptionModal = () => { this.setState({ showSubscriptionModal: true, selectedPlan: null }); };
    closeSubscriptionModal = () => { this.setState({ showSubscriptionModal: false, selectedPlan: null }); };
    selectPlan = (planId) => { this.setState({ selectedPlan: planId }); };

    confirmSubscription = () => {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === this.state.selectedPlan);
        if (plan) alert(`Souscription réussie au plan ${plan.name} (${plan.period}) pour ${plan.price}`);
        this.closeSubscriptionModal();
    };

    navigateToBookDetail = (book) => {
        setSelectedBookAction(book);
        switchStudentBookDetailsPageAction(true);
    };

    get recommendedBooks() {
        return this.state.books.filter(b => b.isRecommended);
    }

    get newBooks() {
        return this.state.books.filter(b => b.isNew);
    }

    getFilteredBooks = () => {
        const { books, searchQuery, selectedCategory } = this.state;
        let filtered = books;
        if (selectedCategory !== 'Tous') filtered = filtered.filter(b => b.category === selectedCategory);
        if (searchQuery.trim() !== '') filtered = filtered.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return filtered;
    };

    renderHorizontalBookCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={librarystyle.horizontalCard}
            activeOpacity={0.8}
            onPress={() => this.navigateToBookDetail(item)}
        >
            <ImageBackground
                source={{ uri: item.cover }}
                style={librarystyle.horizontalCover}
                imageStyle={{ borderRadius: 12 }}
            >
                <View style={[
                    librarystyle.subscriptionBadge,
                    item.subscriptionTier === 'premium' ? librarystyle.premiumBadge : librarystyle.basicBadge
                ]}>
                    <Text style={librarystyle.subscriptionBadgeText}>
                        {item.subscriptionTier === 'premium' ? 'PREMIUM' : 'BASIC'}
                    </Text>
                </View>
            </ImageBackground>
            <View style={librarystyle.horizontalInfo}>
                <Text style={[librarystyle.horizontalTitle, styles.textBold]} numberOfLines={2}>{item.title}</Text>
                <Text style={[librarystyle.horizontalAuthor, styles.textBold]}>{item.author}</Text>
                <View style={librarystyle.categoryBadge}>
                    <Text style={[librarystyle.categoryBadgeText, styles.textBold]}>{item.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    renderBookItem = ({ item }) => (
        <TouchableOpacity
            style={librarystyle.bookCard}
            activeOpacity={0.8}
            onPress={() => this.navigateToBookDetail(item)}
        >
            <ImageBackground
                source={{ uri: item.cover }}
                style={librarystyle.bookCover}
                imageStyle={{ borderRadius: 16 }}
            >
                <View style={[
                    librarystyle.subscriptionBadge,
                    item.subscriptionTier === 'premium' ? librarystyle.premiumBadge : librarystyle.basicBadge
                ]}>
                    <Text style={librarystyle.subscriptionBadgeText}>
                        {item.subscriptionTier === 'premium' ? 'PREMIUM' : 'BASIC'}
                    </Text>
                </View>
                <View style={librarystyle.bookOverlay}>
                    <Text style={[librarystyle.bookCategory, styles.textBold]}>{item.category}</Text>
                </View>
            </ImageBackground>
            <View style={librarystyle.bookInfo}>
                <Text style={[librarystyle.bookTitle, styles.textBold]} numberOfLines={2}>{item.title}</Text>
                <Text style={[librarystyle.bookAuthor, styles.textBold]}>{item.author}</Text>
            </View>
        </TouchableOpacity>
    );

    renderHorizontalSection = (title, data) => {
        if (!data || data.length === 0) return null;
        return (
            <View style={librarystyle.horizontalSection}>
                <View style={librarystyle.sectionHeader}>
                    <Text style={[librarystyle.sectionTitle, styles.textBold]}>{title}</Text>
                    <TouchableOpacity>
                        <Text style={[librarystyle.seeAll, styles.textBold]}>Voir tout</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={librarystyle.horizontalScroll}
                >
                    {data.map(item => this.renderHorizontalBookCard(item))}
                </ScrollView>
            </View>
        );
    };

    renderCategoryFilter = () => (
        <View style={librarystyle.categoryFilterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={librarystyle.categoryFilterScroll}
            >
                {CATEGORIES.map(cat => {
                    const active = this.state.selectedCategory === cat;
                    return (
                        <TouchableOpacity
                            key={cat}
                            style={[librarystyle.categoryChip, active && librarystyle.categoryChipActive]}
                            onPress={() => this.setState({ selectedCategory: cat })}
                            activeOpacity={0.7}
                        >
                            <Text style={[librarystyle.categoryChipText, styles.textBold, active && librarystyle.categoryChipTextActive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    renderSubscriptionPlan = (plan) => {
        const isSelected = this.state.selectedPlan === plan.id;
        return (
            <TouchableOpacity
                key={plan.id}
                style={[librarystyle.planCard, isSelected && { borderColor: plan.color, borderWidth: 1.5, backgroundColor: '#F0F4FF' }]}
                onPress={() => this.selectPlan(plan.id)}
                activeOpacity={0.9}
            >
                <View style={librarystyle.planLeft}>
                    <View style={[librarystyle.planBadge, { backgroundColor: plan.color }]}>
                        <Text style={[librarystyle.planBadgeText, styles.textBold]}>{plan.name}</Text>
                    </View>
                    <View style={librarystyle.planTextGroup}>
                        <Text style={[librarystyle.planPeriod, styles.textBold]}>{plan.period}</Text>
                        <Text style={[librarystyle.planPrice, styles.textBold, { color: plan.color }]}>{plan.price}</Text>
                    </View>
                </View>
                <View style={librarystyle.planRight}>
                    {plan.badge && (
                        <View style={librarystyle.discountBadge}>
                            <Text style={[librarystyle.discountText, styles.textBold]}>{plan.badge}</Text>
                        </View>
                    )}
                    <Icon
                        name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                        size={20}
                        color={isSelected ? plan.color : COLORS.gray}
                        style={{ marginLeft: 8 }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { loading, showSubscriptionModal, selectedPlan, searchQuery, showSearch } = this.state;
        const filtered = this.getFilteredBooks();

        return (
            <SafeAreaView style={librarystyle.container}>
                <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundapp} resizeMode="cover">

                    {showSearch ? (
                        <View style={librarystyle.header}>
                            <TouchableOpacity style={librarystyle.backButton} onPress={() => this.setState({ showSearch: false, searchQuery: '' })}>
                                <Icon name="arrow-left" size={22} color={COLORS.white} />
                            </TouchableOpacity>
                            <View style={librarystyle.searchWrapper}>
                                <Icon name="magnify" size={20} color={COLORS.gray} style={{ marginLeft: 12 }} />
                                <TextInput
                                    style={[librarystyle.searchInput, styles.text]}
                                    placeholder="Rechercher un livre..."
                                    placeholderTextColor={COLORS.gray}
                                    value={searchQuery}
                                    onChangeText={t => this.setState({ searchQuery: t })}
                                    autoFocus
                                />
                                {searchQuery !== '' && (
                                    <TouchableOpacity onPress={() => this.setState({ searchQuery: '' })} style={{ marginRight: 12 }}>
                                        <Icon name="close-circle" size={18} color={COLORS.gray} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ) : (
                        <View style={librarystyle.header}>
                            <TouchableOpacity style={librarystyle.backButton} onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={[librarystyle.headerTitle, styles.textBold]}>Bibliothèque</Text>
                            <TouchableOpacity style={librarystyle.subscribeButton} onPress={this.openSubscriptionModal}>
                                <Icon name="crown" size={16} color={COLORS.white} />
                                <Text style={[librarystyle.subscribeButtonText, styles.textBold]}>S'abonner</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={librarystyle.searchIconButton} onPress={() => this.setState({ showSearch: true })}>
                                <Icon name="magnify" size={22} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {this.renderCategoryFilter()}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={librarystyle.mainScroll}
                        contentContainerStyle={librarystyle.mainScrollContent}
                    >
                        {searchQuery === '' && this.state.selectedCategory === 'Tous' && (
                            this.renderHorizontalSection('Recommandés pour vous', this.recommendedBooks)
                        )}
                        {searchQuery === '' && this.state.selectedCategory === 'Tous' && (
                            this.renderHorizontalSection('Nouveautés', this.newBooks)
                        )}

                        <View style={[librarystyle.sectionHeader, { marginTop: 8 }]}>
                            <Text style={[librarystyle.sectionTitle, styles.textBold]}>
                                {this.state.selectedCategory === 'Tous' ? 'Tous les livres' : this.state.selectedCategory}
                            </Text>
                            <Text style={[librarystyle.bookCount, styles.textBold]}>
                                {filtered.length} livre{filtered.length !== 1 ? 's' : ''}
                            </Text>
                        </View>

                        {loading ? (
                            <View style={librarystyle.loadingContainer}>
                                <Icon name="book-open-page-variant" size={48} color={COLORS.gray} />
                                <Text style={[librarystyle.loadingText, styles.textBold]}>Chargement...</Text>
                            </View>
                        ) : (
                            <View style={librarystyle.verticalGrid}>
                                {filtered.map(item => (
                                    <View key={item.id} style={{ width: '50%' }}>
                                        {this.renderBookItem({ item })}
                                    </View>
                                ))}
                                {filtered.length === 0 && (
                                    <View style={librarystyle.emptyContainer}>
                                        <Icon name="book-search" size={48} color={COLORS.gray} />
                                        <Text style={[librarystyle.emptyText, styles.textBold]}>Aucun livre trouvé</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </ScrollView>

                    <View style={{ height: 30 }} />

                    <Modal visible={showSubscriptionModal} animationType="slide" transparent onRequestClose={this.closeSubscriptionModal}>
                        <View style={librarystyle.modalOverlay}>
                            <View style={librarystyle.modalContent}>
                                <View style={librarystyle.modalHandle} />
                                <View style={librarystyle.modalHeader}>
                                    <Text style={[librarystyle.modalTitle, styles.textBold]}>Abonnement</Text>
                                    <TouchableOpacity onPress={this.closeSubscriptionModal} style={librarystyle.closeButton}>
                                        <Icon name="close" size={22} color={COLORS.gray} />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView style={librarystyle.plansList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
                                    {SUBSCRIPTION_PLANS.map(plan => this.renderSubscriptionPlan(plan))}
                                </ScrollView>
                                <TouchableOpacity
                                    style={[librarystyle.confirmButton, !selectedPlan && librarystyle.confirmButtonDisabled]}
                                    onPress={this.confirmSubscription}
                                    disabled={!selectedPlan}
                                    activeOpacity={0.8}
                                >
                                    <Icon name="check" size={18} color="white" />
                                    <Text style={[librarystyle.confirmButtonText, styles.textBold]}>
                                        {selectedPlan ? "Confirmer l'abonnement" : 'Choisissez un plan'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHomePageAction,
        setSelectedBookAction,
        switchStudentBookDetailsPageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Student_Library);