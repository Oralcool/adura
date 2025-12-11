import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../constants/colors';

const SuggestStoryModal = ({ visible, onClose }) => {
  const [storyType, setStoryType] = useState('Bible Story');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Suggest a Story</Text>
          <View style={styles.storyTypeContainer}>
            <TouchableOpacity
              style={[
                styles.storyTypeButton,
                storyType === 'Bible Story' && styles.storyTypeButtonActive,
              ]}
              onPress={() => setStoryType('Bible Story')}
            >
              <Text style={styles.storyTypeButtonText}>Bible Story</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.storyTypeButton,
                storyType === 'Bedtime Story' && styles.storyTypeButtonActive,
              ]}
              onPress={() => setStoryType('Bedtime Story')}
            >
              <Text style={styles.storyTypeButtonText}>Bedtime Story</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email (Optional for feedback)"
            placeholderTextColor={COLORS.textSecondary}
          />
          <TextInput
            style={styles.input}
            placeholder="Story Title"
            placeholderTextColor={COLORS.textSecondary}
          />
          <TextInput
            style={[styles.input, styles.detailsInput]}
            placeholder="Story Details or Summary"
            placeholderTextColor={COLORS.textSecondary}
            multiline={true}
          />
          <TouchableOpacity style={styles.submitButton} onPress={onClose}>
            <Text style={styles.submitButtonText}>Submit Suggestion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: COLORS.secondaryBg,
    borderRadius: 12,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#36454F',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    marginBottom: 15,
    fontSize: 16,
  },
  detailsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  storyTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  storyTypeButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#36454F',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  storyTypeButtonActive: {
    backgroundColor: COLORS.primaryAccent,
    borderColor: COLORS.primaryAccent,
  },
  storyTypeButtonText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.primaryButtonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});

export default SuggestStoryModal;
