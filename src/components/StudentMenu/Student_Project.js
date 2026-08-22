import React, { Component } from 'react';
import { View, Text, Animated, TextInput, TouchableOpacity, Alert, Image, ScrollView, Modal, ImageBackground, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { projectstyle, COLORS } from '../../assets/styles/studentproject';
import { styles } from '../../assets/styles';
import { switchHomePageAction } from '../../navigations/rootNavigation';

class Student_Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            domain: '',
            scrollY: new Animated.Value(0),
            domains: [
                { name: 'Technologie', label: 'Technologie', icon: 'laptop' },
                { name: 'Science', label: 'Science', icon: 'flask' },
                { name: 'Art', label: 'Art', icon: 'palette' },
                { name: 'Business', label: 'Business', icon: 'briefcase' },
                { name: 'Social', label: 'Social', icon: 'account-group' },
                { name: 'Environnement', label: 'Environnement', icon: 'leaf' },
                { name: 'Éducation', label: 'Éducation', icon: 'school' },
                { name: 'Santé', label: 'Santé', icon: 'heart-pulse' },
                { name: 'Sport', label: 'Sport', icon: 'run' },
                { name: 'Culture', label: 'Culture', icon: 'theater' },
            ],
            projects: [
                {
                    id: '1',
                    title: 'Application de gestion de notes',
                    description: 'Développement d\'une application mobile pour la gestion des notes et des absences des étudiants.',
                    domain: 'Technologie',
                    createdAt: '15 Mars 2026, 14:30',
                    status: 'En attente',
                    followed: false,
                    rating: 0,
                    responsable: {
                        name: 'Dr. Martin Dubois',
                        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                        role: 'Encadreur principal'
                    }
                },
                {
                    id: '2',
                    title: 'Étude sur l\'énergie solaire',
                    description: 'Recherche sur l\'efficacité des panneaux solaires dans les zones tropicales.',
                    domain: 'Science',
                    createdAt: '10 Mars 2026, 09:15',
                    status: 'Validé',
                    followed: true,
                    rating: 4,
                    responsable: {
                        name: 'Dr. Sophie Laurent',
                        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
                        role: 'Chercheuse principale'
                    }
                },
                {
                    id: '3',
                    title: 'Création d\'une fresque murale',
                    description: 'Réalisation d\'une fresque artistique sur le mur de l\'établissement.',
                    domain: 'Art',
                    createdAt: '05 Mars 2026, 16:45',
                    status: 'En attente',
                    followed: false,
                    rating: 0,
                    responsable: {
                        name: 'Mme. Claire Renard',
                        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                        role: 'Artiste encadrante'
                    }
                },
                {
                    id: '4',
                    title: 'Plateforme e-learning',
                    description: 'Conception d\'une plateforme d\'apprentissage en ligne pour les étudiants.',
                    domain: 'Éducation',
                    createdAt: '01 Mars 2026, 11:00',
                    status: 'Validé',
                    followed: true,
                    rating: 5,
                    responsable: {
                        name: 'Prof. Jean-Paul Petit',
                        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
                        role: 'Enseignant-chercheur'
                    }
                },
            ],
            selectedProject: null,
            isPanelOpen: false,
            isFormModalVisible: false,
            submitAnimation: new Animated.Value(0),

            selectedTab: 'Mes projets',
            sortOrder: 'desc',
            selectedDomain: 'Tous',

            // États pour le chat
            isChatModalVisible: false,
            currentChatProject: null,
            messages: [],
            newMessage: '',
            responsableInfo: null,
            isTyping: false,
            selectedMessage: null,
            showMessageActions: false,
            quickReplies: [
                "Quel est l'avancement ?",
                "Y a-t-il des deadlines ?",
                "Quelles ressources sont disponibles ?",
                "Pouvons-nous planifier une réunion ?",
                "J'ai une question technique",
                "Merci pour votre aide !",
            ],
            attachedFile: null,
            messageReactions: {},
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    // ... (toutes les autres méthodes restent inchangées, je les inclus intégralement pour fournir un code complet)

    animateSuccess = () => {
        Animated.sequence([
            Animated.timing(this.state.submitAnimation, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.delay(1500),
            Animated.timing(this.state.submitAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    _openFormModal = () => {
        this.setState({
            isFormModalVisible: true,
            title: '',
            description: '',
            domain: '',
        });
    };

    _closeFormModal = () => {
        this.setState({
            isFormModalVisible: false,
            title: '',
            description: '',
            domain: '',
        });
    };

    handleSubmit = () => {
        const { title, description, domain, projects } = this.state;

        if (!title.trim()) {
            Alert.alert('Erreur', 'Veuillez saisir le titre de votre projet');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Erreur', 'Veuillez saisir une description');
            return;
        }
        if (!domain) {
            Alert.alert('Erreur', 'Veuillez sélectionner un domaine');
            return;
        }

        const newProject = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            domain: domain.label || domain,
            createdAt: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            status: 'En attente',
            followed: false,
            rating: 0,
            responsable: {
                name: 'À assigner',
                avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                role: 'Encadreur'
            }
        };

        this.setState({
            projects: [newProject, ...projects],
        });

        this._closeFormModal();
        this.animateSuccess();
    };

    _openOptionsPanel = (project) => {
        this.setState({ selectedProject: project, isPanelOpen: true });
    };

    _closeOptionsPanel = () => {
        this.setState({ isPanelOpen: false, selectedProject: null });
    };

    openChatForProject = (project) => {
        if (!project.followed) {
            Alert.alert('Information', 'Ce projet n\'est pas encore pris en charge. Vous ne pouvez pas discuter avec l\'encadreur pour le moment.');
            return;
        }

        const welcomeMessages = [
            {
                id: '1',
                text: `Bonjour ${this.props.user_infos?.name || 'étudiant'} ! Je suis ${project.responsable.name}, votre encadreur pour le projet "${project.title}". Comment puis-je vous aider aujourd'hui ?`,
                sender: 'responsable',
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                reactions: { 'thumb-up': 0, 'heart': 0 },
            },
            {
                id: '2',
                text: 'N\'hésitez pas à me poser toutes vos questions concernant l\'avancement du projet, les deadlines, ou les ressources nécessaires. Je suis là pour vous accompagner !',
                sender: 'responsable',
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                reactions: { 'thumb-up': 0, 'heart': 0 },
            },
            {
                id: '3',
                text: 'Voici quelques informations utiles :\n\n• Réunions hebdomadaires le vendredi à 14h\n• Prochaine deadline : 30 Juin 2026\n• Documents disponibles dans le drive partagé',
                sender: 'responsable',
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                reactions: { 'thumb-up': 2, 'heart': 1 },
                isPinned: true,
            },
        ];

        this.setState({
            isChatModalVisible: true,
            currentChatProject: project,
            messages: welcomeMessages,
            responsableInfo: project.responsable,
            newMessage: '',
            isTyping: false,
            attachedFile: null,
            messageReactions: {},
        });
    };

    closeChatModal = () => {
        this.setState({
            isChatModalVisible: false,
            currentChatProject: null,
            messages: [],
            responsableInfo: null,
        });
    };

    sendMessage = () => {
        const { newMessage, messages, attachedFile } = this.state;

        if (!newMessage.trim() && !attachedFile) return;

        const messageData = {
            id: Date.now().toString(),
            text: newMessage.trim(),
            sender: 'student',
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            reactions: {},
            file: attachedFile,
        };

        this.setState({
            messages: [...messages, messageData],
            newMessage: '',
            attachedFile: null,
            isTyping: true,
        });

        const responseDelay = Math.random() * 1000 + 1000;
        setTimeout(() => {
            const autoResponse = {
                id: (Date.now() + 1).toString(),
                text: this.getSmartAutoResponse(newMessage),
                sender: 'responsable',
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                reactions: { 'thumb-up': 0, 'heart': 0 },
            };
            this.setState({
                messages: [...this.state.messages, autoResponse],
                isTyping: false,
            });
        }, responseDelay);
    };

    getSmartAutoResponse = (message) => {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('bonjour') || lowerMsg.includes('salut') || lowerMsg.includes('hello')) {
            return 'Bonjour ! Comment se passe votre travail sur le projet ?';
        }
        if (lowerMsg.includes('avancement') || lowerMsg.includes('progression') || lowerMsg.includes('progrès')) {
            return `Excellent travail jusqu'à présent ! Le projet "${this.state.currentChatProject?.title}" avance bien. Je vous suggère de vous concentrer sur la documentation technique cette semaine.`;
        }
        if (lowerMsg.includes('deadline') || lowerMsg.includes('date') || lowerMsg.includes('délai')) {
            return 'Voici les prochaines échéances importantes :\n\n• Rapport intermédiaire : 15 Juin 2026\n• Soutenance : 30 Juin 2026\n• Rapport final : 15 Juillet 2026\n\nN\'hésitez pas à me solliciter si vous avez besoin d\'aide !';
        }
        if (lowerMsg.includes('ressource') || lowerMsg.includes('document') || lowerMsg.includes('matériel')) {
            return 'Je vais partager les ressources suivantes avec vous :\n\n• Documentation technique\n• Tutoriels vidéo\n• Articles de recherche\n• Modèles de rapports\n\nAccédez-y via le lien Google Drive partagé.';
        }
        if (lowerMsg.includes('réunion') || lowerMsg.includes('rendez-vous') || lowerMsg.includes('meeting')) {
            return 'Notre prochaine réunion est prévue ce vendredi à 14h en visioconférence. Voici le lien : https://meet.google.com/xxx-xxxx-xxx\n\nPréparez vos questions et votre avancement à présenter !';
        }
        if (lowerMsg.includes('merci') || lowerMsg.includes('thanks')) {
            return 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Je suis là pour vous aider à réussir ce projet.';
        }
        if (lowerMsg.includes('problème') || lowerMsg.includes('difficulté') || lowerMsg.includes('bloqué')) {
            return 'Je comprends votre difficulté. Pouvez-vous me donner plus de détails sur le problème rencontré ? Nous pourrons en discuter plus en détail lors de notre prochaine réunion ou par message si c\'est urgent.';
        }
        
        return `Merci pour votre message ! Je prends note de votre demande concernant "${this.state.currentChatProject?.title}". Je reviens vers vous dans les plus brefs délais avec des éléments de réponse.`;
    };

    handleQuickReply = (reply) => {
        this.setState({ newMessage: reply }, () => {
            this.sendMessage();
        });
    };

    handleMessageLongPress = (message) => {
        this.setState({
            selectedMessage: message,
            showMessageActions: true,
        });
    };

    addReaction = (messageId, reactionType) => {
        const { messages } = this.state;
        const updatedMessages = messages.map(msg => {
            if (msg.id === messageId) {
                const updatedReactions = { ...msg.reactions };
                updatedReactions[reactionType] = (updatedReactions[reactionType] || 0) + 1;
                return { ...msg, reactions: updatedReactions };
            }
            return msg;
        });
        
        this.setState({
            messages: updatedMessages,
            showMessageActions: false,
            selectedMessage: null,
        });
    };

    copyMessage = (text) => {
        Alert.alert('Copié !', 'Le message a été copié dans le presse-papier.');
        this.setState({ showMessageActions: false });
    };

    deleteMessage = (messageId) => {
        Alert.alert(
            'Supprimer le message',
            'Êtes-vous sûr de vouloir supprimer ce message ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        this.setState({
                            messages: this.state.messages.filter(m => m.id !== messageId),
                            showMessageActions: false,
                            selectedMessage: null,
                        });
                    },
                },
            ]
        );
    };

    handleFileAttach = () => {
        Alert.alert(
            'Pièce jointe',
            'Choisissez le type de fichier à joindre',
            [
                { text: 'Photo', onPress: () => this.simulateFileAttach('photo.jpg', '2.4 MB') },
                { text: 'Document', onPress: () => this.simulateFileAttach('document.pdf', '1.8 MB') },
                { text: 'Vidéo', onPress: () => this.simulateFileAttach('video.mp4', '15.3 MB') },
                { text: 'Annuler', style: 'cancel' },
            ]
        );
    };

    simulateFileAttach = (name, size) => {
        this.setState({
            attachedFile: { name, size, type: name.split('.').pop() }
        });
    };

    removeAttachedFile = () => {
        this.setState({ attachedFile: null });
    };

    rateProject = (projectId, rating) => {
        this.setState({
            projects: this.state.projects.map((p) =>
                p.id === projectId ? { ...p, rating: rating } : p
            ),
        });
        Alert.alert('Merci !', `Vous avez évalué ce projet avec ${rating} étoile${rating > 1 ? 's' : ''}.`);
    };

    editProject = (project) => {
        const domainObj = this.state.domains.find(d => d.name === project.domain) ||
            this.state.domains.find(d => d.label === project.domain);
        this.setState({
            title: project.title,
            description: project.description,
            domain: domainObj || project.domain,
            isFormModalVisible: true,
        });
        this.deleteProjectSilent(project.id);
        this._closeOptionsPanel();
    };

    deleteProjectSilent = (projectId) => {
        this.setState({
            projects: this.state.projects.filter((p) => p.id !== projectId),
        });
    };

    duplicateProject = (project) => {
        const newProject = {
            ...project,
            id: Date.now().toString(),
            title: `${project.title} (copie)`,
            createdAt: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        };
        this.setState({
            projects: [newProject, ...this.state.projects],
        });
        this._closeOptionsPanel();
    };

    deleteProject = (projectId) => {
        Alert.alert(
            'Confirmer la suppression',
            'Êtes-vous sûr de vouloir supprimer ce projet ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        this.setState({
                            projects: this.state.projects.filter((p) => p.id !== projectId),
                        });
                        this._closeOptionsPanel();
                    },
                },
            ]
        );
    };

    archiveProject = (projectId) => {
        this.setState({
            projects: this.state.projects.map((p) =>
                p.id === projectId ? { ...p, status: 'Archivé' } : p
            ),
        });
        this._closeOptionsPanel();
        Alert.alert('Succès', 'Projet archivé avec succès !');
    };

    getFilteredAndSortedProjects = () => {
        const { projects, sortOrder, selectedDomain, selectedTab } = this.state;

        let filtered = selectedTab === 'Mes projets'
            ? projects.filter(p => !p.followed)
            : projects.filter(p => p.followed);

        if (selectedDomain !== 'Tous') {
            filtered = filtered.filter(item => item.domain === selectedDomain);
        }

        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.createdAt.split(',')[0].replace(/(\d+)\s(\w+)\s(\d+)/, '$2 $1 $3'));
            const dateB = new Date(b.createdAt.split(',')[0].replace(/(\d+)\s(\w+)\s(\d+)/, '$2 $1 $3'));
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
    };

    getResultsCount = () => this.getFilteredAndSortedProjects().length;

    getDomainList = () => {
        const domains = this.state.projects.map(p => p.domain);
        return ['Tous', ...new Set(domains)];
    };

    selectTab = (tab) => this.setState({ selectedTab: tab });

    toggleSort = () => {
        this.setState(prev => ({ sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc' }));
    };

    selectDomain = (domain) => this.setState({ selectedDomain: domain });

    resetFilters = () => {
        this.setState({
            selectedDomain: 'Tous',
            sortOrder: 'desc',
        });
    };

    getProjectCountText = () => {
        const { projects } = this.state;
        const count = projects.length;

        if (count === 0) return 'Aucun projet';
        if (count === 1) return '1 projet';
        return `${count} projets`;
    };

    getOptionsList = () => {
        const { selectedProject } = this.state;
        if (!selectedProject) return [];

        return [
            {
                icon: 'pencil-outline',
                label: 'Modifier le projet',
                color: '#0984E3',
                onPress: () => this.editProject(selectedProject),
            },
            {
                icon: 'content-copy',
                label: 'Dupliquer le projet',
                color: '#6C5CE7',
                onPress: () => this.duplicateProject(selectedProject),
            },
            {
                icon: 'share-variant-outline',
                label: 'Partager le projet',
                color: '#00B894',
                onPress: () => {
                    Alert.alert('Partage', 'Fonctionnalité de partage à venir !');
                    this._closeOptionsPanel();
                },
            },
            {
                icon: 'export-variant',
                label: 'Exporter le projet',
                color: '#FDCB6E',
                onPress: () => {
                    Alert.alert('Export', 'Projet exporté avec succès !');
                    this._closeOptionsPanel();
                },
            },
            {
                icon: 'archive-outline',
                label: 'Archiver le projet',
                color: '#636E72',
                onPress: () => this.archiveProject(selectedProject.id),
            },
            {
                icon: 'delete-outline',
                label: 'Supprimer le projet',
                color: '#FF7675',
                onPress: () => this.deleteProject(selectedProject.id),
            },
        ];
    };

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    renderStars = (rating, projectId, isFollowed) => {
        if (!isFollowed) {
            return (
                <View style={projectstyle.starsContainer}>
                    <MaterialCommunityIcons name="star-outline" size={14} color="#B2BEC3" />
                    <Text style={projectstyle.starsPlaceholderText}>En attente d'encadrement</Text>
                </View>
            );
        }

        return (
            <View style={projectstyle.starsContainer}>
                <View style={projectstyle.starsRow}>
                    <Text style={projectstyle.ratingLabel}>Évaluation :</Text>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => this.rateProject(projectId, star)}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={20}
                                color={star <= rating ? '#FDCB6E' : '#DFE6E9'}
                                style={projectstyle.starIcon}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={projectstyle.starsCount}>{rating}/5</Text>
            </View>
        );
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[projectstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={projectstyle.headerSection}>
                        <View style={projectstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={projectstyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={projectstyle.headertext}>
                            <Text style={[projectstyle.headerTitle, styles.textBold]}>Programme VAPISCO</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    renderFilterContainer = () => {
        const { selectedDomain, sortOrder, selectedTab } = this.state;
        const domainList = this.getDomainList();
        const resultsCount = this.getResultsCount();

        return (
            <View style={projectstyle.filterContainer}>

                <View style={projectstyle.tabContainer}>
                    <TouchableOpacity
                        style={[
                            projectstyle.tabButton,
                            selectedTab === 'Mes projets' && projectstyle.tabButtonActive
                        ]}
                        onPress={() => this.selectTab('Mes projets')}
                    >
                        <MaterialCommunityIcons
                            name="lightbulb-outline"
                            size={18}
                            color={selectedTab === 'Mes projets' ? '#FFF' : '#636E72'}
                        />
                        <Text style={[
                            projectstyle.tabButtonText,
                            selectedTab === 'Mes projets' && projectstyle.tabButtonTextActive
                        ]}>
                            Mes projets
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            projectstyle.tabButton,
                            selectedTab === 'Projets suivis' && projectstyle.tabButtonActive
                        ]}
                        onPress={() => this.selectTab('Projets suivis')}
                    >
                        <MaterialCommunityIcons
                            name="account-check-outline"
                            size={18}
                            color={selectedTab === 'Projets suivis' ? '#FFF' : '#636E72'}
                        />
                        <Text style={[
                            projectstyle.tabButtonText,
                            selectedTab === 'Projets suivis' && projectstyle.tabButtonTextActive
                        ]}>
                            Projets suivis
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={projectstyle.filterRow}>
                    <View style={projectstyle.filterDropdown}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={projectstyle.filterChips}>
                                {domainList.map((domain) => (
                                    <TouchableOpacity
                                        key={domain}
                                        style={[
                                            projectstyle.filterChip,
                                            selectedDomain === domain && projectstyle.filterChipActive,
                                        ]}
                                        onPress={() => this.selectDomain(domain)}
                                    >
                                        <Text style={[
                                            projectstyle.filterChipText,
                                            selectedDomain === domain && projectstyle.filterChipTextActive,
                                        ]}>
                                            {domain}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={projectstyle.resultsBar}>
                    <Text style={[projectstyle.resultsCount, styles.text]}>
                        {resultsCount} résultat{resultsCount > 1 ? 's' : ''}
                    </Text>
                    <View style={projectstyle.resultsActions}>
                        <TouchableOpacity
                            style={projectstyle.sortButton}
                            onPress={this.toggleSort}
                        >
                            <MaterialCommunityIcons
                                name={sortOrder === 'desc' ? 'sort-calendar-descending' : 'sort-calendar-ascending'}
                                size={20}
                                color="#1B497D"
                            />
                        </TouchableOpacity>
                        {selectedDomain !== 'Tous' && (
                            <TouchableOpacity
                                style={projectstyle.resetButton}
                                onPress={this.resetFilters}
                            >
                                <MaterialCommunityIcons name="filter-remove" size={18} color="#FF7675" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    renderProjectItem = (item, index) => {
        const cardColors = ['#74B9FF', '#A29BFE', '#55EFC4'];
        const cardColor = cardColors[index % cardColors.length];
        const { selectedTab } = this.state;

        return (
            <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => {
                    if (selectedTab === 'Projets suivis') {
                        this.openChatForProject(item);
                    }
                }}
            >
                <View style={[projectstyle.projectCard, { borderLeftColor: cardColor }]}>
                    <View style={projectstyle.cardHeader}>
                        <View style={projectstyle.cardDomain}>
                            <View style={[projectstyle.domainDot, { backgroundColor: cardColor }]} />
                            <Text style={[projectstyle.domainText, styles.textBold]}>{item.domain}</Text>
                            {item.followed && (
                                <View style={projectstyle.followedBadge}>
                                    <MaterialCommunityIcons name="account-check" size={12} color="#1B497D" />
                                    <Text style={projectstyle.followedText}>Suivi</Text>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity
                            style={projectstyle.moreButton}
                            onPress={() => this._openOptionsPanel(item)}
                        >
                            <MaterialCommunityIcons name="dots-vertical" size={20} color='#636E72' />
                        </TouchableOpacity>
                    </View>

                    <Text style={[projectstyle.cardTitle, styles.textBold]}>{item.title}</Text>
                    <Text style={projectstyle.cardDescription} numberOfLines={2}>
                        {item.description}
                    </Text>

                    {item.followed && item.responsable && (
                        <View style={projectstyle.responsableInfo}>
                            <MaterialCommunityIcons name="account-tie" size={14} color="#1B497D" />
                            <Text style={projectstyle.responsableText}>
                                Encadré par : {item.responsable.name}
                            </Text>
                        </View>
                    )}

                    {this.renderStars(item.rating, item.id, item.followed)}

                    <View style={projectstyle.cardFooter}>
                        <View style={projectstyle.footerLeft}>
                            <MaterialCommunityIcons name="clock-outline" size={14} color='#636E72' />
                            <Text style={[projectstyle.footerText, styles.textBold]}>{item.createdAt}</Text>
                        </View>
                        <View style={[projectstyle.statusBadge, {
                            backgroundColor: item.status === 'Validé' ? '#00B894' + '20' :
                                item.status === 'En attente' ? '#FDCB6E' + '20' : '#636E72' + '20'
                        }]}>
                            <View style={[projectstyle.statusDot, {
                                backgroundColor: item.status === 'Validé' ? '#00B894' :
                                    item.status === 'En attente' ? '#FDCB6E' : '#636E72'
                            }]} />
                            <Text style={[projectstyle.statusText, styles.textBold, {
                                color: item.status === 'Validé' ? '#00B894' :
                                    item.status === 'En attente' ? '#FDCB6E' : '#636E72'
                            }]}>
                                {item.status}
                            </Text>
                        </View>
                    </View>

                    {selectedTab === 'Projets suivis' && (
                        <View style={projectstyle.chatIndicator}>
                            <MaterialCommunityIcons name="chat-processing-outline" size={16} color="#1B497D" />
                            <Text style={projectstyle.chatIndicatorText}>Cliquez pour discuter avec l'encadreur</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    renderFormModal = () => {
        const { title, description, domain, domains } = this.state;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isFormModalVisible}
                onRequestClose={this._closeFormModal}
            >
                <View style={projectstyle.modalOverlay}>
                    <View style={projectstyle.modalContainer}>
                        <View style={projectstyle.modalHeader}>
                            <Text style={[projectstyle.modalTitle, styles.textBold]}>Nouveau projet</Text>
                            <TouchableOpacity onPress={this._closeFormModal}>
                                <MaterialCommunityIcons name="close" size={24} color="#999" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={[projectstyle.modalLabel, styles.textBold]}>Titre du projet *</Text>
                            <TextInput
                                style={[projectstyle.modalInput, styles.text]}
                                placeholder="Ex: Application de gestion de notes"
                                placeholderTextColor="#999"
                                value={title}
                                onChangeText={(text) => this.setState({ title: text })}
                                maxLength={100}
                            />

                            <Text style={[projectstyle.modalLabel, styles.textBold]}>Domaine d'activité *</Text>
                            <Dropdown
                                style={projectstyle.dropdown}
                                placeholderStyle={projectstyle.placeholderStyle}
                                selectedTextStyle={projectstyle.selectedTextStyle}
                                inputSearchStyle={projectstyle.inputSearchStyle}
                                iconStyle={projectstyle.iconStyle}
                                containerStyle={projectstyle.dropdownContainer}
                                itemContainerStyle={projectstyle.itemContainerStyle}
                                itemTextStyle={[projectstyle.itemTextStyle, styles.text]}
                                data={domains}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="name"
                                placeholder="Sélectionnez un domaine"
                                searchPlaceholder="Rechercher un domaine..."
                                value={domain?.name || domain}
                                onChange={item => {
                                    this.setState({ domain: item });
                                }}
                                renderLeftIcon={() => (
                                    <MaterialCommunityIcons name="view-grid-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                                )}
                                renderItem={(item) => (
                                    <View style={projectstyle.dropdownItem}>
                                        <MaterialCommunityIcons name={item.icon} size={20} color="#1B497D" />
                                        <Text style={[projectstyle.dropdownItemText, styles.text]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                )}
                            />

                            <Text style={[projectstyle.modalLabel, styles.textBold]}>Description *</Text>
                            <TextInput
                                style={[projectstyle.modalInput, projectstyle.modalTextArea, styles.text]}
                                placeholder="Décrivez votre projet en détail..."
                                placeholderTextColor="#999"
                                value={description}
                                onChangeText={(text) => this.setState({ description: text })}
                                multiline={true}
                                numberOfLines={5}
                                textAlignVertical="top"
                                maxLength={500}
                            />

                            <View style={projectstyle.modalButtonsContainer}>
                                <TouchableOpacity
                                    style={[projectstyle.modalButton, projectstyle.modalCancelButton]}
                                    onPress={this._closeFormModal}
                                >
                                    <Text style={[projectstyle.modalCancelButtonText, styles.textBold]}>Annuler</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[projectstyle.modalButton, projectstyle.modalValidateButton]}
                                    onPress={this.handleSubmit}
                                >
                                    <Text style={[projectstyle.modalValidateButtonText, styles.textBold]}>Valider</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    // Rendu du modal de chat (MODIFIÉ)
    renderChatModal = () => {
        const { isChatModalVisible, currentChatProject, messages, newMessage, responsableInfo, isTyping, quickReplies, showMessageActions, selectedMessage, attachedFile } = this.state;

        if (!currentChatProject) return null;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={isChatModalVisible}
                onRequestClose={this.closeChatModal}
            >
                <View style={projectstyle.chatContainer}>
                    {/* En-tête du chat (padding réduit via styles) */}
                    <View style={projectstyle.chatHeader}>
                        <TouchableOpacity
                            style={projectstyle.chatBackButton}
                            onPress={this.closeChatModal}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={22} color="#FFF" />
                        </TouchableOpacity>
                        
                        <View style={projectstyle.chatHeaderInfo}>
                            <Text style={projectstyle.chatHeaderTitle} numberOfLines={1}>
                                {currentChatProject.title}
                            </Text>
                            <View style={projectstyle.chatResponsableInfo}>
                                <View style={projectstyle.chatStatusIndicator} />
                                <Text style={projectstyle.chatResponsableName}>
                                    {responsableInfo?.name || 'Encadreur'} • En ligne
                                </Text>
                            </View>
                        </View>
                        
                        <View style={projectstyle.chatHeaderAvatar}>
                            <MaterialCommunityIcons name="account-tie" size={24} color="#FFF" />
                            <View style={projectstyle.chatStatusIndicator} />
                        </View>
                    </View>

                    {/* Corps du chat */}
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        style={projectstyle.chatMessagesList}
                        contentContainerStyle={projectstyle.chatMessagesContent}
                        ref={ref => this.chatListRef = ref}
                        onContentSizeChange={() => this.chatListRef?.scrollToEnd({ animated: true })}
                        renderItem={({ item, index }) => {
                            const showDate = index === 0 || messages[index - 1].date !== item.date;
                            
                            return (
                                <View>
                                    {showDate && (
                                        <View style={projectstyle.chatDateSeparator}>
                                            <MaterialCommunityIcons name="calendar" size={12} color="#999" />
                                            <Text style={projectstyle.chatDateText}>{item.date}</Text>
                                        </View>
                                    )}
                                    
                                    <TouchableOpacity
                                        onLongPress={() => this.handleMessageLongPress(item)}
                                        delayLongPress={500}
                                    >
                                        <View style={[
                                            projectstyle.chatMessageBubble,
                                            item.sender === 'student' ? projectstyle.chatMessageStudent : projectstyle.chatMessageResponsable,
                                            item.isPinned && { borderLeftWidth: 3, borderLeftColor: '#FFD700' }
                                        ]}>
                                            <View style={projectstyle.chatMessageHeader}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                    {item.isPinned && (
                                                        <MaterialCommunityIcons name="pin" size={12} color="#FFD700" />
                                                    )}
                                                    <Text style={[
                                                        projectstyle.chatMessageSender,
                                                        item.sender === 'student' ? projectstyle.chatMessageSenderStudent : projectstyle.chatMessageSenderResponsable
                                                    ]}>
                                                        {item.sender === 'student' ? 'Moi' : responsableInfo?.name?.split(' ')[0] || 'Encadreur'}
                                                    </Text>
                                                </View>
                                                <Text style={[
                                                    projectstyle.chatMessageTime,
                                                    item.sender === 'student' ? projectstyle.chatMessageTimeStudent : null
                                                ]}>
                                                    {item.timestamp}
                                                </Text>
                                            </View>
                                            
                                            <Text style={[
                                                projectstyle.chatMessageText,
                                                item.sender === 'student' ? projectstyle.chatMessageTextStudent : projectstyle.chatMessageTextResponsable
                                            ]}>
                                                {item.text}
                                            </Text>
                                            
                                            {item.file && (
                                                <View style={projectstyle.filePreviewContainer}>
                                                    <View style={projectstyle.filePreviewIcon}>
                                                        <MaterialCommunityIcons 
                                                            name={item.file.type === 'pdf' ? 'file-pdf-box' : item.file.type === 'jpg' ? 'file-image' : 'file-video'} 
                                                            size={20} 
                                                            color="#1B497D" 
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={projectstyle.filePreviewName} numberOfLines={1}>{item.file.name}</Text>
                                                        <Text style={projectstyle.filePreviewSize}>{item.file.size}</Text>
                                                    </View>
                                                    <TouchableOpacity>
                                                        <MaterialCommunityIcons name="download" size={18} color="#1B497D" />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            
                                            {Object.keys(item.reactions).length > 0 && Object.values(item.reactions).some(count => count > 0) && (
                                                <View style={projectstyle.chatMessageReactions}>
                                                    {item.reactions['thumb-up'] > 0 && (
                                                        <TouchableOpacity 
                                                            style={projectstyle.chatReactionButton}
                                                            onPress={() => this.addReaction(item.id, 'thumb-up')}
                                                        >
                                                            <MaterialCommunityIcons name="thumb-up" size={14} color="#1B497D" />
                                                            <Text style={projectstyle.chatReactionCount}>{item.reactions['thumb-up']}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    {item.reactions['heart'] > 0 && (
                                                        <TouchableOpacity 
                                                            style={projectstyle.chatReactionButton}
                                                            onPress={() => this.addReaction(item.id, 'heart')}
                                                        >
                                                            <MaterialCommunityIcons name="heart" size={14} color="#FF7675" />
                                                            <Text style={projectstyle.chatReactionCount}>{item.reactions['heart']}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    {item.reactions['check'] > 0 && (
                                                        <TouchableOpacity 
                                                            style={projectstyle.chatReactionButton}
                                                            onPress={() => this.addReaction(item.id, 'check')}
                                                        >
                                                            <MaterialCommunityIcons name="check-circle" size={14} color="#00B894" />
                                                            <Text style={projectstyle.chatReactionCount}>{item.reactions['check']}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                    
                    {isTyping && (
                        <View style={projectstyle.chatTypingIndicator}>
                            <MaterialCommunityIcons name="pencil" size={12} color="#636E72" style={{ marginRight: 4 }} />
                            <Text style={projectstyle.chatTypingText}>{responsableInfo?.name?.split(' ')[0]} est en train d'écrire</Text>
                            <View style={projectstyle.chatTypingDots}>
                                <View style={[projectstyle.chatTypingDot, { opacity: 0.3 }]} />
                                <View style={[projectstyle.chatTypingDot, { opacity: 0.5 }]} />
                                <View style={[projectstyle.chatTypingDot, { opacity: 0.7 }]} />
                            </View>
                        </View>
                    )}
                    
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={projectstyle.quickRepliesContainer}
                        contentContainerStyle={{ paddingRight: 16 }}
                    >
                        {quickReplies.map((reply, index) => (
                            <TouchableOpacity
                                key={index}
                                style={projectstyle.quickReplyButton}
                                onPress={() => this.handleQuickReply(reply)}
                            >
                                <MaterialCommunityIcons 
                                    name={
                                        index === 0 ? 'chart-line' :
                                        index === 1 ? 'calendar-clock' :
                                        index === 2 ? 'bookshelf' :
                                        index === 3 ? 'video' :
                                        index === 4 ? 'help-circle' :
                                        'hand-heart'
                                    } 
                                    size={14} 
                                    color="#1B497D" 
                                />
                                <Text style={projectstyle.quickReplyText}>{reply}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Zone de saisie (modifiée : emoji et TextInput sur la même ligne) */}
                    <View style={projectstyle.chatInputContainer}>
                        <TouchableOpacity 
                            style={projectstyle.chatAttachButton}
                            onPress={this.handleFileAttach}
                        >
                            <MaterialCommunityIcons name="paperclip" size={22} color="#1B497D" />
                        </TouchableOpacity>
                        
                        <View style={projectstyle.chatInputWrapper}>
                            {attachedFile && (
                                <View style={projectstyle.filePreviewContainer}>
                                    <View style={projectstyle.filePreviewIcon}>
                                        <MaterialCommunityIcons 
                                            name={
                                                attachedFile.type === 'pdf' ? 'file-pdf-box' :
                                                attachedFile.type === 'jpg' ? 'file-image' :
                                                attachedFile.type === 'mp4' ? 'file-video' : 'file'
                                            } 
                                            size={18} 
                                            color="#1B497D" 
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={projectstyle.filePreviewName} numberOfLines={1}>
                                            {attachedFile.name}
                                        </Text>
                                        <Text style={projectstyle.filePreviewSize}>{attachedFile.size}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={projectstyle.fileRemoveButton}
                                        onPress={this.removeAttachedFile}
                                    >
                                        <MaterialCommunityIcons name="close-circle" size={20} color="#FF7675" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            
                            {/* Nouvelle ligne horizontale */}
                            <View style={projectstyle.chatInputRow}>
                                <TextInput
                                    style={projectstyle.chatInput}
                                    placeholder="Écrivez votre message..."
                                    placeholderTextColor="#999"
                                    value={newMessage}
                                    onChangeText={(text) => this.setState({ newMessage: text })}
                                    multiline
                                    maxLength={1000}
                                />
                                <TouchableOpacity style={projectstyle.chatInputActionButton}>
                                    <MaterialCommunityIcons name="sticker-emoji" size={22} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <TouchableOpacity
                            style={[
                                projectstyle.chatSendButton,
                                (!newMessage.trim() && !attachedFile) && projectstyle.chatSendButtonDisabled
                            ]}
                            onPress={this.sendMessage}
                            disabled={!newMessage.trim() && !attachedFile}
                        >
                            <MaterialCommunityIcons 
                                name={newMessage.trim() || attachedFile ? "send" : "microphone"} 
                                size={20} 
                                color="#FFF" 
                            />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Menu contextuel des messages (inchangé) */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showMessageActions}
                        onRequestClose={() => this.setState({ showMessageActions: false })}
                    >
                        <TouchableOpacity 
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPress={() => this.setState({ showMessageActions: false })}
                        >
                            <View style={[projectstyle.messageActionsModal, { 
                                position: 'absolute', 
                                bottom: 100, 
                                alignSelf: 'center' 
                            }]}>
                                <TouchableOpacity 
                                    style={projectstyle.messageActionItem}
                                    onPress={() => this.addReaction(selectedMessage?.id, 'thumb-up')}
                                >
                                    <MaterialCommunityIcons name="thumb-up-outline" size={20} color="#1B497D" />
                                    <Text style={projectstyle.messageActionText}>J'aime</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={projectstyle.messageActionItem}
                                    onPress={() => this.addReaction(selectedMessage?.id, 'heart')}
                                >
                                    <MaterialCommunityIcons name="heart-outline" size={20} color="#FF7675" />
                                    <Text style={projectstyle.messageActionText}>J'adore</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={projectstyle.messageActionItem}
                                    onPress={() => this.addReaction(selectedMessage?.id, 'check')}
                                >
                                    <MaterialCommunityIcons name="check-circle-outline" size={20} color="#00B894" />
                                    <Text style={projectstyle.messageActionText}>Approuver</Text>
                                </TouchableOpacity>
                                
                                <View style={projectstyle.messageActionsDivider} />
                                
                                <TouchableOpacity 
                                    style={projectstyle.messageActionItem}
                                    onPress={() => this.copyMessage(selectedMessage?.text)}
                                >
                                    <MaterialCommunityIcons name="content-copy" size={20} color="#636E72" />
                                    <Text style={projectstyle.messageActionText}>Copier</Text>
                                </TouchableOpacity>
                                
                                {selectedMessage?.sender === 'student' && (
                                    <TouchableOpacity 
                                        style={projectstyle.messageActionItem}
                                        onPress={() => this.deleteMessage(selectedMessage?.id)}
                                    >
                                        <MaterialCommunityIcons name="delete-outline" size={20} color="#FF7675" />
                                        <Text style={[projectstyle.messageActionText, { color: '#FF7675' }]}>Supprimer</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </Modal>
        );
    };

    render() {
        const filteredProjects = this.getFilteredAndSortedProjects();
        const options = this.getOptionsList();

        return (
            <View style={projectstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={projectstyle.container}
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
                            <Text style={[styles.sectionTitle, styles.textBold]}>Programme VAPISCO</Text>
                        </View>

                        <View style={projectstyle.refinedHeader}>
                            <View style={projectstyle.headerTitleRow}>
                                <MaterialCommunityIcons name="lightbulb-outline" size={22} color="#FFF" />
                                <Text style={[projectstyle.refinedHeaderTitle, styles.textBold]}>Gestion des Projets</Text>
                            </View>
                            <View style={projectstyle.counterBadge}>
                                <MaterialCommunityIcons name="pulse" size={16} color="#FFF" />
                                <Text style={[projectstyle.counterText, styles.textBold]}>{this.getProjectCountText()}</Text>
                            </View>
                        </View>

                        {this.renderFilterContainer()}

                        <View style={projectstyle.projectsSection}>
                            {filteredProjects.length === 0 ? (
                                <View style={projectstyle.emptyState}>
                                    <MaterialCommunityIcons name="rocket-launch-outline" size={80} color={'#FFF' + '40'} />
                                    <Text style={[projectstyle.emptyStateTitle, styles.textBold]}>Aucun projet trouvé</Text>
                                    <Text style={[projectstyle.emptyStateText, styles.text]}>
                                        Aucun projet ne correspond à vos critères de recherche.
                                    </Text>
                                </View>
                            ) : (
                                <View style={projectstyle.projectsListContainer}>
                                    {filteredProjects.map((item, index) => this.renderProjectItem(item, index))}
                                </View>
                            )}
                            <View style={{ height: 80 }} />
                        </View>

                        {this.state.submitAnimation._value > 0 && (
                            <Animated.View
                                style={[
                                    projectstyle.successToast,
                                    {
                                        opacity: this.state.submitAnimation,
                                        transform: [
                                            {
                                                translateY: this.state.submitAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-20, 0],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons name="check-circle" size={24} color="white" />
                                <Text style={[projectstyle.successText, styles.textBold]}>Projet soumis avec succès !</Text>
                            </Animated.View>
                        )}
                    </Animated.ScrollView>

                    <TouchableOpacity
                        style={projectstyle.floatingButton}
                        onPress={this._openFormModal}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
                    </TouchableOpacity>

                    <SwipeablePanel
                        fullWidth={true}
                        openLarge={true}
                        closeOnTouchOutside={true}
                        showCloseButton={true}
                        isActive={this.state.isPanelOpen}
                        onClose={this._closeOptionsPanel}
                        onPressCloseButton={this._closeOptionsPanel}
                        style={projectstyle.containermenu}
                        barContainerStyle={projectstyle.swipablepanelbarstyle}
                        closeRootStyle={projectstyle.swipablepanelcloseicon}
                    >
                        <ScrollView style={projectstyle.menuitemscroll}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={option.onPress}
                                    style={projectstyle.headermenuitem}
                                    activeOpacity={0.7}
                                >
                                    <MaterialCommunityIcons name={option.icon} size={24} color={option.color} />
                                    <Text style={[projectstyle.menulisttext, styles.text]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </SwipeablePanel>

                    {this.renderFormModal()}
                    {this.renderChatModal()}
                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHomePageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Student_Project);

