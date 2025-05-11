import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const fetchEvents = async () => {
  const res = await axios.get(`${API_BASE}/api/events`);
  return res.data;
};

export const fetchMoments = async () => {
  const res = await axios.get(`${API_BASE}/api/moments`);
  return res.data;
};
