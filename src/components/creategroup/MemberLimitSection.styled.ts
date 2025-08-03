import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const MemberLimitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const MemberWheelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MemberText = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;
