import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator, } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { advancesearchstyle } from '../../assets/styles/advanceSearch';
import { styles } from '../../assets/styles';
import { switchCoursePageAction } from '../../navigations/rootNavigation';

class AdvanceMessageFilter extends PureComponent {
    state = {
        searchText: '',
        debouncedSearchText: '',
        selectedSubject: 'Toutes',
        selectedType: 'Tous',
        allChats: [],
        isSearching: false,
    };

    debounceTimer = null;

    componentDidMount() {
        // Récupération des conversations passées en paramètre
        const { allChats } = this.props.route?.params || {};   // ← Changement important
        if (allChats) {
            this.setState({ allChats });
        }
    }

    componentWillUnmount() {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
    }

    // Recherche dans le nom OU dans le dernier message
    handleSearchChange = (text) => {
        this.setState({ searchText: text, isSearching: true });

        if (this.debounceTimer) clearTimeout(this.debounceTimer);

        this.debounceTimer = setTimeout(() => {
            this.setState({
                debouncedSearchText: text.trim().toLowerCase(),
                isSearching: false,
            });
        }, 300);
    };

    getFilteredChats = () => {
        const { allChats, debouncedSearchText } = this.state;
        let filtered = allChats || [];

        if (debouncedSearchText) {
            const term = debouncedSearchText;

            filtered = filtered.filter(chat =>
                (chat.name && chat.name.toLowerCase().includes(term)) ||           // Recherche par nom
                (chat.lastMsg && chat.lastMsg.toLowerCase().includes(term))        // Recherche dans le dernier message
            );
        }

        // Tri par date (du plus récent au plus ancien)
        return [...filtered].sort((a, b) => {
            // Si tu as un champ date réel, utilise-le. Sinon on simule avec le temps affiché
            return b.time.localeCompare(a.time); // Tri simple par temps
        });
    };

    clearSearch = () => this.setState({ searchText: '', debouncedSearchText: '' });

    _navigateToMenu = () => {
        switchCoursePageAction(true);
    };

    renderChat = ({ item }) => (
        <TouchableOpacity style={advancesearchstyle.chatRow} activeOpacity={0.8}>
            <Image source={item.avatar} style={advancesearchstyle.avatar} />
            <View style={advancesearchstyle.chatInfo}>
                <Text style={[advancesearchstyle.chatName, styles.textBold]}>{item.name}</Text>
                <Text style={[advancesearchstyle.lastMessage, styles.text]} numberOfLines={1}>
                    {item.lastMsg}
                </Text>
            </View>
            <View style={advancesearchstyle.chatRight}>
                <Text style={[advancesearchstyle.time, styles.text]}>{item.time}</Text>
                {item.unread > 0 && (
                    <View style={advancesearchstyle.unreadBadge}>
                        <Text style={[advancesearchstyle.unreadText, styles.textBold]}>{item.unread}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    render() {
        const { searchText, isSearching } = this.state;
        const filteredChats = this.getFilteredChats();
        const resultsCount = filteredChats.length;

        return (
            <SafeAreaView style={advancesearchstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Recherche de Conversations</Text>
                    </View>


                    <View style={advancesearchstyle.searchContainer}>
                        <Icon name="magnify" size={22} color="#1B497D" />
                        <TextInput
                            style={advancesearchstyle.searchInput}
                            placeholder="Rechercher par nom ou message..."
                            value={searchText}
                            onChangeText={this.handleSearchChange}
                            autoFocus
                            placeholderTextColor="#999"
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={this.clearSearch}>
                                <Icon name="close-circle" size={24} color="#888" style={advancesearchstyle.close} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {isSearching && (
                        <ActivityIndicator size="small" color="#1B497D" style={{ marginVertical: 10 }} />
                    )}

                    <View style={advancesearchstyle.resultsCountContainer}>
                        <Text style={[advancesearchstyle.resultsCount, styles.textBold]}>
                            {resultsCount} conversation{resultsCount > 1 ? 's' : ''} trouvée{resultsCount > 1 ? 's' : ''}
                        </Text>
                    </View>

                    <FlatList
                        data={filteredChats}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this.renderChat}
                        contentContainerStyle={advancesearchstyle.listContent}
                        initialNumToRender={10}
                        windowSize={15}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={8}
                        ListEmptyComponent={
                            <Text style={[advancesearchstyle.emptyText, styles.text]}>
                                {searchText ? "Aucune conversation trouvée" : "Commencez à taper pour rechercher"}
                            </Text>
                        }
                    />
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchCoursePageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceMessageFilter);