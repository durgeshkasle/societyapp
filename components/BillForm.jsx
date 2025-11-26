import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from './InputField';
import DropdownField from './DropdownField';
import MonthYearPicker from './MonthYearPicker';
import TotalDisplay from './TotalDisplay';
import ActionButtons from './ActionButtons';
import { residents } from '../data/residents';

const BillForm = ({
  flatNumber,
  setFlatNumber,
  residentName,
  setResidentName,
  billNumber,
  setBillNumber,
  billingMonth,
  setBillingMonth,
  currentAmount,
  setCurrentAmount,
  outstandingAmount,
  setOutstandingAmount,
  totalAmount,
  onGenerateBill,
  onClearForm,
  onFlatNumberChange,
}) => {
  // Prepare dropdown items for flat numbers
  const flatNumberItems = residents.map((resident) => ({
    label: `${resident.flatNumber} - ${resident.name}`,
    value: resident.flatNumber,
  }));

  return (
    <View style={styles.formContainer}>
      <DropdownField
        label="Flat Number"
        value={flatNumber}
        onValueChange={onFlatNumberChange}
        items={flatNumberItems}
        placeholder="Select Flat Number"
        required
      />

      <InputField
        label="Resident Name"
        value={residentName}
        onChangeText={setResidentName}
        placeholder="Resident Name (Auto-filled)"
        required
        editable={false}
      />

      <InputField
        label="Bill Number"
        value={billNumber}
        onChangeText={setBillNumber}
        placeholder="Enter Bill Number"
        required
      />

      <MonthYearPicker
        label="Billing Month"
        value={billingMonth}
        onValueChange={setBillingMonth}
        required
      />

      <InputField
        label="Current Amount (₹)"
        value={currentAmount}
        onChangeText={setCurrentAmount}
        placeholder="Enter Current Amount"
        keyboardType="numeric"
        required
      />

      <InputField
        label="Outstanding Amount (₹)"
        value={outstandingAmount}
        onChangeText={setOutstandingAmount}
        placeholder="Enter Outstanding Amount"
        keyboardType="numeric"
      />

      <TotalDisplay total={totalAmount} />

      <ActionButtons
        onGenerateBill={onGenerateBill}
        onClearForm={onClearForm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
});

export default BillForm;

