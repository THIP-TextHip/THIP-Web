import TitleHeader from '@/components/common/TitleHeader';
import { Wrapper } from '../../components/common/Wrapper';
import leftArrow from '@/assets/common/leftArrow.svg';
import charactor from '@/assets/mypage/charactor.svg';
import { useNavigate } from 'react-router-dom';
import { Container, Text } from './WithdrawDonePage.styled';

const WithdrawDonePage = () => {
  const navigate = useNavigate();

  const onLeftClick = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <TitleHeader leftIcon={<img src={leftArrow} alt="홈으로가기" />} onLeftClick={onLeftClick} />
      <Container>
        <Text>
          <div className="title">탈퇴완료</div>
          <div className="sub-title">다음에 또 만나요!</div>
        </Text>
        <img src={charactor} alt="캐릭터" />
      </Container>
    </Wrapper>
  );
};

export default WithdrawDonePage;
