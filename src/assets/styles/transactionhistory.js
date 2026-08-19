import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const C = {
  text: "#e8edf5",
  headerBg: "#0d1520",
};
export const transactionstyle = StyleSheet.create({

  container: {
    flex: 1,
  },

  Header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: `${C.headerBg}CC`,
    backdropFilter: 'blur(10px)',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  HeaderTitle: {
    fontSize: 20,
    color: C.text,
    textAlign: 'center',
    bottom: 7
  },
  headerbuttonContainer: {
  },
  HeaderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 7,
    right: 10,
  },


  header: {
    backgroundColor: '#1B497D',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },


  headerTop: {
    flexDirection: 'row',
    marginBottom: 10,
  },



  headerTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#c7d2fe',
    opacity: 0.9,
  },
  backContainer: {
    marginTop: 3,
    width: '10%'
  },
  headerTextContainer: {
    width: '80%',
    left: 10,
    marginTop: 6,
  },
  filterButton: {    
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex:9999,
    marginTop: 3,
    right: 5

  },
  icon: {
    fontSize: 25,
    color: "#FFF",
    alignSelf:'center'
  },



  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 10
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 2
  },
  statLabel: {
    fontSize: 12,
    color: '#c7d2fe'
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  listContainer: {
    paddingBottom: 60
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1B497D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
  },
  childName: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 2
  },
  className: {
    fontSize: 12,
    color: '#6b7280'
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },
  statusText: {
    fontSize: 10,
  },
  cardDetails: {
    gap: 8
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailItem: {
    flex: 1
  },
  detailLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 3,
    textTransform: 'uppercase'
  },
  amountText: {
    fontSize: 16,
    color: '#1f2937'
  },
  detailValue: {
    fontSize: 12,
    color: '#374151',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentIcon: {
    fontSize: 14,
    marginRight: 4
  },
  paymentText: {
    fontSize: 12,
    color: '#374151'
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontStyle: 'italic'
  },
  transactionId: {
    fontSize: 9,
    color: '#999',
    marginTop: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  modalTitle: {
    fontSize: 20,
    color: '#1f2937'
  },
  closeButton: {
    fontSize: 22,
    color: '#9ca3af'
  },
  filterLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 10,
    marginTop: 8
  },
  filterScroll: {
    flexDirection: 'row',
    marginBottom: 12
  },
  filterChip: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    alignItems: 'center'
  },
  filterChipActive: {
    backgroundColor: '#1B497D'
  },
  filterChipIcon: {
    fontSize: 14,
    marginRight: 4
  },
  filterChipText: {
    fontSize: 12,
    color: '#4b5563'
  },
  filterChipTextActive: {
    color: '#fff'
  },
  amountRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  amountInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  amountPrefix: {
    fontSize: 12,
    color: '#9ca3af',
    marginRight: 6
  },
  amountInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937'
  },
  amountSeparator: {
    fontSize: 18,
    color: '#9ca3af',
    marginHorizontal: 8
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb'
  },
  clearButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center'
  },
  clearButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600'
  },
  applyButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1B497D',
    alignItems: 'center'
  },
  applyButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 6
  },
  emptyText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center'
  }


});
