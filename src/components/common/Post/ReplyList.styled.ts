import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* min-width: 360px;
  max-width: 540px; */
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 56px;
  gap: 24px;
  flex: 1;

  .comment-group {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 360px;
  max-width: 540px;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 56px;
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
