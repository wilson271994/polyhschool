import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#1E3A5F',
  accent: '#48BB78',
  white: '#FFFFFF',
  light: '#F7FAFC',
  dark: '#1A202C',
  gray: '#A0AEC0',
  gold: '#D69E2E',
  modalOverlay: 'rgba(15, 23, 42, 0.6)',   // plus doux
};

export const librarystyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.white,
    letterSpacing: 0.3,
    flex: 1,
    textAlign: 'left',
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    elevation: 1,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subscribeButtonText: {
    color: COLORS.white,
    fontSize: 12,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  bookCard: {
    flex: 1,
    margin: 6,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  bookCover: {
    height: 160,
    justifyContent: 'flex-end',
  },
  bookOverlay: {
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  bookCategory: {
    color: COLORS.white,
    fontSize: 11,
    opacity: 0.9,
  },
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 14,
    color: COLORS.dark,
    marginBottom: 3,
  },
  bookAuthor: {
    fontSize: 12,
    color: COLORS.gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: COLORS.gray,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.modalOverlay,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    paddingBottom: 12,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  modalHandle: {
    width: 32,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.primary,
  },
  closeButton: {
    padding: 4,
  },
  plansList: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  planBadgeText: {
    color: COLORS.white,
    fontSize: 11,
  },
  planTextGroup: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  planPeriod: {
    fontSize: 13,
    color: COLORS.dark,
  },
  planPrice: {
    fontSize: 16,
    marginTop: 1,
  },
  planRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: COLORS.gold,
  },
  discountText: {
    fontSize: 10,
    color: '#B45309',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 6,
    elevation: 2,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#CBD5E1',
    elevation: 0,
    shadowOpacity: 0,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 13,
  },



  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    paddingHorizontal: 10,
  },

  searchIconButton: {
    marginLeft: 10,
    padding: 6,
  },

  categoryFilterScroll: {
    gap: 10,
    paddingRight: 16,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: COLORS.dark,
  },
  categoryChipTextActive: {
    color: COLORS.white,
  },

  resultCount: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  resultCountText: {
    fontSize: 13,
    color: COLORS.gray,
  },


  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  searchIconButton: {
    marginLeft: 10,
    padding: 6,
  },

  categoryFilterContainer: {
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },
  categoryFilterScroll: {
    gap: 10,
    paddingRight: 16,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: COLORS.dark,
  },
  categoryChipTextActive: {
    color: COLORS.white,
  },

  mainScroll: {
    flex: 1,
  },
  mainScrollContent: {
    paddingBottom: 30,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.white,
  },
  bookCount: {
    fontSize: 13,
    color: COLORS.gray,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.white,
  },

  horizontalSection: {
    marginBottom: 8,
  },
  horizontalScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
  },
  horizontalCard: {
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    marginBottom: 4,
  },
  horizontalCover: {
    width: '100%',
    height: 160,
  },
  horizontalInfo: {
    padding: 10,
  },
  horizontalTitle: {
    fontSize: 13,
    color: COLORS.dark,
    marginBottom: 3,
  },
  horizontalAuthor: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    fontSize: 10,
    color: COLORS.primary,
  },

  verticalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  emptyContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.gray,
  },

  
  subscriptionBadge: {
    position: 'absolute',
    top:8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  premiumBadge: {
    backgroundColor: COLORS.gold,
  },
  basicBadge: {
    backgroundColor: '#63B3ED',
  },
  subscriptionBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});