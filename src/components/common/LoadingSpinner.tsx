import styled from '@emotion/styled';
import LoadingSpinnerIcon from '@/assets/common/loadingspinner.svg';
import { colors, typography } from '@/styles/global/global';

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

const Container = styled.div<{ fullHeight: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ fullHeight }) =>
    fullHeight &&
    `
    min-height: 100vh;
    background-color: var(--color-black-main);
  `}
`;

const SpinnerImage = styled.img<{ size: string }>`
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'width: 24px; height: 24px;';
      case 'large':
        return 'width: 48px; height: 48px;';
      default: // medium
        return 'width: 32px; height: 32px;';
    }
  }}
`;

const LoadingText = styled.p`
  margin-top: 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
`;

export default LoadingSpinner;
