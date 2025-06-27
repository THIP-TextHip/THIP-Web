import styled from '@emotion/styled';
import logo from '../../assets/login/logo.svg';
import KaKao from '../../assets/login/kakao.svg';
import Google from '../../assets/login/google.svg';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  background-color: #121212;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 129.75px;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  color: #121212;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

const SocialButton = styled.div<{ bg: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background-color: ${({ bg }) => bg};
  gap: 8px;

  color: #121212;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
`;

const Login = () => {
  const handleKakaoLogin = () => {
    return;
  };

  const handleGoogleLogin = () => {
    return;
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

export default Login;
