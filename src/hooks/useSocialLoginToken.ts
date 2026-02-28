import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '@/api/auth';
import { useAuthReadyStore } from '@/stores/authReadyStore';

let sharedTokenPromise: Promise<void> | null = null;
let sharedLoginTokenKey: string | null = null;

export const useSocialLoginToken = () => {
  const location = useLocation();

  const tokenPromise = useRef<Promise<void> | null>(null);
  const setReady = useAuthReadyStore(s => s.setReady);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const loginTokenKey = urlParams.get('loginTokenKey');

    if (!loginTokenKey) {
      setReady(true);
      return;
    }

    if (!sharedTokenPromise || sharedLoginTokenKey !== loginTokenKey) {
      setReady(false);
      sharedLoginTokenKey = loginTokenKey;
      sharedTokenPromise = (async () => {
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
        } finally {
          setReady(true);
        }
      })();
    }

    tokenPromise.current = sharedTokenPromise;
  }, [location.pathname, location.search, setReady]);

  const waitForToken = useCallback(async (): Promise<void> => {
    const pendingTokenPromise = tokenPromise.current ?? sharedTokenPromise;
    if (pendingTokenPromise) {
      await pendingTokenPromise;
    }
  }, []);

  return { waitForToken };
};
