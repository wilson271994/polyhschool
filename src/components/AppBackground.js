import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ou React Native Expo LinearGradient
import { COLORS, GRADIENTS } from '../assets/styles/theme';

export const AppBackground = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

            {/* Fond Dégradé Océan Profond */}
            <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFillObject} />

            {/* Halos Lumineux inspirés de la Terre & de l'Or Poly-H */}
            <View style={styles.goldGlow} pointerEvents="none" />
            <View style={styles.cyanGlow} pointerEvents="none" />

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
    },
    goldGlow: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'rgba(255, 179, 0, 0.12)',
    },
    cyanGlow: {
        position: 'absolute',
        bottom: -100,
        left: -80,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(54, 209, 220, 0.12)',
    },
});