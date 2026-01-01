import { useState, useEffect } from 'react';
import { Container } from './TokenStatus.styled';

const TokenStatus = () => {
  const [tokenStatus, setTokenStatus] = useState<string>('확인 중...');

  useEffect(() => {
    const checkToken = () => {
      const cookies = document.cookie.split(';');
      const hasAuthCookie = cookies.some(cookie => cookie.trim().startsWith('Authorization='));

      if (hasAuthCookie) {
        setTokenStatus('✅ Authorization 쿠키 있음');
      } else {
        setTokenStatus('🔑 임시 토큰 사용 중');
      }
    };

    checkToken();
    // 5초마다 상태 확인
    const interval = setInterval(checkToken, 5000);

    return () => clearInterval(interval);
  }, []);

  return <Container>{tokenStatus}</Container>;
};

export default TokenStatus;
