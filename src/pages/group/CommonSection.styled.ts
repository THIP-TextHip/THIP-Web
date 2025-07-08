import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Section = styled.div<{ showDivider?: boolean }>`
  margin-bottom: 32px;
  ${({ showDivider }) =>
    showDivider &&
    `
    border-bottom: 1px solid ${colors.darkgrey.dark};
  `}
`;

export const SectionTitle = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 12px;
`;
