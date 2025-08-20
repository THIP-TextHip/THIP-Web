import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.black.main};
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 767px;
  height: 100vh;
  background-color: ${semanticColors.background.primary};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.xl};
  cursor: pointer;
`;

export const Title = styled.h1`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const TabSection = styled.div`
  display: flex;
  gap: 24px;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${({ active }) => (active ? semanticColors.text.primary : semanticColors.text.tertiary)};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  position: relative;
  padding: 0;

  ${({ active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${semanticColors.text.primary};
    }
  `}
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const PageFilter = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : colors.grey[400]};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  margin-right: 12px;
`;

export const SortButton = styled.button`
  background: none;
  border: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
`;

export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  margin-bottom: 40px;
`;

export const InfoIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid ${semanticColors.text.tertiary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${semanticColors.text.tertiary};
  font-size: 12px;
  flex-shrink: 0;
`;

export const InfoText = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const InputSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 20px;
  margin-bottom: 40px;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${semanticColors.background.cardDark};
  border-radius: 12px;
  padding: 12px 16px;
`;

export const PageInput = styled.input<{ active?: boolean; inputLength?: number }>`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  width: ${props => props.inputLength ? `${Math.max(40, props.inputLength * 12 + 10)}px` : '40px'};
  text-align: center;
  caret-color: ${colors.neongreen};
  transition: width 0.2s ease;

  ${({ active }) =>
    active &&
    `
    background-color: ${colors.grey[400]};
    border-radius: 4px;
  `}
`;

export const Separator = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
`;

export const PageLabel = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const ConfirmButton = styled.button<{ active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : colors.grey[400]};
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Keyboard = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.grey[200]};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const KeyboardRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const KeyButton = styled.button`
  flex: 1;
  height: 48px;
  background-color: ${colors.white};
  border: none;
  border-radius: 8px;
  color: ${colors.black.main};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: ${colors.grey[100]};
  }

  &:last-child {
    background-color: ${colors.grey[300]};
    color: ${semanticColors.button.fill.primary};
  }
`;
