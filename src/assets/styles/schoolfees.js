import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const feestyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011638',
    },

    /* Glow Orbs */
    topGlow: {
        position: 'absolute',
        top: -90,
        right: -90,
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: 'rgba(246, 161, 0, 0.12)',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -90,
        left: -90,
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
    },

    /* Bar d'Entête */
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
        backgroundColor: '#011638',
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF',
    },

    /* Filtres & Onglets Principaux */
    filterContainer: {
        marginBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#030D1E',
        borderRadius: 16,
        padding: 4,
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
    },
    tabButtonActive: {
        backgroundColor: '#f6a100',
    },
    tabButtonText: {
        fontSize: 12,
        color: '#94A3B8',
    },
    tabButtonTextActive: {
        color: '#011638',
    },

    filterChips: {
        flexDirection: 'row',
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#030D1E',
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    filterChipActive: {
        borderColor: '#f6a100',
        backgroundColor: 'rgba(246, 161, 0, 0.12)',
    },
    filterChipText: {
        fontSize: 12,
        color: '#94A3B8',
    },
    filterChipTextActive: {
        color: '#f6a100',
    },

    /* Resume Statistique */
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        alignItems: 'center',
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
    },
    statCardDivider: {
        width: 1,
        height: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    statValue: {
        fontSize: 13,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    statValueGreen: {
        fontSize: 13,
        color: '#10B981',
        marginBottom: 2,
    },
    statValueRed: {
        fontSize: 13,
        color: '#EF4444',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 11,
        color: '#94A3B8',
    },

    /* Calendrier */
    /* ── Calendrier Ultra Moderne & Lumineux ── */
    calendarCard: {
        backgroundColor: 'rgba(3, 13, 30, 0.85)',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(246, 161, 0, 0.25)', // Bordure dorée subtile
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    calendarNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    navBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    monthLabel: {
        fontSize: 15,
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    todayButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(246, 161, 0, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(246, 161, 0, 0.3)',
    },

    /* ── Grille du Calendrier parfaitement alignée ── */
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(246, 161, 0, 0.08)',
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 8,
    },
    weekText: {
        width: '14.28%', // Exactement 1/7ème de la largeur
        textAlign: 'center',
        color: '#f6a100',
        fontSize: 12,
        fontWeight: 'bold',
    },

    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    dayCell: {
        width: '14.28%', // Alignement parfait sur 7 colonnes
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    dayCellEmpty: {
        width: '14.28%',
        aspectRatio: 1,
    },

    /* Conteneur tactile externe */
    dayCellTouch: {
        width: '14.28%',
        aspectRatio: 1,
        padding: 2, // Espacement entre les pavés du calendrier
    },

    /* Zone visuelle interne centrée */
    dayCellContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',      // Centrage horizontal
        justifyContent: 'center',  // Centrage vertical
        borderRadius: 14,
        backgroundColor: 'transparent',
        position: 'relative',
    },

    /* Styles d'états */
    selectedCell: {
        backgroundColor: '#f6a100',
        borderRadius: 14,
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    todayCell: {
        borderWidth: 1.5,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderRadius: 14,
    },
    duePaidDayCell: {
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.4)',
    },
    dueUnpaidDayCell: {
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.4)',
    },

    /* Textes des jours */
    dayText: {
        fontSize: 13,
        color: '#CBD5E1',
        textAlign: 'center',
        includeFontPadding: false, // Supprime l'espace supérieur masqué sous Android/iOS
        textAlignVertical: 'center',
    },
    selectedDayText: {
        color: '#011638',
        fontWeight: 'bold',
    },

    /* Indication d'échéance */
    statusPulseDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        position: 'absolute',
        bottom: 4,
    },

    classDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        position: 'absolute',
        bottom: 4,
    },

    /* Sections Verre */
    sectionGlass: {
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    sectionTitle: {
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 12,
    },

    /* Echeances */
    monthlyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#030D1E',
        borderRadius: 14,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    paidMonthlyCard: {
        borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    selectedMonthlyCard: {
        borderColor: '#f6a100',
    },
    monthInfo: {
        flex: 1,
    },
    monthName: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    dueDate: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 2,
    },
    amount: {
        fontSize: 13,
        color: '#f6a100',
        marginTop: 2,
    },
    paidBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    paidText: {
        fontSize: 11,
        color: '#10B981',
    },
    payButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f6a100',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    payButtonText: {
        fontSize: 12,
        color: '#011638',
    },

    /* Historique */
    filterGroupRow: {
        marginBottom: 12,
    },
    subFilterChip: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#030D1E',
        marginRight: 6,
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    subFilterChipActive: {
        borderColor: '#f6a100',
    },
    subFilterText: {
        fontSize: 11,
        color: '#64748B',
    },
    subFilterTextActive: {
        color: '#f6a100',
    },

    historyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
    },
    historyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    historyIconBox: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(246, 161, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyInfo: {},
    historyMonth: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    historyDate: {
        fontSize: 11,
        color: '#64748B',
    },
    historyRight: {
        alignItems: 'flex-end',
    },
    historyAmount: {
        fontSize: 12,
        color: '#10B981',
    },
    historyMethod: {
        fontSize: 10,
        color: '#94A3B8',
    },

    /* Moratoire Card */
    moratoireCard: {
        backgroundColor: '#030D1E',
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    moratoireHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    moratoireReason: {
        fontSize: 13,
        color: '#FFFFFF',
        flex: 1,
    },
    moratoireAmount: {
        fontSize: 12,
        color: '#CBD5E1',
        marginBottom: 2,
    },
    moratoireDate: {
        fontSize: 11,
        color: '#94A3B8',
        marginBottom: 2,
    },
    moratoireStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 6,
    },
    statusIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    moratoireStatus: {
        fontSize: 11,
    },

    /* Floating Button */
    floatingButton: {
        position: 'absolute',
        bottom: 85,
        right: 20,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#f6a100',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },

    /* Modal Bottom Sheet */
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        backgroundColor: '#011638',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingBottom: 24,
        maxHeight: '85%',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    modalHandle: {
        width: 36,
        height: 4,
        backgroundColor: '#334155',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    modalLabel: {
        fontSize: 12,
        color: '#f6a100',
        marginTop: 10,
        marginBottom: 6,
    },
    modalInput: {
        backgroundColor: '#030D1E',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 13,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    errorText: {
        fontSize: 11,
        color: '#EF4444',
        marginTop: 4,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        marginTop: 16,
        marginBottom: 10,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 11,
        color: '#CBD5E1',
        lineHeight: 16,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 16,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#030D1E',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    modalCancelText: {
        fontSize: 13,
        color: '#94A3B8',
    },
    modalValidateButton: {
        flex: 1,
        backgroundColor: '#f6a100',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalValidateText: {
        fontSize: 13,
        color: '#011638',
    },
    emptyText: {
        textAlign: 'center',
        color: '#64748B',
        paddingVertical: 16,
        fontSize: 12,
    },
});