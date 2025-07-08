import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '../../../../styles/global/global';

export const WheelContainer = styled.div`
  display: block;
  height: 100%;
  overflow: visible;

  &.wheel--perspective-center .wheel__inner {
    perspective-origin: 50% 50%;
  }
`;

export const WheelInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 20%;
  width: 100%;
  position: relative;
  z-index: 2;
`;

export const WheelSlides = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

export const WheelShadowTop = styled.div<{ radius: number }>`
  background: linear-gradient(to bottom, ${colors.black.main} 0%, rgba(18, 18, 18, 0.4) 100%);
  left: 0;
  height: calc(40% + 2px);
  width: 100%;
  position: relative;
  margin-top: -2px;
  z-index: 5;
  transform: translateZ(${({ radius }) => radius}px);
  cursor: pointer;
`;

export const WheelShadowBottom = styled.div<{ radius: number }>`
  background: linear-gradient(to bottom, rgba(18, 18, 18, 0.4) 0%, ${colors.black.main} 100%);
  left: 0;
  height: calc(40% + 2px);
  width: 100%;
  position: relative;
  margin-top: 2px;
  z-index: 5;
  border-bottom: none;
  transform: translateZ(${({ radius }) => radius}px);
  cursor: pointer;
`;

export const WheelLabel = styled.div<{ radius: number }>`
  font-weight: ${typography.fontWeight.regular};
  font-size: 12px;
  line-height: 1;
  margin-top: 1px;
  margin-left: 5px;
  color: ${semanticColors.text.primary};
  transform: translateZ(${({ radius }) => radius}px);
`;

export const WheelSlide = styled.div<{ isSelected?: boolean }>`
  align-items: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  font-weight: ${typography.fontWeight.regular};
  height: 32px;
  width: 100%;
  position: absolute;
  justify-content: center;
  color: ${semanticColors.text.primary};
  font-size: 12px;
  background-color: ${({ isSelected }) => (isSelected ? colors.darkgrey.main : 'transparent')};
  border-radius: ${({ isSelected }) => (isSelected ? '4px' : '0')};
  transition: all 0.2s ease;
`;
