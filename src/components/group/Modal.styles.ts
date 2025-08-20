import { colors } from '@/styles/global/global';
import styled from '@emotion/styled';

export const Overlay = styled.div<{ $whiteBg?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ $whiteBg }) => ($whiteBg ? 'white' : colors.black.main)};
  z-index: 110;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.black.main};
  width: 100%;
  max-width: 767px;
  height: 100vh;
`;
