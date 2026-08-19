import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const agendastyle = StyleSheet.create({
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

  /* Card Calendrier */
  calendarCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  todayButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 179, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGold,
  },

  weekHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    paddingBottom: 6,
  },
  weekDay: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textMuted,
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCellWrapper: {
    width: '14.285%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  dayCell: {
    width: 36,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  todayCell: {
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
    backgroundColor: 'rgba(54, 209, 220, 0.15)',
  },
  selectedCell: {
    backgroundColor: COLORS.accentGold,
  },

  dayText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  todayText: {
    color: COLORS.accentCyan,
    fontWeight: 'bold',
  },
  selectedText: {
    color: COLORS.textDark,
    fontWeight: 'bold',
  },

  eventDots: {
    flexDirection: 'row',
    marginTop: 2,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },

  /* Liste des événements */
  eventsSection: {
    paddingHorizontal: 16,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    textTransform: 'capitalize',
  },
  addButton: {
    marginLeft: 8,
  },
  noEvents: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginVertical: 16,
  },
  eventsList: {
    marginTop: 4,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: COLORS.accentGold,
    marginBottom: 2,
  },
  eventType: {
    fontSize: 11,
    color: COLORS.textMuted,
  },

  /* Modals & Popups */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.bgSecondary,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  modalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 13,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeField: {
    width: '48%',
  },
  timeLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  timeInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.textPrimary,
    fontSize: 13,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  timeError: {
    fontSize: 10,
    color: '#F43F5E',
    marginTop: 2,
  },

  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  typeButtonActive: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  typeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  confirmButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.accentGold,
  },
  buttonTextCancel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  buttonTextConfirm: {
    color: COLORS.textDark,
    fontWeight: 'bold',
    fontSize: 12,
  },

  /* Alert */
  alertContainer: {
    backgroundColor: COLORS.bgSecondary,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  alertTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  alertMessage: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  /* Swipeable panel */
  containermenu: {
    backgroundColor: COLORS.bgSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  eventDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventDetailDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  eventDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  headermenuitem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menulisttext: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
});