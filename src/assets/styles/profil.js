import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const profilstyle = StyleSheet.create({
    /* ==========================================================================
       1. CONTENEURS ET GLOWS D'AMBIANCE
       ========================================================================== */
    containerform: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },
    container: {
        flex: 1,
    },
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

    /* ==========================================================================
       2. ENTÊTES ET BARRE DE NAVIGATION (HEADER)
       ========================================================================== */
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: COLORS.bgPrimary,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerbuttonContainer: {
        marginRight: 12,
    },
    headerButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
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
    headertext: {
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

    /* ==========================================================================
       3. DEFILEMENT ET FORMULAIRES GENERAUX
       ========================================================================== */
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 120, // Sécurité universelle pour le menu bas
    },
    formcontainer: {
        gap: 12,
        marginTop: 8,
    },
    formContainer: {
        gap: 12,
        marginTop: 8,
    },
    formitem: {
        marginBottom: 4,
    },
    cardItem: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    fieldHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    sublabel: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
        lineHeight: 15,
    },
    textInput: {
        height: 46,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    inputContainer: {
        height: 46,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    inputext: {
        color: COLORS.textPrimary,
    },

    /* ==========================================================================
       4. CHAMPS MOT DE PASSE (Update_password.js)
       ========================================================================== */
    passwordInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 46,
    },
    passwordTextInput: {
        flex: 1,
        fontSize: 13,
        color: COLORS.textPrimary,
        paddingVertical: 0,
    },
    eyeButton: {
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* ==========================================================================
       5. DROPDOWNS DYNAMIQUES ET UNIFIÉS (OPAQUES & LISIBLES)
       ========================================================================== */
    dropdown: {
        height: 46,
        backgroundColor: '#001529',
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
        color: '#FFFFFF',
        fontWeight: '600',
    },
    dropdownMenu: {
        backgroundColor: '#001529',
        borderRadius: 14,
        borderColor: COLORS.accentGold,
        borderWidth: 1,
        overflow: 'hidden',
        marginTop: 4,
        elevation: 8,
    },
    dropdownItemContainer: {
        backgroundColor: '#001529',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    dropdownItemText: {
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    containeritemdrop: {
        backgroundColor: '#001529',
        borderRadius: 14,
        borderColor: COLORS.accentGold,
        borderWidth: 1,
        overflow: 'hidden',
    },
    placeholderStyle: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    selectedTextStyle: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    itemTextStyle: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

    /* ==========================================================================
       6. ONGLETS ET NOTIFICATIONS (UpdateNotify.js)
       ========================================================================== */
    tabRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
        marginBottom: 16,
    },
    tabBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    tabBtnActive: {
        backgroundColor: COLORS.accentGold,
        borderColor: COLORS.accentGold,
    },
    tabText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },
    tabTextActive: {
        color: COLORS.textDark,
    },
    notifCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    notifInfo: {
        flex: 1,
        marginRight: 12,
    },
    notifTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    notifDesc: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 3,
        lineHeight: 16,
    },
    switchWrapper: {
        width: 48,
        alignItems: 'flex-end',
    },
    formcheckitem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginBottom: 10,
    },
    labelcheckitem: {
        flex: 1,
        marginRight: 12,
    },
    checkbtncont: {
        justifyContent: 'center',
    },
    checkbtn: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: COLORS.borderLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ischeckbtn: {
        backgroundColor: COLORS.accentGold,
        borderColor: COLORS.accentGold,
    },
    ischeckicon: {
        color: COLORS.textDark,
        fontSize: 12,
    },

    /* ==========================================================================
       7. SÉCURITÉ 2FA (UpdateAuthentification.js)
       ========================================================================== */
    infoBox2FA: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 179, 0, 0.05)',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.2)',
        gap: 12,
        marginTop: 8,
        marginBottom: 16,
    },
    infoBox2FAText: {
        flex: 1,
        fontSize: 11,
        color: COLORS.textMuted,
        lineHeight: 16,
    },
    authItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    authTextWrapper: {
        flex: 1,
        marginRight: 10,
    },
    authTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    authSubtitle: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
        lineHeight: 15,
    },

    /* ==========================================================================
       8. BOUTONS D'ACTION UNIFIÉS (CTA)
       ========================================================================== */
    submitButton: {
        height: 48,
        backgroundColor: COLORS.accentGold,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    submitBtnText: {
        fontSize: 14,
        color: COLORS.textDark,
    },

    /* ==========================================================================
       9. ETAT VIDE ET INFORMATIONS
       ========================================================================== */
    childInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(54, 209, 220, 0.08)',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(54, 209, 220, 0.2)',
        gap: 10,
        marginTop: 4,
    },
    childInfoText: {
        flex: 1,
        fontSize: 11,
        color: COLORS.textMuted,
        lineHeight: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyTitle: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginTop: 12,
    },
    emptyText: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 4,
        textAlign: 'center',
    },
});