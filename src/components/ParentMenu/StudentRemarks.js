import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, Animated, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchAdvanceRemarkSearchAction, switchStudentMenuAction } from '../../navigations/rootNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { remarkstyle } from '../../assets/styles/studentremarks';
import { styles } from '../../assets/styles';

class StudentRemarks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            studentName: "Dumerile",
            scrollY: new Animated.Value(0),
            remarks: [
                {
                    id: 1, subject: "Mathématiques", teacher: "M. Dupont", date: "2026-03-18",
                    displayDate: "18 Mars 2026", type: "positive", icon: "trending-up",
                    color: "#4CAF50", title: "Excellent travail",
                    comment: "Jean fait preuve d'une très bonne compréhension des concepts algébriques. Il participe activement en classe.",
                    rating: 5,
                },
                {
                    id: 5, subject: "Anglais", teacher: "M. Bernard", date: "2026-03-08",
                    displayDate: "08 Mars 2026", type: "positive", icon: "thumb-up",
                    color: "#4CAF50", title: "Progrès remarquables",
                    comment: "Amélioration significative en expression orale.", rating: 4,
                },
            ],
            sortOrder: 'desc',
            selectedSubject: 'Toutes',
            selectedType: 'Tous',
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    getFilteredAndSortedRemarks = () => {
        const { remarks, sortOrder, selectedSubject, selectedType } = this.state;
        let filtered = remarks;

        if (selectedSubject !== 'Toutes') {
            filtered = filtered.filter(item => item.subject === selectedSubject);
        }
        if (selectedType !== 'Tous') {
            filtered = filtered.filter(item => item.type === selectedType);
        }

        return [...filtered].sort((a, b) =>
            sortOrder === 'desc'
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );
    };

    getResultsCount = () => this.getFilteredAndSortedRemarks().length;

    resetFilters = () => {
        this.setState({
            selectedSubject: 'Toutes',
            selectedType: 'Tous',
            sortOrder: 'desc',
        });
    };

    toggleSort = () => {
        this.setState(prev => ({ sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc' }));
    };

    selectType = (type) => this.setState({ selectedType: type });

    goToAdvancedSearch = () => {
        switchAdvanceRemarkSearchAction(true)
    };
    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };
    renderRemark = ({ item }) => {
        const isPositive = item.type === "positive";
        return (
            <View style={remarkstyle.remarkCard}>
                <View style={remarkstyle.remarkHeader}>
                    <View style={[remarkstyle.subjectIcon, { backgroundColor: item.color + '15' }]}>
                        <Icon name={item.icon} size={28} color={item.color} />
                    </View>
                    <View style={remarkstyle.subjectInfo}>
                        <Text style={[remarkstyle.subjectName, styles.text]}>{item.subject}</Text>
                        <Text style={[remarkstyle.teacherName, styles.text]}>Prof. {item.teacher}</Text>
                    </View>
                    <Text style={[remarkstyle.date, styles.text]}>{item.displayDate}</Text>
                </View>
                <Text style={[remarkstyle.remarkTitle, styles.text]}>{item.title}</Text>
                <Text style={[remarkstyle.remarkComment, styles.text]}>{item.comment}</Text>
                <View style={remarkstyle.footerRow}>
                    <View style={remarkstyle.ratingContainer}>
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                key={i}
                                name={i < item.rating ? "star" : "star-outline"}
                                size={18}
                                color={isPositive ? "#FFC107" : "#9E9E9E"}
                            />
                        ))}
                    </View>
                    <View style={[remarkstyle.typeBadge, isPositive ? remarkstyle.positiveBadge : remarkstyle.warningBadge]}>
                        <Text style={[isPositive ? remarkstyle.positiveText : remarkstyle.warningText, styles.textBold]}>
                            {isPositive ? "Positif" : "À améliorer"}
                        </Text>
                    </View>
                </View>
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
            <Animated.View style={[remarkstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={remarkstyle.headerSection}>
                        <View style={remarkstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={remarkstyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={remarkstyle.headertext}>
                            <Text style={[remarkstyle.headerTitle, styles.textBold]}>Remarques des Professeurs</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { selectedSubject, selectedType, sortOrder } = this.state;
        const filteredRemarks = this.getFilteredAndSortedRemarks();

        return (
            <SafeAreaView style={remarkstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={remarkstyle.container}
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
                            <Text style={[styles.sectionTitle, styles.textBold]}>Remarques des Professeurs</Text>

                        </View>

                        <TouchableOpacity
                            style={remarkstyle.searchContainer}
                            onPress={this.goToAdvancedSearch}
                            activeOpacity={0.8}
                        >
                            <Icon name="magnify" size={22} color="#888" />
                            <Text style={[remarkstyle.searchPlaceholder, styles.text]}>
                                Rechercher dans les remarques...
                            </Text>
                        </TouchableOpacity>

                        <View style={remarkstyle.statsRow}>
                            <View style={remarkstyle.statBox}>
                                <Text style={[remarkstyle.statNumber, styles.textBold]}>
                                    {this.state.remarks.filter(r => r.type === 'positive').length}
                                </Text>
                                <Text style={[remarkstyle.statLabel, styles.text]}>Positives</Text>
                            </View>
                            <View style={remarkstyle.statBox}>
                                <Text style={remarkstyle.statNumber}>
                                    {this.state.remarks.filter(r => r.type !== 'positive').length}
                                </Text>
                                <Text style={[remarkstyle.statLabel, styles.text]}>À améliorer</Text>
                            </View>
                        </View>

                        {/* Liste des remarques */}
                        <View style={remarkstyle.remarksSection}>
                            <FlatList
                                data={filteredRemarks}
                                keyExtractor={item => item.id.toString()}
                                renderItem={this.renderRemark}
                                scrollEnabled={false}
                                contentContainerStyle={remarkstyle.listContent}
                                ListEmptyComponent={<Text style={remarkstyle.emptyText}>Aucune remarque trouvée</Text>}
                            />
                        </View>

                        <Text style={[remarkstyle.footer, styles.text]}>
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </Text>
                        <View style={{ height: 30 }} />

                    </Animated.ScrollView>
                    {this.renderHeader()}
                </ImageBackground>
            </SafeAreaView>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchAdvanceRemarkSearchAction,
        switchStudentMenuAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentRemarks);