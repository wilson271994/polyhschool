import { StyleSheet, Platform } from 'react-native';

export const sigupstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011638',
    },

    // Ambient Glow Orbs
    topGlow: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'rgba(2, 59, 138, 0.55)',
    },
    bottomGlow: {
        position: 'absolute',
        bottom: -80,
        right: -50,
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'rgba(246, 161, 0, 0.2)',
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 10 : 5,
        paddingBottom: 30,
    },

    headerRow: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 4,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(2, 59, 138, 0.4)',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Logo & Branding
    logoContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    logo: {
        width: 95,
        height: 95,
        resizeMode: 'contain',
        marginBottom: 2,
    },
    brandBadge: {
        color: '#f6a100',
        fontSize: 10, // Increased badge font size
        letterSpacing: 2.5,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 20, // Increased step title size
        color: '#FFFFFF',
        marginTop: 3,
    },
    slogan: {
        fontSize: 12, // Increased slogan font size
        color: '#94A3B8',
        textAlign: 'center',
    },

    // Form Card
    inputContainer: {
        backgroundColor: 'rgba(2, 59, 138, 0.45)',
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: 'rgba(246, 161, 0, 0.25)',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },

    rowFields: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colField: {
        flex: 0.48,
    },

    label: {
        color: '#CBD5E1',
        fontSize: 12.5, // Increased field label size
        marginTop: 10,
        marginBottom: 5,
    },

    // Inputs
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        height: 48, // Comfortable input height
        paddingHorizontal: 12,
    },
    inputWrapperFocused: {
        borderColor: '#f6a100',
        backgroundColor: 'rgba(1, 22, 56, 0.95)',
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 14.5, // Increased input text size for better readability
        paddingVertical: 0,
    },

    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    errorText: {
        color: '#F87171',
        fontSize: 11,
        marginLeft: 6,
    },

    // Dropdowns
    dropdown: {
        height: 48,
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    dropdownFocused: {
        borderColor: '#f6a100',
    },
    placeholderStyle: {
        fontSize: 13.5, // Increased placeholder size
        color: '#64748B',
    },
    selectedTextStyle: {
        fontSize: 14, // Increased selected item font size
        color: '#FFFFFF',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color: '#011638',
    },
    dropdownContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    itemTextStyle: {
        fontSize: 13.5,
        color: '#011638',
    },

    // Button
    button: {
        backgroundColor: '#f6a100',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#f6a100',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#011638',
        fontSize: 15, // Increased button font size
        letterSpacing: 0.5,
    },

    // Terms Checkbox
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 14,
        marginBottom: 6,
    },
    checkbtn: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#f6a100',
        backgroundColor: 'rgba(1, 22, 56, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 2,
    },
    checkbtnSelected: {
        backgroundColor: '#f6a100',
    },
    conditiontext: {
        color: '#CBD5E1',
        fontSize: 11.5,
        flex: 1,
        lineHeight: 17,
    },
    conditionlink: {
        color: '#f6a100',
        textDecorationLine: 'underline',
    },
});