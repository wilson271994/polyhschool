import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from './theme';

export const navStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },
    bodyContainer: {
        flex: 1,
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: COLORS.bgPrimary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    logoContainer: {
        height: 40,
        width:38,
        justifyContent: 'center',
    },
    logoImage: { 
        width: '100%',
        height: '100%',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBtn: {
        marginLeft: 10,
    },
    videoWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.borderGold,
    },
    supportVideo: {
        width: '100%',
        height: '100%',
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    notifBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: COLORS.accentOrange,
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
    },
    notifBadgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 'bold',
    },

    /* Bottom Navigation Flottante */
    bottomNavContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 20 : 12,
        left: 16,
        right: 16,
        alignItems: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 59, 100, 0.92)',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
        width: '100%',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    iconBoxActive: {
        backgroundColor: COLORS.accentGold,
        shadowColor: COLORS.accentGold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
        padding:8,
        borderRadius:50
    },
    navLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginTop: 2,
    },
    navLabelActive: {
        fontSize: 10,
        color: COLORS.accentGold, 
        fontWeight: 'bold',
    },

    //Middle Page
    headermiddle:{

    },
    headermiddletext:{
        fontSize:18,
        color:"#eee"
    },
    headermiddlesubtext:{
        fontSize: 12,
        color: COLORS.accentCyan,
        marginBottom: 4,
        width:220
    },
    headermiddlesubsubtext:{
        fontSize:13,
        color:"#999",
        fontStyle:'italic'
    }
});
