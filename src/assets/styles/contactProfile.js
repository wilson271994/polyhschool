import { StyleSheet, Dimensions } from 'react-native';
import { C } from './chat'; // Vos constantes de couleur

const { width } = Dimensions.get('window');

export const contactprofilestyle= StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: C.accent2,
    maxWidth: 430,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: C.text,
    fontSize: 22,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: C.bubble_out,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: C.accent1,
    marginBottom: 12,
  },
  name: {
    color: C.text1,
    fontSize: 18,
  },
  status: {
    color: C.text1,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: C.text,
    marginHorizontal: 10,
    marginTop: 12,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: C.border,
    justifyContent:'center'
  },
  cardTitle: {
    color: C.textMuted,
    fontSize: 14,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  infoText: {
    color: C.text1,
    fontSize: 16,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  optionText: {
    color: C.text1,
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    alignSelf: 'center',
  },
});