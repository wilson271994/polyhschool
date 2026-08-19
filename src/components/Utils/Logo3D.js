import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    PanResponder,
    StyleSheet,
    Platform
} from 'react-native';
import { styles } from '../../assets/styles/index.js';
import { sigupstyle } from '../../assets/styles/signup.js';

class Logo3D extends Component {
    constructor(props) {
        super(props);

        // Valeurs animées pour la rotation 3D (Axe X et Axe Y)
        this.pan = new Animated.ValueXY({ x: 0, y: 0 });

        // PanResponder pour capturer le mouvement du doigt
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                // Limite l'inclinaison 3D entre -30° et 30°
                const maxRotation = 30;
                const rotateY = Math.max(-maxRotation, Math.min(maxRotation, gestureState.dx / 3));
                const rotateX = Math.max(-maxRotation, Math.min(maxRotation, -gestureState.dy / 3));

                this.pan.setValue({ x: rotateY, y: rotateX });
            },
            onPanResponderRelease: () => {
                // Retour fluide à la position d'origine (effet ressort)
                Animated.spring(this.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    tension: 40,
                    useNativeDriver: true,
                }).start();
            },
        });
    }

    render() {
        const { title = "Inscription (Étape 3/3)", slogan = "Beyond imagination" } = this.props;

        // Interpolation pour la rotation Y (gauche / droite)
        const rotateY = this.pan.x.interpolate({
            inputRange: [-30, 30],
            outputRange: ['-30deg', '30deg'],
        });

        // Interpolation pour la rotation X (haut / bas)
        const rotateX = this.pan.y.interpolate({
            inputRange: [-30, 30],
            outputRange: ['-30deg', '30deg'],
        });

        // Intensité dynamique de l'ombre en fonction de l'inclinaison
        const shadowOpacity = this.pan.x.interpolate({
            inputRange: [-30, 0, 30],
            outputRange: [0.8, 0.4, 0.8],
        });

        return (
            <View style={sigupstyle.logoContainer}>
                {/* Zone réactive du Logo 3D */}
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[
                        localStyles.logo3DWrapper,
                        {
                            transform: [
                                { perspective: 1000 }, // Effet de profondeur 3D
                                { rotateX: rotateX },
                                { rotateY: rotateY },
                            ],
                        },
                    ]}
                >
                    {/* Halos lumineux d'arrière-plan créant la profondeur */}
                    <View style={localStyles.glowBacklight} />

                    {/* Logo principal */}
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={sigupstyle.logo}
                        resizeMode="contain"
                    />

                    {/* Ombre portée 3D au sol */}
                    <Animated.View
                        style={[
                            localStyles.logo3DShadow,
                            { opacity: shadowOpacity }
                        ]}
                    />
                </Animated.View>

                {/* Badges et Textes */}
                <Text style={[styles.textBold, sigupstyle.brandBadge]}>POLY-H SCHOOL</Text>
                <Text style={[styles.textBold, sigupstyle.title]}>{title}</Text>
                <Text style={[styles.text, sigupstyle.slogan]}>{slogan}</Text>
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    logo3DWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        position: 'relative',
    },
    glowBacklight: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f6a100',
        opacity: 0.25,
        transform: [{ scale: 1.3 }],
        ...Platform.select({
            ios: {
                shadowColor: '#f6a100',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 25,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    logo3DShadow: {
        position: 'absolute',
        bottom: -12,
        width: 70,
        height: 12,
        borderRadius: 35,
        backgroundColor: '#000000',
        transform: [{ scaleY: 0.3 }],
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
});

export default Logo3D;