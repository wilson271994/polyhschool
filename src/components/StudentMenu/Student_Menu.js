import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../assets/styles/theme.js';
import { styles } from '../../assets/styles/index.js';
import {
    studentmenustyle,
    ORBIT_SIZE,
} from '../../assets/styles/studentmenu.js';

import {
    switchAgendaStudentPageAction,
    switchSchoolFeesAction,
    switchFeesSchoolPageAction,
    switchHomeworkStudentPageAction,
    switchRemarkStudentPageAction,
    switchListTeacherPageAction,
    switchStudentCVPageAction,
    switchStudentTransportPageAction,
    switchStudentHostingPageAction,
    switchStudentLibraryPageAction,
    switchStudentActivitiesAction,
    switchStudentProgressAction,
    switchStudentPlanningAction
} from '../../navigations/rootNavigation.js';

class Student_Menu extends PureComponent {
    constructor(props) {
        super(props);
        this.orbitAnim = new Animated.Value(0);
    }

    componentDidMount() {
        // Animation de rotation Orbitale Continue du cercle
        Animated.loop(
            Animated.timing(this.orbitAnim, {
                toValue: 1,
                duration: 30000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }

    // 1. MENUS PRINCIPAUX (Au quotidien dans le cercle)
    getMainOrbitItems = () => [
        {
            key: 'planning',
            label: 'Emploi du temps',
            icon: 'clock-outline',
            action: () => switchStudentPlanningAction(true),
        },
        {
            key: 'homework',
            label: 'Devoirs',
            icon: 'notebook-outline',
            action: () => switchHomeworkStudentPageAction(true),
        },
        {
            key: 'agenda',
            label: 'Agenda',
            icon: 'calendar-month-outline',
            action: () => switchAgendaStudentPageAction(true),
        },
        {
            key: 'teachers',
            label: 'Enseignants',
            icon: 'account-group-outline',
            action: () => switchListTeacherPageAction(true),
        },
        {
            key: 'progression',
            label: 'Progression',
            icon: 'chart-line',
            action: () => switchStudentProgressAction(true),
        },
        {
            key: 'activity',
            label: 'Activités',
            icon: 'account-group-outline',
            action: () => switchStudentActivitiesAction(true),
        },
    ];

    // 2. SERVICES SCOLAIRES (En cartes sous l'orbite)
    getServicesItems = () => [
        {
            key: 'fees',
            title: 'Frais Scolaires',
            sub: 'Paiements & Reçus',
            icon: 'cash-multiple',
            color: COLORS.accentGold,
            action: () => switchFeesSchoolPageAction(true),
        },
        {
            key: 'library',
            title: 'Bibliothèque',
            sub: 'E-Books & Manuels',
            icon: 'library-shelves',
            color: COLORS.accentCyan,
            action: () => switchStudentLibraryPageAction(true),
        },
        {
            key: 'transport',
            title: 'Transport',
            sub: 'Lignes & Circuits',
            icon: 'bus-school',
            color: '#10B981',
            action: () => switchStudentTransportPageAction(true),
        },
        {
            key: 'hosting',
            title: 'Hébergement',
            sub: 'Campus & Cité',
            icon: 'home-city-outline',
            color: '#F43F5E',
            action: () => switchStudentHostingPageAction(true),
        },
        {
            key: 'cv',
            title: 'CV Étudiant',
            sub: 'Parcours & Talents',
            icon: 'file-certificate-outline',
            color: '#8B5CF6',
            action: () => switchStudentCVPageAction(true),
        },
        {
            key: 'remarks',
            title: 'Remarques',
            sub: 'Notes discipline',
            icon: 'comment-alert-outline',
            color: '#F59E0B',
            action: () => switchRemarkStudentPageAction(true),
        },
    ];

    render() {
        const mainItems = this.getMainOrbitItems();
        const servicesItems = this.getServicesItems();
        const totalOrbitItems = mainItems.length;
        const radius = ORBIT_SIZE / 2;

        const ringRotation = this.orbitAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={studentmenustyle.container}>

                {/* ────────────── MODULE 1 : ANNEAU ORBITAL PRINCIPAL ────────────── */}
                <View style={studentmenustyle.orbitSection}>
                    <View style={studentmenustyle.glowBackdrop} />

                    {/* Anneau lumineux en rotation */}
                    <Animated.View
                        style={[
                            studentmenustyle.orbitRing,
                            { transform: [{ rotate: ringRotation }] },
                        ]}
                    />

                    {/* Cœur central Poly-H */}
                    <View style={studentmenustyle.coreBadge}>
                        <Icon name="school" size={32} color={COLORS.accentGold} />
                        <Text style={studentmenustyle.coreText}>VIE SCOLAIRE</Text>
                    </View>

                    {/* Disposition Circulaire Parfaite */}
                    {mainItems.map((item, index) => {
                        const angle = (index * (2 * Math.PI)) / totalOrbitItems - Math.PI / 2;
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);

                        return (
                            <View
                                key={item.key}
                                style={[
                                    studentmenustyle.orbitItemWrapper,
                                    {
                                        transform: [
                                            { translateX: x },
                                            { translateY: y },
                                        ],
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={studentmenustyle.orbitItemBtn}
                                    onPress={item.action}
                                    activeOpacity={0.8}
                                >
                                    <Icon name={item.icon} size={24} color={COLORS.accentGold} />
                                </TouchableOpacity>
                                <Text style={studentmenustyle.orbitItemLabel} numberOfLines={1}>
                                    {item.label}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* ────────────── MODULE 2 : SERVICES SCOLAIRES ────────────── */}
                <View style={studentmenustyle.servicesHeader}>
                    <Icon name="apps" size={20} color={COLORS.accentGold} />
                    <Text style={[styles.textBold, studentmenustyle.sectionTitle]}>
                        Services Scolaires
                    </Text>
                    <View style={studentmenustyle.titleBadge}>
                        <Text style={studentmenustyle.titleBadgeText}>
                            {servicesItems.length} Services
                        </Text>
                    </View>
                </View>

                <View style={studentmenustyle.servicesGrid}>
                    {servicesItems.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={studentmenustyle.serviceCard}
                            onPress={item.action}
                            activeOpacity={0.85}
                        >
                            <View style={[studentmenustyle.serviceIconBox, { backgroundColor: `${item.color}20` }]}>
                                <Icon name={item.icon} size={22} color={item.color} />
                            </View>
                            <View style={studentmenustyle.serviceInfo}>
                                <Text style={[styles.textBold, studentmenustyle.serviceTitle]} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.text, studentmenustyle.serviceSub]} numberOfLines={1}>
                                    {item.sub}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchStudentPlanningAction,
            switchStudentProgressAction,
            switchHomeworkStudentPageAction,
            switchRemarkStudentPageAction,
            switchListTeacherPageAction, 
            switchStudentCVPageAction,
            switchStudentTransportPageAction,
            switchStudentHostingPageAction,
            switchSchoolFeesAction,
            switchStudentLibraryPageAction,
            switchAgendaStudentPageAction
        },
        dispatch
    ),
});

export default connect(null, mapDispatchToProps)(Student_Menu);