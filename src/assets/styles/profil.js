import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const C = {
    text: "#e8edf5",
    headerBg: "#0d1520",
};

export const profilstyle = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 60
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: `${C.headerBg}CC`,
        backdropFilter: 'blur(10px)',
        zIndex: 100,
    },
    headerSection: {
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 20,
        color: C.text,
    },
    headerbuttonContainer: {
    },
    headerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 7,
        paddingRight: 8,
        right: 10
    },



    bloccontainer: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10
    },
    paramitem: {
        marginBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10
    },
    flexrowitem: {
        flexDirection: 'row'
    },
    containericonimg: {
        backgroundColor: '#eee',
        borderRadius: 100,
        width: '13%',
        padding: 8
    },
    iconimage: {
        height: 25,
        width: 25
    },
    labelmenucont: {
        marginLeft: 20
    },
    itemlisttext: {
        fontSize: 15,
        color: '#666'
    },
    itemlisthelptext: {
        marginTop: 5
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6d6d6d',
    },
    logoutContainer: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    textlogout: {
        textAlign: 'center',
        fontSize: 15,
        color: '#666'
    },

    // Profil form
    containerform: {
        flex: 1,
    },
    scroolviecontainer: {
    },
    headerpageform: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    section: {
        top: 5,
        right: 10
    },
    titlepageform: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20
    },
    formcontainer: {
        backgroundColor: "rgba(27, 73, 125, 0.6)",
        borderRadius: 15,
        marginTop: 20,
        padding: 15,
        width: '95%',
        marginLeft: 10,
        marginRight: 10
    },
    formitem: {
        marginBottom: 10
    },
    label: {
        fontSize: 15,
        color: '#FFF',
        marginBottom: 10,
        marginTop: 10
    },
    inputContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        padding: 10,
        height: 45,
    },
    inputext: {
        color: '#FFF'
    },
    placeholderStyle: {
        color: '#FFF',
        marginLeft: 10
    },
    selectedTextStyle: {
        color: '#FFF'
    },
    itemTextStyle: {
        color: '#999'
    },
    submitButton: {
        backgroundColor: '#1B497D',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    },

    //Notification Style
    formcheckitem: {
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 0.2,
        paddingBottom: 20,
    },
    labelcheckitem: {
        width: '85%'
    },
    checkbtncont: {
        width: '10%',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    sublabel: {
        color: '#FFF'
    },
    checkbtn: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        height: 25,
        width: 25,
        padding: 5
    },
    ischeckbtn: {
        borderWidth: 1,
        borderColor: '#ECB818',
    },
    ischeckicon: {
        color: '#ECB818',
    },

    //KYC
    containerimagekyc: {
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        height: 200,
    },
    iconcontaineridcard: {
        padding: 100,
    },
    idcardimage: {
        height: 70,
        width: 70,
    },
    approvedimage: {
        position: 'absolute',
        right: -50,
        top: 20
    },
    verifiedcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.6,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 5,
        padding: 20,
        margin: 20
    },
    messagetext: {
        color: '#000',
        textAlign: 'center'
    },
    btnbackpending: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#6DCABB',
        padding: 10,
        borderRadius: 8
    },
    btnbackpendingtext: {
        color: '#fff'
    },
    verifypendingicon: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 20,
        color: '#137a71'
    },

    //Update profil
    passwordInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        height: 45,
        paddingRight: 10,
        backgroundColor: 'transparent',
    },



    filterContainer: {
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 4,
        marginBottom: 10,
        shadowColor: '#1A3C6E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 11,
        gap: 6,
    },
    tabButtonActive: {
        backgroundColor: '#1A3C6E', 
        shadowColor: '#1A3C6E',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    tabButtonText: {
        fontSize: 13,
        color: '#7B93B0',
        fontWeight: '600',
    },
    tabButtonTextActive: {
        color: '#FFFFFF',
    },
});