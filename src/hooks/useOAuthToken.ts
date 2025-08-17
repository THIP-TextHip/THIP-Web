import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/api/index';

export const useOAuthToken = () => {
  const [isTokenRequested, setIsTokenRequested] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginTokenKey = params.get('loginTokenKey');

    if (loginTokenKey && !isTokenRequested) {
      console.log('=== 🔑 소셜 로그인 토큰 발급 요청 ===');
      console.log('📋 인가코드:', loginTokenKey);

      setIsTokenRequested(true);

      // 서버에 토큰 발급 요청
      apiClient
        .post('/auth/set-cookie', { loginTokenKey }, { withCredentials: true })
        .then(response => {
          console.log('✅ 토큰 발급 성공:', response.data);
          // URL에서 code 파라미터 제거
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        })
        .catch(error => {
          console.error('❌ 토큰 발급 실패:', error);
          // 에러 발생 시 로그인 페이지로 이동
          // navigate('/');
          console.log('💡 임시 토큰을 사용하여 계속 진행합니다.');
          // 에러 발생 시에도 임시 토큰으로 계속 진행
          // URL에서 code 파라미터 제거
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        });
    } else if (!loginTokenKey) {
      console.log('🔑 loginTokenKey가 없습니다. 임시 토큰을 사용합니다.');
    }
  }, [isTokenRequested, navigate]);

  return { isTokenRequested };
};
