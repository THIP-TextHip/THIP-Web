import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

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

export const CommentSectionTitle = styled.h3`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;

export const CommentSectionChevron = styled.img`
  width: 24px;
  height: 24px;
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
