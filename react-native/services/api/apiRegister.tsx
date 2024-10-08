import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '@/constants/apiUrl';

// API Call to create a new user
export const createUser = async (data: FormData) => {
  try {
    const res = await axios.post(`${API_URL}/accounts/register/`, data);
    return res.data;
  } catch (error) {
    if (error.response.status === 502 || error.response.status === 504 || error.response.status === 404) { // Server unavailable
      Alert.alert('Servidor indisponível', 'Por favor, tente novamente mais tarde.');
    } else {
      const errors = error.response.data.errors; // Get the errors from the server serializer
      console.error('Error creating user:', errors);
      if (errors.username) { // If the username is already taken
        Alert.alert('Erro', 'Usuário já existe');
      } else if (errors.cpf) { // If the CPF is already taken
        Alert.alert('Erro', 'CPF já cadastrado');
      } else if (errors.email) { // If the email is already taken
        Alert.alert('Erro', 'E-mail já cadastrado');
      } else { // Generic error
        Alert.alert('Erro', 'Certifique-se que todos os campos foram preenchidos corretamente.');
      }
    }
    throw error;
  }
};