import axios, { type AxiosResponse, type AxiosError } from 'axios';

// API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 자동 전송 설정
});
// Request 인터셉터: localStorage의 토큰을 헤더에 자동 추가
apiClient.interceptors.request.use(
  config => {
    // localStorage에서 토큰 확인
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // 토큰이 있으면 Authorization 헤더에 추가
      console.log('🔑 Authorization 헤더에 토큰 추가');
      config.headers.Authorization = `Bearer ${authToken}`;
    } else {
      console.log('❌ localStorage에 토큰이 없습니다.');
      config.headers.Authorization =
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDM4MjY1MiwiZXhwIjoxNzU2OTc0NjUyfQ.BSGuoMWlrzc0oKgSJXHEycxdzzY9-e7gD4xh-wSDemc';
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response 인터셉터: 401 에러 시 로그인 페이지로 리다이렉트
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
