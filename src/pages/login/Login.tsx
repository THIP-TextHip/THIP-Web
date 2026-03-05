import logo from '../../assets/login/logo.svg';
import KaKao from '../../assets/login/kakao.svg';
import Google from '../../assets/login/google.svg';
import { Wrapper } from '@/components/common/Wrapper';
import { ButtonBox, SocialButton } from './Login.styled';

const Login = () => {
  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  const handleGoogleLogin = () => {
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

export default Login;
