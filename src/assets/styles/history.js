import { StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { ContinousBaseGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
const { width, height } = Dimensions.get('window');


export const C = {
  surface: '#FFFFFF',
  primary: '#1A3C6E',
  textLight: '#7B93B0',
  textInverse: '#FFFFFF',
};

export const historystyle = StyleSheet.create({

  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,



    backgroundColor: '#1B497D',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 60,
    marginBottom: 10,

  },

  Header: {
    backgroundColor: '#1B497D',
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  backButton: {
    marginRight: 20
  },
  waitingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  waitingVideoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1B497D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  waitingVideo: {
    width: '90%',
    height: '90%',
  },
  waitingTitle: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  waitingMessage: {
    fontSize: 14,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
  },







  headerTitle: {
    fontSize: 24,
    color: '#FFF',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  /*NAVIGATION*/

  /*
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 10,
    },
    tabText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#999',
    },
    activeTabText: {
      color: '#000',
    },
    activeTabIndicator: {
      height: 4,
      width: '100%',
      backgroundColor: '#ECB818', // Couleur de l'indicateur
      position: 'absolute',
      bottom: -1,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    contentText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  
  */

  filterContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 4,
    marginBottom: 10,
    shadowColor: '#1A3C6E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 11,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: C.primary,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabButtonText: {
    fontSize: 13,
    color: C.textLight,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: C.textInverse,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 16,
    marginBottom: 12,
  },



  coursesList: {
    padding: 20,
    paddingBottom: 80,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 7
  },
  courseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    color: '#333',
  },
  courseTeacher: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  courseProgress: {
    fontSize: 14,
    color: '#2fc91eff',
  },
  subjectFilterContainer: {
    marginTop: 4,
    marginBottom: 8,
    paddingLeft: 16,
  },
  subjectFilterScroll: {
    gap: 10,
    paddingRight: 16,
  },
  subjectChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginRight: 8,
  },
  subjectChipActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  subjectChipText: {
    fontSize: 13,
    color: '#FFF',
  },
  subjectChipTextActive: {
    color: '#1B497D',
  },

  mainScrollContent: {
    paddingBottom: 30,
  },


  verticalSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  verticalSectionTitle: {
    fontSize: 18,
    color: '#FFF',
  },
  courseCount: {
    fontSize: 13,
    color: '#CCC',
  },
  verticalGrid: {
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
    fontSize: 15,
  },

  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  welcomeVideoContainer: {
    width: 90,
    height: 90,
    borderRadius: 70,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#1B497D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  welcomeVideo: {
    width: '85%',
    height: '85%',
  },
  welcomeTitle: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  welcomeMessage: {
    fontSize: 15,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  welcomeIconRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },

  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B497D',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
    width: '100%',
    elevation: 6,
    shadowColor: '#1B497D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  subscribeButtonText: {
    flex: 1,
    color: '#FFF',
    fontSize: 17,
    textAlign: 'center',
  },


});