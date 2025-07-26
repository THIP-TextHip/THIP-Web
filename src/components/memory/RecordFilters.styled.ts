import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 16px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : semanticColors.background.card};
  border: none;
  border-radius: 20px;
  padding: 7px 12px;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    margin-right: -4px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${semanticColors.background.card};
  border-radius: 50px;
  padding: 5px 12px;
  width: 100%;
`;

export const InputWrapper = styled.div<{ hasValue: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${semanticColors.background.card};
  border: 1px solid ${semanticColors.button.line.white};
  border-radius: 8px;
  padding: 2.5px 6px;
  min-width: 45px;
  transition: width 0.2s ease;
`;

export const PageInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  width: 100%;
  min-width: 36px;
  text-align: center;
  caret-color: ${colors.neongreen};

  &::placeholder {
    color: ${semanticColors.text.tertiary};
  }

  /* 숫자 입력 스피너 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const Separator = styled.span`
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const PageLabel = styled.span`
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const ResetButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : colors.grey[300]};
  border: none;
  border-radius: 50px;
  padding: 2px 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    filter: ${({ active }) => (active ? 'brightness(0) invert(1)' : 'none')};
  }

  &:hover {
    background-color: ${({ active }) => (active ? 'rgba(104, 104, 255, 0.8)' : colors.grey[200])};
  }
`;

export const ConfirmButton = styled.button`
  border-radius: 50px;
  padding: 2px 9px;
  border: none;
  background-color: ${semanticColors.button.fill.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
`;

export const SortButton = styled.button`
  background: none;
  border: none;
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DropdownIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${semanticColors.text.tertiary};
`;
