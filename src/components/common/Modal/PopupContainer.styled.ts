import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  background-color: rgba(18, 18, 18, 0.3);
  backdrop-filter: blur(2.5px);
  z-index: 1000;
`;

export const SnackbarWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  z-index: 1000;

  & > div {
    pointer-events: auto;
  }
`;

export const PassThroughOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  z-index: 1000;
`;
