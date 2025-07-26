import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
  margin-bottom: 16px;
`;

export const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${semanticColors.text.tertiary};
  font-size: 12px;
  font-weight: ${typography.fontWeight.regular};
  flex-shrink: 0;
`;

export const InfoText = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;
