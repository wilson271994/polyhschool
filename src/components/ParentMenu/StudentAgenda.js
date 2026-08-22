import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Animated, Image, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { agendastyle } from '../../assets/styles/studentagenda';
import AwesomeAlert from 'react-native-awesome-alerts';
import { switchStudentMenuAction } from '../../navigations/rootNavigation';
import { styles } from '../../assets/styles';
import { SwipeablePanel } from 'rn-swipeable-panel';

class Student_Agenda extends PureComponent {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
            showModal: false,
            isEditing: false,
            editingEventId: null,
            newEventTitle: '',
            newEventType: 'Examen',
            newEventStartTime: '09:00',
            newEventEndTime: '17:00',
            newEventStartTimeError: '',
            newEventEndTimeError: '',
            events: this.getMockEvents(),
            showDeleteAlert: false,
            eventToDelete: null,
            scrollY: new Animated.Value(0),
            isVisibleMenu: false,
            selectedEvent: null,
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    getMockEvents = () => {
        const events = {};
        const todayStr = new Date().toISOString().split('T')[0];

        events[todayStr] = [
            { id: 1, title: 'Cours de Maths', type: 'Examen', color: '#4CAF50', startTime: '09:00', endTime: '15:00' },
            { id: 2, title: 'Cours de Français', type: 'révisions', color: '#F44336', startTime: '13:00', endTime: '14:30' },
        ];

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        events[tomorrow.toISOString().split('T')[0]] = [
            { id: 3, title: 'Cours de SVT', type: 'Examen', color: '#2196F3', startTime: '08:30', endTime: '10:00' },
        ];

        return events;
    };

    prevMonth = () => {
        let { currentMonth, currentYear } = this.state;
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        this.setState({ currentMonth, currentYear });
    };

    nextMonth = () => {
        let { currentMonth, currentYear } = this.state;
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        this.setState({ currentMonth, currentYear });
    };

    goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
        });
    };

    // Validation et formatage automatique de l'heure
    validateAndFormatTime = (text, fieldName) => {
        // Supprimer tous les caractères non numériques
        let cleaned = text.replace(/[^0-9]/g, '');

        // Limiter à 4 chiffres maximum
        if (cleaned.length > 4) {
            cleaned = cleaned.slice(0, 4);
        }

        let formatted = '';
        let error = '';

        if (cleaned.length > 0) {
            // Prendre les deux premiers chiffres pour l'heure
            let hours = cleaned.slice(0, 2);
            let minutes = cleaned.slice(2, 4);

            // Valider les heures (0-23)
            if (hours.length === 2) {
                if (parseInt(hours) < 0 || parseInt(hours) > 23) {
                    error = 'Heure invalide (00-23)';
                }
            }

            // Valider les minutes (0-59)
            if (minutes.length === 2) {
                if (parseInt(minutes) < 0 || parseInt(minutes) > 59) {
                    error = 'Minutes invalides (00-59)';
                }
            }

            // Formater automatiquement
            if (cleaned.length <= 2) {
                formatted = cleaned;
                if (cleaned.length === 2) {
                    // Vérifier si l'heure est valide
                    if (parseInt(cleaned) > 23) {
                        error = 'Heure invalide (00-23)';
                    }
                }
            } else {
                formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
                // Validation complète
                const hours = parseInt(cleaned.slice(0, 2));
                const minutes = parseInt(cleaned.slice(2, 4));

                if (hours < 0 || hours > 23) {
                    error = 'Heure invalide (00-23)';
                } else if (minutes < 0 || minutes > 59) {
                    error = 'Minutes invalides (00-59)';
                }
            }
        }

        // Mettre à jour l'état avec l'heure formatée et l'erreur
        if (fieldName === 'start') {
            this.setState({
                newEventStartTime: formatted,
                newEventStartTimeError: error
            });
        } else {
            this.setState({
                newEventEndTime: formatted,
                newEventEndTimeError: error
            });
        }

        return formatted;
    };

    openAddModal = () => {
        this.setState({
            showModal: true,
            isEditing: false,
            editingEventId: null,
            newEventTitle: '',
            newEventType: 'Examen',
            newEventStartTime: '',
            newEventEndTime: '',
            newEventStartTimeError: '',
            newEventEndTimeError: '',
        });
    };

    openEditModal = (event) => {
        this.setState({
            showModal: true,
            isEditing: true,
            editingEventId: event.id,
            newEventTitle: event.title,
            newEventType: event.type,
            newEventStartTime: event.startTime || '',
            newEventEndTime: event.endTime || '',
            newEventStartTimeError: '',
            newEventEndTimeError: '',
            isVisibleMenu: false,
        });
    };

    saveEvent = () => {
        const {
            selectedDate,
            newEventTitle,
            newEventType,
            newEventStartTime,
            newEventEndTime,
            newEventStartTimeError,
            newEventEndTimeError,
            isEditing,
            editingEventId,
            events,
        } = this.state;

        if (!newEventTitle.trim()) {
            Toast.show({ type: 'error', text1: 'Titre requis' });
            return;
        }

        // Vérifier le format des heures
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (!timeRegex.test(newEventStartTime)) {
            Toast.show({ type: 'error', text1: 'Heure de début invalide (HH:MM)' });
            return;
        }

        if (!timeRegex.test(newEventEndTime)) {
            Toast.show({ type: 'error', text1: 'Heure de fin invalide (HH:MM)' });
            return;
        }

        if (newEventStartTime >= newEventEndTime) {
            Toast.show({ type: 'error', text1: 'Heure de fin doit être après début' });
            return;
        }

        const dateKey = selectedDate.toISOString().split('T')[0];
        const colorMap = {
            Examen: '#4CAF50',
            révisions: '#F44336',
            Rattrapage: '#FFC107',
            réunions: '#2196F3',
        };

        const eventData = {
            title: newEventTitle.trim(),
            type: newEventType,
            color: colorMap[newEventType] || '#9E9E9E',
            startTime: newEventStartTime,
            endTime: newEventEndTime,
        };

        let updatedEvents = { ...events };

        if (isEditing) {
            updatedEvents[dateKey] = updatedEvents[dateKey].map(ev =>
                ev.id === editingEventId ? { ...ev, ...eventData } : ev
            );
            Toast.show({ type: 'success', text1: 'Modifié' });
        } else {
            const newEvent = { id: Date.now(), ...eventData };
            updatedEvents[dateKey] = [...(updatedEvents[dateKey] || []), newEvent];
            Toast.show({ type: 'success', text1: 'Ajouté' });
        }

        this.setState({
            events: updatedEvents,
            showModal: false,
            newEventTitle: '',
            newEventType: 'Examen',
            newEventStartTime: '',
            newEventEndTime: '',
            newEventStartTimeError: '',
            newEventEndTimeError: '',
            isEditing: false,
            editingEventId: null,
        });
    };

    showDeleteConfirmation = (eventId) => {
        this.setState({
            showDeleteAlert: true,
            eventToDelete: eventId,
            isVisibleMenu: false,
        });
    };

    confirmDelete = () => {
        const { eventToDelete, selectedDate, events } = this.state;

        if (eventToDelete) {
            const dateKey = selectedDate.toISOString().split('T')[0];
            const updated = { ...events };
            updated[dateKey] = updated[dateKey].filter(ev => ev.id !== eventToDelete);

            this.setState({
                events: updated,
                showDeleteAlert: false,
                eventToDelete: null,
            });
            Toast.show({ type: 'success', text1: 'Événement supprimé', text2: 'La suppression a été effectuée avec succès' });
        }
    };

    cancelDelete = () => {
        this.setState({
            showDeleteAlert: false,
            eventToDelete: null,
        });
    };

    openEventMenu = (event) => {
        this.setState({
            isVisibleMenu: true,
            selectedEvent: event,
        });
    };

    closeEventMenu = () => {
        this.setState({
            isVisibleMenu: false,
            selectedEvent: null,
        });
    };

    renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate, events } = this.state;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startWeekday = (firstDay.getDay() + 6) % 6; // Lundi = 0

        const cells = [];

        for (let i = 0; i < startWeekday; i++) {
            cells.push(<View key={`empty-${i}`} style={agendastyle.dayEmpty} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const dateKey = dateObj.toISOString().split('T')[0];
            const isToday = dateObj.toDateString() === new Date().toDateString();
            const isSelected = dateObj.toDateString() === selectedDate.toDateString();
            const dayEvents = events[dateKey] || [];

            cells.push(
                <TouchableOpacity
                    key={day}
                    style={[
                        agendastyle.dayCell, agendastyle.daycell,
                        isToday && agendastyle.todayCell,
                        isSelected && agendastyle.selectedCell,
                    ]}
                    onPress={() => this.setState({ selectedDate: dateObj })}
                >
                    <Text style={[
                        agendastyle.dayText, styles.text,
                        isToday && agendastyle.todayText, styles.textBold,
                        isSelected && agendastyle.selectedText, styles.textBold
                    ]}>
                        {day}
                    </Text>

                    {dayEvents.length > 0 && (
                        <View style={agendastyle.eventDots}>
                            {dayEvents.slice(0, 3).map((ev, idx) => (
                                <View key={idx} style={[agendastyle.eventDot, { backgroundColor: ev.color }]} />
                            ))}
                            {dayEvents.length > 3 && <View style={styles.moreDot} />}
                        </View>
                    )}
                </TouchableOpacity>
            );
        }

        return cells;
    };

    renderSelectedDayEvents = () => {
        const { selectedDate, events } = this.state;
        const dateKey = selectedDate.toISOString().split('T')[0];
        const dayEvents = events[dateKey] || [];

        if (dayEvents.length === 0) {
            return <Text style={[agendastyle.noEvents, styles.text]}>Aucun événement ce jour</Text>;
        }

        return (
            <View style={agendastyle.eventsList}>
                {dayEvents.map(event => (
                    <TouchableOpacity
                        key={event.id}
                        style={[agendastyle.eventItem, { borderLeftColor: event.color }]}
                        onPress={() => this.openEventMenu(event)}
                        activeOpacity={0.7}
                    >
                        <View style={agendastyle.eventContent}>
                            <Text style={[agendastyle.eventTitle, styles.text]}>{event.title}</Text>
                            <Text style={[agendastyle.eventTime, styles.text]}>
                                {event.startTime} - {event.endTime}
                            </Text>
                            <Text style={[agendastyle.eventType, styles.text]}>{event.type}</Text>
                        </View>
                        <Icon name="chevron-right" size={24} color="#999" />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[agendastyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={agendastyle.headerSection}>
                        <View style={agendastyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={agendastyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={agendastyle.headertext}>
                            <Text style={[agendastyle.headerTitle, styles.textBold]}>Mon agenda</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const {
            currentMonth,
            currentYear,
            selectedDate,
            showModal,
            isEditing,
            newEventTitle,
            newEventType,
            newEventStartTime,
            newEventEndTime,
            newEventStartTimeError,
            newEventEndTimeError,
            showDeleteAlert,
            eventToDelete,
            isVisibleMenu,
            selectedEvent,
        } = this.state;

        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];

        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        // Récupérer le titre de l'événement à supprimer pour l'afficher dans l'alerte
        const eventToDeleteObj = eventToDelete ?
            Object.values(this.state.events).flat().find(ev => ev.id === eventToDelete) : null;

        return (
            <View style={agendastyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={agendastyle.container}
                        onScroll={this.handleScroll}
                        scrollEventThrottle={6}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._navigateToMenu}>
                                    <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold]}>Mon agenda</Text>
                        </View>

                        <View style={agendastyle.calendarCard}>
                            <View style={agendastyle.calendarHeader}>
                                <TouchableOpacity onPress={this.prevMonth} style={agendastyle.navButton}>
                                    <Icon name="chevron-left" size={24} color="#333" />
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>
                                <Text style={[agendastyle.monthYear, styles.textBold]}>
                                    {monthNames[currentMonth]} {currentYear}
                                </Text>

                                <TouchableOpacity onPress={this.goToToday} style={agendastyle.todayButton}>
                                    <Icon name="calendar-today" size={20} color="#1976D2" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.nextMonth} style={agendastyle.navButton}>
                                    <Icon name="chevron-right" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <View style={agendastyle.week}>
                                <View style={agendastyle.weekDays}>
                                    {daysOfWeek.map(day => (
                                        <Text key={day} style={[agendastyle.weekDay, styles.textBold]}>{day}</Text>
                                    ))}
                                </View>
                            </View>

                            <View style={agendastyle.Days}>
                                <View style={agendastyle.daysGrid}>
                                    {this.renderMonthlyGrid()}
                                </View>
                            </View>
                        </View>

                        <View style={agendastyle.eventsSection}>
                            <View style={agendastyle.eventsHeader}>
                                <Text
                                    numberOfLines={2}
                                    style={[agendastyle.eventsTitle, styles.textBold]}>
                                    Événements du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </Text>
                                <TouchableOpacity style={agendastyle.addButton} onPress={this.openAddModal}>
                                    <Icon name="plus-circle" size={32} color="#1B497D" />
                                </TouchableOpacity>
                            </View>

                            {this.renderSelectedDayEvents()}
                        </View>
                    </Animated.ScrollView>

                    <Modal
                        visible={showModal}
                        transparent
                        animationType="slide"
                        onRequestClose={() => this.setState({ showModal: false })}
                    >
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={agendastyle.modalOverlay}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                        >
                            <View style={agendastyle.modalOverlay}>
                                <View style={agendastyle.modalContent}>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
                                    >
                                        <Text style={[agendastyle.modalTitle, styles.textBold]}>
                                            {isEditing ? 'Modifier événement' : 'Nouvel événement'}
                                        </Text>

                                        <TextInput
                                            style={[agendastyle.modalInput, styles.text]}
                                            placeholder="Titre (ex: Examen cuisine)"
                                            placeholderTextColor="#999"
                                            value={newEventTitle}
                                            onChangeText={text => this.setState({ newEventTitle: text })}
                                        />

                                        <View style={agendastyle.timeRow}>
                                            <View style={agendastyle.timeField}>
                                                <Text style={[agendastyle.timeLabel, styles.text]}>Début</Text>
                                                <TextInput
                                                    style={[agendastyle.timeInput, styles.text]}
                                                    placeholder="HH:MM"
                                                    placeholderTextColor="#999"
                                                    value={newEventStartTime}
                                                    onChangeText={(text) => this.validateAndFormatTime(text, 'start')}
                                                    keyboardType="numeric"
                                                    maxLength={5}
                                                />
                                                {newEventStartTimeError ? (
                                                    <Text style={agendastyle.timeError}>{newEventStartTimeError}</Text>
                                                ) : null}
                                            </View>

                                            <View style={agendastyle.timeField}>
                                                <Text style={[agendastyle.timeLabel, styles.text]}>Fin</Text>
                                                <TextInput
                                                    style={[agendastyle.timeInput, styles.text]}
                                                    placeholder="HH:MM"
                                                    placeholderTextColor="#999"
                                                    value={newEventEndTime}
                                                    onChangeText={(text) => this.validateAndFormatTime(text, 'end')}
                                                    keyboardType="numeric"
                                                    maxLength={5}
                                                />
                                                {newEventEndTimeError ? (
                                                    <Text style={agendastyle.timeError}>{newEventEndTimeError}</Text>
                                                ) : null}
                                            </View>
                                        </View>

                                        <View style={agendastyle.typeSelector}>
                                            {['Examen', 'révisions', 'Rattrapage', 'réunions'].map(type => (
                                                <TouchableOpacity
                                                    key={type}
                                                    style={[
                                                        agendastyle.typeButton,
                                                        newEventType === type && agendastyle.typeButtonActive,
                                                    ]}
                                                    onPress={() => this.setState({ newEventType: type })}
                                                >
                                                    <Text style={[
                                                        agendastyle.typeText, styles.text,
                                                        newEventType === type && { color: '#fff' }
                                                    ]}>
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>

                                    <View style={agendastyle.modalButtons}>
                                        <TouchableOpacity
                                            style={agendastyle.cancelButton}
                                            onPress={() => {
                                                Keyboard.dismiss();
                                                this.setState({ showModal: false });
                                            }}
                                        >
                                            <Text style={[agendastyle.buttonText, styles.text]}>Annuler</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={agendastyle.confirmButton}
                                            onPress={this.saveEvent}
                                        >
                                            <Text style={[agendastyle.buttonText, styles.text]}>
                                                {isEditing ? 'Modifier' : 'Ajouter'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>

                    <AwesomeAlert
                        show={showDeleteAlert}
                        showProgress={false}
                        title="⚠️ Supprimer l'événement ?"
                        titleStyle={[agendastyle.titleText, styles.textBold]}
                        message={`Êtes-vous sûr de vouloir supprimer "${eventToDeleteObj?.title || 'cet événement'}" ?\nCette action est irréversible.`}
                        messageStyle={[agendastyle.message, styles.text]}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Annuler"
                        confirmText="Supprimer"
                        cancelButtonColor="#9E9E9E"
                        confirmButtonColor="#1B497D"
                        cancelButtonStyle={agendastyle.Cancel}
                        confirmButtonStyle={agendastyle.Confirmation}
                        cancelButtonTextStyle={[agendastyle.cancelText, styles.textBold]}
                        confirmButtonTextStyle={[agendastyle.confirmationText, styles.textBold]}
                        contentContainerStyle={agendastyle.contentContainer}
                        onCancelPressed={this.cancelDelete}
                        onConfirmPressed={this.confirmDelete}
                    />

                    <SwipeablePanel
                        fullWidth={true}
                        openLarge={true}
                        closeOnTouchOutside={true}
                        showCloseButton={true}
                        isActive={isVisibleMenu}
                        closeIconColor="#1B497D" // Selon la version de la librairie
                        closeIconStyle={{ tintColor: '#FFFFFF' }} // Pour iOS
                        onClose={this.closeEventMenu}
                        onPressCloseButton={this.closeEventMenu}
                        style={agendastyle.containermenu}
                        barContainerStyle={agendastyle.swipablepanelbarstyle}
                        closeRootStyle={agendastyle.swipablepanelcloseicon}
                    >


                        <ScrollView style={agendastyle.menuitemscroll}>
                            <View style={agendastyle.eventDetailHeader}>
                                <View style={[agendastyle.eventDetailDot, { backgroundColor: selectedEvent?.color }]} />
                                <Text style={[agendastyle.eventDetailTitle, styles.textBold]}>
                                    {selectedEvent?.title}
                                </Text>
                            </View>

                            <View style={agendastyle.eventDetailInfo}>
                                <Icon name="clock-outline" size={20} color="#666" />
                                <Text style={[agendastyle.eventDetailTime, styles.text]}>
                                    {selectedEvent?.startTime} - {selectedEvent?.endTime}
                                </Text>
                            </View>

                            <View style={agendastyle.headermenuitem}>
                                <Icon name="tag-outline" size={20} color="#666" />
                                <Text style={[agendastyle.eventDetailType, styles.text]}>
                                    {selectedEvent?.type}
                                </Text>
                            </View>

                            <View style={agendastyle.menuDivider} />

                            <TouchableOpacity
                                onPress={() => this.openEditModal(selectedEvent)}
                                style={agendastyle.headermenuitem}>
                                <Icon name="pencil" size={24} color="#2196F3" />
                                <Text style={[agendastyle.menulisttext, styles.text]}>Modifier</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.showDeleteConfirmation(selectedEvent?.id)}
                                style={agendastyle.headermenuitem}>
                                <Icon name="delete" size={24} color="#F44336" />
                                <Text style={[agendastyle.menulisttext, styles.text, { color: '#F44336' }]}>Supprimer</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </SwipeablePanel>

                    {this.renderHeader()}
                </ImageBackground>
                <View style={{ height: 50 }} />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchStudentMenuAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Student_Agenda);