import styled from '@emotion/styled';
import { colors } from '../../../styles/global/global';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(1.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

export const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 600px;
  object-fit: contain;
  pointer-events: none;
`;

export const DotsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 1001;
`;

export const Dot = styled.div<{ isActive: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? colors.white : colors.grey[300])};
`;

export const PrevButton = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
`;

export const NextButton = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
`;

export const ButtonIcon = styled.img<{ isNext?: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${props => (props.isNext ? 'rotate(180deg)' : 'none')};
`;
