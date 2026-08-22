import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const C = {
    accent: COLORS.accentGold,
    text: COLORS.textPrimary,
    textMuted: COLORS.textMuted,
};

export const faqstyle = StyleSheet.create({
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
        paddingBottom: 12,
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
        paddingBottom: 120, // Sécurité universelle pour ne pas masquer sous la barre du bas
        gap: 14,
    },

    /* Hero Section */
    heroSection: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginTop: 6,
    },
    heroBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    heroBadgeText: {
        fontSize: 11,
        color: COLORS.accentGold,
        letterSpacing: 1,
    },
    heroTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
        marginBottom: 12,
    },

    /* Search Box */
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 42,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: COLORS.textPrimary,
    },

    /* Categories Chips */
    categoriesRow: {
        flexDirection: 'row',
    },
    categoryChip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    categoryChipActive: {
        backgroundColor: COLORS.accentGold,
        borderColor: COLORS.accentGold,
    },
    chipText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },
    chipTextActive: {
        color: COLORS.textDark,
    },

    /* FAQ Accordion List */
    faqList: {
        gap: 10,
    },
    faqCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        overflow: 'hidden',
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },
    faqTitleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        marginRight: 8,
    },
    faqQuestion: {
        fontSize: 13,
        color: COLORS.textPrimary,
        flex: 1,
    },

    faqBody: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingTop: 10,
    },
    faqAnswer: {
        fontSize: 12,
        color: COLORS.textMuted,
        lineHeight: 18,
        marginBottom: 12,
    },

    faqFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 10,
        color: COLORS.textMuted,
    },

    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Contact Support Card */
    contactCard: {
        backgroundColor: 'rgba(255, 179, 0, 0.04)',
        borderRadius: 18,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.2)',
        alignItems: 'center',
        marginTop: 8,
    },
    contactTitle: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginTop: 8,
        textAlign: 'center',
    },
    contactSubtitle: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 4,
        textAlign: 'center',
        marginBottom: 14,
    },
    contactButton: {
        backgroundColor: COLORS.accentGold,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    contactButtonText: {
        fontSize: 13,
        color: COLORS.textDark,
    },

    /* Opaque Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-end',
    },
    modalContent: {
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
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    modalLabel: {
        fontSize: 12,
        color: COLORS.accentGold,
        marginTop: 10,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 10,
    },
    modalInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 12,
        padding: 12,
        fontSize: 13,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        height: 90,
        textAlignVertical: 'top',
    },
    modalSubmitBtn: {
        height: 46,
        backgroundColor: COLORS.accentGold,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    modalSubmitText: {
        fontSize: 13,
        color: COLORS.textDark,
    },

    /* Empty State */
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyTitle: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginTop: 10,
    },
    emptySubtitle: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 4,
    },

    /* Toast notification */
    toast: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#001529',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.accentGold,
        elevation: 6,
    },
    toastText: {
        fontSize: 12,
        color: COLORS.textPrimary,
    },
});