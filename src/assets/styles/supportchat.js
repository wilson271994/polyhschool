import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const C = {
    bg: "#0a0e14",
    surface: "#111722",
    surfaceAlt: "#181f2d",
    bubble_out: "#eee",
    bubble_in: "#1e3a5e",
    accent: "#25d366",
    accent1: "#ECB818",
    accent2: '#1B497D',
    Accent: "#1e3a5e",
    accentDim: "#1a9e4a",
    accentGlow: "rgba(37,211,102,0.18)",
    text1: "#000",
    text: "#FFF",
    textMuted: "#7a8ba0",
    textTime: "#5a6b7d",
    border: "rgba(255,255,255,0.06)",
    headerBg: "#0d1520",
    header: '#1B497D',
    footer: '#0d1d30',
    inputBg: "#151d2b",
    red: "#e05c5c",
    blue: "#4a9eff",
    shadow: "0 8px 32px rgba(0,0,0,0.55)",
};

export const supportchatstyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        paddingBottom: 20,
        marginTop: 15,
    },
    messageContainer: {
        marginBottom: 16,
        maxWidth: '100%',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
    },
    supportMessageContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    bubble: {
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginLeft: 10,
        width: '80%',
    },
    bubbleLeft: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        alignSelf: 'flex-start',
    },
    bubbleRight: {
        backgroundColor: '#DCF8C6',
        borderBottomRightRadius: 4,
    },
    bubbleText: {
        fontSize: 14,
        lineHeight: 20,
    },
    userBubbleText: {
        color: '#333',
    },
    supportBubbleText: {
        color: '#333',
        fontSize: 12,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quickRepliesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    quickReplyButton: {
        backgroundColor: '#E8F5E9',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    quickReplyText: {
        color: '#4CAF50',
        fontSize: 12,
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 16,
    },
    typingDots: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        padding: 8,
        borderRadius: 16,
        marginRight: 8,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#999',
        marginHorizontal: 2,
    },
    typingText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBEE',
        padding: 12,
        margin: 16,
        borderRadius: 8,
        gap: 8,
    },
    errorText: {
        flex: 1,
        color: '#F44336',
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        gap: 8,
        bottom: 50
    },
    textInput: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100,
        fontSize: 14,
        color: '#333',
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#666',
    },
    sendButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: '#E8F5E9',
    },
    sendButtonDisabled: {
        backgroundColor: '#F5F5F5',
    },


    //Input container

    inputBar: {
        backgroundColor: C.footer,
        borderTopWidth: 1,
        borderTopColor: C.border,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
    },
    inputIcons: {
        flexDirection: "row",
        gap: 2,
        paddingBottom: 4,
    },
    iconButton: {
        padding: 6,
    },
    textInputWrapper: {
        backgroundColor: "#1e3a5e",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#1e3a5e",
        paddingHorizontal: 14,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 6,
        width: '85%',
        right: 25,
        bottom: 2
    },
    textInputActive: {
        borderColor: "#ECB818",
    },
    textInput: {
        flex: 1,
        color: "#FFF",
        fontSize: 15,
        paddingVertical: 6,
        maxHeight: 120,
    },
    attachButton: {
        padding: 4,
        paddingBottom: 6,
    },
    micButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        right: 25,
        bottom: 2
    },

    // Styles compacts pour l'en-tête
    headerCompact: {
        paddingHorizontal: 15,
        paddingBottom: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: '12%'
    },
    infoCompactContainer: {
        top: 10,
        right: 15,
    },
    infoCompactText: {
        fontSize: 15,
        color: '#000',
        lineHeight: 16,
    },
    infoCompacttext: {
        fontSize: 13,
        color: '#000',
        lineHeight: 16,
    },
    back: {
        right: 15,
        bottom: 15
    },
    statusIndicatorCompact: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    onlineDotCompact: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    statusTextCompact: {
        fontSize: 10,
        color: '#000',
    },
});