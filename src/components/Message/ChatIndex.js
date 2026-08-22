import React, { PureComponent } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, ScrollView, Modal, TextInput, Image, Pressable, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { chatstyle, C } from '../../assets/styles/chat';
import { styles } from '../../assets/styles';
import { homestyle } from '../../assets/styles/home';
import { switchChatMediaPageAction, switchContactNotificationPageAction, switchContactProfilePageAction, switchMessagePageAction, switchArchivedMessagePageAction, } from '../../navigations/rootNavigation';
import { SwipeablePanel } from 'rn-swipeable-panel';

const INITIAL_MESSAGES = [
    { id: 1, text: "C'est en HD wem!", type: "out", time: "13:09", status: "read", kind: "text" },
    { id: 2, type: "in", time: "13:09", kind: "forwarded_audio", duration: "0:14" },
    { id: 3, type: "in", time: "13:10", kind: "forwarded_text", text: "ltchindjo@gmail.com" },
    { id: 4, type: "in", time: "13:10", kind: "audio", duration: "0:10" },
    { id: 5, text: "J'envoie lequel? 😭😭", type: "out", time: "13:10", status: "read", kind: "text" },
    { id: 6, type: "in", time: "13:11", kind: "audio", duration: "0:08" },
    { id: 7, text: "OK", type: "out", time: "13:13", status: "sent", kind: "text" },
];

const EMOJIS = ["😀", "😂", "😍", "🥰", "😭", "😅", "🤔", "😎", "🙏", "❤️", "🔥", "👍", "👏", "🎉", "😢", "😡", "🤣", "😘", "💯", "✅"];
const CTX_ACTIONS = ["Répondre", "Transférer", "Copier", "Supprimer", "Épingler", "Signaler"];

const ImagePickerModal = ({ visible, onAction, onClose }) => {
    if (!visible) return null;
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={homestyle.pickerOverlay}>
                <TouchableOpacity
                    style={homestyle.pickerBackdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <View style={homestyle.pickerSheet}>
                    <View style={homestyle.pickerHandle} />
                    <View style={homestyle.pickerHeader}>
                        <View style={[homestyle.pickerIconCircle, { backgroundColor: '#F0FDF4' }]}>
                            <Icon name="image-filter-hdr" size={22} color="#10B981" />
                        </View>
                        <Text style={homestyle.pickerTitle}>Fond d'écran</Text>
                        <Text style={homestyle.pickerSubtitle}>
                            Sélectionnez une image depuis votre galerie
                        </Text>
                    </View>

                    <View style={homestyle.pickerOptionsContainer}>
                        <TouchableOpacity
                            style={homestyle.pickerOption}
                            onPress={() => onAction('gallery')}
                            activeOpacity={0.7}
                        >
                            <View style={[homestyle.pickerOptionIcon, { backgroundColor: '#F0FDF4' }]}>
                                <Icon name="image-multiple-outline" size={20} color="#10B981" />
                            </View>
                            <View style={homestyle.pickerOptionText}>
                                <Text style={homestyle.pickerOptionTitle}>Galerie</Text>
                                <Text style={homestyle.pickerOptionDesc}>Choisir une photo</Text>
                            </View>
                            <Icon name="chevron-right" size={16} color="#CBD5E1" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={homestyle.pickerCancelButton}
                        onPress={onClose}
                        activeOpacity={0.7}
                    >
                        <Text style={homestyle.pickerCancelText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

class ChatIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            messages: INITIAL_MESSAGES,
            input: "",
            showEmoji: false,
            typing: false,
            ctx: null,
            recording: false,
            recordSecs: 0,
            toast: "",
            playingAudioId: null,
            waveformAnimations: {},
            isVisibleMenu: false,
            keyboardVisible: false,
            wallpaperImage: null,
            wallpaperPickerVisible: false,

            // 🔍 Recherche
            searchMode: false,
            searchQuery: "",
            searchResults: [],
            currentResultIndex: 0,
            messagePositions: {},
        };
        this.scrollViewRef = null;
        this.inputRef = null;
        this.recordTimer = null;
        this.waveformAnims = {};
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            this._handleKeyboardShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            this._handleKeyboardHide
        );
    }

    componentWillUnmount() {
        if (this.recordTimer) {
            clearInterval(this.recordTimer);
            this.recordTimer = null;
        }
        Object.values(this.waveformAnims).forEach(anim => {
            if (anim) anim.stopAnimation?.();
        });
        if (this.keyboardDidShowListener) {
            this.keyboardDidShowListener.remove();
        }
        if (this.keyboardDidHideListener) {
            this.keyboardDidHideListener.remove();
        }
    }

    _handleKeyboardShow = () => {
        this.setState({
            keyboardVisible: true,
            showEmoji: false,
            isVisibleMenu: false,
        });
        this.scrollToBottom();
    };

    _handleKeyboardHide = () => {
        this.setState({ keyboardVisible: false });
    };

    componentDidUpdate(prevProps, prevState) {
        const messagesChanged = prevState.messages.length !== this.state.messages.length;
        const typingChanged = prevState.typing !== this.state.typing;

        if (messagesChanged || typingChanged) {
            this.scrollToBottom();
        }
    }

    // ✅ Redirection conditionnelle : si la conversation est archivée, on va vers la page archivée, sinon vers la page messages normale
    _navigateToMessage = () => {
        const { is_archived_message_page } = this.props;
        if (is_archived_message_page) {
            switchArchivedMessagePageAction(true);
        } else {
            switchMessagePageAction(true);
        }
    };

    _navigateToContactProfile = () => {
        switchContactProfilePageAction(true);
    };

    _navigateToContactNotification = () => {
        switchContactNotificationPageAction(true);
    };

    _navigateToContactMedia = () => {
        switchChatMediaPageAction(true);
    };

    scrollToBottom = () => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (this.scrollViewRef && this.scrollViewRef.scrollToEnd) {
                    this.scrollViewRef.scrollToEnd({ animated: true });
                }
            }, 100);
        });
    };

    showToast = (msg) => {
        this.setState({ toast: msg });
        setTimeout(() => this.setState({ toast: "" }), 2000);
    };

    toggleEmojiPicker = () => {
        const { showEmoji, keyboardVisible } = this.state;
        if (keyboardVisible) {
            Keyboard.dismiss();
            setTimeout(() => {
                this.setState({ showEmoji: true, isVisibleMenu: false });
            }, 100);
        } else {
            if (!showEmoji) {
                this.inputRef?.blur();
                this.setState({ isVisibleMenu: false });
            }
            this.setState(prev => ({ showEmoji: !prev.showEmoji }));
        }
    };

    openKeyboard = () => {
        this.setState({ showEmoji: false, isVisibleMenu: false }, () => {
            this.inputRef?.focus();
        });
    };

    sendMessage = () => {
        const { input } = this.state;
        if (!input.trim()) return;
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
        const newMsg = {
            id: Date.now(),
            text: input.trim(),
            type: "out",
            time,
            status: "sent",
            kind: "text",
        };
        this.setState(prev => ({
            messages: [...prev.messages, newMsg],
            input: "",
            showEmoji: false,
        }));
        this.setState({ typing: true });
        setTimeout(() => {
            this.setState({ typing: false });
            const reply = {
                id: Date.now() + 1,
                text: "👍 Reçu!",
                type: "in",
                time,
                kind: "text",
            };
            this.setState(prev => ({ messages: [...prev.messages, reply] }));
        }, 1800);
    };

    stopRecording = () => {
        const { recordSecs } = this.state;
        this.setState({ recording: false });
        if (this.recordTimer) {
            clearInterval(this.recordTimer);
            this.recordTimer = null;
        }
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
        const mins = Math.floor(recordSecs / 60);
        const secs = recordSecs % 60;
        const duration = `${mins}:${String(secs).padStart(2, "0")}`;
        this.setState(prev => ({
            messages: [...prev.messages, {
                id: Date.now(),
                type: "out",
                time,
                kind: "audio",
                duration,
                status: "sent",
            }],
        }));
        this.showToast("Message vocal envoyé ✓");
    };

    startRecording = () => {
        this.setState({ recording: true, recordSecs: 0 });
        if (this.recordTimer) clearInterval(this.recordTimer);
        this.recordTimer = setInterval(() => {
            this.setState(prev => ({ recordSecs: prev.recordSecs + 1 }));
        }, 1000);
    };

    getRecordTime = () => {
        const { recordSecs } = this.state;
        return `${Math.floor(recordSecs / 60)}:${String(recordSecs % 60).padStart(2, "0")}`;
    };

    toggleAudioPlayback = (audioId) => {
        const { playingAudioId } = this.state;
        if (playingAudioId === audioId) {
            this.setState({ playingAudioId: null });
            this.stopWaveformAnimation(audioId);
        } else {
            if (playingAudioId) {
                this.stopWaveformAnimation(playingAudioId);
            }
            this.setState({ playingAudioId: audioId });
            this.startWaveformAnimation(audioId);
        }
    };

    startWaveformAnimation = (audioId) => {
        if (!this.waveformAnims[audioId]) {
            this.waveformAnims[audioId] = new Animated.Value(1);
        }
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.waveformAnims[audioId], {
                    toValue: 1.5,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(this.waveformAnims[audioId], {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    };

    stopWaveformAnimation = (audioId) => {
        if (this.waveformAnims[audioId]) {
            this.waveformAnims[audioId].stopAnimation();
            this.waveformAnims[audioId].setValue(1);
        }
    };

    renderWaveform = (playing, color, audioId) => {
        const bars = [3, 5, 8, 6, 9, 7, 4, 8, 6, 5, 9, 7, 3, 6, 8, 5, 7, 4, 9, 6, 8, 5, 7, 6, 4, 8, 5, 7, 6, 9];
        const animValue = this.waveformAnims[audioId] || new Animated.Value(1);
        return (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2, height: 28 }}>
                {bars.map((h, i) => (
                    <Animated.View
                        key={i}
                        style={{
                            width: 3,
                            height: playing
                                ? animValue.interpolate({
                                    inputRange: [1, 1.5],
                                    outputRange: [h * 2.4, h * 3.6],
                                })
                                : h * 2.4,
                            borderRadius: 2,
                            backgroundColor: playing ? C.accent : color || "#4a6070",
                            opacity: playing ? 1 : 0.6,
                        }}
                    />
                ))}
            </View>
        );
    };

    renderAudioMessage = (msg, isOut, forwarded) => {
        const { playingAudioId } = this.state;
        const isPlaying = playingAudioId === msg.id;
        const bg = isOut ? C.bubble_out : C.bubble_in;
        const avatarBg = isOut ? C.accentDim : "#2a3a5e";
        return (
            <View style={[chatstyle.audioContainer, { backgroundColor: bg, alignSelf: isOut ? "flex-end" : "flex-start" }]}>
                {forwarded && (
                    <View style={chatstyle.forwardedContainer}>
                        <Icon name="forward" size={12} color={C.accent} />
                        <Text style={[chatstyle.forwardedText, styles.text]}>Transféré</Text>
                    </View>
                )}
                <View style={chatstyle.audioContent}>
                    <TouchableOpacity
                        onPress={() => this.toggleAudioPlayback(msg.id)}
                        style={[chatstyle.playButton, { backgroundColor: isPlaying ? C.accent : avatarBg }]}
                    >
                        <Icon name={isPlaying ? "pause" : "play"} size={20} color={isPlaying ? "#fff" : C.text} />
                    </TouchableOpacity>
                    <View style={chatstyle.waveformContainer}>
                        {this.renderWaveform(isPlaying, isOut ? "#3a7a5a" : "#3a5070", msg.id)}
                        <Text style={[chatstyle.durationText, styles.text]}>{msg.duration}</Text>
                    </View>
                    <View style={[chatstyle.audioAvatar, { backgroundColor: avatarBg }]}>
                        <Icon name="microphone" size={14} color={isOut ? C.accent : C.blue} />
                    </View>
                </View>
                {!isOut && (
                    <TouchableOpacity>
                        <Text style={[chatstyle.transcribeText, styles.text]}>Transcrire</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    _escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    _highlightText = (text, query) => {
        if (!query || !text) {
            return <Text>{text}</Text>;
        }

        const escapedQuery = this._escapeRegExp(query);
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (part.toLowerCase() === query.toLowerCase()) {
                return (
                    <Text key={index} style={{ color: '#1B497D', fontWeight: 'bold' }}>
                        {part}
                    </Text>
                );
            }
            return <Text key={index}>{part}</Text>;
        });
    };

    renderTextMessage = (msg, isOut) => (
        <View style={[chatstyle.textContainer, {
            backgroundColor: isOut ? C.bubble_out : C.bubble_in,
            alignSelf: isOut ? "flex-end" : "flex-start",
            borderTopLeftRadius: isOut ? 18 : 4,
            borderTopRightRadius: isOut ? 4 : 18,
        }]}>
            <Text style={[chatstyle.messageText, styles.text]}>
                {this.state.searchMode && this.state.searchQuery.trim() !== ''
                    ? this._highlightText(msg.text, this.state.searchQuery)
                    : msg.text}
            </Text>
            <View style={chatstyle.timeContainer}>
                <Text style={chatstyle.timeText}>{msg.time}</Text>
                {isOut && (
                    <View style={chatstyle.statusContainer}>
                        {msg.status === "read" ? (
                            <Icon name="check-all" size={14} color={C.blue} />
                        ) : (
                            <Icon name="check" size={14} color={C.textTime} />
                        )}
                    </View>
                )}
            </View>
        </View>
    );

    renderForwardedTextMessage = (msg) => (
        <View style={chatstyle.forwardedTextContainer}>
            <View style={chatstyle.forwardedHeader}>
                <Icon name="forward" size={12} color={C.accent} />
                <Text style={[chatstyle.forwardedText, styles.text]}>Transféré</Text>
            </View>
            <Text style={[chatstyle.forwardedEmailText, styles.text]}>{msg.text}</Text>
            <Text style={[chatstyle.messageTime, styles.text]}>{msg.time}</Text>
        </View>
    );

    _handleMessageLayout = (messageId, event) => {
        const { y } = event.nativeEvent.layout;
        this.setState(prevState => ({
            messagePositions: {
                ...prevState.messagePositions,
                [messageId]: y,
            },
        }));
    };

    renderMessage = (msg) => {
        const isOut = msg.type === "out";
        const align = isOut ? "flex-end" : "flex-start";

        if (msg.kind === "audio" || msg.kind === "forwarded_audio") {
            return (
                <View
                    style={[chatstyle.messageWrapper, { alignItems: align }]}
                    onLayout={(e) => this._handleMessageLayout(msg.id, e)}
                >
                    <View style={chatstyle.messageContent}>
                        {this.renderAudioMessage(msg, isOut, msg.kind === "forwarded_audio")}
                        <Text style={[chatstyle.messageTimestamp, styles.text, { paddingRight: isOut ? 4 : 0 }]}>
                            {msg.time} {isOut && (msg.status === "read" ? "✓✓" : "✓")}
                        </Text>
                    </View>
                </View>
            );
        }

        if (msg.kind === "forwarded_text") {
            return (
                <View
                    style={[chatstyle.messageWrapper, { alignItems: align }]}
                    onLayout={(e) => this._handleMessageLayout(msg.id, e)}
                >
                    <View style={chatstyle.messageContent}>
                        {this.renderForwardedTextMessage(msg)}
                    </View>
                </View>
            );
        }

        return (
            <View
                style={[chatstyle.messageWrapper, { alignItems: align }]}
                onLayout={(e) => this._handleMessageLayout(msg.id, e)}
            >
                <View style={chatstyle.messageContent}>
                    {this.renderTextMessage(msg, isOut)}
                </View>
            </View>
        );
    };

    renderDateDivider = (label) => (
        <View style={chatstyle.dateDividerContainer}>
            <View style={chatstyle.dateDivider}>
                <Text style={[chatstyle.dateDividerText, styles.text]}>{label}</Text>
            </View>
        </View>
    );

    renderTypingDots = () => {
        const dotAnimations = [
            new Animated.Value(0.6),
            new Animated.Value(0.6),
            new Animated.Value(0.6),
        ];
        dotAnimations.forEach((anim, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 400,
                        delay: index * 200,
                        useNativeDriver: false,
                    }),
                    Animated.timing(anim, {
                        toValue: 0.6,
                        duration: 400,
                        useNativeDriver: false,
                    }),
                    Animated.delay(400),
                ])
            ).start();
        });
        return (
            <View style={chatstyle.typingContainer}>
                <View style={chatstyle.typingBubble}>
                    {dotAnimations.map((anim, i) => (
                        <Animated.View
                            key={`dot-${i}`}
                            style={[chatstyle.typingDot, { transform: [{ scale: anim }] }]}
                        />
                    ))}
                </View>
            </View>
        );
    };

    renderEmojiPicker = () => {
        const { showEmoji } = this.state;
        if (!showEmoji) return null;
        return (
            <View style={chatstyle.emojiPickerWrapper}>
                <View style={chatstyle.emojiPickerHeader}>
                    <Text style={[chatstyle.emojiPickerTitle, styles.textBold]}>Émojis</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ showEmoji: false })}
                        style={chatstyle.emojiCloseButton}
                    >
                        <Icon name="close" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={chatstyle.emojiPickerScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={chatstyle.emojiPickerGrid}>
                        {EMOJIS.map((e, index) => (
                            <TouchableOpacity
                                key={`emoji-${index}`}
                                onPress={() => {
                                    this.setState(prev => ({ input: prev.input + e }));
                                }}
                                style={chatstyle.emojiButton}
                            >
                                <Text style={[chatstyle.emojiText, styles.text]}>{e}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    };

    renderContextMenu = () => {
        const { ctx } = this.state;
        if (!ctx) return null;
        const { width, height } = Dimensions.get("window");
        const left = Math.min(ctx.x, width - 160);
        const top = Math.min(ctx.y, height - 220);
        return (
            <Modal transparent visible={!!ctx} onRequestClose={() => this.setState({ ctx: null })}>
                <Pressable style={{ flex: 1 }} onPress={() => this.setState({ ctx: null })}>
                    <View style={[chatstyle.contextMenu, { left, top }]}>
                        {CTX_ACTIONS.map((a, i) => (
                            <TouchableOpacity
                                key={`action-${i}`}
                                onPress={() => {
                                    this.showToast(`${a} ✓`);
                                    this.setState({ ctx: null });
                                }}
                                style={[
                                    chatstyle.contextMenuItem,
                                    i < CTX_ACTIONS.length - 1 && chatstyle.contextMenuItemBorder,
                                ]}
                            >
                                <Text
                                    style={[
                                        chatstyle.contextMenuText,
                                        styles.text,
                                        a === "Supprimer" && { color: C.red },
                                    ]}
                                >
                                    {a}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        );
    };

    _openMenu = () => {
        Keyboard.dismiss();
        this.setState({
            isVisibleMenu: true,
            showEmoji: false,
        });
    };

    _closeMenu = () => {
        this.setState({ isVisibleMenu: false });
    };

    _openWallpaperPicker = () => {
        this.setState({ wallpaperPickerVisible: true });
    };

    _closeWallpaperPicker = () => {
        this.setState({ wallpaperPickerVisible: false });
    };

    _handleWallpaperAction = (sourceType) => {
        this.setState({ wallpaperPickerVisible: false }, () => {
            this._launchGallery();
        });
    };

    _handleWallpaperResult = (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
            this.showToast(`Erreur : ${response.errorMessage || 'Accès refusé'}`);
            return;
        }
        if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri;
            this.setState({ wallpaperImage: uri });
            this.showToast('Fond d\'écran mis à jour ✓');
        }
    };

    _launchGallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.85,
            maxWidth: 800,
            maxHeight: 300,
            includeBase64: false,
            selectionLimit: 1,
        };
        launchImageLibrary(options, (response) => {
            this._handleWallpaperResult(response);
        });
    };

    // =====================
    // 🔍 RECHERCHE
    // =====================

    _activateSearchMode = () => {
        this._closeMenu();
        this.setState({
            searchMode: true,
            searchQuery: "",
            searchResults: [],
            currentResultIndex: 0,
        });
    };

    _deactivateSearchMode = () => {
        this.setState({
            searchMode: false,
            searchQuery: "",
            searchResults: [],
            currentResultIndex: 0,
        });
    };

    _handleSearch = (text) => {
        const { messages } = this.state;
        const query = text.toLowerCase();

        if (!query.trim()) {
            this.setState({
                searchQuery: text,
                searchResults: [],
                currentResultIndex: 0,
            });
            return;
        }

        const results = messages
            .filter(msg => msg.kind === "text" && msg.text.toLowerCase().includes(query))
            .map(msg => ({ id: msg.id, text: msg.text }));

        this.setState({
            searchQuery: text,
            searchResults: results,
            currentResultIndex: results.length > 0 ? 0 : 0,
        });
    };

    _goToNextResult = () => {
        const { searchResults, currentResultIndex } = this.state;
        if (searchResults.length === 0) return;

        const nextIndex = (currentResultIndex + 1) % searchResults.length;
        this.setState({ currentResultIndex: nextIndex }, () => {
            this._scrollToMessage(searchResults[nextIndex].id);
        });
    };

    _goToPrevResult = () => {
        const { searchResults, currentResultIndex } = this.state;
        if (searchResults.length === 0) return;

        const prevIndex = currentResultIndex === 0
            ? searchResults.length - 1
            : currentResultIndex - 1;
        this.setState({ currentResultIndex: prevIndex }, () => {
            this._scrollToMessage(searchResults[prevIndex].id);
        });
    };

    _scrollToMessage = (messageId) => {
        const position = this.state.messagePositions[messageId];
        if (position != null && this.scrollViewRef) {
            const offsetY = Math.max(0, position - 150);
            this.scrollViewRef.scrollTo({ y: offsetY, animated: true });
        } else {
            this.showToast("Message introuvable dans la vue");
        }
    };

    render() {
        const {
            messages,
            input,
            typing,
            recording,
            toast,
            isVisibleMenu,
            showEmoji,
            wallpaperImage,
            wallpaperPickerVisible,
            searchMode,
            searchQuery,
            searchResults,
            currentResultIndex,
        } = this.state;
        const hasText = input.trim().length > 0;
        const recordTime = this.getRecordTime();

        return (
            <KeyboardAvoidingView
                style={chatstyle.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                {/* ===== HEADER CONDITIONNEL ===== */}
                {searchMode ? (
                    <View style={chatstyle.header}>
                        <TouchableOpacity onPress={this._deactivateSearchMode}>
                            <Icon name="arrow-left" size={24} color={C.text} />
                        </TouchableOpacity>

                        <View style={chatstyle.searchInputWrapper}>
                            <Icon name="magnify" size={20} color={C.textMuted} />
                            <TextInput
                                style={chatstyle.searchInput}
                                placeholder="Rechercher un message..."
                                placeholderTextColor={C.textMuted}
                                value={searchQuery}
                                onChangeText={this._handleSearch}
                                autoFocus
                            />
                            {searchQuery !== "" && (
                                <TouchableOpacity onPress={() => this._handleSearch("")}>
                                    <Icon name="close-circle" size={18} color={C.textMuted} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {searchResults.length > 0 && (
                            <View style={chatstyle.searchNavButtons}>
                                <TouchableOpacity onPress={this._goToPrevResult} style={chatstyle.searchNavBtn}>
                                    <Icon name="chevron-up" size={22} color={C.text} />
                                </TouchableOpacity>
                                <Text style={[chatstyle.searchCounter, styles.text]}>
                                    {currentResultIndex + 1}/{searchResults.length}
                                </Text>
                                <TouchableOpacity onPress={this._goToNextResult} style={chatstyle.searchNavBtn}>
                                    <Icon name="chevron-down" size={22} color={C.text} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={chatstyle.header}>
                        {/* ✅ Flèche de retour utilisant la redirection conditionnelle */}
                        <TouchableOpacity onPress={this._navigateToMessage}>
                            <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                        </TouchableOpacity>

                        <View style={chatstyle.avatarContainer}>
                            <View style={chatstyle.avatar}>
                                <Image style={chatstyle.avatar} source={require('../../assets/images/profil.png')} />
                            </View>
                            <View style={chatstyle.onlineDot} />
                        </View>

                        <View style={chatstyle.headerInfo}>
                            <Text style={[chatstyle.headerName, styles.textBold]}>Ingénieur 👷</Text>
                            <Text style={[chatstyle.headerStatus, styles.textBold]}>en ligne</Text>
                        </View>

                        <TouchableOpacity style={chatstyle.headerButton}>
                            <Icon name="video" size={24} color={C.text} />
                        </TouchableOpacity>

                        <TouchableOpacity style={chatstyle.headerButton}>
                            <Icon name="phone" size={22} color={C.text} />
                        </TouchableOpacity>

                        <TouchableOpacity style={chatstyle.headerButton} onPress={this._openMenu}>
                            <Icon name="dots-vertical" size={24} color={C.text} />
                        </TouchableOpacity>
                    </View>
                )}

                <ImageBackground
                    source={wallpaperImage ? { uri: wallpaperImage } : require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <ScrollView
                        ref={ref => (this.scrollViewRef = ref)}
                        style={chatstyle.messagesArea}
                        contentContainerStyle={chatstyle.messagesContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {this.renderDateDivider("Aujourd'hui")}
                        {messages.map(msg => (
                            <View key={msg.id.toString()}>{this.renderMessage(msg)}</View>
                        ))}
                        {typing && this.renderTypingDots()}
                    </ScrollView>
                </ImageBackground>

                {toast !== "" && (
                    <View style={chatstyle.toast}>
                        <Text style={chatstyle.toastText}>{toast}</Text>
                    </View>
                )}

                {this.renderEmojiPicker()}

                <View style={chatstyle.inputBar}>
                    {recording ? (
                        <View style={chatstyle.recordingContainer}>
                            <View style={chatstyle.recordingInfo}>
                                <View style={chatstyle.recordingDot} />
                                <Text style={[chatstyle.recordingTime, styles.textBold]}>{recordTime}</Text>
                            </View>
                            {this.renderWaveform(true, C.accent, "recording")}
                            <View style={chatstyle.flex} />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.recordTimer) clearInterval(this.recordTimer);
                                    this.recordTimer = null;
                                    this.setState({ recording: false });
                                }}
                                style={chatstyle.cancelButton}
                            >
                                <Text style={chatstyle.cancelButtonText}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.stopRecording} style={chatstyle.sendButton}>
                                <Text style={chatstyle.sendButtonText}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={chatstyle.inputContainer}>
                            <View style={chatstyle.inputIcons}>
                                <TouchableOpacity onPress={this.toggleEmojiPicker} style={chatstyle.iconButton}>
                                    <Icon
                                        name="emoticon-happy"
                                        size={24}
                                        color={showEmoji ? C.accent : C.textMuted}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={[chatstyle.textInputWrapper, hasText && chatstyle.textInputActive]}>
                                <TextInput
                                    ref={ref => (this.inputRef = ref)}
                                    value={input}
                                    onChangeText={(text) => this.setState({ input: text })}
                                    onFocus={() => this.setState({ showEmoji: false, isVisibleMenu: false })}
                                    placeholder="Message…"
                                    placeholderTextColor={C.textMuted}
                                    multiline
                                    style={chatstyle.textInput}
                                />
                                <TouchableOpacity
                                    onPress={() => this.showToast("📎 Pièce jointe")}
                                    style={chatstyle.attachButton}
                                >
                                    <Icon name="paperclip" size={22} color={C.textMuted} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.showToast("📷 Caméra")}
                                    style={chatstyle.cameraButton}
                                >
                                    <Icon name="camera" size={22} color={C.textMuted} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={hasText ? this.sendMessage : this.startRecording}
                                style={[chatstyle.micButton, { backgroundColor: hasText ? C.accent2 : "#1e3a5e" }]}
                            >
                                <Icon name={hasText ? "send" : "microphone"} size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={{ height: 45 }} />
                </View>

                {this.renderContextMenu()}

                <SwipeablePanel
                    fullWidth={true}
                    openLarge={true}
                    closeOnTouchOutside={true}
                    showCloseButton={true}
                    isActive={isVisibleMenu}
                    onClose={this._closeMenu}
                    onPressCloseButton={this._closeMenu}
                    style={chatstyle.containermenu}
                    barContainerStyle={chatstyle.swipablepanelbarstyle}
                    closeRootStyle={chatstyle.swipablepanelcloseicon}
                >
                    <ScrollView style={chatstyle.menuitemscroll}>
                        <TouchableOpacity
                            onPress={this._navigateToContactProfile}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="account-outline" size={20} color="#1B497D" />
                            <Text style={[chatstyle.menulisttext, styles.text]}>Voir le profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._navigateToContactMedia}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="paperclip" size={20} color="#1B497D" />
                            <Text style={[chatstyle.menulisttext, styles.text]}>Médias, liens et docs</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._activateSearchMode}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="magnify" size={20} color="#1B497D" />
                            <Text style={[chatstyle.menulisttext, styles.text]}>Rechercher</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._navigateToContactNotification}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="bell-off-outline" size={20} color="#1B497D" />
                            <Text style={[chatstyle.menulisttext, styles.text]}>Désactiver les notifications</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this._closeMenu();
                                this._openWallpaperPicker();
                            }}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="wallpaper" size={20} color="#1B497D" />
                            <Text style={[chatstyle.menulisttext, styles.text]}>Fond d'écran</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this._closeMenu();
                                this.showToast("Signaler");
                            }}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="flag-outline" size={20} color="#FF4444" />
                            <Text style={[chatstyle.menulisttext, styles.text, { color: "#FF4444" }]}>Signaler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this._closeMenu();
                                this.showToast("Bloquer");
                            }}
                            style={chatstyle.headermenuitem}
                        >
                            <Icon name="block-helper" size={20} color="#FF4444" />
                            <Text style={[chatstyle.menulisttext, styles.text, { color: "#FF4444" }]}>Bloquer</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SwipeablePanel>

                <ImagePickerModal
                    visible={wallpaperPickerVisible}
                    onAction={this._handleWallpaperAction}
                    onClose={this._closeWallpaperPicker}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchMessagePageAction,
        switchArchivedMessagePageAction,
        switchContactProfilePageAction,
        switchContactNotificationPageAction,
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    is_archived_message_page: state.navigation.is_archived_message_page,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatIndex);