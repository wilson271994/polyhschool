import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const courseparentstyle = StyleSheet.create({

    container: {
        flex: 1,
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
    //NEW


    listHeader: {
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 12,
    },
    listTitle: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 4,
    },
    listSubtitle: {
        fontSize: 14,
        color: '#A0AEC0',
    },

    childGrid: {
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 16,
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
        backgroundColor: '#48BB78',
    },
    statusDotInactive: {
        backgroundColor: '#A0AEC0',
    },
    statusText: {
        fontSize: 10,
        color: '#FFF',
    },
    childImageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    childImage: {
        width: 70,
        height: 70,
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
        marginBottom: 10,
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

    addChildButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B497D',
        marginHorizontal: 20,
        marginTop: 10,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        elevation: 4,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    addChildButtonText: {
        color: '#FFF',
        fontSize: 16,
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        gap: 8,
    },
    emptyText: {
        fontSize: 18,
        color: '#FFF',
        marginTop: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#CBD5E1',
        textAlign: 'center',
        paddingHorizontal: 30,
    },


    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 60,
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

    waitingContainer: {
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 10,
        paddingBottom: 40,
        marginTop: 223
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
});