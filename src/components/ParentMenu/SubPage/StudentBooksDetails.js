import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ImageBackground, Animated, ScrollView, Modal, FlatList, SafeAreaView, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bookdetailstyle, COLORS } from '../../../assets/styles/book_details';
import { switchParentStudentLibrarytAction } from '../../../navigations/rootNavigation';
import { styles } from '../../../assets/styles';

const { width } = Dimensions.get('window');

class BookDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showReader: false,
            currentPage: 0,
            scrollY: new Animated.Value(0),
        };
        this.pageListRef = null;
    }

    _navigateBack = () => {
        switchParentStudentLibrarytAction(true);
    };

    openReader = () => this.setState({ showReader: true, currentPage: 0 });
    closeReader = () => this.setState({ showReader: false });

    get book() {
        return this.props.selectedBook;
    }

    get pages() {
        if (!this.book || !this.book.content) return ['Aucun contenu disponible pour ce livre.'];
        return this.book.content;
    }

    goToPage = (index) => {
        if (index >= 0 && index < this.pages.length) {
            this.setState({ currentPage: index });
            this.pageListRef?.scrollToIndex({ index, animated: true });
        }
    };

    nextPage = () => this.goToPage(this.state.currentPage + 1);
    prevPage = () => this.goToPage(this.state.currentPage - 1);

    onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            this.setState({ currentPage: viewableItems[0].index });
        }
    };

    viewabilityConfig = { itemVisiblePercentThreshold: 50 };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[bookdetailstyle.header, { opacity: headerOpacity }]}>
                <View style={bookdetailstyle.headerSection}>
                    <TouchableOpacity style={bookdetailstyle.headerButton} onPress={this._navigateBack}>
                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                    </TouchableOpacity>
                    <Text style={[bookdetailstyle.headerTitle, styles.textBold]} numberOfLines={1}>
                        {this.book?.title || 'Détails du livre'}
                    </Text>
                    <View style={{ width: 24 }} />
                </View>
            </Animated.View>
        );
    };

    renderPage = ({ item, index }) => (
        <View style={bookdetailstyle.pageContainer}>
            <Text style={bookdetailstyle.pageNumber}>
                Page {index + 1} / {this.pages.length}
            </Text>
            <ScrollView
                style={bookdetailstyle.pageScroll}
                showsVerticalScrollIndicator={false}
            >
                <Text style={bookdetailstyle.pageText}>{item}</Text>
            </ScrollView>
        </View>
    );

    render() {
        // ✅ Vérification avec la nouvelle prop Redux
        if (!this.book) {
            return (
                <SafeAreaView style={bookdetailstyle.container}>
                    <View style={bookdetailstyle.empty}>
                        <Text style={{ color: '#666' }}>Aucun Contenu trouvé</Text>
                    </View>
                </SafeAreaView>
            );
        }

        const { showReader, currentPage } = this.state;

        return (
            <View style={bookdetailstyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={bookdetailstyle.scrollArea}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >


                        <View style={bookdetailstyle.headerSection}>
                            <TouchableOpacity style={bookdetailstyle.headerButton} onPress={this._navigateBack}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={[bookdetailstyle.headerTitle, styles.textBold]} numberOfLines={1}>
                                {this.book?.title || 'Détails du livre'}
                            </Text>
                            <View style={{ width: 24 }} />
                        </View>

                        <View style={bookdetailstyle.heroSection}>
                            <Image source={{ uri: this.book.cover }} style={bookdetailstyle.cover} />
                            <Text style={[bookdetailstyle.title, styles.textBold]}>{this.book.title}</Text>
                            <Text style={[bookdetailstyle.author, styles.textBold]}>{this.book.author}</Text>
                            <View style={bookdetailstyle.categoryBadge}>
                                <Icon name="bookmark" size={14} color={COLORS.primary} />
                                <Text style={bookdetailstyle.categoryText}>{this.book.category}</Text>
                            </View>
                        </View>

                        <View style={bookdetailstyle.section}>
                            <Text style={[bookdetailstyle.sectionTitle, styles.textBold]}>Informations</Text>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={bookdetailstyle.label}>Auteur</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>{this.book.author}</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Catégorie</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>{this.book.category}</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Pages</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>{this.pages.length}</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Édition</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>2023, 3ᵉ édition</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Langue</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>Français</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>ISBN</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>978-2-1234-5678-9</Text>
                            </View>
                        </View>

                        <View style={bookdetailstyle.section}>
                            <Text style={[bookdetailstyle.sectionTitle, styles.textBold]}>Résumé</Text>
                            <Text style={[bookdetailstyle.summaryText, styles.textBold]}>
                                Un chef-d'œuvre intemporel qui explore les profondeurs de l'âme humaine.
                                Ce livre vous emmènera dans un voyage à travers le temps et l'espace, mêlant
                                aventure, philosophie et émotions. Une lecture incontournable pour tous les amoureux
                                de la littérature classique.
                            </Text>
                        </View>

                        <TouchableOpacity style={bookdetailstyle.readButton} onPress={this.openReader}>
                            <Icon name="book-open" size={20} color={COLORS.white} />
                            <Text style={[bookdetailstyle.readButtonText, styles.textBold]}>Lire le livre</Text>
                        </TouchableOpacity>

                        <View style={{ height: 60 }} />
                    </Animated.ScrollView>

                    {this.renderHeader()}
                </ImageBackground>

                <Modal
                    visible={showReader}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={this.closeReader}
                >
                    <View style={bookdetailstyle.readerContainer}>
                        <View style={bookdetailstyle.readerHeader}>
                            <TouchableOpacity onPress={this.closeReader}>
                                <Icon name="close" size={24} color={COLORS.dark} />
                            </TouchableOpacity>
                            <Text style={[bookdetailstyle.readerTitle, styles.textBold]} numberOfLines={1}>
                                {this.book.title}
                            </Text>
                            <TouchableOpacity onPress={() => this.goToPage(this.pages.length - 1)}>
                                <Icon name="flag-variant" size={22} color={COLORS.dark} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            ref={(ref) => (this.pageListRef = ref)}
                            data={this.pages}
                            renderItem={this.renderPage}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={this.onViewableItemsChanged}
                            viewabilityConfig={this.viewabilityConfig}
                            getItemLayout={(data, index) => ({
                                length: width,
                                offset: width * index,
                                index,
                            })}
                            initialScrollIndex={0}
                        />

                        <View style={bookdetailstyle.readerFooter}>
                            <TouchableOpacity
                                onPress={this.prevPage}
                                disabled={currentPage === 0}
                                style={[
                                    bookdetailstyle.navButton,
                                    currentPage === 0 && bookdetailstyle.navButtonDisabled,
                                ]}
                            >
                                <Icon
                                    name="chevron-left"
                                    size={28}
                                    color={currentPage === 0 ? '#ccc' : COLORS.primary}
                                />
                            </TouchableOpacity>

                            <View style={bookdetailstyle.pageIndicator}>
                                {this.pages.map((_, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            bookdetailstyle.dot,
                                            i === currentPage && bookdetailstyle.dotActive,
                                        ]}
                                    />
                                ))}
                            </View>

                            <TouchableOpacity
                                onPress={this.nextPage}
                                disabled={currentPage === this.pages.length - 1}
                                style={[
                                    bookdetailstyle.navButton,
                                    currentPage === this.pages.length - 1 && bookdetailstyle.navButtonDisabled,
                                ]}
                            >
                                <Icon
                                    name="chevron-right"
                                    size={28}
                                    color={currentPage === this.pages.length - 1 ? '#ccc' : COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchParentStudentLibrarytAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    selectedBook: state.navigation.selectedBook, // ✅ Récupère le livre depuis Redux
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);