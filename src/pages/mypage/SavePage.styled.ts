import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #121212;
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  min-height: 100%;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 20px;
  gap: 8px;
  flex: 1;

  .title {
    color: ${colors.white};
    text-align: center;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 24px;
  }

  .sub-title {
    color: ${colors.grey[100]};
    text-align: center;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: normal;
  }
`;

export const BookList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  padding-top: 32px;
  margin: 0 auto;
  width: 100%;
`;

export const BookItem = styled.div`
  width: 94.8%;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid ${colors.darkgrey.dark};
  padding: 12px;

  &:last-child {
    border-bottom: none;
  }
  justify-content: space-between;
`;

export const Cover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.white};
`;

export const Subtitle = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[200]};
  margin-top: 8px;
`;

export const SaveIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
