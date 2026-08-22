import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const schoolstyle = StyleSheet.create({
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

    /* En-tête */
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
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },

    /* Barre de Recherche */
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        paddingHorizontal: 12,
        height: 44,
        marginHorizontal: 16,
        marginBottom: 10,
    },
    searchWrapperFocused: {
        borderColor: COLORS.accentGold,
        backgroundColor: 'rgba(255, 179, 0, 0.05)',
    },
    searchInput: {
        flex: 1,
        fontSize: 12,
        color: COLORS.textPrimary,
        marginLeft: 8,
    },

    /* Indicateur de Résultats */
    resultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    resultCount: {
        fontSize: 11,
        color: COLORS.textMuted,
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.accentCyan,
    },

    /* Liste */
    list: {
        paddingHorizontal: 16,
    },

    /* Cartes d'Établissement */
    cardContainer: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        marginBottom: 14,
        overflow: 'hidden',
    },
    topHighlightLine: {
        height: 2,
        backgroundColor: COLORS.accentGold,
        width: '100%',
    },

    /* Carte Header */
    cardHeader: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    logoWrapper: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        overflow: 'hidden',
    },
    schoolLogo: {
        width: '100%',
        height: '100%',
    },
    headerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    schoolName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        flex: 1,
        marginRight: 6,
    },
    verifiedBadge: {
        marginLeft: 2,
    },
    schoolAddress: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
        marginBottom: 4,
    },

    /* Étoiles */
    etoilesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    etoileIcon: {
        marginRight: 2,
    },
    noteTexte: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginLeft: 4,
    },

    cardDivider: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        marginHorizontal: 12,
    },

    /* Carte Body & Stats */
    cardBody: {
        padding: 12,
    },
    sectionSubtitle: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    statBadge: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    statIconBg: {
        width: 26,
        height: 26,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    statValue: {
        fontSize: 12,
        color: COLORS.accentGold,
    },
    statValueBlue: {
        fontSize: 12,
        color: COLORS.accentCyan,
    },

    /* Carte Footer */
    cardFooter: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 12,
        gap: 8,
    },
    seeMoreButton: {
        flex: 1,
        height: 38,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seeMoreText: {
        fontSize: 12,
        color: COLORS.textPrimary,
    },
    selectButton: {
        flex: 1.5,
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.accentGold,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },

    /* États Chargement & Liste Vide */
    loadingContainer: {
        paddingVertical: 16,
        alignItems: 'center',
        gap: 6,
    },
    loadingText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },

    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyIconBg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 179, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 179, 0, 0.2)',
    },
    emptyTitle: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 11,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 16,
    },
});