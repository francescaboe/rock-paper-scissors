import axios, { AxiosInstance } from 'axios';
const BASE_URL = 'http://localhost:4000';

// Create a custom axios instance with default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // 5 seconds timeout
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    // config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export const createRoomApi = async ({ username }: { username: string }) => {
  const response = await apiClient.post('/start-game', { username });
  return response.data;
};

export const joinRoomApi = async ({ username, roomId }: { username: string; roomId: string }) => {
  const response = await apiClient.post('/join-game', { username, roomId });
  return response.data;
};
