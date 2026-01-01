import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 136px;
  padding-bottom: 125px; //이전 76px
  background-color: var(--color-black-main);
`;

export const EmptyState = styled.div`
  display: flex;
  min-height: calc(100% - 75px);
  justify-content: center;
  align-items: center;
  margin-top: 150px;

  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  letter-spacing: 0.018px;
`;
