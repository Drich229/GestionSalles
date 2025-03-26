import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

const register = async (username, name, firstname, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        name,
        firstname,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Identifiants incorrects');
      } else {
        throw new Error(error.response?.data?.message || 'Erreur de connexion');
      }
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Non authentifié');
    
    return axios.get(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

export default {
  register,
  login,
  getProfile,
};