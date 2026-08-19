import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const archivedstyle = StyleSheet.create({
    subtitle: {
        color: '#DDD',
        fontSize: 12,
        marginTop: 2,
    },
    archivedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6B7280',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 10,
    },
    backButton: {
        paddingRight: 10,
    },
    archivedBadgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#CCC',
        marginTop: 20,
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#AAA',
        marginTop: 8,
        textAlign: 'center',
    },
});