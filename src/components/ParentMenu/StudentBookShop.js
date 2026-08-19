import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bookshopstyle, COLORS } from '../../assets/styles/studnet_book_shop';
import { setSelectedBookAction, switchParentStudentBookShopDetailAction, switchStudentMenuAction, } from '../../navigations/rootNavigation';
import { styles } from '../../assets/styles';


const DUMMY_BOOKS = [
    { id: '1', title: "L'Art de la Guerre", author: 'Sun Tzu', cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg', category: 'Philosophie', rating: 4.5, price: 4500, isNew: false, isRecommended: true, content: ["Chapitre 1..."] },
    { id: '2', title: '1984', author: 'George Orwell', cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg', category: 'Science-Fiction', rating: 4.8, price: 5200, isNew: false, isRecommended: true, content: ["Chapitre 1..."] },
    { id: '3', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg', category: 'Conte', rating: 4.9, price: 3800, isNew: false, isRecommended: true, content: ["Chapitre 1..."] },
    { id: '4', title: 'Les Misérables', author: 'Victor Hugo', cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg', category: 'Roman', rating: 4.7, price: 6100, isNew: false, isRecommended: false, content: ["Livre I..."] },
    { id: '5', title: 'Crime et Châtiment', author: 'Fiodor Dostoïevski', cover: 'https://covers.openlibrary.org/b/id/7265236-L.jpg', category: 'Roman', rating: 4.6, price: 4900, isNew: false, isRecommended: true, content: ["Chapitre 1..."] },
    { id: '6', title: "L'Étranger", author: 'Albert Camus', cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg', category: 'Philosophie', rating: 4.3, price: 3500, isNew: true, isRecommended: false, content: [] },
    { id: '7', title: 'Notre-Dame de Paris', author: 'Victor Hugo', cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg', category: 'Roman', rating: 4.4, price: 5700, isNew: true, isRecommended: false, content: [] },
    { id: '8', title: 'Don Quichotte', author: 'Miguel de Cervantes', cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg', category: 'Aventure', rating: 4.2, price: 6300, isNew: true, isRecommended: false, content: [] },
    { id: '9', title: 'Le Comte de Monte-Cristo', author: 'Alexandre Dumas', cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg', category: 'Aventure', rating: 4.8, price: 7200, isNew: false, isRecommended: true, content: [] },
    { id: '10', title: 'Orgueil et Préjugés', author: 'Jane Austen', cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg', category: 'Roman', rating: 4.5, price: 4100, isNew: true, isRecommended: false, content: [] },
    { id: '11', title: 'Le Rouge et le Noir', author: 'Stendhal', cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg', category: 'Roman', rating: 4.1, price: 3900, isNew: false, isRecommended: false, content: [] },
    { id: '12', title: 'Madame Bovary', author: 'Gustave Flaubert', cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg', category: 'Roman', rating: 4.0, price: 4400, isNew: true, isRecommended: false, content: [] },
    { id: '13', title: 'Les Fleurs du Mal', author: 'Charles Baudelaire', cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg', category: 'Poésie', rating: 4.6, price: 3200, isNew: false, isRecommended: true, content: [] },
    { id: '14', title: 'Germinal', author: 'Émile Zola', cover: 'https://covers.openlibrary.org/b/id/10664041-L.jpg', category: 'Roman', rating: 4.3, price: 5100, isNew: true, isRecommended: false, content: [] },
    { id: '15', title: "L'Odyssée", author: 'Homère', cover: 'https://covers.openlibrary.org/b/id/8226191-L.jpg', category: 'Aventure', rating: 4.7, price: 5800, isNew: false, isRecommended: true, content: [] },
    { id: '16', title: 'Hamlet', author: 'William Shakespeare', cover: 'https://covers.openlibrary.org/b/id/8575708-L.jpg', category: 'Théâtre', rating: 4.4, price: 3600, isNew: true, isRecommended: false, content: [] },
];

const CATEGORIES = ['Tous', 'Philosophie', 'Science-Fiction', 'Conte', 'Roman', 'Aventure', 'Poésie', 'Théâtre'];

class BookShop extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            books: DUMMY_BOOKS,
            loading: false,
            searchQuery: '',
            selectedCategory: 'Tous',
            showSearch: false,  //Contrôle l'affichage de la barre de recherche
        };
    }

    componentDidMount() { this.fetchBooks(); }

    _navigateToMenu = () => { switchStudentMenuAction(true); };

    fetchBooks = () => {
        this.setState({ loading: true });
        setTimeout(() => { this.setState({ books: DUMMY_BOOKS, loading: false }); }, 800);
    };

    navigateToBookDetail = (book) => {
        setSelectedBookAction(book);
        switchParentStudentBookShopDetailAction(true);
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

    renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        const empty = 5 - full - (half ? 1 : 0);
        return (
            <View style={bookshopstyle.starsContainer}>
                {[...Array(full)].map((_, i) => <Icon key={`f${i}`} name="star" size={12} color="#F59E0B" />)}
                {half && <Icon name="star-half-full" size={12} color="#F59E0B" />}
                {[...Array(empty)].map((_, i) => <Icon key={`e${i}`} name="star-outline" size={12} color="#D1D5DB" />)}
                <Text style={bookshopstyle.ratingText}>{rating.toFixed(1)}</Text>
            </View>
        );
    };

    formatPrice = (p) => p ? p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA' : '';

    renderHorizontalBookCard = (item) => {
        const isPaid = this.props.paidBooks?.[item.id] || false;
        return (
            <TouchableOpacity
                key={item.id}
                style={bookshopstyle.horizontalCard}
                activeOpacity={0.8}
                onPress={() => this.navigateToBookDetail(item)}
            >
                <ImageBackground
                    source={{ uri: item.cover }}
                    style={bookshopstyle.horizontalCover}
                    imageStyle={{ borderRadius: 12 }}
                />
                <View style={bookshopstyle.horizontalInfo}>
                    <Text style={[bookshopstyle.horizontalTitle, styles.textBold]} numberOfLines={2}>{item.title}</Text>
                    <Text style={[bookshopstyle.horizontalAuthor, styles.textBold]}>{item.author}</Text>
                    {this.renderStars(item.rating)}
                    {isPaid ? (
                        <View style={bookshopstyle.paidBadge}>
                            <Icon name="check-circle" size={12} color={COLORS.white} />
                            <Text style={[bookshopstyle.paidText, styles.textBold]}>Payé</Text>
                        </View>
                    ) : (
                        <Text style={[bookshopstyle.horizontalPrice, styles.textBold]}>{this.formatPrice(item.price)}</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    renderBookItem = ({ item }) => {
        const isPaid = this.props.paidBooks?.[item.id] || false;
        return (
            <TouchableOpacity
                style={bookshopstyle.bookCard}
                activeOpacity={0.8}
                onPress={() => this.navigateToBookDetail(item)}
            >
                <ImageBackground
                    source={{ uri: item.cover }}
                    style={bookshopstyle.bookCover}
                    imageStyle={{ borderRadius: 16 }}
                />
                <View style={bookshopstyle.bookInfo}>
                    <Text style={[bookshopstyle.bookTitle, styles.textBold]} numberOfLines={2}>{item.title}</Text>
                    <Text style={[bookshopstyle.bookAuthor, styles.textBold]}>{item.author}</Text>
                    {this.renderStars(item.rating)}
                    {isPaid ? (
                        <View style={bookshopstyle.paidBadge}>
                            <Icon name="check-circle" size={14} color={COLORS.white} />
                            <Text style={[bookshopstyle.paidText, styles.textBold]}>Payé</Text>
                        </View>
                    ) : (
                        <Text style={[bookshopstyle.bookPrice, styles.textBold]}>{this.formatPrice(item.price)}</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    renderHorizontalSection = (title, data) => {
        if (!data || data.length === 0) return null;
        return (
            <View style={bookshopstyle.horizontalSection}>
                <View style={bookshopstyle.sectionHeader}>
                    <Text style={[bookshopstyle.sectionTitle, styles.textBold]}>{title}</Text>
                    <TouchableOpacity>
                        <Text style={[bookshopstyle.seeAll, styles.textBold]}>Voir tout</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={bookshopstyle.horizontalScroll}
                >
                    {data.map(item => this.renderHorizontalBookCard(item))}
                </ScrollView>
            </View>
        );
    };

    renderCategoryFilter = () => (
        <View style={bookshopstyle.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={bookshopstyle.categoryScroll}>
                {CATEGORIES.map(cat => {
                    const active = this.state.selectedCategory === cat;
                    return (
                        <TouchableOpacity
                            key={cat}
                            style={[bookshopstyle.categoryChip, active && bookshopstyle.categoryChipActive]}
                            onPress={() => this.setState({ selectedCategory: cat })}
                        >
                            <Text style={[bookshopstyle.categoryChipText, styles.textBold, active && bookshopstyle.categoryChipTextActive, styles.textBold]}>{cat}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    render() {
        const { searchQuery, showSearch } = this.state;
        const filtered = this.getFilteredBooks();

        return (
            <SafeAreaView style={bookshopstyle.container}>
                <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.backgroundapp} resizeMode="cover">

                    {showSearch ? (
                        <View style={bookshopstyle.header}>
                            <TouchableOpacity style={bookshopstyle.backButton} onPress={() => this.setState({ showSearch: false, searchQuery: '' })}>
                                <Icon name="arrow-left" size={22} color={COLORS.white} />
                            </TouchableOpacity>
                            <View style={bookshopstyle.searchWrapper}>
                                <Icon name="magnify" size={20} color={COLORS.gray} style={{ marginLeft: 12 }} />
                                <TextInput
                                    style={[bookshopstyle.searchInput, styles.text]}
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

                        <View style={bookshopstyle.header}>
                            <TouchableOpacity style={bookshopstyle.backButton} onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={[bookshopstyle.headerTitle, styles.textBold]}>Librairie</Text>
                            <TouchableOpacity
                                style={bookshopstyle.searchIconButton}
                                onPress={() => this.setState({ showSearch: true })}
                            >
                                <Icon name="magnify" size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {this.renderCategoryFilter()}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={bookshopstyle.mainScroll}
                        contentContainerStyle={bookshopstyle.mainScrollContent}
                    >
                        {searchQuery === '' && this.state.selectedCategory === 'Tous' && (
                            this.renderHorizontalSection('Recommandés pour vous', this.recommendedBooks)
                        )}

                        {searchQuery === '' && this.state.selectedCategory === 'Tous' && (
                            this.renderHorizontalSection('Nouveautés', this.newBooks)
                        )}

                        <View style={[bookshopstyle.sectionHeader, { marginTop: 8 }]}>
                            <Text style={[bookshopstyle.sectionTitle, styles.textBold]}>
                                {this.state.selectedCategory === 'Tous' ? 'Tous les livres' : `${this.state.selectedCategory}`}
                            </Text>
                            <Text style={[bookshopstyle.bookCount, styles.textBold]}>
                                {filtered.length} livre{filtered.length !== 1 ? 's' : ''}
                            </Text>
                        </View>

                        <View style={bookshopstyle.verticalGrid}>
                            {filtered.map(item => (
                                <View key={item.id} style={{ width: '50%' }}>
                                    {this.renderBookItem({ item })}
                                </View>
                            ))}
                            {filtered.length === 0 && (
                                <View style={bookshopstyle.emptyContainer}>
                                    <Icon name="book-search" size={48} color={COLORS.gray} />
                                    <Text style={[bookshopstyle.emptyText, styles.textBold]}>Aucun livre trouvé</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    <View style={{ height: 25 }} />
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchStudentMenuAction,
        setSelectedBookAction,
        switchParentStudentBookShopDetailAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    paidBooks: state.navigation.paidBooks,
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShop);