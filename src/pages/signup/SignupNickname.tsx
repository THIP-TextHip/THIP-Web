import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, InputBox, StyledInput, CharCount } from './Signup.styled';
import Header from './Header';

const SignupNickname = () => {
  const [nickname, setNickname] = useState('');
  const maxLength = 10;
  const navigate = useNavigate();

  const isNextActive = nickname.length >= 2 && nickname.length <= maxLength;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    if (!isNextActive) return;
    navigate('/signup/genre');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, '');
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
        <InputBox>
          <StyledInput
            type="text"
            placeholder="한글/영어/숫자로 구성"
            value={nickname}
            onChange={handleInputChange}
            maxLength={maxLength}
          />
          <CharCount>
            {nickname.length}/{maxLength}
          </CharCount>
        </InputBox>
      </Container>
    </>
  );
};

export default SignupNickname;
