import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const choosestyle = StyleSheet.create({
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
    centerGlow: {
        position: 'absolute',
        top: '40%',
        left: -100,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(54, 209, 220, 0.10)',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -100,
        right: -80,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(255, 179, 0, 0.08)',
    },

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    /* Header - Bouton Retour */
    headerRow: {
        marginBottom: 10,
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
    },

    /* Branding Header */
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 75,
        height: 75,
        marginBottom: 8,
    },
    brandBadge: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.accentGold,
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        paddingHorizontal: 15,
    },

    /* Liste des Cartes */
    cardsContainer: {
        gap: 14,
        marginBottom: 20,
    },
    roleCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    roleCardSelected: {
        borderColor: COLORS.accentGold,
        backgroundColor: 'rgba(255, 179, 0, 0.08)',
    },
    roleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.25)',
    },
    iconContainerSelected: {
        backgroundColor: COLORS.accentGold,
        borderColor: COLORS.accentGold,
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: COLORS.borderLight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
    },
    radioButtonSelected: {
        borderColor: COLORS.accentGold,
        backgroundColor: COLORS.accentGold,
    },
    roleTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    roleTitleSelected: {
        color: COLORS.accentGold,
    },
    roleDescription: {
        fontSize: 12,
        color: COLORS.textMuted,
        lineHeight: 17,
    },

    /* Master CTA Button */
    button: {
        backgroundColor: COLORS.accentGold,
        borderRadius: 14,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },

    /* Liens Bas de Page */
    loginLinkText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    loginLinkBold: {
        fontSize: 12,
        color: COLORS.accentGold,
    },
});