import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const planningstyle = StyleSheet.create({
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
  calendarNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  monthLabel: {
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

  /* En-tête de semaine en 7 colonnes exactes */
  weekHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    paddingBottom: 6,
  },
  weekText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textMuted,
  },

  /* Grille des jours en 7 colonnes exactes */
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCellWrapper: {
    width: '14.285%', // 100% / 7 jours
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
  hasClassCell: {
    backgroundColor: 'rgba(255, 179, 0, 0.12)',
  },

  dayText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  todayDayText: {
    color: COLORS.accentCyan,
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: COLORS.textDark,
    fontWeight: 'bold',
  },
  hasClassDayText: {
    color: COLORS.accentGold,
    fontWeight: 'bold',
  },

  classDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  hasClassDot: {
    backgroundColor: COLORS.accentGold,
  },
  noClassDot: {
    backgroundColor: 'transparent',
  },

  /* Détails */
  detailsContainer: {
    paddingHorizontal: 16,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
    textTransform: 'capitalize',
  },

  classCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  timeColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderLight,
    width: 55,
  },
  startTime: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  timeLine: {
    width: 2,
    height: 12,
    backgroundColor: COLORS.borderGold,
    marginVertical: 2,
  },
  endTime: {
    fontSize: 11,
    color: COLORS.textMuted,
  },

  classInfo: {
    flex: 1,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  roomBadge: {
    backgroundColor: 'rgba(54, 209, 220, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(54, 209, 220, 0.3)',
  },
  roomText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.accentCyan,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  //Lesson list container
  containerlesson:{
    padding:5,
    backgroundColor:'#001F3F',
    borderRadius:10,
    marginLeft:10
  },
  lessonText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  lessonTime:{
    fontSize: 11,
    color:'#eee',
    marginLeft: 6,
  },


  teacherText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginLeft: 6,
  },

  emptyState: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});