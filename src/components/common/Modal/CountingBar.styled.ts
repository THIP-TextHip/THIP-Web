import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const BarContainer = styled.div`
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 101;
  pointer-events: none;
`;

export const Bar = styled.div`
  padding: 8px 16px;
  background: ${colors.darkgrey.dark};
  color: ${colors.neongreen};
  border-radius: 16px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  transform: none;
  transition: none;
  pointer-events: none;

  &[data-leaving='true'] {
    transform: translateY(-32px) scale(0.98);
    opacity: 0;
    transition:
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
