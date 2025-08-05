import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

// 기록장 섹션
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

// 오늘의 한마디 섹션
export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 94%;
  gap: 24px;
  background: ${colors.darkgrey.dark};
  margin: 20px 20px 0 20px;
  padding: 20px;
  border-radius: 16px;
`;

export const CommentSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentText = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  margin: 0;
`;

// 모임방의 뜨거운 감자 섹션
export const HotTopicSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 94%;
  gap: 24px;
  background: ${colors.darkgrey.dark};
  margin: 20px 20px 80px 20px;
  padding: 20px;
  border-radius: 16px;
`;

export const HotTopicSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const HotTopicContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const HotTopicText = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  margin: 0;
`;

export const VoteOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const VoteOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${colors.grey[400]};
  border-radius: 40px;
`;

export const VoteOptionNumber = styled.span`
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const VoteOptionText = styled.span`
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

export const PaginationDot = styled.div<{ active?: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? colors.white : colors.grey[300])};
`;
