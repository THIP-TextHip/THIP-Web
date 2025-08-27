import { colors } from '@/styles/global/global';
import styled from '@emotion/styled';

export const Overlay = styled.div<{ $whiteBg?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 767px;
  min-width: 320px;
  padding-top: 56px;
  min-height: 100vh;
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
