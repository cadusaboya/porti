import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function ResultsScreen({ route }) {
  const { paymentSchedule } = route.params;
  const { width } = Dimensions.get('window'); // Get screen width for better responsiveness

  const generatePDF = async () => {
    try {
      // Generate HTML content for PDF
      let htmlContent = `
        <h1>Loan Payment Schedule</h1>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>Mês</th>
            <th>Parcela</th>
            <th>Juros</th>
            <th>Amortização</th>
            <th>Saldo</th>
          </tr>
      `;
      paymentSchedule.forEach((payment) => {
        htmlContent += `
          <tr>
            <td>${payment.month}</td>
            <td>R$ ${payment.totalPayment}</td>
            <td>R$ ${payment.interestPayment}</td>
            <td>R$ ${payment.principalPayment}</td>
            <td>R$ ${payment.outstandingBalance}</td>
          </tr>
        `;
      });
      htmlContent += '</table>';

      // Create PDF
      const pdf = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'loan_payment_schedule',
        base64: true,
      });

      Alert.alert('PDF generated successfully!', 'You can find the PDF file in your documents.');
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Failed to generate PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 0.7 }]}>Mês</Text>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Parcela</Text>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Juros</Text>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Amortização</Text>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1.5 }]}>Saldo</Text>
          </View>

          {/* Table Rows */}
          {paymentSchedule.map((payment, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.7 }]}>{payment.month}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>R$ {payment.totalPayment}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>R$ {payment.interestPayment}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>R$ {payment.principalPayment}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>R$ {payment.outstandingBalance}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Export to PDF Button */}
      <Button title="Export to PDF" onPress={generatePDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    paddingVertical: 10,
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
    color: '#555',
  },
});
