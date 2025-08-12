import axios, { type AxiosResponse, type AxiosError } from 'axios';

// 하드코딩된 액세스 토큰
const ACCESS_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjgsImlhdCI6MTc1NDM4MjY1MiwiZXhwIjoxNzU2OTc0NjUyfQ.giRdeg9HWsdhLxg9JZhE0LaMg0hv7ReP0UBMsEUsNxs';

// 토큰 관리 유틸리티
export const TokenManager = {
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  getAccessToken: (): string | null => localStorage.getItem('accessToken'),
  // setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
  // getRefreshToken: (): string | null => localStorage.getItem('refreshToken'),
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
  },
  hasValidToken: (): boolean => !!localStorage.getItem('accessToken'),
};

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 환경변수 확인용
console.log('API_BASE_URL:', API_BASE_URL);

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  config => {
    // 로컬스토리지에서 토큰 먼저 확인
    const token = TokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 토큰이 없으면 하드코딩된 토큰 사용 (개발용)
      config.headers.Authorization = ACCESS_TOKEN;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터 - 토큰 만료 처리 및 에러 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { status } = error.response || {};

    // 에러 로깅
    console.error('API Error:', status, error.message);

    // 토큰 만료 또는 인증 실패 시 로그인 페이지로 리다이렉트
    if (status === 401) {
      // alert('토큰이 만료되었거나 유효하지 않습니다. 로그인 페이지로 이동합니다.');

      // 현재 페이지가 로그인 페이지가 아닌 경우에만 리다이렉트
      if (window.location.pathname !== '/') {
        // alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/';
      }
    }

    // 권한 없음 (403) 에러 처리
    if (status === 403) {
      console.warn('접근 권한이 없습니다.');
      alert('접근 권한이 없습니다.');
    }

    // 서버 에러 (500번대) 처리
    if (status && status >= 500) {
      console.error('서버 오류가 발생했습니다.');
      alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
