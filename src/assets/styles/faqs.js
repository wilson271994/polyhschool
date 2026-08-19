import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const C = {
    bg: "#0a0e14",
    surface: "#1B497D",
    surfaceAlt: "#1B497D",
    accent: '#a8820e',
    accentDim: "#1a9e4a",
    accentGlow: "rgba(37,211,102,0.18)",
    text: "#e8edf5",
    textMuted: "#7a8ba0",
    textTime: "#5a6b7d",
    border: "rgba(255,255,255,0.06)",
    headerBg: "#0d1520",
    inputBg: "#151d2b",
    red: "#e05c5c",
    blue: "#4a9eff",
    yellow: "#FFD700",
    shadow: "0 8px 32px rgba(0,0,0,0.55)",
};

export const faqstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.bg,
    },
    scrollView: {
        flex: 1,
    },

    // Header
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
    headerSection:{
        flexDirection: 'row',
    },
    headertext:{
        width: '85%',
        padding: 5
    },
    headerTitle: {
        fontSize: 20,
        color: C.text,
    },
    headerbuttonContainer:{
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: C.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButton1: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: C.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
        left: 140,
        top: 50
    },
    // Hero Section
    heroSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: C.surface,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    heroContent: {
        alignItems: 'center',
        marginBottom: 30,
    },
    heroTitle: {
        fontSize: 28,
        color: C.text,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 16,
        color: C.textMuted,
        textAlign: 'center',
    },

    // Search
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.inputBg,
        borderRadius: 16,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: C.border,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        color: C.text,
        fontSize: 16,
    },

    // Categories
    categoriesContainer: {
        marginBottom: 20,
    },
    categoriesContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: C.surface,
        borderWidth: 1,
        borderColor: C.border,
    },
    categoryChipActive: {
        backgroundColor: C.accent,
        borderColor: C.accent,
    },
    categoryChipText: {
        color: C.textMuted,
        fontSize: 14,
    },
    categoryChipTextActive: {
        color: '#fff',
    },

    // FAQ List
    faqList: {
        paddingHorizontal: 20,
        gap: 15,
    },
    faqCard: {
        backgroundColor: C.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: C.border,
        overflow: 'hidden',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    faqHeaderLeft: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        gap: 15,
    },
    faqIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: `${C.accent}20`,
        alignItems: 'center',
        justifyContent: 'center',
    },
    faqInfo: {
        flex: 1,
        gap: 6,
    },
    faqCategoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: `${C.accent}15`,
        borderRadius: 12,
    },
    faqCategoryText: {
        color: C.accent,
        fontSize: 11,
    },
    faqQuestion: {
        fontSize: 16,
        color: C.text,
        lineHeight: 22,
        flex: 1,
    },
    faqAnswerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: C.border,
    },
    faqAnswer: {
        fontSize: 14,
        color: C.textMuted,
        lineHeight: 22,
        marginVertical: 15,
    },
    faqActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    faqStats: {
        flexDirection: 'row',
        gap: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    statText: {
        color: C.textMuted,
        fontSize: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 15,
    },
    actionButton: {
        padding: 5,
    },

    // Contact Section
    contactSection: {
        marginTop: 17,
        marginHorizontal: 20,
        padding: 30,
        backgroundColor: C.surfaceAlt,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: C.border,
        marginBottom: 20,
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: C.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    contactSubtitle: {
        fontSize: 14,
        color: C.textMuted,
        textAlign: 'center',
        marginBottom: 20,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.accent,
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderRadius: 25,
        gap: 10,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 15,
    },
    emptyStateTitle: {
        fontSize: 18,
        color: C.text,
    },
    emptyStateSubtitle: {
        fontSize: 14,
        color: C.textMuted,
        textAlign: 'center',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: C.surface,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        maxHeight: height * 0.8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: C.text,
    },
    modalLabel: {
        fontSize: 16,
        color: C.text,
        marginBottom: 12,
        marginTop: 15,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    ratingStar: {
        padding: 10,
    },
    ratingStarActive: {
        transform: [{ scale: 1.1 }],
    },
    modalInput: {
        backgroundColor: C.inputBg,
        borderRadius: 16,
        padding: 15,
        color: C.text,
        fontSize: 14,
        minHeight: 120,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: C.border,
    },
    modalSubmitButton: {
        backgroundColor: C.accent,
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
    },
    modalSubmitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // Floating Button
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 200,
    },
    floatingButtonTouch: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: C.accent,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        bottom: 50
    },

    // Toast
    toast: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        backgroundColor: C.surfaceAlt,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        gap: 10,
        borderWidth: 1,
        borderColor: C.border,
        zIndex: 300,
    },
    toastText: {
        color: C.text,
        fontSize: 14,
    },

    footer: {
        height: 30,
    },
});