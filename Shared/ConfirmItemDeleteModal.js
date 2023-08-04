import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ConfirmItemDeleteModal = ({ isVisible, onCancel, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#5177f5',
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ConfirmItemDeleteModal;
