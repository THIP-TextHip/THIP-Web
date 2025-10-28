import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TitleHeader from '@/components/common/TitleHeader';
import { usePopupActions } from '@/hooks/usePopupActions';
import leftArrow from '@/assets/common/leftArrow.svg';
import infoIcon from '@/assets/common/infoIcon_white.svg';
import { MOCK_AI_WRITING } from '@/mocks/aiwrite.mock';

const AIWrite = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { openSnackbar, openConfirm, closePopup } = usePopupActions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    openConfirm({
      title: 'AI 독서감상문 생성 (Beta)',
      disc: '생성된 감상문은 다시 볼 수 없으며, 잔여 이용횟수는 차감돼요. 계속하시겠어요?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        closePopup();
        navigate(`/rooms/${roomId}/memory`);
      },
    });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_AI_WRITING);
      openSnackbar({
        message: '클립보드에 복사가 완료되었어요',
        variant: 'top',
        onClose: () => {},
      });
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      openSnackbar({
        message: '복사에 실패했습니다',
        variant: 'bottom',
        isError: true,
        onClose: () => {},
      });
    }
  };

  return (
    <Container>
      <TitleHeader
        title="AI 독서감상문"
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
      />

      {isLoading ? (
        <LoadingContent>
          <LoadingSpinner size="large" />
          <MessageContainer>
            <Message>독서 감상문을 생성중이에요!</Message>
            <SubMessage>조금만 기다려주세요</SubMessage>
          </MessageContainer>
        </LoadingContent>
      ) : (
        <ResultContent>
          <InfoBanner>
            <img src={infoIcon} alt="정보" />
            <span>내 기록과 총평을 바탕으로 생성된 감상문입니다.</span>
          </InfoBanner>
          <ContentText>{MOCK_AI_WRITING}</ContentText>
          <CopyButton onClick={handleCopyToClipboard}>클립보드에 복사</CopyButton>
        </ResultContent>
      )}
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

const LoadingContent = styled.div`
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

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
`;

const InfoBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 13px 26px;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    color: ${colors.grey[200]};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.regular};
    line-height: auto;
  }
`;

const ContentText = styled.div`
  flex: 1;
  padding: 0 26px 74px;
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  white-space: pre-wrap;
`;

const CopyButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: ${colors.purple.main};
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
`;

export default AIWrite;
