import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const settingstyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 35,
        flex: 1
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
    headerTitle: {
        fontSize: 24,
        color: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 60
    },
    sectionTitle: {
        fontSize: 16,
        color: '#FFF',
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
        padding: 10,
        justifyContent: 'center',

    },
    flexrowitem: {
        flexDirection: 'row'
    },
    containericonimg: {
        backgroundColor: '#eee',
        borderRadius: 100,
        width: 40,
        height: 40,
        padding: 6,
        justifyContent: 'center',
        alignContent: 'center'
    },
    switchContainer: {
        marginLeft: 100,
    },
    labelmenucont: {
        marginLeft: 20,
    },
    itemlisttext: {
        fontSize: 15,
        color: '#FFF'
    },
    itemlisthelptext: {
        marginTop: 5,
        color: '#FFF'
    },
    textItalicBold: {
        fontFamily: 'UbuntuBold-1YyB',
        fontStyle: 'italic'
    },
    bloccontainer: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10
    },
    iconimage: {
        height: 25,
        width: 25,
        tintColor: '#666',
        alignSelf: 'center'
    },
    logoutimage: {
        height: 25,
        width: 25,
        tintColor: 'red'
    },

    //Style Modal Create Ticket
    modalContainer: {
        backgroundColor: '#eee',
        flex: 1
    },
    loginbox: {
        height: 'auto',
        marginTop: 30,
        width: '85%',
        padding: 20,
        left: 30,
        backgroundColor: '#1B497D',
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
        backgroundColor: "#1B497D",
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

    /**********SUPPORT CHAT**********/

    container3: {
        backgroundColor: '#fff',
    },
    container4: {
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 60,
        width: '80%',
    },
    scrollContainer: {
        padding: 20,
    },
    inputSearch: {
        height: 40,
        width: '80%',
        borderColor: '#ECB817',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#1B497D',
        borderWidth: 1,
        marginTop: 558,
        flexDirection: 'row',
    },
    SearchBar: {
        color: '#fff',
        width: '70%',
    },
    icons: {
        position: 'absolute',
        left: 20,
        top: 11,
        zIndex: 999,
    },
    image: {
        position: 'absolute',
        left: 270,
        top: 10,
        zIndex: 999,
    },
    btnsubmit: {
        borderRadius: 15,
        backgroundColor: '#ECB817',
        borderColor: '#fff',
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: 60,
        height: 45,
        position: 'absolute',
        left: 325,
        top: 553,
    },
    btnsubmit1: {
        backgroundColor: '#ECB817',
    },
    option: {
        marginBottom: 20
    },
    exit: {
        color: '#ff0000',
        alignSelf: 'center'
    },
    exitcontainer: {
        padding: 10
    }
});