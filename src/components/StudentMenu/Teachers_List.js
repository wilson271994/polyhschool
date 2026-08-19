import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Animated,
    FlatList,
    Image,
    TextInput,
    StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { BASE_URL } from '../../api/config.js';
import { teacherstyle } from '../../assets/styles/teacherlist.js';
import { styles } from '../../assets/styles/index.js';
import { COLORS } from '../../assets/styles/theme.js';
import { switchHomePageAction, switchInfosTeacherPageAction } from '../../navigations/rootNavigation.js';

class Teachers_List extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            scrollY: new Animated.Value(0),
        };

        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    _navigateToTeacher = (teacherItem) => {
        switchInfosTeacherPageAction(true, teacherItem);
    };

    getFilteredTeachers = (teachers) => {
        const { searchQuery } = this.state;
        if (!searchQuery.trim()) return teachers;

        const query = searchQuery.toLowerCase();
        return teachers.filter((item) => {
            const staff = item?.staff || {};
            const name = (staff?.name || `${staff?.first_name || ''} ${staff?.last_name || ''}`).toLowerCase();
            const subject = (staff?.subject || staff?.sector || '').toLowerCase();
            const email = (staff?.email || '').toLowerCase();

            return name.includes(query) || subject.includes(query) || email.includes(query);
        });
    };

    renderHeader = () => {
        return (
            <View style={teacherstyle.headerBar}>
                <TouchableOpacity
                    style={teacherstyle.backButton}
                    onPress={this._navigateToMenu}
                    activeOpacity={0.7}
                >
                    <Entypo name="chevron-left" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={[styles.textBold, teacherstyle.headerTitle]}>
                    Corps Enseignant
                </Text>
            </View>
        );
    };

    renderTeacher = ({ item }) => {
        const teacherPhoto = item?.staff?.pp
            ? { uri: BASE_URL + item.staff.pp }
            : require('../../assets/images/profil.png');
        const teacherName = item?.staff?.name || `${item?.staff?.first_name || ''} ${item?.staff?.last_name || ''}`.trim() || 'Professeur';
        const teacherSubject = item?.courses?.length || 0;
        const teacherEmail = item?.staff?.email || 'Indisponible';

        return (
            <TouchableOpacity
                onPress={() => this._navigateToTeacher(item)}
                style={teacherstyle.teacherCard}
                activeOpacity={0.85}
            >
                <View style={teacherstyle.avatarWrapper}>
                    <Image source={teacherPhoto} style={teacherstyle.avatar} />
                    <View style={teacherstyle.statusDot} />
                </View>

                <View style={teacherstyle.infoContainer}>
                    <Text style={[styles.textBold, teacherstyle.teacherName]} numberOfLines={1}>
                        {teacherName}
                    </Text>

                    <View style={teacherstyle.subjectBadge}>
                        <Icon name="book-education-outline" size={13} color={COLORS.accentGold} style={{ marginRight: 4 }} />
                        <Text style={[styles.textBold, teacherstyle.subjectBadgeText]} numberOfLines={1}>
                            {teacherSubject} matières
                        </Text>
                    </View>

                    <View style={teacherstyle.emailRow}>
                        <Icon name="email-outline" size={14} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
                        <Text style={[styles.text, teacherstyle.emailText]} numberOfLines={1}>
                            {teacherEmail}
                        </Text>
                    </View>
                </View>

                <View style={teacherstyle.arrowAction}>
                    <Icon name="chevron-right" size={22} color={COLORS.accentGold} />
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { student_infos } = this.props;
        const { searchQuery } = this.state;

        const rawTeachers = student_infos ? student_infos['all_student_teacher'] || [] : [];
        const filteredTeachers = this.getFilteredTeachers(rawTeachers);

        return (
            <SafeAreaView style={teacherstyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

                {/* Ambient Glows */}
                <View style={teacherstyle.topGlow} pointerEvents="none" />
                <View style={teacherstyle.bottomGlow} pointerEvents="none" />

                {this.renderHeader()}

                <Animated.ScrollView
                    style={{ flex: 1 }}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 110 }}
                >
                    {/* Section d'accueil & Barre de recherche */}
                    <View style={teacherstyle.searchCard}>
                        <Text style={[styles.textBold, teacherstyle.searchTitle]}>
                            Vos Enseignants ({filteredTeachers.length})
                        </Text>
                        <Text style={[styles.text, teacherstyle.searchSubtitle]}>
                            Retrouvez la liste et les coordonnées de vos professeurs.
                        </Text>

                        <View style={teacherstyle.searchBar}>
                            <Icon name="magnify" size={20} color={COLORS.accentGold} style={{ marginRight: 8 }} />
                            <TextInput
                                style={[styles.text, teacherstyle.searchInput]}
                                placeholder="Rechercher par nom, matière..."
                                placeholderTextColor={COLORS.textMuted}
                                value={searchQuery}
                                onChangeText={(text) => this.setState({ searchQuery: text })}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => this.setState({ searchQuery: '' })}>
                                    <Icon name="close-circle" size={18} color={COLORS.textSecondary} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Liste des Enseignants */}
                    <View style={teacherstyle.listSection}>
                        <FlatList
                            data={filteredTeachers}
                            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                            renderItem={this.renderTeacher}
                            scrollEnabled={false}
                            ListEmptyComponent={
                                <View style={teacherstyle.emptyState}>
                                    <Icon name="account-search-outline" size={48} color={COLORS.textMuted} />
                                    <Text style={[styles.text, teacherstyle.emptyText]}>
                                        {searchQuery.length > 0
                                            ? 'Aucun enseignant ne correspond à votre recherche'
                                            : 'Aucun professeur disponible pour le moment'}
                                    </Text>
                                </View>
                            }
                        />
                    </View>
                </Animated.ScrollView>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            switchHomePageAction,
            switchInfosTeacherPageAction,
        },
        dispatch
    ),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
    student_infos: state.auth.student_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers_List);