import styled from '@emotion/styled';

export const AddButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 50%;
  transform: translateX(50%);
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  z-index: 100;

  img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    right: calc(50% - 383px + 24px);
    transform: none;
  }
`;
