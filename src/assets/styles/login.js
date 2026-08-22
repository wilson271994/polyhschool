import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const loginstyle = StyleSheet.create({
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
  centerGlow: {
    position: 'absolute',
    top: '40%',
    left: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(54, 209, 220, 0.10)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -100,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 179, 0, 0.08)',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  /* Branding */
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 85,
    height: 85,
    marginBottom: 8,
  },
  brandBadge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  slogan: {
    fontSize: 12,
    color: COLORS.accentCyan,
    textAlign: 'center',
    marginBottom: 4,
    paddingHorizontal: 15,
  },
  welcome: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },

  /* Carte Translucide */
  glassCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 20,
  },

  /* Bannières de réponse / Erreur */
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorBannerText: {
    fontSize: 12,
    color: '#F43F5E',
    flex: 1,
  },

  /* Champs de texte */
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 14,
  },
  inputWrapperFocused: {
    borderColor: COLORS.accentGold,
    backgroundColor: 'rgba(255, 179, 0, 0.05)',
  },
  inputIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.textMuted,
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  eyeButton: {
    padding: 4,
  },

  forgotPasswordText: {
    fontSize: 12,
    color: COLORS.accentCyan,
  },

  /* Bouton Master CTA */
  loginButton: {
    backgroundColor: COLORS.accentGold,
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },

  /* Liens de bas de carte */
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  createAccountText: {
    fontSize: 12,
    color: COLORS.accentGold,
  },

  /* Footer */
  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  footerDot: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginHorizontal: 6,
  },
  copyrightText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
});