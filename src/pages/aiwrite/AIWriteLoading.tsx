import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '@/assets/common/leftArrow.svg';

const AIWriteLoading = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const handleBackClick = () => {
    navigate(`/rooms/${roomId}/memory`);
  };

  return (
    <Container>
      <TitleHeader
        title="AI 독서감상문"
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
      />

      <Content>
        <LoadingSpinner size="large" />
        <MessageContainer>
          <Message>독서 감상문을 생성중이에요!</Message>
          <SubMessage>조금만 기다려주세요</SubMessage>
        </MessageContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.black.main};
  padding-top: 56px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Message = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  text-align: center;
`;

const SubMessage = styled.div`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  text-align: center;
`;

export default AIWriteLoading;
