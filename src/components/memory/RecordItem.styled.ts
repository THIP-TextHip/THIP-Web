import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  background-color: ${semanticColors.background.card};
  border-radius: 12px;
  padding: 16px;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.grey[400]};
  margin-right: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

export const UserName = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const UserPoints = styled.span`
  color: ${semanticColors.text.point.purple};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

export const TimeStamp = styled.span`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

export const ContentSection = styled.div`
  margin-bottom: 16px;
`;

export const TextContent = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
`;

export const PollSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PollQuestion = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
`;

export const PollOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PollOption = styled.div<{ isHighest?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ isHighest }) =>
    isHighest ? semanticColors.button.fill.primary : colors.grey[400]};
  border-radius: 20px;
  padding: 8px 12px;
  position: relative;
  overflow: hidden;
`;

export const PollNumber = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  min-width: 12px;
`;

export const PollText = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  flex: 1;
`;

export const PollPercentage = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const PollBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  border-radius: 20px;
  overflow: hidden;
  z-index: 0;
`;

export const PollBarFill = styled.div<{ percentage: number; isHighest?: boolean }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: ${({ isHighest }) =>
    isHighest ? semanticColors.button.fill.primary : colors.grey[300]};
  opacity: 0.3;
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 16px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    color: ${semanticColors.text.secondary};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
  }
`;
