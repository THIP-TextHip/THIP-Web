import styled from '@emotion/styled';
import { semanticColors } from '../../../styles/global/global';

export const AddButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 19.5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${semanticColors.background.card};
  border: 2px solid ${semanticColors.button.line.pointNeongreen};
  cursor: pointer;
  z-index: 100;

  img {
    width: 24px;
    height: 24px;
  }

  @media (min-width: 768px) {
    right: calc(50% - 383px + 20px);
  }
`;
