import { useNavigate } from 'react-router-dom';
import { Container } from './Signup.styled';
import leftarrow from '../../assets/leftArrow.svg';
import art from '../../assets/genre/art.svg';
import TitleHeader from '../../components/common/TitleHeader';

const SignupDone = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate('/feed');
  };

  return (
    <Container>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
      />
      <div className="title">안녕하세요, 희용희용님</div>
      <div className="subtitle">이제 Thip에서 활동할 준비를 모두 마쳤어요!</div>
      <div className="content">
        <div className="userInfo">
          <div className="profile">
            <img src={art} />
          </div>
          <div className="username">희용희용</div>
          <div className="subname">예술가</div>
        </div>
        <div className="startBtn" onClick={handleNextClick}>
          지금 바로 Thip 시작하기
        </div>
      </div>
    </Container>
  );
};

export default SignupDone;
