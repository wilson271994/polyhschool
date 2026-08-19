import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const HORIZONTAL_CARD_WIDTH = width * 0.38;

export const COLORS = {
  primary: '#1E3A5F',
  accent: '#48BB78',
  white: '#FFFFFF',
  light: '#F7FAFC',
  dark: '#1A202C',
  gray: '#A0AEC0',
  gold: '#D69E2E',
};

export const bookshopstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
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

  categoryContainer: {
    marginTop: 16,
    marginBottom: 4,
    paddingLeft: 16,
  },
  categoryScroll: {
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
    width: HORIZONTAL_CARD_WIDTH,
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
    marginBottom: 4,
  },
  horizontalPrice: {
    fontSize: 14,
    color: COLORS.accent,
    marginTop: 4,
  },

  verticalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  verticalListContent: {
    padding: 10,
    paddingBottom: 30,
  },
  bookCard: {
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
    width: '100%',
    height: 170,
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 14,
    color: COLORS.dark,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 4,
  },
  bookPrice: {
    fontSize: 15,
    color: COLORS.accent,
  },

  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
  },
  paidText: {
    color: COLORS.white,
    fontSize: 12,
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: COLORS.gray,
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


  headerTitle: {
    flex: 1,
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  searchIconButton: {
    padding: 6,
  },
});