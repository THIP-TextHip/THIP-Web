import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const HotTopicSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 12px;
  background: ${colors.darkgrey.dark};
  margin: 20px 20px 80px 20px;
  padding: 16px 12px;
  border-radius: 12px;
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
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const HotTopicContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`;

export const SlideContainer = styled.div`
  display: flex;
  touch-action: pan-x;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const SlideItem = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding-right: 0;
`;

export const HotTopicText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  margin: 0 0 10px 0;
`;

export const VoteOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VoteOption = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 12px;
  background: ${colors.darkgrey.main};
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.grey[400]};
  }
`;

export const VoteOptionNumber = styled.span`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const VoteOptionText = styled.span`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
`;

export const PaginationDot = styled.div<{ active?: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? colors.white : colors.grey[300])};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

export const EmptyVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyVoteTitle = styled.h4`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;
