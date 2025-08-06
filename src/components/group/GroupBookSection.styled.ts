import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '@/styles/global/global';

export const GroupBookSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  background: ${colors.darkgrey.dark};
  margin: 0 20px 0 20px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
`;

export const BookTitle = styled.h3`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
  margin-right: 12px;
`;

export const BookAuthor = styled.span`
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

export const ChevronIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: -8px;
`;
