import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

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

export const HotTopicSectionTitle = styled.h3`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;

export const HotTopicSectionChevron = styled.img`
  width: 24px;
  height: 24px;
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
