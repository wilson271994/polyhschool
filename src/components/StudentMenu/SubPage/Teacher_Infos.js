import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
    Animated,
    ScrollView,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { teacherinfostyle } from '../../../assets/styles/teacherinfos';
import { COLORS } from '../../../assets/styles/theme';
import { switchChatPageAction, switchHomePageAction } from '../../../navigations/rootNavigation';
import { BASE_URL } from '../../../api/config.js';

class Teacher_Infos extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false,
            showFullBio: false,
            fadeAnim: new Animated.Value(0),
            scaleAnim: new Animated.Value(0.95),
            professor: {
                id: 'PROF001',
                photo: require('../../../assets/images/profil.png'),
                firstName: 'Jean-Pierre',
                lastName: 'Kouadio',
                email: 'jean-pierre.kouadio@education.ci',
                phone: '+237 6 89 56 23 41',
                subjects: ['Mathématiques', 'Physique-Chimie'],
                status: 'Actif',
                experience: 12,
                education: 'Doctorat en Mathématiques Appliquées - Institut Universitaire de la Cote',
                rating: 4.8,
                totalReviews: 156,
                studentsCount: 1230,
                availability: 'Lundi - Vendredi, 8h - 17h',
                biography: "Professeur passionné avec plus de 12 ans d'expérience dans l'enseignement des mathématiques et de la physique-chimie. J'ai à cœur de transmettre mes connaissances de manière claire et accessible à tous mes élèves.\n\nMa méthode d'enseignement repose sur la compréhension approfondie des concepts plutôt que sur la mémorisation. Je m'adapte au rythme de chaque élève pour garantir leur réussite.\n\nDiplômé d'un doctorat en mathématiques appliquées, j'ai également participé à plusieurs programmes de formation continue pour rester à la pointe des méthodes pédagogiques innovantes.",
                achievements: [
                    'Prix du Meilleur Enseignant 2023',
                    'Publication de 3 articles scientifiques',
                    'Formateur certifié en pédagogie active',
                    'Créateur du programme "Maths Facile"'
                ],
                languages: ['Français (Natif)', 'Anglais (Courant)', 'Baoulé (Intermédiaire)'],
                certifications: [
                    'Certification en Pédagogie Numérique',
                    'Certification Google Educator',
                    'Certification en Gestion de Classe'
                ]
            },
            isCalling: false,
            isEmailing: false,
            isChatting: false,
        };
    }

    componentDidMount() {
        this.animateEntrance();
    }

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    animateEntrance = () => {
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    };

    toggleFavorite = () => {
        this.setState(prevState => ({
            isFavorite: !prevState.isFavorite
        }));

        Animated.sequence([
            Animated.timing(this.state.scaleAnim, {
                toValue: 1.05,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            })
        ]).start();
    };

    handleCall = () => {
        const { professor } = this.state;
        this.setState({ isCalling: true });

        setTimeout(() => {
            this.setState({ isCalling: false });
            this.callProfessor(professor.phone);
        }, 400);
    };

    handleEmail = () => {
        const { professor } = this.state;
        this.setState({ isEmailing: true });

        setTimeout(() => {
            this.setState({ isEmailing: false });
            this.sendEmail(professor.email);
        }, 400);
    };

    handleChat = () => {
        const { professor } = this.state;
        this.setState({ isChatting: true });

        setTimeout(() => {
            this.setState({ isChatting: false });
            this.openChat(professor);
        }, 400);
    };

    openChat = (professor) => {
        if (!professor?.id) {
            Alert.alert('Erreur', 'Impossible d\'ouvrir le chat');
            return;
        }

        switchChatPageAction(true, {
            professorId: professor.id,
            professorName: `${professor.firstName} ${professor.lastName}`,
            professorPhoto: professor.photo,
            professorStatus: professor.status
        });
    };

    callProfessor = (phone) => {
        const phoneNumber = phone.replace(/\s/g, '');
        Linking.openURL(`tel:${phoneNumber}`).catch(() => {
            Alert.alert('Erreur', 'Impossible de lancer l\'appel téléphonique');
        });
    };

    sendEmail = (email) => {
        Linking.openURL(`mailto:${email}`).catch(() => {
            Alert.alert('Erreur', 'Impossible d\'ouvrir le client email');
        });
    };

    renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Icon key={i} name="star" size={16} color={COLORS.accentGold} />);
            } else if (i === fullStars && halfStar) {
                stars.push(<Icon key={i} name="star-half-full" size={16} color={COLORS.accentGold} />);
            } else {
                stars.push(<Icon key={i} name="star-outline" size={16} color={COLORS.accentGold} />);
            }
        }
        return stars;
    };

    render() {
        const { professor, isFavorite, showFullBio, isCalling, isEmailing, isChatting, fadeAnim, scaleAnim } = this.state;
        const fullName = `${professor.firstName} ${professor.lastName}`;
        const bioText = showFullBio ? professor.biography : professor.biography.substring(0, 140) + '...';
        const { teacher_infos } = this.props;
        const teacherPhoto = { uri : BASE_URL + teacher_infos?.staff?.pp } || require('../../../assets/images/profil.png');
        const teacherName = teacher_infos?.staff?.name || 'Professeur';
        const teacherCouses = teacher_infos?.courses || [];
        const teacherEmail = teacher_infos?.staff?.email || 'Indisponible';
        const teacherPhone = teacher_infos?.staff?.phone || 'Indisponible';
        const teacherStatus = teacher_infos?.staff?.is_approved || 'Indisponible';
        return (
            <SafeAreaView style={teacherinfostyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} /> 

                {/* Ambient Glows */}
                <View style={teacherinfostyle.topGlow} pointerEvents="none" />
                <View style={teacherinfostyle.bottomGlow} pointerEvents="none" />

                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 110 }}
                >
                    {/* En-tête local standardisé Poly-H */}
                    <View style={teacherinfostyle.localHeader}>
                        <TouchableOpacity
                            style={teacherinfostyle.btnBackCustom}
                            onPress={this._navigateToMenu}
                            activeOpacity={0.7}
                        >
                            <Icon name="chevron-left" size={26} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <Text style={teacherinfostyle.localTitleText}>Profil Enseignant</Text>
                    </View>

                    {/* Profil Header Card */}
                    <Animated.View style={[
                        teacherinfostyle.profileHeaderCard,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}>
                        <TouchableOpacity
                            style={teacherinfostyle.favoriteButton}
                            onPress={this.toggleFavorite}
                            activeOpacity={0.8}
                        >
                            <Icon
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isFavorite ? '#F43F5E' : COLORS.textMuted}
                            />
                        </TouchableOpacity>

                        <View style={teacherinfostyle.photoContainer}>
                            <Image
                                source={teacherPhoto}
                                style={teacherinfostyle.profilePhoto}
                                defaultSource={require('../../../assets/images/account.png')}
                            />
                            <View style={[
                                teacherinfostyle.statusBadge,
                                { backgroundColor: professor.status === 'Actif' ? COLORS.success : '#F43F5E' }
                            ]}>
                                <View style={teacherinfostyle.statusDot} />
                            </View>
                        </View>

                        <Text style={teacherinfostyle.professorName}>{teacherName}</Text>

                        <View style={teacherinfostyle.subjectsContainer}>
                            {teacherCouses.map((subject, index) => (
                                <View key={index} style={teacherinfostyle.subjectBadge}>
                                    <Text style={teacherinfostyle.subjectText}>{subject.name}</Text> 
                                </View>
                            ))}
                        </View>

                        <View style={teacherinfostyle.ratingContainer}>
                            <View style={teacherinfostyle.starsContainer}>
                                {this.renderStars(professor.rating)}
                            </View>
                            <Text style={teacherinfostyle.ratingText}>
                                {professor.rating} ({professor.totalReviews} avis)
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Boutons d'action rapide */}
                    <View style={teacherinfostyle.contactButtonsContainer}>
                        <TouchableOpacity
                            style={[teacherinfostyle.contactButton, teacherinfostyle.callButton]}
                            onPress={this.handleCall}
                            disabled={isCalling}
                            activeOpacity={0.8}
                        >
                            <Icon name={isCalling ? "loading" : "phone"} size={16} color={COLORS.textDark} />
                            <Text style={teacherinfostyle.contactButtonTextBold}>APPELER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[teacherinfostyle.contactButton, teacherinfostyle.emailButton]}
                            onPress={this.handleEmail}
                            disabled={isEmailing}
                            activeOpacity={0.8}
                        >
                            <Icon name={isEmailing ? "loading" : "email"} size={16} color={COLORS.textPrimary} />
                            <Text style={teacherinfostyle.contactButtonTextLight}>EMAIL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[teacherinfostyle.contactButton, teacherinfostyle.chatButton]}
                            onPress={this.handleChat}
                            disabled={isChatting}
                            activeOpacity={0.8}
                        >
                            <Icon name={isChatting ? "loading" : "chat"} size={16} color={COLORS.textPrimary} />
                            <Text style={teacherinfostyle.contactButtonTextLight}>CHAT</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sections d'informations */}
                    <Animated.View style={[{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                        {/* Contact */}
                        <View style={teacherinfostyle.infoCard}>
                            <Text style={teacherinfostyle.sectionTitle}>Informations de Contact</Text>

                            <TouchableOpacity style={teacherinfostyle.infoRow} onPress={() => this.sendEmail(teacherEmail)}>
                                <Icon name="email-outline" size={20} color={COLORS.accentGold} />
                                <View style={teacherinfostyle.infoContent}>
                                    <Text style={teacherinfostyle.infoLabel}>Email</Text>
                                    <Text style={teacherinfostyle.infoValue}>{teacherEmail}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={teacherinfostyle.infoRow} onPress={() => this.callProfessor(teacherPhone)}>
                                <Icon name="phone-outline" size={20} color={COLORS.success} />
                                <View style={teacherinfostyle.infoContent}>
                                    <Text style={teacherinfostyle.infoLabel}>Téléphone</Text>
                                    <Text style={teacherinfostyle.infoValue}>{teacherPhone}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={teacherinfostyle.infoRow}>
                                <Icon name="clock-outline" size={20} color={COLORS.accentCyan} />
                                <View style={teacherinfostyle.infoContent}>
                                    <Text style={teacherinfostyle.infoLabel}>Disponibilité</Text>
                                    <Text style={teacherinfostyle.infoValue}>{teacherStatus}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Stats Pro */}
                        <View style={teacherinfostyle.infoCard}>
                            <Text style={teacherinfostyle.sectionTitle}>Statistiques</Text>
                            <View style={teacherinfostyle.statsGrid}>
                                <View style={teacherinfostyle.statItem}>
                                    <Text style={teacherinfostyle.statNumber}>{professor.experience} ans</Text>
                                    <Text style={teacherinfostyle.statLabel}>Expérience</Text>
                                </View>

                                <View style={teacherinfostyle.statItem}>
                                    <Text style={teacherinfostyle.statNumber}>{professor.studentsCount}</Text>
                                    <Text style={teacherinfostyle.statLabel}>Élèves formés</Text>
                                </View>

                                <View style={teacherinfostyle.statItem}>
                                    <Text style={teacherinfostyle.statNumber}>{professor.totalReviews}</Text>
                                    <Text style={teacherinfostyle.statLabel}>Avis reçus</Text>
                                </View>
                            </View>

                            <View style={teacherinfostyle.divider} />

                            <View style={teacherinfostyle.infoRow}>
                                <Icon name="school-outline" size={20} color={COLORS.accentCyan} />
                                <View style={teacherinfostyle.infoContent}>
                                    <Text style={teacherinfostyle.infoLabel}>Formation</Text>
                                    <Text style={teacherinfostyle.infoValue}>{professor.education}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Biographie */}
                        <View style={teacherinfostyle.infoCard}>
                            <Text style={teacherinfostyle.sectionTitle}>Biographie</Text>
                            <Text style={teacherinfostyle.biographyText}>{bioText}</Text>
                            {professor.biography.length > 140 && (
                                <TouchableOpacity onPress={() => this.setState({ showFullBio: !showFullBio })}>
                                    <Text style={teacherinfostyle.readMoreText}>
                                        {showFullBio ? 'Voir moins' : 'Lire plus'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Réalisations */}
                        <View style={teacherinfostyle.infoCard}>
                            <Text style={teacherinfostyle.sectionTitle}>Réalisations</Text>
                            {professor.achievements.map((achievement, index) => (
                                <View key={index} style={teacherinfostyle.itemRow}>
                                    <Icon name="trophy-outline" size={18} color={COLORS.accentGold} />
                                    <Text style={teacherinfostyle.itemText}>{achievement}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Langues */}
                        <View style={teacherinfostyle.infoCard}>
                            <Text style={teacherinfostyle.sectionTitle}>Langues parlées</Text>
                            <View style={teacherinfostyle.chipsContainer}>
                                {professor.languages.map((language, index) => (
                                    <View key={index} style={teacherinfostyle.chipBadge}>
                                        <Icon name="translate" size={14} color={COLORS.accentCyan} />
                                        <Text style={teacherinfostyle.chipText}>{language}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Certifications */}
                        <View style={teacherinfostyle.infoCard}>
                            <Text style={teacherinfostyle.sectionTitle}>Certifications</Text>
                            {professor.certifications.map((cert, index) => (
                                <View key={index} style={teacherinfostyle.itemRow}>
                                    <Icon name="certificate-outline" size={18} color={COLORS.accentCyan} />
                                    <Text style={teacherinfostyle.itemText}>{cert}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchHomePageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    teacher_infos: state.detail.teacher_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Teacher_Infos);