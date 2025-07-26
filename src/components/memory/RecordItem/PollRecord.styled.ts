import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

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
