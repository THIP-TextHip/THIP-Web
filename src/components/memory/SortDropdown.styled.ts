import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${semanticColors.background.card};
  border-radius: 8px;
  padding: 8px 0;
  min-width: 120px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const DropdownItem = styled.button<{ selected: boolean }>`
  width: 100%;
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  color: ${({ selected }) =>
    selected ? semanticColors.text.point.green : semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${({ selected }) =>
    selected ? typography.fontWeight.semibold : typography.fontWeight.regular};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${semanticColors.background.cardDark};
  }
`;
