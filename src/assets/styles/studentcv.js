
import { StyleSheet } from 'react-native';

export const C = {
    text: '#e8edf5',
    headerBg: '#0d1520',
};

export const cvstyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },

    // ========== HEADER ANIMÉ ==========
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: `${C.headerBg}CC`,
        zIndex: 100,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 7,
        paddingRight: 8,
        right: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: C.text,
        marginLeft: 10,
    },

    // ========== BOUTON AJOUT ==========
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B497D',
        marginHorizontal: 20,
        marginTop: 12,
        paddingVertical: 14,
        borderRadius: 16,
        gap: 10,
        elevation: 4,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 15,
    },

    // ========== COMPTEUR ==========
    counterText: {
        fontSize: 13,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 12,
        opacity: 0.8,
    },

    // ========== LISTE ==========
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 30,
    },

    // ========== CARTE CV ==========
    cvCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 14,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    cvCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        gap: 12,
    },
    cvCardIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EBF4FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cvCardHeaderInfo: {
        flex: 1,
    },
    cvCardTitle: {
        fontSize: 16,
        color: '#1A202C',
    },
    cvCardDate: {
        fontSize: 12,
        color: '#7F8C8D',
        marginTop: 2,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 5,
    },
    statusText: {
        fontSize: 12,
    },
    cvCardBody: {
        padding: 14,
    },
    cvSectionLabel: {
        fontSize: 13,
        color: '#1B497D',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cvDescription: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
    },
    hobbiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    hobbyChip: {
        backgroundColor: '#F0F4FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6E4FF',
    },
    hobbyChipText: {
        fontSize: 12,
        color: '#1B497D',
    },

    // ========== VIDE ==========
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyTitle: {
        fontSize: 20,
        color: '#FFF',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#CCC',
        textAlign: 'center',
        lineHeight: 20,
    },

    // ========== MODALE ==========
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
    modalScrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 10,
    },

    // ========== CHAMPS FORMULAIRE ==========
    inputLabel: {
        fontSize: 15,
        color: '#1A202C',
        marginBottom: 8,
    },
    inputHint: {
        fontSize: 12,
        color: '#A0AEC0',
        marginBottom: 12,
    },
    textArea: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: '#1A202C',
        minHeight: 100,
    },

    // ========== GRILLE LOISIRS ==========
    hobbiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    hobbyCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 8,
        width: '48%',
    },
    hobbyCheckboxActive: {
        backgroundColor: '#EBF4FF',
        borderColor: '#1B497D',
    },
    hobbyCheckboxLabel: {
        fontSize: 13,
        color: '#6B7280',
        flex: 1,
    },
    hobbyCheckboxLabelActive: {
        color: '#1B497D',
    },

    // ========== BOUTON SOUMETTRE ==========
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B497D',
        marginHorizontal: 20,
        marginTop: 18,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 8,
        elevation: 3,
        shadowColor: '#1B497D',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#CBD5E1',
        elevation: 0,
        shadowOpacity: 0,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
    },

});