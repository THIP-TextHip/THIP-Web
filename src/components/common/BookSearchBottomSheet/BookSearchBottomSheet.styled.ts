import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '../../../styles/global/global';

export const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

export const BottomSheetContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${colors.darkgrey.main};
  border-radius: 20px 20px 0 0;
  z-index: 1001;
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.3s ease;
  max-height: 50vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 50vh;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.darkgrey.dark};
  border-radius: 12px;
  padding: 8px 12px;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  flex-shrink: 0;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  flex: 1;
  caret-color: ${semanticColors.text.point.green};

  &::placeholder {
    color: ${semanticColors.text.ghost};
    font-size: ${typography.fontSize.base};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 34px;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

export const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${({ active }) => (active ? semanticColors.text.primary : semanticColors.text.ghost)};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  padding: 8px 0 8px 0;
  cursor: pointer;
  position: relative;

  ${({ active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${semanticColors.text.primary};
    }
  `}
`;

export const BookListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: -16px;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.grey[400]};
    border-radius: 2px;
    margin-right: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.white};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.grey[200]};
  }

  /* Firefox 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: ${colors.white} ${colors.grey[400]};
`;

export const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const BookItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.grey[400]};
  cursor: pointer;
`;

export const BookCover = styled.div`
  width: 45px;
  height: 60px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${semanticColors.background.card};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BookTitle = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
`;
