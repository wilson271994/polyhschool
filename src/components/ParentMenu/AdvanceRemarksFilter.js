import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { advancefilterstyle } from '../../assets/styles/advancefilter';
import { styles } from '../../assets/styles';
import { switchStudentRemarksAction } from '../../navigations/rootNavigation';


class AdvancedRemarksFilter extends PureComponent {
    state = {
        searchText: '',
        selectedSubject: 'Toutes',
        selectedType: 'Tous',
        allRemarks: [], 
    };

    componentDidMount() {
        const { allRemarks } = this.props.route?.params || {};
        if (allRemarks) {
            this.setState({ allRemarks });
        }
    }

    getFilteredRemarks = () => {
        const { allRemarks, searchText, selectedSubject, selectedType } = this.state;
        let filtered = allRemarks;

        if (searchText.trim()) {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchLower) ||
                item.comment.toLowerCase().includes(searchLower)
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
        return ['Toutes', ...new Set(allRemarks.map(r => r.subject))];
    };

    selectSubject = (subject) => this.setState({ selectedSubject: subject });
    selectType = (type) => this.setState({ selectedType: type });

    clearSearch = () => this.setState({ searchText: '' });

        _navigateToMenu = () => {
        switchStudentRemarksAction(true);
    };
    renderRemark = ({ item }) => {
        const isPositive = item.type === "positive";

        return (
            <View style={advancefilterstyle.remarkCard}>
                <View style={advancefilterstyle.remarkHeader}>
                    <View style={[advancefilterstyle.subjectIcon, { backgroundColor: item.color + '15' }]}>
                        <Icon name={item.icon} size={28} color={item.color} />
                    </View>
                    <View style={advancefilterstyle.subjectInfo}>
                        <Text style={[advancefilterstyle.subjectName, styles.textBold]}>{item.subject}</Text>
                        <Text style={[advancefilterstyle.teacherName, styles.text]}>Prof. {item.teacher}</Text>
                    </View>
                    <Text style={[advancefilterstyle.date, styles.text]}>{item.displayDate}</Text>
                </View>

                <Text style={[advancefilterstyle.remarkTitle, styles.textBold]}>{item.title}</Text>
                <Text style={[advancefilterstyle.remarkComment, styles.text]}>{item.comment}</Text>

                <View style={advancefilterstyle.footerRow}>
                    <View style={advancefilterstyle.ratingContainer}>
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                key={i}
                                name={i < item.rating ? "star" : "star-outline"}
                                size={18}
                                color={isPositive ? "#FFC107" : "#9E9E9E"}
                            />
                        ))}
                    </View>
                    <View style={[advancefilterstyle.typeBadge, isPositive ? advancefilterstyle.positiveBadge : advancefilterstyle.warningBadge]}>
                        <Text style={isPositive ? advancefilterstyle.positiveText : advancefilterstyle.warningText}>
                            {isPositive ? "Positif" : "À améliorer"}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { searchText, selectedSubject, selectedType } = this.state;
        const filteredRemarks = this.getFilteredRemarks();
        const resultsCount = filteredRemarks.length;

        return (
            <SafeAreaView style={advancefilterstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >

                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Recherche avancée</Text>

                    </View>

                    <View style={advancefilterstyle.searchContainer}>
                        <Icon name="magnify" size={24} color="#1B497D" />
                        <TextInput
                            style={[advancefilterstyle.searchInput, styles.text]}
                            placeholder="Saisir le mot clé....."
                            value={searchText}
                            onChangeText={(text) => this.setState({ searchText: text })}
                            autoFocus
                            placeholderTextColor="#999"
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={this.clearSearch}>
                                <Icon name="close-circle" size={24} color="#888" style={advancefilterstyle.close} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={advancefilterstyle.filterSection}>
                        <Text style={[advancefilterstyle.filterTitle, styles.textBold]}>Filtrer par matière</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={advancefilterstyle.chipScroll}>
                            {this.getUniqueSubjects().map((subject) => (
                                <TouchableOpacity
                                    key={subject}
                                    style={[
                                        advancefilterstyle.smallChip,
                                        selectedSubject === subject && advancefilterstyle.smallChipActive,
                                    ]}
                                    onPress={() => this.selectSubject(subject)}
                                >
                                    <Icon
                                        name={subject === 'Toutes' ? 'view-grid' : 'book-outline'}
                                        size={18}
                                        color={selectedSubject === subject ? '#fff' : '#666'}
                                    />
                                    <Text style={[
                                        advancefilterstyle.smallChipText, styles.textBold,
                                        selectedSubject === subject && advancefilterstyle.smallChipTextActive
                                    ]}>
                                        {subject}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={[advancefilterstyle.filterTitle, styles.text]}>Filtrer par type</Text>
                        <View style={advancefilterstyle.typeChipRow}>
                            {[
                                { label: 'Tous', value: 'Tous', icon: 'filter-variant' },
                                { label: 'Positif', value: 'positive', icon: 'thumb-up' },
                                { label: 'À améliorer', value: 'warning', icon: 'alert-circle' },
                            ].map((type) => (
                                <TouchableOpacity
                                    key={type.value}
                                    style={[
                                        advancefilterstyle.smallChip,
                                        selectedType === type.value && advancefilterstyle.smallChipActive,
                                    ]}
                                    onPress={() => this.selectType(type.value)}
                                >
                                    <Icon
                                        name={type.icon}
                                        size={18}
                                        color={selectedType === type.value ? '#fff' : '#666'}
                                    />
                                    <Text style={[
                                        advancefilterstyle.smallChipText, styles.text,
                                        selectedType === type.value && advancefilterstyle.smallChipTextActive
                                    ]}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={advancefilterstyle.resultsCountContainer}>
                        <Text style={[advancefilterstyle.resultsCount, styles.textBold]}>
                            {resultsCount} résultat{resultsCount > 1 ? 's' : ''} trouvé{resultsCount > 1 ? 's' : ''}
                        </Text>
                    </View>

                    <FlatList
                        data={filteredRemarks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this.renderRemark}
                        contentContainerStyle={advancefilterstyle.listContent}
                        ListEmptyComponent={
                            <Text style={[advancefilterstyle.emptyText, styles.text]}>
                                Aucune remarque ne correspond à votre recherche
                            </Text>
                        }
                    />

                </ImageBackground>
            </SafeAreaView>
        );
    }
}




const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchStudentRemarksAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedRemarksFilter);