import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 12px;
`;

export const FilterButton = styled.button<{ active: boolean; disabled?: boolean }>`
  background-color: ${({ active, disabled }) => {
    if (disabled) return colors.grey[400];
    return active ? semanticColors.button.fill.primary : colors.grey[400];
  }};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: ${({ disabled }) => (disabled ? colors.grey[300] : semanticColors.text.primary)};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
`;

export const SortButton = styled.button`
  background: none;
  border: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DropdownIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${semanticColors.text.primary};
`;
