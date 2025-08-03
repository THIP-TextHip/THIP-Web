import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

interface UploadProgressModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

const UploadProgressModal = ({ isVisible, onComplete }: UploadProgressModalProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const duration = 3000; // 3초
    const interval = 50; // 50ms마다 업데이트
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + increment, 100);
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 500); // 0.5초 후 완료
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <Overlay>
      <Container>
        <ProgressText>기록을 게시 중입니다...</ProgressText>
        <ProgressBarContainer>
          <ProgressBarFill progress={progress} />
        </ProgressBarContainer>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.black[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Container = styled.div`
  background-color: ${semanticColors.background.primary};
  padding: 32px 24px;
  border-radius: 16px;
  min-width: 280px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ProgressText = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colors.grey[300]};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${semanticColors.text.point.green};
  border-radius: 4px;
  transition: width 0.1s ease-out;
`;

export default UploadProgressModal;
