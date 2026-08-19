import { StyleSheet, Dimensions } from 'react-native';

export const MAP_SIZE = Dimensions.get('window').width - 40;

export const hostingstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    headerHorizontal: {
        elevation: 2,
        paddingVertical: 10,
        marginTop: 10
    },
    navScroll: {
        paddingHorizontal: 10
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#f0f4f8'
    },
    navItemActive: {
        backgroundColor: '#1B497D'
    },
    navText: {
        marginLeft: 5,
        color: '#1B497D',
    },
    navTextActive: {
        color: '#fff'
    },
    contentArea: {
        flex: 1
    },
    content: {
        padding: 20
    },
    backText: {
        color: '#fff',
        marginLeft: 5
    },
    title: {
        fontSize: 22,
        color: '#FFF',
        marginBottom: 15,
    },
    roomCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardView: {
        flex: 1,
        marginLeft: 15
    },
    roomTitle: {
        color: '#1B497D',
    },
    roomSub: {
        color: '#666',
        marginVertical: 2
    },
    roomText: {
        fontSize: 18,
        marginVertical: 10,
        color: '#666',
    },
    roomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    text: {
        marginLeft: 10,
        color: '#666',
    },
    radarContainer: {
        width: MAP_SIZE,
        height: MAP_SIZE,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        borderColor: '#1B497D33'
    },
    radar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#1B497D11',
        top: MAP_SIZE / 2 - 50,
        left: MAP_SIZE / 2 - 50
    },
    Radar: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#1B497D11',
        top: MAP_SIZE / 2 - 100,
        left: MAP_SIZE / 2 - 100
    },
    summaryBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        marginBottom: 20
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
    },
    detailContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    descriptionText: {
        color: '#444',
        lineHeight: 22,
        marginBottom: 20
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    headerSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    addBtn: {
        backgroundColor: '#10B981',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center'
    },
    addText: {
        color: '#fff',
        marginLeft: 5,
    },
    legendCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#1B497D',
        elevation: 3,
        marginBottom: 15,
    },
    legendView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    legendText: {
        color: '#1B497D'
    },
    currentText: {
        fontSize: 22,
        marginVertical: 10,
        color: '#333'
    },
    currentView: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10
    },
    paieText: {
        fontWeight: 'bold',
        marginTop: 5
    },
    totalView: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#1B497D',
        borderRadius: 10
    },
    totalText: {
        color: '#1B497D',
        textAlign: 'center',
    },
    totaltext: {
        color: '#FFF',
        textAlign: 'center',
    },
    abonnementContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    abonnementText: {
        color: '#FFF',
        marginTop: 10
    },
    label: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 10,
    },
    radarGridH: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: '#CBD5E1',
        top: '50%'
    },
    radarGridV: {
        position: 'absolute',
        height: '100%',
        width: 1,
        backgroundColor: '#CBD5E1',
        left: '50%'
    },
    schoolMarker: {
        position: 'absolute',
        zIndex: 10,
        left: MAP_SIZE / 2 - 13,
        top: MAP_SIZE / 2 - 13,
    },
    busMarkerContainer: {
        zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 20
    },
    busMarkerCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    PriceContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginTop: 2
    },
    PriceText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#333'
    },
    planGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    planCard: {
        flex: 1,
        backgroundColor: '#6ca1df',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 4,
        alignItems: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eee'
    },
    planCardActive: {
        backgroundColor: '#1B497D',
        borderColor: '#1B497D'
    },
    planLabel: {
        fontSize: 12,
        color: '#1B497D',
        marginTop: 5
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        color: '#333'
    },
    submitBtn: {
        backgroundColor: '#1B497D',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    allocationCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2
    },
    allocation: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Text: {
        fontSize: 12,
        color: '#1B497D'
    },
    driver: {
        color: '#333'
    },
    place: {
        fontSize: 12,
        color: '#666'
    },
    Speed: {
        color: '#1B497D'
    },

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
});