import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

export default function ResultsScreen({ route }) {
  const { paymentSchedule } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Payment Schedule</Text>
      <ScrollView>
        {paymentSchedule.map((payment, index) => (
          <View key={index} style={styles.row}>
            <Text>Month: {payment.month}</Text>
            <Text>Interest Paid: {payment.interestPayment}</Text>
            <Text>Principal Paid: {payment.principalPayment}</Text>
            <Text>Total Payment: {payment.totalPayment}</Text>
            <Text>Remaining Balance: {payment.outstandingBalance}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    marginBottom: 20,
  },
});
