import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const coursestyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#1B497D',
        padding: 12,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    searchContainer: {
        marginLeft: "auto",
        marginRight: 10
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#FFF',
    },
    headerTitle: {
        fontSize: 24,
        color: '#fff',
    },
    view: {
        marginTop: 20,
    },
    subjectTitle: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 15,
    },
    courseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    courseIcon: {
        width: 60,
        height: 60,
        borderRadius: 0,
        backgroundColor: '#fff',
        marginRight: 15,
    },
    courseDetails: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 16,
        color: '#333',
    },
    courseTeacher: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },


    backButton: {
        marginRight: 20
    },
    // ========== FLATLIST ==========
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 80,
    },

    waitingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 60,
    },
    waitingVideoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
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
});
