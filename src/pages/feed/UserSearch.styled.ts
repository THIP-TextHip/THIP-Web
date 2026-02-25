import { colors } from '@/styles/global/global';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  background: ${colors.black.main};
`;

export const SearchBarContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background: ${colors.black.main};
`;

export const Content = styled.div`
  margin-top: 132px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: ${colors.white};
  font-size: 16px;
`;
