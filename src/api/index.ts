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
// const TEMP_ACCESS_TOKEN =
//   'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDM4MjY1MiwiZXhwIjoxNzU2OTc0NjUyfQ.BSGuoMWlrzc0oKgSJXHEycxdzzY9-e7gD4xh-wSDemc';

// Request 인터셉터: temp_token과 access_token 쿠키 처리
apiClient.interceptors.request.use(
  config => {
    // 쿠키에서 temp_token과 access_token 확인
    const cookies = document.cookie.split(';');
    const hasTempToken = cookies.some(cookie => cookie.trim().startsWith('temp_token='));
    const hasAccessToken = cookies.some(cookie => cookie.trim().startsWith('access_token='));

    if (hasAccessToken) {
      // access_token이 있으면 정상 토큰 사용
      console.log('✅ access_token 쿠키가 있어서 정상 토큰을 사용합니다.');
      // access_token은 withCredentials: true로 자동 전송되므로 별도 헤더 설정 불필요
    } else if (hasTempToken) {
      // temp_token이 있으면 임시 토큰 사용
      console.log('🔑 temp_token 쿠키가 있어서 임시 토큰을 사용합니다.');
      // temp_token도 withCredentials: true로 자동 전송되므로 별도 헤더 설정 불필요
    } else {
      // 둘 다 없으면 인증 토큰 없음
      console.log('❌ temp_token과 access_token 쿠키가 모두 없습니다.');
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
