import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { schooldetailstyle } from '../../assets/styles/school_detail.js';
import { switchStudentChoolSelectedPageAction } from '../../navigations/rootNavigation.js';
import { styles } from '../../assets/styles/index.js';
import HTMLView from 'react-native-htmlview'
import { BASE_URL } from '../../api/config.js';


const { width } = Dimensions.get('window');

class School_Detail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            examData: [
                { name: 'BEPC', totalCandidates: 150, passedCandidates: 120 },
                { name: 'Probatoire', totalCandidates: 130, passedCandidates: 98 },
                { name: 'Baccalauréat', totalCandidates: 100, passedCandidates: 85 },
                { name: 'GCE O-Level', totalCandidates: 80, passedCandidates: 0 },
                { name: 'GCE A-Level', totalCandidates: 60, passedCandidates: 45 },
            ],

            filieres: [
                { id: 1, name: 'Science' },
                { id: 2, name: 'Littérature' },
                { id: 3, name: 'Mathématiques' },
                { id: 4, name: 'Informatique' },
                { id: 5, name: 'Biologie' },
                { id: 6, name: 'Arts' },
            ],

            localRating: null,
        };
    }

    get school() {
        return this.props.selectedSchool;
    }

    get schoolName() {
        return this.school?.Name || this.school?.name || '';
    }

    get schoolAbout() {
        return this.school?.about || this.school?.about || '';
    }

    get schoolRating() {
        if (this.state.localRating !== null) return this.state.localRating;
        return this.school?.etoiles || this.school?.rating || 0;
    }

    get schoolMaxRating() {
        return this.school?.maxEtoiles || this.school?.max_rating || 5;
    }

    get schoolImage() {
        if (!this.school?.logo) return require('../../assets/images/layer.png');
        if (typeof this.school.logo === 'object' && this.school.logo.uri) {
            return { uri: this.school.logo.uri };
        }
        if (typeof this.school.logo === 'string') {
            return { uri: this.school.logo };
        }
        return require('../../assets/images/layer.png');
    }

    get schoolAddress() {
        return this.school?.adresse || this.school?.address || '';
    }

    get schoolEmail() {
        return this.school?.Mail || this.school?.mail || this.school?.email || '';
    }

    get schoolWebsite() {
        return this.school?.website || this.school?.Website || '';
    }

    get schoolPhone() {
        return this.school?.contact || this.school?.Contact || this.school?.phone || '';
    }

    get schoolLatitude() {
        return this.school?.latitude || 4.0511;
    }

    get schoolLongitude() {
        return this.school?.longitude || 9.7679;
    }

    _navigateToProfile = () => {
        switchStudentChoolSelectedPageAction(true);
    }

    updateEtoiles = (nouveauNombreEtoiles) => {
        if (nouveauNombreEtoiles >= 0 && nouveauNombreEtoiles <= this.schoolMaxRating) {
            this.setState({ localRating: nouveauNombreEtoiles });
        }
    }

    renderEtoiles = () => {
        const etoiles = [];
        const { selectedSchool } = this.props;
        for (var i = 1; i <= this.schoolMaxRating; i++) {
            etoiles.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => this.updateEtoiles(i)}
                    activeOpacity={0.7}
                >
                    <Icon
                        name={i <= this.schoolRating ? "star" : "star-outline"}
                        size={24}
                        color={i <= this.schoolRating ? "#FFD700" : "#CBD5E1"}
                        style={schooldetailstyle.etoileIcon}
                    />
                </TouchableOpacity>
            );
        }

        return (
            <View style={schooldetailstyle.etoilesContainer}>
                {etoiles}
            </View>
        );
    }

    _openEmail = () => {
        const url = `mailto:${this.schoolEmail}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
            else Alert.alert('Erreur', 'Aucune application de messagerie trouvée.');
        }).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir l'application de messagerie."));
    }

    _openWebsite = () => {
        var url = this.schoolWebsite;
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
            else Alert.alert('Erreur', "Impossible d'ouvrir ce site web.");
        }).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir le navigateur."));
    }

    _callPhone = () => {
        const phoneNumber = this.schoolPhone.replace(/\s/g, '');
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
            else Alert.alert('Erreur', 'Les appels ne sont pas supportés sur cet appareil.');
        }).catch(() => Alert.alert('Erreur', "Impossible de lancer l'appel."));
    }

    _openWithGoogleMaps = () => {
        const { schoolLatitude, schoolLongitude } = this;
        const url = `https://www.google.com/maps/search/?api=1&query=${schoolLatitude},${schoolLongitude}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
            else Linking.openURL(`https://maps.google.com/?q=${schoolLatitude},${schoolLongitude}`);
        }).catch(() => Alert.alert('Erreur', "Impossible d'ouvrir Google Maps.", [{ text: 'OK' }]));
    }

    calculateSuccessRate = (totalCandidates, passedCandidates) => {
        if (totalCandidates === 0 || passedCandidates === 0) return null;
        return ((passedCandidates / totalCandidates) * 100).toFixed(1);
    }

    calculateBarHeight = (totalCandidates, passedCandidates) => {
        const rate = this.calculateSuccessRate(totalCandidates, passedCandidates);
        if (rate === null) return 0;
        return (rate / 100) * 150;
    }

    renderExamGraph = () => {

        const { selectedSchool } = this.props;
        const { examData } = this.state;
        return (
            <View style={schooldetailstyle.graphContainer}>
                <Text style={[schooldetailstyle.graphTitle, styles.textBold]}>Taux de réussite par examen</Text>
                <View style={schooldetailstyle.graphContent}>
                    <View style={schooldetailstyle.yAxis}>
                        <Text style={schooldetailstyle.yAxisLabel}>100%</Text>
                        <Text style={schooldetailstyle.yAxisLabel}>75%</Text>
                        <Text style={schooldetailstyle.yAxisLabel}>50%</Text>
                        <Text style={schooldetailstyle.yAxisLabel}>25%</Text>
                        <Text style={schooldetailstyle.yAxisLabel}>0%</Text>
                    </View>
                    <View style={schooldetailstyle.barsContainer}>
                        {examData.map((exam, index) => {
                            const successRate = this.calculateSuccessRate(exam.totalCandidates, exam.passedCandidates);
                            const barHeight = this.calculateBarHeight(exam.totalCandidates, exam.passedCandidates);
                            return (
                                <View key={index} style={schooldetailstyle.barColumn}>
                                    <Text style={schooldetailstyle.percentageAbove}>
                                        {successRate !== null ? `${successRate}%` : ''}
                                    </Text>
                                    <View style={schooldetailstyle.barWithName}>
                                        {successRate !== null ? (
                                            <View style={[schooldetailstyle.bar, { height: barHeight }]} />
                                        ) : (
                                            <View style={schooldetailstyle.nullBar} />
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={schooldetailstyle.examNamesContainer}>
                    {examData.map((exam, index) => (
                        <View key={index} style={schooldetailstyle.examNameWrapper}>
                            <Text style={[schooldetailstyle.examName, styles.textBold]} numberOfLines={2}>{exam.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    renderFilieres = () => {
        const { selectedSchool } = this.props;
        const { filieres } = this.state;
        return (
            <View style={schooldetailstyle.filieresContainer}>
                <Text style={[schooldetailstyle.filieresTitle, styles.textBold]}>Filières disponibles</Text>
                <View style={schooldetailstyle.filieresGrid}>
                    {filieres.map((filiere) => (
                        <View key={filiere.id} style={schooldetailstyle.filiereItem}>
                            <View style={schooldetailstyle.filiereDot} />
                            <Text style={[schooldetailstyle.filiereName, styles.textBold]}>{filiere.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    renderLocalisation = () => {
        const { selectedSchool } = this.props;
        return (
            <View style={schooldetailstyle.localisationContainer}>
                <Text style={[schooldetailstyle.localisationTitle, styles.textBold]}>Localisation</Text>
                <TouchableOpacity style={schooldetailstyle.localisationContent} onPress={this._openWithGoogleMaps} activeOpacity={0.7}>
                    <View style={schooldetailstyle.localisationRow}>
                        <View style={schooldetailstyle.locationIconContainer}>
                            <Icon name="map-marker" size={24} color="#3B82F6" />
                        </View>
                        <View style={schooldetailstyle.locationTextContainer}>
                            <Text style={[schooldetailstyle.locationAddress, styles.textBold]} numberOfLines={2}>
                                {selectedSchool.address}
                            </Text>
                            <View style={schooldetailstyle.openMapContainer}>
                                <Icon name="open-in-new" size={14} color="#FFFFFF" style={schooldetailstyle.openMapIcon} />
                                <Text style={[schooldetailstyle.openMapText, styles.textBold]}>Voir sur la carte</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    renderContact = () => {
        const { selectedSchool } = this.props;
        return (
            <View style={schooldetailstyle.contactContainer}>
                <Text style={[schooldetailstyle.contactTitle, styles.textBold]}>Contact</Text>

                <TouchableOpacity style={schooldetailstyle.contactItem} onPress={this._openEmail} activeOpacity={0.7}>
                    <View style={[schooldetailstyle.contactIconContainer, { backgroundColor: '#EFF6FF' }]}>
                        <Icon name="email-outline" size={22} color="#3B82F6" />
                    </View>
                    <View style={schooldetailstyle.contactTextContainer}>
                        <Text style={[schooldetailstyle.contactLabel, styles.textBold]}>Email</Text>
                        <Text style={[schooldetailstyle.contactValue, styles.textBold]}>{selectedSchool.mail}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#CBD5E1" />
                </TouchableOpacity>

                <TouchableOpacity style={schooldetailstyle.contactItem} onPress={this._openWebsite} activeOpacity={0.7}>
                    <View style={[schooldetailstyle.contactIconContainer, { backgroundColor: '#F0FDF4' }]}>
                        <Icon name="web" size={22} color="#22C55E" />
                    </View>
                    <View style={schooldetailstyle.contactTextContainer}>
                        <Text style={[schooldetailstyle.contactLabel, styles.textBold]}>Site Web</Text>
                        <Text style={[schooldetailstyle.contactValue, styles.textBold]}>{selectedSchool.website}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#CBD5E1" />
                </TouchableOpacity>

                <TouchableOpacity style={[schooldetailstyle.contactItem, schooldetailstyle.contactItemLast]} onPress={this._callPhone} activeOpacity={0.7}>
                    <View style={[schooldetailstyle.contactIconContainer, { backgroundColor: '#FFF7ED' }]}>
                        <Icon name="phone" size={22} color="#F97316" />
                    </View>
                    <View style={schooldetailstyle.contactTextContainer}>
                        <Text style={[schooldetailstyle.contactLabel, styles.textBold]}>Téléphone</Text>
                        <Text style={[schooldetailstyle.contactValue, styles.textBold]}>{selectedSchool.phone}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#CBD5E1" />
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const { selectedSchool } = this.props;
        return (
            <SafeAreaView style={schooldetailstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <ScrollView contentContainerStyle={schooldetailstyle.scrollContent}>
                        <View style={schooldetailstyle.section}>
                            <View style={styles.section}>
                                <View style={styles.back}>
                                    <TouchableOpacity onPress={this._navigateToProfile}>
                                        <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.sectionTitle, styles.textBold]}>Détails de l'école</Text>
                            </View>
                        </View>

                        <View style={schooldetailstyle.profileCard}>
                            <View style={schooldetailstyle.ImageContainer}>
                                <Image style={schooldetailstyle.image} source={{ uri: BASE_URL + selectedSchool.logo }}
                                />
                            </View>

                            <View style={schooldetailstyle.rowTitle}>
                                <Text style={[schooldetailstyle.valueTitle, styles.textBold]}>
                                    {selectedSchool.name}
                                </Text>
                            </View>

                            {this.renderEtoiles()}

                            <View style={schooldetailstyle.separator} />

                            <Text style={[schooldetailstyle.labelValue, styles.text]}>A propos</Text>
                            <View style={schooldetailstyle.row}>

                                <HTMLView
                                    styleSheet={[styles.text]}
                                    value={selectedSchool.about}
                                />

                            </View>

                            <View style={schooldetailstyle.Row}>
                                <Text style={[schooldetailstyle.label, styles.text]}>Statistique des examens officiels</Text>
                                {this.renderExamGraph()}
                            </View>

                            {this.renderFilieres()}

                            {this.renderLocalisation()}

                            {this.renderContact()}
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchStudentChoolSelectedPageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    selectedSchool: state.auth.selectedSchool,
});

export default connect(mapStateToProps, mapDispatchToProps)(School_Detail);