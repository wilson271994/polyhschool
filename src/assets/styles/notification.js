import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const notifstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },

  /* Glows / Orbes d'ambiance */
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

  /* En-tête Navigation */
  header: {
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
  markReadHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 179, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 179, 0, 0.25)',
  },

  /* Barre de recherche */
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },

  /* Onglets de filtrage */
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 14,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tabBtnActive: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  tabText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.textDark,
  },

  /* Liste et Cartes */
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    position: 'relative',
    overflow: 'hidden',
  },
  cardUnread: {
    borderColor: 'rgba(255, 179, 0, 0.35)',
    backgroundColor: 'rgba(255, 179, 0, 0.04)',
  },
  unreadIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
    backgroundColor: COLORS.accentGold,
  },

  /* Badges & Contenu */
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 10,
  },
  contentWrapper: {
    flex: 1,
    marginRight: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  senderName: {
    fontSize: 13,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  timeText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  messageText: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  messageTextUnread: {
    color: COLORS.textPrimary,
  },
  actionBtn: {
    padding: 4,
  },

  /* Vue Vide */
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 179, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 179, 0, 0.2)',
  },
  emptyTitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 16,
  },
});