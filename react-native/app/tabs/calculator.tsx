import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const LoanCalculator = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const P = parseFloat(data.loanValue);  // Loan amount (Principal)
    const r = parseFloat(data.interestRate) / 100;  // Monthly interest rate (as a percentage)
    const n = parseInt(data.installments);  // Number of installments

    if (!P || !r || !n) return;

    const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));

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
      <Controller
        name="loanValue"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Valor do empréstimo"
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="numeric"
            returnKeyType="next"
          />
        )}
      />
      <Controller
        name="interestRate"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Taxa de juros mensal (%)"
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="numeric"
            returnKeyType="next"
          />
        )}
      />
      <Controller
        name="installments"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Número de Parcelas"
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="numeric"
            returnKeyType="next"
          />
        )}
      />
      <Button title="Calcular" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
    backgroundColor: '#E7E7E7',
  },
  input: {
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.01,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.3,
    height: height * 0.06,
    borderRadius: 4,
  },
});

export default LoanCalculator;
