import styled from '@emotion/styled';
import { semanticColors, typography } from '../../../../styles/global/global';

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 24px;
`;

export const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${semanticColors.background.card};
  border: 1px solid #3d3d3d;
  flex-shrink: 0;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

export const UserName = styled.div`
  color: ${semanticColors.text.primary};
  font-size: 12px;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 5px;
`;

export const TimeStamp = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: 11px;
  font-weight: ${typography.fontWeight.regular};
`;

export const MessageContent = styled.div`
  color: ${semanticColors.text.primary};
  font-size: 14px;
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
`;

export const DateDividerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const DateDivider = styled.div`
  background-color: ${semanticColors.background.cardDark};
  color: ${semanticColors.text.point.green};
  font-size: 14px;
  font-weight: ${typography.fontWeight.regular};
  padding: 15px 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  width: fit-content;
`;

export const Separator = styled.div`
  width: calc(100% + 40px);
  height: 10px;
  background-color: #282828;
  margin: 20px -20px;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;
