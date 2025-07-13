import styled from '@emotion/styled';
import { semanticColors, typography } from '../../../styles/global/global';

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px;
  text-align: center;
`;

export const EmptyMessage = styled.div`
  color: ${semanticColors.text.primary};
  font-size: 18px;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
`;

export const EmptySubMessage = styled.div`
  color: ${semanticColors.text.secondary};
  font-size: 14px;
  font-weight: ${typography.fontWeight.regular};
`;
