import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const InputField = ({ label, value, onChangeText, placeholder, keyboardType, required, editable = true }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      <TextInput
        style={[styles.input, !editable && styles.inputDisabled]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
        placeholderTextColor="#95a5a6"
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputDisabled: {
    backgroundColor: '#f5f6fa',
    color: '#7f8c8d',
  },
});

export default InputField;

