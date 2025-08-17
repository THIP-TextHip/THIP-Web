import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. localStorage에서 토큰 제거
    localStorage.removeItem('authToken');

    // 2. 로그인 페이지로 리다이렉트
    navigate('/', { replace: true });
  };

  return { handleLogout };
};
