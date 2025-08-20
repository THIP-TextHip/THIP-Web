import styled from '@emotion/styled';
import { semanticColors } from '../../../styles/global/global';

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
