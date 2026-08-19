import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ImageBackground, SafeAreaView, Animated, Easing, Dimensions, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { contactstyle } from '../../assets/styles/contact';
import { styles } from '../../assets/styles';
import { switchChatPageAction, switchMessagePageAction } from '../../navigations/rootNavigation';


class ContactIndex extends Component {
    constructor(props) {
        super(props);

        this.animatedValues = {};
        this.itemScaleValues = {};
        this.searchWidth = new Animated.Value(0);
        this.searchIconScale = new Animated.Value(1);
        this.clearButtonOpacity = new Animated.Value(0);
        this.fabScale = new Animated.Value(0);
        this.fabOpacity = new Animated.Value(0);
        this.fabRotation = new Animated.Value(0);
        this.listEntranceAnims = [];

        this.state = {
            searchText: '',
            selectedContacts: [],
            isSearchFocused: false,
        };

        this.contacts = [
            { id: '1', name: 'CallApp (Vous)', avatar: require('../../assets/images/profil.png'), about: 'Envoyez-vous un message' },
            { id: '2', name: 'Yannick', avatar: require('../../assets/images/profil.png'), about: 'Occupé(e)' },
            { id: '3', name: 'Dumerile', avatar: require('../../assets/images/profil.png'), about: "Ma philosophie : m'accepter co..." },
            { id: '4', name: 'Alphonse', avatar: require('../../assets/images/profil.png') },
            { id: '5', name: 'Marie', avatar: require('../../assets/images/profil.png'), about: "L'art le plus noble est de rendre ..." },
            { id: '6', name: 'Arielle', avatar: require('../../assets/images/profil.png') },
        ];

        // Bind methods
        this.triggerListEntranceAnimation = this.triggerListEntranceAnimation.bind(this);
        this.animateSelection = this.animateSelection.bind(this);
        this.animateFAB = this.animateFAB.bind(this);
        this.animateClearButton = this.animateClearButton.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.filteredContacts = this.filteredContacts.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.handleNavigateBack = this.handleNavigateBack.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderSearchBar = this.renderSearchBar.bind(this);
        this.renderQuickActions = this.renderQuickActions.bind(this);
        this.renderContactItem = this.renderContactItem.bind(this);
        this.renderFloatingActionButton = this.renderFloatingActionButton.bind(this);
    }

    componentDidMount() {
        this.triggerListEntranceAnimation();
    }

    _navigateToMessage = () => {
        switchMessagePageAction(true);
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedContacts.length !== this.state.selectedContacts.length) {
            this.animateFAB();
        }
    }


    triggerListEntranceAnimation() {
        const filtered = this.filteredContacts();
        this.listEntranceAnims = filtered.map(() => new Animated.Value(0));

        const animations = filtered.map((_, index) =>
            Animated.timing(this.listEntranceAnims[index], {
                toValue: 1,
                duration: 400,
                delay: index * 35,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            })
        );

        Animated.stagger(20, animations).start();
    }

    animateSelection(id, toValue) {
        if (!this.animatedValues[id]) this.animatedValues[id] = new Animated.Value(0);
        if (!this.itemScaleValues[id]) this.itemScaleValues[id] = new Animated.Value(1);

        Animated.parallel([
            Animated.timing(this.animatedValues[id], {
                toValue,
                duration: 180,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(this.itemScaleValues[id], {
                toValue: toValue === 1 ? 1.015 : 1,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }

    animateFAB() {
        const shouldShow = this.state.selectedContacts.length >= 2;

        if (shouldShow) {
            Animated.parallel([
                Animated.spring(this.fabScale, { toValue: 1, friction: 6, tension: 70, useNativeDriver: true }),
                Animated.timing(this.fabOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
                Animated.timing(this.fabRotation, { toValue: 1, duration: 450, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(this.fabScale, { toValue: 0, friction: 8, useNativeDriver: true }),
                Animated.timing(this.fabOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
                Animated.timing(this.fabRotation, { toValue: 0, duration: 200, useNativeDriver: true }),
            ]).start();
        }
    }

    animateClearButton(visible) {
        Animated.timing(this.clearButtonOpacity, {
            toValue: visible ? 1 : 0,
            duration: 180,
            useNativeDriver: true,
        }).start();
    }


    handleFocus() {
        this.setState({ isSearchFocused: true });
        Animated.parallel([
            Animated.timing(this.searchWidth, { toValue: 1, duration: 250, useNativeDriver: false }),
            Animated.spring(this.searchIconScale, { toValue: 1.1, friction: 6, useNativeDriver: true }),
        ]).start();
    }

    handleBlur() {
        this.setState({ isSearchFocused: false });
        Animated.parallel([
            Animated.timing(this.searchWidth, { toValue: 0, duration: 200, useNativeDriver: false }),
            Animated.spring(this.searchIconScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        ]).start();
    }


    filteredContacts() {
        const { searchText } = this.state;
        if (!searchText.trim()) return this.contacts;
        return this.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    onSearchChange(text) {
        this.setState({ searchText: text }, () => {
            this.triggerListEntranceAnimation();
            this.animateClearButton(text.length > 0);
        });
    }

    clearSearch() {
        this.setState({ searchText: '' });
        this.animateClearButton(false);
    }

    toggleSelection(id) {
        const isCurrentlySelected = this.state.selectedContacts.includes(id);

        this.setState((prev) => ({
            selectedContacts: isCurrentlySelected
                ? prev.selectedContacts.filter((cid) => cid !== id)
                : [...prev.selectedContacts, id],
        }), () => {
            this.animateSelection(id, isCurrentlySelected ? 0 : 1);
        });
        switchChatPageAction(true)
    }

    createGroup() {
        const { selectedContacts } = this.state;
        if (selectedContacts.length < 2) return;

        Animated.sequence([
            Animated.timing(this.fabRotation, { toValue: 2, duration: 300, useNativeDriver: true }),
            Animated.spring(this.fabScale, { toValue: 0.85, friction: 4, useNativeDriver: true }),
        ]).start(() => {
            this.fabScale.setValue(1);
            this.fabRotation.setValue(1);
        });

        Alert.alert(
            "Créer un groupe",
            `Créer un groupe avec ${selectedContacts.length} participants ?`,
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Créer",
                    onPress: () => Alert.alert("✅ Succès", "Groupe créé avec succès !")
                },
            ]
        );
    }

    handleNavigateBack() {
        const { switchContactPageAction } = this.props;
        if (switchContactPageAction) {
            switchContactPageAction(false);
        }
    }


    renderHeader() {
        return (
            <View style={contactstyle.header}>
                <View style={styles.section}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={this._navigateToMessage}>
                            <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.sectionTitle, styles.textBold]}>Nouvelle discussion</Text>
                </View>

                <TouchableOpacity style={contactstyle.dots}>
                    <Icon name="dots-vertical" size={26} color="#fff" />
                </TouchableOpacity>
            </View>
        );
    }

    renderSearchBar() {
        const searchWidthInterpolate = this.searchWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ['92%', '96%'],
        });

        return (
            <Animated.View style={[contactstyle.searchContainer, { width: searchWidthInterpolate }]}>
                <Animated.View style={{ transform: [{ scale: this.searchIconScale }] }}>
                    <Icon name="magnify" size={22} color="#8691A1" style={contactstyle.searchIcon} />
                </Animated.View>

                <TextInput
                    style={[contactstyle.searchInput, styles.text]}
                    placeholder="Recherchez un nom ou un numéro"
                    placeholderTextColor="#8691A1"
                    value={this.state.searchText}
                    onChangeText={this.onSearchChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    returnKeyType="search"
                />

                <Animated.View style={{ opacity: this.clearButtonOpacity }}>
                    <TouchableOpacity onPress={this.clearSearch} style={contactstyle.clearButton}>
                        <Icon name="close-circle" size={20} color="#8691A1" />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        );
    }

    renderQuickActions() {
        return (
            <View style={contactstyle.quickActions}>
                <TouchableOpacity style={contactstyle.actionItem} onPress={() => Alert.alert('Nouveau groupe', 'Fonctionnalité à venir')}>
                    <View style={contactstyle.actionIconContainer}>
                        <Icon name="account-multiple-plus" size={28} color="#00A884" />
                    </View>
                    <Text style={[contactstyle.actionText, styles.textBold]}>Nouveau groupe</Text>
                </TouchableOpacity>
                <View style={contactstyle.actionItem}>
                    <View style={contactstyle.actionIconContainer}>
                        <Image style={contactstyle.teacher} source={require('../../assets/images/teacher.png')} />
                    </View>
                    <Text style={[contactstyle.actionText, styles.textBold]}>Contact des professeur</Text>
                </View>
                {/* <TouchableOpacity style={contactstyle.actionItem} onPress={() => Alert.alert('Nouvelle communauté', 'Fonctionnalité à venir')}>
                    <View style={contactstyle.actionIconContainer}>
                        <Icon name="account-group" size={28} color="#00A884" />
                    </View>
                    <Text style={contactstyle.actionText}>Nouvelle communauté</Text>
                </TouchableOpacity> */}
            </View>
        );
    }

    renderContactItem({ item, index }) {
        const isSelected = this.state.selectedContacts.includes(item.id);
        const entranceAnim = this.listEntranceAnims[index] || new Animated.Value(1);
        const scaleAnim = this.animatedValues[item.id] || new Animated.Value(0);
        const itemScale = this.itemScaleValues[item.id] || new Animated.Value(1);

        const translateY = entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] });
        const opacity = entranceAnim;

        return (
            <Animated.View
                style={[
                    contactstyle.contactItem,
                    { opacity, transform: [{ translateY }, { scale: itemScale }] },
                ]}
            >
                <TouchableOpacity
                    style={contactstyle.contactTouchable}
                    onPress={() => this.toggleSelection(item.id)}
                    activeOpacity={0.85}
                >
                    <Image source={item.avatar} style={contactstyle.avatar} />

                    <View style={contactstyle.contactInfo}>
                        <Text style={[contactstyle.contactName, styles.textBold]}>{item.name}</Text>
                        {item.about && <Text style={[contactstyle.contactAbout, styles.text]} numberOfLines={1}>{item.about}</Text>}
                        {/* {item.status && !item.about && <Text style={contactstyle.contactStatus}>{item.status}</Text>} */}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    renderFloatingActionButton() {
        const selectedCount = this.state.selectedContacts.length;
        const rotationInterpolate = this.fabRotation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['0deg', '135deg', '270deg'],
        });

        return (
            <Animated.View
                style={[
                    contactstyle.fabContainer,
                    { transform: [{ scale: this.fabScale }], opacity: this.fabOpacity },
                ]}
            >
                <TouchableOpacity style={contactstyle.fab} onPress={this.createGroup} activeOpacity={0.85}>
                    <Animated.View style={{ transform: [{ rotate: rotationInterpolate }] }}>
                        <Icon name="account-multiple-plus" size={28} color="#fff" />
                    </Animated.View>

                    {selectedCount > 0 && (
                        <View style={contactstyle.fabBadge}>
                            <Text style={[contactstyle.fabBadgeText, styles.text]}>{selectedCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    }

    render() {
        return (
            <SafeAreaView style={contactstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    {this.renderHeader()}
                    {this.renderSearchBar()}

                    <FlatList
                        data={this.filteredContacts()}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={this.renderQuickActions}
                        renderItem={this.renderContactItem}
                        contentContainerStyle={contactstyle.listContent}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                    />

                    {this.renderFloatingActionButton()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchChatPageAction,
        switchMessagePageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactIndex);