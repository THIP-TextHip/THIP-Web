import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 20px;
`;

export const Title = styled.h2`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Tab = styled.span`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${colors.grey[300]};
  border-radius: 20px;
  padding: 8px 12px;
`;

export const Text = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
  line-height: 24px;
`;


