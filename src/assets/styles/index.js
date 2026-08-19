import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#011638',
    },
    bodybase: {
        flex: 1,
    },

    /* ── Header Modernisé ── */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#011638',
        paddingHorizontal: 16,
        height: Platform.OS === 'ios' ? 56 : 60,
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    container_logo: {
        justifyContent: 'center',
    },
    logo_user: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    containersupport: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportbackground: {
        height: 36,
        width: 36,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportlogo: {
        width: 26,
        height: 26,
        borderRadius: 13,
    },
    containernotif: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notifbackground: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: '#f6a100',
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#011638',
    },
    notificationdot: {
        color: '#011638',
        fontSize: 9,
    },

    /* ── Bottom Navigation Lumineuse (Nouveau design clair/Glassmorphic) ── */
    bottomNavContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 16 : 10,
        left: 16,
        right: 16,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.94)', // Fond blanc translucide pour apporter de la lumière
        borderRadius: 24,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: 19,
        marginBottom: 2,
    },
    activeNavCircle: {
        backgroundColor: '#f6a100',
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 4,
    },
    navLabel: {
        fontSize: 10,
        color: '#64748B',
        marginTop: 1,
    },
    activeNavLabel: {
        color: '#011638',
    },

    /* Global background */
    backgroundapp: {
        flex: 1,
        width: width,
        height: height,
    },

    /* Typographies Globale */
    text: {
        fontFamily: 'AniversRegular',
    },
    textBold: {
        fontFamily: 'AniversBold',
    },
    sectionTitle: {
        fontFamily: 'AniversBold',
        fontSize: 20,
        color: '#FFF',
        alignItems: 'center',
        width: '70%',
    },
});