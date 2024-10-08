import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoanCalculator() {
  const navigation = useNavigation();
  const [loanValue, setLoanValue] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [installments, setInstallments] = useState('');

  const handleCalculate = () => {
    const P = parseFloat(loanValue);  // Loan amount (Principal)
    const r = parseFloat(interestRate) / 100;  // Monthly interest rate (as a percentage)
    const n = parseInt(installments);  // Number of installments

    if (!P || !r || !n) return;

    // Monthly payment formula (using annuity formula)
    const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));

    // Calculate payment schedule
    const paymentSchedule = [];
    let outstandingBalance = P;

    for (let i = 1; i <= n; i++) {
      const interestPayment = outstandingBalance * r;
      const principalPayment = monthlyPayment - interestPayment;
      outstandingBalance -= principalPayment;

      paymentSchedule.push({
        month: i,
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        totalPayment: monthlyPayment.toFixed(2),
        outstandingBalance: outstandingBalance.toFixed(2),
      });
    }

    // Navigate to ResultsScreen and pass the calculated schedule
    navigation.navigate('Result', { paymentSchedule });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Loan Amount"
        value={loanValue}
        onChangeText={setLoanValue}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Number of Installments"
        value={installments}
        onChangeText={setInstallments}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Calculate" onPress={handleCalculate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
