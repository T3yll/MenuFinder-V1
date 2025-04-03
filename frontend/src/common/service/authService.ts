import axios from 'axios';
import apiClient from './apiConfig';
import { CONTENT_JSON } from '../constants/API/APIContentType';

const url = import.meta.env.VITE_API_URL;
const moduleUrl = '/auth';

const authService = {
  login: async () => {
    try {
      const response = await axios.post(`${url}${moduleUrl}/login`, {
        username: import.meta.env.VITE_USER_USERNAME,
        password: import.meta.env.VITE_USER_PASSWORD,
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);

      return response.data;
    } catch (error) {
      window.location.href = '/error';
      console.error('Erreur lors de la connexion', error);
      throw error;
    }
  },
  getMe: async () => {
    try {
      const response = await apiClient(CONTENT_JSON).get(`${moduleUrl}/me`);
      return response;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },
};

export default authService;
