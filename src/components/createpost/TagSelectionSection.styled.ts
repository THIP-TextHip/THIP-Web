import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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

  &:hover {
    background-color: ${({ active }) =>
      active ? semanticColors.button.fill.background : colors.grey[300]};
  }
`;

export const SubTagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

export const SubTagButton = styled.button<{ active: boolean; disabled: boolean }>`
  background-color: transparent;
  border: 1px solid
    ${({ active }) => (active ? semanticColors.button.fill.primary : colors.grey[300])};
  border-radius: 20px;
  padding: 8px 12px;
  color: ${({ active }) =>
    active ? semanticColors.text.point.purple : semanticColors.text.secondary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    border-color: ${semanticColors.button.fill.primary};
    background-color: ${({ active }) => (active ? 'transparent' : 'rgba(104, 104, 255, 0.1)')};
  }
`;

export const TagCount = styled.div`
  align-self: flex-end;
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

export const SelectedTagsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SelectedTagsTitle = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const SelectedTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SelectedTagItem = styled.button`
  background-color: transparent;
  border: 1px solid ${colors.grey[200]};
  border-radius: 20px;
  padding: 6px 12px;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(104, 104, 255, 0.1);
  }
`;
