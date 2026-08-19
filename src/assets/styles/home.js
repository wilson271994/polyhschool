import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from './theme';

const { width } = Dimensions.get('window');

export const homestyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  scrollViewContent: {
    paddingHorizontal: 5,
    paddingTop: 12,
    paddingBottom: 120,
  },

  /* Ambient Glows Poly-H */
  topGlow: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
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

  /* Profil Card Glassmorphic */
  profileCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 20,
    alignItems: 'center',
    paddingBottom: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileImageBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
  },
  coverEditBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 31, 63, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  profileIconWrapper: {
    marginTop: -40,
    position: 'relative',
    marginBottom: 10,
  },
  profileIconContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: COLORS.accentGold,
    overflow: 'hidden',
    backgroundColor: COLORS.bgPrimary,
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
  editIconBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accentGold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.bgPrimary,
  },
  userName: {
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 179, 0, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGold,
  },
  userClass: {
    fontSize: 12,
    color: COLORS.accentGold,
  },

  /* Welcome Screen */
  welcomeContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginTop: 10,
  },
  welcomeVideoContainer: {
    width: width * 0.7,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  welcomeVideo: {
    width: '100%',
    height: '100%',
  },
  welcomeTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeMessage: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  welcomeIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.accentGold,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    width: '100%',
  },
  subscribeButtonText: {
    fontSize: 14,
    color: COLORS.textDark,
  },

  /* Waiting Admission Screen */
  waitingContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  waitingVideoContainer: {
    width: width * 0.6,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  waitingVideo: {
    width: '100%',
    height: '100%',
  },
  waitingTitle: {
    fontSize: 17,
    color: COLORS.accentCyan,
    textAlign: 'center',
    marginBottom: 8,
  },
  waitingMessage: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentGold,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  refreshButtonText: {
    fontSize: 13,
    color: COLORS.textDark,
    marginLeft: 8,
  },

  /* Bottom Sheet Image Picker */
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  pickerBackdrop: {
    flex: 1,
  },
  pickerSheet: {
    backgroundColor: COLORS.bgSecondary,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  pickerHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.borderLight,
    alignSelf: 'center',
    marginBottom: 16,
  },
  pickerHeader: {
    alignItems: 'center',
    marginBottom: 18,
  },
  pickerIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  pickerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  pickerOptionsContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 8,
    marginBottom: 14,
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  pickerOptionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickerOptionText: {
    flex: 1,
  },
  pickerOptionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  pickerOptionDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  pickerSeparator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: 12,
  },
  pickerCancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  pickerCancelText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
});