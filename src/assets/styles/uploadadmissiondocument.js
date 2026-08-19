import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
    primary: '#1B497D',
    primaryLight: '#2460A7',
    accent: '#F59E0B',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    white: '#FFFFFF',
    light: '#F8FAFC',
    dark: '#1A202C',
    gray: '#94A3B8',
    grayLight: '#CBD5E1',
    grayDark: '#64748B',
    border: '#E2E8F0',
    overlay: 'rgba(15, 23, 42, 0.6)',
    cardBg: '#FFFFFF',
    progressBg: 'rgba(255,255,255,0.1)',
};

export const uploadstyle = StyleSheet.create({

    container: {
        flex: 1,
    },
    containerform: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80,
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(13, 21, 32, 0.85)',
        zIndex: 100,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerbuttonContainer: {},
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    headertext: {
        flex: 1,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },

    section: {
        marginBottom: 10,
        marginTop: 10
    },
    sectionTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
    },
    back: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
    },
    backstyle: {
        width: 30,
        height: 30,
        tintColor: '#FFF',
    },

    progressContainer: {
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 16,
        backgroundColor: COLORS.progressBg,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.50)',
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    progressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '700',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ECB818',
        borderRadius: 4,
    },

    formcontainer: {
        paddingHorizontal: 16,
        
        marginTop: 50
    },
    documentCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
        shadowColor: '#1A3C6E',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    documentHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        marginBottom: 14,
    },
    documentIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentInfo: {
        flex: 1,
    },
    documentTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    documentTitle: {
        fontSize: 16,
        color: COLORS.dark,
        fontWeight: '700',
        flex: 1,
        lineHeight: 20,
    },
    requiredBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F59E0B',
    },
    requiredText: {
        fontSize: 10,
        color: '#B45309',
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    optionalBadge: {
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    optionalText: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    documentDescription: {
        fontSize: 13,
        color: COLORS.grayDark,
        marginBottom: 4,
        lineHeight: 18,
    },
    documentCategory: {
        fontSize: 11,
        color: COLORS.gray,
        fontStyle: 'italic',
    },

    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F4FF',
        borderWidth: 2,
        borderColor: '#D6E4FF',
        borderStyle: 'dashed',
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 18,
        gap: 10,
    },
    uploadButtonIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0EBFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButtonTextContainer: {
        flex: 1,
    },
    uploadButtonText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    uploadButtonSubtext: {
        fontSize: 11,
        color: COLORS.gray,
        marginTop: 2,
    },

    uploadedFileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    uploadedFileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    uploadedFileIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadedFileDetails: {
        flex: 1,
    },
    uploadedFileName: {
        fontSize: 13,
        color: COLORS.dark,
        fontWeight: '600',
        marginBottom: 3,
    },
    uploadedFileSize: {
        fontSize: 11,
        color: COLORS.gray,
    },
    uploadedFileActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },

    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginHorizontal: 0,
        marginTop: 24,
        marginBottom: 40,
        paddingVertical: 16,
        borderRadius: 30,
        gap: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonDisabled: {
        backgroundColor: '#CBD5E1',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    submitBtnTextDisabled: {
        color: '#94A3B8',
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    emptyText: {
        fontSize: 14,
        color: '#CBD5E1',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 40,
    },

    verifiedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 30,
        gap: 16,
    },
    verifyIcon: {
        fontSize: 64,
        color: '#10B981',
    },
    verifyPendingIcon: {
        fontSize: 64,
        color: '#F59E0B',
    },
    messageText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24,
    },
    backButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 30,
        marginTop: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },

    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        zIndex: 10,
    },
    loadingText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
        marginTop: 8,
    },

    separator: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 16,
        marginHorizontal: 4,
    },

    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    categoryTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    categoryCount: {
        fontSize: 13,
        color: '#CBD5E1',
    },
});