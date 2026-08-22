import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Animated,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    ImageBackground,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';

import { styles } from '../../../assets/styles/index.js';
import { uploadstyle } from '../../../assets/styles/uploadadmissiondocument.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { FetchPolyHAuthPreloadDataAction, UpdateKycAction } from '../../../reducers/actions/index.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';

const dataidentification = [
    { label: "Carte Nationale d'Identité", value: 1 },
    { label: 'Passeport', value: 2 },
    { label: 'Permis de Conduire', value: 3 },
    { label: 'Autre Document Officiel', value: 4 },
];

const optionspickupimage = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 800,
    maxHeight: 600,
    includeBase64: false,
};

class UpdateProfil extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            idcardTypeFocus: false,
            idcard_type: 0,
            idcard_number: '',
            idcard_recto: null,
            idcard_verso: null,
            idcard_recto_pp: null,
            data_idcard_recto: '',
            data_idcard_verso: '',
            data_idcard_recto_pp: '',
            refreshing: false,
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this._fetchNecessaryData();
    }

    _fetchNecessaryData = () => {
        const { user_infos } = this.props;
        if (user_infos) {
            this.setState({
                idcard_type: user_infos.idcard_type || 0,
                idcard_number: user_infos.idcard_number || '',
                idcard_recto: user_infos.idcard_recto ? { uri: user_infos.idcard_recto } : null,
                idcard_verso: user_infos.idcard_verso ? { uri: user_infos.idcard_verso } : null,
                idcard_recto_pp: user_infos.idcard_recto_pp ? { uri: user_infos.idcard_recto_pp } : null,
            });
        }
        FetchPolyHAuthPreloadDataAction();
    };

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        this._fetchNecessaryData();
        setTimeout(() => this.setState({ refreshing: false }), 1000);
    };

    _navigateToProfil = () => switchProfilPageAction(true);

    _updateKyc = () => {
        const { user_token } = this.props;
        const { idcard_type, idcard_number, data_idcard_recto, data_idcard_verso, data_idcard_recto_pp } = this.state;

        const formdata = new FormData();
        formdata.append('token', user_token);
        formdata.append('idcard_type', idcard_type);
        formdata.append('idcard_number', idcard_number);
        formdata.append('idcard_recto', data_idcard_recto);
        formdata.append('idcard_verso', data_idcard_verso);
        formdata.append('idcard_recto_pp', data_idcard_recto_pp);

        UpdateKycAction(formdata);
    };

    _pickupImage = async (fieldKey, dataKey) => {
        const response = await launchImageLibrary(optionspickupimage);
        if (!response.didCancel && !response.errorCode && response.assets?.length > 0) {
            const asset = response.assets[0];
            const dataimage = {
                name: asset.fileName,
                uri: asset.uri,
                type: asset.type,
                fileSize: asset.fileSize,
            };
            this.setState({
                [fieldKey]: { uri: asset.uri },
                [dataKey]: dataimage,
            });
        }
    };

    renderUploadArea = (title, description, iconName, iconColor, imageSource, onPress) => (
        <View style={uploadstyle.documentCard}>
            <View style={uploadstyle.documentHeader}>
                <View style={[uploadstyle.documentIconContainer, { backgroundColor: `${iconColor}15` }]}>
                    <Icon name={iconName} size={22} color={iconColor} />
                </View>
                <View style={uploadstyle.documentInfo}>
                    <Text style={[styles.textBold, uploadstyle.documentTitle]}>{title}</Text>
                    <Text style={[styles.text, uploadstyle.documentDescription]}>{description}</Text>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={uploadstyle.uploadTriggerArea}>
                {imageSource && imageSource.uri ? (
                    <View style={uploadstyle.previewWrapper}>
                        <ImageBackground source={imageSource} resizeMode="cover" style={uploadstyle.previewImage}>
                            <View style={uploadstyle.previewOverlay}>
                                <Icon name="checkbox-marked-circle" size={24} color={COLORS.accentGold} />
                                <Text style={[styles.textBold, uploadstyle.previewText]}>Modifier la photo</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ) : (
                    <View style={uploadstyle.uploadButton}>
                        <View style={uploadstyle.uploadButtonIcon}>
                            <Icon name="camera-plus-outline" size={24} color={COLORS.accentGold} />
                        </View>
                        <View style={uploadstyle.uploadButtonTextContainer}>
                            <Text style={[styles.textBold, uploadstyle.uploadButtonText]}>Télécharger la photo</Text>
                            <Text style={[styles.text, uploadstyle.uploadButtonSubtext]}>Format JPG ou PNG (Max 10 Mo)</Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );

    render() {
        const { user_infos, is_loading } = this.props;
        const { idcardTypeFocus, idcard_type, idcard_number, idcard_recto, idcard_verso, idcard_recto_pp, refreshing } = this.state;

        return (
            <SafeAreaView style={uploadstyle.containerform}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={uploadstyle.topGlow} pointerEvents="none" />
                <View style={uploadstyle.bottomGlow} pointerEvents="none" />

                {/* Dynamic Top Header */}
                <View style={uploadstyle.headerNav}>
                    <TouchableOpacity style={uploadstyle.backButton} onPress={this._navigateToProfil} activeOpacity={0.7}>
                        <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <View style={uploadstyle.headerTitleWrapper}>
                        <Text style={[styles.textBold, uploadstyle.headerBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, uploadstyle.headerTitle]}>Vérification KYC</Text>
                    </View>
                </View>

                <Animated.ScrollView
                    contentContainerStyle={uploadstyle.scrollContent}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                            tintColor={COLORS.accentGold}
                            colors={[COLORS.accentGold, COLORS.accentCyan]}
                        />
                    }
                >
                    {user_infos?.is_verified ? (
                        <View style={uploadstyle.statusCard}>
                            <View style={[uploadstyle.statusIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                                <Icon name="check-decagram" size={54} color="#10B981" />
                            </View>
                            <Text style={[styles.textBold, uploadstyle.statusTitle]}>Compte Vérifié !</Text>
                            <Text style={[styles.text, uploadstyle.statusMessage]}>
                                Votre identité a été validée. Vous bénéficiez de l'accès complet à tous vos services académiques.
                            </Text>
                            <TouchableOpacity onPress={this._navigateToProfil} style={uploadstyle.actionButton}>
                                <Text style={[styles.textBold, uploadstyle.actionButtonText]}>Retourner au profil</Text>
                            </TouchableOpacity>
                        </View>
                    ) : user_infos?.is_verified_pending ? (
                        <View style={uploadstyle.statusCard}>
                            <View style={[uploadstyle.statusIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                                <Icon name="clock-time-four-outline" size={54} color="#F59E0B" />
                            </View>
                            <Text style={[styles.textBold, uploadstyle.statusTitle]}>Vérification en Cours</Text>
                            <Text style={[styles.text, uploadstyle.statusMessage]}>
                                Vos documents d'identité sont actuellement en cours d'analyse par l'administration.
                            </Text>
                            <TouchableOpacity onPress={this._navigateToProfil} style={uploadstyle.actionButton}>
                                <Text style={[styles.textBold, uploadstyle.actionButtonText]}>Retourner au profil</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={uploadstyle.formContainer}>
                            {/* Card 1: Type de pièce */}
                            <View style={uploadstyle.documentCard}>
                                <View style={uploadstyle.documentHeader}>
                                    <View style={[uploadstyle.documentIconContainer, { backgroundColor: 'rgba(255, 179, 0, 0.15)' }]}>
                                        <Icon name="card-account-details-outline" size={22} color={COLORS.accentGold} />
                                    </View>
                                    <View style={uploadstyle.documentInfo}>
                                        <Text style={[styles.textBold, uploadstyle.documentTitle]}>Type de pièce d'identité</Text>
                                        <Text style={[styles.text, uploadstyle.documentDescription]}>Sélectionnez votre document officiel</Text>
                                    </View>
                                </View>

                                <Dropdown
                                    style={[uploadstyle.dropdown, idcardTypeFocus && uploadstyle.dropdownFocus]}
                                    placeholderStyle={uploadstyle.dropdownPlaceholder}
                                    selectedTextStyle={uploadstyle.dropdownSelectedText}
                                    itemTextStyle={uploadstyle.dropdownItemText}
                                    itemContainerStyle={uploadstyle.dropdownItemContainer}
                                    containerStyle={uploadstyle.dropdownMenu}
                                    activeColor="rgba(255, 179, 0, 0.2)"
                                    data={dataidentification}
                                    labelField="label"
                                    valueField="value"
                                    value={idcard_type}
                                    placeholder="Choisissez un type..."
                                    onFocus={() => this.setState({ idcardTypeFocus: true })}
                                    onBlur={() => this.setState({ idcardTypeFocus: false })}
                                    onChange={(item) => this.setState({ idcard_type: item.value })}
                                />
                            </View>

                            {/* Card 2: Numéro de la pièce */}
                            <View style={uploadstyle.documentCard}>
                                <View style={uploadstyle.documentHeader}>
                                    <View style={[uploadstyle.documentIconContainer, { backgroundColor: 'rgba(54, 209, 220, 0.15)' }]}>
                                        <Icon name="numeric" size={22} color={COLORS.accentCyan} />
                                    </View>
                                    <View style={uploadstyle.documentInfo}>
                                        <Text style={[styles.textBold, uploadstyle.documentTitle]}>Numéro du document</Text>
                                        <Text style={[styles.text, uploadstyle.documentDescription]}>Saisissez la référence exacte figurant sur la pièce</Text>
                                    </View>
                                </View>

                                <TextInput
                                    style={[styles.text, uploadstyle.textInput]}
                                    placeholder="Ex: 102938475"
                                    placeholderTextColor={COLORS.textMuted}
                                    onChangeText={(text) => this.setState({ idcard_number: text })}
                                    value={idcard_number}
                                />
                            </View>

                            {/* Uploads */}
                            {this.renderUploadArea(
                                'Recto du document',
                                'Face avant lisible de la pièce',
                                'credit-card-outline',
                                COLORS.accentGold,
                                idcard_recto,
                                () => this._pickupImage('idcard_recto', 'data_idcard_recto')
                            )}

                            {this.renderUploadArea(
                                'Verso du document',
                                'Face arrière de la pièce d’identité',
                                'credit-card-refresh-outline',
                                COLORS.accentCyan,
                                idcard_verso,
                                () => this._pickupImage('idcard_verso', 'data_idcard_verso')
                            )}

                            {this.renderUploadArea(
                                'Selfie avec la pièce',
                                'Photo nette de votre visage avec la pièce en main',
                                'account-box-outline',
                                COLORS.accentGold,
                                idcard_recto_pp,
                                () => this._pickupImage('idcard_recto_pp', 'data_idcard_recto_pp')
                            )}

                            {/* Soumission */}
                            <TouchableOpacity
                                onPress={this._updateKyc}
                                style={uploadstyle.submitButton}
                                activeOpacity={0.85}
                                disabled={is_loading}
                            >
                                {is_loading ? (
                                    <ActivityIndicator size="small" color={COLORS.textDark} />
                                ) : (
                                    <>
                                        <Icon name="shield-check-outline" size={20} color={COLORS.textDark} style={{ marginRight: 8 }} />
                                        <Text style={[styles.textBold, uploadstyle.submitBtnText]}>Soumettre la vérification</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        { FetchPolyHAuthPreloadDataAction, switchProfilPageAction, UpdateKycAction },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfil);