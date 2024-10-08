import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '@/constants/apiUrl';

// API Call to log in user
export const loginUser = async (data: FormData) => {
  try {
    const res = await axios.post(`${API_URL}/accounts/login/`, data);
    return res.data.token; // Return user token
  } catch (error: any) {
    console.error('Failed to log in:', error);
    if (error.response?.status === 502 || error.response?.status === 504 || error.response?.status === 404) { // Server unavailable
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else { // If there was a message, show it, if there wasn't say it's an unknown error
      const msg = error.response?.data.message || 'Erro desconhecido';
      Alert.alert('Erro', `${msg}`);
    }
    throw error;
  }
};