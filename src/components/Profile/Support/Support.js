import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    Alert,
    StatusBar,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../../assets/styles';
import { supportstyle } from '../../../assets/styles/support';
import { COLORS } from '../../../assets/styles/theme';
import CreateTicket from '../Forms/CreateTicket';
import {
    switchHomePageAction,
    switchSupportChatAction,
    switchProfilPageAction,
    switchFooterVisibilityAction,
} from '../../../navigations/rootNavigation';

class Support extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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
                { id: '7', name: 'Réclamation', label: 'Service Réclamation', icon: 'alert-circle' },
            ],
            conversations: [
                {
                    id: '1',
                    sender: 'Support Commercial',
                    time: 'Il y a 3j',
                    unread: true,
                    service: 'Commercial',
                    title: 'Question sur les tarifs scolaires',
                    description: "Bonjour, je souhaiterais avoir plus d'informations sur les modalités...",
                },
                {
                    id: '2',
                    sender: 'Support Technique',
                    time: 'Il y a 5j',
                    unread: false,
                    service: 'Technique',
                    title: 'Problème d’accès aux bulletins',
                    description: "Je n'arrive pas à charger les documents PDF sur mon profil...",
                },
            ],
        };
    }

    _navigateToSupportChat = () => {
        switchSupportChatAction(true);
        switchFooterVisibilityAction(false);
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    _openNewTicketModal = () => {
        this.setState({
            showNewTicketModal: true,
            selectedService: null,
            ticketTitle: '',
            ticketDescription: '',
        });
    };

    _closeNewTicketModal = () => {
        this.setState({ showNewTicketModal: false });
    };

    _handleCreateTicket = () => {
        const { selectedService, ticketTitle, ticketDescription, conversations, services } = this.state;

        if (!selectedService) {
            Alert.alert('Attention', 'Veuillez sélectionner le service concerné.');
            return;
        }
        if (!ticketTitle.trim()) {
            Alert.alert('Attention', 'Veuillez saisir le sujet de votre requête.');
            return;
        }
        if (!ticketDescription.trim()) {
            Alert.alert('Attention', 'Veuillez détailler votre message.');
            return;
        }

        const selectedServiceObj = services.find((s) => s.name === selectedService.name);
        const serviceLabel = selectedServiceObj ? selectedServiceObj.label : selectedService.label;

        const newTicket = {
            id: Date.now().toString(),
            sender: serviceLabel,
            time: "À l'instant",
            unread: true,
            service: selectedService.name,
            title: ticketTitle,
            description: ticketDescription,
        };

        this.setState({
            conversations: [newTicket, ...conversations],
            showNewTicketModal: false,
            selectedService: null,
            ticketTitle: '',
            ticketDescription: '',
        });

        Alert.alert('Ticket envoyé', 'Votre demande a été transmise à nos conseillers.');
    };

    render() {
        const { isVisibleTckCrModal, showNewTicketModal, conversations, selectedService, ticketTitle, ticketDescription, services } = this.state;

        return (
            <SafeAreaView style={supportstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Halo lumineux de fond */}
                <View style={supportstyle.topGlow} pointerEvents="none" />
                <View style={supportstyle.bottomGlow} pointerEvents="none" />

                {/* Barre de navigation */}
                <View style={supportstyle.headerNav}>
                    <TouchableOpacity
                        style={supportstyle.backButton}
                        onPress={this._navigateToProfil}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={supportstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, supportstyle.headerTitle]}>Support & Assistance</Text>
                    </View>
                </View>

                {/* Liste des conversations */}
                <ScrollView
                    style={supportstyle.conversationsList}
                    contentContainerStyle={supportstyle.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {conversations.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={this._navigateToSupportChat}
                            style={supportstyle.conversationItem}
                            activeOpacity={0.85}
                        >
                            <View style={supportstyle.avatarBox}>
                                <Icon name="headset" size={22} color={COLORS.accentGold} />
                            </View>

                            <View style={supportstyle.conversationDetails}>
                                <View style={supportstyle.senderRow}>
                                    <Text style={[styles.textBold, supportstyle.conversationSender]}>
                                        {item.sender}
                                    </Text>
                                    <Text style={[styles.text, supportstyle.conversationTime]}>{item.time}</Text>
                                </View>

                                <Text style={[styles.textBold, supportstyle.ticketTitle]}>{item.title}</Text>
                                <Text
                                    style={[styles.text, supportstyle.conversationDesc]}
                                    numberOfLines={1}
                                >
                                    {item.description}
                                </Text>
                            </View>

                            {item.unread && <View style={supportstyle.unreadIndicator} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Bouton d'action flottant (+ Nouveau ticket) */}
                <TouchableOpacity
                    onPress={this._openNewTicketModal}
                    style={supportstyle.fab}
                    activeOpacity={0.85}
                >
                    <Icon name="plus" size={26} color={COLORS.textDark} />
                </TouchableOpacity>

                <CreateTicket
                    _closeModalTicketCreation={() => this.setState({ isVisibleTckCrModal: false })}
                    isVisibleTckCrModal={isVisibleTckCrModal}
                />

                {/* Fenêtre modale de création de ticket */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showNewTicketModal}
                    onRequestClose={this._closeNewTicketModal}
                >
                    <View style={supportstyle.modalOverlay}>
                        <View style={supportstyle.modalContainer}>
                            <View style={supportstyle.modalHeader}>
                                <Text style={[styles.textBold, supportstyle.modalTitle]}>✉️ Nouvelle requête</Text>
                                <TouchableOpacity onPress={this._closeNewTicketModal}>
                                    <Icon name="close" size={24} color={COLORS.textPrimary} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={[styles.textBold, supportstyle.modalLabel]}>Service concerné *</Text>

                                <Dropdown
                                    style={supportstyle.dropdown}
                                    placeholderStyle={supportstyle.placeholderStyle}
                                    selectedTextStyle={supportstyle.selectedTextStyle}
                                    containerStyle={supportstyle.dropdownContainer}
                                    itemContainerStyle={supportstyle.itemContainerStyle}
                                    itemTextStyle={supportstyle.itemTextStyle}
                                    data={services}
                                    maxHeight={260}
                                    labelField="label"
                                    valueField="name"
                                    placeholder="Sélectionner le service"
                                    value={selectedService?.name}
                                    onChange={(item) => this.setState({ selectedService: item })}
                                    renderLeftIcon={() => (
                                        <Icon name="tag-outline" size={18} color={COLORS.accentGold} style={{ marginRight: 8 }} />
                                    )}
                                    renderItem={(item) => (
                                        <View style={supportstyle.dropdownItem}>
                                            <Icon name={item.icon} size={18} color={COLORS.accentGold} style={{ marginRight: 10 }} />
                                            <Text style={[styles.text, supportstyle.dropdownItemText]}>{item.label}</Text>
                                        </View>
                                    )}
                                />

                                <Text style={[styles.textBold, supportstyle.modalLabel]}>Sujet de la demande *</Text>
                                <TextInput
                                    style={[styles.text, supportstyle.modalInput]}
                                    placeholder="Ex: Demande de relevé de notes"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={ticketTitle}
                                    onChangeText={(text) => this.setState({ ticketTitle: text })}
                                    maxLength={100}
                                />

                                <Text style={[styles.textBold, supportstyle.modalLabel]}>Description *</Text>
                                <TextInput
                                    style={[styles.text, supportstyle.modalInput, supportstyle.modalTextArea]}
                                    placeholder="Expliquez en détail votre besoin..."
                                    placeholderTextColor={COLORS.textMuted}
                                    value={ticketDescription}
                                    onChangeText={(text) => this.setState({ ticketDescription: text })}
                                    multiline={true}
                                    numberOfLines={4}
                                />

                                <View style={supportstyle.modalButtonsContainer}>
                                    <TouchableOpacity
                                        style={[supportstyle.modalButton, supportstyle.modalCancelButton]}
                                        onPress={this._closeNewTicketModal}
                                    >
                                        <Text style={[styles.textBold, supportstyle.modalCancelText]}>Annuler</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[supportstyle.modalButton, supportstyle.modalValidateButton]}
                                        onPress={this._handleCreateTicket}
                                    >
                                        <Text style={[styles.textBold, supportstyle.modalValidateText]}>Envoyer</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchHomePageAction,
            switchSupportChatAction,
            switchProfilPageAction,
            switchFooterVisibilityAction
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    root_navigation: state.navigation.root_navigation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Support);