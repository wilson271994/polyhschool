import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const messagestyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  header: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },

  headerTitle: {
    fontSize: 24,
    color: '#fff'
  },
  headerIcons: {
    flexDirection: 'row'
  },
  tabsContainer: {
    maxHeight: 35,
    marginTop: 15,
    borderBottomColor: '#eee',
  },

  tab: {
    paddingHorizontal: 22,
    paddingVertical: 5,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    justifyContent: 'center'
  },

  tabActive: {
    backgroundColor: '#1B497D',
    justifyContent: 'center',
    textAlign: 'center',
  },

  tabText: {
    fontSize: 15,
    color: '#555',
  },

  tabTextActive: {
    color: '#fff',
  },

  listContent: {
    paddingBottom: 80
  },

  chatRow: {
    flexDirection: 'row',
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 27.5
  },
  chatInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center'
  },
  chatName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF'
  },
  lastMessage: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 2
  },
  chatRight: {
    alignItems: 'flex-end'
  },
  time: {
    fontSize: 13,
    color: '#FFF'
  },
  unreadBadge: {
    backgroundColor: '#ECB818',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700'
  },


  fab: {
    position: 'absolute',
    bottom: 95,
    right: 18,
    width: 42,
    height: 42,
    borderRadius: 29,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  fabInner: {
    flex: 1,
    backgroundColor: '#1B497D',
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },


  //Swipable menucontainermenu:{

  containermenu: {
    height: height / 2,
  },
  menuitemcontainer: {
  },
  menuitemscroll: {
    padding: 80,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 30,
  },
  swipablepanelbarstyle: {
    height: 50,
    backgroundColor: '#1B497D'
  },
  swipablepanelcloseicon: {
    backgroundColor: '#1B497D',
  },
  headermenuitem: {
    borderTopColor: '#eee',
    padding: 5,
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15
  },
  iconmenuitem: {
    width: 25,
    height: 25
  },
  menulisttext: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },


  // ========== CONTENEUR PRINCIPAL ==========
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingBottom: 80,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  emptyTitle: {
    fontSize: 22,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 15,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 22,
  },
});