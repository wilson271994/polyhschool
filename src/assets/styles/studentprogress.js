import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const C = {
    text: "#e8edf5",
    headerBg: "#0d1520",
};

export const progressstyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
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


    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 15,
        marginBottom: 2,
    },
    Card: {
        width: '25%',
        padding: 2,
    },
    statCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 10,
        padding: 10
    },
    statValue: {
        fontSize: 16,
        color: '#2c3e50',
    },
    statLabel: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
    },
    tableContainer: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 18,
    },
    subjectRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    subjectInfo: {
        flex: 1,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    teacherName: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 3,
    },
    gradeContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    grade: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2c3e50',
    },
    lastUpdate: {
        fontSize: 14,
        color: '#95a5a6',
        width: 85,
        textAlign: 'right',
    },

    footer: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 30,
        paddingBottom: 20,
    },



    // ========== BOUTON HISTORIQUE ==========
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1B497D',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 4,
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        gap: 10,
    },
    historyButtonText: {
        flex: 1,
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
    },

    // ========== MODALE HISTORIQUE ==========
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        maxHeight: '85%',
        paddingBottom: 24,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalTitle: {
        fontSize: 20,
        color: '#1B497D',
    },
    modalCloseButton: {
        padding: 4,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        paddingHorizontal: 20,
        paddingTop: 6,
        paddingBottom: 14,
    },

    // ========== TABLEAU SÉQUENCES ==========
    sequenceTableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 4,
    },
    sequenceHeaderCell: {
        fontSize: 12,
        color: '#1B497D',
        textAlign: 'center',
    },
    sequenceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sequenceCell: {
        fontSize: 13,
        color: '#2C3E50',
        textAlign: 'center',
    },

    // ========== BOUTON FERMER MODALE ==========
    modalCloseFullButton: {
        backgroundColor: '#1B497D',
        marginHorizontal: 16,
        marginTop: 16,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalCloseFullButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});