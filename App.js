import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import Header from './components/Header';
import BillForm from './components/BillForm';
import { validateInputs } from './utils/validation';
import { generateHTMLTemplate } from './utils/pdfGenerator';
import { getResidentNameByFlatNumber } from './data/residents';
import { getCurrentMonthYear } from './utils/dateHelper';

export default function App() {
  const [flatNumber, setFlatNumber] = useState('');
  const [residentName, setResidentName] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [billingMonth, setBillingMonth] = useState(getCurrentMonthYear());
  const [currentAmount, setCurrentAmount] = useState('');
  const [outstandingAmount, setOutstandingAmount] = useState('0');

  // Handle flat number selection and auto-populate resident name
  const handleFlatNumberChange = (selectedFlatNumber) => {
    setFlatNumber(selectedFlatNumber);
    const name = getResidentNameByFlatNumber(selectedFlatNumber);
    setResidentName(name);
  };

  // Calculate total payable amount
  const calculateTotal = () => {
    const current = parseFloat(currentAmount) || 0;
    const outstanding = parseFloat(outstandingAmount) || 0;
    return current + outstanding;
  };

  // Generate and share PDF
  const generateBill = async () => {
    if (!validateInputs(flatNumber, residentName, billNumber, billingMonth, currentAmount)) {
      return;
    }

    try {
      const totalPayable = calculateTotal();
      const html = generateHTMLTemplate(
        flatNumber,
        residentName,
        billNumber,
        billingMonth,
        currentAmount,
        outstandingAmount,
        totalPayable
      );

      // Generate PDF
      const { uri } = await Print.printToFileAsync({ html });
      console.log('PDF generated at:', uri);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        // Share the PDF
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Invoice',
          UTI: 'com.adobe.pdf',
        });

        Alert.alert('Success', 'Invoice generated successfully!', [{ text: 'OK' }]);
      } else {
        Alert.alert(
          'Notice',
          'Sharing is not available on this device, but PDF was created successfully.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error generating bill:', error);
      Alert.alert('Error', 'Failed to generate invoice. Please try again.', [
        { text: 'OK' },
      ]);
    }
  };

  // Clear all fields
  const clearForm = () => {
    setFlatNumber('');
    setResidentName('');
    setBillNumber('');
    setBillingMonth(getCurrentMonthYear());
    setCurrentAmount('');
    setOutstandingAmount('0');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="B-18 Sai Dham Society" subtitle="Maintenance App" />

        <BillForm
          flatNumber={flatNumber}
          setFlatNumber={setFlatNumber}
          residentName={residentName}
          setResidentName={setResidentName}
          billNumber={billNumber}
          setBillNumber={setBillNumber}
          billingMonth={billingMonth}
          setBillingMonth={setBillingMonth}
          currentAmount={currentAmount}
          setCurrentAmount={setCurrentAmount}
          outstandingAmount={outstandingAmount}
          setOutstandingAmount={setOutstandingAmount}
          totalAmount={calculateTotal()}
          onGenerateBill={generateBill}
          onClearForm={clearForm}
          onFlatNumberChange={handleFlatNumberChange}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});
