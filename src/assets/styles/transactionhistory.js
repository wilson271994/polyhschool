import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const transactionstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },

  /* Glows */
  topGlow: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 179, 0, 0.12)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(54, 209, 220, 0.10)',
  },

  /* Header Bar */
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginRight: 12,
  },
  headerTitleWrapper: {
    flex: 1,
  },
  headerBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  filterTriggerBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  filterBadgeDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.accentGold,
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: COLORS.textDark,
    fontSize: 10,
    fontWeight: 'bold',
  },

  /* Stats Summary Banner */
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  statNumberGold: {
    fontSize: 15,
    color: COLORS.accentGold,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.borderLight,
  },

  /* List & Transaction Cards */
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120, // Espace de sécurité pour le menu bas
    gap: 12,
  },
  transactionCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 179, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accentGold,
  },
  avatarText: {
    fontSize: 14,
    color: COLORS.accentGold,
  },
  childName: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  className: {
    fontSize: 11,
    color: COLORS.textMuted,
  },

  /* Status Badges */
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  statusBadgePending: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
  },
  statusText: {
    fontSize: 10,
  },
  statusTextSuccess: {
    color: '#10B981',
  },
  statusTextPending: {
    color: '#F59E0B',
  },

  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 8,
  },
  amountText: {
    fontSize: 15,
    color: COLORS.accentGold,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  transactionId: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  /* Modal de Filtres Opaque */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#001529',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  filterLabel: {
    fontSize: 12,
    color: COLORS.accentGold,
    marginTop: 12,
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  chipActive: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  chipText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  chipTextActive: {
    color: COLORS.textDark,
    fontWeight: 'bold',
  },

  amountRangeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amountInput: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.textPrimary,
  },

  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  clearBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  clearBtnText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  applyBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accentGold,
  },
  applyBtnText: {
    fontSize: 13,
    color: COLORS.textDark,
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  resetFiltersBtn: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 179, 0, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.accentGold,
  },
  resetFiltersText: {
    fontSize: 12,
    color: COLORS.accentGold,
  },
});