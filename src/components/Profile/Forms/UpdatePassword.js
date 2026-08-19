import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  View,  Text,  TouchableOpacity,  Image,  ImageBackground,  TextInput,  Animated,  ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../../assets/styles/index.js';
import Toast from 'react-native-toast-message';
import { FetchPreloadDataAction,  UpdatePasswordAction } from '../../../reducers/actions/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

class Update_password extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      scrollY: new Animated.Value(0),
    };
    this.handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      { useNativeDriver: false }
    );
  }

  componentDidMount() {
    FetchPreloadDataAction();
  }

  _navigateToProfil = () => {
    switchProfilPageAction(true);
  };

  toggleOldPasswordVisibility = () => {
    this.setState(prev => ({ showOldPassword: !prev.showOldPassword }));
  };
  toggleNewPasswordVisibility = () => {
    this.setState(prev => ({ showNewPassword: !prev.showNewPassword }));
  };
  toggleConfirmPasswordVisibility = () => {
    this.setState(prev => ({ showConfirmPassword: !prev.showConfirmPassword }));
  };

  _handleUpdatePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { user_token, navigation } = this.props;

    if (!oldPassword || !newPassword || !confirmPassword) {
      Toast.show({ type: 'error', text1: 'Tous les champs sont obligatoires.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    const data = JSON.stringify({
      token: user_token,
      old_password: oldPassword,
      new_password: newPassword,
    });

    UpdatePasswordAction(data, navigation);
  };

  renderHeader = () => {
    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[profilstyle.header, { opacity: headerOpacity }]}>
        <View style={styles.section}>
          <View style={profilstyle.headerSection}>
            <View style={profilstyle.headerbuttonContainer}>
              <TouchableOpacity
                style={profilstyle.headerButton}
                onPress={this._navigateToProfil}>
                <Image
                  style={styles.backstyle}
                  source={require('../../../assets/images/back.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={profilstyle.headertext}>
              <Text style={[profilstyle.headerTitle, styles.textBold]}>
                Modifier le mot de passe
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  render() {
    const { is_loading } = this.props;
    const {
      oldPassword,
      newPassword,
      confirmPassword,
      showOldPassword,
      showNewPassword,
      showConfirmPassword,
    } = this.state;

    return (
      <View style={profilstyle.containerform}>
        <ImageBackground
          source={require('../../../assets/images/background.jpg')}
          style={styles.backgroundapp}
          resizeMode="cover"
        >
          <Animated.ScrollView
            style={profilstyle.container}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <View style={profilstyle.headerform}>
              <View style={profilstyle.section}>
                <View style={styles.section}>
                  <View style={styles.back}>
                    <TouchableOpacity onPress={this._navigateToProfil}>
                      <Image
                        style={styles.backstyle}
                        source={require('../../../assets/images/back.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.sectionTitle, styles.textBold]}>
                    Modifier le mot de passe
                  </Text>
                </View>
              </View>
            </View>

            <View style={profilstyle.formcontainer}>

              <View style={profilstyle.formitem}>
                <Text style={[styles.text, profilstyle.label]}>
                  Ancien mot de passe
                </Text>
                <View style={profilstyle.passwordInputRow}>
                  <TextInput
                    style={[profilstyle.inputContainer, styles.text, { flex: 1, borderWidth: 0 }]}
                    placeholder="Saisir l'ancien mot de passe"
                    placeholderTextColor="#FFF"
                    value={oldPassword}
                    onChangeText={text => this.setState({ oldPassword: text })}
                    secureTextEntry={!showOldPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={this.toggleOldPasswordVisibility}
                    style={{ padding: 8 }}>
                    <Ionicons
                      name={showOldPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={profilstyle.formitem}>
                <Text style={[styles.text, profilstyle.label]}>
                  Nouveau mot de passe
                </Text>
                <View style={profilstyle.passwordInputRow}>
                  <TextInput
                    style={[profilstyle.inputContainer, styles.text, { flex: 1, borderWidth: 0 }]}
                    placeholder="Saisir le nouveau mot de passe"
                    placeholderTextColor="#FFF"
                    value={newPassword}
                    onChangeText={text => this.setState({ newPassword: text })}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={this.toggleNewPasswordVisibility}
                    style={{ padding: 8 }}>
                    <Ionicons
                      name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={profilstyle.formitem}>
                <Text style={[styles.text, profilstyle.label]}>
                  Confirmation du nouveau mot de passe
                </Text>
                <View style={profilstyle.passwordInputRow}>
                  <TextInput
                    style={[profilstyle.inputContainer, styles.text, { flex: 1, borderWidth: 0 }]}
                    placeholder="Confirmer le nouveau mot de passe"
                    placeholderTextColor="#FFF"
                    value={confirmPassword}
                    onChangeText={text => this.setState({ confirmPassword: text })}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={this.toggleConfirmPasswordVisibility}
                    style={{ padding: 8 }}>
                    <Ionicons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>


              <TouchableOpacity
                onPress={this._handleUpdatePassword}
                style={profilstyle.submitButton}
                disabled={is_loading}>
                {is_loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={[styles.textBold, profilstyle.submitBtnText]}>
                    Modifier le mot de passe
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ height: 60 }} />
          </Animated.ScrollView>
          {this.renderHeader()}
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        FetchPreloadDataAction,
        UpdatePasswordAction,   // À importer depuis vos actions
        switchProfilPageAction,
      },
      dispatch
    ),
  };
};

const mapStateToProps = state => {
  return {
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
    site_infos: state.auth.site_infos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update_password);