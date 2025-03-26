import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

const getRooms = () => {
  return axios.get(`${API_URL}/rooms`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const addRoom = (roomData) => {
  return axios.post(`${API_URL}/rooms`, roomData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const updateRoom = (id, roomData) => {
    return axios({
      method: 'patch',
      url: `${API_URL}/rooms/${id}`,
      data: roomData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  };

const deleteRoom = (id) => {
  return axios.delete(`${API_URL}/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export default {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
};