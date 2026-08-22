import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const coursestyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },

    /* Halo d'ambiance */
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

    /* Navigation Header */
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
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
        fontSize: 11,
        color: COLORS.accentGold,
        letterSpacing: 1.2,
    },
    headerTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    searchButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },

    /* Liste des cours */
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 120, // Sécurité pour ne pas être masqué par la barre bas
        gap: 10,
    },
    subjectHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 14,
        marginBottom: 8,
    },
    subjectTitle: {
        fontSize: 14,
        color: COLORS.accentGold,
    },

    courseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginBottom: 8,
    },
    courseIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.2)',
    },
    courseDetails: {
        flex: 1,
        marginRight: 8,
    },
    courseTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
        marginBottom: 3,
    },
    courseTeacher: {
        fontSize: 11,
        color: COLORS.textMuted,
    },

    /* Écran d'accueil / Bienvenue */
    welcomeContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeVideoContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.accentGold,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    welcomeVideo: {
        width: '100%',
        height: '100%',
    },
    welcomeTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeMessage: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 20,
    },
    welcomeIconRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 30,
    },
    iconBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscribeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.accentGold,
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 14,
        width: '100%',
    },
    subscribeButtonText: {
        fontSize: 13,
        color: COLORS.textDark,
    },

    /* Écran d'attente d'admission */
    waitingContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    waitingVideoContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.accentCyan,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    waitingVideo: {
        width: '100%',
        height: '100%',
    },
    waitingTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 8,
    },
    waitingMessage: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 18,
    },
});