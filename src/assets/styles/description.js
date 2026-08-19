import { StyleSheet, Platform } from 'react-native';

export const descriptionstyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },

  section: {
    top: 5,
    right: 10
  },
  // Contenu principal
  content: {
    paddingHorizontal: 20,
  },
  // Titre et compteur
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  characterCount: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  characterCountWarning: {
    color: '#FF9800',
    fontWeight: '500',
  },
  characterCountLimit: {
    color: '#F44336',
    fontWeight: '600',
  },

  inputWrapper: {
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  
  bottomSaveContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 15,
    backgroundColor: 'transparent',
  },
  saveButtonFull: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: '#1B497D',
  },
  saveButtonInactive: {
    backgroundColor: '#eee',
  },
  saveButtonFullText: {
    fontSize: 16,
  },
  saveButtonTextActive: {
    color: '#000000',
  },
  saveButtonTextInactive: {
    color: '#666',
  },
});