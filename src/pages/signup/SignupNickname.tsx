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

  // 소셜 로그인 토큰 발급 처리
  const { waitForToken } = useSocialLoginToken();

  const isNextActive = nickname.length >= 2 && nickname.length <= maxLength;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = async () => {
    if (!isNextActive) return;
    setError('');

    console.log('=== 🚀 닉네임 검증 시작 ===');
    console.log('👤 입력된 닉네임:', nickname);

    try {
      // 토큰 발급 완료 대기
      await waitForToken();

      // 임시 토큰 존재 여부 확인 (회원가입 진행 중)
      const preAuthToken = localStorage.getItem('preAuthToken');
      if (!preAuthToken) {
        console.log('❌ 임시 토큰이 없어 닉네임 검증을 할 수 없습니다.');
        setError('인증 토큰이 없습니다. 다시 시도해주세요.');
        return;
      }

      console.log('✅ 임시 토큰 확인 완료, 닉네임 검증 API 호출');
      const result = await postNickname(nickname);

      if (result.data.isVerified) {
        console.log('✅ 닉네임 검증 성공!');
        // 닉네임 검증 성공 - 다음 단계로 진행
        navigate('/signup/genre', { state: { nickname } });
      } else {
        console.log('❌ 닉네임 검증 실패 - 이미 사용중');
        // 닉네임 검증 실패 - 우리가 정한 에러 메시지
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
