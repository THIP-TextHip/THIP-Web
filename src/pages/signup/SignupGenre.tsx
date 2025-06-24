import { Container } from './Signup.styled';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import leftarrow from '../../assets/leftArrow.svg';

const SignupGenre = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <Header
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="설정 2/2"
        rightButton={<div className="next">다음</div>}
        onLeftClick={handleBackClick}
        onRightClick={handleNextClick}
      />
      <Container>
        <div className="title">관심있는 장르를 선택해주세요.</div>
        <div className="subtitle">이후 마이페이지에서 변경이 가능해요.</div>
        <div className="notice">아래에서 하나를 선택해주세요.</div>
      </Container>
    </>
  );
};

export default SignupGenre;
