import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Change selon l'environnement

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
