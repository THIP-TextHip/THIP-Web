import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '@/styles/global/global';

export const RecordSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 12px;
  background: ${colors.darkgrey.dark};
  margin: 20px 20px 0 20px;
  padding: 16px 12px;
  border-radius: 12px;
`;

export const RecordSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const RecordSectionTitle = styled.h3`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const RecordSectionChevron = styled.img`
  width: 24px;
  height: 24px;
  margin-right: -8px;
`;

export const RecordSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CurrentPage = styled.div`
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 7px;
  background-color: ${colors.grey[300]};
  border-radius: 4px;
  overflow: hidden;
  margin-top: -4px;
  margin-bottom: 20px;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${colors.purple.main};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const PercentText = styled.span`
  color: ${colors.purple.main};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
`;

export const ProgressText = styled.span`
  color: ${colors.purple.main};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
`;
