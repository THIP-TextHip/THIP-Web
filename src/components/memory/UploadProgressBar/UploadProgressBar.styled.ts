import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '@/styles/global/global';

export const Container = styled.div`
  padding: 16px 0px;
  background-color: ${semanticColors.background.primary};
`;

export const ProgressText = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: 12px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 7px;
  background-color: ${colors.grey[300]};
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${semanticColors.text.point.green};
  border-radius: 3px;
  transition: width 0.1s ease-out;
`;
