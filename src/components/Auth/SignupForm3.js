import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { styles } from '../../assets/styles/index.js';
import { sigupstyle } from '../../assets/styles/signup.js';
import { switchSignupForm2Action } from '../../navigations/rootNavigation.js';
import { SignupAction } from '../../reducers/actions/index.js';
import { COLORS } from '../../assets/styles/theme.js';

const ACCEPTED_TYPES = [
    DocumentPicker.types.pdf,
    DocumentPicker.types.images,
];

class signupForm3 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            uploadedDocuments: {},
            uploadingDocId: null,
            requiredDocuments: [],
            type_user: '',
            field: '',
            classe: '',
            admission_type: '',
        };
    }

    async componentDidMount() {
        await this._loadStoredDocumentsAndData();
    }

    // Chargement des documents requis et réhydratation du contexte de formulaire
    _loadStoredDocumentsAndData = async () => {
        try {
            const rawDocs = await AsyncStorage.getItem('RequiredDocuments');
            const form1data = await AsyncStorage.getItem('DataForm1');
            const chooseData = await AsyncStorage.getItem('DataChoose');

            let requiredDocuments = [];
            if (rawDocs) {
                requiredDocuments = JSON.parse(rawDocs);
            }

            let type_user = '';
            if (chooseData) {
                const parsedChoose = JSON.parse(chooseData);
                type_user = parsedChoose.type_user || '';
            }

            let field = '';
            let classe = '';
            let admission_type = '';

            if (form1data) {
                const parsedForm1 = JSON.parse(form1data);
                field = parsedForm1.field || '';
                classe = parsedForm1.classe || '';
                admission_type = parsedForm1.admission_type || '';
            }

            this.setState({
                requiredDocuments,
                type_user,
                field,
                classe,
                admission_type,
            });
        } catch (error) {
            console.error('Erreur de chargement dans Form3:', error);
            Toast.show({
                type: 'error',
                props: { text: 'Erreur', message: 'Impossible de charger la liste des documents requis.' },
            });
        }
    };

    _navigateToForm2 = () => switchSignupForm2Action(true);

    // Sélection d'un document via le picker natif
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
                Alert.alert('Fichier volumineux', 'Le fichier ne doit pas dépasser 10 Mo.');
                this.setState({ uploadingDocId: null });
                return;
            }

            const documentData = {
                name: file.name || `document_${docId}`,
                uri: file.fileCopyUri || file.uri,
                type: file.type || 'application/pdf',
                size: file.size || 0,
            };

            this.setState((prevState) => ({
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
        this.setState((prevState) => {
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

    _canSubmit = () => {
        const { requiredDocuments, uploadedDocuments } = this.state;
        if (!requiredDocuments || requiredDocuments.length === 0) return true;
        return requiredDocuments.every((doc) => uploadedDocuments[doc.id]);
    };

    // Envoi final des données combinées (Form1, Form2 & Documents)
    _submitAllForms = async () => {
        const { uploadedDocuments, type_user, field, classe, admission_type } = this.state;

        if (!this._canSubmit()) {
            Toast.show({
                type: 'error',
                text1: 'Documents manquants',
                text2: 'Veuillez téléverser tous les documents demandés avant d\'envoyer.',
            });
            return;
        }

        try {
            let school = '';
            const selectedSchoolRaw = await AsyncStorage.getItem('SelectedSchoolId');
            if (selectedSchoolRaw) {
                const parsed = JSON.parse(selectedSchoolRaw);
                school = parsed.school !== undefined ? parsed.school : parsed;
            }

            const form1data = await AsyncStorage.getItem('DataForm1');
            const form2data = await AsyncStorage.getItem('Dataform2');

            let username = '', first_name = '', last_name = '', email = '', birthday_date = '', phone = '';
            if (form1data) {
                const unpack = JSON.parse(form1data);
                username = unpack.username || '';
                first_name = unpack.first_name || '';
                last_name = unpack.last_name || '';
                email = unpack.email || '';
                birthday_date = unpack.birthday_date || '';
                phone = unpack.phone || '';
            }

            let country = '', nationality = '', city = '', sexe = '', address = '', password1 = '', password2 = '', acceptCondition = false;
            if (form2data) {
                const unpack2 = JSON.parse(form2data);
                country = unpack2.country || '';
                nationality = unpack2.nationality || '';
                city = unpack2.city || '';
                sexe = unpack2.sexe || '';
                address = unpack2.address || '';
                password1 = unpack2.password1 || '';
                password2 = unpack2.password2 || '';
                acceptCondition = unpack2.acceptCondition || false;
            }

            const formdata = new FormData();
            formdata.append('type_user', type_user);
            formdata.append('username', username);
            formdata.append('first_name', first_name);
            formdata.append('last_name', last_name);
            formdata.append('email', email);
            formdata.append('birthday_date', birthday_date);
            formdata.append('phone', phone);
            formdata.append('sexe', sexe?.label || sexe);
            formdata.append('country', country);
            formdata.append('nationality', nationality);
            formdata.append('city', city?.id || city || '');
            formdata.append('address', address);
            formdata.append('password1', password1);
            formdata.append('password2', password2);
            formdata.append('acceptCondition', acceptCondition);
            formdata.append('school', school);

            const isStudent = type_user === 'school_student';
            if (isStudent) {
                formdata.append('field', field || '');
                formdata.append('classe', classe || '');
                formdata.append('admission_type', admission_type || '');
            }

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

            SignupAction(formdata);
        } catch (e) {
            console.error('Erreur préparation FormData dans Form3:', e);
            Toast.show({
                type: 'error',
                props: { text: 'Erreur', message: 'Une erreur est survenue lors de la préparation des données.' },
            });
        }
    };

    render() {
        const { is_loading } = this.props;
        const { uploadedDocuments, uploadingDocId, requiredDocuments } = this.state;

        return (
            <View style={sigupstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary}  />

                {/* Ambient Glowing Orbs */}
                <View style={sigupstyle.topGlow} />
                <View style={sigupstyle.bottomGlow} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={sigupstyle.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Bar */}
                    <View style={sigupstyle.headerRow}>
                        <TouchableOpacity
                            style={sigupstyle.backButton}
                            onPress={this._navigateToForm2}
                            activeOpacity={0.7}
                        >
                            <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Logo & Header Section */}
                    <View style={sigupstyle.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={sigupstyle.logo}
                            resizeMode="contain"
                        />
                        <Text style={[styles.textBold, sigupstyle.brandBadge]}>POLY-H SCHOOL</Text>
                        <Text style={[styles.textBold, sigupstyle.title]}>Inscription (Étape 3/3)</Text>
                        <Text style={[styles.text, sigupstyle.slogan]}>
                            Veuillez importer les documents nécessaires pour finaliser votre dossier.
                        </Text>
                    </View>

                    {/* Form Container */}
                    <View style={sigupstyle.inputContainer}>
                        {requiredDocuments.length > 0 ? (
                            requiredDocuments.map((doc) => {
                                const uploadedDoc = uploadedDocuments[doc.id];
                                const isUploading = uploadingDocId === doc.id;

                                return (
                                    <View key={doc.id} style={{ marginBottom: 16 }}>
                                        <Text style={[styles.text, sigupstyle.label]}>
                                            {doc.name} *
                                        </Text>

                                        {uploadedDoc ? (
                                            /* Affichage du document téléchargé */
                                            <View style={[sigupstyle.inputWrapper, { paddingVertical: 10, justifyContent: 'space-between' }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                    <Icon
                                                        name={uploadedDoc.type === 'application/pdf' ? 'file-pdf-box' : 'file-image-outline'}
                                                        size={26}
                                                        color={uploadedDoc.type === 'application/pdf' ? '#EF4444' : '#f6a100'}
                                                        style={{ marginRight: 10 }}
                                                    />
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[styles.textBold, { color: '#FFFFFF', fontSize: 13 }]} numberOfLines={1}>
                                                            {uploadedDoc.name}
                                                        </Text>
                                                        <Text style={[styles.text, { color: '#94A3B8', fontSize: 11 }]}>
                                                            {this._formatFileSize(uploadedDoc.size)}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Icon name="check-circle" size={20} color="#10B981" style={{ marginRight: 10 }} />
                                                    <TouchableOpacity onPress={() => this._removeDocument(doc.id)} activeOpacity={0.7}>
                                                        <Icon name="close-circle" size={22} color="#F87171" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ) : (
                                            /* Zone de téléversement */
                                            <TouchableOpacity
                                                style={[
                                                    sigupstyle.inputWrapper,
                                                    {
                                                        borderStyle: 'dashed',
                                                        borderWidth: 1.5,
                                                        borderColor: '#334155',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: 14,
                                                        backgroundColor: '#030D1E',
                                                    }
                                                ]}
                                                onPress={() => this._pickDocument(doc.id)}
                                                disabled={isUploading}
                                                activeOpacity={0.7}
                                            >
                                                {isUploading ? (
                                                    <ActivityIndicator size="small" color="#f6a100" />
                                                ) : (
                                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                        <Icon name="cloud-upload-outline" size={20} color="#f6a100" style={{ marginRight: 8 }} />
                                                        <Text style={[styles.textBold, { color: '#94A3B8', fontSize: 13 }]}>
                                                            Charger un fichier (PDF, JPG, PNG)
                                                        </Text>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })
                        ) : (
                            <Text style={[styles.text, { textAlign: 'center', marginVertical: 30, color: '#94A3B8' }]}>
                                Aucun document requis pour cette admission.
                            </Text>
                        )}

                        {/* Bouton de Soumission Finale */}
                        <TouchableOpacity
                            onPress={this._submitAllForms}
                            style={[
                                sigupstyle.button,
                                !this._canSubmit() && { opacity: 0.5 }
                            ]}
                            disabled={is_loading || !this._canSubmit()}
                            activeOpacity={0.85}
                        >
                            {is_loading ? (
                                <ActivityIndicator size="small" color="#011638" />
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.textBold, sigupstyle.buttonText]}>
                                        {this._canSubmit() ? 'Soumettre l\'inscription' : 'Documents manquants'}
                                    </Text>
                                    <Entypo name="check" size={18} color="#011638" style={{ marginLeft: 8 }} />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            SignupAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(signupForm3);