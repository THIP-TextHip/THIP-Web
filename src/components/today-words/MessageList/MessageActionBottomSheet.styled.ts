import styled from '@emotion/styled';
import { semanticColors, typography } from '../../../styles/global/global';

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const BottomSheet = styled.div<{ isOpen: boolean }>`
  background-color: ${semanticColors.background.card};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 767px;
  min-width: 320px;
  padding: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.3s ease-in-out;
`;

export const DeleteActionItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 13px 12px;
  color: ${semanticColors.text.warning};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${semanticColors.background.card};
  }
`;

export const ReportActionItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 13px 12px;
  color: ${semanticColors.text.warning};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${semanticColors.background.card};
  }
`;
