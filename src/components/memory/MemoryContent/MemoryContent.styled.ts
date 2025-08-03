import styled from '@emotion/styled';
import { semanticColors, typography } from '../../../styles/global/global';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const FixedSection = styled.div`
  position: sticky;
  top: 0;
  background-color: ${semanticColors.background.primary};
  z-index: 5;
  padding: 20px 0 16px 0;
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 56px;
`;

export const ScrollableSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DevButton = styled.button`
  position: fixed;
  top: 100px;
  right: 20px;
  background: ${semanticColors.button.fill.primary};
  color: ${semanticColors.text.primary};
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: ${typography.fontSize.xs};
  cursor: pointer;
  z-index: 100;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
