import { useState, useEffect } from 'react';
import {
  Container,
  ProgressText,
  ProgressBarContainer,
  ProgressBarFill,
} from './UploadProgressBar.styled';

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

    const duration = 3000;
    const interval = 50;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + increment, 100);
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsCompleted(true);
          setTimeout(() => {
            onComplete();
          }, 1000);
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

export default UploadProgressBar;
