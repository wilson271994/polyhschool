import React, { PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Linking,
    TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mediastyle, COLORS } from '../../assets/styles/contactmedia';
import { styles } from '../../assets/styles/index';
import { switchChatPageAction } from '../../navigations/rootNavigation';

class ContactMedia extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Photos',
            searchQuery: '',
            isSearchActive: false,
            mediaItems: [
                {
                    id: '1',
                    type: 'Photos',
                    name: 'Vacances_2024.jpg',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '2.4 Mo',
                    date: '12/03/2025',
                },
                {
                    id: '2',
                    type: 'Photos',
                    name: 'Capture_écran.png',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '1.1 Mo',
                    date: '10/03/2025',
                },
                {
                    id: '3',
                    type: 'Photos',
                    name: 'Soirée_anniv.jpg',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '3.7 Mo',
                    date: '05/03/2025',
                },
                {
                    id: '4',
                    type: 'Photos',
                    name: 'Profil_2025.png',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '0.9 Mo',
                    date: '01/03/2025',
                },

                {
                    id: '5',
                    type: 'Videos',
                    name: 'Présentation_projet.mp4',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '15.8 Mo',
                    date: '08/03/2025',
                    duration: '2:45',
                },
                {
                    id: '6',
                    type: 'Videos',
                    name: 'Tutoriel_React.mp4',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '32.1 Mo',
                    date: '05/03/2025',
                    duration: '12:10',
                },
                {
                    id: '7',
                    type: 'Videos',
                    name: 'Démo_app.mp4',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '22.4 Mo',
                    date: '03/03/2025',
                    duration: '5:20',
                },
                {
                    id: '8',
                    type: 'Videos',
                    name: 'Conférence_tech.mp4',
                    uri: Image.resolveAssetSource(require('../../assets/images/lion.jpg')).uri,
                    size: '45.6 Mo',
                    date: '28/02/2025',
                    duration: '20:00',
                },

                {
                    id: '9',
                    type: 'Documents',
                    name: 'Rapport_final.pdf',
                    uri: null,
                    size: '4.2 Mo',
                    date: '01/03/2025',
                    extension: 'PDF',
                },
                {
                    id: '10',
                    type: 'Documents',
                    name: 'Données.xlsx',
                    uri: null,
                    size: '1.8 Mo',
                    date: '28/02/2025',
                    extension: 'XLSX',
                },
                {
                    id: '11',
                    type: 'Documents',
                    name: 'Contrat_signé.pdf',
                    uri: null,
                    size: '0.6 Mo',
                    date: '20/02/2025',
                    extension: 'PDF',
                },
                {
                    id: '12',
                    type: 'Documents',
                    name: 'Plan_architecture.dwg',
                    uri: null,
                    size: '12.5 Mo',
                    date: '15/02/2025',
                    extension: 'DWG',
                },

                {
                    id: '13',
                    type: 'Links',
                    name: 'Documentation officielle',
                    url: 'https://reactnative.dev/docs/getting-started',
                    size: null,
                    date: '15/03/2025',
                    favicon: 'https://reactnative.dev/img/favicon.ico',
                },
                {
                    id: '14',
                    type: 'Links',
                    name: 'Dépôt GitHub',
                    url: 'https://github.com/facebook/react-native',
                    size: null,
                    date: '14/03/2025',
                    favicon: 'https://github.githubassets.com/favicons/favicon.svg',
                },
                {
                    id: '15',
                    type: 'Links',
                    name: 'Article Medium',
                    url: 'https://medium.com/react-native',
                    size: null,
                    date: '10/03/2025',
                    favicon: 'https://cdn-static-1.medium.com/_/fp/icons/favicon.ico',
                },
                {
                    id: '16',
                    type: 'Links',
                    name: 'Design System Figma',
                    url: 'https://www.figma.com/file/xyz',
                    size: null,
                    date: '05/03/2025',
                    favicon: 'https://static.figma.com/app/icon/1/favicon.ico',
                },
            ],
        };
    }

    getFilteredMedia = () => {
        const { activeTab, mediaItems, searchQuery, isSearchActive } = this.state;
        const query = searchQuery.trim().toLowerCase();

        if (isSearchActive && query) {
            return mediaItems.filter(item =>
                item.name.toLowerCase().includes(query)
            );
        }
        return mediaItems.filter(item => item.type === activeTab);
    };

    handleTabPress = (tab) => {
        this.setState({ activeTab: tab, isSearchActive: false, searchQuery: '' });
    };

    openSearch = () => {
        this.setState({ isSearchActive: true, searchQuery: '' });
    };

    closeSearch = () => {
        this.setState({ isSearchActive: false, searchQuery: '' });
    };

    onSearchChangeText = (text) => {
        this.setState({ searchQuery: text });
        if (text.trim() === '') {
            this.closeSearch();
        }
    };

    openMedia = (item) => {
        if (item.type === 'Links' && item.url) {
            Linking.openURL(item.url).catch(() => {});
        } else {
            console.log('Ouverture du média :', item.name);
        }
    };

    _goBack = () => {
        switchChatPageAction(true);
    };

    renderMediaCard = ({ item }) => {
        const isPhoto = item.type === 'Photos';
        const isVideo = item.type === 'Videos';
        const isDocument = item.type === 'Documents';
        const isLink = item.type === 'Links';

        let iconName = 'file-image';
        let iconColor = COLORS.photo;
        if (isVideo) { iconName = 'play-circle'; iconColor = COLORS.video; }
        if (isDocument) { iconName = 'file-document-outline'; iconColor = COLORS.document; }
        if (isLink) { iconName = 'link-variant'; iconColor = COLORS.link; }

        return (
            <TouchableOpacity
                style={mediastyle.card}
                onPress={() => this.openMedia(item)}
                activeOpacity={0.8}
            >
                <View style={mediastyle.previewContainer}>
                    {isPhoto || isVideo ? (
                        <Image
                            source={{ uri: item.uri }}
                            style={mediastyle.previewImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[mediastyle.iconPreview, { backgroundColor: iconColor + '15' }]}>
                            <Icon name={iconName} size={36} color={iconColor} />
                            {isDocument && (
                                <Text style={[mediastyle.extensionBadge, { backgroundColor: iconColor }]}>
                                    {item.extension}
                                </Text>
                            )}
                            {isLink && item.favicon && (
                                <Image source={{ uri: item.favicon }} style={mediastyle.favicon} />
                            )}
                        </View>
                    )}
                    <View style={[mediastyle.typeBadge, { backgroundColor: iconColor }]}>
                        <Text style={mediastyle.typeText}>
                            {isPhoto ? 'PHOTO' : isVideo ? 'VIDÉO' : isDocument ? 'DOC' : 'LIEN'}
                        </Text>
                    </View>
                    {isVideo && item.duration && (
                        <View style={mediastyle.durationBadge}>
                            <Icon name="clock-outline" size={12} color="#FFF" />
                            <Text style={mediastyle.durationText}>{item.duration}</Text>
                        </View>
                    )}
                </View>

                <View style={mediastyle.infoContainer}>
                    <Text numberOfLines={2} style={mediastyle.fileName}>{item.name}</Text>
                    <View style={mediastyle.metaRow}>
                        {item.size && <Text style={mediastyle.metaText}>{item.size}</Text>}
                        {item.size && item.date && <Text style={mediastyle.metaText}> · </Text>}
                        {item.date && <Text style={mediastyle.metaText}>{item.date}</Text>}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { activeTab, isSearchActive, searchQuery } = this.state;
        const filtered = this.getFilteredMedia();

        const tabs = [
            { key: 'Photos', icon: 'image-multiple', label: 'Photos' },
            { key: 'Videos', icon: 'video', label: 'Vidéos' },
            { key: 'Documents', icon: 'file-document-multiple', label: 'Docs' },
            { key: 'Links', icon: 'link', label: 'Liens' },
        ];

        return (
            <View style={mediastyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    {isSearchActive ? (
                        <View style={mediastyle.header}>
                            <TextInput
                                style={mediastyle.searchInput}
                                placeholder="Rechercher un média..."
                                placeholderTextColor="#AAA"
                                value={searchQuery}
                                onChangeText={this.onSearchChangeText}
                                autoFocus
                                returnKeyType="search"
                            />
                            <TouchableOpacity
                                onPress={this.closeSearch}
                                style={mediastyle.headerIconContainer}
                            >
                                <Icon name="close" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={mediastyle.header}>
                            <TouchableOpacity onPress={this._goBack} style={mediastyle.backButton}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={[mediastyle.headerTitle, styles.textBold]}>Médias partagés</Text>
                            <TouchableOpacity
                                onPress={this.openSearch}
                                style={mediastyle.headerIconContainer}
                            >
                                <Icon name="magnify" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {!isSearchActive && (
                        <View style={mediastyle.filterContainer}>
                            <View style={mediastyle.tabContainer}>
                                {tabs.map((tab) => (
                                    <TouchableOpacity
                                        key={tab.key}
                                        style={[
                                            mediastyle.tabButton,
                                            activeTab === tab.key && mediastyle.tabButtonActive,
                                        ]}
                                        onPress={() => this.handleTabPress(tab.key)}
                                    >
                                        <Icon
                                            name={tab.icon}
                                            size={18}
                                            color={activeTab === tab.key ? '#FFF' : COLORS.textLight}
                                        />
                                        <Text
                                            style={[
                                                mediastyle.tabButtonText,
                                                activeTab === tab.key && mediastyle.tabButtonTextActive,
                                            ]}
                                        >
                                            {tab.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={mediastyle.section}>
                        <Text style={[mediastyle.sectionTitle, styles.textBold]}>
                            {isSearchActive
                                ? `Résultats pour "${searchQuery}"`
                                : activeTab === 'Photos'
                                    ? 'Images'
                                    : activeTab === 'Videos'
                                        ? 'Vidéos'
                                        : activeTab === 'Documents'
                                            ? 'Documents'
                                            : 'Liens'}
                        </Text>
                    </View>

                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item.id}
                        renderItem={this.renderMediaCard}
                        numColumns={2}
                        contentContainerStyle={mediastyle.listContainer}
                        columnWrapperStyle={mediastyle.columnWrapper}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={mediastyle.emptyContainer}>
                                <Icon name="folder-open-outline" size={48} color={COLORS.textLight} />
                                <Text style={mediastyle.emptyText}>
                                    {isSearchActive
                                        ? 'Aucun média trouvé.'
                                        : `Aucun ${activeTab.toLowerCase()} partagé pour le moment.`}
                                </Text>
                            </View>
                        }
                    />
                    <View style={{ height: 20 }} />
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchChatPageAction }, dispatch),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContactMedia);