import TitleHeader from '@/components/common/TitleHeader';
import styled from '@emotion/styled';
import { Wrapper } from '../../components/common/Wrapper';
import leftArrow from '@/assets/common/leftArrow.svg';
import charactor from '@/assets/mypage/charactor.svg';
import { useNavigate } from 'react-router-dom';
import { colors, typography } from '@/styles/global/global';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 360px;
  max-width: 540px;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 56px;
  gap: 20px;

  .title {
    color: ${colors.white};
    text-align: center;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 24px;
  }

  .sub-title {
    color: ${colors.grey[100]};
    text-align: center;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: normal;
  }
`;

export default WithdrawDonePage;
