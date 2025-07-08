import styled from '@emotion/styled';
import { typography, semanticColors } from '../../../styles/global/global';

export const DatePickerContainer = styled.div`
  color: ${semanticColors.text.primary};
`;

export const DatePickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateText = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
`;
