import { StyleSheet } from 'react-native';
import { C } from '../../assets/styles/chat';

export const contactnotificationstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
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
  headerRight: {
    width: 30,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: C.text,
    marginHorizontal: 10,
    marginTop: 12,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: C.border,
  },
  cardTitle: {
    color: C.textMuted,
    fontSize: 14,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowTitle: {
    color: C.text1,
    fontSize: 16,
  },
  rowSubtitle: {
    color: C.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 4,
  },
});