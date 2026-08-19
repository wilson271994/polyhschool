import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const devoirstyle = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
},
container: {
    flex: 1,
    paddingHorizontal: 20,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
},
headerTitle: {
    fontSize: 32,
    color: '#1f2937',
    transform: [{ translateX: 85 }],

},
searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
},
searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
},
filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
},
filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
},
filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
},
filterIcon: {
    marginLeft: 5,
},
homeworkCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
},
cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
},
cardTitle: {
    fontSize: 22,
    color: '#1f2937',
},
dueDateBadge: {
    backgroundColor: '#fee2e2',
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
},
dueDateText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#b91c1c',
    textAlign: 'center',
},
cardDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 15,
},
teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
},
profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
},
filterImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
},
teacherName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
},
sentTime: {
    fontSize: 12,
    color: '#6b7280',
},
soonDue: {
    color: '#ef4444',
},
actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
},
attachmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 10,
},
attachmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginLeft: 5,
},
uploadButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
},
uploadText: {
    fontSize: 14,
    color: '#ffffff',
},

//back

back:{
    marginTop: 20,
    bottom: '94%',
    transform: [{ translateX: 0 }],
    position: 'absolute', 
    elevation: 5
},
backstyle:{
    width:40,
    height:40,
    tintColor: '#ffffff'
},
});