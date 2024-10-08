import axios from 'axios';
import { API_URL } from '@/constants/apiUrl';

// API Call to get user profile
export const fetchUserProfile = async (
    token: string,
) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/user/profile/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};