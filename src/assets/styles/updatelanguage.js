import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const languagestyle = StyleSheet.create({
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

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 120, // Sécurité de défilement pour le menu bas
        gap: 14,
        marginTop: 8,
    },

    /* Cards Design */
    sectionCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },

    selectionTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        padding: 12,
    },
    flagText: {
        fontSize: 24,
        marginRight: 12,
    },
    triggerTextWrapper: {
        flex: 1,
    },
    triggerTitle: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    triggerSubtitle: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1,
    },

    /* Preview Card */
    previewCard: {
        backgroundColor: 'rgba(255, 179, 0, 0.04)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.2)',
        gap: 10,
    },
    previewTitle: {
        fontSize: 13,
        color: COLORS.accentGold,
        marginBottom: 2,
    },
    previewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    previewText: {
        fontSize: 12,
        color: COLORS.textPrimary,
    },

    /* Save CTA */
    saveButton: {
        height: 48,
        backgroundColor: COLORS.accentGold,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    saveButtonText: {
        fontSize: 14,
        color: COLORS.textDark,
    },

    /* Modals */
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
        maxHeight: '80%',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    modalTitle: {
        fontSize: 15,
        color: COLORS.textPrimary,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: COLORS.textPrimary,
    },

    filterChips: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    chipActive: {
        backgroundColor: COLORS.accentCyan,
        borderColor: COLORS.accentCyan,
    },
    chipText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },
    chipTextActive: {
        color: COLORS.textDark,
        fontWeight: 'bold',
    },

    modalList: {
        marginBottom: 10,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    modalItemSelected: {
        backgroundColor: 'rgba(255, 179, 0, 0.1)',
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    modalFlag: {
        fontSize: 22,
        marginRight: 12,
    },
    modalItemInfo: {
        flex: 1,
    },
    modalItemName: {
        fontSize: 13,
        color: COLORS.textPrimary,
    },
    modalItemNative: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
    },
});