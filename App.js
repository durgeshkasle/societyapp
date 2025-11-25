import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [flatNumber, setFlatNumber] = useState('');
  const [residentName, setResidentName] = useState('');
  const [billingMonth, setBillingMonth] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [outstandingAmount, setOutstandingAmount] = useState('0');

  // Calculate total payable amount
  const calculateTotal = () => {
    const current = parseFloat(currentAmount) || 0;
    const outstanding = parseFloat(outstandingAmount) || 0;
    return current + outstanding;
  };

  // Generate HTML template for PDF
  const generateHTMLTemplate = () => {
    const totalPayable = calculateTotal();
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Arial', 'Helvetica', sans-serif;
              padding: 40px;
              background: #ffffff;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #2c3e50;
              padding-bottom: 20px;
            }
            .society-name {
              font-size: 32px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 10px;
              letter-spacing: 1px;
            }
            .invoice-title {
              font-size: 20px;
              color: #34495e;
              font-weight: 600;
              margin-top: 8px;
            }
            .invoice-date {
              font-size: 12px;
              color: #7f8c8d;
              margin-top: 10px;
            }
            .details-section {
              margin: 30px 0;
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #2c3e50;
              font-size: 14px;
            }
            .detail-value {
              color: #34495e;
              font-size: 14px;
            }
            .charges-table {
              width: 100%;
              margin: 30px 0;
              border-collapse: collapse;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .charges-table th {
              background: #34495e;
              color: white;
              padding: 15px;
              text-align: left;
              font-size: 14px;
              font-weight: 600;
            }
            .charges-table td {
              padding: 12px 15px;
              border-bottom: 1px solid #e0e0e0;
              font-size: 14px;
              color: #2c3e50;
            }
            .charges-table tr:last-child td {
              border-bottom: none;
            }
            .charges-table tr:nth-child(even) {
              background: #f8f9fa;
            }
            .total-section {
              margin: 30px 0;
              background: #e8f5e9;
              padding: 20px;
              border-radius: 8px;
              border: 2px solid #27ae60;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .total-label {
              font-size: 18px;
              font-weight: bold;
              color: #27ae60;
            }
            .total-amount {
              font-size: 24px;
              font-weight: bold;
              color: #27ae60;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #2c3e50;
            }
            .footer-text {
              font-size: 14px;
              color: #7f8c8d;
              font-style: italic;
            }
            .footer-note {
              margin-top: 15px;
              font-size: 12px;
              color: #95a5a6;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="society-name">B-18 SAI DHAM SOCIETY</div>
            <div class="invoice-title">Maintenance Invoice</div>
            <div class="invoice-date">Date: ${currentDate}</div>
          </div>

          <div class="details-section">
            <div class="detail-row">
              <span class="detail-label">Flat Number:</span>
              <span class="detail-value">${flatNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Resident Name:</span>
              <span class="detail-value">${residentName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Billing Month:</span>
              <span class="detail-value">${billingMonth}</span>
            </div>
          </div>

          <table class="charges-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: right;">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Current Month Charges</td>
                <td style="text-align: right;">₹ ${parseFloat(currentAmount || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Previous Outstanding Dues</td>
                <td style="text-align: right;">₹ ${parseFloat(outstandingAmount || 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row">
              <span class="total-label">TOTAL PAYABLE AMOUNT:</span>
              <span class="total-amount">₹ ${totalPayable.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">Thank you - B-18 Sai Dham Society Committee</div>
            <div class="footer-note">Please make payment on or before the due date</div>
          </div>
        </body>
      </html>
    `;
  };

  // Validate inputs
  const validateInputs = () => {
    if (!flatNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter Flat Number');
      return false;
    }
    if (!residentName.trim()) {
      Alert.alert('Validation Error', 'Please enter Resident Name');
      return false;
    }
    if (!billingMonth.trim()) {
      Alert.alert('Validation Error', 'Please enter Billing Month');
      return false;
    }
    if (!currentAmount || parseFloat(currentAmount) < 0) {
      Alert.alert('Validation Error', 'Please enter a valid Current Amount');
      return false;
    }
    return true;
  };

  // Generate and share PDF
  const generateBill = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      // Generate PDF
      const html = generateHTMLTemplate();
      const { uri } = await Print.printToFileAsync({ html });
      
      console.log('PDF generated at:', uri);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        // Share the PDF
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Invoice',
          UTI: 'com.adobe.pdf'
        });
        
        Alert.alert(
          'Success',
          'Invoice generated successfully!',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Notice',
          'Sharing is not available on this device, but PDF was created successfully.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error generating bill:', error);
      Alert.alert(
        'Error',
        'Failed to generate invoice. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Clear all fields
  const clearForm = () => {
    setFlatNumber('');
    setResidentName('');
    setBillingMonth('');
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>B-18 Sai Dham Society</Text>
          <Text style={styles.headerSubtitle}>Maintenance App</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flat Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Flat Number"
              value={flatNumber}
              onChangeText={setFlatNumber}
              placeholderTextColor="#95a5a6"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Resident Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Resident Name"
              value={residentName}
              onChangeText={setResidentName}
              placeholderTextColor="#95a5a6"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Billing Month *</Text>
            <TextInput
              style={styles.input}
                placeholder="Enter Billing Month"
              value={billingMonth}
              onChangeText={setBillingMonth}
              placeholderTextColor="#95a5a6"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Amount (₹) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Current Amount"
              value={currentAmount}
              onChangeText={setCurrentAmount}
              keyboardType="numeric"
              placeholderTextColor="#95a5a6"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Outstanding Amount (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Outstanding Amount"
              value={outstandingAmount}
              onChangeText={setOutstandingAmount}
              keyboardType="numeric"
              placeholderTextColor="#95a5a6"
            />
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Payable:</Text>
            <Text style={styles.totalAmount}>₹ {calculateTotal().toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateBill}
            activeOpacity={0.8}
          >
            <Text style={styles.generateButtonText}>Generate Bill</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearForm}
            activeOpacity={0.8}
          >
            <Text style={styles.clearButtonText}>Clear Form</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    backgroundColor: '#2c3e50',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
  },
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
  totalContainer: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27ae60',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
  },
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

