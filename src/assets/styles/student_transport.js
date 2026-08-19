import { StyleSheet, Dimensions } from 'react-native';

export const MAP_SIZE = Dimensions.get('window').width - 40;

export const transportstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  headerHorizontal: {
    elevation: 2,
    paddingVertical: 10,
    marginTop: 10
  },
  navScroll: {
    paddingHorizontal: 10
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f4f8'
  },
  navItemActive: {
    backgroundColor: '#1B497D'
  },
  navText: {
    marginLeft: 5,
    color: '#1B497D',
  },
  navTextActive: {
    color: '#fff'
  },
  driver: {
    color: '#333'
  },
  place: {
    fontSize: 12,
    color: '#666'
  },
  speed: {
    fontSize: 10,
    color: '#999'
  },
  Speed: {
    color: '#1B497D'
  },
  contentArea: {
    flex: 1
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10
  },

  // Radar
  radarContainer: {
    width: MAP_SIZE,
    height: MAP_SIZE,
    backgroundColor: '#E2E8F0',
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'relative'
  },
  radarGridH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#CBD5E1',
    top: '50%'
  },
  radarGridV: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: '#CBD5E1',
    left: '50%'
  },
  schoolMarker: {
    position: 'absolute',
    zIndex: 10
  },
  busMarkerContainer: {
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  busMarkerCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },

  // Cartes de forfait
  planGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  planCard: {
    flex: 1,
    backgroundColor: '#6ca1df',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee'
  },
  planCardActive: {
    backgroundColor: '#1B497D',
    borderColor: '#1B497D'
  },
  planLabel: {
    fontSize: 12,
    color: '#1B497D',
    marginTop: 5
  },
  planPrice: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666'
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#333'
  },
  submitBtn: {
    backgroundColor: '#1B497D',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16
  },

  allocationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2
  },
  busNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1B497D'
  },
  routeText: {
    color: '#666',
    marginTop: 5,
    fontSize: 13
  },

  summaryBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10
  },
  totalText: {
    fontSize: 18,
    color: '#1B497D'
  },
  Text: {
    fontSize: 12,
    color: '#1B497D'
  },

  headerSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    marginLeft: 5,
  },
  subscriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#1B497D',
    elevation: 3,
    marginBottom: 15,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subscriptionTitle: {
    color: '#1B497D',
    fontSize: 18,
  },
  subscriptionType: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  totalContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#1B497D',
    borderRadius: 10,
  },
  totalLabel: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  emptySubscription: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
  },
});