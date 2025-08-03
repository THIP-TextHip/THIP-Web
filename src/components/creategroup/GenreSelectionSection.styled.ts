import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const GenreButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const GenreButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : colors.grey[400]};
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
`;
