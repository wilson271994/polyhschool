import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const registerstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    back: {
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        marginLeft: 15,
        position: 'absolute',
        zIndex: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 60 : 40,
    },
    logo: {
        width: 150,
        height: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    slogan: {
        fontSize: 20,
        color: '#ffffff',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },

    label: {
        color: '#ffffff',
        fontSize: 15,
        marginTop: 22,
        marginBottom: 8,
        fontWeight: '700',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1.5,
        borderRadius: 12,
        marginBottom: 5,
        minHeight: 55,
        overflow: 'hidden',
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#ffffff',
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 15,
        height: 55,
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        backgroundColor: 'rgba(255, 107, 107, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '600',
    },

    button: {
        backgroundColor: '#1B497D',
        borderRadius: 12,
        marginTop: 30,
        marginHorizontal: 30,
        marginBottom: 40,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },

    dropdown: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1.5,
        borderRadius: 12,
        overflow: 'hidden',
        paddingHorizontal: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        minHeight: 55,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#FFF',
        left: 5
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#FFF',
        left: 5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
        color: '#333',
    },
    dropdownContainer: {
        borderColor: '#e0e0e0',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    itemContainerStyle: {
        marginBottom: -5,
        marginTop: -5
    },
    itemTextStyle: {
        fontSize: 14,
        color: '#333',
    },

    searchText: {
        fontSize: 14,
        color: '#333',
        
    },
    containercondition: {
        flexDirection: 'row',
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbtn: {
        borderColor: '#6dcabb',
        borderWidth: 2,
        width: 25,
        height: 25,
        marginTop: 2,
        padding: 2
    },
    checkicon: {
        color: 'orange',
        fontSize: 16,
        marginRight: 5,
    },
    conditionlink: {
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    conditiontext: {
        color: '#000',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 25
    },

    ...(width <= 375 ? {
        inputContainer: { width: '90%', alignSelf: 'center', marginTop: 5 },
        label: { fontSize: 14, marginTop: 15, color: '#FFF', marginBottom: 5 },
        input: { fontSize: 14, height: 50, color: '#FFF' },
        buttonText: { fontSize: 16, color:"#fff" },
    } : {}),

    ...(width >= 768 ? {
        inputContainer: { width: '70%', maxWidth: 500, alignSelf: 'center', marginTop: 20 },
        label: { fontSize: 18, marginTop: 25 },
        input: { fontSize: 18, height: 60, color: '#FFF' },
        buttonText: { fontSize: 20, color:"#fff" },
        logo: { width: 200, height: 130 },
    } : {}),

    ...Platform.select({
        ios: {
            input: { paddingTop: 0, paddingBottom: 0, color: '#FFF', paddingLeft: 10 },
        },
        android: {
            input: { paddingTop: 8, paddingBottom: 8, color: '#FFF' , paddingLeft: 10 },
        },
    }),
});