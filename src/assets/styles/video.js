import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const videostyle = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1B497D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5
  },
  videoPlayerContainer: {
    padding: 10,
  },
  searchContainer: {
    marginLeft: "auto",
    marginRight: 10,
    top: 5
  },
  controlIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  commentsContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  commentCard: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    color: '#333',
  },
  commentMeta: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  commentActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    width: 18,
    height: 18,
    marginLeft: 10,
  },

  videoWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  videoPlaceholder: {
    backgroundColor: '#1a1a1a',
    height: 220,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButtonCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 12,
  },
  controlButton: {
    padding: 4,
  },
  timeContainer: {
    marginTop: 6,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
  },
  onlineStatus: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D1C6',
    marginRight: 6,
  },
  onlineText: {
    color: '#FFF',
    fontSize: 12,
  },


  exitFullscreenButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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




  commentsTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  commentEmail: {
    fontSize: 11,
    color: '#999',
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  actionCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  actionCountActive: {
    color: '#1B497D',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    color: '#333',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#1B497D',
  },
  buttonText: {
    color: '#666',
    fontSize: 16,
  },



  editHint: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  editedText: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  deleteButton: {
    marginLeft: 15,
    padding: 4,
  },


  repliesContainer: {
    marginLeft: 50,
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
  },
  replyCard: {
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 8,
  },
  replyToText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
  replyPreview: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#1B497D',
  },
  replyPreviewText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  editHint: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  editedText: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 4,
    justifyContent: 'center',
  },



  progressContainer: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,        // ← plus grande zone tactile
    justifyContent: 'center',
  },

  video: {
    backgroundColor: '#000',
    height: 220,
    width: '100%',
  },

  videoOverlayTouch: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },


  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 2,
  },

  progressHandle: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFC107',
    top: -5,
    marginLeft: -7,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});