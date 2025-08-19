import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from './Signup.styled';
import leftarrow from '../../assets/common/leftArrow.svg';
import TitleHeader from '../../components/common/TitleHeader';

const SignupDone = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // SignupGenre에서 전달된 데이터 받기
  const { nickName, aliasName, aliasColor, aliasIconUrl } = location.state || {};

  const handleBackClick = () => {
    navigate('/signup/guide');
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
      <div className="title">안녕하세요, {nickName}님</div>
      <div className="subtitle">이제 Thip에서 활동할 준비를 모두 마쳤어요!</div>
      <div className="content">
        <div className="userInfo">
          <div className="profile">
            <img src={aliasIconUrl} alt="프로필 아이콘" />
          </div>
          <div className="username">{nickName}</div>
          <div className="subname" style={{ color: aliasColor }}>
            {aliasName}
          </div>
        </div>
        <div className="startBtn" onClick={handleNextClick}>
          지금 바로 Thip 시작하기
        </div>
      </div>
    </Container>
  );
};

export default SignupDone;
