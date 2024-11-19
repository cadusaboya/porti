import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '@/constants/apiUrl';
import { useAuth } from '@/hooks/useAuth';

export default function PortfolioList({ navigation }) {
  const [portfolios, setPortfolios] = useState([]);
  const { token, logout } = useAuth();

  // Fetch portfolios from API
  useEffect(() => {
    axios.get(`${API_URL}/portfolio/view/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => setPortfolios(response.data))
    .catch(error => console.log(error));
  }, []);

  // Render each portfolio as a card
  const renderPortfolioCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PortfolioDetailsTabs', { portfolioId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description || 'Sem descrição disponível'}</Text>
      <Text style={styles.balance}>Valor Total: R$ {item.patrimonial_value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={portfolios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPortfolioCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  balance: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});
