import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Modal,
    StatusBar
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import { homestyle } from '../../assets/styles/home.js';
import { styles } from '../../assets/styles/index.js';
import { COLORS } from '../../assets/styles/theme.js';
import { FetchShoolUserInfos, switchHeaderAction } from '../../reducers/actions/index.js';
import Student_Menu from '../StudentMenu/Student_Menu.js';
import { switchStudentChooseAccountPageAction } from '../../navigations/rootNavigation.js';
import { BASE_URL } from '../../api/config.js';

// ── Modal de Sélection d'Image (Style Bottom Sheet Poly-H) ────────────
const ImagePickerModal = ({ visible, target, onAction, onClose }) => {
    if (!visible) return null;
    const isProfile = target === 'profile';

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={homestyle.pickerOverlay}>
                <TouchableOpacity style={homestyle.pickerBackdrop} activeOpacity={1} onPress={onClose} />
                <View style={homestyle.pickerSheet}>
                    <View style={homestyle.pickerHandle} />

                    <View style={homestyle.pickerHeader}>
                        <View style={[homestyle.pickerIconCircle, { backgroundColor: 'rgba(255, 179, 0, 0.15)' }]}>
                            <Icon name={isProfile ? 'account-circle-outline' : 'image-filter-hdr'} size={24} color={COLORS.accentGold} />
                        </View>
                        <Text style={homestyle.pickerTitle}>{isProfile ? 'Photo de profil' : 'Photo de couverture'}</Text>
                        <Text style={homestyle.pickerSubtitle}>Choisissez une option pour mettre à jour la photo</Text>
                    </View>

                    <View style={homestyle.pickerOptionsContainer}>
                        <TouchableOpacity style={homestyle.pickerOption} onPress={() => onAction('camera')} activeOpacity={0.7}>
                            <View style={[homestyle.pickerOptionIcon, { backgroundColor: 'rgba(54, 209, 220, 0.15)' }]}>
                                <Icon name="camera-outline" size={20} color={COLORS.accentCyan} />
                            </View>
                            <View style={homestyle.pickerOptionText}>
                                <Text style={homestyle.pickerOptionTitle}>Appareil photo</Text>
                                <Text style={homestyle.pickerOptionDesc}>Prendre une nouvelle photo</Text>
                            </View>
                            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
                        </TouchableOpacity>

                        <View style={homestyle.pickerSeparator} />

                        <TouchableOpacity style={homestyle.pickerOption} onPress={() => onAction('gallery')} activeOpacity={0.7}>
                            <View style={[homestyle.pickerOptionIcon, { backgroundColor: 'rgba(255, 179, 0, 0.15)' }]}>
                                <Icon name="image-multiple-outline" size={20} color={COLORS.accentGold} />
                            </View>
                            <View style={homestyle.pickerOptionText}>
                                <Text style={homestyle.pickerOptionTitle}>Galerie de photos</Text>
                                <Text style={homestyle.pickerOptionDesc}>Choisir une image existante</Text>
                            </View>
                            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={homestyle.pickerCancelButton} onPress={onClose} activeOpacity={0.7}>
                        <Text style={homestyle.pickerCancelText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// ── Composant Principal HomeIndex ──────────────────────────────────────
class HomeIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: null,
            coverImage: null,
            imagePickerVisible: false,
            imagePickerTarget: null,
            isRefreshing: false,
        };

        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this._handleRefresh();
    }

    _startSpin = () => {
        this.spinValue.setValue(0);
        Animated.loop(
            Animated.timing(this.spinValue, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ).start();
    };

    _stopSpin = () => {
        this.spinValue.stopAnimation();
        this.spinValue.setValue(0);
    };

    _handleRefresh = async () => {
        const { user_token } = this.props;
        this.setState({ isRefreshing: true });
        this._startSpin();

        if (user_token) {
            await FetchShoolUserInfos(user_token);
        }

        setTimeout(() => {
            this._stopSpin();
            this.setState({ isRefreshing: false });
        }, 1200);
    };

    _navigateToChooseAccount = () => {
        switchStudentChooseAccountPageAction(true);
    };

    _showAlert = (type, title, description) => {
        Toast.show({
            type: type,
            props: {
                title: title,
                description: description,
            },
        });
    };

    _openImagePicker = (target) => {
        this.setState({ imagePickerVisible: true, imagePickerTarget: target });
    };

    _closeImagePicker = () => {
        this.setState({ imagePickerVisible: false });
    };

    _handleImagePickerAction = (sourceType) => {
        const { imagePickerTarget } = this.state;
        this.setState({ imagePickerVisible: false }, () => {
            if (sourceType === 'camera') {
                this._launchCamera(imagePickerTarget);
            } else {
                this._launchGallery(imagePickerTarget);
            }
        });
    };

    _handleImageResult = (response, target) => {
        if (response.didCancel) return;

        if (response.errorCode) {
            this._showAlert(
                'error',
                'Accès refusé !',
                response.errorMessage || 'Vérifiez les permissions de votre appareil.'
            );
            return;
        }

        if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri;
            if (target === 'profile') {
                this.setState({ profileImage: uri });
                this._showAlert('success', 'Photo de profil', 'Votre photo de profil a été mise à jour.');
            } else {
                this.setState({ coverImage: uri });
                this._showAlert('success', 'Photo de couverture', 'Votre photo de couverture a été mise à jour.');
            }
        }
    };

    _launchCamera = (target) => {
        const options = {
            mediaType: 'photo',
            quality: 0.85,
            maxWidth: target === 'profile' ? 500 : 800,
            maxHeight: target === 'profile' ? 500 : 300,
            includeBase64: false,
            saveToPhotos: false,
        };
        launchCamera(options, (response) => this._handleImageResult(response, target));
    };

    _launchGallery = (target) => {
        const options = {
            mediaType: 'photo',
            quality: 0.85,
            maxWidth: target === 'profile' ? 500 : 800,
            maxHeight: target === 'profile' ? 500 : 300,
            includeBase64: false,
            selectionLimit: 1,
        };
        launchImageLibrary(options, (response) => this._handleImageResult(response, target));
    };

    renderWelcomeScreen = () => (
        <View style={homestyle.welcomeContainer}>
            <View style={homestyle.welcomeVideoContainer}>
                <Video
                    source={require('../../assets/videos/welcome.mp4')}
                    style={homestyle.welcomeVideo}
                    repeat={true}
                    muted={true}
                    resizeMode="contain"
                    paused={false}
                />
            </View>

            <Text style={[homestyle.welcomeTitle, styles.textBold]}>
                BIENVENUE SUR POLY-H SCHOOL
            </Text>

            <Text style={[homestyle.welcomeMessage, styles.text]}>
                Pour profiter des services rattachés à cette application, vous devez souscrire à un établissement.
            </Text>

            <View style={homestyle.welcomeIconRow}>
                <Icon name="school" size={26} color={COLORS.accentGold} />
                <Icon name="book-open-page-variant" size={26} color={COLORS.accentGold} />
                <Icon name="account-group" size={26} color={COLORS.accentGold} />
            </View>

            <TouchableOpacity
                style={homestyle.subscribeButton}
                onPress={this._navigateToChooseAccount}
                activeOpacity={0.85}
            >
                <Icon name="school-outline" size={22} color={COLORS.textDark} />
                <Text style={[homestyle.subscribeButtonText, styles.textBold]}>
                    Souscrire à une école
                </Text>
                <Icon name="chevron-right" size={22} color={COLORS.textDark} />
            </TouchableOpacity>
        </View>
    );

    renderWaitingAdmission = () => {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={homestyle.waitingContainer}>
                <View style={homestyle.waitingVideoContainer}>
                    <Video
                        source={require('../../assets/videos/waiting.mp4')}
                        style={homestyle.waitingVideo}
                        repeat={true}
                        muted={true}
                        resizeMode="contain"
                        paused={false}
                    />
                </View>

                <Text style={[homestyle.waitingTitle, styles.textBold]}>
                    Admission en cours de traitement
                </Text>

                <Text style={[homestyle.waitingMessage, styles.text]}>
                    Votre demande d'admission est en cours d'examen par l'administration.{'\n'}
                    Merci de patienter, vous serez notifié dès sa validation.
                </Text>

                <TouchableOpacity
                    style={homestyle.refreshButton}
                    onPress={this._handleRefresh}
                    disabled={this.state.isRefreshing}
                    activeOpacity={0.85}
                >
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Icon name="refresh" size={20} color={COLORS.textDark} />
                    </Animated.View>
                    <Text style={[homestyle.refreshButtonText, styles.textBold]}>
                        {this.state.isRefreshing ? 'Actualisation...' : 'Rafraîchir mon statut'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderHeaderContent = () => {
        const { user_infos, student_infos } = this.props;
        const { profileImage, coverImage } = this.state;

        const userPP = user_infos?.pp ? BASE_URL + user_infos.pp : '';
        const userCover = user_infos?.cover ? BASE_URL + user_infos.cover : '';

        const imageSource = profileImage
            ? { uri: profileImage }
            : userPP
                ? { uri: userPP }
                : require('../../assets/images/profil.png');

        const coverSource = coverImage
            ? { uri: coverImage }
            : userCover
                ? { uri: userCover }
                : require('../../assets/images/background.jpg');

        const studentClassName = student_infos?.classe?.name || student_infos?.class?.name || 'Classe non assignée';

        return (
            <View style={homestyle.profileCard}>
                <ImageBackground
                    source={coverSource}
                    style={homestyle.profileImageBackground}
                    resizeMode="cover"
                >
                    <TouchableOpacity
                        style={homestyle.coverEditBtn}
                        onPress={() => this._openImagePicker('cover')}
                        activeOpacity={0.8}
                    >
                        <Icon name="camera-outline" size={18} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={homestyle.profileIconWrapper}>
                    <View style={homestyle.profileIconContainer}>
                        <Image source={imageSource} style={homestyle.profileIcon} />
                    </View>
                    <TouchableOpacity
                        style={homestyle.editIconBtn}
                        onPress={() => this._openImagePicker('profile')}
                        activeOpacity={0.8}
                    >
                        <Icon name="camera" size={16} color={COLORS.textDark} />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.textBold, homestyle.userName]}>
                    {user_infos?.name || `${user_infos?.first_name || ''} ${user_infos?.last_name || ''}`.trim() || 'Étudiant'}
                </Text>

                <View style={homestyle.classBadge}>
                    <Icon name="google-classroom" size={14} color={COLORS.accentGold} style={{ marginRight: 6 }} />
                    <Text style={[styles.textBold, homestyle.userClass]}>
                        {studentClassName}
                    </Text>
                </View>
            </View>
        );
    };

    render() {
        const { is_school_user, is_admission_approved } = this.props;
        const { imagePickerVisible, imagePickerTarget } = this.state;

        var content;

        if (!is_school_user) {
            content = this.renderWelcomeScreen();
        } else if (is_school_user && !is_admission_approved) {
            content = (
                <>
                    {this.renderHeaderContent()}
                    {this.renderWaitingAdmission()}
                </>
            );
        } else if (is_school_user && is_admission_approved) {
            content = (
                <>
                    {this.renderHeaderContent()}
                    <Student_Menu />
                </>
            );
        } else {
            content = this.renderHeaderContent();
        }

        return (
            <SafeAreaView style={homestyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={homestyle.topGlow} pointerEvents="none" />
                <View style={homestyle.bottomGlow} pointerEvents="none" />

                <ScrollView
                    contentContainerStyle={homestyle.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    {content}
                </ScrollView>

                <ImagePickerModal
                    visible={imagePickerVisible}
                    target={imagePickerTarget}
                    onAction={this._handleImagePickerAction}
                    onClose={this._closeImagePicker}
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHeaderAction,
        switchStudentChooseAccountPageAction,
        FetchShoolUserInfos
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    student_infos: state.auth.student_infos,
    is_admission_approved: state.auth.is_admission_approved,
    is_school_user: state.auth.is_school_user,
    user_token: state.auth.user_token,
    is_loading: state.loader.is_loading
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);