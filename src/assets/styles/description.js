import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const descriptionstyle = StyleSheet.create({
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
    paddingBottom: 14,
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

  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },

  contentWrapper: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  /* Input Card Glassmorphism */
  inputCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  inputCardFocused: {
    borderColor: COLORS.accentGold,
    backgroundColor: 'rgba(255, 179, 0, 0.03)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  characterCount: {
    fontSize: 11,
  },

  textInput: {
    height: 140,
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },

  helpText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 10,
    paddingHorizontal: 4,
    lineHeight: 16,
  },

  /* Bottom Actions */
  bottomSaveContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  saveButton: {
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: COLORS.accentGold,
  },
  saveButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  saveTextActive: {
    color: COLORS.textDark,
    fontSize: 14,
  },
  saveTextInactive: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});