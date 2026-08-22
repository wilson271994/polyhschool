import React, { PureComponent } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { studentmenustyle } from '../../assets/styles/studentmenu.js';
import { Menulist, mesAchats } from '../data/servicesData.js';
import Toast from 'react-native-toast-message';
import { styles } from '../../assets/styles/index.js';
import { switchHomeParentAction, switchHostingStudentAction, switchParentStudentBookShopAction, switchParentStudentCvAction, switchParentStudentLibrarytAction, switchParentStudentProjectAction, switchSchoolFeesAction, switchStudentAbsencesAction, switchStudentActivitiesAction, switchStudentAgendaAction, switchStudentHomeworkAction, switchStudentInfosAction, switchStudentPlanningAction, switchStudentProgressAction, switchStudentRemarksAction, switchTeacherListAction, switchTransportStudentAction, } from '../../navigations/rootNavigation.js';
import { store } from '../../reducers/store.js';

// ────────────────────────────────────────────────────────────────
//                   Configuration des services
// ────────────────────────────────────────────────────────────────
const serviceRoutes = {
    'Informations de l\'étudiant': {
        reduxAction: () => switchStudentInfosAction(true),
        description: 'Recent',
    },
    'Frais Scolaire': {
        reduxAction: () => switchSchoolFeesAction(true),
        description: 'Fees',
    },
    'Professeurs': {
        reduxAction: () => switchTeacherListAction(true),
        description: 'Teacher',
    },
    'Planning scolaire': {
        reduxAction: () => switchStudentPlanningAction(true),
        description: 'Planning',
    },
    'Absences': {
        reduxAction: () => switchStudentAbsencesAction(true),
        description: 'Absences',
    },
    'Suivi de la progression...': {
        reduxAction: () => switchStudentProgressAction(true),
        description: 'Progression'
    },
    'Activités scolaires': {
        reduxAction: () => switchStudentActivitiesAction(true),
        description: 'Activities'
    },
    'Mon agenda': {
        reduxAction: () => switchStudentAgendaAction(true),
        description: 'Activités scolaires'
    },
    'Devoirs': {
        reduxAction: () => switchStudentHomeworkAction(true),
        description: 'Homework'
    },
    'Remarques': {
        reduxAction: () => switchStudentRemarksAction(true),
        description: 'Remarques'
    },
    'Transport': {
        reduxAction: () => switchTransportStudentAction(true),
        description: 'Remarques'
    },
    'Hébergement': {
        reduxAction: () => switchHostingStudentAction(true),
        description: 'Hébergement'
    },
    'Programme VAPISCO': {
        reduxAction: () => switchParentStudentProjectAction(true),
        description: 'Programme VAPISCO'
    },
    'Mon CV': {
        reduxAction: () => switchParentStudentLibrarytAction(true),
        description: 'Mon CV'
    },
    'Bibliothèque': {
        reduxAction: () => switchParentStudentBookShopAction(true),
        description: 'Bibliothèque'
    },
    'Librairie': {
        reduxAction: () => switchParentStudentCvAction(true),
        description: 'Librairie'
    },
    'Mon avis': {
        reduxAction: null,
        description: 'Mon avis'
    },
    'Mes services': {
        reduxAction: null,
        description: 'Mes services'
    },
    'Mes tickets': {
        reduxAction: null,
        description: 'Mes tickets'
    },
    'Orange': {
        reduxAction: null,
        description: 'Orange'
    },
};

class StudentMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.ITEM_SIZE = (Dimensions.get('window').width - 60) / 4;
        this.state = {
            studentName: "Dumerile",
        };
    }

    _navigateToHome = () => {
        switchHomeParentAction(true);
    };

    handleServicePress = (title) => {
        const service = serviceRoutes[title];
        this.props.dispatchService(title);
        if (!service) {
            console.warn(`Service non trouvé : "${title}"`);
            Toast.show({
                type: 'info',
                text1: 'Option non disponible',
                text2: `La fonctionnalité "${title}" n'est pas encore implémentée`,
            });
            return;
        }

        if (service.reduxAction && typeof service.reduxAction === 'function') {
            const action = service.reduxAction();
            if (action && typeof action === 'object' && action.type) {
                this.props.dispatch(action);
                Toast.show({
                    type: 'success',
                    text1: title,
                    text2: 'Section ouverte',
                    visibilityTime: 1500,
                });
            }
        } else {
            Toast.show({
                type: 'info',
                text1: title,
                text2: 'Fonctionnalité en cours de développement',
            });
        }
    };

    renderServiceItem = ({ title, image }) => (
        <TouchableOpacity
            onPress={() => this.handleServicePress(title)}
            style={studentmenustyle.serviceItem}
            activeOpacity={0.8}
        >
            <View style={studentmenustyle.iconContainer}>
                <Image source={image} style={studentmenustyle.serviceIcon} resizeMode="contain" />
            </View>
            <Text style={[studentmenustyle.serviceTitle, styles.text]} numberOfLines={2}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    render() {
        const { studentName } = this.state;
        return (
            <View style={studentmenustyle.container}>

                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <ScrollView style={studentmenustyle.scrollView} showsVerticalScrollIndicator={false}>

                        <View style={studentmenustyle.section1}>
                            <View style={studentmenustyle.back}>
                                <TouchableOpacity onPress={this._navigateToHome}>
                                    <Image style={studentmenustyle.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={studentmenustyle.sectionTitle}>Espace {studentName}</Text>
                        </View>

                        <View style={studentmenustyle.sectionCard}>
                            <Text style={[studentmenustyle.sectionTitle, styles.textBold]}>
                                Menu principal
                            </Text>
                            <View style={studentmenustyle.grid}>
                                {Menulist.map((item, index) => (
                                    <View key={`menu-${index}`} style={[studentmenustyle.gridItem, { width: this.ITEM_SIZE }]}>
                                        {this.renderServiceItem(item)}
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={studentmenustyle.sectionDivider} />

                        <View style={studentmenustyle.sectionCard}>
                            <Text style={[studentmenustyle.sectionTitle, styles.textBold]}>
                                Service Scolaire
                            </Text>
                            <View style={studentmenustyle.grid}>
                                {mesAchats.map((item, index) => (
                                    <View key={`achat-${index}`} style={[studentmenustyle.gridItem, { width: this.ITEM_SIZE }]}>
                                        {this.renderServiceItem(item)}
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ height: 70 }} />
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchService: (title) => {
        const service = serviceRoutes[title];
        if (service?.reduxAction) {
            const action = service.reduxAction();
            if (action && typeof action === 'object' && action.type) {
                dispatch(action);
            }
        }
    },
    ...bindActionCreators(
        {
            switchHomeParentAction,
            switchStudentAbsencesAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentMenu);






