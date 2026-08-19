import {StyleSheet, Dimensions} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const {width, height} = Dimensions.get('window');

export const detailstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  Container: {
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: 12,
    color: '#666',
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  star: {
    color: '#fcd34d',
    fontSize: 18,
  },
  teacherSection: {
    marginBottom: 20,
  },
  teacherTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  teacherCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 14,
    color: '#333',
  },
  teacherExperience: {
    fontSize: 12,
    color: '#666',
  },
  statsSection: {
    marginBottom: 20,
  },
  progressBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBox: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  coveredBox: {
    backgroundColor: '#22c55e',
  },
  uncoveredBox: {
    backgroundColor: '#ef4444',
  },
  progressLabel: {
    color: '#fff',
    fontSize: 14,
  },
  progressValue: {
    color: '#fff',
    fontSize: 24,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  progressHours: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  hoursLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  hoursValue: {
    fontSize: 14,
    color: '#FFF',
  },
});
