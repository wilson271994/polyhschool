import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const sigupstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },

    /* Lueurs / Orbes d'ambiance Poly-H */
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

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

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

    /* Branding */
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
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
        fontSize: 15,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    slogan: {
        fontSize: 11,
        color: COLORS.accentCyan,
        textAlign: 'center',
    },

    /* Carte Translucide du Formulaire */
    inputContainer: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginBottom: 20,
    },

    label: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginBottom: 6,
        marginTop: 6,
    },

    rowFields: {
        flexDirection: 'row',
        gap: 12,
    },
    colField: {
        flex: 1,
    },

    /* Champs de texte */
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 10,
    },
    inputWrapperFocused: {
        borderColor: COLORS.accentGold,
        backgroundColor: 'rgba(255, 179, 0, 0.05)',
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: COLORS.textPrimary,
    },

    /* Erreur Date */
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 63, 94, 0.15)',
        borderRadius: 10,
        padding: 8,
        gap: 6,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 11,
        color: '#F43F5E',
    },

    /* Dropdowns */
    dropdown: {
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    dropdownFocused: {
        borderColor: COLORS.accentGold,
    },
    dropdownContainer: {
        backgroundColor: COLORS.bgSecondary,
        borderRadius: 14,
        borderColor: COLORS.borderLight,
    },
    placeholderStyle: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    selectedTextStyle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color: COLORS.textPrimary,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10,
    },
    itemTextStyle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },

    /* CTA Button */
    button: {
        backgroundColor: COLORS.accentGold,
        borderRadius: 14,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },

    
    // Terms Checkbox
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 14,
        marginBottom: 6,
    },
    checkbtn: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#f6a100',
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 2,
    },
    checkbtnSelected: {
        backgroundColor: '#f6a100',
    },
    conditiontext: {
        color: '#CBD5E1',
        fontSize: 11.5,
        flex: 1,
        lineHeight: 17,
    },
    conditionlink: {
        color: '#f6a100',
        textDecorationLine: 'underline',
    },
});