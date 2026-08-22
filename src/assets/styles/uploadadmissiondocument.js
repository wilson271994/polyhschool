import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export { COLORS };

export const uploadstyle = StyleSheet.create({
    containerform: {
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

    /* Header Bar */
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
        fontWeight: 'bold',
        color: COLORS.accentGold,
        letterSpacing: 1.2,
    },
    headerTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },

    /* Layout & Safe Padding */
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 120, // Degage de l'espace pour le menu principal
    },
    formContainer: {
        gap: 14,
        marginTop: 8,
    },

    /* Glassmorphism Cards */
    documentCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    documentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    documentIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    documentInfo: {
        flex: 1,
    },
    documentTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    documentDescription: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
    },

    /* Form Elements */
    textInput: {
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 13,
        color: COLORS.textPrimary,
    },


    /* Styles Dropdown */
    dropdown: {
        height: 48,
        backgroundColor: '#001529', // Fond opaque solide pour le champ
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 14,
    },
    dropdownFocus: {
        borderColor: COLORS.accentGold,
    },
    dropdownPlaceholder: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    dropdownSelectedText: {
        fontSize: 13,
        color: '#FFFFFF', // Texte du choix sélectionné en blanc
        fontWeight: '600',
    },
    dropdownMenu: {
        backgroundColor: '#001529', // FOND OPAQUE DU MENU DÉROULANT (Supprime la transparence)
        borderRadius: 14,
        borderColor: COLORS.accentGold,
        borderWidth: 1,
        overflow: 'hidden',
        marginTop: 4,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    dropdownItemContainer: {
        backgroundColor: '#001529', // Opaque pour chaque ligne d'option
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    dropdownItemText: {
        fontSize: 13,
        color: '#FFFFFF', // TEXTE DES OPTIONS EN BLANC BRILLANT
        fontWeight: '500',
    },

    /* Area Upload Photo */
    uploadTriggerArea: {
        marginTop: 4,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderStyle: 'dashed',
    },
    uploadButtonIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 179, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    uploadButtonTextContainer: {
        flex: 1,
    },
    uploadButtonText: {
        fontSize: 12,
        color: COLORS.textPrimary,
    },
    uploadButtonSubtext: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginTop: 1,
    },

    /* Image Preview */
    previewWrapper: {
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.accentGold,
    },
    previewImage: {
        width: '100%',
        height: 160,
        justifyContent: 'flex-end',
    },
    previewOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 31, 63, 0.75)',
        paddingVertical: 8,
        gap: 6,
    },
    previewText: {
        fontSize: 12,
        color: COLORS.textPrimary,
    },

    /* Submit Button */
    submitButton: {
        height: 50,
        backgroundColor: COLORS.accentGold,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    submitBtnText: {
        fontSize: 14,
        color: COLORS.textDark,
    },

    /* Status Cards (Verified/Pending) */
    statusCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginTop: 20,
    },
    statusIconBg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusTitle: {
        fontSize: 18,
        color: COLORS.textPrimary,
        marginBottom: 8,
        textAlign: 'center',
    },
    statusMessage: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: COLORS.accentGold,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    actionButtonText: {
        color: COLORS.textDark,
        fontSize: 13,
    },
});