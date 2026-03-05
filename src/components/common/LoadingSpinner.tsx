import LoadingSpinnerIcon from '@/assets/common/loadingspinner.svg';
import { Container, SpinnerImage, LoadingText } from './LoadingSpinner.styled';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullHeight?: boolean;
}

const LoadingSpinner = ({
  message = '',
  size = 'medium',
  fullHeight = false,
}: LoadingSpinnerProps) => {
  return (
    <Container fullHeight={fullHeight}>
      <SpinnerImage size={size} src={LoadingSpinnerIcon} alt="로딩 중" />
      {message && <LoadingText>{message}</LoadingText>}
    </Container>
  );
};

export default LoadingSpinner;
