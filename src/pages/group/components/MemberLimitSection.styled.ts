import styled from '@emotion/styled';
import { typography, semanticColors } from '../../../styles/global/global';

export const MemberLimitContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MemberNumber = styled.span`
  color: ${semanticColors.text.primary};
  font-size: 32px;
  font-weight: ${typography.fontWeight.semibold};
`;

export const MemberText = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
`;
