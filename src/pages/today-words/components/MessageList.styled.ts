import styled from '@emotion/styled';
import { semanticColors, typography } from '../../../styles/global/global';

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 20px;
`;

export const TopBorderText = styled.div`
  color: #888;
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px dashed #3d3d3d;
  margin-bottom: 20px;
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
