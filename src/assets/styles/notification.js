import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const notifstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backstyle:{
    width:40,
    height:40,
  },
  back2:{
    marginTop: 20,
    bottom: '91%',
    transform: [{ translateX: -165 }],
    position: 'absolute', 
    elevation: 5
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color:'#999'
  },
  notificationList: {
    paddingHorizontal: 10,
    marginBottom: 55
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  name: {
    color: '#333',
  },
  message: {
    color: '#666',
  },
  notificationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  readText: {
    color: '#fff',
    fontSize: 12,
  },
  optionsIcon: {
    padding: 5,
  },
  optionsText: {
    color: '#3498db',
    fontSize: 20,
  },
  time: {
    color: '#666',
    fontSize: 12,
    marginLeft: 10,
  },
});