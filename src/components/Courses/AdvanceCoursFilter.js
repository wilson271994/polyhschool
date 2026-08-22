import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator, } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { advancesearchstyle } from '../../assets/styles/advanceSearch';
import { styles } from '../../assets/styles';
import { switchCoursePageAction } from '../../navigations/rootNavigation';

class AdvanceCoursFilter extends PureComponent {
    state = {
        searchText: '',
        debouncedSearchText: '',
        selectedSubject: 'Toutes',
        selectedType: 'Tous',
        allRemarks: [],
        isSearching: false,
    };

    debounceTimer = null;

    componentDidMount() {
        const { allRemarks } = this.props.route?.params || {};
        if (allRemarks) {
            this.setState({ allRemarks });
        }
    }

    componentWillUnmount() {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
    }


    handleSearchChange = (text) => {
        this.setState({ searchText: text, isSearching: true });

        if (this.debounceTimer) clearTimeout(this.debounceTimer);

        this.debounceTimer = setTimeout(() => {
            this.setState({
                debouncedSearchText: text.trim().toLowerCase(),
                isSearching: false,
            });
        }, 300);
    };


    getFilteredRemarks = () => {
        const { allRemarks, debouncedSearchText, selectedSubject, selectedType } = this.state;
        let filtered = allRemarks || [];

        if (debouncedSearchText) {
            const term = debouncedSearchText;

            filtered = filtered.filter(item =>
                (item.title && item.title.toLowerCase().includes(term)) ||
                (item.lesson && item.lesson.toLowerCase().includes(term)) ||
                (item.teacher && item.teacher.toLowerCase().includes(term)) ||
                (item.comment && item.comment.toLowerCase().includes(term)) ||
                (item.subject && item.subject.toLowerCase().includes(term))
            );
        }

        if (selectedSubject !== 'Toutes') {
            filtered = filtered.filter(item => item.subject === selectedSubject);
        }

        if (selectedType !== 'Tous') {
            filtered = filtered.filter(item => item.type === selectedType);
        }

        return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    getUniqueSubjects = () => {
        const { allRemarks } = this.state;
        return ['Toutes', ...new Set((allRemarks || []).map(r => r.subject))];
    };

    selectSubject = (subject) => this.setState({ selectedSubject: subject });
    selectType = (type) => this.setState({ selectedType: type });

    clearSearch = () => this.setState({ searchText: '', debouncedSearchText: '' });

    _navigateToMenu = () => {
        switchCoursePageAction(true);
    };

    renderRemark = ({ item }) => {
        const isPositive = item.type === "positive";

        return (
            <View style={advancesearchstyle.remarkCard}>
                <View style={advancesearchstyle.remarkHeader}>
                    <View style={[advancesearchstyle.subjectIcon, { backgroundColor: item.color + '15' }]}>
                        <Icon name={item.icon} size={28} color={item.color} />
                    </View>
                    <View style={advancesearchstyle.subjectInfo}>
                        <Text style={[advancesearchstyle.subjectName, styles.textBold]}>{item.subject}</Text>
                        <Text style={[advancesearchstyle.teacherName, styles.text]}>Prof. {item.teacher}</Text>
                    </View>
                    <Text style={[advancesearchstyle.date, styles.text]}>{item.displayDate}</Text>
                </View>

                <Text style={[advancesearchstyle.remarkTitle, styles.textBold]}>{item.title}</Text>
                {item.lesson && (
                    <Text style={[advancesearchstyle.lessonTitle, styles.text]}>{item.lesson}</Text>
                )}
                <Text style={[advancesearchstyle.remarkComment, styles.text]}>{item.comment}</Text>

                <View style={advancesearchstyle.footerRow}>
                    <View style={[advancesearchstyle.ratingContainer, styles.text]}>
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                key={i}
                                name={i < item.rating ? "star" : "star-outline"}
                                size={18}
                                color={isPositive ? "#FFC107" : "#9E9E9E"}
                            />
                        ))}
                    </View>
                    <View style={[advancesearchstyle.typeBadge, isPositive ? advancesearchstyle.positiveBadge : advancesearchstyle.warningBadge]}>
                        <Text style={isPositive ? advancesearchstyle.positiveText : advancesearchstyle.warningText}>
                            {isPositive ? "Positif" : "À améliorer"}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { searchText, isSearching } = this.state;
        const filteredRemarks = this.getFilteredRemarks();
        const resultsCount = filteredRemarks.length;

        return (
            <SafeAreaView style={advancesearchstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Recherche Avancée des Cours</Text>
                    </View>


                    <View style={advancesearchstyle.searchContainer}>
                        <Icon name="magnify" size={22} color="#1B497D" />
                        <TextInput
                            style={[advancesearchstyle.searchInput, styles.text]}
                            placeholder="Rechercher par titre, professeur..."
                            value={searchText}
                            onChangeText={this.handleSearchChange}
                            autoFocus
                            placeholderTextColor="#999"
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={this.clearSearch}>
                                <Icon name="close-circle" size={24} color="#888" style={advancesearchstyle.close} />
                            </TouchableOpacity>
                        )}
                    </View>


                    {isSearching && (
                        <ActivityIndicator size="small" color="#1B497D" style={{ marginVertical: 10 }} />
                    )}

                    <View style={advancesearchstyle.resultsCountContainer}>
                        <Text style={[advancesearchstyle.resultsCount, styles.textBold]}>
                            {resultsCount} résultat{resultsCount > 1 ? 's' : ''} trouvé{resultsCount > 1 ? 's' : ''}
                        </Text>
                    </View>

                    <FlatList
                        data={filteredRemarks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this.renderRemark}
                        contentContainerStyle={advancesearchstyle.listContent}
                        initialNumToRender={8}
                        windowSize={15}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={10}
                        ListEmptyComponent={
                            <Text style={[advancesearchstyle.emptyText, styles.text]}>
                                {searchText ? "Aucune correspondance trouvée" : "Commencez à taper pour rechercher un cours"}
                            </Text>
                        }
                    />
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ switchCoursePageAction }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceCoursFilter);