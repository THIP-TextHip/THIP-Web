import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 56px;
  padding-bottom: 155px;
  background-color: var(--color-black-main);
`;

export const EmptyState = styled.div`
  display: flex;
  height: 473px;
  padding: 32px 0 20px 0;
  justify-content: center;
  align-items: center;

  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  letter-spacing: 0.018px;
`;
