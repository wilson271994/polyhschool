import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const homeworkstyle = StyleSheet.create({
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

    /* En-tête local standardisé */
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

    /* Sections */
    section: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },

    /* Cartes de Rappel / Notif */
    reminderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    readNotification: {
        opacity: 0.65,
    },
    notifIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 179, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notifContent: {
        flex: 1,
    },
    notifTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    notifMessage: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    notifTime: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.accentOrange,
        marginLeft: 6,
    },

    /* Cartes Devoirs */
    homeworkCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        overflow: 'hidden',
    },
    subjectBar: {
        width: 5,
    },
    cardContent: {
        flex: 1,
        padding: 14,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    subject: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.accentCyan,
        flex: 1,
    },
    smallNotifBadge: {
        backgroundColor: COLORS.accentOrange,
        padding: 3,
        borderRadius: 8,
        marginRight: 6,
    },
    dueBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    dueText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    dueDate: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginBottom: 8,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
    },
    teacherNote: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginLeft: 6,
        flex: 1,
    },

    /* Progression & Slider */
    progressContainer: {
        marginTop: 4,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    progressLabel: {
        fontSize: 11,
        color: COLORS.textMuted,
    },
    progressPercentage: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    slider: {
        height: 28,
        marginVertical: -2,
    },
    progressButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    progressBtn: {
        padding: 4,
    },
    completeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.accentGold,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10,
    },
    completeBtnText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginLeft: 4,
    },

    /* Reset & Footer */
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        paddingVertical: 10,
        marginHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    resetButtonText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    footer: {
        fontSize: 11,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginBottom: 12,
    },
});