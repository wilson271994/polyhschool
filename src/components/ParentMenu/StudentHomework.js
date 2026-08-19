import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated, FlatList, Alert, ImageBackground, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { homeworkstyle } from '../../assets/styles/studenthomework';
import { styles } from '../../assets/styles';
import { Slider } from 'react-native-elements/dist/slider/Slider';

const STORAGE_KEY = '@StudentHomework_progress';

class StudentHomework extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

            scrollY: new Animated.Value(0),
            notifications: [
                {
                    id: 1,
                    type: "urgent",
                    title: "Devoir de Mathématiques à rendre demain !",
                    message: "Exercice 12 p.87 + Problème n°4",
                    time: "Il y a 2 heures",
                    read: false,
                },
            ],

            smartReminders: [],

            shortTermHomework: [
                { id: 1, subject: "Mathématiques", title: "Exercice 12 p. 87 + Problème n°4", dueDate: "28 Mars 2026", daysLeft: 1, teacherNote: "Bien soigner la présentation.", priority: "high", progress: 45, hasNotification: true },
                { id: 2, subject: "Français", title: "Rédaction : 'Mon héros du quotidien'", dueDate: "29 Mars 2026", daysLeft: 2, teacherNote: "Minimum 250 mots.", priority: "medium", progress: 10, hasNotification: false },
                { id: 3, subject: "Physique", title: "TP : Loi d'Ohm - Rapport complet", dueDate: "01 Avril 2026", daysLeft: 5, teacherNote: "Joindre le graphique.", priority: "high", progress: 80, hasNotification: false },
            ],

            holidayHomework: [
                { id: 101, subject: "Mathématiques", title: "Révision Chapitre 8 + 20 exercices", dueDate: "20 Avril 2026", daysLeft: 23, teacherNote: "À rendre à la rentrée.", priority: "medium", progress: 30, hasNotification: false },
            ],
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }
    async componentDidMount() {
        await this.loadProgressFromStorage();
        this.generateSmartReminders();
    }

    loadProgressFromStorage = async () => {
        try {
            const savedData = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                this.setState(prev => ({
                    shortTermHomework: prev.shortTermHomework.map(item => ({
                        ...item,
                        progress: parsed.shortTerm?.[item.id] ?? item.progress,
                    })),
                    holidayHomework: prev.holidayHomework.map(item => ({
                        ...item,
                        progress: parsed.holiday?.[item.id] ?? item.progress,
                    })),
                }));
            }
        } catch (e) {
            console.log("Erreur chargement :", e);
        }
    };

    saveProgressToStorage = async () => {
        try {
            const shortTermProgress = {};
            const holidayProgress = {};

            this.state.shortTermHomework.forEach(item => shortTermProgress[item.id] = item.progress);
            this.state.holidayHomework.forEach(item => holidayProgress[item.id] = item.progress);

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
                shortTerm: shortTermProgress,
                holiday: holidayProgress,
                timestamp: new Date().toISOString(),
            }));
        } catch (e) {
            console.log("Erreur sauvegarde :", e);
        }
    };

    updateProgress = (homeworkId, newProgress, isHoliday = false) => {
        const clamped = Math.max(0, Math.min(100, Math.round(newProgress)));
        this.setState(prevState => {
            let newState;
            if (isHoliday) {
                newState = {
                    ...prevState, holidayHomework: prevState.holidayHomework.map(item =>
                        item.id === homeworkId ? { ...item, progress: clamped } : item
                    )
                };
            } else {
                newState = {
                    ...prevState, shortTermHomework: prevState.shortTermHomework.map(item =>
                        item.id === homeworkId ? { ...item, progress: clamped } : item
                    )
                };
            }
            setTimeout(() => this.saveProgressToStorage(), 100);
            return newState;
        });
    };


    generateSmartReminders = () => {
        const reminders = [];


        this.state.shortTermHomework.forEach(hw => {
            if (hw.daysLeft <= 3) {
                reminders.push({
                    id: `rem-${hw.id}`,
                    type: hw.daysLeft === 1 ? "urgent" : "warning",
                    title: hw.daysLeft === 1 ? "À rendre DEMAIN !" : `À rendre dans ${hw.daysLeft} jours`,
                    message: `${hw.subject} - ${hw.title}`,
                    time: "Intelligent",
                    homeworkId: hw.id,
                    isShortTerm: true,
                });
            }
        });


        this.state.holidayHomework.forEach(hw => {
            if (hw.daysLeft <= 10) {
                reminders.push({
                    id: `rem-h-${hw.id}`,
                    type: "holiday",
                    title: "Derniers jours pour les devoirs de vacances",
                    message: `${hw.subject} - ${hw.title} (${hw.daysLeft} jours restants)`,
                    time: "Intelligent",
                    homeworkId: hw.id,
                    isShortTerm: false,
                });
            }
        });

        this.setState({ smartReminders: reminders });
    };


    markReminderAsRead = (id) => {
        this.setState(prev => ({
            smartReminders: prev.smartReminders.map(rem =>
                rem.id === id ? { ...rem, read: true } : rem
            )
        }));
    };

    deleteReminder = (id) => {
        Alert.alert(
            "Supprimer le rappel",
            "Veux-tu supprimer ce rappel intelligent ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => {
                        this.setState(prev => ({
                            smartReminders: prev.smartReminders.filter(r => r.id !== id)
                        }));
                    }
                }
            ]
        );
    };


    resetAllProgress = () => {
        Alert.alert(
            "Réinitialiser la progression",
            "Toutes les progressions seront remises à 0%.\nCette action est irréversible.",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Réinitialiser",
                    style: "destructive",
                    onPress: () => {
                        this.setState({
                            shortTermHomework: this.state.shortTermHomework.map(item => ({ ...item, progress: 0 })),
                            holidayHomework: this.state.holidayHomework.map(item => ({ ...item, progress: 0 })),
                        }, () => this.saveProgressToStorage());
                    },
                },
            ]
        );
    };


    getProgressColor = (progress) => {
        if (progress >= 80) return '#27ae60';
        if (progress >= 50) return '#f39c12';
        return '#e74c3c';
    };

    renderSmartReminder = ({ item }) => (
        <TouchableOpacity
            style={[homeworkstyle.reminderCard, item.read && homeworkstyle.readNotification]}
            onPress={() => this.markReminderAsRead(item.id)}
            onLongPress={() => this.deleteReminder(item.id)}
        >
            <View style={homeworkstyle.notifIcon}>
                <Icon name="lightbulb-on" size={26} color="#f59e0b" />
            </View>
            <View style={homeworkstyle.notifContent}>
                <Text style={[homeworkstyle.notifTitle, styles.text]}>{item.title}</Text>
                <Text style={[homeworkstyle.notifMessage, styles.text]}>{item.message}</Text>
                <Text style={[homeworkstyle.notifTime, styles.text]}>{item.time}</Text>
            </View>
            {!item.read && <View style={homeworkstyle.unreadDot} />}
        </TouchableOpacity>
    );

    renderNotification = ({ item }) => (
        <TouchableOpacity
            style={[homeworkstyle.reminderCard, item.read && homeworkstyle.readNotification]}
            onPress={() => this.markReminderAsRead(item.id)}
            onLongPress={() => this.deleteReminder(item.id)}
        >
            <View style={homeworkstyle.notifIcon}>
                <Icon name="bell-ring" size={26} color="#f59e0b" />
            </View>
            <View style={homeworkstyle.notifContent}>
                <Text style={[homeworkstyle.notifTitle, styles.text]}>{item.title}</Text>
                <Text style={[homeworkstyle.notifMessage, styles.text]}>{item.message}</Text>
                <Text style={[homeworkstyle.notifTime, styles.text]}>{item.time}</Text>
            </View>
            {!item.read && <View style={homeworkstyle.unreadDot} />}
        </TouchableOpacity>
    );

    renderHomeworkItem = (item, isHoliday = false) => {
        const color = this.getProgressColor(item.progress);
        return (
            <View key={item.id} style={homeworkstyle.homeworkCard}>
                <View style={[homeworkstyle.subjectBar, { backgroundColor: color }]} />
                <View style={homeworkstyle.cardContent}>
                    <View style={homeworkstyle.headerRow}>
                        <Text style={[homeworkstyle.subject, styles.textBold]}>{item.subject}</Text>
                        {item.hasNotification && (
                            <View style={homeworkstyle.smallNotifBadge}>
                                <Icon name="bell" size={14} color="#fff" />
                            </View>
                        )}
                        <View style={[homeworkstyle.dueBadge, { backgroundColor: color + '20' }]}>
                            <Text style={[homeworkstyle.dueText, { color }, styles.text]}>{item.daysLeft}j</Text>
                        </View>
                    </View>

                    <Text style={[homeworkstyle.title, styles.textBold]}>{item.title}</Text>
                    <Text style={[homeworkstyle.dueDate, styles.text]}>À rendre le : {item.dueDate}</Text>

                    {item.teacherNote && (
                        <View style={homeworkstyle.noteContainer}>
                            <Icon name="comment-text-outline" size={16} color="#777" />
                            <Text style={[homeworkstyle.teacherNote, styles.text]}>{item.teacherNote}</Text>
                        </View>
                    )}

                    <View style={homeworkstyle.progressContainer}>
                        <View style={homeworkstyle.progressHeader}>
                            <Text style={[homeworkstyle.progressLabel, styles.textBold]}>Ma progression</Text>
                            <Text style={[homeworkstyle.progressPercentage, { color }, styles.textBold]}>{item.progress}%</Text>
                        </View>

                        <Slider
                            style={homeworkstyle.slider}
                            minimumValue={0}
                            maximumValue={100}
                            step={5}
                            value={item.progress}
                            onValueChange={(value) => this.updateProgress(item.id, value, isHoliday)}
                            minimumTrackTintColor={color}
                            maximumTrackTintColor="#e0e0e0"
                            thumbTintColor={color}
                            thumbStyle={{ width: 10, height: 10 }}
                        />

                        <View style={homeworkstyle.progressButtons}>
                            <TouchableOpacity
                                style={homeworkstyle.progressBtn}
                                onPress={() => this.updateProgress(item.id, item.progress - 10, isHoliday)}
                            >
                                <Icon name="minus-circle" size={20} color="#95a5a6" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[homeworkstyle.completeBtn]}
                                onPress={() => this.updateProgress(item.id, 100, isHoliday)}
                            >
                                <Icon name="check-circle" size={20} color="#fff" />
                                <Text style={[homeworkstyle.completeBtnText, styles.textBold]}>Terminé</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={homeworkstyle.progressBtn}
                                onPress={() => this.updateProgress(item.id, item.progress + 10, isHoliday)}
                            >
                                <Icon name="plus-circle" size={20} color="#95a5a6" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[homeworkstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={homeworkstyle.headerSection}>
                        <View style={homeworkstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={homeworkstyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={homeworkstyle.headertext}>
                            <Text style={[homeworkstyle.headerTitle, styles.textBold]}>Mes Devoirs</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { notifications, smartReminders, shortTermHomework, holidayHomework } = this.state;
        const unreadCount = notifications.filter(n => !n.read).length;

        return (
            <SafeAreaView style={homeworkstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={homeworkstyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToMenu}>
                                    <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold]}>Mes Devoirs</Text>
                        </View>

                        {smartReminders.length > 0 && (
                            <View style={homeworkstyle.section}>
                                <View style={homeworkstyle.sectionHeader}>
                                    <Icon name="lightbulb-on" size={24} color="#f59e0b" />
                                    <Text style={[homeworkstyle.sectionTitle, styles.textBold]}>Rappels Intelligents</Text>
                                </View>
                                <FlatList
                                    data={smartReminders}
                                    keyExtractor={item => item.id}
                                    renderItem={this.renderSmartReminder}
                                    scrollEnabled={false}
                                />
                            </View>
                        )}


                        {notifications.length > 0 && (
                            <View style={homeworkstyle.section}>
                                <View style={homeworkstyle.sectionHeader}>
                                    <Icon name="bell-ring" size={24} color="#f59e0b" />
                                    <Text style={[homeworkstyle.sectionTitle, styles.textBold]}>Notifications</Text>
                                </View>
                                <FlatList
                                    data={notifications}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={this.renderNotification}
                                    scrollEnabled={false}
                                />
                            </View>
                        )}
                        <View style={homeworkstyle.section}>
                            <View style={homeworkstyle.sectionHeader}>
                                <Icon name="clock-fast" size={24} color="#f59e0b" />
                                <Text style={[homeworkstyle.sectionTitle, styles.textBold]}>Devoirs à rendre bientôt</Text>
                            </View>
                            {shortTermHomework.map(item => this.renderHomeworkItem(item, false))}
                        </View>

                        <View style={homeworkstyle.section}>
                            <View style={homeworkstyle.sectionHeader}>
                                <Icon name="beach" size={24} color="#f59e0b" />
                                <Text style={[homeworkstyle.sectionTitle, styles.textBold]}>Devoirs de congés</Text>
                            </View>
                            {holidayHomework.map(item => this.renderHomeworkItem(item, true))}
                        </View>

                        <TouchableOpacity
                            style={homeworkstyle.resetButton}
                            onPress={this.resetAllProgress}
                        >
                            <Icon name="refresh" size={18} color="#94a3b8" />
                            <Text style={[homeworkstyle.resetButtonText, styles.text]}>Réinitialiser</Text>
                        </TouchableOpacity>

                        <Text style={[homeworkstyle.footer, styles.text]}>
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </Text>
                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>

                <View style={{ height: 40 }} />
            </SafeAreaView>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchStudentMenuAction,

    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentHomework);







