import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const choosestyle = StyleSheet.create({
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
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: 'center',
    },

    // Top Header Navigation Bar
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(2, 59, 138, 0.4)', // #023b8a translucent
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Branding Section
    logoContainer: {
        alignItems: 'center',
        marginBottom: 28,
    },
    logo: {
        width: 100,  // Exact dimensions 100x100 px
        height: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    brandBadge: {
        color: '#f6a100', // Brand Accent #f6a100
        fontSize: 10,
        letterSpacing: 2.5,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 13,
        color: '#94A3B8',
        textAlign: 'center',
        maxWidth: '90%',
        lineHeight: 18,
    },

    // Role Card Container
    cardsContainer: {
        width: '100%',
        marginBottom: 24,
    },
    roleCard: {
        backgroundColor: 'rgba(2, 59, 138, 0.45)', // Primary #023b8a translucent card
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    roleCardSelected: {
        borderColor: '#f6a100', // Highlight with Accent #f6a100
        backgroundColor: 'rgba(246, 161, 0, 0.12)',
    },
    roleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: 'rgba(246, 161, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerSelected: {
        backgroundColor: '#f6a100', // Accent #f6a100
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        backgroundColor: '#f6a100', // Accent #f6a100
        borderColor: '#f6a100',
    },
    roleTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 6,
    },
    roleTitleSelected: {
        color: '#f6a100', // Accent #f6a100
    },
    roleDescription: {
        fontSize: 12,
        color: '#CBD5E1',
        lineHeight: 18,
    },

    // Action Button
    button: {
        backgroundColor: '#f6a100', // Master CTA Accent #f6a100
        borderRadius: 14,
        height: 54,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: '#011638', // Dark text for high contrast
        fontSize: 15,
        letterSpacing: 0.5,
    },

    // Login Navigation Link
    loginLinkText: {
        color: '#94A3B8',
        fontSize: 13,
    },
    loginLinkBold: {
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
});