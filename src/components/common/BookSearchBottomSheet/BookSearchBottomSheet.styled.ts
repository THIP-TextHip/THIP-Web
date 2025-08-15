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
  color: ${({ active }) => (active ? colors.white : colors.grey[300])};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 5px;
    right: 5px;
    height: 2px;
    background-color: ${({ active }) => (active ? colors.white : 'transparent')};
    transition: background-color 0.2s ease;
  }

  &:hover {
    color: ${colors.white};
  }
`;

export const BookListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.white};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.grey[100]};
  }
`;

export const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BookItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 2px;
  background-color: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export const BookCover = styled.div`
  width: 45px;
  height: 60px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 8px;
  border: 1px solid ${colors.grey[300]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BookInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const BookTitle = styled.h3`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.white};
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// 로딩 상태 스타일
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const LoadingText = styled.p`
  color: ${colors.grey[300]};
  font-size: ${typography.fontSize.base};
  margin: 0;
`;

// 에러 상태 스타일
export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const ErrorText = styled.p`
  color: ${colors.red};
  font-size: ${typography.fontSize.base};
  margin: 0;
  text-align: center;
`;

// 빈 상태 스타일
export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const EmptyText = styled.p`
  color: ${colors.grey[300]};
  font-size: ${typography.fontSize.base};
  margin: 0;
  text-align: center;
`;
