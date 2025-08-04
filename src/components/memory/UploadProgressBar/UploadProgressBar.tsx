import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

interface UploadProgressBarProps {
  isVisible: boolean;
  onComplete: () => void;
}

const UploadProgressBar = ({ isVisible, onComplete }: UploadProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setIsCompleted(false);
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
          setIsCompleted(true);
          setTimeout(() => {
            onComplete();
          }, 1000); // 1초 후 완료 (완료 메시지를 보여주기 위해)
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <Container>
      <ProgressText>
        {isCompleted ? '기록이 게시되었습니다!' : '기록을 게시 중입니다...'}
      </ProgressText>
      <ProgressBarContainer>
        <ProgressBarFill progress={progress} />
      </ProgressBarContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0px;
  background-color: ${semanticColors.background.primary};
`;

const ProgressText = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: 12px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 7px;
  background-color: ${colors.grey[300]};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${semanticColors.text.point.green};
  border-radius: 3px;
  transition: width 0.1s ease-out;
`;

export default UploadProgressBar;
