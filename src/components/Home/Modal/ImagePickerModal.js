
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';

export const ImagePickerModal = ({ visible, target, onAction, onClose }) => {
    if (!visible) return null;
    const isProfile = target === 'profile';

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={homestyle.pickerOverlay}>
                <TouchableOpacity style={homestyle.pickerBackdrop} activeOpacity={1} onPress={onClose} />
                <View style={homestyle.pickerSheet}>
                    <View style={homestyle.pickerHandle} />

                    <View style={homestyle.pickerHeader}>
                        <View style={[homestyle.pickerIconCircle, { backgroundColor: 'rgba(255, 179, 0, 0.15)' }]}>
                            <Icon name={isProfile ? 'account-circle-outline' : 'image-filter-hdr'} size={24} color={COLORS.accentGold} />
                        </View>
                        <Text style={homestyle.pickerTitle}>{isProfile ? 'Photo de profil' : 'Photo de couverture'}</Text>
                        <Text style={homestyle.pickerSubtitle}>Choisissez une option pour mettre à jour la photo</Text>
                    </View>

                    <View style={homestyle.pickerOptionsContainer}>
                        <TouchableOpacity style={homestyle.pickerOption} onPress={() => onAction('camera')} activeOpacity={0.7}>
                            <View style={[homestyle.pickerOptionIcon, { backgroundColor: 'rgba(54, 209, 220, 0.15)' }]}>
                                <Icon name="camera-outline" size={20} color={COLORS.accentCyan} />
                            </View>
                            <View style={homestyle.pickerOptionText}>
                                <Text style={homestyle.pickerOptionTitle}>Appareil photo</Text>
                                <Text style={homestyle.pickerOptionDesc}>Prendre une nouvelle photo</Text>
                            </View>
                            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
                        </TouchableOpacity>

                        <View style={homestyle.pickerSeparator} />

                        <TouchableOpacity style={homestyle.pickerOption} onPress={() => onAction('gallery')} activeOpacity={0.7}>
                            <View style={[homestyle.pickerOptionIcon, { backgroundColor: 'rgba(255, 179, 0, 0.15)' }]}>
                                <Icon name="image-multiple-outline" size={20} color={COLORS.accentGold} />
                            </View>
                            <View style={homestyle.pickerOptionText}>
                                <Text style={homestyle.pickerOptionTitle}>Galerie de photos</Text>
                                <Text style={homestyle.pickerOptionDesc}>Choisir une image existante</Text>
                            </View>
                            <Icon name="chevron-right" size={18} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={homestyle.pickerCancelButton} onPress={onClose} activeOpacity={0.7}>
                        <Text style={homestyle.pickerCancelText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};