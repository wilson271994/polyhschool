import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const C = {
    bg: "#0a0e14",
    surface: "#111722",
    surfaceAlt: "#181f2d",
    bubble_out: "#eee",
    bubble_in: "#1e3a5e",
    accent: "#25d366",
    accent1: "#ECB818",
    accent2: '#1B497D',
    Accent: "#1e3a5e",
    accentDim: "#1a9e4a",
    accentGlow: "rgba(37,211,102,0.18)",
    text1: "#000",
    text: "#FFF",
    textMuted: "#7a8ba0",
    textTime: "#5a6b7d",
    border: "rgba(255,255,255,0.06)",
    headerBg: "#0d1520",
    header: '#1B497D',
    footer: '#0d1d30',
    inputBg: "#151d2b",
    red: "#e05c5c",
    blue: "#4a9eff",
    shadow: "0 8px 32px rgba(0,0,0,0.55)",
};

export const chatstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.bg,
        maxWidth: 430,
        alignSelf: "center",
        width: "100%",
    },

    // Header styles
    header: {
        backgroundColor: C.header,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: C.text,
    },
    onlineDot: {
        position: "absolute",
        bottom: 1,
        right: 1,
        width: 11,
        height: 11,
        borderRadius: 5.5,
        backgroundColor: C.accent1,
        borderWidth: 2,
        borderColor: C.headerBg,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        color: C.text,
        fontSize: 16,
        letterSpacing: -0.2,
    },
    headerStatus: {
        color: C.text,
        fontSize: 12,
    },

    // Messages area
    messagesArea: {
        flex: 1,
    },
    messagesContent: {
        paddingVertical: 8,
    },
    messageWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    messageContent: {
        maxWidth: "80%",
        gap: 2,
    },
    messageTimestamp: {
        color: C.textTime,
        fontSize: 11,
    },

    // Audio message styles
    audioContainer: {
        borderRadius: 18,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        padding: 10,
        paddingHorizontal: 14,
        minWidth: 220,
        maxWidth: 300,
        borderWidth: 1,
        borderColor: C.border,
    },
    forwardedContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 6,
    },
    forwardedText: {
        color: C.text,
        fontSize: 12,
        fontStyle: "italic",
        opacity: 0.8,
        marginLeft: 4,
    },
    audioContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        gap: 10,
    },
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    waveformContainer: {
        flex: 1,
    },
    durationText: {
        color: C.textTime,
        fontSize: 12,
        marginTop: 3,
    },
    micro: {
    },
    audioAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        top: 30
    },
    transcribeText: {
        color: C.text,
        fontSize: 12,
        marginTop: 6,
    },

    // Text message styles
    textContainer: {
        borderRadius: 18,
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        padding: 10,
        paddingBottom: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: C.border,
    },
    messageText: {
        color: C.text1,
        fontSize: 14,
        lineHeight: 22,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },
    timeText: {
        color: C.textTime,
        fontSize: 11,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    // Forwarded text message
    forwardedTextContainer: {
        backgroundColor: C.bubble_in,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        padding: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: C.border,
    },
    forwardedHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 4,
    },
    forwardedEmailText: {
        color: C.blue,
        fontSize: 14,
        textDecorationLine: "underline",
    },
    messageTime: {
        color: C.textTime,
        fontSize: 11,
        marginTop: 4,
    },

    // Date divider
    dateDividerContainer: {
        alignItems: "center",
        paddingVertical: 8,
    },
    dateDivider: {
        backgroundColor: "rgba(10,14,20,0.75)",
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 14,
    },
    dateDividerText: {
        color: C.textMuted,
        fontSize: 12,
    },

    // Typing indicator
    typingContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignItems: "flex-start",
    },
    typingBubble: {
        backgroundColor: C.bubble_in,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        padding: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: C.border,
    },
    typingDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: C.accent,
    },

    // Toast
    toast: {
        position: "absolute",
        bottom: 80,
        alignSelf: "center",
        backgroundColor: C.accent,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 18,
        zIndex: 300,
    },
    toastText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },

    // Emoji picker
    emojiPickerContainer: {
        position: "absolute",
        bottom: 72,
        left: 8,
        zIndex: 100,
        backgroundColor: C.surfaceAlt,
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 16,
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        width: 220,
        gap: 6,
    },

    // Input bar
    inputBar: {
        backgroundColor: C.footer,
        borderTopWidth: 1,
        borderTopColor: C.border,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    recordingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    recordingInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    recordingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: C.red,
    },
    recordingTime: {
        color: C.red,
        fontSize: 12,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: C.red,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    cancelButtonText: {
        color: C.red,
        fontSize: 13,
        fontWeight: "600",
    },
    sendButton: {
        backgroundColor: C.accent,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },

    // Input container
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
    },
    inputIcons: {
        flexDirection: "row",
        gap: 2,
        paddingBottom: 4,
    },
    iconButton: {
        padding: 6,
    },
    textInputWrapper: {
        flex: 1,
        backgroundColor: C.Accent,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: C.border,
        paddingHorizontal: 14,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 6,
    },
    textInputActive: {
        borderColor: `${C.accent}44`,
    },
    textInput: {
        flex: 1,
        color: C.text,
        fontSize: 15,
        paddingVertical: 6,
        maxHeight: 120,
    },
    attachButton: {
        padding: 4,
        paddingBottom: 6,
    },
    cameraButton: {
        padding: 4,
        paddingBottom: 6,
    },
    micButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    // Context menu
    contextMenu: {
        position: "absolute",
        backgroundColor: C.surfaceAlt,
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 14,
        overflow: "hidden",
        minWidth: 150,
    },
    contextMenuItem: {
        paddingVertical: 11,
        paddingHorizontal: 18,
    },
    contextMenuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    contextMenuText: {
        fontSize: 14,
    },

    // Utility
    flex: {
        flex: 1,
    },



    //Swipable menucontainermenu:{

    containermenu: {
        height: height / 2,
    },
    menuitemcontainer: {
    },
    menuitemscroll: {
        padding: 80,
        paddingHorizontal: 14,
        paddingVertical: 15,
        marginBottom: 30,
    },
    swipablepanelbarstyle: {
        height: 50,
        backgroundColor: '#1B497D'
    },
    swipablepanelcloseicon: {
        backgroundColor: '#1B497D',
    },
    headermenuitem: {
        borderTopColor: '#eee',
        padding: 5,
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15
    },
    iconmenuitem: {
        width: 25,
        height: 25
    },
    menulisttext: {
        fontSize: 16,
        marginLeft: 10,
        color: '#000',
    },



    // Remplacer l'ancien emojiPickerContainer par ces nouveaux styles
    emojiPickerWrapper: {
        backgroundColor: C.surfaceAlt,
        borderTopWidth: 1,
        borderTopColor: C.border,
        paddingBottom: 10,
    },
    emojiPickerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    emojiPickerTitle: {
        color: C.text,
        fontSize: 16,
    },
    emojiCloseButton: {
        backgroundColor: C.accent2,
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiPickerScroll: {
        maxHeight: 200,
    },
    emojiPickerGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        gap: 8,
    },
    emojiButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: C.surface,
    },
    emojiText: {
        fontSize: 24,
    },


    // ---- STYLES POUR LA BARRE DE RECHERCHE ----
searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 10,
    paddingHorizontal: 10,
    gap: 8,
    height: 40,
},
searchInput: {
    flex: 1,
    color: C.text,
    fontSize: 15,
},
searchNavButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 10,
},
searchNavBtn: {
    padding: 4,
},
searchCounter: {
    color: C.text,
    fontSize: 13,
},
});