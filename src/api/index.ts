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

// 임시 하드코딩된 토큰 (쿠키가 없을 때 사용)
const TEMP_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDM4MjY1MiwiZXhwIjoxNzU2OTc0NjUyfQ.BSGuoMWlrzc0oKgSJXHEycxdzzY9-e7gD4xh-wSDemc';

// Request 인터셉터: 쿠키가 없을 때 임시 토큰을 헤더에 추가
apiClient.interceptors.request.use(
  config => {
    // 쿠키에서 Authorization 확인
    const cookies = document.cookie.split(';');
    const hasAuthCookie = cookies.some(cookie => cookie.trim().startsWith('Authorization='));

    // 쿠키가 없으면 임시 토큰을 헤더에 추가
    if (!hasAuthCookie) {
      console.log('🔑 쿠키가 없어서 임시 토큰을 헤더에 추가합니다.');
      config.headers.Authorization = `Bearer ${TEMP_ACCESS_TOKEN}`;
    } else {
      console.log('✅ Authorization 쿠키가 있어서 자동으로 전송됩니다.');
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
      // 인증 실패 시 로그인 페이지로 리다이렉트
      // window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
