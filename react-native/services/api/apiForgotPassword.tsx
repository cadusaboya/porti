import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '@/constants/apiUrl';

// API Call to send password reset request
export const sendPasswordResetRequest = async (data: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/password_reset/`, data);
    return response.data;
  } catch (error) {
    if (error.response.status === 502 || error.response.status === 504 || error.response.status === 404) { // Server unavailable
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else if (error.response.status === 400) { // Invalid data
      Alert.alert('Erro', 'Combinação de usuário e e-mail não encontrada');
    } else { // Unexpected error
      console.error('Error sending password reset request:', error);
      Alert.alert('Erro inesperado', 'Se o problema persistir, entre em contato com o suporte');
    }
    throw error;
  }
};