import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const teacherstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },

    /* Glow Orbs issus des nuances du logo */
    topGlow: {
        position: 'absolute',
        top: -90,
        right: -90,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -90,
        left: -90,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(54, 209, 220, 0.10)',
    },

    /* Header Bar */
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
        backgroundColor: COLORS.bgPrimary,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    headerTitle: {
        fontSize: 18,
        color: COLORS.textPrimary,
    },

    /* Carte de Recherche */
    searchCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    searchTitle: {
        fontSize: 16,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    searchSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 14,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 31, 63, 0.85)',
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    searchInput: {
        flex: 1,
        fontSize: 13,
        color: COLORS.textPrimary,
        paddingVertical: 4,
    },

    /* Section Liste */
    listSection: {
        marginBottom: 16,
    },

    /* Carte Professeur */
    teacherCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    avatarWrapper: {
        position: 'relative',
        marginRight: 14,
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 2,
        borderColor: COLORS.accentGold,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.success,
        position: 'absolute',
        bottom: 2,
        right: 2,
        borderWidth: 2,
        borderColor: COLORS.bgPrimary,
    },

    infoContainer: {
        flex: 1,
    },
    teacherName: {
        fontSize: 15,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    subjectBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderGold,
        marginBottom: 6,
    },
    subjectBadgeText: {
        fontSize: 11,
        color: COLORS.accentGold,
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    arrowAction: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    /* Empty State */
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    emptyText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 12,
        paddingHorizontal: 20,
    },
});