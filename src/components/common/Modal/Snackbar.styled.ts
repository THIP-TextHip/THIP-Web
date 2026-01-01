import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div<{ variant: 'top' | 'bottom'; visible: boolean }>`
  position: fixed;
  ${({ variant }) => (variant === 'top' ? 'top: 16px;' : 'bottom: 16px;')}
  left: 50%;
  min-width: 280px;
  max-width: 500px;
  width: calc(100% - 40px);
  padding: 12px;
  margin: 0 auto;
  background: ${colors.darkgrey.main};
  color: ${colors.white};
  border: 1px solid ${colors.grey[200]};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1100;
  transform: translateX(-50%)
    ${({ variant, visible }) =>
      visible ? 'translateY(0)' : variant === 'top' ? 'translateY(-150%)' : 'translateY(150%)'};
  transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const Discription = styled.div<{ isError?: boolean }>`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${({ isError }) => (isError ? colors.red : colors.white)};
`;

export const Button = styled.div`
  color: ${colors.neongreen};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
`;
