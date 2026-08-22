import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, Animated, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground, Modal, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { progressstyle } from '../../assets/styles/studentprogress';
import { styles } from '../../assets/styles';
import { switchHomePageAction } from '../../navigations/rootNavigation';

const { width } = Dimensions.get('window');

class Student_Progress extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            averageGrade: "14.8",
            subjectsCount: "8",
            improvementRate: "+12%",
            rank: "3ème / 28",

            showHistoryModal: false,

            scrollY: new Animated.Value(0),
            subjects: [
                { id: 1, subject: "Mathématiques", grade: "15.5", teacher: "M. Dupont", trend: "up", lastUpdate: "Il y a 3 jours" },
                { id: 2, subject: "Physique", grade: "13.2", teacher: "Mme Leclerc", trend: "down", lastUpdate: "Il y a 1 semaine" },
                { id: 3, subject: "Français", grade: "16.8", teacher: "Mme Martin", trend: "up", lastUpdate: "Hier" },
                { id: 4, subject: "Anglais", grade: "14.0", teacher: "M. Bernard", trend: "stable", lastUpdate: "Il y a 5 jours" },
                { id: 5, subject: "Histoire-Géo", grade: "12.9", teacher: "M. Legrand", trend: "up", lastUpdate: "Il y a 2 jours" },
                { id: 6, subject: "SVT", grade: "15.0", teacher: "Mme Rousseau", trend: "up", lastUpdate: "Aujourd'hui" },
                { id: 7, subject: "Espagnol", grade: "13.8", teacher: "M. Garcia", trend: "down", lastUpdate: "Il y a 4 jours" },
                { id: 8, subject: "EPS", grade: "16.0", teacher: "M. Petit", trend: "stable", lastUpdate: "Il y a 10 jours" },
            ],

            sequenceNotes: [
                { id: 1, subject: "Mathématiques", seq1: "14.0", seq2: "15.5", current: "15.5", trend: "up" },
                { id: 2, subject: "Physique", seq1: "14.5", seq2: "13.8", current: "13.2", trend: "down" },
                { id: 3, subject: "Français", seq1: "15.0", seq2: "16.2", current: "16.8", trend: "up" },
                { id: 4, subject: "Anglais", seq1: "13.8", seq2: "14.0", current: "14.0", trend: "stable" },
                { id: 5, subject: "Histoire-Géo", seq1: "11.5", seq2: "12.9", current: "12.9", trend: "up" },
                { id: 6, subject: "SVT", seq1: "14.0", seq2: "14.8", current: "15.0", trend: "up" },
                { id: 7, subject: "Espagnol", seq1: "14.2", seq2: "13.8", current: "13.8", trend: "down" },
                { id: 8, subject: "EPS", seq1: "15.5", seq2: "16.0", current: "16.0", trend: "stable" },
            ],
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    renderTrendIcon = (trend, size = 20) => {
        if (trend === 'up') return <Icon name="trending-up" size={size} color="#4CAF50" />;
        if (trend === 'down') return <Icon name="trending-down" size={size} color="#e74c3c" />;
        return <Icon name="trending-neutral" size={size} color="#7f8c8d" />;
    };

    _navigateToMenu = () => {
        switchHomePageAction(true);
    };

    _openHistoryModal = () => this.setState({ showHistoryModal: true });
    _closeHistoryModal = () => this.setState({ showHistoryModal: false });

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[progressstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={progressstyle.headerSection}>
                        <View style={progressstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={progressstyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={progressstyle.headertext}>
                            <Text style={[progressstyle.headerTitle, styles.textBold]}>Suivi de progression</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    };

    render() {
        const { averageGrade, subjectsCount, improvementRate, rank, subjects, sequenceNotes, showHistoryModal } = this.state;

        return (
            <SafeAreaView style={progressstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >

                    <Animated.ScrollView
                        style={progressstyle.container}
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
                            <Text style={[styles.sectionTitle, styles.textBold]}>Suivi de progression</Text>
                        </View>


                        <View style={progressstyle.statsContainer}>

                            <View style={progressstyle.Card}>
                                <View style={progressstyle.statCard}>
                                    <Icon name="chart-bar" size={24} color="#6c5ce7" />
                                    <Text style={[progressstyle.statValue, styles.textBold]}>{averageGrade}</Text>
                                </View>
                                <Text style={[progressstyle.statLabel, styles.text]}>Moyenne générale</Text>
                            </View>


                            <View style={progressstyle.Card}>
                                <View style={progressstyle.statCard}>
                                    <Icon name="book-open-variant" size={24} color="#6c5ce7" />
                                    <Text style={[progressstyle.statValue, styles.textBold]}>{subjectsCount}</Text>
                                </View>
                                <Text style={[progressstyle.statLabel, styles.text]}>Matières suivies</Text>
                            </View>


                            <View style={progressstyle.Card}>
                                <View style={progressstyle.statCard}>
                                    <Icon name="trending-up" size={24} color="#4CAF50" />
                                    <Text style={[progressstyle.statValue, styles.textBold]}>{improvementRate}</Text>
                                </View>
                                <Text style={[progressstyle.statLabel, styles.text]}>Évolution</Text>
                            </View>


                            <View style={progressstyle.Card}>
                                <View style={progressstyle.statCard}>
                                    <Icon name="trophy" size={24} color="#f1c40f" />
                                    <Text style={[progressstyle.statValue, styles.textBold]}>{rank}</Text>
                                </View>
                                <Text style={[progressstyle.statLabel, styles.text]}>Classement</Text>
                            </View>

                        </View>

                        <TouchableOpacity
                            style={progressstyle.historyButton}
                            onPress={this._openHistoryModal}
                            activeOpacity={0.8}
                        >
                            <Icon name="history" size={20} color="#FFF" />
                            <Text style={[progressstyle.historyButtonText, styles.textBold]}>
                                Voir les notes des séquences précédentes
                            </Text>
                            <Icon name="chevron-right" size={20} color="#FFF" />
                        </TouchableOpacity>


                        <View style={progressstyle.tableContainer}>
                            <Text style={[progressstyle.tableTitle, styles.text]}>Détail par matière</Text>

                            <FlatList
                                data={subjects}
                                keyExtractor={item => item.id.toString()}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <View style={progressstyle.subjectRow}>
                                        <View style={progressstyle.subjectInfo}>
                                            <Text style={[progressstyle.subjectName, styles.text]}>{item.subject}</Text>
                                            <Text style={[progressstyle.teacherName, styles.text]}>Prof. {item.teacher}</Text>
                                        </View>

                                        <View style={progressstyle.gradeContainer}>
                                            <Text style={[progressstyle.grade, styles.text]}>{item.grade}</Text>
                                            {this.renderTrendIcon(item.trend)}
                                        </View>

                                        <Text style={[progressstyle.lastUpdate, styles.text]}>{item.lastUpdate}</Text>
                                    </View>
                                )}
                            />
                        </View>

                        <Text style={[progressstyle.footer, styles.text]}>
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </Text>
                        <View style={{ height: 20 }} />
                    </Animated.ScrollView>
                    {this.renderHeader()}

                    <Modal
                        visible={showHistoryModal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={this._closeHistoryModal}
                    >
                        <View style={progressstyle.modalOverlay}>
                            <View style={progressstyle.modalContent}>
                                <View style={progressstyle.modalHandle} />

                                <View style={progressstyle.modalHeader}>
                                    <Text style={[progressstyle.modalTitle, styles.textBold]}>
                                        Comparaison des séquences
                                    </Text>
                                    <TouchableOpacity onPress={this._closeHistoryModal} style={progressstyle.modalCloseButton}>
                                        <Icon name="close" size={24} color="#333" />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[progressstyle.modalSubtitle, styles.text]}>
                                    Évolution entre la 1ère et la 2ème séquence
                                </Text>

                                <View style={progressstyle.sequenceTableHeader}>
                                    <Text style={[progressstyle.sequenceHeaderCell, styles.textBold, { flex: 2 }]}>Matière</Text>
                                    <Text style={[progressstyle.sequenceHeaderCell, styles.textBold, { flex: 1 }]}>Seq 1</Text>
                                    <Text style={[progressstyle.sequenceHeaderCell, styles.textBold, { flex: 1 }]}>Seq 2</Text>
                                    <Text style={[progressstyle.sequenceHeaderCell, styles.textBold, { flex: 1 }]}>Actuel</Text>
                                    <Text style={[progressstyle.sequenceHeaderCell, styles.textBold, { flex: 0.7 }]}>Tendance</Text>
                                </View>

                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                >
                                    {sequenceNotes.map(item => (
                                        <View key={item.id} style={progressstyle.sequenceRow}>
                                            <Text style={[progressstyle.sequenceCell, styles.text, { flex: 2, fontWeight: '600' }]}>
                                                {item.subject}
                                            </Text>
                                            <Text style={[progressstyle.sequenceCell, styles.text, { flex: 1 }]}>
                                                {item.seq1}
                                            </Text>
                                            <Text style={[progressstyle.sequenceCell, styles.text, { flex: 1 }]}>
                                                {item.seq2}
                                            </Text>
                                            <Text style={[progressstyle.sequenceCell, styles.textBold, { flex: 1, color: '#1B497D' }]}>
                                                {item.current}
                                            </Text>
                                            <View style={{ flex: 0.7, alignItems: 'center' }}>
                                                {this.renderTrendIcon(item.trend, 16)}
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>

                                <TouchableOpacity
                                    style={progressstyle.modalCloseFullButton}
                                    onPress={this._closeHistoryModal}
                                >
                                    <Text style={[progressstyle.modalCloseFullButtonText, styles.textBold]}>
                                        Retour à la progression
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </ImageBackground>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Student_Progress);