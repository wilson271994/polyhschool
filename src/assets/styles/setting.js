import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const settingstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },

    /* Glows / Orbes d'ambiance Poly-H */
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

    /* Header Navigation */
    headerContainer: {
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
        fontWeight: 'bold',
        color: COLORS.accentGold,
        letterSpacing: 1.2,
    },
    headerTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },

    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 110,
    },

    /* Carte Profil Utilisateur (Hero Card) */
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginBottom: 20,
    },
    avatarContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 11,
        color: COLORS.textMuted,
    },

    /* Titles & Card Blocks */
    sectionTitle: {
        fontSize: 11,
        color: COLORS.accentGold,
        letterSpacing: 1.2,
        marginBottom: 8,
        marginTop: 8,
        marginLeft: 4,
    },
    bloccontainer: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginBottom: 16,
        overflow: 'hidden',
    },

    /* Item List Paramètres */
    paramitem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.04)',
    },
    containericonimg: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    labelmenucont: {
        flex: 1,
    },
    itemlisttext: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    itemlisthelptext: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1,
    },
    logoutText: {
        fontSize: 13,
        color: '#F43F5E',
    },

    /* Style Alerte Personnalisée */
    alertContainer: {
        backgroundColor: COLORS.bgSecondary,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        padding: 16,
    },
    alertTitle: {
        fontSize: 15,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    alertMessage: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginTop: 6,
    },
    alertCancelBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    alertConfirmBtn: {
        backgroundColor: '#F43F5E',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    alertCancelText: {
        color: COLORS.textPrimary,
        fontSize: 12,
    },
    alertConfirmText: {
        color: COLORS.textPrimary,
        fontSize: 12,
    },
});