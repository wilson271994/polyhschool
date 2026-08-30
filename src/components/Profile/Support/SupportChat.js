import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { supportchatstyle } from '../../../assets/styles/supportchat';
import { switchSupportHomeAction, switchFooterVisibilityAction } from '../../../navigations/rootNavigation';
import { styles } from '../../../assets/styles';
import { COLORS } from '../../../assets/styles/theme';

class SupportChat extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            messageText: '',
            caseNumber: `CASE-${Date.now().toString().slice(-6)}`,
            serviceConcerne: 'Service Client Général',
            messages: [
                {
                    id: 1,
                    text: 'Bonjour et bienvenue sur l’assistance Poly-H School ! 👏',
                    sender: 'support',
                    timestamp: new Date(Date.now() - 3600000),
                    status: 'read',
                },
                {
                    id: 2,
                    text: "Comment pouvons-nous vous aider aujourd'hui ? Laissez-nous un message et un conseiller vous répondra.",
                    sender: 'support',
                    timestamp: new Date(Date.now() - 3500000),
                    status: 'read',
                },
            ],
            isTyping: false,
            chatId: null,
            supportOnline: true,
            error: null,
            toast: '',
        };

        this.scrollViewRef = React.createRef();
    }

    componentDidMount() {
        this.initializeChat();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.messages.length !== this.state.messages.length) {
            this.scrollToBottom();
        }
    }

    initializeChat = async () => {
        this.setState({ is_loading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.setState({
                chatId: `CHAT_${Date.now()}`,
                is_loading: false,
            });
        } catch (error) {
            this.setState({
                is_loading: false,
                error: 'Impossible de se connecter au service de chat.',
            });
        }
    };

    handleSendMessage = async () => {
        const { messageText, messages } = this.state;
        if (!messageText.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: messageText.trim(),
            sender: 'user',
            timestamp: new Date(),
            status: 'sending',
        };

        this.setState({
            messages: [...messages, newMessage],
            messageText: '',
            error: null,
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            this.updateMessageStatus(newMessage.id, 'sent');

            setTimeout(() => {
                this.updateMessageStatus(newMessage.id, 'read');
                this.simulateSupportResponse(newMessage.text);
            }, 1500);
        } catch (error) {
            this.updateMessageStatus(newMessage.id, 'error');
        }
    };

    showToast = (msg) => {
        this.setState({ toast: msg });
        setTimeout(() => this.setState({ toast: '' }), 2500);
    };

    _navigateToSupport = () => {
        switchSupportHomeAction(true);
        switchFooterVisibilityAction(true);
    };

    updateMessageStatus = (messageId, status) => {
        this.setState((prevState) => ({
            messages: prevState.messages.map((msg) =>
                msg.id === messageId ? { ...msg, status } : msg
            ),
        }));
    };

    simulateSupportResponse = (userMessage) => {
        this.setState({ isTyping: true });

        setTimeout(() => {
            const responseText = this.generateSmartResponse(userMessage);
            const supportMessage = {
                id: Date.now(),
                text: responseText,
                sender: 'support',
                timestamp: new Date(),
                status: 'sent',
            };

            this.setState((prevState) => ({
                messages: [...prevState.messages, supportMessage],
                isTyping: false,
            }));
        }, 1800);
    };

    generateSmartResponse = (userMessage) => {
        const lower = userMessage.toLowerCase();
        if (lower.includes('frais') || lower.includes('tarif') || lower.includes('payer')) {
            return "Concernant les frais de scolarité, vous pouvez effectuer vos versements directement via l'onglet Transactions de l'application.";
        }
        if (lower.includes('bulletin') || lower.includes('note')) {
            return "Les notes et bulletins trimestriels sont publiés dans la rubrique Pédagogique dès validation par la direction.";
        }
        return 'Votre message a bien été pris en compte. Un conseiller va examiner votre requête.';
    };

    scrollToBottom = () => {
        if (this.scrollViewRef.current) {
            setTimeout(() => {
                this.scrollViewRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    renderMessage = (message) => {
        const isUser = message.sender === 'user';

        return (
            <View
                key={message.id}
                style={[
                    supportchatstyle.messageRow,
                    isUser ? supportchatstyle.userRow : supportchatstyle.supportRow,
                ]}
            >
                <View
                    style={[
                        supportchatstyle.bubble,
                        isUser ? supportchatstyle.userBubble : supportchatstyle.supportBubble,
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            supportchatstyle.bubbleText,
                            isUser ? supportchatstyle.userBubbleText : supportchatstyle.supportBubbleText,
                        ]}
                    >
                        {message.text}
                    </Text>

                    <View style={supportchatstyle.messageMeta}>
                        <Text style={[styles.text, supportchatstyle.timestamp]}>
                            {this.formatTime(message.timestamp)}
                        </Text>

                        {isUser && (
                            <View style={supportchatstyle.statusBox}>
                                {message.status === 'sending' && (
                                    <ActivityIndicator size="small" color={COLORS.textMuted} />
                                )}
                                {message.status === 'sent' && (
                                    <Icon name="check" size={13} color={COLORS.textMuted} />
                                )}
                                {message.status === 'read' && (
                                    <Icon name="check-all" size={13} color={COLORS.accentGold} />
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const {
            messages,
            messageText,
            isTyping,
            supportOnline,
            is_loading,
            caseNumber,
            serviceConcerne,
            toast,
        } = this.state;

        return (
            <SafeAreaView style={supportchatstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={supportchatstyle.topGlow} pointerEvents="none" />
                <View style={supportchatstyle.bottomGlow} pointerEvents="none" />

                {/* Navigation Header */}
                <View style={supportchatstyle.headerNav}>
                    <TouchableOpacity
                        style={supportchatstyle.backButton}
                        onPress={this._navigateToSupport}
                        activeOpacity={0.7}
                    >
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <View style={supportchatstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, supportchatstyle.headerBadge]}>{caseNumber}</Text>
                        <Text style={[styles.textBold, supportchatstyle.headerTitle]}>{serviceConcerne}</Text>
                    </View>

                    <View style={supportchatstyle.onlineStatusBadge}>
                        <View
                            style={[
                                supportchatstyle.onlineDot,
                                { backgroundColor: supportOnline ? '#10B981' : '#EF4444' },
                            ]}
                        />
                        <Text style={[styles.text, supportchatstyle.onlineText]}>
                            {supportOnline ? 'En ligne' : 'Hors ligne'}
                        </Text>
                    </View>
                </View>

                {/* Chat Body */}
                {is_loading ? (
                    <View style={supportchatstyle.loadingBox}>
                        <ActivityIndicator size="large" color={COLORS.accentGold} />
                        <Text style={[styles.text, supportchatstyle.loadingText]}>
                            Connexion au support...
                        </Text>
                    </View>
                ) : (
                    <ScrollView
                        ref={this.scrollViewRef}
                        style={supportchatstyle.chatScroll}
                        contentContainerStyle={supportchatstyle.scrollContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={is_loading}
                                onRefresh={this.initializeChat}
                                tintColor={COLORS.accentGold}
                            />
                        }
                    >
                        {messages.map((msg) => this.renderMessage(msg))}

                        {isTyping && (
                            <View style={supportchatstyle.typingIndicator}>
                                <Icon name="dots-horizontal" size={22} color={COLORS.accentGold} />
                                <Text style={[styles.text, supportchatstyle.typingText]}>Le support écrit...</Text>
                            </View>
                        )}
                    </ScrollView>
                )}

                {/* Input Bar */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
                >
                    <View style={supportchatstyle.inputBar}>
                        <TouchableOpacity
                            onPress={() => this.showToast('📎 Pièce jointe sélectionnée')}
                            style={supportchatstyle.attachBtn}
                            activeOpacity={0.7}
                        >
                            <Icon name="paperclip" size={20} color={COLORS.textMuted} />
                        </TouchableOpacity>

                        <TextInput
                            style={[styles.text, supportchatstyle.input]}
                            placeholder="Écrivez un message..."
                            placeholderTextColor={COLORS.textMuted}
                            value={messageText}
                            onChangeText={(text) => this.setState({ messageText: text })}
                            multiline
                            maxLength={500}
                        />

                        <TouchableOpacity
                            onPress={this.handleSendMessage}
                            style={[
                                supportchatstyle.sendBtn,
                                !messageText.trim() && supportchatstyle.sendBtnDisabled,
                            ]}
                            disabled={!messageText.trim()}
                            activeOpacity={0.85}
                        >
                            <Icon name="send" size={18} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {toast !== '' && (
                    <View style={supportchatstyle.toast}>
                        <Text style={[styles.text, supportchatstyle.toastText]}>{toast}</Text>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchSupportHomeAction,
            switchFooterVisibilityAction
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    root_navigation: state.navigation.root_navigation,
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportChat);