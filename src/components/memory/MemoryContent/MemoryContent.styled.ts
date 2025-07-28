import styled from '@emotion/styled';
import { semanticColors, colors, typography } from '../../../styles/global/global';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
  padding-bottom: 100px;
`;

export const DevButton = styled.button`
  background-color: ${colors.red};
  color: ${semanticColors.text.primary};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  margin: 16px 0;
  align-self: flex-start;
  z-index: 1000;

  &:hover {
    opacity: 0.8;
  }
`;
