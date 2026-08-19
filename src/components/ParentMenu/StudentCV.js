import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { PureComponent } from 'react';
import {    SafeAreaView, View, Text, Animated, FlatList, TouchableOpacity,    Image, ImageBackground, Modal, ScrollView, TextInput, Alert,} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cvstyle } from '../../assets/styles/studentcv';
import { styles } from '../../assets/styles';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';

const HOBBIES_LIST = [
    'Lecture',
    'Sport',
    'Musique',
    'Voyages',
    'Cinéma',
    'Cuisine',
    'Photographie',
    'Bénévolat',
    'Jeux vidéo',
    'Danse',
    'Théâtre',
    'Jardinage',
    'Bricolage',
    'Peinture',
    'Échecs',
    'Randonnée',
];

class StudentCV extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),

            cvList: [],

            showAddModal: false,

            description: '',
            selectedHobbies: [],

            nextId: 1,
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    _openAddModal = () => {
        this.setState({
            showAddModal: true,
            description: '',
            selectedHobbies: [],
        });
    };

    _closeAddModal = () => {
        this.setState({ showAddModal: false });
    };

    _toggleHobby = (hobby) => {
        this.setState(prevState => {
            const selected = [...prevState.selectedHobbies];
            if (selected.includes(hobby)) {
                return { selectedHobbies: selected.filter(h => h !== hobby) };
            } else {
                return { selectedHobbies: [...selected, hobby] };
            }
        });
    };

    _isFormValid = () => {
        const { description, selectedHobbies } = this.state;
        return description.trim().length > 0 && selectedHobbies.length > 0;
    };

    _submitCV = () => {
        if (!this._isFormValid()) return;

        const { cvList, nextId, description, selectedHobbies } = this.state;
        const newCV = {
            id: nextId,
            description: description.trim(),
            hobbies: selectedHobbies,
            status: 'En attente',
            createdAt: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
        };

        this.setState({
            cvList: [newCV, ...cvList],
            nextId: nextId + 1,
            showAddModal: false,
        });

        Alert.alert('Succès', 'Votre CV a été ajouté avec succès.');
    };

    _renderStatus = (status) => {
        let color, icon;
        switch (status) {
            case 'En attente':
                color = '#F59E0B';
                icon = 'clock-outline';
                break;
            case 'Validé':
                color = '#10B981';
                icon = 'check-circle';
                break;
            case 'Refusé':
                color = '#EF4444';
                icon = 'close-circle';
                break;
            default:
                color = '#6B7280';
                icon = 'help-circle';
        }
        return (
            <View style={[cvstyle.statusBadge, { backgroundColor: color + '20' }]}>
                <Icon name={icon} size={14} color={color} />
                <Text style={[cvstyle.statusText, styles.textBold, { color }]}>{status}</Text>
            </View>
        );
    };

    _renderCVItem = ({ item }) => (
        <View style={cvstyle.cvCard}>
            {/* En-tête de la carte */}
            <View style={cvstyle.cvCardHeader}>
                <View style={cvstyle.cvCardIconContainer}>
                    <Icon name="file-document-outline" size={24} color="#1B497D" />
                </View>
                <View style={cvstyle.cvCardHeaderInfo}>
                    <Text style={[cvstyle.cvCardTitle, styles.textBold]}>
                        CV #{item.id}
                    </Text>
                    <Text style={[cvstyle.cvCardDate, styles.text]}>
                        {item.createdAt}
                    </Text>
                </View>
                {this._renderStatus(item.status)}
            </View>

            <View style={cvstyle.cvCardBody}>
                <Text style={[cvstyle.cvSectionLabel, styles.textBold]}>Description</Text>
                <Text style={[cvstyle.cvDescription, styles.text]} numberOfLines={3}>
                    {item.description}
                </Text>

                <Text style={[cvstyle.cvSectionLabel, styles.textBold, { marginTop: 12 }]}>Loisirs</Text>
                <View style={cvstyle.hobbiesContainer}>
                    {item.hobbies.map((hobby, index) => (
                        <View key={index} style={cvstyle.hobbyChip}>
                            <Text style={[cvstyle.hobbyChipText, styles.textBold]}>{hobby}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[cvstyle.header, { opacity: headerOpacity }]}>
                <View style={cvstyle.headerSection}>
                    <TouchableOpacity style={cvstyle.headerButton} onPress={this._navigateToMenu}>
                        <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                    </TouchableOpacity>
                    <Text style={[cvstyle.headerTitle, styles.textBold]}>Mes CV</Text>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { cvList, showAddModal, description, selectedHobbies } = this.state;
        const isFormValid = this._isFormValid();

        return (
            <SafeAreaView style={cvstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={cvstyle.scroll}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToMenu}>
                                    <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold]}>Mes CV</Text>
                        </View>

                        <TouchableOpacity
                            style={cvstyle.addButton}
                            onPress={this._openAddModal}
                            activeOpacity={0.8}
                        >
                            <Icon name="plus-circle" size={24} color="#FFF" />
                            <Text style={[cvstyle.addButtonText, styles.textBold]}>
                                Ajouter un nouveau CV
                            </Text>
                        </TouchableOpacity>

                        {cvList.length > 0 && (
                            <Text style={[cvstyle.counterText, styles.text]}>
                                {cvList.length} CV créé{cvList.length > 1 ? 's' : ''}
                            </Text>
                        )}


                        {cvList.length === 0 ? (
                            <View style={cvstyle.emptyContainer}>
                                <Icon name="file-document-edit-outline" size={64} color="#A0AEC0" />
                                <Text style={[cvstyle.emptyTitle, styles.textBold]}>Aucun CV</Text>
                                <Text style={[cvstyle.emptySubtitle, styles.text]}>
                                    Vous n'avez pas encore créé de CV.{'\n'}Cliquez sur le bouton + pour commencer.
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={cvList}
                                keyExtractor={item => item.id.toString()}
                                renderItem={this._renderCVItem}
                                scrollEnabled={false}
                                contentContainerStyle={cvstyle.listContent}
                            />
                        )}

                        <View style={{ height: 40 }} />
                    </Animated.ScrollView>

                    {this.renderHeader()}
                </ImageBackground>


                <Modal
                    visible={showAddModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={this._closeAddModal}
                >
                    <View style={cvstyle.modalOverlay}>
                        <View style={cvstyle.modalContent}>

                            <View style={cvstyle.modalHandle} />

                            <View style={cvstyle.modalHeader}>
                                <Text style={[cvstyle.modalTitle, styles.textBold]}>
                                    Nouveau CV
                                </Text>
                                <TouchableOpacity onPress={this._closeAddModal} style={cvstyle.modalCloseButton}>
                                    <Icon name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={cvstyle.modalScrollContent}
                            >
                                <Text style={[cvstyle.inputLabel, styles.textBold]}>Description</Text>
                                <TextInput
                                    style={[cvstyle.textArea, styles.text]}
                                    placeholder="Parlez nous de vous..."
                                    placeholderTextColor="#A0AEC0"
                                    multiline
                                    numberOfLines={5}
                                    textAlignVertical="top"
                                    value={description}
                                    onChangeText={text => this.setState({ description: text })}
                                />

                                <Text style={[cvstyle.inputLabel, styles.textBold, { marginTop: 20 }]}>
                                    Loisirs
                                </Text>
                                <Text style={[cvstyle.inputHint, styles.text]}>
                                    Sélectionnez vos centres d'intérêt ({selectedHobbies.length} sélectionné{selectedHobbies.length !== 1 ? 's' : ''})
                                </Text>

                                <View style={cvstyle.hobbiesGrid}>
                                    {HOBBIES_LIST.map((hobby, index) => {
                                        const isSelected = selectedHobbies.includes(hobby);
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={[cvstyle.hobbyCheckbox, isSelected && cvstyle.hobbyCheckboxActive]}
                                                onPress={() => this._toggleHobby(hobby)}
                                                activeOpacity={0.7}
                                            >
                                                <Icon
                                                    name={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                                    size={20}
                                                    color={isSelected ? '#1B497D' : '#A0AEC0'}
                                                />
                                                <Text style={[
                                                    cvstyle.hobbyCheckboxLabel,
                                                    styles.textBold,
                                                    isSelected && cvstyle.hobbyCheckboxLabelActive,
                                                ]}>
                                                    {hobby}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={[cvstyle.submitButton, !isFormValid && cvstyle.submitButtonDisabled]}
                                onPress={this._submitCV}
                                disabled={!isFormValid}
                                activeOpacity={0.8}
                            >
                                <Icon name="check" size={20} color="#FFF" />
                                <Text style={[cvstyle.submitButtonText, styles.textBold]}>
                                    {isFormValid ? 'Soumettre le CV' : 'Remplissez tous les champs'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchStudentMenuAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentCV);