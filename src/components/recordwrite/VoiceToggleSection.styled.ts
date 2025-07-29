import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleLabel = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
`;

export const ToggleSwitch = styled.div<{ active: boolean }>`
  width: 48px;
  height: 28px;
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : semanticColors.background.card};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const ToggleSlider = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${semanticColors.text.primary};
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: ${({ active }) => (active ? '24px' : '4px')};
  transition: left 0.3s;
`;
