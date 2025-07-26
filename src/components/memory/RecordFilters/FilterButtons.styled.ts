import styled from '@emotion/styled';
import { typography, semanticColors } from '../../../styles/global/global';

export const FilterSection = styled.div`
  display: flex;
  gap: 16px;
`;

export const FilterButton = styled.button<{ active: boolean; $disabled?: boolean }>`
  background-color: ${({ active, $disabled }) => {
    if ($disabled) return semanticColors.background.card;
    return active ? semanticColors.button.fill.primary : semanticColors.background.card;
  }};
  border: none;
  border-radius: 20px;
  padding: 7px 12px;
  color: ${({ $disabled }) =>
    $disabled ? semanticColors.text.tertiary : semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  img {
    width: 24px;
    height: 24px;
    margin-right: -4px;
  }

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 0.8)};
  }
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
`;

export const SortButton = styled.button`
  background: none;
  border: none;
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DropdownIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${semanticColors.text.tertiary};
`;
