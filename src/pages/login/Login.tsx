import styled from '@emotion/styled';
import logo from '../../assets/login/logo.svg';
import KaKao from '../../assets/login/kakao.svg';
import Google from '../../assets/login/google.svg';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  background-color: var(--color-black-main);
`;

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
