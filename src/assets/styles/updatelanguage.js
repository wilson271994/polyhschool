import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const C = {
    text: "#e8edf5",
    headerBg: "#0d1520",
};
export const languagestyle = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1
    },

    Header: {
        marginBottom: 20,
        marginTop: 5,
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

    section: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },

    sectionTitle: {
        fontSize: 12,
        color: '#1B497D',
    },

    selectionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    selectionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    selectionFlag: {
        fontSize: 16,
    },

    selectionTitle: {
        fontSize: 14,
        color: '#222',
    },

    selectionSubtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    // Modals
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: height * 0.9,
        paddingBottom: 20,
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    modalTitle: {
        fontSize: 16,
        color: '#1B497D',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    searchIcon: {
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
    },

    filterChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginBottom: 15,
        gap: 10,
    },

    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    chipActive: {
        backgroundColor: '#1B497D',
        borderColor: '#1B497D',
    },

    chipText: {
        fontSize: 12,
        color: '#666',
    },

    chipTextActive: {
        color: '#fff',
    },

    modalList: {
        maxHeight: height * 0.6,
    },

    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 15,
    },

    modalItemSelected: {
        backgroundColor: '#EFF6FF',
    },

    modalFlag: {
        fontSize: 30,
    },

    modalItemInfo: {
        flex: 1,
    },

    modalItemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },

    modalItemNative: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    modalItemRegion: {
        fontSize: 10,
        color: '#999',
        marginTop: 2,
    },

    noResults: {
        alignItems: 'center',
        padding: 40,
        gap: 15,
    },

    noResultsText: {
        fontSize: 14,
        color: '#999',
    },

    previewCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#EFF6FF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1B497D',
    },

    previewTitle: {
        fontSize: 16,
        color: '#1B497D',
        marginBottom: 15,
    },

    previewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },

    previewText: {
        fontSize: 14,
        color: '#555',
        flex: 1,
    },

    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#1B497D',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        elevation: 5,
    },

    saveButtonAnimate: {
        transform: [{ scale: 0.98 }],
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});