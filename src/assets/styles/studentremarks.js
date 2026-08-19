import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers'
const { width } = Dimensions.get('window');
const DAY_CELL_SIZE = Math.min((width - 48) / 8, 50);
export const C = {
    text: "#e8edf5",
    headerBg: "#0d1520",
};
export const remarkstyle = StyleSheet.create({
    container: {
        flex: 1,

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


    statsRow: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 14,
        marginHorizontal: 16,
        marginBottom: 20,
        elevation: 3,
        marginTop: 15,
        top: 15
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 16,
        color: '#999',
        marginLeft: 12,
    },

    statBox: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    statNumber: {
        fontSize: 32,
        color: '#333'
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 6
    },

    searchIcon: {
        marginRight: 12
    },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: '#333'
    },
    remarksSection: {
        padding: 16
    },
    listContent: {
        paddingBottom: 40
    },

    remarkCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    remarkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14
    },
    subjectIcon: {
        width: 54,
        height: 54,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subjectInfo: {
        flex: 1,
        marginLeft: 16
    },
    subjectName: {
        fontSize: 16,
        color: '#222'
    },
    teacherName: {
        fontSize: 14,
        color: '#666'
    },
    dateContainer: {
        alignItems: 'flex-end'
    },
    date: {
        fontSize: 14,
        color: '#888'
    },

    remarkTitle: {
        fontSize: 16,
        color: '#222',
        marginBottom: 8
    },
    remarkComment: {
        fontSize: 16,
        lineHeight: 23,
        color: '#444',
        marginBottom: 16
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    typeBadge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 30
    },
    positiveBadge: {
        backgroundColor: '#E8F5E9'
    },
    warningBadge: {
        backgroundColor: '#FFF3E0'
    },
    positiveText: {
        color: '#4CAF50',
        fontSize: 14,
    },
    warningText: {
        color: '#FF9800',
        fontSize: 14,
    },

    footer: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 30
    },
    emptyText: {
        textAlign: 'center',
        color: '#FFF',
        marginVertical: 50,
        fontSize: 16
    },
});
