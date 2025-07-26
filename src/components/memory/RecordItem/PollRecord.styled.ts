import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

export const PollSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PollQuestion = styled.div`
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
`;

export const PollOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PollOption = styled.div<{ isHighest?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ isHighest }) =>
    isHighest ? semanticColors.button.fill.background : semanticColors.background.card};
  border-radius: 12px;
  position: relative;
  overflow: hidden;
`;

export const PollContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  position: relative;
  z-index: 2;
`;

export const PollNumber = styled.span<{ isHighest?: boolean }>`
  color: ${({ isHighest }) =>
    isHighest ? semanticColors.text.point.green : semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  min-width: 12px;
`;

export const PollText = styled.span<{ isHighest?: boolean }>`
  color: ${({ isHighest }) =>
    isHighest ? semanticColors.text.point.green : semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  flex: 1;
`;

export const PollPercentage = styled.span<{ isHighest?: boolean }>`
  color: ${({ isHighest }) =>
    isHighest ? semanticColors.text.point.green : semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

export const PollBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: 12px;
  overflow: hidden;
  z-index: 1;
`;

export const PollBarFill = styled.div<{
  percentage: number;
  isHighest?: boolean;
  animate: boolean;
  delay: number;
}>`
  height: 100%;
  background-color: ${({ isHighest }) =>
    isHighest ? semanticColors.button.fill.primary : colors.grey[300]};
  width: ${({ animate, percentage }) => (animate ? `${percentage}%` : '0%')};
  transition: width 1.2s ease-out;
  transition-delay: ${({ delay }) => delay}ms;
`;
