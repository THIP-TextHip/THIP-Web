import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '@/api/auth';
import { useAuthReadyStore } from '@/stores/useAuthReadyStore';

export const useSocialLoginToken = () => {
  const location = useLocation();

  const tokenPromise = useRef<Promise<void> | null>(null);
  const setReady = useAuthReadyStore(s => s.setReady);

  useEffect(() => {
    const handleSocialLoginToken = async (): Promise<void> => {
      const params = new URLSearchParams(window.location.search);
      const loginTokenKey = params.get('loginTokenKey');

      if (!loginTokenKey) {
        return;
      }

      try {
        const response = await getToken({ loginTokenKey });

        if (response.isSuccess) {
          const { token, isNewUser } = response.data;

          if (isNewUser) {
            localStorage.setItem('preAuthToken', token);
            localStorage.removeItem('authToken');
          } else {
            localStorage.setItem('authToken', token);
            localStorage.removeItem('preAuthToken');
          }

          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } else {
          console.error('토큰 발급 실패:', response.message);
        }
      } catch (error) {
        console.error('토큰 발급 중 오류 발생:', error);
      }
      setReady(true);
    };

    const urlParams = new URLSearchParams(location.search);
    const isSocialLoginComplete = urlParams.get('loginTokenKey');

    if (isSocialLoginComplete) {
      tokenPromise.current = handleSocialLoginToken();
    } else {
      setReady(true);
    }
  }, [location.pathname, location.search, setReady]);

  const waitForToken = useCallback(async (): Promise<void> => {
    if (tokenPromise.current) {
      await tokenPromise.current;
    }
  }, []);

  return { waitForToken };
};
