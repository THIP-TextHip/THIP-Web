import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '@/api/index';

export const useSocialLoginToken = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 토큰 발급 완료를 기다리는 Promise
  const tokenPromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const handleSocialLoginToken = async () => {
      // URL에서 loginTokenKey 가져오기
      const params = new URLSearchParams(window.location.search);
      const loginTokenKey = params.get('loginTokenKey');

      if (!loginTokenKey) {
        console.log('🔑 loginTokenKey가 없습니다.');
        return;
      }

      // 현재 경로가 /signup인지 확인
      const isSignupPage = location.pathname === '/signup';

      try {
        if (isSignupPage) {
          // 회원가입 페이지인 경우: 임시토큰 발급 요청
          console.log('🔑 회원가입 페이지: 임시토큰 발급 요청');
          console.log('📋 loginTokenKey:', loginTokenKey);

          const response = await apiClient.post(
            '/auth/set-cookie',
            { loginTokenKey },
            { withCredentials: true },
          );

          if (response.data.isSuccess) {
            console.log('✅ 임시토큰 발급 성공');
            // URL에서 loginTokenKey 파라미터 제거
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          } else {
            console.error('❌ 임시토큰 발급 실패:', response.data.message);
          }
        } else {
          // 피드 페이지 등 다른 페이지인 경우: 엑세스토큰 발급 요청
          console.log('🔑 피드 페이지: 엑세스토큰 발급 요청');
          console.log('📋 loginTokenKey:', loginTokenKey);

          const response = await apiClient.post(
            '/auth/exchange-temp-token',
            { loginTokenKey },
            { withCredentials: true },
          );

          if (response.data.isSuccess) {
            console.log('✅ 엑세스토큰 발급 성공');
            // URL에서 loginTokenKey 파라미터 제거
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          } else {
            console.error('❌ 엑세스토큰 발급 실패:', response.data.message);
            navigate('/');
          }
        }
      } catch (error) {
        console.error('💥 토큰 발급 중 오류 발생:', error);
        navigate('/');
      }
    };

    // 소셜 로그인 후 리다이렉트된 경우에만 실행
    const urlParams = new URLSearchParams(location.search);
    const isSocialLoginComplete = urlParams.get('loginTokenKey');

    if (isSocialLoginComplete) {
      // 토큰 발급 Promise를 저장
      tokenPromise.current = handleSocialLoginToken();
    }
  }, [location.pathname, navigate]);

  // 토큰 발급 완료를 기다리는 함수 반환
  const waitForToken = async (): Promise<void> => {
    if (tokenPromise.current) {
      await tokenPromise.current;
    }
  };

  return { waitForToken };
};
