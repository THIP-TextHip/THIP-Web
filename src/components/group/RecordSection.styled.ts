import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const RecordSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 94%;
  gap: 24px;
  background: ${colors.darkgrey.dark};
  margin: 10px 20px 0 20px;
  padding: 20px;
  border-radius: 16px;
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
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;

export const RecordSectionChevron = styled.img`
  width: 24px;
  height: 24px;
`;

export const RecordSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BookTitle = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const CurrentPage = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: ${colors.grey[400]};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${colors.purple.main};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const ProgressText = styled.span`
  color: ${colors.purple.main};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  min-width: 32px;
`;
