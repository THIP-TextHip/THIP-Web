import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, InputBox, StyledInput, CharCount } from './Signup.styled';
import Header from '../../components/common/TitleHeader';
import { postNickname } from '@/api/users/postNickname';
import { useSocialLoginToken } from '@/hooks/useSocialLoginToken';

const SignupNickname = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const maxLength = 10;
  const navigate = useNavigate();

  const { waitForToken } = useSocialLoginToken();

  const isNextActive = nickname.length >= 2 && nickname.length <= maxLength;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = async () => {
    if (!isNextActive) return;
    setError('');

    try {
      await waitForToken();

      const preAuthToken = localStorage.getItem('preAuthToken');
      if (!preAuthToken) {
        setError('인증 토큰이 없습니다. 다시 시도해주세요.');
        return;
      }

      const result = await postNickname(nickname);

      if (result.data.isVerified) {
        navigate('/signup/genre', { state: { nickname } });
      } else {
        setError('이미 사용중인 닉네임이에요.');
      }
    } catch (error) {
      console.error('💥 닉네임 검증 중 오류 발생:', error);
      setError('닉네임 검증 중 오류가 발생했습니다.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^ㄱ-ㅎ가-힣a-z0-9]/g, '');
    setNickname(filteredValue);
  };

  return (
    <>
      <Header
        title="설정 1/2"
        rightButton={<div className="next">다음</div>}
        onLeftClick={handleBackClick}
        onRightClick={handleNextClick}
        isNextActive={isNextActive}
      />
      <Container>
        <div className="title">닉네임(필수)</div>
        <InputBox hasError={!!error}>
          <StyledInput
            type="text"
            placeholder="한글/영문소문자/숫자로 구성"
            value={nickname}
            onChange={handleInputChange}
            maxLength={maxLength}
            hasError={!!error}
          />
          <CharCount>
            {nickname.length}/{maxLength}
          </CharCount>
        </InputBox>
        {error && <div className="errorMessage">{error}</div>}
      </Container>
    </>
  );
};

export default SignupNickname;
