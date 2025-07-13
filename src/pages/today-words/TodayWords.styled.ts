import styled from '@emotion/styled';
import { semanticColors, typography } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${semanticColors.background.primary};
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 96px;
  padding-bottom: 100px;
  box-sizing: border-box;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px;
  text-align: center;
`;

export const EmptyMessage = styled.div`
  color: ${semanticColors.text.primary};
  font-size: 18px;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
`;

export const EmptySubMessage = styled.div`
  color: ${semanticColors.text.secondary};
  font-size: 14px;
  font-weight: ${typography.fontWeight.regular};
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 20px;
`;

export const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${semanticColors.background.card};
  border: 1px solid #3d3d3d;
  flex-shrink: 0;
`;

export const UserName = styled.div`
  color: ${semanticColors.text.primary};
  font-size: 14px;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 2px;
`;

export const TimeStamp = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: 12px;
  font-weight: ${typography.fontWeight.regular};
`;

export const MessageContent = styled.div`
  color: ${semanticColors.text.primary};
  font-size: 14px;
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
  margin-left: 48px;
`;

export const DateDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #3d3d3d;
    z-index: 1;
  }

  background-color: #525252;
  color: ${semanticColors.text.primary};
  font-size: 12px;
  font-weight: ${typography.fontWeight.regular};
  padding: 8px 16px;
  border-radius: 16px;
  position: relative;
  z-index: 2;
  align-self: center;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${semanticColors.background.primary};
  padding: 16px 20px 32px 20px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  border-top: 1px solid #3d3d3d;
`;

export const MessageInput = styled.textarea`
  flex: 1;
  background-color: #282828;
  border: none;
  border-radius: 20px;
  padding: 12px 16px;
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
    color: ${semanticColors.text.tertiary};
  }

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendButton = styled.button<{ active: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) => (active ? semanticColors.button.fill.primary : '#525252')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s;

  img {
    width: 20px;
    height: 20px;
    opacity: ${({ active }) => (active ? 1 : 0.5)};
  }

  &:disabled {
    cursor: default;
  }
`;
