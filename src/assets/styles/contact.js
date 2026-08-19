import { StyleSheet } from 'react-native';

export const contactstyle = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginBottom: 5,
        right: 5
    },
    dots:{
        top: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A3C44',
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        height: 42,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        padding: 0,
    },
    clearButton: {
        padding: 4,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    actionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2A3C44',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    actionText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
    },
    listContent: {
        paddingBottom: 80,
    },
    contactTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    teacher: {
        width: 25,
        height: 25,
        tintColor: '#FFF'
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: 14,
        backgroundColor: '#2A3C44',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 2,
    },
    contactAbout: {
        fontSize: 12,
        color: '#FFF',
    },
    fabContainer: {
        position: 'absolute',
        bottom: 24,
        right: 24,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#00A884',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    fabBadgeText: {
        fontSize: 12,
        color: '#FFF',
    },
});

