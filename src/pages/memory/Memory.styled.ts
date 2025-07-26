import styled from '@emotion/styled';
import { semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${semanticColors.background.primary};
  min-height: 100vh;
  position: relative;
`;
