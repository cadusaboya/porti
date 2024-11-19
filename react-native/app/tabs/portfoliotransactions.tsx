import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@/constants/apiUrl';
import { useAuth } from '@/hooks/useAuth';

type Transaction = {
  id: number;
  transaction_type: string;
  amount: number;
  created_at: string;
};

const PortfolioTransactions = () => {
  const { portfolioId } = 2;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`${API_URL}/portfolio/2/transactions/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [portfolioId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions for Portfolio {portfolioId}</Text>
      <ScrollView style={styles.tableContainer}>
        <View>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Type</Text>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Amount</Text>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Date</Text>
          </View>

          {/* Table Rows */}
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>{transaction.transaction_type}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>R$ {transaction.amount}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{transaction.created_at}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 14,
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default PortfolioTransactions;
