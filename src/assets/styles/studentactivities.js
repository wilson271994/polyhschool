import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const activitiestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },

  /* Glows Ambiants */
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

  /* En-tête local sur-mesure */
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

  /* Bloc Filtres et Onglets */
  filterContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 31, 63, 0.6)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: COLORS.accentGold,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 6,
  },
  tabButtonTextActive: {
    color: COLORS.textDark,
    fontWeight: 'bold',
  },

  filterRow: {
    marginBottom: 10,
  },
  filterChips: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  filterChipActive: {
    backgroundColor: 'rgba(54, 209, 220, 0.15)',
    borderColor: COLORS.accentCyan,
  },
  filterChipText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.accentCyan,
    fontWeight: 'bold',
  },

  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  resultsCount: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  resultsActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 179, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGold,
    marginLeft: 6,
  },
  resetButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    marginLeft: 6,
  },

  /* Sections */
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Cartes d'activités */
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  activityDetail: {
    fontSize: 12,
    color: COLORS.accentGold,
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 11,
    color: COLORS.textMuted,
  },

  /* Calendrier Scolaire Items */
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  calendarDate: {
    backgroundColor: 'rgba(54, 209, 220, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(54, 209, 220, 0.25)',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 85,
  },
  calendarDay: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.accentCyan,
    textAlign: 'center',
  },
  calendarContent: {
    flex: 1,
  },
  calendarTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  calendarType: {
    fontSize: 11,
    color: COLORS.textMuted,
  },

  /* Timeline */
  timelineContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sectiontitleblack: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
    zIndex: 2,
  },
  timelineLine: {
    position: 'absolute',
    top: 16,
    left: 5,
    bottom: -16,
    width: 2,
    backgroundColor: COLORS.borderLight,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
  },
  timelineMonth: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.accentGold,
  },
  timelineEvents: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginVertical: 2,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    marginVertical: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  /* State vide & footer */
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginVertical: 16,
  },
  footer: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginVertical: 8,
  },
});