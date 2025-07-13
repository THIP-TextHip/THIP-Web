import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../../styles/global/global';

export const DatePickerContainer = styled.div`
  color: ${semanticColors.text.primary};
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 30px;
  width: 100%;
`;

export const DateGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  justify-content: center;
`;

export const WheelContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 150px;
`;

export const WheelSelector = styled.div`
  position: relative;
  height: 150px;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 56px;
    height: 46px;
    background-color: ${colors.grey[400]};
    border-radius: 8px;
    z-index: 1;
    pointer-events: none;
  }
`;

export const WheelList = styled.div<{ offset: number }>`
  position: relative;
  width: 100%;
  z-index: 2;
`;

export const WheelItem = styled.div<{ isSelected: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ isSelected }) => (isSelected ? '20px' : '16px')};
  font-weight: ${({ isSelected }) =>
    isSelected ? typography.fontWeight.bold : typography.fontWeight.medium};
  color: ${({ isSelected }) =>
    isSelected ? semanticColors.text.primary : semanticColors.text.tertiary};
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${semanticColors.text.secondary};
  }
`;

export const DateUnitText = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  margin-right: 6px;
`;

export const SeparatorText = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const InfoText = styled.div`
  text-align: end;
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  margin-top: 20px;
`;

export const ErrorText = styled.div`
  text-align: end;
  color: ${semanticColors.text.warning};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  margin-top: 20px;
`;
