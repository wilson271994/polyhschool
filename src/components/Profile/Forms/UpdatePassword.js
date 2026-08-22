import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

import { styles } from '../../../assets/styles/index.js';
import { profilstyle } from '../../../assets/styles/profil.js';
import { COLORS } from '../../../assets/styles/theme.js';
import {
  FetchPolyHAuthPreloadDataAction,
  UpdatePasswordAction,
} from '../../../reducers/actions/index.js';
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
    FetchPolyHAuthPreloadDataAction();
  }

  _navigateToProfil = () => {
    switchProfilPageAction(true);
  };

  toggleOldPasswordVisibility = () => {
    this.setState((prev) => ({ showOldPassword: !prev.showOldPassword }));
  };

  toggleNewPasswordVisibility = () => {
    this.setState((prev) => ({ showNewPassword: !prev.showNewPassword }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prev) => ({ showConfirmPassword: !prev.showConfirmPassword }));
  };

  _handleUpdatePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { user_token, navigation } = this.props;

    if (!oldPassword || !newPassword || !confirmPassword) {
      Toast.show({ type: 'error', text1: 'Veuillez remplir tous les champs.' });
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

  renderPasswordField = (label, value, onChangeText, isVisible, toggleVisibility, placeholder) => (
    <View style={profilstyle.cardItem}>
      <View style={profilstyle.fieldHeader}>
        <Icon name="lock-outline" size={18} color={COLORS.accentGold} />
        <Text style={[styles.textBold, profilstyle.label]}>{label}</Text>
      </View>

      <View style={profilstyle.passwordInputRow}>
        <TextInput
          style={[styles.text, profilstyle.passwordTextInput]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={toggleVisibility}
          style={profilstyle.eyeButton}
          activeOpacity={0.7}
        >
          <Icon
            name={isVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

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
      <SafeAreaView style={profilstyle.containerform}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

        {/* Ambient Glows */}
        <View style={profilstyle.topGlow} pointerEvents="none" />
        <View style={profilstyle.bottomGlow} pointerEvents="none" />

        {/* Header Bar */}
        <View style={profilstyle.headerNav}>
          <TouchableOpacity
            style={profilstyle.backButton}
            onPress={this._navigateToProfil}
            activeOpacity={0.7}
          >
            <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <View style={profilstyle.headerTitleWrapper}>
            <Text style={[styles.textBold, profilstyle.headerTitle]}>Modifier le mot de passe</Text>
          </View>
        </View>

        <Animated.ScrollView
          contentContainerStyle={profilstyle.scrollContent}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={profilstyle.formContainer}>
            {this.renderPasswordField(
              'Ancien mot de passe',
              oldPassword,
              (text) => this.setState({ oldPassword: text }),
              showOldPassword,
              this.toggleOldPasswordVisibility,
              "Saisir l'ancien mot de passe"
            )}

            {this.renderPasswordField(
              'Nouveau mot de passe',
              newPassword,
              (text) => this.setState({ newPassword: text }),
              showNewPassword,
              this.toggleNewPasswordVisibility,
              'Saisir le nouveau mot de passe'
            )}

            {this.renderPasswordField(
              'Confirmation du mot de passe',
              confirmPassword,
              (text) => this.setState({ confirmPassword: text }),
              showConfirmPassword,
              this.toggleConfirmPasswordVisibility,
              'Confirmer le nouveau mot de passe'
            )}

            <TouchableOpacity
              onPress={this._handleUpdatePassword}
              style={profilstyle.submitButton}
              activeOpacity={0.85}
              disabled={is_loading}
            >
              {is_loading ? (
                <ActivityIndicator size="small" color={COLORS.textDark} />
              ) : (
                <>
                  <Icon name="key-change" size={20} color={COLORS.textDark} style={{ marginRight: 8 }} />
                  <Text style={[styles.textBold, profilstyle.submitBtnText]}>
                    Mettre à jour le mot de passe
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      FetchPolyHAuthPreloadDataAction,
      UpdatePasswordAction,
      switchProfilPageAction,
    },
    dispatch
  ),
});

const mapStateToProps = (state) => ({
  is_loading: state.loader.is_loading,
  user_infos: state.auth.user_infos,
  user_token: state.auth.user_token,
  site_infos: state.auth.site_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Update_password);