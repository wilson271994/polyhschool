import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers'
const { width } = Dimensions.get('window');
const DAY_CELL_SIZE = Math.min((width - 48) / 8, 50);
export const C = {
  text: "#e8edf5",
  headerBg: "#0d1520",
};
export const absencestyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: `${C.headerBg}CC`,
    backdropFilter: 'blur(10px)',
    zIndex: 100,
  },
  headerSection: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    color: C.text,
  },
  headerbuttonContainer: {
  },
  headerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 7,
    paddingRight: 8,
    right: 10
  },


  scrollContent: {
    paddingBottom: 30,
  },
  calendarCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 24,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  calendarNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthLabel: {
    fontSize: 18,
    color: '#1F2937',
  },
  navBtn: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center'
  },
  weekText: {
    width: DAY_CELL_SIZE,
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 1.5,
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 14,
  },
  dayCell: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  dayEmpty: {
    width: DAY_CELL_SIZE,
    height: DAY_CELL_SIZE,
  },
  dayText: {
    fontSize: 15,
    color: '#374151',
  },
  selectedCell: {
    backgroundColor: '#1B497D'
  },
  selectedDayText: {
    color: '#10B981'
  },
  todayCell: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#EAB308',
  },
  todayDayText: {
    color: '#EAB308',
  },
  daycell: {
    backgroundColor: '#F1F5F9',        // Gris clair pour jours sans cours
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailsContainer: {
    paddingHorizontal: 16
  },
  detailsTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
    marginLeft: 5
  },
  absenceDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EF4444',
    position: 'absolute',
    bottom: 4,
  },
  detailsTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 12,
    marginLeft: 4,
  },
  absenceItem: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#ECB818',
  },
  absenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  commentBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
  },
  commentText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
    fontStyle: 'italic',
    flex: 1,
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },











});