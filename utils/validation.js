import { Alert } from 'react-native';

export const validateInputs = (flatNumber, residentName, billNumber, billingMonth, currentAmount) => {
  if (!flatNumber.trim()) {
    Alert.alert('Validation Error', 'Please select Flat Number');
    return false;
  }
  if (!residentName.trim()) {
    Alert.alert('Validation Error', 'Please select a flat to get Resident Name');
    return false;
  }
  if (!billNumber.trim()) {
    Alert.alert('Validation Error', 'Please enter Bill Number');
    return false;
  }
  if (!billingMonth.trim()) {
    Alert.alert('Validation Error', 'Please select Billing Month and Year');
    return false;
  }
  if (!currentAmount || parseFloat(currentAmount) < 0) {
    Alert.alert('Validation Error', 'Please enter a valid Current Amount');
    return false;
  }
  return true;
};

