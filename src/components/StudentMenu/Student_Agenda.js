import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SwipeablePanel } from 'rn-swipeable-panel';

import { agendastyle } from '../../assets/styles/studentagenda';
import { COLORS } from '../../assets/styles/theme';
import { switchHomePageAction } from '../../navigations/rootNavigation';
import { AddAgendaAction, UpdateAgendaAction, DeleteAgendaAction } from '../../reducers/actions/index.js';

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
            isVisibleMenu: false,
            selectedEvent: null,
        };
    }

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    getMockEvents = () => {
        const events = {};
        const todayStr = new Date().toISOString().split('T')[0];

        events[todayStr] = [
            { id: 1, title: 'Cours de Maths', type: 'Examen', color: COLORS.success, startTime: '09:00', endTime: '15:00' },
            { id: 2, title: 'Cours de Français', type: 'révisions', color: '#F43F5E', startTime: '13:00', endTime: '14:30' },
        ];

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        events[tomorrow.toISOString().split('T')[0]] = [
            { id: 3, title: 'Cours de SVT', type: 'Examen', color: COLORS.accentCyan, startTime: '08:30', endTime: '10:00' },
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

    validateAndFormatTime = (text, fieldName) => {
        let cleaned = text.replace(/[^0-9]/g, '');

        if (cleaned.length > 4) {
            cleaned = cleaned.slice(0, 4);
        }

        let formatted = '';
        let error = '';

        if (cleaned.length > 0) {
            let hours = cleaned.slice(0, 2);
            let minutes = cleaned.slice(2, 4);

            if (hours.length === 2 && (parseInt(hours) < 0 || parseInt(hours) > 23)) {
                error = 'Heure invalide (00-23)';
            }

            if (minutes.length === 2 && (parseInt(minutes) < 0 || parseInt(minutes) > 59)) {
                error = 'Minutes invalides (00-59)';
            }

            if (cleaned.length <= 2) {
                formatted = cleaned;
            } else {
                formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
            }
        }

        if (fieldName === 'start') {
            this.setState({ newEventStartTime: formatted, newEventStartTimeError: error });
        } else {
            this.setState({ newEventEndTime: formatted, newEventEndTimeError: error });
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
            selectedDate, newEventTitle, newEventType,
            newEventStartTime, newEventEndTime,
            isEditing, editingEventId, events,
        } = this.state;

        const { user_token } = this.props;

        if (!newEventTitle.trim()) {
            Toast.show({ type: 'error', text1: 'Titre requis' });
            return;
        }

        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(newEventStartTime) || !timeRegex.test(newEventEndTime)) {
            Toast.show({ type: 'error', text1: 'Heure invalide (HH:MM)' });
            return;
        }
        if (newEventStartTime >= newEventEndTime) {
            Toast.show({ type: 'error', text1: 'L\'heure de fin doit être après le début' });
            return;
        }

        const dateKey = selectedDate.toISOString().split('T')[0];
        const colorMap = {
            Examen: COLORS.success,
            révisions: '#F43F5E',
            Rattrapage: COLORS.accentGold,
            réunions: COLORS.accentCyan,
        };

        const eventData = {
            title: newEventTitle.trim(),
            type: newEventType,
            color: colorMap[newEventType] || COLORS.textMuted,
            startTime: newEventStartTime,
            endTime: newEventEndTime,
        };

        let updatedEvents = { ...events };

        if (isEditing) {
            updatedEvents[dateKey] = updatedEvents[dateKey].map(ev =>
                ev.id === editingEventId ? { ...ev, ...eventData } : ev
            );

            const data = new FormData();
            data.append('token', user_token);
            data.append('id', editingEventId);
            data.append('title', eventData.title);
            data.append('type', eventData.type);
            data.append('start_time', eventData.startTime);
            data.append('end_time', eventData.endTime);
            data.append('date', dateKey);
            UpdateAgendaAction(data);
        } else {
            const newEvent = { id: Date.now(), ...eventData };
            updatedEvents[dateKey] = [...(updatedEvents[dateKey] || []), newEvent];

            const data = new FormData();
            data.append('token', user_token);
            data.append('title', eventData.title);
            data.append('type', eventData.type);
            data.append('start_time', eventData.startTime);
            data.append('end_time', eventData.endTime);
            data.append('date', dateKey);
            AddAgendaAction(data);
        }

        this.setState({
            events: updatedEvents,
            showModal: false,
            newEventTitle: '',
            newEventType: 'Examen',
            newEventStartTime: '',
            newEventEndTime: '',
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
        const { user_token } = this.props;

        if (eventToDelete) {
            const dateKey = selectedDate.toISOString().split('T')[0];
            const updated = { ...events };
            updated[dateKey] = updated[dateKey].filter(ev => ev.id !== eventToDelete);

            const data = new FormData();
            data.append('token', user_token);
            data.append('id', eventToDelete);
            DeleteAgendaAction(data);

            this.setState({
                events: updated,
                showDeleteAlert: false,
                eventToDelete: null,
            });

            Toast.show({ type: 'success', text1: 'Événement supprimé' });
        }
    };

    cancelDelete = () => {
        this.setState({ showDeleteAlert: false, eventToDelete: null });
    };

    openEventMenu = (event) => {
        this.setState({ isVisibleMenu: true, selectedEvent: event });
    };

    closeEventMenu = () => {
        this.setState({ isVisibleMenu: false, selectedEvent: null });
    };

    renderMonthlyGrid = () => {
        const { currentMonth, currentYear, selectedDate, events } = this.state;
        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startWeekday = firstDay.getDay();

        const cells = [];
        const today = new Date();

        for (let i = 0; i < startWeekday; i++) {
            cells.push(<View key={`empty-${i}`} style={agendastyle.dayCellWrapper} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const dateKey = dateObj.toISOString().split('T')[0];
            const isToday = dateObj.toDateString() === today.toDateString();
            const isSelected = dateObj.toDateString() === selectedDate.toDateString();
            const dayEvents = events[dateKey] || [];

            cells.push(
                <View key={day} style={agendastyle.dayCellWrapper}>
                    <TouchableOpacity
                        style={[
                            agendastyle.dayCell,
                            isToday && agendastyle.todayCell,
                            isSelected && agendastyle.selectedCell,
                        ]}
                        onPress={() => this.setState({ selectedDate: dateObj })}
                        activeOpacity={0.75}
                    >
                        <Text style={[
                            agendastyle.dayText,
                            isToday && agendastyle.todayText,
                            isSelected && agendastyle.selectedText,
                        ]}>
                            {day}
                        </Text>

                        {dayEvents.length > 0 && (
                            <View style={agendastyle.eventDots}>
                                {dayEvents.slice(0, 3).map((ev, idx) => (
                                    <View key={idx} style={[agendastyle.eventDot, { backgroundColor: ev.color }]} />
                                ))}
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            );
        }

        return cells;
    };

    renderSelectedDayEvents = () => {
        const { selectedDate, events } = this.state;
        const dateKey = selectedDate.toISOString().split('T')[0];
        const dayEvents = events[dateKey] || [];

        if (dayEvents.length === 0) {
            return <Text style={agendastyle.noEvents}>Aucun événement prévu pour ce jour.</Text>;
        }

        return (
            <View style={agendastyle.eventsList}>
                {dayEvents.map(event => (
                    <TouchableOpacity
                        key={event.id}
                        style={[agendastyle.eventItem, { borderLeftColor: event.color }]}
                        onPress={() => this.openEventMenu(event)}
                        activeOpacity={0.8}
                    >
                        <View style={agendastyle.eventContent}>
                            <Text style={agendastyle.eventTitle}>{event.title}</Text>
                            <Text style={agendastyle.eventTime}>
                                {event.startTime} - {event.endTime}
                            </Text>
                            <Text style={agendastyle.eventType}>{event.type}</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color={COLORS.textMuted} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    render() {
        const {
            currentMonth, currentYear, selectedDate, showModal,
            isEditing, newEventTitle, newEventType, newEventStartTime,
            newEventEndTime, newEventStartTimeError, newEventEndTimeError,
            showDeleteAlert, eventToDelete, isVisibleMenu, selectedEvent,
        } = this.state;

        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const eventToDeleteObj = eventToDelete ?
            Object.values(this.state.events).flat().find(ev => ev.id === eventToDelete) : null;

        return (
            <SafeAreaView style={agendastyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={agendastyle.topGlow} pointerEvents="none" />
                <View style={agendastyle.bottomGlow} pointerEvents="none" />

                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 110 }}
                >
                    {/* En-tête local standardisé Poly-H */}
                    <View style={agendastyle.localHeader}>
                        <TouchableOpacity
                            style={agendastyle.btnBackCustom}
                            onPress={this._navigateToMenu}
                            activeOpacity={0.7}
                        >
                            <Icon name="chevron-left" size={26} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <Text style={agendastyle.localTitleText}>Mon Agenda</Text>
                    </View>

                    {/* Carte Calendrier */}
                    <View style={agendastyle.calendarCard}>
                        <View style={agendastyle.calendarHeader}>
                            <TouchableOpacity onPress={this.prevMonth} style={agendastyle.navButton}>
                                <Icon name="chevron-left" size={22} color={COLORS.textPrimary} />
                            </TouchableOpacity>

                            <Text style={agendastyle.monthYear}>
                                {monthNames[currentMonth]} {currentYear}
                            </Text>

                            <TouchableOpacity onPress={this.goToToday} style={agendastyle.todayButton}>
                                <Icon name="calendar-today" size={18} color={COLORS.accentGold} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.nextMonth} style={agendastyle.navButton}>
                                <Icon name="chevron-right" size={22} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={agendastyle.weekHeader}>
                            {daysOfWeek.map(day => (
                                <View key={day} style={agendastyle.dayCellWrapper}>
                                    <Text style={agendastyle.weekDay}>{day}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={agendastyle.daysGrid}>
                            {this.renderMonthlyGrid()}
                        </View>
                    </View>

                    {/* Section Événements */}
                    <View style={agendastyle.eventsSection}>
                        <View style={agendastyle.eventsHeader}>
                            <Text numberOfLines={1} style={agendastyle.eventsTitle}>
                                Événements du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </Text>
                            <TouchableOpacity style={agendastyle.addButton} onPress={this.openAddModal} activeOpacity={0.8}>
                                <Icon name="plus-circle" size={28} color={COLORS.accentGold} />
                            </TouchableOpacity>
                        </View>

                        {this.renderSelectedDayEvents()}
                    </View>
                </ScrollView>

                {/* Modal d'ajout / modification */}
                <Modal
                    visible={showModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={agendastyle.modalOverlay}
                    >
                        <View style={agendastyle.modalContent}>
                            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                                <Text style={agendastyle.modalTitle}>
                                    {isEditing ? 'Modifier l\'événement' : 'Nouvel événement'}
                                </Text>

                                <TextInput
                                    style={agendastyle.modalInput}
                                    placeholder="Titre de l'événement"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={newEventTitle}
                                    onChangeText={text => this.setState({ newEventTitle: text })}
                                />

                                <View style={agendastyle.timeRow}>
                                    <View style={agendastyle.timeField}>
                                        <Text style={agendastyle.timeLabel}>Début</Text>
                                        <TextInput
                                            style={agendastyle.timeInput}
                                            placeholder="HH:MM"
                                            placeholderTextColor={COLORS.textMuted}
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
                                        <Text style={agendastyle.timeLabel}>Fin</Text>
                                        <TextInput
                                            style={agendastyle.timeInput}
                                            placeholder="HH:MM"
                                            placeholderTextColor={COLORS.textMuted}
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
                                                agendastyle.typeText,
                                                newEventType === type && { color: COLORS.textDark, fontWeight: 'bold' }
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
                                    <Text style={agendastyle.buttonTextCancel}>Annuler</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={agendastyle.confirmButton} onPress={this.saveEvent}>
                                    <Text style={agendastyle.buttonTextConfirm}>
                                        {isEditing ? 'Modifier' : 'Ajouter'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                {/* AwesomeAlert Suppression */}
                <AwesomeAlert
                    show={showDeleteAlert}
                    showProgress={false}
                    title="Supprimer l'événement ?"
                    titleStyle={agendastyle.alertTitle}
                    message={`Êtes-vous sûr de vouloir supprimer "${eventToDeleteObj?.title || 'cet événement'}" ?`}
                    messageStyle={agendastyle.alertMessage}
                    closeOnTouchOutside={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Annuler"
                    confirmText="Supprimer"
                    cancelButtonColor="rgba(255, 255, 255, 0.1)"
                    confirmButtonColor="#F43F5E"
                    onCancelPressed={this.cancelDelete}
                    onConfirmPressed={this.confirmDelete}
                    contentContainerStyle={agendastyle.alertContainer}
                />

                {/* Panel Swipeable pour le détail */}
                <SwipeablePanel
                    fullWidth={true}
                    openLarge={false}
                    closeOnTouchOutside={true}
                    showCloseButton={true}
                    isActive={isVisibleMenu}
                    onClose={this.closeEventMenu}
                    style={agendastyle.containermenu}
                >
                    <View style={{ padding: 16 }}>
                        <View style={agendastyle.eventDetailHeader}>
                            <View style={[agendastyle.eventDetailDot, { backgroundColor: selectedEvent?.color }]} />
                            <Text style={agendastyle.eventDetailTitle}>{selectedEvent?.title}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.openEditModal(selectedEvent)} style={agendastyle.headermenuitem}>
                            <Icon name="pencil" size={20} color={COLORS.accentCyan} />
                            <Text style={agendastyle.menulisttext}>Modifier l'événement</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.showDeleteConfirmation(selectedEvent?.id)} style={agendastyle.headermenuitem}>
                            <Icon name="delete" size={20} color="#F43F5E" />
                            <Text style={[agendastyle.menulisttext, { color: '#F43F5E' }]}>Supprimer l'événement</Text>
                        </TouchableOpacity>
                    </View>
                </SwipeablePanel>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchHomePageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Student_Agenda);