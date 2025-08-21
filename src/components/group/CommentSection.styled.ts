import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  gap: 12px;
  background: ${colors.darkgrey.dark};
  margin: 20px 20px 0 20px;
  padding: 16px 12px;
  border-radius: 12px;
  cursor: pointer;
  
  &:focus-visible {
    outline: 2px solid ${colors.purple.main};
    outline-offset: 2px;
  }
`;

export const CommentSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentSectionTitle = styled.h3`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const CommentSectionChevron = styled.img`
  width: 24px;
  height: 24px;
  margin-right: -8px;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;
