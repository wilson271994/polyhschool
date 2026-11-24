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
    StatusBar,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SwipeablePanel } from 'rn-swipeable-panel';

import { agendastyle } from '../../../assets/styles/studentagenda.js';
import { COLORS } from '../../../assets/styles/theme.js';
import { switchHomePageAction } from '../../../navigations/rootNavigation.js';
import { UpdateAgendaAction, DeleteAgendaAction, CreateAgendaAction } from '../../../reducers/actions/index.js';
import { styles } from '../../../assets/styles/index.js';
import Moment from 'moment';
import 'moment/locale/fr';

class Agenda extends PureComponent {
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
            newEventDescription:'',
            newEventType: '',
            newEventDate: null,
            newEventDateInput:'',
            newEventStartTime: '',
            newEventEndTime: '',
            newEventStartTimeError: '',
            newEventEndTimeError: '',
            newEventDateError: '',
            events: this._getMockEvents(),
            showDeleteAlert: false,
            eventToDelete: null,
            isVisibleMenu: false,
            selectedEvent: null,
        };
    }

    _navigateToHome = () => {
        switchHomePageAction(true);
    };

    _getMockEvents = () => {
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

    _prevMonth = () => {
        let { currentMonth, currentYear } = this.state;
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        this.setState({ currentMonth, currentYear });
    };

    _nextMonth = () => {
        let { currentMonth, currentYear } = this.state;
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        this.setState({ currentMonth, currentYear });
    };

    _goToToday = () => {
        const today = new Date();
        this.setState({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today,
        });
    };

    _validateAndFormatTime = (text, fieldName) => {
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

    _formatEventDate = (text) => {
        let cleaned = text.replace(/\D/g, '').substring(0, 8);
        let formatted = cleaned;

        if (cleaned.length > 2) {
            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        if (cleaned.length > 4) {
            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4);
        }
        return formatted;
    };

    _validateEventDate = (dateStr) => {
        if (dateStr.length !== 10) return false;
        const [jj, mm, aaaa] = dateStr.split('/').map(Number);
        if (isNaN(jj) || isNaN(mm) || isNaN(aaaa)) return false;
        if (aaaa < 2024 || aaaa > 2100) return false;
        if (mm < 1 || mm > 12) return false;
        if (jj < 1 || jj > 31) return false;

        const date = new Date(aaaa, mm - 1, jj);
        return date.getFullYear() === aaaa && date.getMonth() === mm - 1 && date.getDate() === jj;
    };

    _handleEventDateChange = (text) => {
        const formatted = this._formatEventDate(text);
        this.setState({ newEventDateInput: formatted });

        if (formatted.length === 10) {
            if (!this._validateEventDate(formatted)) {
                this.setState({ newEventDateError: 'Date invalide', newEventDate: null });
            } else {
                const [jj, mm, aaaa] = formatted.split('/').map(Number);
                const date = new Date(aaaa, mm - 1, jj);
                this.setState({ newEventDateError: '', newEventDate: date });
            }
        } else {
            this.setState({ newEventDateError: '', newEventDate: null });
        }
    };

    _openAddModal = () => {
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

    _openEditModal = (event) => {
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

    _submitEvent = () => {
        const {
            selectedDate, newEventTitle, newEventType,
            newEventStartTime, newEventEndTime,
            isEditing, editingEventId, newEventDescription, newEventDateInput
        } = this.state;

        const { user_token, student_infos } = this.props;

        var events = student_infos.all_agenda_task;

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

        var updatedEvents = { ...events };
        var formData = new FormData();

        if (isEditing) {
            updatedEvents[dateKey] = updatedEvents[dateKey].map(ev =>
                ev.id === editingEventId ? { ...ev, ...eventData } : ev
            );
            formData.append('token', user_token);
            formData.append('id', editingEventId);
            formData.append('title', newEventTitle);
            formData.append('description', newEventDescription);
            formData.append('task_type', newEventType.id);
            formData.append('start_time', newEventStartTime);
            formData.append('end_time', newEventEndTime);
            formData.append('date', Moment(newEventDateInput).format('YYYY-MM-DD'));
            //UpdateAgendaAction(data);
        } else {
            formData.append('token', user_token);
            formData.append('school', student_infos.school_id);
            formData.append('student', student_infos.id);
            formData.append('title', newEventTitle);
            formData.append('description', newEventDescription);
            formData.append('task_type', newEventType.id);
            formData.append('start_time', newEventStartTime);
            formData.append('end_time', newEventEndTime);
            formData.append('date', Moment(newEventDateInput).format('YYYY-MM-DD'));

            console.log(newEventDateInput)
            console.log(formData)
            //CreateAgendaAction(formData, events, this._closeSubmitEvent);
        }
    };

    _closeSubmitEvent = () => {
        this.setState({
            showModal: false,
            newEventTitle: '',
            newEventType: '',
            newEventStartTime: '',
            newEventEndTime: '',
            isEditing: false,
            editingEventId: null,
        });
    }

    _showDeleteConfirmation = (eventId) => {
        this.setState({
            showDeleteAlert: true,
            eventToDelete: eventId,
            isVisibleMenu: false,
        });
    };

    _confirmDelete = () => {
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

    _cancelDelete = () => {
        this.setState({ showDeleteAlert: false, eventToDelete: null });
    };

    _openEventMenu = (event) => {
        this.setState({ isVisibleMenu: true, selectedEvent: event });
    };

    _closeEventMenu = () => {
        this.setState({ isVisibleMenu: false, selectedEvent: null });
    };

    _renderMonthlyGrid = () => {
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

    _renderSelectedDayEvents = () => {
        const { selectedDate } = this.state;
        const { student_infos } = this.props;
        const events = student_infos.all_agenda_task;
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
                        onPress={() => this._openEventMenu(event)}
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
            newEventDateError, newEventDateInput,
            showDeleteAlert, eventToDelete, isVisibleMenu, selectedEvent,
            newEventDescription
        } = this.state;

        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        const eventToDeleteObj = eventToDelete ?
            Object.values(this.state.events).flat().find(ev => ev.id === eventToDelete) : null;

        const { student_infos, school_infos, is_loading } = this.props;
        const current_school = school_infos.schools.filter((item) => item.id === student_infos.school_id);
        const all_agenda_type = current_school[0].all_agenda_type;

        return (
            <SafeAreaView style={agendastyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={agendastyle.topGlow} pointerEvents="none" />
                <View style={agendastyle.bottomGlow} pointerEvents="none" />

                {/* En-tête local standardisé Poly-H */}
                <View style={agendastyle.headerBar}>
                    <TouchableOpacity
                        style={agendastyle.btnBackCustom}
                        onPress={this._navigateToHome}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-left" size={26} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={agendastyle.localTitleText}>Mon Agenda</Text>
                </View>


                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 110 }}
                >
                    
                    {/* Carte Calendrier */}
                    <View style={agendastyle.calendarCard}>
                        <View style={agendastyle.calendarHeader}>
                            <TouchableOpacity onPress={this._prevMonth} style={agendastyle.navButton}>
                                <Icon name="chevron-left" size={22} color={COLORS.textPrimary} />
                            </TouchableOpacity>

                            <Text style={agendastyle.monthYear}>
                                {monthNames[currentMonth]} {currentYear}
                            </Text>

                            <TouchableOpacity onPress={this._goToToday} style={agendastyle.todayButton}>
                                <Icon name="calendar-today" size={18} color={COLORS.accentGold} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this._nextMonth} style={agendastyle.navButton}>
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
                            {this._renderMonthlyGrid()}
                        </View>
                    </View>

                    {/* Section Événements */}
                    <View style={agendastyle.eventsSection}>
                        <View style={agendastyle.eventsHeader}>
                            <Text numberOfLines={1} style={agendastyle.eventsTitle}>
                                Événements du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </Text>
                            <TouchableOpacity style={agendastyle.addButton} onPress={this._openAddModal} activeOpacity={0.8}>
                                <Icon name="plus-circle" size={28} color={COLORS.accentGold} />
                            </TouchableOpacity>
                        </View>

                        {this._renderSelectedDayEvents()}
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
                                <Text style={[styles.textBold, agendastyle.modalTitle]}>
                                    {isEditing ? 'Modifier l\'événement' : 'Nouvel événement'}
                                </Text>

                                <View>
                                    <Text style={[styles.text, agendastyle.inputLabel]}>Titre de l'événement</Text>
                                    <TextInput
                                        style={agendastyle.modalInput}
                                        placeholder="Titre de l'événement"
                                        placeholderTextColor={COLORS.textMuted}
                                        value={newEventTitle}
                                        onChangeText={text => this.setState({ newEventTitle: text })}
                                    />
                                </View>
                                
                                <Text style={[styles.text, agendastyle.inputLabel]}>Description de l'événement</Text>
                                <TextInput
                                    style={agendastyle.modalInput}
                                    placeholder="Description de l'événement"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={newEventDescription}
                                    onChangeText={text => this.setState({ newEventDescription: text })}
                                    multiline
                                />

                                <Text style={[styles.text, agendastyle.inputLabel]}>Date de l'évènement *</Text>
                                <TextInput
                                    style={[
                                        styles.text,
                                        agendastyle.modalInput,
                                        newEventDateError ? { borderColor: '#EF4444' } : null,
                                    ]}
                                    placeholder="JJ/MM/AAAA"
                                    placeholderTextColor="#64748B"
                                    value={newEventDateInput}
                                    onChangeText={this._handleEventDateChange}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                                {newEventDateError ? (
                                    <Text style={[styles.text, agendastyle.textError]}>{newEventDateError}</Text>
                                ) : null}

                                <View style={agendastyle.timeRow}>
                                    <View style={agendastyle.timeField}>
                                        <Text style={[styles.text, agendastyle.inputLabel]}>Début</Text>
                                        <TextInput
                                            style={agendastyle.timeInput}
                                            placeholder="HH:MM"
                                            placeholderTextColor={COLORS.textMuted}
                                            value={newEventStartTime}
                                            onChangeText={(text) => this._validateAndFormatTime(text, 'start')}
                                            keyboardType="numeric"
                                            maxLength={5}
                                        />
                                        {newEventStartTimeError ? (
                                            <Text style={[styles.text, agendastyle.textError]}>{newEventStartTimeError}</Text>
                                        ) : null}
                                    </View>

                                    <View style={agendastyle.timeField}>
                                        <Text style={[styles.text, agendastyle.inputLabel]}>Fin</Text>
                                        <TextInput
                                            style={agendastyle.timeInput}
                                            placeholder="HH:MM"
                                            placeholderTextColor={COLORS.textMuted}
                                            value={newEventEndTime}
                                            onChangeText={(text) => this._validateAndFormatTime(text, 'end')}
                                            keyboardType="numeric"
                                            maxLength={5}
                                        />
                                        {newEventEndTimeError ? (
                                            <Text style={[styles.text, agendastyle.textError]}>{newEventEndTimeError}</Text>
                                        ) : null}
                                    </View>
                                </View>

                                <View style={agendastyle.typeSelector}>
                                    {all_agenda_type?.map((item, key) => (
                                        <TouchableOpacity
                                            key={key}
                                            style={[
                                                agendastyle.typeButton,
                                                newEventType === item && agendastyle.typeButtonActive,
                                            ]}
                                            onPress={() => this.setState({ newEventType: item })}
                                        >
                                            <Text style={[
                                                agendastyle.typeText,
                                                newEventType === item && { color: COLORS.textDark, fontWeight: 'bold' }
                                            ]}>
                                                {item.name}
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

                                <TouchableOpacity style={agendastyle.confirmButton} onPress={this._submitEvent}>
                                    {is_loading ? (
                                        <ActivityIndicator size="small" color={COLORS.textDark} />
                                        ) : (
                                            <Text style={agendastyle.buttonTextConfirm}>
                                                {isEditing ? 'Modifier' : 'Ajouter'}
                                            </Text>
                                        )
                                    }
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
                    onCancelPressed={this._cancelDelete}
                    onConfirmPressed={this._confirmDelete}
                    contentContainerStyle={agendastyle.alertContainer}
                />

                {/* Panel Swipeable pour le détail */}
                <SwipeablePanel
                    fullWidth={true}
                    openLarge={false}
                    closeOnTouchOutside={true}
                    showCloseButton={true}
                    isActive={isVisibleMenu}
                    onClose={this._closeEventMenu}
                    style={agendastyle.containermenu}
                >
                    <View style={{ padding: 16 }}>
                        <View style={agendastyle.eventDetailHeader}>
                            <View style={[agendastyle.eventDetailDot, { backgroundColor: selectedEvent?.color }]} />
                            <Text style={agendastyle.eventDetailTitle}>{selectedEvent?.title}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this._openEditModal(selectedEvent)} style={agendastyle.headermenuitem}>
                            <Icon name="pencil" size={20} color={COLORS.accentCyan} />
                            <Text style={agendastyle.menulisttext}>Modifier l'événement</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._showDeleteConfirmation(selectedEvent?.id)} style={agendastyle.headermenuitem}>
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
        switchHomePageAction,
        CreateAgendaAction,
        UpdateAgendaAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    is_loading: state.loader.is_loading,
    user_infos: state.auth.user_infos,
    user_token: state.auth.user_token,
    student_infos: state.auth.student_infos,
    school_infos: state.auth.school_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);