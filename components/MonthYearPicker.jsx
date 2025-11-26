import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MonthYearPicker = ({ label, value, onValueChange, required }) => {
  // Generate months list
  const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];

  // Generate years list (from 2020 to 10 years ahead)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 2020; i <= currentYear + 10; i++) {
    years.push({ label: i.toString(), value: i.toString() });
  }

  // Parse current value
  const parseValue = (val) => {
    if (!val) return { month: '', year: '' };
    const parts = val.split(' ');
    return {
      month: parts[0] || '',
      year: parts[1] || '',
    };
  };

  const { month: selectedMonth, year: selectedYear } = parseValue(value);

  // Handle month change
  const handleMonthChange = (month) => {
    const newValue = month && selectedYear ? `${month} ${selectedYear}` : month || '';
    onValueChange(newValue);
  };

  // Handle year change
  const handleYearChange = (year) => {
    const newValue = selectedMonth && year ? `${selectedMonth} ${year}` : year || '';
    onValueChange(newValue);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={handleMonthChange}
            style={styles.picker}
            dropdownIconColor="#2c3e50"
          >
            <Picker.Item label="Select Month" value="" />
            {months.map((month) => (
              <Picker.Item
                key={month.value}
                label={month.label}
                value={month.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={handleYearChange}
            style={styles.picker}
            dropdownIconColor="#2c3e50"
          >
            <Picker.Item label="Select Year" value="" />
            {years.map((year) => (
              <Picker.Item
                key={year.value}
                label={year.label}
                value={year.value}
              />
            ))}
          </Picker>
        </View>
      </View>
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
  pickerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    height: 50,
    color: '#2c3e50',
  },
});

export default MonthYearPicker;

