import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Animated, FlatList, Image, Dimensions, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { teacherstyle } from '../../assets/styles/teacherlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles';
import { switchStudentMenuAction, switchTeacherInfosAction } from '../../navigations/rootNavigation';

class TeachersList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

            scrollY: new Animated.Value(0),


            teachers: [
                {
                    id: 1,
                    name: "M. Dupont",
                    subject: "Mathématiques",
                    photo: require('../../assets/images/profil.png'),
                    email: "dupont@ecole.fr",
                },
                {
                    id: 2,
                    name: "Mme Leclerc",
                    subject: "Physique-Chimie",
                    photo: require('../../assets/images/profil.png'),
                    email: "leclerc@ecole.fr",
                },
                {
                    id: 3,
                    name: "Mme Martin",
                    subject: "Français & Latin",
                    photo: require('../../assets/images/profil.png'),
                    email: "martin@ecole.fr",
                },
                {
                    id: 4,
                    name: "M. Bernard",
                    subject: "Anglais",
                    photo: require('../../assets/images/profil.png'),
                    email: "bernard@ecole.fr",
                },
                {
                    id: 5,
                    name: "M. Legrand",
                    subject: "Histoire-Géographie",
                    photo: require('../../assets/images/profil.png'),
                    email: "legrand@ecole.fr",
                },
                {
                    id: 6,
                    name: "Mme Rousseau",
                    subject: "SVT (Sciences de la Vie et de la Terre)",
                    photo: require('../../assets/images/profil.png'),
                    email: "rousseau@ecole.fr",
                },
            ],
        };
        this.handleScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
        );
    }

    _navigateToMenu = () => {
        switchStudentMenuAction(true);
    };

    _navigateToTeacher = () => {
        switchTeacherInfosAction(true);
    };
    renderTeacher = ({ item }) => (
        <TouchableOpacity
            onPress={this._navigateToTeacher}
            style={teacherstyle.teacherCard} activeOpacity={0.85}>
            <View style={teacherstyle.photoWrapper}>
                <Image source={item.photo} style={teacherstyle.photo} />
            </View>

            <View style={teacherstyle.infoContainer}>
                <Text style={[teacherstyle.teacherName, styles.textBold]}>{item.name}</Text>
                <Text style={[teacherstyle.subject, styles.text]}>{item.subject}</Text>

                <View style={teacherstyle.emailRow}>
                    <Icon name="email" size={16} color="#6c5ce7" />
                    <Text style={[teacherstyle.email, styles.text]}>{item.email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    renderHeader = () => {
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[teacherstyle.header, { opacity: headerOpacity }]}>
                <View style={styles.section}>
                    <View style={teacherstyle.headerSection}>
                        <View style={teacherstyle.headerbuttonContainer}>
                            <TouchableOpacity
                                style={teacherstyle.headerButton}
                                onPress={this._navigateToMenu}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={teacherstyle.headertext}>
                            <Text style={[teacherstyle.headerTitle, styles.textBold]}>Liste des professeurs</Text>
                        </View>

                    </View>
                </View>
            </Animated.View>
        );
    };


    render() {
        const { teachers } = this.state;

        return (
            <SafeAreaView style={teacherstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <Animated.ScrollView
                        style={teacherstyle.container}
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
                            <Text style={[styles.sectionTitle, styles.textBold]}>Liste des professeurs</Text>
                        </View>

                        <View style={teacherstyle.section}>
                            <FlatList
                                data={teachers}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={this.renderTeacher}
                                scrollEnabled={false}
                                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                            />
                        </View>

                        <Text style={[teacherstyle.footer, styles.text]}>
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
        switchStudentMenuAction,
        switchTeacherInfosAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList);