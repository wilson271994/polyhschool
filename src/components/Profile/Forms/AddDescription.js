import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { descriptionstyle } from '../../../assets/styles/description';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground, Image, Keyboard, Animated } from 'react-native';
import { styles } from '../../../assets/styles';
import { switchProfilPageAction } from '../../../navigations/rootNavigation';

class AddDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            maxLength: 180,
            keyboardHeight: 0,
            isKeyboardVisible: false,
            bottomMargin: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            this._keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            this._keyboardDidHide
        );
    }

    componentWillUnmount() {
        if (this.keyboardDidShowListener) {
            this.keyboardDidShowListener.remove();
        }
        if (this.keyboardDidHideListener) {
            this.keyboardDidHideListener.remove();
        }
    }

    _keyboardDidShow = (event) => {
        const keyboardHeight = event.endCoordinates.height;
        this.setState({
            keyboardHeight: keyboardHeight,
            isKeyboardVisible: true,
        });

        // Animation pour faire remonter le bouton
        Animated.timing(this.state.bottomMargin, {
            toValue: keyboardHeight,
            duration: Platform.OS === 'ios' ? event.duration : 250,
            useNativeDriver: false,
        }).start();
    };

    _keyboardDidHide = (event) => {
        this.setState({
            keyboardHeight: 0,
            isKeyboardVisible: false,
        });

        // Animation pour redescendre le bouton
        Animated.timing(this.state.bottomMargin, {
            toValue: 0,
            duration: Platform.OS === 'ios' ? event.duration : 250,
            useNativeDriver: false,
        }).start();
    };

    handleSave = () => {
        const { description } = this.state;
        if (description.trim().length === 0) return;

        console.log('Bio sauvegardée:', description);
        Keyboard.dismiss();
        if (this.props.navigation) {
            this.props.navigation.goBack();
        }
    };

    handleCancel = () => {
        Keyboard.dismiss();
        if (this.props.navigation) {
            this.props.navigation.goBack();
        }
    };

    _navigateToProfil = () => {
        switchProfilPageAction(true);
    }

    render() {
        const { description, maxLength, isKeyboardVisible, bottomMargin } = this.state;
        const charactersLeft = maxLength - description.length;
        const hasDescription = description.trim().length > 0;

        return (
            <SafeAreaView style={descriptionstyle.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.jpg')}
                    style={styles.backgroundapp}
                    resizeMode="cover"
                >
                    <View style={descriptionstyle.mainContainer}>

                        <View style={descriptionstyle.section}>
                            <View style={styles.section}>
                                <View style={styles.back}>
                                    <TouchableOpacity onPress={this._navigateToProfil}>
                                        <Image style={styles.backstyle} source={require('../../../assets/images/back.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.sectionTitle, styles.textBold,]}>Ajouter une description</Text>
                            </View>
                        </View>


                        <View style={descriptionstyle.content}>

                            <View style={descriptionstyle.titleRow}>
                                <Text style={[descriptionstyle.titleText, styles.textBold]}>Décris-toi</Text>
                                <Text style={[
                                    descriptionstyle.characterCount, styles.textBold,
                                    charactersLeft <= 30 && descriptionstyle.characterCountWarning,
                                    charactersLeft <= 10 && descriptionstyle.characterCountLimit
                                ]}>
                                    {description.length} / {maxLength}
                                </Text>
                            </View>


                            <View style={descriptionstyle.inputWrapper}>
                                <TextInput
                                    style={[descriptionstyle.textInput, styles.text]}
                                    multiline
                                    placeholder="Décris toi brièvement."
                                    placeholderTextColor="#9E9E9E"
                                    value={description}
                                    onChangeText={(text) => this.setState({ description: text })}
                                    maxLength={maxLength}
                                    textAlignVertical="top"
                                    autoFocus={true}
                                    returnKeyType="default"
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1 }} />

                        <Animated.View style={[
                            descriptionstyle.bottomSaveContainer,
                            { marginBottom: bottomMargin }
                        ]}>
                            <TouchableOpacity
                                onPress={hasDescription ? this.handleSave : null}
                                style={[
                                    descriptionstyle.saveButtonFull,
                                    hasDescription ? descriptionstyle.saveButtonActive : descriptionstyle.saveButtonInactive
                                ]}
                                disabled={!hasDescription}
                                activeOpacity={hasDescription ? 0.8 : 1}
                            >
                                <Text style={[
                                    descriptionstyle.saveButtonFullText, styles.textBold,
                                    hasDescription ? descriptionstyle.saveButtonTextActive : descriptionstyle.saveButtonTextInactive
                                ]}>
                                    Enregistrer
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        switchProfilPageAction
    }, dispatch),
});

const mapStateToProps = (state) => ({
    user_infos: state.auth.user_infos,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDescription);