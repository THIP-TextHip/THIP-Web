import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '@/api/auth';
import { useAuthReadyStore } from '@/stores/useAuthReadyStore';

export const useSocialLoginToken = () => {
  const location = useLocation();

  // 토큰 발급 완료를 기다리는 Promise
  const tokenPromise = useRef<Promise<void> | null>(null);
  const setReady = useAuthReadyStore(s => s.setReady);

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

        // /auth/token API 호출하여 토큰 발급 (임시 토큰)
        const response = await getToken({ loginTokenKey });

        if (response.isSuccess) {
          const { token, isNewUser } = response.data;

          if (isNewUser) {
            // 회원가입 진행용 임시 토큰 저장
            localStorage.setItem('preAuthToken', token);
            localStorage.removeItem('authToken');
            console.log('✅ 신규 사용자: 임시 토큰 저장 (회원가입 진행)');
          } else {
            // 기존 사용자: 액세스 토큰 저장
            localStorage.setItem('authToken', token);
            localStorage.removeItem('preAuthToken');
            console.log('✅ 기존 사용자: 액세스 토큰 저장');
          }

          // URL에서 loginTokenKey 파라미터 제거
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } else {
          console.error('❌ 토큰 발급 실패:', response.message);
        }
      } catch (error) {
        console.error('💥 토큰 발급 중 오류 발생:', error);
      }
      // 토큰 발급 시도 완료 시점에 ready true
      setReady(true);
    };

    // 소셜 로그인 후 리다이렉트된 경우에만 실행
    const urlParams = new URLSearchParams(location.search);
    const isSocialLoginComplete = urlParams.get('loginTokenKey');

    if (isSocialLoginComplete) {
      tokenPromise.current = handleSocialLoginToken();
    } else {
      // 로그인 리다이렉트 경로가 아니어도 이미 토큰이 있을 수 있음 → 바로 ready
      setReady(true);
    }
  }, [location.pathname, location.search, setReady]);

  // 토큰 발급 완료를 기다리는 함수 반환
  const waitForToken = useCallback(async (): Promise<void> => {
    if (tokenPromise.current) {
      await tokenPromise.current;
    }
  }, []);

  return { waitForToken };
};
