import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '@/api/auth';

export const useSocialLoginToken = () => {
  const location = useLocation();

  // 토큰 발급 완료를 기다리는 Promise
  const tokenPromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const handleSocialLoginToken = async (): Promise<void> => {
      // URL에서 loginTokenKey 가져오기
      const params = new URLSearchParams(window.location.search);
      const loginTokenKey = params.get('loginTokenKey');

      if (!loginTokenKey) {
        console.log('🔑 loginTokenKey가 없습니다.');
        return;
      }

      try {
        console.log('🔑 소셜 로그인 토큰 발급 요청');
        console.log('📋 loginTokenKey:', loginTokenKey);

        // /auth/token API 호출하여 토큰 발급 (임시 토큰 또는 access 토큰)
        const response = await getToken({ loginTokenKey });

        if (response.isSuccess) {
          const { token } = response.data;

          // 토큰을 localStorage에 저장 (request header에 사용)
          localStorage.setItem('authToken', token);

          console.log('✅ Access 토큰 발급 성공 (바로 홈 화면)');

          // URL에서 loginTokenKey 파라미터 제거
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } else {
          console.error('❌ 토큰 발급 실패:', response.message);
        }
      } catch (error) {
        console.error('💥 토큰 발급 중 오류 발생:', error);
      }
    };

    // 소셜 로그인 후 리다이렉트된 경우에만 실행
    const urlParams = new URLSearchParams(location.search);
    const isSocialLoginComplete = urlParams.get('loginTokenKey');

    if (isSocialLoginComplete) {
      // 토큰 발급 Promise를 저장
      tokenPromise.current = handleSocialLoginToken();
    }
  }, [location.pathname]);

  // 토큰 발급 완료를 기다리는 함수 반환
  const waitForToken = useCallback(async (): Promise<void> => {
    if (tokenPromise.current) {
      await tokenPromise.current;
    }
  }, []);

  return { waitForToken };
};
