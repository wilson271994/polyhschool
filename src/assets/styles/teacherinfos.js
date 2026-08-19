import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const teacherinfostyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },

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

    /* Header local standardisé */
    localHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 14,
    },
    btnBackCustom: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    localTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },

    /* Carte Profil Principal */
    profileHeaderCard: {
        alignItems: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 22,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        position: 'relative',
    },
    favoriteButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    photoContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    profilePhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: COLORS.accentGold,
    },
    statusBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.bgPrimary,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.textPrimary,
    },
    professorName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 6,
    },
    subjectsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 10,
    },
    subjectBadge: {
        backgroundColor: 'rgba(54, 209, 220, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(54, 209, 220, 0.3)',
    },
    subjectText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.accentCyan,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    ratingText: {
        fontSize: 11,
        color: COLORS.textMuted,
    },

    /* Boutons d'action */
    contactButtonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        gap: 10,
        marginBottom: 14,
    },
    contactButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
        borderWidth: 1,
    },
    callButton: {
        backgroundColor: COLORS.accentGold,
        borderColor: COLORS.accentGold,
    },
    emailButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: COLORS.borderLight,
    },
    chatButton: {
        backgroundColor: 'rgba(54, 209, 220, 0.15)',
        borderColor: 'rgba(54, 209, 220, 0.3)',
    },
    contactButtonTextBold: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    contactButtonTextLight: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },

    /* Cartes génériques d'information */
    infoCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoContent: {
        marginLeft: 10,
        flex: 1,
    },
    infoLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    infoValue: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },

    /* Stats Grid */
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 4,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.accentGold,
    },
    statLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        marginVertical: 10,
    },

    /* Biographie & Listes */
    biographyText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
    readMoreText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.accentCyan,
        marginTop: 6,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    itemText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        flex: 1,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        gap: 6,
    },
    chipText: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },
});