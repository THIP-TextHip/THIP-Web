import styled from '@emotion/styled';
import { semanticColors, typography } from '../../../styles/global/global';

export const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${semanticColors.background.cardDark};
  padding: 10px 20px;
  display: flex;
  align-items: flex-end;
`;

export const MessageInputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${semanticColors.background.card};
  border-radius: 20px;
  padding-right: 8px;
`;

export const MessageInput = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  padding: 10px 13px;
  color: ${semanticColors.text.primary};
  font-size: 14px;
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  line-height: 1.4;
  resize: none;
  outline: none;
  min-height: 20px;
  max-height: 100px;
  overflow-y: auto;

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendButton = styled.button<{ active: boolean }>`
  width: 42px;
  height: 28px;
  border-radius: 20px;
  border: none;
  background-color: ${({ active }) => (active ? semanticColors.button.fill.primary : '#888888')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s;

  img {
    width: 24px;
    height: 24px;
    opacity: ${({ active }) => (active ? 1 : 0.5)};
  }

  &:disabled {
    cursor: default;
  }
`;
