import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div<{ fullHeight: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 767px;
  min-width: 320px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  ${({ fullHeight }) =>
    fullHeight &&
    `
    min-height: 100vh;
    background-color: var(--color-black-main);
  `}
`;

export const SpinnerImage = styled.img<{ size: string }>`
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'width: 24px; height: 24px;';
      case 'large':
        return 'width: 48px; height: 48px;';
      default:
        return 'width: 32px; height: 32px;';
    }
  }}
`;

export const LoadingText = styled.p`
  margin-top: 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
`;
