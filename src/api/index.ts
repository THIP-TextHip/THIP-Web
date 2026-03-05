import axios, { type AxiosResponse, type AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('authToken');
    const preAuthToken = localStorage.getItem('preAuthToken');
    const publicPaths = ['/auth/token'];
    const signupPaths = ['/users/nickname', '/users/signup'];
    const isPublic = publicPaths.some(path => config.url?.startsWith(path));
    const isSignupPath = signupPaths.some(path => config.url?.startsWith(path));

    if (!authToken && !isPublic && !(preAuthToken && isSignupPath)) {
      window.location.href = '/';
      return Promise.reject(new Error('Request cancelled: missing auth token'));
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else if (preAuthToken && isSignupPath) {
      config.headers.Authorization = `Bearer ${preAuthToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
