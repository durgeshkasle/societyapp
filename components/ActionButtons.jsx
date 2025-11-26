import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ActionButtons = ({ onGenerateBill, onClearForm }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={onGenerateBill}
        activeOpacity={0.8}
      >
        <Text style={styles.generateButtonText}>Generate Bill</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={onClearForm}
        activeOpacity={0.8}
      >
        <Text style={styles.clearButtonText}>Clear Form</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  generateButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  clearButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ActionButtons;

