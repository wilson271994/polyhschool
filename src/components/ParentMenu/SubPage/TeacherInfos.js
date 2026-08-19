import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert, Animated, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { teacherinfostyle } from '../../../assets/styles/teacherinfos';
import { styles } from '../../../assets/styles';
import { switchTeacherListAction } from '../../../navigations/rootNavigation';


class TeacherInfos extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false,
            showFullBio: false,
            fadeAnim: new Animated.Value(0),
            scaleAnim: new Animated.Value(0.95),
            scrollY: new Animated.Value(0),
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
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    componentDidMount() {
        this.animateEntrance();
    }
    _navigateToMenu = () => {
        switchTeacherListAction(true);
    };

    animateEntrance = () => {
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAnim, {
                toValue: 1,
                duration: 600,
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
                toValue: 1.1,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAnim, {
                toValue: 1,
                duration: 150,
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
        }, 500);
    };

    handleEmail = () => {
        const { professor } = this.state;
        this.setState({ isEmailing: true });

        setTimeout(() => {
            this.setState({ isEmailing: false });
            this.sendEmail(professor.email);
        }, 500);
    };

    handleChat = () => {
        const { professor } = this.state;
        this.setState({ isChatting: true });

        setTimeout(() => {
            this.setState({ isChatting: false });
            this.openChat(professor);
        }, 500);
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
                stars.push(
                    <Icon key={i} name="star" size={18} color="#FFD700" />
                );
            } else if (i === fullStars && halfStar) {
                stars.push(
                    <Icon key={i} name="star-half-full" size={18} color="#FFD700" />
                );
            } else {
                stars.push(
                    <Icon key={i} name="star-outline" size={18} color="#FFD700" />
                );
            }
        }
        return stars;
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[teacherinfostyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={teacherinfostyle.headerSection}>
                        <View style={teacherinfostyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={teacherinfostyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={teacherinfostyle.headertext}>
                            <Text style={[teacherinfostyle.headerTitle, styles.textBold]}></Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { professor, isFavorite, showFullBio, isCalling, isEmailing, isChatting, fadeAnim, scaleAnim } = this.state;
        const fullName = `${professor.firstName} ${professor.lastName}`;
        const bioText = showFullBio ? professor.biography : professor.biography.substring(0, 150) + '...';

        return (
            <View style={teacherinfostyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={teacherinfostyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    > 
                    <Animated.View style={[
                        teacherinfostyle.profileHeader,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}>
                            <View style={teacherinfostyle.backContainer}>
                                <View style={styles.back}>
                                    <TouchableOpacity onPress={this._navigateToMenu}>
                                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={teacherinfostyle.photoContainer}>
                                <Image
                                    source={professor.photo}
                                    style={teacherinfostyle.profilePhoto}
                                    defaultSource={require('../../../assets/images/account.png')}
                                />
                                <View style={[
                                    teacherinfostyle.statusBadge,
                                    {
                                        backgroundColor: professor.status === 'Actif' ? '#4CAF50' : '#F44336'
                                    }
                                ]}>
                                    <View style={teacherinfostyle.statusDot} />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={teacherinfostyle.favoriteButton}
                                onPress={this.toggleFavorite}
                            >
                                <Icon
                                    name={isFavorite ? 'heart' : 'heart-outline'}
                                    size={28}
                                    color={isFavorite ? '#F44336' : '#666'}
                                />
                            </TouchableOpacity>

                            <Text style={[teacherinfostyle.professorName, styles.textBold]}>{fullName}</Text>

                            <View style={teacherinfostyle.subjectsContainer}>
                                {professor.subjects.map((subject, index) => (
                                    <View key={index} style={teacherinfostyle.subjectBadge}>
                                        <Text style={[teacherinfostyle.subjectText, styles.textBold]}>{subject}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={teacherinfostyle.ratingContainer}>
                                <View style={teacherinfostyle.starsContainer}>
                                    {this.renderStars(professor.rating)}
                                </View>
                                <Text style={[teacherinfostyle.ratingText, styles.text]}>
                                    {professor.rating} ({professor.totalReviews} avis)
                                </Text>
                            </View>
                        </Animated.View>

                        <Animated.View style={[
                            teacherinfostyle.infoSection,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }]
                            }
                        ]}>
                            <View style={teacherinfostyle.infoCard}>
                                <Text style={[teacherinfostyle.sectionTitle, styles.textBold]}>Informations de Contact</Text>

                                <TouchableOpacity
                                    style={teacherinfostyle.infoRow}
                                    onPress={() => this.sendEmail(professor.email)}
                                >
                                    <Icon name="email" size={22} color="#ECB818" />
                                    <View style={teacherinfostyle.infoContent}>
                                        <Text style={[teacherinfostyle.infoLabel, styles.text]}>Email</Text>
                                        <Text style={[teacherinfostyle.infoValue, styles.textBold]}>{professor.email}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={teacherinfostyle.infoRow}
                                    onPress={() => this.callProfessor(professor.phone)}
                                >
                                    <Icon name="phone" size={22} color="#4CAF50" />
                                    <View style={teacherinfostyle.infoContent}>
                                        <Text style={[teacherinfostyle.infoLabel, styles.text]}>Téléphone</Text>
                                        <Text style={[teacherinfostyle.infoValue, styles.textBold]}>{professor.phone}</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={teacherinfostyle.infoRow}>
                                    <Icon name="clock-outline" size={22} color="#FF9800" />
                                    <View style={teacherinfostyle.infoContent}>
                                        <Text style={[teacherinfostyle.infoLabel, styles.text]}>Disponibilité</Text>
                                        <Text style={[teacherinfostyle.infoValue, styles.textBold]}>{professor.availability}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={teacherinfostyle.infoCard}>
                                <Text style={[teacherinfostyle.sectionTitle, styles.textBold]}>Informations Professionnelles</Text>

                                <View style={teacherinfostyle.statsGrid}>
                                    <View style={teacherinfostyle.statItem}>
                                        <Text style={[teacherinfostyle.statNumber, styles.textBold]}>{professor.experience}</Text>
                                        <Text style={[teacherinfostyle.statLabel, styles.text]}>Années d'expérience</Text>
                                    </View>

                                    <View style={teacherinfostyle.statItem}>
                                        <Text style={[teacherinfostyle.statNumber, styles.textBold]}>{professor.studentsCount}</Text>
                                        <Text style={[teacherinfostyle.statLabel, styles.text]}>Élèves formés</Text>
                                    </View>

                                    <View style={teacherinfostyle.statItem}>
                                        <Text style={[teacherinfostyle.statNumber, styles.textBold]}>{professor.totalReviews}</Text>
                                        <Text style={[teacherinfostyle.statLabel, styles.text]}>Avis reçus</Text>
                                    </View>
                                </View>

                                <View style={teacherinfostyle.divider} />

                                <View style={teacherinfostyle.infoRow}>
                                    <Icon name="school" size={22} color="#1B497D" />
                                    <View style={teacherinfostyle.infoContent}>
                                        <Text style={[teacherinfostyle.infoLabel, styles.text]}>Formation</Text>
                                        <Text style={[teacherinfostyle.infoValue, styles.textBold]}>{professor.education}</Text>
                                    </View>
                                </View>

                                <View style={teacherinfostyle.infoRow}>
                                    <Icon
                                        name={professor.status === 'Actif' ? 'check-circle' : 'close-circle'}
                                        size={22}
                                        color={professor.status === 'Actif' ? '#ECB818' : '#4CAF50'}
                                    />
                                    <View style={teacherinfostyle.infoContent}>
                                        <Text style={[teacherinfostyle.infoLabel, styles.text]}>État de service</Text>
                                        <Text style={[
                                            teacherinfostyle.statusValue,
                                            {
                                                color: professor.status === 'Actif' ? '#ECB818' : '#4CAF50',
                                                fontWeight: 'bold'
                                            }
                                        ]}>
                                            {professor.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={teacherinfostyle.infoCard}>
                                <Text style={[teacherinfostyle.sectionTitle, styles.textBold]}>Biographie</Text>
                                <Text style={[teacherinfostyle.biographyText, styles.text]}>{bioText}</Text>
                                {professor.biography.length > 150 && (
                                    <TouchableOpacity
                                        onPress={() => this.setState({ showFullBio: !showFullBio })}
                                    >
                                        <Text style={[teacherinfostyle.readMoreText, styles.textBold]}>
                                            {showFullBio ? 'Voir moins' : 'Lire plus'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={teacherinfostyle.infoCard}>
                                <Text style={[teacherinfostyle.sectionTitle, styles.textBold]}>Réalisations</Text>
                                {professor.achievements.map((achievement, index) => (
                                    <View key={index} style={teacherinfostyle.achievementItem}>
                                        <Icon name="trophy" size={20} color="#ECB818" />
                                        <Text style={[teacherinfostyle.achievementText, styles.text]}>{achievement}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={teacherinfostyle.infoCard}>
                                <Text style={[teacherinfostyle.sectionTitle, styles.textBold]}>Langues</Text>
                                <View style={teacherinfostyle.languagesContainer}>
                                    {professor.languages.map((language, index) => (
                                        <View key={index} style={teacherinfostyle.languageBadge}>
                                            <Icon name="translate" size={16} color="#1B497D" />
                                            <Text style={[teacherinfostyle.languageText, styles.textBold]}>{language}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={teacherinfostyle.infoCard}>
                                <Text style={[teacherinfostyle.sectionTitle, styles.textBold]}>Certifications</Text>
                                {professor.certifications.map((cert, index) => (
                                    <View key={index} style={teacherinfostyle.certificationItem}>
                                        <Icon name="certificate" size={20} color="#2196F3" />
                                        <Text style={[teacherinfostyle.certificationText, styles.text]}>{cert}</Text>
                                    </View>
                                ))}
                            </View>

                        </Animated.View>

                        <View style={teacherinfostyle.contactButtonsContainer}>
                            <TouchableOpacity
                                style={[
                                    teacherinfostyle.contactButton,
                                    teacherinfostyle.callButton,
                                    isCalling && teacherinfostyle.contactingButton
                                ]}
                                onPress={this.handleCall}
                                disabled={isCalling}
                                activeOpacity={0.8}
                            >
                                {isCalling ? (
                                    <View style={teacherinfostyle.contactingContent}>
                                        <Icon name="loading" size={20} color="#FFFFFF" />
                                    </View>
                                ) : (
                                    <View style={teacherinfostyle.contactContent}>
                                        <Icon name="phone" size={16} color="#FFFFFF" />
                                        <Text style={[teacherinfostyle.contactButtonText, styles.textBold]}>APPELER</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    teacherinfostyle.contactButton,
                                    teacherinfostyle.emailButton,
                                    isEmailing && teacherinfostyle.contactingButton
                                ]}
                                onPress={this.handleEmail}
                                disabled={isEmailing}
                                activeOpacity={0.8}
                            >
                                {isEmailing ? (
                                    <View style={teacherinfostyle.contactingContent}>
                                        <Icon name="loading" size={20} color="#FFFFFF" />
                                    </View>
                                ) : (
                                    <View style={teacherinfostyle.contactContent}>
                                        <Icon name="email" size={16} color="#FFFFFF" />
                                        <Text style={[teacherinfostyle.contactButtonText, styles.textBold]}>EMAIL</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    teacherinfostyle.contactButton,
                                    teacherinfostyle.chatButton,
                                    isChatting && teacherinfostyle.contactingButton
                                ]}
                                onPress={this.handleChat}
                                disabled={isChatting}
                                activeOpacity={0.8}
                            >
                                {isChatting ? (
                                    <View style={teacherinfostyle.contactingContent}>
                                        <Icon name="loading" size={20} color="#FFFFFF" />
                                    </View>
                                ) : (
                                    <View style={teacherinfostyle.contactContent}>
                                        <Icon name="chat" size={16} color="#FFF" />
                                        <Text style={[teacherinfostyle.contactButtonText, styles.textBold]}>CHAT</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 30 }} />

                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchTeacherListAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_infos: state.auth.user_infos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherInfos);