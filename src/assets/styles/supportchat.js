import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const C = {
    accent: COLORS.accentGold,
    text: COLORS.textPrimary,
    textMuted: COLORS.textMuted,
};

export const supportchatstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },

    /* Glows */
    topGlow: {
        position: 'absolute',
        top: -100,
        right: -80,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -100,
        left: -80,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(54, 209, 220, 0.10)',
    },

    /* Navigation Header Bar */
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginRight: 12,
    },
    headerTitleWrapper: {
        flex: 1,
    },
    headerBadge: {
        fontSize: 10,
        color: COLORS.accentGold,
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 14,
        color: COLORS.textPrimary,
    },

    onlineStatusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
    },
    onlineText: {
        fontSize: 10,
        color: COLORS.textMuted,
    },

    /* Chat Scroll Area */
    chatScroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 12,
    },

    /* Message Rows & Bubbles */
    messageRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    userRow: {
        justifyContent: 'flex-end',
    },
    supportRow: {
        justifyContent: 'flex-start',
    },

    bubble: {
        maxWidth: '80%',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
    },
    userBubble: {
        backgroundColor: COLORS.accentGold,
        borderColor: COLORS.accentGold,
        borderBottomRightRadius: 2,
    },
    supportBubble: {
        backgroundColor: COLORS.cardBg,
        borderColor: COLORS.borderLight,
        borderBottomLeftRadius: 2,
    },

    bubbleText: {
        fontSize: 13,
        lineHeight: 18,
    },
    userBubbleText: {
        color: COLORS.textDark,
    },
    supportBubbleText: {
        color: COLORS.textPrimary,
    },

    messageMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
        marginTop: 4,
    },
    timestamp: {
        fontSize: 9,
        color: COLORS.textMuted,
    },
    statusBox: {
        justifyContent: 'center',
    },

    /* Typing Indicator */
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: COLORS.cardBg,
        alignSelf: 'flex-start',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    typingText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },

    /* Loading Container */
    loadingBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 10,
    },

    /* Input Bar */
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#001529',
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        gap: 8,
    },
    attachBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    input: {
        flex: 1,
        maxHeight: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 8,
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    sendBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.accentGold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBtnDisabled: {
        opacity: 0.4,
    },

    /* Toast Notification */
    toast: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        backgroundColor: '#001529',
        borderWidth: 1,
        borderColor: COLORS.accentGold,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 4,
    },
    toastText: {
        fontSize: 11,
        color: COLORS.textPrimary,
    },
});