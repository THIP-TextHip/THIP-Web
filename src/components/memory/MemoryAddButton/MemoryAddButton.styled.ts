import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { semanticColors, typography } from '../../../styles/global/global';

const slideUpIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const AddButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 32px;
  right: 19.5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ isOpen }) =>
    isOpen ? semanticColors.button.fill.primary : semanticColors.background.card};
  border: 2px solid ${semanticColors.button.line.pointNeongreen};
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s ease;

  img {
    width: 24px;
    height: 24px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(45deg)')};
    transition: transform 0.2s ease;
  }

  @media (min-width: 768px) {
    right: calc(50% - 383px + 20px);
  }
`;

export const DropdownContainer = styled.div`
  position: fixed;
  bottom: 95px;
  right: 19.5px;
  background-color: #121212;
  border: 1px solid ${semanticColors.button.line.pointNeongreen};
  border-radius: 16px;
  padding: 20px 12px;
  min-width: 184px;
  z-index: 99;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${slideUpIn} 0.15s ease-out forwards;
  transform-origin: bottom right;

  @media (min-width: 768px) {
    right: calc(50% - 383px + 20px);
  }
`;

export const DropdownItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.8;
  }
`;
