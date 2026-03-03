import axios from 'axios';


const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://talkflow-9prl.onrender.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;