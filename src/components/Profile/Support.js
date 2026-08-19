import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, Text, TouchableOpacity, View, Image, ImageBackground, Modal, TextInput, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../../assets/styles';
import { supportstyle } from '../../assets/styles/support';
import CreateTicket from './Forms/CreateTicket';
import { switchHomePageAction, switchSupportChatAction } from '../../navigations/rootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Support extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false,
            isVisibleTckCrModal: false,
            showNewTicketModal: false,
            selectedService: null,
            ticketTitle: '',
            ticketDescription: '',
            services: [
                { id: '1', name: 'Commercial', label: 'Support Commercial', icon: 'store' },
                { id: '2', name: 'Technique', label: 'Support Technique', icon: 'wrench' },
                { id: '3', name: 'Facturation', label: 'Service Facturation', icon: 'receipt' },
                { id: '4', name: 'Comptes', label: 'Gestion des Comptes', icon: 'account' },
                { id: '5', name: 'Pédagogique', label: 'Support Pédagogique', icon: 'school' },
                { id: '6', name: 'Administratif', label: 'Service Administratif', icon: 'office-building' },
                { id: '7', name: 'Réclamation', label: 'Service Réclamation', icon: 'alert-circle' }
            ],
            conversations: [
                {
                    id: '1',
                    sender: 'FR: Bonjour, nous n\'avons p...',
                    time: 'Awa . il y a 3j',
                    unread: true,
                    service: 'Commercial',
                    title: 'Question sur les tarifs',
                    description: 'Bonjour, je souhaiterais avoir plus d\'informations sur les tarifs...'
                },
                {
                    id: '2',
                    sender: 'Support Technique: Votre problème...',
                    time: 'Jean . il y a 5j',
                    unread: false,
                    service: 'Technique',
                    title: 'Problème de connexion',
                    description: 'Je n\'arrive pas à me connecter à mon compte...'
                }
            ]
        }
    };

    _navigateToSupportChat = () => {
        switchSupportChatAction(true);
    }

    _toggleScrollView = (data) => {
        if (data) {
            console.log(data)
        }
    }

    _openModalTicketCreation = () => {
        this.setState({ isVisibleTckCrModal: true });
    }

    _closeModalTicketCreation = () => {
        this.setState({ isVisibleTckCrModal: false });
    }

    _backToHome = () => {
        switchHomePageAction(true);
    }

    _openNewTicketModal = () => {
        this.setState({
            showNewTicketModal: true,
            selectedService: null,
            ticketTitle: '',
            ticketDescription: ''
        });
    }

    _closeNewTicketModal = () => {
        this.setState({ showNewTicketModal: false });
    }

    _handleCreateTicket = () => {
        const { selectedService, ticketTitle, ticketDescription, conversations, services } = this.state;

        // Validation des champs
        if (!selectedService) {
            Alert.alert('Erreur', 'Veuillez sélectionner un service');
            return;
        }
        if (!ticketTitle.trim()) {
            Alert.alert('Erreur', 'Veuillez saisir le titre de votre requête');
            return;
        }
        if (!ticketDescription.trim()) {
            Alert.alert('Erreur', 'Veuillez saisir une description de votre requête');
            return;
        }

        const selectedServiceObj = services.find(s => s.name === selectedService.name);
        const serviceLabel = selectedServiceObj ? selectedServiceObj.label : selectedService.label;

        const newTicket = {
            id: Date.now().toString(),
            sender: `${serviceLabel}: ${ticketTitle.substring(0, 30)}${ticketTitle.length > 30 ? '...' : ''}`,
            time: `Vous . à l'instant`,
            unread: true,
            service: selectedService.name,
            title: ticketTitle,
            description: ticketDescription,
            createdAt: new Date()
        };

        this.setState({
            conversations: [newTicket, ...conversations],
            showNewTicketModal: false,
            selectedService: null,
            ticketTitle: '',
            ticketDescription: ''
        });

        Alert.alert(
            'Succès',
            'Votre requête a été envoyée avec succès. Un conseiller vous répondra dans les plus brefs délais.',
            [{ text: 'OK' }]
        );
    }

    render() {
        const { is_loading } = this.props;
        const { isVisibleTckCrModal, showNewTicketModal, conversations, selectedService, ticketTitle, ticketDescription, services } = this.state;

        return (
            <View style={supportstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._backToHome}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Support client</Text>
                    </View>

                    <ScrollView style={supportstyle.conversationsList}>
                        {conversations.map((conversation) => (
                            <TouchableOpacity
                                key={conversation.id}
                                onPress={this._navigateToSupportChat}
                                style={supportstyle.conversationItem}>
                                <Image
                                    source={require('../../assets/images/lion.jpg')}
                                    style={supportstyle.profileImage}
                                />
                                <View style={supportstyle.conversationDetails}>
                                    <Text style={[supportstyle.conversationSender, styles.textBold]}>
                                        {conversation.sender}
                                    </Text>
                                    <Text style={[supportstyle.conversationTime, styles.text]}>
                                        {conversation.time}
                                    </Text>
                                </View>
                                {conversation.unread && <View style={supportstyle.unreadIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        onPress={this._openNewTicketModal}
                        style={supportstyle.fab}>
                        <Image
                            source={require('../../assets/images/new-message.png')}
                            style={supportstyle.fabIcon}
                        />
                    </TouchableOpacity>
                </ImageBackground>

                <CreateTicket
                    _closeModalTicketCreation={this._closeModalTicketCreation}
                    isVisibleTckCrModal={isVisibleTckCrModal}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showNewTicketModal}
                    onRequestClose={this._closeNewTicketModal}
                >
                    <View style={supportstyle.modalOverlay}>
                        <View style={supportstyle.modalContainer}>
                            <View style={supportstyle.modalHeader}>
                                <Text style={[supportstyle.modalTitle, styles.textBold]}>Nouvelle requête</Text>
                                <TouchableOpacity onPress={this._closeNewTicketModal}>
                                    <Text style={supportstyle.modalCloseButton}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={[supportstyle.modalLabel, styles.textBold]}>Service concerné *</Text>

                                {/* Dropdown pour les services */}
                                <Dropdown
                                    style={supportstyle.dropdown}
                                    placeholderStyle={supportstyle.placeholderStyle}
                                    selectedTextStyle={supportstyle.selectedTextStyle}
                                    inputSearchStyle={supportstyle.inputSearchStyle}
                                    iconStyle={supportstyle.iconStyle}
                                    containerStyle={supportstyle.dropdownContainer}
                                    itemContainerStyle={supportstyle.itemContainerStyle}
                                    itemTextStyle={[supportstyle.itemTextStyle, styles.text]}
                                    data={services}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="name"
                                    placeholder="Sélectionnez un service"
                                    searchPlaceholder="Rechercher un service..."
                                    value={selectedService?.name}
                                    onChange={item => {
                                        this.setState({ selectedService: item });
                                    }}
                                    renderLeftIcon={() => (
                                        <Icon name="tag-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                                    )}
                                    renderItem={(item) => (
                                        <View style={supportstyle.dropdownItem}>
                                            <Icon name={item.icon} size={20} color="#1e3a5e" />
                                            <Text style={[supportstyle.dropdownItemText, styles.text]}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    )}
                                />

                                <Text style={[supportstyle.modalLabel, styles.textBold]}>Objet de la requête *</Text>
                                <TextInput
                                    style={[supportstyle.modalInput, styles.text]}
                                    placeholder="Ex: Problème de connexion"
                                    placeholderTextColor="#999"
                                    value={ticketTitle}
                                    onChangeText={(text) => this.setState({ ticketTitle: text })}
                                    maxLength={100}
                                />

                                <Text style={[supportstyle.modalLabel, styles.textBold]}>Description *</Text>
                                <TextInput
                                    style={[supportstyle.modalInput, supportstyle.modalTextArea, styles.text]}
                                    placeholder="Décrivez votre problème ou votre demande en détail..."
                                    placeholderTextColor="#999"
                                    value={ticketDescription}
                                    onChangeText={(text) => this.setState({ ticketDescription: text })}
                                    multiline={true}
                                    numberOfLines={5}
                                    textAlignVertical="top"
                                />

                                <View style={supportstyle.modalButtonsContainer}>
                                    <TouchableOpacity
                                        style={[supportstyle.modalButton, supportstyle.modalCancelButton]}
                                        onPress={this._closeNewTicketModal}
                                    >
                                        <Text style={[supportstyle.modalCancelButtonText, styles.textBold]}>Annuler</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[supportstyle.modalButton, supportstyle.modalValidateButton]}
                                        onPress={this._handleCreateTicket}
                                    >
                                        <Text style={[supportstyle.modalValidateButtonText, styles.textBold]}>Valider</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchHomePageAction,
            switchSupportChatAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        root_navigation: state.navigation.root_navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Support);

