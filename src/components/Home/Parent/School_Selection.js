import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ImageBackground, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { schoolstyle } from '../../../assets/styles/school.js';
import { styles } from '../../../assets/styles/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { switchRegister1Action, switchSchoolDetailsParentAction, setSelectedSchoolAction, switchHomeParentAction } from '../../../navigations/rootNavigation.js';
import { BASE_URL } from '../../../api/config.js';
import { store } from '../../../reducers/store.js';
import { SET_SELECTED_SCHOOL } from '../../../reducers/actions/types.js';


class SchoolSelection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            selectedSchoolId: null,
            localRatings: {},
        };
    }


    _NavigateToSchoolsDetails = (school) => {
        setSelectedSchoolAction(school);
        switchSchoolDetailsParentAction(true);
    };

    _NavigateToHome = () => {
        switchHomeParentAction(true)
    }

    _NavigateToForm1 = async (item) => {
        this.setState({ selectedSchoolId: item.id });
        try {
            const choosedata = await AsyncStorage.getItem('DataChoose');
            const typeData = choosedata ? JSON.parse(choosedata) : {};
            await AsyncStorage.setItem('SelectedSchoolId', JSON.stringify({
                school: item.id,
            }));

            store.dispatch({ type: SET_SELECTED_SCHOOL, value: item })
            switchRegister1Action(true, item.id);
        } catch (e) {
            console.error('Erreur lors de la sauvegarde :', e);
        }
    };

    updateEtoiles = (schoolId, nouveauNombreEtoiles) => {
        const school = schools.find(s => s.id === schoolId);

        if (school && nouveauNombreEtoiles >= 0 && nouveauNombreEtoiles <= school.maxEtoiles) {
            this.setState(prevState => ({
                localRatings: {
                    ...prevState.localRatings,
                    [schoolId]: nouveauNombreEtoiles,
                },
            }), () => {
                Alert.alert('Succès', `Note mise à jour : ${nouveauNombreEtoiles} étoiles`);
            });
        }
    };

    renderEtoiles = (school) => {
        const etoiles = [];
        const maxEtoiles = school.maxEtoiles || 5;
        const currentEtoiles = school.etoiles || 0;

        for (let i = 1; i <= maxEtoiles; i++) {
            etoiles.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => this.updateEtoiles(school.id, i)}
                    activeOpacity={0.7}
                >
                    <Icon
                        name={i <= currentEtoiles ? "star" : "star-outline"}
                        size={14}
                        color={i <= currentEtoiles ? "#FFD700" : "#CBD5E1"}
                        style={schoolstyle.etoileIcon}
                    />
                </TouchableOpacity>
            );
        }

        return (
            <View style={schoolstyle.etoilesContainer}>
                {etoiles}
                <Text style={[schoolstyle.noteTexte, styles.text]}>
                    ({currentEtoiles}/{maxEtoiles})
                </Text>
            </View>
        );
    };

    sortSchoolsByStars = (schools) => {
        return [...schools].sort((a, b) => (b.etoiles || 0) - (a.etoiles || 0));
    };

    filterAndSortSchools = () => {
        const { school_infos } = this.props;
        const { search } = this.state;

        let filteredSchools = [...school_infos.schools];

        if (search && search.trim() !== '') {
            const query = search.toLowerCase();
            filteredSchools = filteredSchools.filter(
                (school) =>
                    school.name?.toLowerCase().includes(query) ||
                    school.about?.toLowerCase().includes(query) ||
                    school.address?.toLowerCase().includes(query)
            );
        }

        filteredSchools = this.sortSchoolsByStars(filteredSchools);
        return filteredSchools;
    };

    renderSchoolItem = (item) => {
        return (
            <View style={schoolstyle.transactionItem}>
                <View style={schoolstyle.iconContainer}>
                    <Image
                        source={{ uri: BASE_URL + item.logo }}
                        style={schoolstyle.transactionImage}
                        resizeMode="cover"
                    />
                </View>
                <View
                    style={schoolstyle.transactionDetails}
                >
                    <View style={schoolstyle.contain}>
                        <Text style={[schoolstyle.type, styles.textBold]}>{item.name}</Text>
                        <View style={schoolstyle.sectionDivider} />
                        <Text style={[schoolstyle.author, styles.textBold]}>Taux de réussite</Text>
                        <Text style={[schoolstyle.author, styles.text]}><Icon name="file-certificate" size={12} color="#1B497D" />Classes d'examens: <Text style={[schoolstyle.value, styles.text]}> 94.7% {/*{item.phone}*/}</Text></Text>
                        <Text style={[schoolstyle.author, styles.text]}><Icon name="pencil" size={12} color="#1B497D" />Classes intermédiares: <Text style={[schoolstyle.value, styles.text]}> 98% {/*{item.phone}*/}</Text></Text>
                        <View style={schoolstyle.sectionDivider} />
                        {this.renderEtoiles(item)}
                    </View>
                </View>
                <View style={schoolstyle.bottom}>
                    <TouchableOpacity
                        onPress={() => this._NavigateToForm1(item)}
                        style={schoolstyle.selectContainer}>
                        <Text style={[styles.textBold, schoolstyle.buttonText]}>Choisir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._NavigateToSchoolsDetails.bind(this, item)}
                        style={schoolstyle.statusContainer}
                    >
                        <Text style={[styles.textBold, schoolstyle.seeButtonText]}>Voir plus</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    renderFooter = () => {
        const { is_loading } = this.props;
        if (!is_loading) return null;
        return (
            <View style={schoolstyle.loadingContainer}>
                <ActivityIndicator size="large" color="#1B497D" />
                <Text style={[schoolstyle.loadingText, styles.text]}>Chargement des écoles...</Text>
            </View>
        );
    };

    renderEmptyList = () => {
        const { is_loading } = this.props;
        if (is_loading) return null;

        return (
            <View style={schoolstyle.emptyContainer}>
                <Icon name="school-outline" size={64} color="#A0AEC0" />
                <Text style={[schoolstyle.emptyText, styles.textBold]}>
                    Aucune école disponible
                </Text>
                <Text style={[schoolstyle.emptySubtext, styles.text]}>
                    Les établissements scolaires ne sont pas encore disponibles.{'\n'}
                    Veuillez réessayer ultérieurement.
                </Text>
            </View>
        );
    };

    render() {
        const sortedFilteredSchools = this.filterAndSortSchools();
        const { search } = this.state;
        const { is_loading } = this.props;
        return (
            <View style={schoolstyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={schoolstyle.section}>
                        <View style={styles.section}>
                            <View style={styles.back}>
                                <TouchableOpacity onPress={this._NavigateToHome}>
                                    <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.sectionTitle, styles.textBold]}>Liste des établissements</Text>
                        </View>
                    </View>

                    <View style={schoolstyle.searchContainer}>
                        <TextInput
                            style={[schoolstyle.searchInput, styles.text]}
                            placeholder="Recherche par nom, about ou adresse..."
                            placeholderTextColor="#999"
                            value={search}
                            onChangeText={(text) => this.setState({ search: text })}
                        />
                        <Image
                            source={require('../../../assets/images/search.png')}
                            style={schoolstyle.icon}
                            resizeMode="contain"
                        />
                    </View>

                    {!is_loading && (
                        <Text style={[schoolstyle.resultCount, styles.text]}>
                            {sortedFilteredSchools.length} école{sortedFilteredSchools.length !== 1 ? 's' : ''} trouvée{sortedFilteredSchools.length !== 1 ? 's' : ''}
                        </Text>
                    )}

                    <FlatList
                        data={sortedFilteredSchools}
                        renderItem={({ item }) => this.renderSchoolItem(item)}
                        keyExtractor={(item, index) => item.id?.toString() || `school-${index}`}
                        style={schoolstyle.list}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={this.renderEmptyList}
                        ListFooterComponent={this.renderFooter}
                        contentContainerStyle={
                            sortedFilteredSchools.length === 0 && !is_loading
                                ? { flex: 1, justifyContent: 'center' }
                                : { paddingBottom: 30 }
                        }
                        initialNumToRender={8}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                    />

                    <View style={{ height: 30 }} />
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchRegister1Action,
            switchSchoolDetailsParentAction,
            setSelectedSchoolAction,
            switchHomeParentAction
        }, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        is_loading          : state.loader.is_loading,
        root_navigation     : state.navigation.root_navigation,
        school_infos        : state.auth.school_infos

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolSelection);