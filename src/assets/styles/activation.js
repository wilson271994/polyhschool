import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
const { width, height } = Dimensions.get('window');

export const activationstyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 30,
  },
  back: {
    bottom: '91%',
    position: 'absolute',
    elevation: 5,
    zIndex: 999,
    alignSelf: 'flex-start'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'justify',
  },
  form: {
    width: '90%',
    maxWidth: 350,
    marginTop: 50,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    height: 45,
  },
  input: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#1B497D',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 50,
    transform: [{ translateY: -30 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resentcodecont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#ffffff',
  },
  resendText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
