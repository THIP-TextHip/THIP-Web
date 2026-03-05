import styled from '@emotion/styled';
import { colors } from '@/styles/global/global';

export const Container = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
`;

export const LoadingScreen = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  min-height: 100dvh;
  background-color: ${colors.black.main};
`;
