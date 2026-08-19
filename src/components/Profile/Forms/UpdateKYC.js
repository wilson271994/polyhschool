import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput, Animated, ActivityIndicator, RefreshControl } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../../assets/styles/index.js';
import { FetchPreloadDataAction, UpdateKycAction } from '../../../reducers/actions/index.js';
import { uploadstyle, COLORS } from '../../../assets/styles/uploadadmissiondocument.js';
import { switchProfilPageAction } from '../../../navigations/rootNavigation.js';
import { launchImageLibrary } from 'react-native-image-picker';

const dataidentification = [
    { 
        label: "Carte nationale d'identité", 
        value: 1 
    },
    { 
        label: 'Passeport', 
        value: 2 
    },
    { 
        label: 'Permit de conduire', 
        value: 3 
    },
    { 
        label: 'Autres', 
        value: 4 
    },
];

const optionspickupimage = {
    mediaType                       : 'photo',
    quality                         : 0.8,
    maxWidth                        : 800,
    maxHeight                       : 600,
    includeBase64                   : false,
};

class UpdateProfil extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            idcardTypeFocus         : false,
            idcard_type             : 0,
            idcard_number           : '',
            idcard_recto            : null,
            idcard_verso            : null,
            idcard_recto_pp         : null,
            data_idcard_recto       : '',
            data_idcard_verso       : '',
            data_idcard_recto_pp    : '',
            refreshing              : false,
            scrollY                 : new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent          : { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver       : false }
        );
    }

    componentDidMount() {
        //this._fetchNecessaryData();
    }

    _fetchNecessaryData = () => {
        const { user_infos } = this.props;
        this.setState({
            idcard_type             : user_infos.idcard_type                                        || 0,
            idcard_number           : user_infos.idcard_number                                      || '',
            idcard_recto            : user_infos.idcard_recto ? { uri: user_infos.idcard_recto }    : null,
            idcard_verso            : user_infos.idcard_verso ? { uri: user_infos.idcard_verso }    : null,
            idcard_recto_pp         : user_infos.idcard_recto_pp
                ? { uri: user_infos.idcard_recto_pp }
                : null,
        });
        FetchPreloadDataAction();
    };

    _onRefresh = async () => {
        this._fetchNecessaryData();
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    };

    _updateKyc = () => {
        const { user_token } = this.props;
        const {
            idcard_type,
            idcard_number,
            data_idcard_recto,
            data_idcard_verso,
            data_idcard_recto_pp,
        } = this.state;

        const formdata = new FormData();
        formdata.append ('token', user_token);
        formdata.append ('idcard_type', idcard_type);
        formdata.append ('idcard_number', idcard_number);
        formdata.append ('idcard_recto', data_idcard_recto);
        formdata.append ('idcard_verso', data_idcard_verso);
        formdata.append ('idcard_recto_pp', data_idcard_recto_pp);

        

        console.log('FormData prêt pour envoi:', {
            _parts: formdata._parts.map(part => ({
                champ: part[0],
                valeur: part[1]
            }))
        });

        //UpdateKycAction(formdata);
    };

    // _getValidSource = (imageSource, defaultSource) => {
    //     if (
    //         imageSource &&
    //         imageSource.uri &&
    //         imageSource.uri !== '' &&
    //         imageSource.uri !== 'null'
    //     ) {
    //         return imageSource;
    //     }
    //     return defaultSource;
    // };

    _pickupRectoIdcard = async () => {
        const response = await launchImageLibrary(optionspickupimage);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('Error: ', response.errorMessage);
        } else {
            const dataimage = {
                'name'              : response.assets[0].fileName,
                'uri'               : response.assets[0].uri,
                'type'              : response.assets[0].type,
                'fileSize'          : response.assets[0].fileSize,
                'height'            : response.assets[0].height,
                'width'             : response.assets[0].width
            }
            const source =          { uri: response.assets[0].uri };
            this.setState({
                idcard_recto        :source,
                data_idcard_recto   :dataimage
            });
        }
    };


    _pickupVersoIdcard = async () => {
        const response = await launchImageLibrary(optionspickupimage);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('Error: ', response.errorMessage);
        } else {
            const dataimage = {
                'name'              : response.assets[0].fileName,
                'uri'               : response.assets[0].uri,
                'type'              : response.assets[0].type,
                'fileSize'          : response.assets[0].fileSize,
                'height'            : response.assets[0].height,
                'width'             : response.assets[0].width
            }
            const source = { uri: response.assets[0].uri };
            this.setState({
                idcard_verso        :source,
                data_idcard_verso   :dataimage
            });
        }
    };

    _pickupRectoPPIdcard = async () => {
        const response = await launchImageLibrary(optionspickupimage);

        if (response.didCancel) {
            console.log('User cancelled image picker'); 
        } else if (response.errorCode) {
            console.log('Error: ', response.errorMessage);
        } else {
            const dataimage = {
                'name'              : response.assets[0].fileName,
                'uri'               : response.assets[0].uri,
                'type'              : response.assets[0].type,
                'fileSize'          : response.assets[0].fileSize,
                'height'            : response.assets[0].height,
                'width'             : response.assets[0].width
            }
            const source = { uri: response.assets[0].uri };
            this.setState({
                idcard_recto_pp     :source,
                data_idcard_recto_pp:dataimage
            });
        }
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange          : [0, 100],
            outputRange         : [0, 1],
            extrapolate         : 'clamp',
        });

        return (
            <Animated.View style={[uploadstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={uploadstyle.headerSection}>
                        <View style={uploadstyle.headerbuttonContainer}>
                            <TouchableOpacity style={uploadstyle.headerButton} onPress={this._navigateToProfil}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={uploadstyle.headertext}>
                            <Text style={[uploadstyle.headerTitle, styles.textBold]}>
                                Confirmez votre identité
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { user_infos, is_loading } = this.props;
        const {
            idcardTypeFocus,
            idcard_type,
            idcard_number,
            idcard_recto,
            idcard_verso,
            idcard_recto_pp,
            refreshing,
        } = this.state;

        return (
            <View style={uploadstyle.containerform}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={uploadstyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this._onRefresh}
                                colors={['#6aa7d7', '#ffa200']}
                            />
                        }
                    >
                        {user_infos.is_verified ? (
                            <View style={uploadstyle.verifiedContainer}>
                                <Icon name="check-circle" size={64} color="#10B981" />
                                <Text style={[uploadstyle.messageText, styles.text]}>
                                    Votre compte est vérifié.
                                </Text>
                                <TouchableOpacity onPress={this._navigateToProfil} style={uploadstyle.backButton}>
                                    <Text style={[uploadstyle.backButtonText, styles.textBold]}>
                                        Revenir à la page d'accueil
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : user_infos.is_verified_pending ? (
                            <View style={uploadstyle.verifiedContainer}>
                                <Icon name="clock-outline" size={64} color="#F59E0B" />
                                <Text style={[uploadstyle.messageText, styles.text]}>
                                    Votre compte est en cours de vérification. Nous vous
                                    enverrons un message par e-mail.
                                </Text>
                                <TouchableOpacity onPress={this._navigateToProfil} style={uploadstyle.backButton}>
                                    <Text style={[uploadstyle.backButtonText, styles.textBold]}>
                                        Revenir à la page d'accueil
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <>
                                <View style={uploadstyle.section}>
                                    <View style={styles.section}>
                                        <View style={styles.back}>
                                            <TouchableOpacity onPress={this._navigateToProfil}>
                                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[styles.sectionTitle, styles.textBold]}>
                                            Confirmez votre identité
                                        </Text>
                                    </View>
                                </View>

                                <View style={uploadstyle.formcontainer}>

                                    <View style={uploadstyle.documentCard}>
                                        <View style={uploadstyle.documentHeader}>
                                            <View style={[uploadstyle.documentIconContainer, { backgroundColor: '#EFF6FF' }]}>
                                                <Icon name="card-account-details-outline" size={24} color="#3B82F6" />
                                            </View>
                                            <View style={uploadstyle.documentInfo}>
                                                <Text style={[uploadstyle.documentTitle, styles.textBold]}>
                                                    Type de pièce d'identité
                                                </Text>
                                                <Text style={[uploadstyle.documentDescription, styles.text]}>
                                                    Sélectionnez le type de document que vous souhaitez fournir
                                                </Text>
                                            </View>
                                        </View>
                                        <Dropdown
                                            style={[
                                                styles.text,
                                                {
                                                    height: 50,
                                                    borderColor: '#E2E8F0',
                                                    borderWidth: 1.5,
                                                    borderRadius: 12,
                                                    paddingHorizontal: 14,
                                                    backgroundColor: '#F8FAFC',
                                                },
                                                idcardTypeFocus && { borderColor: '#3B82F6' },
                                            ]}
                                            placeholderStyle={{ fontSize: 14, color: '#94A3B8' }}
                                            selectedTextStyle={{ fontSize: 14, color: '#000000', fontWeight: '600' }}
                                            itemTextStyle={{ fontSize: 14, color: '#000000', fontWeight: '500' }}
                                            containerStyle={{
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: 14,
                                                borderColor: '#E2E8F0',
                                                borderWidth: 1,
                                                shadowColor: '#1A3C6E',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 12,
                                                elevation: 8,
                                            }}
                                            iconStyle={{ width: 20, height: 20 }}
                                            dropdownPosition="auto"
                                            data={dataidentification}
                                            labelField="label"
                                            valueField="value"
                                            value={idcard_type}
                                            placeholder={
                                                idcard_type === 0
                                                    ? 'Choisir...'
                                                    : idcard_type === 1
                                                        ? "Carte nationale d'identité"
                                                        : idcard_type === 2
                                                            ? 'Passeport'
                                                            : idcard_type === 3
                                                                ? 'Permit de conduire'
                                                                : idcard_type === 4
                                                                    ? 'Autres'
                                                                    : null
                                            }
                                            onFocus={() => this.setState({ idcardTypeFocus: true })}
                                            onBlur={() => this.setState({ idcardTypeFocus: false })}
                                            onChange={(item) => this.setState({ idcard_type: item.value })}
                                        />
                                    </View>

                                    <View style={uploadstyle.documentCard}>
                                        <View style={uploadstyle.documentHeader}>
                                            <View style={[uploadstyle.documentIconContainer, { backgroundColor: '#F0FDF4' }]}>
                                                <Icon name="numeric" size={24} color="#10B981" />
                                            </View>
                                            <View style={uploadstyle.documentInfo}>
                                                <Text style={[uploadstyle.documentTitle, styles.textBold]}>
                                                    Numéro de la pièce d'identité
                                                </Text>
                                                <Text style={[uploadstyle.documentDescription, styles.text]}>
                                                    Saisissez le numéro figurant sur votre pièce
                                                </Text>
                                            </View>
                                        </View>
                                        <TextInput
                                            style={{
                                                height: 50,
                                                borderColor: '#E2E8F0',
                                                borderWidth: 1.5,
                                                borderRadius: 12,
                                                paddingHorizontal: 14,
                                                fontSize: 14,
                                                color: '#000000',
                                                backgroundColor: '#F8FAFC',
                                            }}
                                            placeholder="Saisir le numéro"
                                            placeholderTextColor="#94A3B8"
                                            onChangeText={(text) => this.setState({ idcard_number: text })}
                                            value={idcard_number}
                                        />
                                    </View>

                                    <View style={uploadstyle.documentCard}>
                                        <View style={uploadstyle.documentHeader}>
                                            <View style={[uploadstyle.documentIconContainer, { backgroundColor: '#FFF7ED' }]}>
                                                <Icon name="credit-card-outline" size={24} color="#F97316" />
                                            </View>
                                            <View style={uploadstyle.documentInfo}>
                                                <Text style={[uploadstyle.documentTitle, styles.textBold]}>
                                                    Vue principale de la pièce
                                                </Text>
                                                <Text style={[uploadstyle.documentDescription, styles.text]}>
                                                    Photographiez le recto de votre pièce d'identité
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={this._pickupRectoIdcard}>
                                            {idcard_recto && idcard_recto.uri ? (
                                                <View style={{
                                                    borderRadius: 14,
                                                    overflow: 'hidden',
                                                    borderWidth: 2,
                                                    borderColor: '#10B981',
                                                }}>
                                                    <ImageBackground
                                                        source={idcard_recto}
                                                        resizeMode="cover"
                                                        style={{ width: '100%', height: 180 }}
                                                    >
                                                        <View style={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 10,
                                                            backgroundColor: '#10B981',
                                                            borderRadius: 20,
                                                            padding: 4,
                                                        }}>
                                                            <Icon name="check" size={16} color="#FFF" />
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            ) : (
                                                <View style={uploadstyle.uploadButton}>
                                                    <View style={uploadstyle.uploadButtonIcon}>
                                                        <Icon name="camera-outline" size={22} color={COLORS.primary} />
                                                    </View>
                                                    <View style={uploadstyle.uploadButtonTextContainer}>
                                                        <Text style={[uploadstyle.uploadButtonText, styles.textBold]}>
                                                            Prendre une photo
                                                        </Text>
                                                        <Text style={[uploadstyle.uploadButtonSubtext, styles.text]}>
                                                            JPG ou PNG (max 10 Mo)
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    <View style={uploadstyle.documentCard}>
                                        <View style={uploadstyle.documentHeader}>
                                            <View style={[uploadstyle.documentIconContainer, { backgroundColor: '#FEF3C7' }]}>
                                                <Icon name="credit-card-refresh-outline" size={24} color="#F59E0B" />
                                            </View>
                                            <View style={uploadstyle.documentInfo}>
                                                <Text style={[uploadstyle.documentTitle, styles.textBold]}>
                                                    Arrière de la pièce
                                                </Text>
                                                <Text style={[uploadstyle.documentDescription, styles.text]}>
                                                    Photographiez le verso de votre pièce d'identité
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={this._pickupVersoIdcard}>
                                            {idcard_verso && idcard_verso.uri ? (
                                                <View style={{
                                                    borderRadius: 14,
                                                    overflow: 'hidden',
                                                    borderWidth: 2,
                                                    borderColor: '#10B981',
                                                }}>
                                                    <ImageBackground
                                                        source={idcard_verso}
                                                        resizeMode="cover"
                                                        style={{ width: '100%', height: 180 }}
                                                    >
                                                        <View style={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 10,
                                                            backgroundColor: '#10B981',
                                                            borderRadius: 20,
                                                            padding: 4,
                                                        }}>
                                                            <Icon name="check" size={16} color="#FFF" />
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            ) : (
                                                <View style={uploadstyle.uploadButton}>
                                                    <View style={uploadstyle.uploadButtonIcon}>
                                                        <Icon name="camera-outline" size={22} color={COLORS.primary} />
                                                    </View>
                                                    <View style={uploadstyle.uploadButtonTextContainer}>
                                                        <Text style={[uploadstyle.uploadButtonText, styles.textBold]}>
                                                            Prendre une photo
                                                        </Text>
                                                        <Text style={[uploadstyle.uploadButtonSubtext, styles.text]}>
                                                            JPG ou PNG (max 10 Mo)
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    <View style={uploadstyle.documentCard}>
                                        <View style={uploadstyle.documentHeader}>
                                            <View style={[uploadstyle.documentIconContainer, { backgroundColor: '#F3E8FF' }]}>
                                                <Icon name="account-box-outline" size={24} color="#8B5CF6" />
                                            </View>
                                            <View style={uploadstyle.documentInfo}>
                                                <Text style={[uploadstyle.documentTitle, styles.textBold]}>
                                                    Selfie avec la pièce
                                                </Text>
                                                <Text style={[uploadstyle.documentDescription, styles.text]}>
                                                    Photographiez-vous tenant votre pièce d'identité
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={this._pickupRectoPPIdcard}>
                                            {idcard_recto_pp && idcard_recto_pp.uri ? (
                                                <View style={{
                                                    borderRadius: 14,
                                                    overflow: 'hidden',
                                                    borderWidth: 2,
                                                    borderColor: '#10B981',
                                                }}>
                                                    <ImageBackground
                                                        source={idcard_recto_pp}
                                                        resizeMode="cover"
                                                        style={{ width: '100%', height: 180 }}
                                                    >
                                                        <View style={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 10,
                                                            backgroundColor: '#10B981',
                                                            borderRadius: 20,
                                                            padding: 4,
                                                        }}>
                                                            <Icon name="check" size={16} color="#FFF" />
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            ) : (
                                                <View style={uploadstyle.uploadButton}>
                                                    <View style={uploadstyle.uploadButtonIcon}>
                                                        <Icon name="camera-outline" size={22} color={COLORS.primary} />
                                                    </View>
                                                    <View style={uploadstyle.uploadButtonTextContainer}>
                                                        <Text style={[uploadstyle.uploadButtonText, styles.textBold]}>
                                                            Prendre une photo
                                                        </Text>
                                                        <Text style={[uploadstyle.uploadButtonSubtext, styles.text]}>
                                                            JPG ou PNG (max 10 Mo)
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        onPress={this._updateKyc}
                                        style={uploadstyle.submitButton}
                                        disabled={is_loading ? true : false}
                                    >
                                        {is_loading ? (
                                            <ActivityIndicator size="small" color="#fff" />
                                        ) : (
                                            <Text style={[styles.textBold, uploadstyle.submitBtnText]}>
                                                Enregistrer
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                        <View style={{ height: 60 }} />
                    </Animated.ScrollView>

                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            FetchPreloadDataAction,
            switchProfilPageAction,
            UpdateKycAction
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

export default connect(mapStateToProps, mapDispatchToProps, null)(UpdateProfil);