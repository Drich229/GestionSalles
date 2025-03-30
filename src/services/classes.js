import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

const getClasses = () => {
  return axios.get(`${API_URL}/classes`);
};

const addClass = (classData) => {
  return axios.post(`${API_URL}/classes`, classData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const updateClass = (id, classData) => {
  return axios.patch(`${API_URL}/classes/${id}`, classData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const deleteClass = (id) => {
  return axios.delete(`${API_URL}/classes/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const assignRoom = (classId, roomId, startTime, endTime) => {
    return axios.post(`${API_URL}/assign-room`, {
      class_id: classId,
      room_id: roomId,
      start_time: startTime,
      end_time: endTime
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };
  
  const unassignRoom = (classId, roomId) => {
    return axios.post(`${API_URL}/dessign-room`, {
      class_id: classId,
      room_id: roomId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

export default {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
  assignRoom,
  unassignRoom,
};