import styled from '@emotion/styled';
import { semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${semanticColors.background.primary};
  min-width: 360px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 96px 20px 100px 20px;
  box-sizing: border-box;
`;
