import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const schoolstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011638', // Deep background derived from #023b8a
    },

    // Ambient Glowing Orbs
    topGlow: {
        position: 'absolute',
        top: -70,
        right: -70,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(2, 59, 138, 0.55)', // Primary #023b8a glow
    },
    centerGlow: {
        position: 'absolute',
        top: '40%',
        left: -80,
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: 'rgba(2, 59, 138, 0.3)',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -70,
        right: -40,
        width: 270,
        height: 270,
        borderRadius: 135,
        backgroundColor: 'rgba(246, 161, 0, 0.25)', // Accent #f6a100 glow
    },

    // Header & Navigation
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(2, 59, 138, 0.4)', // #023b8a translucent
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTitleWrapper: {
        flex: 1,
    },
    headerBadge: {
        color: '#f6a100', // Brand Accent #f6a100
        fontSize: 10,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        letterSpacing: 0.3,
    },

    // Search Bar
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 59, 138, 0.35)', // #023b8a base
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        height: 54,
        paddingHorizontal: 16,
        marginHorizontal: 20,
        marginBottom: 14,
        shadowColor: '#023b8a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    searchWrapperFocused: {
        borderColor: '#f6a100', // Highlight with Accent #f6a100
        backgroundColor: 'rgba(2, 59, 138, 0.65)',
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 14,
        marginLeft: 10,
    },

    // Result Counter
    resultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 22,
        marginBottom: 14,
    },
    resultCount: {
        color: '#CBD5E1',
        fontSize: 13,
    },
    pulseDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#f6a100', // Accent #f6a100
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },

    list: {
        paddingHorizontal: 20,
    },

    // School Card Container
    cardContainer: {
        backgroundColor: 'rgba(2, 59, 138, 0.45)', // Primary #023b8a translucent card
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: 'rgba(246, 161, 0, 0.25)', // Accent #f6a100 subtle border
        padding: 18,
        marginBottom: 18,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    topHighlightLine: {
        position: 'absolute',
        top: 0,
        left: '5%',
        right: '5%',
        height: 3,
        backgroundColor: '#f6a100', // Accent #f6a100 highlight bar
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    logoWrapper: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#011638',
        borderWidth: 2,
        borderColor: '#f6a100', // Accent #f6a100 ring
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 14,
    },
    schoolLogo: {
        width: '100%',
        height: '100%',
    },
    headerInfo: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    schoolName: {
        color: '#FFFFFF',
        fontSize: 17,
        flex: 1,
        marginBottom: 2,
    },
    verifiedBadge: {
        marginLeft: 6,
    },
    schoolAddress: {
        color: '#93C5FD',
        fontSize: 12,
        marginBottom: 6,
    },
    etoilesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    etoileIcon: {
        marginRight: 2,
    },
    noteTexte: {
        color: '#CBD5E1',
        fontSize: 11,
        marginLeft: 6,
    },
    cardDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        marginVertical: 14,
    },

    // Card Body & Statistics
    cardBody: {
        marginBottom: 16,
    },
    sectionSubtitle: {
        color: '#E2E8F0',
        fontSize: 12,
        marginBottom: 10,
        letterSpacing: 0.2,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(246, 161, 0, 0.2)',
        flex: 0.48,
    },
    statIconBg: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: 'rgba(246, 161, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        color: '#94A3B8',
        fontSize: 10,
    },
    statValue: {
        color: '#f6a100', // Accent #f6a100
        fontSize: 13,
    },
    statValueBlue: {
        color: '#60A5FA',
        fontSize: 13,
    },

    // Action Buttons
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeMoreButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14,
        backgroundColor: 'rgba(2, 59, 138, 0.5)', // Primary #023b8a button
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    seeMoreText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 14,
        backgroundColor: '#f6a100', // Master CTA Accent #f6a100
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    selectText: {
        color: '#011638', // Dark background text for high contrast
        fontSize: 13,
        letterSpacing: 0.4,
    },

    // Placeholders & Loader
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        color: '#94A3B8',
        fontSize: 12,
        marginTop: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 60,
    },
    emptyIconBg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(246, 161, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        marginBottom: 6,
    },
    emptySubtitle: {
        color: '#94A3B8',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },
});