import axios from 'axios';
import { API_URL } from '@/constants/apiUrl';

// API Call to get user cash
export const fetchUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/user/cash/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};