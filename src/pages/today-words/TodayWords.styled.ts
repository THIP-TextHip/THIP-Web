import styled from '@emotion/styled';
import { semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${semanticColors.background.primary};
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 96px;
  padding-bottom: 100px;
  box-sizing: border-box;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;
