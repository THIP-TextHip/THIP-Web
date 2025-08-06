import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const GroupBookSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 94%;
  gap: 24px;
  background: ${colors.darkgrey.dark};
  margin: 10px 20px 0 20px;
  padding: 20px;
  border-radius: 16px;
`;

export const GroupBookSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const GroupBookSectionTitle = styled.h3`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;

export const GroupBookSectionChevron = styled.img`
  width: 24px;
  height: 24px;
`;

export const GroupBookSectionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BookInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const BookCover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  gap: 20px;
  color: ${colors.white};
  margin: auto 0;
`;

export const BookTitle = styled.h4`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  margin: 0;
`;

export const BookAuthor = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const BookDescription = styled.div`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};

  > p {
    margin-top: 4px;
    color: ${colors.grey[200]};
    font-weight: ${typography.fontWeight.regular};
  }
`;
