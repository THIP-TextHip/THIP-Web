import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { typography, semanticColors, colors } from '../../styles/global/global';

const slideDownIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideUpOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
`;

export const DropdownContainer = styled.div<{ isAnimating: boolean }>`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: #121212;
  border: 1px solid ${colors.grey[200]};
  border-radius: 16px;
  padding: 20px 12px;
  min-width: 120px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${({ isAnimating }) => (isAnimating ? slideDownIn : slideUpOut)} 0.15s ease-out
    forwards;
  transform-origin: top right;
`;

export const DropdownItem = styled.button<{ selected: boolean }>`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  color: ${({ selected }) => (selected ? semanticColors.text.primary : colors.grey[300])};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${semanticColors.background.cardDark};
  }
`;
