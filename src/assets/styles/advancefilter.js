import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers'
const { width } = Dimensions.get('window');
const DAY_CELL_SIZE = Math.min((width - 48) / 8, 50);
export const advancefilterstyle = StyleSheet.create({

    container: { flex: 1, backgroundColor: '#f8f9fa' },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 30,
        paddingHorizontal: 18,
        elevation: 4,
        height: 40,
    },
    searchInput: {
        marginLeft: 5,
        fontSize: 16,
        color: '#333',
        width: '90%'
    },
    close:{
        right:15
    },
    filterSection: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    filterTitle: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 12,
        marginTop: 20
    },

    chipScroll: { marginBottom: 8 },
    smallChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 16,
        borderRadius: 25,
        marginRight: 10,
        gap: 5,
        height: 30,
    },
    smallChipActive: {
        backgroundColor: '#1B497D',
    },
    smallChipText: {
        fontSize: 14,
        color: '#555',
    },
    smallChipTextActive: {
        color: '#fff'
    },

    typeChipRow: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap'
    },

    resultsCountContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    resultsCount: {
        fontSize: 14,
        color: '#FFF'
    },

    listContent: {
        padding: 16,
        paddingBottom: 40
    },
    remarkCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
    },
    remarkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14
    },
    subjectIcon: {
        width: 50,
        height: 50,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subjectInfo: {
        flex: 1,
        marginLeft: 14
    },
    subjectName: {
        fontSize: 16,
        color: '#222'
    },
    teacherName: {
        fontSize: 14,
        color: '#666'
    },
    date: {
        fontSize: 12,
        color: '#888'
    },
    remarkTitle: {
        fontSize: 16,
        color: '#222',
        marginBottom: 8
    },
    remarkComment: {
        fontSize: 14,
        lineHeight: 22,
        color: '#444'
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    typeBadge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    positiveBadge: {
        backgroundColor: '#E8F5E9'
    },
    warningBadge: {
        backgroundColor: '#FFF3E0'
    },
    positiveText: {
        color: '#4CAF50',
        fontWeight: '600',
        fontSize: 13
    },
    warningText: {
        color: '#FF9800',
        fontWeight: '600',
        fontSize: 13
    },
    emptyText: {
        textAlign: 'center',
        color: '#FFF',
        marginTop: 60,
        fontSize: 16
    },
});