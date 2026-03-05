import styled from '@emotion/styled';

export const HeaderWrapper = styled.div`
  background-color: var(--color-black-main);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 767px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
`;

export const LogoImg = styled.img`
  height: 24px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
