import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const schooldetailstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011638', // Dark background derived from primary #023b8a 
    },

    // Ambient Glowing Orbs
    topGlow: {
        position: 'absolute',
        top: -70,
        right: -70,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(2, 59, 138, 0.55)', // Primary #023b8a
    },
    centerGlow: {
        position: 'absolute',
        top: '35%',
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
        backgroundColor: 'rgba(246, 161, 0, 0.25)', // Accent #f6a100
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },

    // Top Header Navigation Bar
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(2, 59, 138, 0.4)',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    headerBadge: {
        color: '#f6a100', // Accent #f6a100
        fontSize: 10,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
    },

    // Glassmorphic Profile Card
    profileCard: {
        backgroundColor: 'rgba(2, 59, 138, 0.45)', // Primary #023b8a translucent fill
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: 'rgba(246, 161, 0, 0.25)', // Accent #f6a100 border
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    ImageContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#f6a100', // Gold ring around logo
        backgroundColor: '#011638',
    },

    rowTitle: {
        justifyContent: 'center',
        paddingVertical: 6,
    },
    valueTitle: {
        fontSize: 22,
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.3,
    },

    etoilesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 12,
    },
    etoileIcon: {
        marginHorizontal: 3,
    },

    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        marginVertical: 18,
    },

    labelValue: {
        fontSize: 13,
        color: '#f6a100', // Gold title label
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    htmlWrapper: {
        paddingVertical: 4,
    },

    Row: {
        paddingVertical: 10,
    },
    sectionTitleHeader: {
        fontSize: 12,
        color: '#f6a100', // Accent #f6a100
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 14,
    },

    // Graph Styles
    graphContainer: {
        marginTop: 8,
        marginBottom: 10,
    },
    graphTitle: {
        fontSize: 13,
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    graphContent: {
        flexDirection: 'row',
        height: 180,
    },
    yAxis: {
        width: 35,
        height: 140,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: 6,
        marginTop: 10,
    },
    yAxisLabel: {
        fontSize: 10,
        color: '#94A3B8',
    },
    barsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        borderLeftWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingLeft: 8,
        paddingBottom: 4,
        height: 150,
    },
    barColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: 2,
    },
    percentageAbove: {
        fontSize: 10,
        color: '#f6a100',
        marginBottom: 4,
        textAlign: 'center',
    },
    barWithName: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    bar: {
        width: 28,
        backgroundColor: '#f6a100', // Gold active bars
        borderRadius: 6,
        minHeight: 4,
    },
    nullBar: {
        width: 28,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderStyle: 'dashed',
    },

    examNamesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingLeft: 35,
        marginTop: 8,
        height: 50,
    },
    examNameWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    examName: {
        fontSize: 9,
        color: '#CBD5E1',
        textAlign: 'center',
    },

    // Majors / Filières
    filieresContainer: {
        marginTop: 16,
        marginBottom: 10,
    },
    filieresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filiereChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(246, 161, 0, 0.25)',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    filiereDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#f6a100',
        marginRight: 8,
    },
    filiereName: {
        fontSize: 12,
        color: '#FFFFFF',
    },

    // Localisation Section
    localisationContainer: {
        marginTop: 16,
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.12)',
        paddingTop: 16,
    },
    localisationContent: {
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    localisationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIconContainer: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: 'rgba(246, 161, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    locationTextContainer: {
        flex: 1,
    },
    locationAddress: {
        fontSize: 13,
        color: '#FFFFFF',
        marginBottom: 8,
        lineHeight: 18,
    },
    openMapContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6a100',
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    openMapIcon: {
        marginRight: 6,
    },
    openMapText: {
        fontSize: 11,
        color: '#011638',
    },

    // Contact Section
    contactContainer: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.12)',
        paddingTop: 16,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        marginBottom: 10,
    },
    contactItemLast: {
        marginBottom: 0,
    },
    contactIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: 'rgba(246, 161, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactTextContainer: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 10,
        color: '#94A3B8',
        marginBottom: 2,
    },
    contactValue: {
        fontSize: 13,
        color: '#FFFFFF',
    },
});

// HTMLView Custom Typography and Color Mapping
export const htmlStyles = StyleSheet.create({
    p: {
        color: '#CBD5E1',
        fontSize: 13,
        lineHeight: 20,
        fontFamily: 'AniversRegular',
    },
    b: {
        color: '#FFFFFF',
        fontFamily: 'AniversBold',
    },
    strong: {
        color: '#f6a100',
        fontFamily: 'AniversBold',
    },
});