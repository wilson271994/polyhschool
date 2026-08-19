import {StyleSheet, Dimensions} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const {width, height} = Dimensions.get('window');

export const calendarstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 22,
    color: 'black',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 70
  },
  backstyle:{
    width:40,
    height:40,
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    tintColor: '#1B497D'

  },
  topButton: {
    flex: 1,
    backgroundColor: '#1B497D',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#eee',
  },
  buttonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  buttonTitle: {
    fontSize: 12,
    color: 'white',
    flexDirection: 'row',
    textAlign: 'right'
  },
  view:{
    width: 200,
    alignItems: 'flex-start',
  },
  buttonStatus: {
    fontSize: 14,
    color: 'white',
   // backgroundColor: '#FFCC00'
  },
  calendarBody: {
    backgroundColor: '#1B497D',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navArrow: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  calendarMonthText: {
    fontSize: 20,
    color: 'white',
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dayNameText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    width: '14.28%',
    textAlign: 'center',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  dateCell: {
    width: '14.28%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: 'white',
  },
  todayCell: {
    backgroundColor: '#FFCC00',
    borderRadius: 20,
  },
  lessonReadyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  lessonReadyText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  startButtonText: {
    fontSize: 20,
    color: 'white',
  },
});