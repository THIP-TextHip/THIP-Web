import styled from '@emotion/styled';

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  z-index: 110;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-main-black);
  width: 100%;
  max-width: 767px;
  height: 100vh;
`;
