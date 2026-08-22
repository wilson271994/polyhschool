import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Platform, SafeAreaView, Button, ActivityIndicator, ImageBackground, FlatList, ScrollView, Linking, TouchableHighlight, Slider } from 'react-native';
import { homestyle } from '../../assets/styles/home.js';
import Moment from 'moment';
import 'moment/locale/fr';
import { store } from '../../reducers/store.js';
import { IS_AUTH_ERROR, PAGE_TITLE, ROOT_NAVIGATION } from '../../reducers/actions/types.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { switchHeaderAction } from '../../reducers/actions/index.js';
import { styles } from '../../assets/styles/index.js';
import { detailstyle } from '../../assets/styles/details.js';
import {  switchCourseHistoryPageAction } from '../../navigations/rootNavigation.js';

class CourseDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            progress: 30, // Pourcentage de progression du cours
        };
    }

    _navigateToHistory = () => {
        switchCourseHistoryPageAction(true)
    }

    renderStars(rating) {
        const totalStars = 5;
        const filledStars = Math.floor(rating);
        const hasHalfStar = rating - filledStars >= 0.5;
        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push('★');
        }
        if (hasHalfStar) {
            stars.push('½');
        }
        while (stars.length < totalStars) {
            stars.push('☆');
        }
        return stars.map((star, index) => (
            <Text key={index} style={detailstyle.star}>
                {star}
            </Text>
        ));
    }

    render() {
        const { progress } = this.state;
        const hoursCovered = (90 * progress) / 100;
        const hoursRemaining = 90 - hoursCovered;

        return (
            <View style={detailstyle.container}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={this._navigateToHistory}>
                                <Image style={styles.backstyle} source={require('../../assets/images/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.sectionTitle, styles.textBold]}>Energie cinetique</Text>
                    </View>

                    <View style={detailstyle.Container}>

                        <View style={detailstyle.courseCard}>

                            <Image
                                source={require('../../assets/images/layer.png')}
                                style={detailstyle.courseImage}
                            />
                            <View style={detailstyle.courseDetails}>
                                <Text style={[detailstyle.courseTitle, styles.textBold]}>Comprendre l'Energie Cinetique</Text>
                                <Text style={[detailstyle.courseDescription, styles.text]}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Text>
                                <View style={detailstyle.courseRating}>
                                    <Text style={[detailstyle.hoursText, styles.textBold]}>90 heures</Text>
                                    <View style={detailstyle.starsContainer}>
                                        {this.renderStars(4.3)}
                                    </View>
                                    <Text style={[detailstyle.hoursText, styles.textBold]}>4.3</Text>
                                </View>
                            </View>
                        </View>

                        <View style={detailstyle.teacherSection}>
                            <Text style={[detailstyle.teacherTitle, styles.textBold]}>cours donnés par</Text>
                            <View style={detailstyle.teacherCard}>
                                <Image
                                    source={require('../../assets/images/group.png')}
                                    style={detailstyle.teacherImage}
                                />
                                <View style={detailstyle.teacherInfo}>
                                    <Text style={[detailstyle.teacherName, styles.textBold]}>Mr. Timba</Text>
                                    <Text style={[detailstyle.teacherExperience, styles.text]}>3 ans d'expérience</Text>
                                </View>
                                <View style={detailstyle.starsContainer}>
                                    {this.renderStars(2)}
                                </View>
                            </View>
                        </View>

                        <View style={detailstyle.statsSection}>
                            <View style={detailstyle.progressBoxes}>
                                <View style={[detailstyle.progressBox, detailstyle.coveredBox]}>
                                    <Text style={[detailstyle.progressLabel, styles.text]}>Couvert</Text>
                                    <Text style={[detailstyle.progressValue, styles.textBold]}>{progress}%</Text>
                                </View>
                                <View style={[detailstyle.progressBox, detailstyle.uncoveredBox]}>
                                    <Text style={[detailstyle.progressLabel, styles.text]}>Non couvert</Text>
                                    <Text style={[detailstyle.progressValue, styles.textBold]}>{100 - progress}%</Text>
                                </View>
                            </View>

                            <View style={detailstyle.progressBar}>
                                <View style={[detailstyle.progressBarFill, { width: `${progress}%` }]} />
                            </View>

                            <View style={detailstyle.progressHours}>
                                <Text style={[detailstyle.hoursLabel, styles.text]}>Temps couvert:</Text>
                                <Text style={[detailstyle.hoursValue, styles.textBold]}>{hoursCovered} heures</Text>
                            </View>
                            <View style={detailstyle.progressHours}>
                                <Text style={[detailstyle.hoursLabel, styles.text]}>Temps restant:</Text>
                                <Text style={[detailstyle.hoursValue, styles.textBold]}>{hoursRemaining} heures</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            switchHeaderAction,
            switchCourseHistoryPageAction
        }, dispatch),
    }
};

const mapStateToProps = (state) => {
    return {
        user_infos: state.auth.user_infos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CourseDetails);