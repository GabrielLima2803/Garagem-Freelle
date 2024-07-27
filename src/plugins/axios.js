import axios from 'axios'

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


const api = axios.create( {
  baseURL: 'http://localhost:19003/api'
})

// axios.defaults.baseURL = `${BASE_URL}/api`
// axios.defaults.baseURL = 'http://localhost:19003/api'; 
// axios.defaults.baseURL = 'http://0.0.0.0:19003/api' // Não tava funcinado sem o LocalHost 
// axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.baseURL = "https://livraria-drf.herokuapp.com/api";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('psg_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api