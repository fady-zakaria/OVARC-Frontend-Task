import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';
const timeout = import.meta.env.VITE_API_TIMEOUT

export const httpClient = axios.create({
  baseURL,
  timeout,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
        throw new Error('Backend Error');
    }
    return Promise.reject(err);
  }
);