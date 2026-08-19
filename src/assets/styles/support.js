import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const supportstyle = StyleSheet.create({

    scrollContainer: {
        padding: 20,
    },
    Text: {
        fontSize: 18,
        color: '#757171ff',
        marginVertical: 15,
        left: 90,
        top: -70
    },
    image1: {
        height: 60,
        width: 60,
        left: 20,
        top: 25,
        borderRadius: 30,
    },
    Text1: {
        fontSize: 18,
        color: '#000',
        marginVertical: 15,
        marginHorizontal: 25,
        left: 80,
        top: -50,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    icons: {
        position: 'absolute',
        left: 15,
        top: 8,
        zIndex: 999
    },
    btnsubmit: {
        borderRadius: 30,
        backgroundColor: '#ECB817',
        borderColor: '#fff',
        borderWidth: 1,
        width: 60,

        position: 'absolute',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        right: 20,
    },
    textbtnsubmit: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        width: '100%',
    },

    //Style Modal Create Ticket
    modalContainer: {
        backgroundColor: '#1B497D',
    },
    loginbox: {
        height: 'auto',
        marginTop: 30,
        width: '85%',
        padding: 20,
        left: 30,
        backgroundColor: '#6dcabb',
        borderRadius: 20,
        flex: 1
    },
    entetelogin: {
        fontSize: 16,
        color: '#000',
        marginBottom: 2,
        marginTop: 20,
        lineHeight: 30
    },
    entetelogin1: {
        fontSize: 20,
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
        paddingTop: 10,
        marginBottom: 2

    },
    inputtextlogin: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 250, 255, .99)',
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#1B497D',
        color: '#000',
        borderRadius: 30,
        paddingBottom: 8,
    },
    select: {

    },
    image: {
        borderRadius: 20,
        marginTop: 20,
    },
    textbtnsubmit: {
        fontSize: 20,
        color: '#fff',
        left: 30,
        paddingTop: 5,

    },
    btn: {
        borderRadius: 30,
        backgroundColor: "#6dcabb",
        borderColor: '#fff',
        borderWidth: 1,
        paddRingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingight: 20,
        width: 200,
        left: 90
    },
    footerlogin: {
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    icon: {
        position: 'absolute',
        left: 130,
        top: 8,
        zIndex: 999,
    },

    //Chat Support style
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        paddingRight: 15,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#333',
    },
    conversationsList: {
        flex: 1,
        padding: 10,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    conversationDetails: {
        flex: 1,
    },
    conversationSender: {
        fontSize: 16,
        color: '#333',
    },
    conversationTime: {
        fontSize: 14,
        color: '#999',
        marginTop: 2,
    },
    unreadIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF6347', // Couleur rouge pour l'indicateur
    },
    fab: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#1B497D', // Couleur verte
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    fabIcon: {
        width: 40,
        height: 40,
        tintColor: 'white',
    },
    emptycard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.6,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 5,
        padding: 95
    },
    footerlist: {
        paddingVertical: 20,
    },

    //Faq style
    headefaq: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 5,
        marginTop: 5
    },
    faqItemcard: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    faqItem: {
        flexDirection: 'row',
    },
    fapitemtext: {
        width: '90%'
    },
    faqquestiontext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    faqbtncontainer: {
        width: '10%'
    },
    faqbtn: {
        height: 30,
        alignItems: 'center'
    },
    faqbtnicon: {
        fontSize: 20,
        color: '#000'
    },
    containerdetailfaq: {
        marginTop: 10,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        paddingTop: 10
    },
    titledetailfaq: {
        fontSize: 15,
        color: '#666',
        marginBottom: 5
    },




    // Styles pour la modale
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 18,
        color: '#333',
    },
    modalCloseButton: {
        fontSize: 24,
        color: '#999',
        fontWeight: 'bold',
    },
    modalLabel: {
        fontSize: 14,
        color: '#333',
        marginTop: 15,
        marginBottom: 8,
    },
    servicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    serviceButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 5,
        alignItems: 'center',
    },
    serviceButtonSelected: {
        backgroundColor: '#1B497D',
    },
    serviceButtonText: {
        fontSize: 12,
        color: '#333',
    },
    serviceButtonTextSelected: {
        color: '#fff',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
        backgroundColor: '#fafafa',
    },
    modalTextArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    modalCancelButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    modalValidateButton: {
        backgroundColor: '#1B497D',
    },
    modalCancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    modalValidateButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    // Dropdown styles
    dropdown: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#1e3a5e',
        fontWeight: '500',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropdownContainer: {
        borderRadius: 12,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    itemContainerStyle: {
        paddingVertical: 8,
    },
    itemTextStyle: {
        fontSize: 14,
        color: '#333',
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
})