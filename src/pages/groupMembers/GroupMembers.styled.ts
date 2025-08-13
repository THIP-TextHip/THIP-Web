import styled from '@emotion/styled';
import { colors } from '../../styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
`;
