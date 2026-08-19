import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View, Text, TouchableOpacity, Image, ImageBackground,
    Animated, ActivityIndicator, ScrollView, Alert
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../../assets/styles/index.js';
import { uploadstyle } from '../../../assets/styles/uploadadmissiondocument.js';
import { switchParentAdmissionTypeAction } from '../../../navigations/rootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addChildAction } from '../../../reducers/actions/index.js';

const ACCEPTED_TYPES = [
    DocumentPicker.types.pdf,
    DocumentPicker.types.images,
];

class UploadDocuments extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            uploadedDocuments: {},
            uploadingDocId: null,
            scrollY: new Animated.Value(0),
            admissionDocuments: [],
            admissionId: null,
            form1Data: {},
            form2Data: {},
            speciality: '',
            classe: '',  
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    async componentDidMount() {
        await this._loadAdmissionData();
        await this._loadAllFormData();
    }

    _loadAdmissionData = async () => {
        try {
            const chooseAdmission = await AsyncStorage.getItem('DataAdmission');
            var admissionId = null;

            if (chooseAdmission) {
                const parsed = JSON.parse(chooseAdmission);
                admissionId = parsed.admission_id ?? null;
                this.setState({ admissionId });
            }

            const { school_infos } = this.props;
            var docList = [];

            if (admissionId && school_infos?.admissiondocuments?.length > 0) {
                const matchedAdmission = school_infos.admissiondocuments.find(
                    item => item.id === admissionId
                );
                if (matchedAdmission) {
                    docList = matchedAdmission.documentlist || [];
                }
            }

            this.setState({ admissionDocuments: docList });
        } catch (error) {
            console.error('Error loading admission data:', error);
            Alert.alert('Erreur', 'Impossible de charger la liste des documents.');
        }
    };

    _loadAllFormData = async () => {
        const form2data = await AsyncStorage.getItem('Dataform2');
        const form1data = await AsyncStorage.getItem('DataForm1');

        if (form1data) {
            const data = JSON.parse(form1data);
            this.setState({
                speciality: data.speciality,
                classe: data.classe
            });
        }

        if (form2data) {
            const persistdata = JSON.parse(form2data);
            this.setState({
                sexe: persistdata.sexe || null,
                country: persistdata.country || null,
                city: persistdata.city || null,
                address: persistdata.address || '',
                nationality: persistdata.nationality || '',
                acceptCondition: persistdata.acceptCondition || false,
            });
        }

    };

    _navigateToAdmission = () => {
        switchParentAdmissionTypeAction(true);
    };

    _pickDocument = async (docId) => {
        try {
            this.setState({ uploadingDocId: docId });

            const result = await DocumentPicker.pick({
                type: ACCEPTED_TYPES,
                copyTo: 'cachesDirectory',
            });

            const file = result[0];

            const allowedMimes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (file.type && !allowedMimes.includes(file.type)) {
                Alert.alert('Format non supporté', 'Seuls les fichiers PDF, JPG, JPEG et PNG sont acceptés.');
                this.setState({ uploadingDocId: null });
                return;
            }

            if (file.size && file.size > 10 * 1024 * 1024) {
                Alert.alert('Fichier trop volumineux', 'Le fichier ne doit pas dépasser 10 Mo.');
                this.setState({ uploadingDocId: null });
                return;
            }

            const documentData = {
                name: file.name || `document_${docId}`,
                uri: file.fileCopyUri || file.uri,
                type: file.type || 'application/pdf',
                size: file.size || 0,
            };

            this.setState(prevState => ({
                uploadedDocuments: {
                    ...prevState.uploadedDocuments,
                    [docId]: documentData,
                },
                uploadingDocId: null,
            }));
        } catch (err) {
            this.setState({ uploadingDocId: null });
            if (!DocumentPicker.isCancel(err)) {
                Alert.alert('Erreur', 'Impossible de charger le document.');
            }
        }
    };

    _removeDocument = (docId) => {
        this.setState(prevState => {
            const updated = { ...prevState.uploadedDocuments };
            delete updated[docId];
            return { uploadedDocuments: updated };
        });
    };

    _formatFileSize = (bytes) => {
        if (!bytes) return '';
        if (bytes < 1024) return `${bytes} o`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
    };

    _submitDocuments = async () => {
        const { uploadedDocuments, admissionId, speciality, classe } = this.state;
        const { user_token, gardiant_infos } = this.props;

        const requiredDocs = this.state.admissionDocuments.filter(d => d.is_mandatory);
        const missingRequired = requiredDocs.filter(doc => !uploadedDocuments[doc.id]);

        if (missingRequired.length > 0) {
            const missingNames = missingRequired.map(d => d.name).join('\n• ');
            Alert.alert('Documents manquants', `Veuillez fournir les documents obligatoires suivants :\n\n• ${missingNames}`);
            return;
        }



        var school = '';
        try {
            const selectedSchoolRaw = await AsyncStorage.getItem('SelectedSchoolId');
            if (selectedSchoolRaw) {
                const parsed = JSON.parse(selectedSchoolRaw);
                school = parsed.school !== undefined ? parsed.school : parsed;
            }
        } catch (e) {
            console.error('Erreur lors de la récupération du schoolId :', e);
        }


        const form1data = await AsyncStorage.getItem('DataForm1');
        var username = '';
        var first_name = '';
        var last_name = '';
        var email = '';
        var birthday_date = '';
        var phone = '';
        if (form1data !== null) {
            const unpackdata = JSON.parse(form1data);
            if (unpackdata.username !== '') username = unpackdata.username;
            if (unpackdata.first_name !== '') first_name = unpackdata.first_name;
            if (unpackdata.last_name !== '') last_name = unpackdata.last_name;
            if (unpackdata.email !== '') email = unpackdata.email;
            if (unpackdata.birthday_date !== '') birthday_date = unpackdata.birthday_date;
            if (unpackdata.phone !== '') phone = unpackdata.phone;
        }


        const form2data = await AsyncStorage.getItem('Dataform2');
        var country = '';
        var nationality = '';
        var city = '';
        var sexe = '';
        var address = '';
        var acceptCondition = '';
        if (form2data !== null) {
            const unpackdata = JSON.parse(form2data);
            if (unpackdata.country !== '') country = unpackdata.country;
            if (unpackdata.nationality !== '') nationality = unpackdata.nationality;
            if (unpackdata.city !== '') city = unpackdata.city;
            if (unpackdata.sexe !== '') sexe = unpackdata.sexe;
            if (unpackdata.address !== '') address = unpackdata.address;
            if (unpackdata.acceptCondition !== '') acceptCondition = unpackdata.acceptCondition;
        }

        //if (admissionId) formdata.append('admission_id', admissionId);

        const formdata = new FormData();

        formdata.append('username', username);
        formdata.append('first_name', first_name);
        formdata.append('last_name', last_name);
        formdata.append('email', email);
        formdata.append('birthday_date', birthday_date);
        formdata.append('speciality', speciality),
        formdata.append('classe', classe),
        formdata.append('phone', phone);
        formdata.append('sexe', sexe?.label);
        formdata.append('country', country);
        formdata.append('nationality', nationality);
        formdata.append('city', city);
        formdata.append('address', address);
        formdata.append('acceptCondition', acceptCondition);
        formdata.append('school', school);
        formdata.append('token', user_token);

        const documentsArray = [];
        Object.entries(uploadedDocuments).forEach(([docId, doc]) => {
            formdata.append(`documents[${docId}]`, {
                name: doc.name,
                uri: doc.uri,
                type: doc.type,
            });
            documentsArray.push(docId);
        });
        formdata.append('documents', JSON.stringify(documentsArray));

        console.log('FormData prêt pour envoi:', {
            _parts: formdata._parts.map(part => ({
                champ: part[0],
                valeur: part[1]
            }))
        });


        var gardiant_data = gardiant_infos

        addChildAction(formdata, gardiant_data);
    };

    _canSubmit = () => {
        const requiredDocs = this.state.admissionDocuments.filter(d => d.is_mandatory);
        return requiredDocs.every(doc => this.state.uploadedDocuments[doc.id]);
    };

    render() {
        const { is_loading, school_infos } = this.props;
        const { uploadedDocuments, uploadingDocId, admissionDocuments } = this.state;

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
                    >
                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToAdmission}>
                                    <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold]}>
                                Documents d'inscription
                            </Text>
                        </View>

                        <View style={uploadstyle.formcontainer}>
                            {admissionDocuments.length > 0 ? (
                                admissionDocuments.map((doc) => {
                                    const uploadedDoc = uploadedDocuments[doc.id];
                                    const isUploading = uploadingDocId === doc.id;
                                    const isRequired = doc.is_mandatory;

                                    return (
                                        <View key={doc.id} style={uploadstyle.documentCard}>
                                            <View style={uploadstyle.documentHeader}>
                                                <View style={[uploadstyle.documentIcon, { backgroundColor: '#3B82F620' }]}>
                                                    <Icon name="file-document-outline" size={24} color="#3B82F6" />
                                                </View>
                                                <View style={uploadstyle.documentInfo}>
                                                    <View style={uploadstyle.documentTitleRow}>
                                                        <Text style={[uploadstyle.documentTitle, styles.textBold]}>
                                                            {doc.name}
                                                        </Text>
                                                        {isRequired ? (
                                                            <View style={uploadstyle.requiredBadge}>
                                                                <Text style={uploadstyle.requiredText}>Obligatoire</Text>
                                                            </View>
                                                        ) : (
                                                            <View style={uploadstyle.optionalBadge}>
                                                                <Text style={uploadstyle.optionalText}>Optionnel</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <Text style={[uploadstyle.documentDescription, styles.text]}>
                                                        {doc.description
                                                            ? doc.description.replace(/<[^>]+>/g, '').trim()
                                                            : 'Veuillez fournir ce document'}
                                                    </Text>
                                                </View>
                                            </View>

                                            {uploadedDoc ? (
                                                <View style={uploadstyle.uploadedFileContainer}>
                                                    <View style={uploadstyle.uploadedFileInfo}>
                                                        <Icon
                                                            name={uploadedDoc.type === 'application/pdf' ? 'file-pdf-box' : 'file-image-outline'}
                                                            size={28}
                                                            color={uploadedDoc.type === 'application/pdf' ? '#EF4444' : '#3B82F6'}
                                                        />
                                                        <View style={uploadstyle.uploadedFileDetails}>
                                                            <Text style={[uploadstyle.uploadedFileName, styles.textBold]} numberOfLines={1}>
                                                                {uploadedDoc.name}
                                                            </Text>
                                                            <Text style={[uploadstyle.uploadedFileSize, styles.text]}>
                                                                {this._formatFileSize(uploadedDoc.size)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={uploadstyle.uploadedFileActions}>
                                                        <Icon name="check-circle" size={22} color="#1B497D" />
                                                        <TouchableOpacity onPress={() => this._removeDocument(doc.id)}>
                                                            <Icon name="close-circle" size={22} color="#EF4444" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ) : (
                                                <TouchableOpacity
                                                    style={uploadstyle.uploadButton}
                                                    onPress={() => this._pickDocument(doc.id)}
                                                    disabled={isUploading}
                                                    activeOpacity={0.7}
                                                >
                                                    {isUploading ? (
                                                        <ActivityIndicator size="small" color="#1B497D" />
                                                    ) : (
                                                        <>
                                                            <Icon name="cloud-upload-outline" size={22} color="#1B497D" />
                                                            <Text style={[uploadstyle.uploadButtonText, styles.textBold]}>
                                                                Charger un fichier
                                                            </Text>
                                                            <Text style={[uploadstyle.uploadHint, styles.text]}>
                                                                PDF, JPG, JPEG ou PNG (max 10 Mo)
                                                            </Text>
                                                        </>
                                                    )}
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    );
                                })
                            ) : (
                                <Text style={{ textAlign: 'center', marginVertical: 40, color: '#fff', fontSize: 16 }}>
                                    {school_infos ? 'Aucun document requis trouvé.' : 'Chargement des documents...'}
                                </Text>
                            )}

                            <TouchableOpacity
                                onPress={this._submitDocuments}
                                style={[
                                    uploadstyle.submitButton,
                                    !this._canSubmit() && uploadstyle.submitButtonDisabled
                                ]}
                                disabled={is_loading || !this._canSubmit()}
                                activeOpacity={0.8}
                            >
                                {is_loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <>
                                        <Icon name="check-circle-outline" size={22} color="#FFF" />
                                        <Text style={[styles.textBold, uploadstyle.submitBtnText]}>
                                            {this._canSubmit() ? 'Soumettre les documents' : 'Documents obligatoires manquants'}
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 80 }} />
                    </Animated.ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ 
        switchParentAdmissionTypeAction,
        addChildAction 
    }, dispatch),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    school_infos: state.auth.school_infos,
    user_token: state.auth.user_token,
    gardiant_infos: state.auth.gardiant_infos,
});

export default connect(mapStateToProps, mapDispatchToProps, null)(UploadDocuments);