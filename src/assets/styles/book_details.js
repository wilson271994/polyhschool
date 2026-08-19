import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#1E3A5F',
    accent: '#48BB78',
    accent2: '#1B497D',
    white: '#FFFFFF',
    light: '#F7FAFC',
    dark: '#1A202C',
    gray: '#A0AEC0',
    gold: '#D69E2E',
};

export const bookdetailstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
    },
    scrollArea: {
        flex: 1,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(13, 21, 32, 0.9)',
        zIndex: 100,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        color: COLORS.white,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 8,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.85)',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    cover: {
        width: 140,
        height: 210,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        color: COLORS.dark,
        textAlign: 'center',
        marginBottom: 6,
    },
    author: {
        fontSize: 18,
        color: COLORS.gray,
        marginBottom: 10,
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBF4FF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6,
    },
    categoryText: {
        color: COLORS.primary,
        fontWeight: '600',
        fontSize: 13,
    },
    section: {
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E2E8F0',
    },
    label: {
        fontSize: 15,
        color: COLORS.gray,
    },
    value: {
        fontSize: 15,
        color: COLORS.dark,
        flex: 1,
        textAlign: 'right',
    },
    summaryText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#4A5568',
    },
    readButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.accent2,
        marginHorizontal: 16,
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 10,
        elevation: 3,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    readButtonText: {
        color: COLORS.white,
        fontSize: 17,
    },

    // Modal lecture
    readerContainer: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    readerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        backgroundColor: COLORS.white,
    },
    readerTitle: {
        fontSize: 18,
        color: COLORS.dark,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 8,
    },

    // Chaque page
    pageContainer: {
        width: width - 40, // marges latérales
        flex: 1,
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    pageScroll: {
        flex: 1,
    },
    pageNumber: {
        fontSize: 13,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: 10,
    },
    pageText: {
        fontSize: 17,
        lineHeight: 28,
        color: COLORS.dark,
        textAlign: 'justify',
    },

    readerFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        backgroundColor: COLORS.white,
    },
    navButton: {
        padding: 8,
        borderRadius: 20,
    },
    navButtonDisabled: {
        opacity: 0.3,
    },
    pageIndicator: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CBD5E1',
    },
    dotActive: {
        backgroundColor: COLORS.primary,
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    buyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B497D',
        marginHorizontal: 16,
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 10,
        elevation: 3,
        shadowColor: '##1B497D',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buyButtonText: {
        color: '#FFF',
        fontSize: 17
    },
    paidButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.accent,
        marginHorizontal: 16,
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 10,
    },
    paidButtonText: {
        color: '#FFF',
        fontSize: 17
    },
    paymentOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(15,23,42,0.6)'
    },
    paymentModal: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 24,
        maxHeight: '80%'
    },
    paymentHandle: {
        width: 36,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 8
    },
    paymentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    paymentTitle: {
        fontSize: 20,
        color: COLORS.dark
    },
    paymentAmount: {
        fontSize: 18,
        color: COLORS.accent,
        paddingHorizontal: 20,
        marginBottom: 4
    },
    paymentSubtitle: {
        fontSize: 14,
        color: COLORS.gray,
        paddingHorizontal: 20,
        marginBottom: 16
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginHorizontal: 16,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 12
    },
    paymentMethodActive: {
        borderColor: COLORS.accent,
        backgroundColor: '#F0FDF4'
    },
    paymentMethodText: {
        flex: 1,
        fontSize: 15,
        color: COLORS.dark
    },
    validateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginHorizontal: 16,
        marginTop: 16,
        paddingVertical: 14,
        borderRadius: 30,
        gap: 8
    },
    validateButtonDisabled: {
        backgroundColor: '#CBD5E1'
    },
    validateButtonText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16
    },
    successContainer: {
        alignItems: 'center',
        paddingVertical: 40
    },
    successText: {
        fontSize: 20,
        color: COLORS.accent,
        marginTop: 12
    },
});