import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

export const SearchBox = styled.div<{ hasSelectedBook?: boolean }>`
  display: flex;
  justify-content: center;
  background-color: ${semanticColors.background.primary};
  border: ${({ hasSelectedBook }) => (hasSelectedBook ? 'none' : `1px solid ${colors.grey[300]}`)};
  border-radius: 12px;
  padding: ${({ hasSelectedBook }) => (hasSelectedBook ? '0' : '12px 16px')};
  gap: 16px;
  cursor: ${({ hasSelectedBook }) => (hasSelectedBook ? 'default' : 'pointer')};
  transition: background-color 0.2s;
  align-items: ${({ hasSelectedBook }) => (hasSelectedBook ? 'flex-end' : 'center')};

  span {
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.medium};
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const SelectedBookContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
`;

export const SelectedBookCover = styled.div`
  width: 60px;
  height: 80px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${semanticColors.background.card};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SelectedBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const SelectedBookTitle = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 1.4;
`;

export const SelectedBookAuthor = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const ChangeButton = styled.button`
  background-color: ${semanticColors.button.fill.black};
  border: 1px solid ${colors.grey[300]};
  border-radius: 20px;
  padding: 8px 12px;
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  flex-shrink: 0;
`;
