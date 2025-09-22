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
});
// Request 인터셉터: 토큰 부재 시 비공개 API 요청을 선제 차단(리다이렉트 + 요청 취소)
apiClient.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('authToken');
    const preAuthToken = localStorage.getItem('preAuthToken');
    // 공개 API(완전 공개)
    const publicPaths = ['/auth/token'];
    // 회원가입 진행 중 필요한 경로(임시 토큰 허용)
    const signupPaths = ['/users/nickname', '/users/signup'];
    const isPublic = publicPaths.some(path => config.url?.startsWith(path));
    const isSignupPath = signupPaths.some(path => config.url?.startsWith(path));

    if (!authToken && !isPublic && !(preAuthToken && isSignupPath)) {
      console.log('❌ 토큰 없음: 요청을 취소하고 홈으로 이동합니다.');
      window.location.href = '/';
      // 요청 자체를 취소하여 불필요한 네트워크 왕복 방지
      return Promise.reject(new Error('Request cancelled: missing auth token'));
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else if (preAuthToken && isSignupPath) {
      // 회원가입 경로에서는 임시 토큰을 사용
      config.headers.Authorization = `Bearer ${preAuthToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
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
