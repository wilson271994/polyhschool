import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const loginstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011638', // Deep background derived from #023b8a
  },

  // Ambient Glowing Orbs
  topGlow: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(2, 59, 138, 0.55)', // Primary #023b8a glow
  },
  centerGlow: {
    position: 'absolute',
    top: '40%',
    left: -90,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(2, 59, 138, 0.3)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -80,
    right: -50,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(246, 161, 0, 0.25)', // Accent #f6a100 glow
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },

  // Logo & Institution Branding
  logoContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  logo: {
    width: 100,  // Updated width to 100px
    height: 100, // Updated height to 100px
    marginBottom: 10,
    resizeMode: 'contain',
  },
  brandBadge: {
    color: '#f6a100', // Brand Accent #f6a100
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  slogan: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '92%',
    lineHeight: 22,
    marginBottom: 8,
  },
  welcome: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: '85%',
    lineHeight: 18,
  },

  // Glassmorphic Form Card
  glassCard: {
    backgroundColor: 'rgba(2, 59, 138, 0.45)', // Primary #023b8a translucent card
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(246, 161, 0, 0.25)', // Accent #f6a100 subtle border
    padding: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },

  // Inline Error Banner
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorBannerText: {
    color: '#F87171',
    fontSize: 12,
    flex: 1,
  },

  // Form Inputs
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 22, 56, 0.75)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: 54,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputWrapperFocused: {
    borderColor: '#f6a100', // Highlight with Accent #f6a100
    backgroundColor: 'rgba(1, 22, 56, 0.95)',
  },
  inputIcon: {
    width: 20,
    height: 20,
    tintColor: '#64748B',
    marginRight: 12,
  },
  inputText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  eyeButton: {
    padding: 4,
  },

  // Action Text & Buttons
  forgotPasswordText: {
    color: '#f6a100', // Accent #f6a100
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#f6a100', // Master CTA Accent #f6a100
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f6a100',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  loginButtonText: {
    color: '#011638', // Dark background text for high contrast
    fontSize: 15,
    letterSpacing: 0.5,
  },

  // Signup Section
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  createAccountText: {
    color: '#FFFFFF',
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  // Footer Links
  footerContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 20,
  },
  footerLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#64748B',
    fontSize: 11,
  },
  footerDot: {
    color: '#334155',
    marginHorizontal: 8,
    fontSize: 10,
  },
  copyrightText: {
    color: '#475569',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 4,
  },
  developerTag: {
    color: '#334155',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});