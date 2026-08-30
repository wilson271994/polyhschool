import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const supportstyle = StyleSheet.create({
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

    /* Conteneur défilant */
    conversationsList: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 120, // Espace de sécurité pour ne pas être bloqué par le menu bas
        gap: 10,
    },

    /* Cartes de tickets / conversations */
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    avatarBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.2)',
    },
    conversationDetails: {
        flex: 1,
        marginRight: 8,
    },
    senderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    conversationSender: {
        fontSize: 11,
        color: COLORS.accentGold,
    },
    conversationTime: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    ticketTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    conversationDesc: {
        fontSize: 11,
        color: COLORS.textMuted,
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.accentGold,
    },

    /* FAB (Floating Action Button) */
    fab: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: COLORS.accentGold,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    /* Modale opaque & lisible */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#001529',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '85%',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    modalLabel: {
        fontSize: 12,
        color: COLORS.accentGold,
        marginTop: 12,
        marginBottom: 6,
    },
    modalInput: {
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    modalTextArea: {
        height: 90,
        textAlignVertical: 'top',
        paddingVertical: 10,
    },

    /* Esthétique du Dropdown */
    dropdown: {
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    placeholderStyle: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    selectedTextStyle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    dropdownContainer: {
        backgroundColor: '#001529',
        borderRadius: 14,
        borderColor: COLORS.accentGold,
        borderWidth: 1,
        overflow: 'hidden',
    },
    itemContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    itemTextStyle: {
        color: COLORS.textPrimary,
        fontSize: 13,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    dropdownItemText: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },

    /* Boutons de la modale */
    modalButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    modalButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCancelButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    modalCancelText: {
        fontSize: 13,
        color: COLORS.textMuted,
    },
    modalValidateButton: {
        backgroundColor: COLORS.accentGold,
    },
    modalValidateText: {
        fontSize: 13,
        color: COLORS.textDark,
    },
});