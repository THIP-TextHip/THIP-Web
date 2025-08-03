import styled from '@emotion/styled';
import { semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${semanticColors.background.primary};
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const FixedHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${semanticColors.background.primary};
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 100px; /* AddButton 공간 확보 */

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${semanticColors.text.ghost};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${semanticColors.text.tertiary};
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;
