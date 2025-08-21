import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../styles/global/global';

export const TextAreaBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea<{ readOnly?: boolean }>`
  width: 100%;
  min-height: 100px;
  background-color: ${props => (props.readOnly ? '#f5f5f5' : semanticColors.background.primary)};
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  resize: none;
  outline: none;
  border: none;
  overflow-y: auto;
  cursor: ${props => (props.readOnly ? 'not-allowed' : 'text')};
  padding: 0;
  caret-color: ${colors.neongreen};

  /* 얇은 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${semanticColors.text.ghost};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${semanticColors.text.tertiary};
  }

  /* Firefox 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: ${semanticColors.text.ghost} transparent;

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const CharacterCount = styled.div`
  align-self: flex-end;
  margin-top: 12px;
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;
