import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, ImageBackground, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { supportchatstyle, C } from '../../assets/styles/supportchat';
import { switchSupportHomeAction } from '../../navigations/rootNavigation';
import { styles } from '../../assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class SupportChat extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            messageText: '',
            input: "",
            caseNumber: `CASE-${Date.now().toString().slice(-8)}`,
            serviceConcerne: "Service Client Général",
            messages: [
                {
                    id: 1,
                    text: "Bonjour et bienvenue sur le chat en ligne de Poly-h school. Nous sommes ravis de vous accueillir parmi nos clients.👏",
                    sender: 'support',
                    timestamp: new Date(Date.now() - 3600000),
                    status: 'read'
                },
                {
                    id: 2,
                    text: "Notre équipe de service client est à votre disposition pour répondre à toutes vos questions et vous accompagner dans l'utilisation de nos services. Nous espérons que vous serez satisfait de notre banque et que vous recommanderez à vos proches.😊\n\nMerci de nous faire confiance!😊",
                    sender: 'support',
                    timestamp: new Date(Date.now() - 3500000),
                    status: 'read'
                },
            ],
            isTyping: false,
            chatId: null,
            supportOnline: true,
            lastSeen: new Date(),
            selectedImage: null,
            showQuickReplies: false,
            error: null,
        };

        this.scrollViewRef = React.createRef();
        this.ws = null;
    }

    componentDidMount() {
        this.initializeChat();
    }

    componentWillUnmount() {
        if (this.ws) {
            this.ws.close();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.messages.length !== this.state.messages.length) {
            this.scrollToBottom();
        }
    }

    initializeChat = async () => {
        this.setState({ is_loading: true, error: null });

        try {
            // Simuler l'initialisation d'une session de chat
            await new Promise(resolve => setTimeout(resolve, 1500));

            const chatId = `CHAT_${Date.now()}`;
            this.setState({
                chatId,
                is_loading: false,
                lastSeen: new Date()
            });

            // Simuler la connexion WebSocket
            this.connectToWebSocket(chatId);

        } catch (error) {
            this.setState({
                is_loading: false,
                error: 'Impossible de se connecter au service de chat. Veuillez réessayer.'
            });
        }
    };

    connectToWebSocket = (chatId) => {
        // Simulation de la connexion WebSocket
        console.log(`Connecté au chat ${chatId}`);
    };

    handleSendMessage = async () => {
        const { messageText, messages, chatId } = this.state;

        if (!messageText.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: messageText.trim(),
            sender: 'user',
            timestamp: new Date(),
            status: 'sending'
        };

        // Ajouter le message et vider l'input
        this.setState({
            messages: [...messages, newMessage],
            messageText: '',
            error: null
        });

        try {
            // Simuler l'envoi du message
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mettre à jour le statut du message
            this.updateMessageStatus(newMessage.id, 'sent');

            // Simuler la réponse du support
            setTimeout(() => {
                this.updateMessageStatus(newMessage.id, 'read');
                this.simulateSupportResponse(messageText.trim());
            }, 2000);

        } catch (error) {
            this.updateMessageStatus(newMessage.id, 'error');
            this.setState({ error: 'Échec de l\'envoi du message. Veuillez réessayer.' });
        }
    };

    showToast = (msg) => {
        this.setState({ toast: msg });
        setTimeout(() => this.setState({ toast: "" }), 2000);
    };

    _backToHome = () => {
        switchSupportHomeAction(true);
    }

    updateMessageStatus = (messageId, status) => {
        this.setState(prevState => ({
            messages: prevState.messages.map(msg =>
                msg.id === messageId ? { ...msg, status } : msg
            )
        }));
    };

    simulateSupportResponse = (userMessage) => {
        this.setState({ isTyping: true });

        setTimeout(() => {
            let response = this.generateSmartResponse(userMessage);

            const supportMessage = {
                id: Date.now(),
                text: response.text,
                sender: 'support',
                timestamp: new Date(),
                status: 'sent',
                quickReplies: response.quickReplies || null
            };

            this.setState(prevState => ({
                messages: [...prevState.messages, supportMessage],
                isTyping: false,
                lastSeen: new Date()
            }));
        }, 2000);
    };

    generateSmartResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        // Réponses intelligentes basées sur le contenu du message
        if (lowerMessage.includes('solde') || lowerMessage.includes('balance')) {
            return {
                text: "Pour consulter votre solde, vous pouvez :\n- Utiliser l'onglet 'Solde' dans l'application\n- Composer le #144# depuis votre téléphone\n\nSouhaitez-vous que je vous aide à vérifier votre solde ?",
                quickReplies: ['Oui, vérifier mon solde', 'Non merci', 'Autre question']
            };
        }

        if (lowerMessage.includes('transfert') || lowerMessage.includes('envoyer')) {
            return {
                text: "Pour effectuer un transfert d'argent, suivez ces étapes :\n1. Allez dans l'onglet 'Transfert'\n2. Entrez le numéro du destinataire\n3. Indiquez le montant\n4. Confirmez avec votre code PIN\n\nAvez-vous besoin d'aide pour un transfert spécifique ?",
                quickReplies: ['Problème de transfert', 'Frais de transfert', 'Autre']
            };
        }

        if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
            return {
                text: "Bonjour ! 😊 Comment puis-je vous aider aujourd'hui ?",
                quickReplies: ['Vérifier mon solde', 'Faire un transfert', 'Signaler un problème']
            };
        }

        if (lowerMessage.includes('problème') || lowerMessage.includes('erreur') || lowerMessage.includes('bug')) {
            return {
                text: "Je suis désolé d'apprendre que vous rencontrez des difficultés. Pour mieux vous aider, pouvez-vous me décrire le problème en détail ?\n\nNotre équipe technique est disponible pour résoudre votre problème rapidement.",
                quickReplies: ['Problème de connexion', 'Erreur de transaction', 'Autre problème']
            };
        }

        if (lowerMessage.includes('merci') || lowerMessage.includes('thank')) {
            return {
                text: "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions. Nous sommes là pour vous aider 24h/24 et 7j/7.",
            };
        }

        // Réponse par défaut
        return {
            text: "Je comprends votre question. Pour vous aider au mieux, je vais transférer votre demande à un conseiller spécialisé qui vous répondra dans les plus brefs délais.\n\nEn attendant, pouvez-vous me donner plus de détails sur votre demande ?",
            quickReplies: ['Parler à un conseiller', 'Voir les FAQs', 'Laisser un message']
        };
    };

    handleQuickReply = (replyText) => {
        this.setState({ messageText: replyText, showQuickReplies: false }, () => {
            this.handleSendMessage();
        });
    };

    handleRetryMessage = (messageId) => {
        const message = this.state.messages.find(msg => msg.id === messageId);
        if (message) {
            this.updateMessageStatus(messageId, 'sending');
            setTimeout(() => {
                this.updateMessageStatus(messageId, 'sent');
                this.simulateSupportResponse(message.text);
            }, 1000);
        }
    };

    handleRefresh = async () => {
        this.setState({ is_loading: true });
        await this.initializeChat();
        this.setState({ is_loading: false });
    };

    scrollToBottom = () => {
        if (this.scrollViewRef.current) {
            setTimeout(() => {
                this.scrollViewRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    formatTime = (timestamp) => {
        const now = new Date();
        const diff = now - timestamp;

        if (diff < 60000) return 'À l\'instant';
        if (diff < 3600000) return `Il y a ${Math.floor(diff / 60000)} min`;
        if (diff < 86400000) return timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        return timestamp.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    };

    renderMessage = (message) => {
        const isUser = message.sender === 'user';

        return (
            <View key={message.id} style={[
                supportchatstyle.messageContainer,
                isUser ? supportchatstyle.userMessageContainer : supportchatstyle.supportMessageContainer
            ]}>
                <View style={[
                    supportchatstyle.bubble,
                    isUser ? supportchatstyle.bubbleRight : supportchatstyle.bubbleLeft,
                    { paddingVertical: 12, paddingHorizontal: 16 }
                ]}>
                    <Text style={[
                        supportchatstyle.bubbleText, styles.text,
                        isUser ? supportchatstyle.userBubbleText : supportchatstyle.supportBubbleText,
                        { fontSize: 16 }
                    ]}>
                        {message.text}
                    </Text>

                    <View style={supportchatstyle.messageFooter}>
                        <Text style={[supportchatstyle.timestamp, styles.text]}>
                            {this.formatTime(message.timestamp)}
                        </Text>
                        {isUser && (
                            <View style={supportchatstyle.statusContainer}>
                                {message.status === 'sending' && (
                                    <ActivityIndicator size="small" color="#999" />
                                )}
                                {message.status === 'sent' && (
                                    <Icon name="check" size={14} color="#999" />
                                )}
                                {message.status === 'read' && (
                                    <Icon name="check-all" size={14} color="#4CAF50" />
                                )}
                                {message.status === 'error' && (
                                    <TouchableOpacity onPress={() => this.handleRetryMessage(message.id)}>
                                        <Icon name="alert-circle" size={14} color="#F44336" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { messages, input, messageText, isTyping, supportOnline, is_loading, error, caseNumber, serviceConcerne } = this.state;
        const hasText = input.trim().length > 0;

        return (
            <View style={supportchatstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >

                    <View style={supportchatstyle.headerCompact}>
                        <View style={styles.section}>
                            <View style={[styles.back, supportchatstyle.back]}>
                                <TouchableOpacity onPress={this._backToHome}>
                                    <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={supportchatstyle.infoCompactContainer}>
                                <Text style={[supportchatstyle.infoCompactText, styles.textBold]}>
                                    Support Client
                                </Text>

                                <View style={supportchatstyle.statusIndicatorCompact}>
                                    <View style={[
                                        supportchatstyle.onlineDotCompact,
                                        { backgroundColor: supportOnline ? '#4CAF50' : '#F44336' }
                                    ]} />
                                    <Text style={supportchatstyle.statusTextCompact}>
                                        {supportOnline ? 'En ligne' : 'Hors ligne'}
                                    </Text>
                                </View>
                                <Text style={[supportchatstyle.infoCompacttext, styles.text]}>
                                     {caseNumber}
                                </Text>
                                <Text style={[supportchatstyle.infoCompacttext, styles.text]}>
                                    {serviceConcerne}
                                </Text>
                            </View>


                        </View>
                        <View style={supportchatstyle.statusIndicatorCompact}>
                            
                        </View>
                    </View>

                    {is_loading ? (
                        <View style={supportchatstyle.loadingContainer}>
                            <ActivityIndicator size="large" color="#4CAF50" />
                            <Text style={[supportchatstyle.loadingText, styles.text]}>Connexion au chat...</Text>
                        </View>
                    ) : (
                        <ScrollView
                            ref={this.scrollViewRef}
                            contentContainerStyle={supportchatstyle.chatContainer}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={is_loading}
                                    onRefresh={this.handleRefresh}
                                    colors={['#4CAF50']}
                                />
                            }
                        >
                            {messages.map(message => this.renderMessage(message))}

                            {isTyping && (
                                <View style={supportchatstyle.typingIndicator}>
                                    <View style={supportchatstyle.typingDots}>
                                        <View style={supportchatstyle.typingDot} />
                                        <View style={supportchatstyle.typingDot} />
                                        <View style={supportchatstyle.typingDot} />
                                    </View>
                                    <Text style={[supportchatstyle.typingText, styles.text]}>Le support écrit...</Text>
                                </View>
                            )}

                            {error && (
                                <View style={supportchatstyle.errorContainer}>
                                    <Icon name="alert-circle" size={20} color="#F44336" />
                                    <Text style={[supportchatstyle.errorText, styles.text]}>{error}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ error: null })}>
                                        <Icon name="close" size={20} color="#F44336" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View style={{ height: 35 }} />
                        </ScrollView>
                    )}

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                    >
                        <View style={supportchatstyle.inputBar}>
                            <View style={supportchatstyle.inputContainer}>
                                <View style={supportchatstyle.inputIcons}>
                                    <TouchableOpacity
                                        onPress={() => this.setState(prev => ({ showEmoji: !prev.showEmoji }))}
                                        style={supportchatstyle.iconButton}
                                    >
                                    </TouchableOpacity>
                                </View>

                                <View style={[supportchatstyle.textInputWrapper, hasText && supportchatstyle.textInputActive]}>
                                    <TextInput
                                        style={[supportchatstyle.textInput, styles.text]}
                                        placeholder="Écrivez votre message..."
                                        placeholderTextColor="#999"
                                        value={messageText}
                                        onChangeText={(text) => this.setState({ messageText: text })}
                                        multiline
                                        maxLength={500}
                                        returnKeyType="send"
                                        onSubmitEditing={this.handleSendMessage}
                                        editable={!is_loading}
                                    />
                                    <TouchableOpacity
                                        onPress={() => this.showToast("📎 Pièce jointe")}
                                        style={supportchatstyle.attachButton}
                                    >
                                        <Icon name="paperclip" size={22} color={C.textMuted} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={this.handleSendMessage}
                                    style={[supportchatstyle.micButton, { backgroundColor: hasText ? C.accent2 : "#1e3a5e" }]}
                                >
                                    <Icon
                                        name="send"
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 45 }} />
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchSupportHomeAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        root_navigation: state.navigation.root_navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportChat);




































