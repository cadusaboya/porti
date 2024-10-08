import axios from 'axios';
import { API_URL } from '@/constants/apiUrl';



// API Call to request account deletion
export const requestDeletion = async (token: string) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/user/delete-request/`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating deletion request:', error);
    throw error;
  }
};