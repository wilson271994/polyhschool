import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Animated, Modal, SafeAreaView, ImageBackground, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bookdetailstyle, COLORS } from '../../../assets/styles/book_details';
import { setPaidBookAction, switchParentStudentBookShopAction } from '../../../navigations/rootNavigation';
import { styles } from '../../../assets/styles';

const PAYMENT_METHODS = [
    { id: 'orange', name: 'Orange Money', icon: 'cellphone', color: '#FF6600' },
    { id: 'mtn', name: 'MTN Mobile Money', icon: 'cellphone', color: '#FFCC00' },
    { id: 'visa', name: 'Carte Visa', icon: 'credit-card', color: '#1A1F71' },
    { id: 'mastercard', name: 'Carte Mastercard', icon: 'credit-card', color: '#EB001B' },
];

class BookShopDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showPaymentModal: false,
            selectedPayment: null,
            paymentSuccess: false,
            scrollY: new Animated.Value(0),
        };
    }

    _navigateBack = () => {
        switchParentStudentBookShopAction(true);
    };

    get book() { return this.props.selectedBook; }
    get isPaid() { return this.props.paidBooks?.[this.book?.id] || false; }

    openPaymentModal = () => this.setState({ showPaymentModal: true, selectedPayment: null, paymentSuccess: false });
    closePaymentModal = () => this.setState({ showPaymentModal: false });
    selectPaymentMethod = (id) => this.setState({ selectedPayment: id });

    confirmPayment = () => {
        if (!this.state.selectedPayment) return;
        this.setState({ paymentSuccess: true });
        setPaidBookAction(this.book.id);
        setTimeout(() => this.closePaymentModal(), 1500);
    };

    formatPrice = (p) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';

    renderStars = (r) => {
        const f = Math.floor(r), h = r % 1 >= 0.5, e = 5 - f - (h ? 1 : 0);
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                {[...Array(f)].map((_, i) => <Icon key={`f${i}`} name="star" size={16} color="#F59E0B" />)}
                {h && <Icon name="star-half-full" size={16} color="#F59E0B" />}
                {[...Array(e)].map((_, i) => <Icon key={`e${i}`} name="star-outline" size={16} color="#D1D5DB" />)}
                <Text style={{ marginLeft: 6, fontWeight: '600', color: '#F59E0B' }}>{r.toFixed(1)}</Text>
            </View>
        );
    };

    renderHeader = () => {
        const opacity = this.state.scrollY.interpolate({ inputRange: [0, 100], outputRange: [0, 1], extrapolate: 'clamp' });
        return (
            <Animated.View style={[bookdetailstyle.header, { opacity }]}>
                <View style={bookdetailstyle.headerSection}>
                    <TouchableOpacity onPress={this._navigateBack}>
                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                    </TouchableOpacity>
                    <Text style={[bookdetailstyle.headerTitle, styles.textBold]} numberOfLines={1}>{this.book?.title || 'Détails'}</Text>
                    <View style={{ width: 24 }} />
                </View>
            </Animated.View>
        );
    };

    render() {
        if (!this.book) return <SafeAreaView style={bookdetailstyle.container}><Text style={{ color: '#666', textAlign: 'center', marginTop: 50 }}>Aucun livre sélectionné</Text></SafeAreaView>;
        const { showPaymentModal, selectedPayment, paymentSuccess } = this.state;
        return (
            <View style={bookdetailstyle.container}>
                <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.backgroundapp} resizeMode="cover">
                    <Animated.ScrollView style={bookdetailstyle.scrollArea} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: false })} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateBack}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={bookdetailstyle.heroSection}>
                            <Image source={{ uri: this.book.cover }} style={bookdetailstyle.cover} />
                            <Text style={[bookdetailstyle.title, styles.textBold]}>{this.book.title}</Text>
                            <Text style={[bookdetailstyle.author, styles.textBold]}>{this.book.author}</Text>
                            <View style={bookdetailstyle.categoryBadge}><Icon name="bookmark" size={14} color={COLORS.primary} /><Text style={bookdetailstyle.categoryText}>{this.book.category}</Text></View>
                        </View>
                        <View style={bookdetailstyle.section}>
                            <Text style={[bookdetailstyle.sectionTitle, styles.textBold]}>Notation</Text>
                            {this.renderStars(this.book.rating)}
                        </View>
                        <View style={bookdetailstyle.section}>
                            <Text style={[bookdetailstyle.sectionTitle, styles.textBold]}>Informations</Text>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Auteur</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>{this.book.author}</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Catégorie</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>{this.book.category}</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Pages</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>{this.book.content?.length || 0}</Text>
                            </View>
                            <View style={bookdetailstyle.infoRow}>
                                <Text style={[bookdetailstyle.label, styles.textBold]}>Langue</Text>
                                <Text style={[bookdetailstyle.value, styles.textBold]}>Français</Text>
                            </View>
                        </View>
                        <View style={bookdetailstyle.section}>
                            <Text style={[bookdetailstyle.sectionTitle, styles.textBold]}>Résumé</Text>
                            <Text style={[bookdetailstyle.summaryText, styles.textBold]}>Un chef-d'œuvre intemporel...</Text>
                        </View>
                        {this.isPaid ? (
                            <View style={bookdetailstyle.paidButton}>
                                <Icon name="check-circle" size={22} color={COLORS.white} />
                                <Text style={[bookdetailstyle.paidButtonText, styles.textBold]}>Payé</Text>
                            </View>
                        ) : (
                            <TouchableOpacity style={bookdetailstyle.buyButton} onPress={this.openPaymentModal}>
                                <Icon name="cart" size={20} color={COLORS.white} />
                                <Text style={[bookdetailstyle.buyButtonText, styles.textBold]}>Acheter - {this.formatPrice(this.book.price)}</Text>
                            </TouchableOpacity>
                        )}
                        <View style={{ height: 65 }} />
                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>

                <Modal visible={showPaymentModal} animationType="slide" transparent onRequestClose={this.closePaymentModal}>
                    <View style={bookdetailstyle.paymentOverlay}>
                        <View style={bookdetailstyle.paymentModal}>
                            <View style={bookdetailstyle.paymentHandle} />
                            {paymentSuccess ? (
                                <View style={bookdetailstyle.successContainer}>
                                    <Icon name="check-decagram" size={64} color={COLORS.accent} />
                                    <Text style={[bookdetailstyle.successText, styles.textBold]}>Paiement réussi !</Text>
                                </View>
                            ) : (
                                <>
                                    <View style={bookdetailstyle.paymentHeader}>
                                        <Text style={[bookdetailstyle.paymentTitle, styles.textBold]}>Paiement</Text>
                                        <TouchableOpacity onPress={this.closePaymentModal}>
                                            <Icon name="close" size={22} color={COLORS.gray} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[bookdetailstyle.paymentAmount, styles.textBold]}>Montant : {this.formatPrice(this.book.price)}</Text>
                                    <Text style={[bookdetailstyle.paymentSubtitle, styles.text]}>Choisissez le moyen de paiement</Text>
                                    {PAYMENT_METHODS.map(m => (
                                        <TouchableOpacity key={m.id} style={[bookdetailstyle.paymentMethod, selectedPayment === m.id && bookdetailstyle.paymentMethodActive]} onPress={() => this.selectPaymentMethod(m.id)}>
                                            <Icon name={m.icon} size={24} color={m.color} />
                                            <Text style={[bookdetailstyle.paymentMethodText, styles.textBold]}>{m.name}</Text>
                                            <Icon name={selectedPayment === m.id ? 'radiobox-marked' : 'radiobox-blank'} size={22} color={selectedPayment === m.id ? COLORS.accent : COLORS.gray} />
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity style={[bookdetailstyle.validateButton, !selectedPayment && bookdetailstyle.validateButtonDisabled]} onPress={this.confirmPayment} disabled={!selectedPayment}>
                                        <Icon name="lock" size={18} color={COLORS.white} /><Text style={bookdetailstyle.validateButtonText}>Payer maintenant</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchParentStudentBookShopAction,
        setPaidBookAction
    }, dispatch)
});
const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos, selectedBook: state.navigation.selectedBook,
    paidBooks: state.navigation.paidBooks
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShopDetail);