import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TotalDisplay = ({ total }) => {
  return (
    <View style={styles.totalContainer}>
      <Text style={styles.totalLabel}>Total Payable:</Text>
      <Text style={styles.totalAmount}>₹ {total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TotalDisplay;

