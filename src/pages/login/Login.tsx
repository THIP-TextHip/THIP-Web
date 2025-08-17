import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import logo from '../../assets/login/logo.svg';
import KaKao from '../../assets/login/kakao.svg';
import Google from '../../assets/login/google.svg';
import { Wrapper } from '@/components/common/Wrapper';

const Login = () => {
  const navigate = useNavigate();

  // 이미 토큰이 있으면 /feed로 바로 이동
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      console.log('✅ 이미 토큰이 있어서 /feed로 바로 이동합니다.');
      navigate('/feed');
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    // 직접 카카오 로그인 URL로 리다이렉션
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  const handleGoogleLogin = () => {
    // 직접 구글 로그인 URL로 리다이렉션
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <Wrapper>
      <img src={logo} />
      <ButtonBox>
        <SocialButton onClick={handleKakaoLogin} bg="#fee500">
          <img src={KaKao} /> 카카오계정 로그인
        </SocialButton>
        <SocialButton onClick={handleGoogleLogin} bg="#fefefe">
          <img src={Google} /> 구글계정 로그인
        </SocialButton>
      </ButtonBox>
    </Wrapper>
  );
};

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 130px;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  color: var(--color-black-main);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 24px;
`;

const SocialButton = styled.div<{ bg: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  gap: 8px;
  background-color: ${({ bg }) => bg};
  color: var(--color-black-main);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 24px;
  cursor: pointer;
`;

export default Login;
