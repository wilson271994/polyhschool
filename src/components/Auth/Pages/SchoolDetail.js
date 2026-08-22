import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
    Linking,
    Alert,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import HTMLView from 'react-native-htmlview';

import { htmlStyles, schooldetailstyle } from '../../../assets/styles/school_detail.js';
import { switchSchoolSelectionAction } from '../../../navigations/rootNavigation.js';
import { styles } from '../../../assets/styles/index.js';
import { BASE_URL } from '../../../api/config.js';
import { COLORS } from '../../../assets/styles/theme.js';

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

    // Get selected school object from Redux state
    get school() {
        return this.props.selectedSchool;
    }

    get schoolName() {
        return this.school?.Name || this.school?.name || '';
    }

    get schoolAbout() {
        return this.school?.about || '';
    }

    get schoolRating() {
        if (this.state.localRating !== null) return this.state.localRating;
        return this.school?.etoiles || this.school?.rating || 0;
    }

    get schoolMaxRating() {
        return this.school?.maxEtoiles || this.school?.max_rating || 5;
    }

    get schoolImage() {
        if (!this.school?.logo) return require('../../../assets/images/layer.png');
        if (typeof this.school.logo === 'object' && this.school.logo.uri) {
            return { uri: this.school.logo.uri };
        }
        if (typeof this.school.logo === 'string') {
            const fullUri = this.school.logo.startsWith('http')
                ? this.school.logo
                : `${BASE_URL}${this.school.logo}`;
            return { uri: fullUri };
        }
        return require('../../../assets/images/layer.png');
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

    // Navigate back to school list view
    _navigateToProfile = () => {
        switchSchoolSelectionAction(true);
    };

    // Update rating stars state locally
    updateEtoiles = (nouveauNombreEtoiles) => {
        if (nouveauNombreEtoiles >= 0 && nouveauNombreEtoiles <= this.schoolMaxRating) {
            this.setState({ localRating: nouveauNombreEtoiles });
        }
    };

    // Render interactive star rating widget
    renderEtoiles = () => {
        const etoiles = [];
        for (let i = 1; i <= this.schoolMaxRating; i++) {
            etoiles.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => this.updateEtoiles(i)}
                    activeOpacity={0.7}
                >
                    <Icon
                        name={i <= this.schoolRating ? 'star' : 'star-outline'}
                        size={22}
                        color={i <= this.schoolRating ? '#f6a100' : '#64748B'}
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
    };

    // Trigger default email app
    _openEmail = () => {
        const url = `mailto:${this.schoolEmail}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) Linking.openURL(url);
                else Alert.alert('Erreur', 'Aucune application de messagerie trouvée.');
            })
            .catch(() => Alert.alert('Erreur', "Impossible d'ouvrir l'application de messagerie."));
    };

    // Trigger web browser
    _openWebsite = () => {
        let url = this.schoolWebsite;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) Linking.openURL(url);
                else Alert.alert('Erreur', "Impossible d'ouvrir ce site web.");
            })
            .catch(() => Alert.alert('Erreur', "Impossible d'ouvrir le navigateur."));
    };

    // Trigger phone dialer
    _callPhone = () => {
        const phoneNumber = this.schoolPhone.replace(/\s/g, '');
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) Linking.openURL(url);
                else Alert.alert('Erreur', 'Les appels ne sont pas supportés sur cet appareil.');
            })
            .catch(() => Alert.alert('Erreur', "Impossible de lancer l'appel."));
    };

    // Open maps application with school coordinates
    _openWithGoogleMaps = () => {
        const { schoolLatitude, schoolLongitude } = this;
        const url = `http://maps.google.com/maps?q=${schoolLatitude},${schoolLongitude}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) Linking.openURL(url);
                else Linking.openURL(`http://maps.google.com/maps?q=${schoolLatitude},${schoolLongitude}`);
            })
            .catch(() => Alert.alert('Erreur', "Impossible d'ouvrir Google Maps."));
    };

    // Calculate exam success percentage
    calculateSuccessRate = (totalCandidates, passedCandidates) => {
        if (totalCandidates === 0 || passedCandidates === 0) return null;
        return ((passedCandidates / totalCandidates) * 100).toFixed(1);
    };

    // Calculate bar chart visual height
    calculateBarHeight = (totalCandidates, passedCandidates) => {
        const rate = this.calculateSuccessRate(totalCandidates, passedCandidates);
        if (rate === null) return 0;
        return (rate / 100) * 140;
    };

    // Render official exam statistics bar chart
    renderExamGraph = () => {
        const { examData } = this.state;
        return (
            <View style={schooldetailstyle.graphContainer}>
                <Text style={[styles.textBold, schooldetailstyle.graphTitle]}>
                    Taux de réussite par examen
                </Text>
                <View style={schooldetailstyle.graphContent}>
                    {/* Y-Axis Scale Labels */}
                    <View style={schooldetailstyle.yAxis}>
                        <Text style={[styles.text, schooldetailstyle.yAxisLabel]}>100%</Text>
                        <Text style={[styles.text, schooldetailstyle.yAxisLabel]}>75%</Text>
                        <Text style={[styles.text, schooldetailstyle.yAxisLabel]}>50%</Text>
                        <Text style={[styles.text, schooldetailstyle.yAxisLabel]}>25%</Text>
                        <Text style={[styles.text, schooldetailstyle.yAxisLabel]}>0%</Text>
                    </View>

                    {/* Bar Columns Container */}
                    <View style={schooldetailstyle.barsContainer}>
                        {examData.map((exam, index) => {
                            const successRate = this.calculateSuccessRate(exam.totalCandidates, exam.passedCandidates);
                            const barHeight = this.calculateBarHeight(exam.totalCandidates, exam.passedCandidates);
                            return (
                                <View key={index} style={schooldetailstyle.barColumn}>
                                    <Text style={[styles.textBold, schooldetailstyle.percentageAbove]}>
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

                {/* Exam Names X-Axis Labels */}
                <View style={schooldetailstyle.examNamesContainer}>
                    {examData.map((exam, index) => (
                        <View key={index} style={schooldetailstyle.examNameWrapper}>
                            <Text style={[styles.textBold, schooldetailstyle.examName]} numberOfLines={2}>
                                {exam.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    // Render available academic majors / filières chips
    renderFilieres = () => {
        const { filieres } = this.state;
        return (
            <View style={schooldetailstyle.filieresContainer}>
                <Text style={[styles.textBold, schooldetailstyle.sectionTitleHeader]}>
                    Filières disponibles
                </Text>
                <View style={schooldetailstyle.filieresGrid}>
                    {filieres.map((filiere) => (
                        <View key={filiere.id} style={schooldetailstyle.filiereChip}>
                            <View style={schooldetailstyle.filiereDot} />
                            <Text style={[styles.textBold, schooldetailstyle.filiereName]}>
                                {filiere.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    // Render interactive map location card
    renderLocalisation = () => {
        return (
            <View style={schooldetailstyle.localisationContainer}>
                <Text style={[styles.textBold, schooldetailstyle.sectionTitleHeader]}>
                    Localisation
                </Text>
                <TouchableOpacity
                    style={schooldetailstyle.localisationContent}
                    onPress={this._openWithGoogleMaps}
                    activeOpacity={0.8}
                >
                    <View style={schooldetailstyle.localisationRow}>
                        <View style={schooldetailstyle.locationIconContainer}>
                            <Icon name="map-marker-radius" size={24} color="#f6a100" />
                        </View>
                        <View style={schooldetailstyle.locationTextContainer}>
                            <Text style={[styles.textBold, schooldetailstyle.locationAddress]} numberOfLines={2}>
                                {this.schoolAddress || 'Adresse non communiquée'}
                            </Text>
                            <View style={schooldetailstyle.openMapContainer}>
                                <Icon name="open-in-new" size={14} color="#011638" style={schooldetailstyle.openMapIcon} />
                                <Text style={[styles.textBold, schooldetailstyle.openMapText]}>Voir sur la carte</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    // Render quick contact action buttons
    renderContact = () => {
        return (
            <View style={schooldetailstyle.contactContainer}>
                <Text style={[styles.textBold, schooldetailstyle.sectionTitleHeader]}>
                    Contact & Renseignements
                </Text>

                {/* Email Contact Item */}
                <TouchableOpacity
                    style={schooldetailstyle.contactItem}
                    onPress={this._openEmail}
                    activeOpacity={0.8}
                >
                    <View style={schooldetailstyle.contactIconContainer}>
                        <Icon name="email-outline" size={22} color="#f6a100" />
                    </View>
                    <View style={schooldetailstyle.contactTextContainer}>
                        <Text style={[styles.text, schooldetailstyle.contactLabel]}>Email</Text>
                        <Text style={[styles.textBold, schooldetailstyle.contactValue]}>
                            {this.schoolEmail || 'Non disponible'}
                        </Text>
                    </View>
                    <Icon name="chevron-right" size={22} color="#64748B" />
                </TouchableOpacity>

                {/* Website Contact Item */}
                <TouchableOpacity
                    style={schooldetailstyle.contactItem}
                    onPress={this._openWebsite}
                    activeOpacity={0.8}
                >
                    <View style={schooldetailstyle.contactIconContainer}>
                        <Icon name="web" size={22} color="#f6a100" />
                    </View>
                    <View style={schooldetailstyle.contactTextContainer}>
                        <Text style={[styles.text, schooldetailstyle.contactLabel]}>Site Web</Text>
                        <Text style={[styles.textBold, schooldetailstyle.contactValue]}>
                            {this.schoolWebsite || 'Non disponible'}
                        </Text>
                    </View>
                    <Icon name="chevron-right" size={22} color="#64748B" />
                </TouchableOpacity>

                {/* Phone Contact Item */}
                <TouchableOpacity
                    style={[schooldetailstyle.contactItem, schooldetailstyle.contactItemLast]}
                    onPress={this._callPhone}
                    activeOpacity={0.8}
                >
                    <View style={schooldetailstyle.contactIconContainer}>
                        <Icon name="phone-outline" size={22} color="#f6a100" />
                    </View>
                    <View style={schooldetailstyle.contactTextContainer}>
                        <Text style={[styles.text, schooldetailstyle.contactLabel]}>Téléphone</Text>
                        <Text style={[styles.textBold, schooldetailstyle.contactValue]}>
                            {this.schoolPhone || 'Non disponible'}
                        </Text>
                    </View>
                    <Icon name="chevron-right" size={22} color="#64748B" />
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={schooldetailstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary}  />

                {/* Ambient Glow Orbs */}
                <View style={schooldetailstyle.topGlow} />
                <View style={schooldetailstyle.centerGlow} />
                <View style={schooldetailstyle.bottomGlow} />

                <ScrollView
                    contentContainerStyle={schooldetailstyle.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Top Navigation Header */}
                    <View style={schooldetailstyle.headerNav}>
                        <TouchableOpacity
                            style={schooldetailstyle.backButton}
                            onPress={this._navigateToProfile}
                            activeOpacity={0.7}
                        >
                            <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.textBold, schooldetailstyle.headerBadge]}>POLY-H SCHOOL</Text>
                            <Text style={[styles.textBold, schooldetailstyle.headerTitle]}>Détails de l'école</Text>
                        </View>
                    </View>

                    {/* Main Glass Profile Card */}
                    <View style={schooldetailstyle.profileCard}>

                        {/* School Logo */}
                        <View style={schooldetailstyle.ImageContainer}>
                            <Image
                                style={schooldetailstyle.image}
                                source={this.schoolImage}
                                resizeMode="cover"
                            />
                        </View>

                        {/* School Name */}
                        <View style={schooldetailstyle.rowTitle}>
                            <Text style={[styles.textBold, schooldetailstyle.valueTitle]}>
                                {this.schoolName || 'Établissement'}
                            </Text>
                        </View>

                        {/* Rating Stars */}
                        {this.renderEtoiles()}

                        <View style={schooldetailstyle.separator} />

                        {/* About Section HTML Content */}
                        <Text style={[styles.textBold, schooldetailstyle.labelValue]}>À propos</Text>
                        <View style={schooldetailstyle.htmlWrapper}>
                            <HTMLView
                                value={this.schoolAbout || '<p>Aucune description disponible pour cet établissement.</p>'}
                                stylesheet={htmlStyles}
                            />
                        </View>

                        <View style={schooldetailstyle.separator} />

                        {/* Exam Statistics Section */}
                        <View style={schooldetailstyle.Row}>
                            <Text style={[styles.textBold, schooldetailstyle.sectionTitleHeader]}>
                                Statistiques des examens officiels
                            </Text>
                            {this.renderExamGraph()}
                        </View>

                        {/* Majors / Filières */}
                        {this.renderFilieres()}

                        {/* Map Location */}
                        {this.renderLocalisation()}

                        {/* Contact Details */}
                        {this.renderContact()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchSchoolSelectionAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    selectedSchool: state.auth.selectedSchool,
});

export default connect(mapStateToProps, mapDispatchToProps)(School_Detail);