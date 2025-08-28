import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '../../styles/global/global';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${semanticColors.background.cardDark};
  padding: 10px 20px;
`;

export const InputContainer = styled.div`
  /* display: flex;
  align-items: flex-end; */
`;

export const MessageInputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  background-color: ${semanticColors.background.card};
  border-radius: 20px;
`;

export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    flex-direction: row;
    gap: 4px;
    .notice {
      display: flex;
      flex-direction: row;
      gap: 2px;
      .userName {
        color: ${colors.neongreen};
        font-size: ${typography.fontSize.xs};
        font-weight: ${typography.fontWeight.regular};
        line-height: 24px;
      }
      .disc {
        color: ${colors.grey[200]};
        font-size: ${typography.fontSize.xs};
        font-weight: ${typography.fontWeight.regular};
        line-height: 24px;
        cursor: pointer;
      }
    }
  }
`;

export const MessageInput = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  padding: 9px 58px 9px 12px;
  color: ${semanticColors.text.primary};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  line-height: 1.4;
  resize: none;
  outline: none;
  min-height: 20px;
  height: 40px;
  max-height: 100px;
  overflow-y: auto;
  caret-color: var(--color-neongreen);

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
  position: absolute;
  right: 4px;
  bottom: 7px;
  width: 42px;
  height: 28px;
  border-radius: 20px;
  border: none;
  background-color: ${({ active }) => (active ? semanticColors.button.fill.primary : '#888888')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
