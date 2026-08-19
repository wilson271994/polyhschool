import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const studentinfostyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011638',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
  },

  /* Glow Orbs */
  topGlow: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(246, 161, 0, 0.12)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
  },

  /* Bar Header */
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

  /* Glass Card */
  glassCard: {
    backgroundColor: 'rgba(1, 22, 56, 0.75)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#f6a100',
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  stuId: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 6,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(246, 161, 0, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(246, 161, 0, 0.3)',
  },
  classBadgeText: {
    fontSize: 11,
    color: '#f6a100',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },

  subTitle: {
    fontSize: 15,
    color: '#f6a100',
    marginBottom: 10,
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 110,
    fontSize: 13,
    color: '#94A3B8',
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#CBD5E1',
  },

  sectionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 14,
  },

  /* ── Calendrier Ultra Moderne & Centré ── */
  calendarCard: {
    backgroundColor: 'rgba(3, 13, 30, 0.85)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(246, 161, 0, 0.25)',
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
  monthTitle: {
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

  /* En-tête des jours de la semaine */
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(246, 161, 0, 0.08)',
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  weekText: {
    width: '14.28%',
    textAlign: 'center',
    color: '#f6a100',
    fontSize: 12,
  },

  /* Grille des Jours */
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCellTouch: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
  },
  dayCellEmpty: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayCellContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'transparent',
  },

  /* Styles visuels des états */
  todayCell: {
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  selectedCell: {
    backgroundColor: '#f6a100',
    shadowColor: '#f6a100',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },

  /* Textes des jours */
  dayText: {
    fontSize: 13,
    color: '#CBD5E1',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  todayDayText: {
    color: '#60A5FA',
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: '#011638',
    fontWeight: 'bold',
  },

  /* Note d'activité */
  activityNote: {
    backgroundColor: '#030D1E',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  noteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  noteDay: {
    color: '#f6a100',
    fontSize: 13,
  },
  noteText: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 17,
  },

  /* Bouton de Filtre des Séquences */
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#030D1E',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
  },
  filterButtonText: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    marginHorizontal: 10,
  },

  /* Tableau de Résultats */
  resultTable: {
    backgroundColor: '#030D1E',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(246, 161, 0, 0.1)',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  tableHeaderCell: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f6a100',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingVertical: 10,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 12,
    color: '#CBD5E1',
  },
  failText: {
    color: '#EF4444',
  },
  noResult: {
    textAlign: 'center',
    color: '#64748B',
    padding: 16,
    fontSize: 13,
  },

  /* Modal Sombre pour les Séquences */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#011638',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '65%',
    paddingBottom: 24,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  modalTitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  sequenceList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sequenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 8,
    backgroundColor: '#030D1E',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sequenceItemActive: {
    borderColor: '#f6a100',
    backgroundColor: 'rgba(246, 161, 0, 0.08)',
  },
  sequenceItemText: {
    fontSize: 13,
    color: '#94A3B8',
    flex: 1,
  },
  sequenceItemTextActive: {
    color: '#f6a100',
  },
});