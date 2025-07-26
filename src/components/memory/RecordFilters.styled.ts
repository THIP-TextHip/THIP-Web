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
  gap: 16px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : colors.grey[400]};
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
  line-height: 24px;

  &:hover {
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
