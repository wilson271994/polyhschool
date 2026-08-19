import { StyleSheet, Dimensions } from 'react-native';
import { C } from './chat'; // adapte le chemin si nécessaire

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 48 - CARD_MARGIN) / 2;

export const COLORS = {
    primary: '#1A3C6E',
    surface: '#FFFFFF',
    textDark: '#1F2937',
    textLight: '#6B7280',
    accent: '#F59E0B',
    photo: '#EC4899',
    video: '#8B5CF6',
    document: '#3B82F6',
    link: '#10B981',
    textInverse: '#FFFFFF',   // nécessaire pour le texte blanc sur fond primaire
};

export const mediastyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: C.header,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    backButton: {
        paddingRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        flex: 1,
        color: '#FFF',
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#FFF',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    headerIconContainer: {
        top: 8,
    },
    filterContainer: {
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        padding: 4,
        marginBottom: 10,
        shadowColor: '#1A3C6E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 11,
        gap: 6,
    },
    tabButtonActive: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    tabButtonText: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    tabButtonTextActive: {
        color: COLORS.textInverse,
    },
    listContainer: {
        paddingHorizontal: 12,
        paddingBottom: 40,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: CARD_MARGIN,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    previewContainer: {
        height: 110,
        backgroundColor: '#F3F4F6',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    iconPreview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    extensionBadge: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    favicon: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 4,
    },
    typeBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    typeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    durationBadge: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        gap: 3,
    },
    durationText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '600',
    },
    infoContainer: {
        padding: 10,
    },
    fileName: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    metaText: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 30,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 40,
        fontSize: 16,
        color: '#1F2937',
    },
    cancelButton: {
        marginLeft: 10,
        justifyContent: 'center',
    },
});