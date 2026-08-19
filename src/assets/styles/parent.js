import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const parentstyle = StyleSheet.create({

    container: {
        flex: 1,
    },
    container3: {
        backgroundColor: '#f5f5f5',
        marginTop: 5,
        marginBottom: 60
    },
    containerbanner: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        height: 180,
    },
    subcontainer: {
        marginLeft: 15,
        marginRight: 15
    },
    bannerchild: {
        height: 180,
    },
    backgroundimagebanner: {
        resizeMode: 'cover',
        height: 180,
    },

    scrollContainer: {
        paddingBottom: 170,
    },

    scrollViewContent: {
        paddingBottom: 80,
    },
    headerContainer: {
        backgroundColor: '#002B5B',
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        position: 'relative',
    },
    headerArcBackground: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: '#E0E0E0',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },

    topNavButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    profileCard: {
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 1,
        marginTop: 5,
    },
    View: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    topNavLink: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        width: width * 0.28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        marginRight: 5,
        marginLeft: 5,
        borderLeftWidth: 2,
        borderLeftColor: '#1B497D',
        borderRightWidth: 2,
        borderTopColor: '#1B497D',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRightColor: '#ECB818',
        borderBottomColor: '#ECB818'

    },
    Plus: {
        backgroundColor: '#FFF',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        width: 70,
        height: 70,
        marginTop: 10,
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    topNavLink1: {
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        width: 150,
        height: 90,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        transform: [{ translateY: -20 }],
        borderLeftWidth: 2,
        borderLeftColor: '#1B497D',
        borderRightWidth: 2,
        borderTopColor: '#1B497D',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRightColor: '#ECB818',
        borderBottomColor: '#ECB818'

    },
    topNavIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    verify: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-end'

    },
    Icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 5,
        tintColor: '#1B497D'
    },
    Icon1: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    gridcontainer: {
        marginBottom: 70,
    },
    topNavText: {
        fontSize: 11,
        textAlign: 'center',
        color: '#333',
        marginBottom: 5
    },
    text: {
        fontSize: 15,
        color: '#333',
    },
    Text: {
        fontSize: 18,
        textAlign: 'left',
        color: '#ffffff',
        transform: [{ translateY: -40 }],
        marginBottom: 20,
        left: 10

    },
    finances: {
        fontSize: 18,
        color: '#FFF',
        transform: [{ translateY: -37 }],
        left: 10
    },
    childs: {
        fontSize: 18,
        top: 10,
        textAlign: 'left',
        color: '#ffffff',
        transform: [{ translateY: -20 }],
        left: 10

    },
    scroll: {
        marginBottom: 80
    },
    booklistpage: {
        height: "auto",
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
    },
    // ========== BILAN FINANCIER ==========
    financeContainer: {
        marginBottom: 16,
    },
    financeTitle: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 8,
        transform: [{ translateY: -30 }],
        left: 10,
    },

    // ========== SÉPARATEUR ==========
    sectionDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 16,
    },

    // ========== BOUTON AJOUTER RAFFINÉ ==========
    addChildButton: {
        marginHorizontal: 4,
    },
    addChildButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        borderStyle: 'dashed',
        gap: 12,
    },
    addChildIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1B497D',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    addChildTextContainer: {
        flex: 1,
    },
    addChildTitle: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 2,
    },
    addChildSubtitle: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.9)',
    },

    listHeader: {
        paddingHorizontal: 4,
        marginBottom: 12,
    },
    listHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    listTitle: {
        fontSize: 18,
        color: '#FFF',
    },
    listSubtitle: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 28,
    },

    childCard: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 20,
        padding: 16,
        margin: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 20
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 5,
        marginBottom: 8,
    },
    statusActive: {
        backgroundColor: 'rgba(72, 187, 120, 0.2)',
    },
    statusInactive: {
        backgroundColor: 'rgba(160, 174, 192, 0.2)',
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    statusDotActive: {
        backgroundColor: '#00f365',
    },
    statusDotInactive: {
        backgroundColor: '#A0AEC0',
    },
    statusText: {
        fontSize: 10,
        color: '#FFD700',
    },
    childImageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    childImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    childImageBorder: {
        position: 'absolute',
        top: -3,
        left: -3,
        right: -3,
        bottom: -3,
        borderRadius: 38,
        borderWidth: 2,
        borderColor: 'rgba(255, 215, 0, 0.4)',
    },
    childName: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 4,
        lineHeight: 18,
    },
    childClass: {
        fontSize: 12,
        color: '#CBD5E1',
        textAlign: 'center',
        marginBottom: 25,
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(27, 73, 125, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },




    waitingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 60,
        paddingTop: 138
    },
    waitingVideoContainer: {
        width: 80,
        height: 80,
        borderRadius: 80,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    waitingVideo: {
        width: '90%',
        height: '90%',
    },
    waitingTitle: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    waitingMessage: {
        fontSize: 14,
        color: '#E2E8F0',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 10,
    },

    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B497D',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 10,
        marginTop: 20,
        elevation: 4,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    refreshButtonText: {
        color: '#FFF',
        fontSize: 16,
    },



    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: 124.5,
    },
    welcomeVideoContainer: {
        width: 90,
        height: 90,
        borderRadius: 70,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10,
    },
    welcomeVideo: {
        width: '85%',
        height: '85%',
    },
    welcomeTitle: {
        fontSize: 24,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 1,
    },
    welcomeMessage: {
        fontSize: 15,
        color: '#E2E8F0',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    welcomeIconRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },

    subscribeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B497D',
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 30,
        gap: 10,
        width: '100%',
        elevation: 6,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
    },
    subscribeButtonText: {
        flex: 1,
        color: '#FFF',
        fontSize: 17,
        textAlign: 'center',
    },
});