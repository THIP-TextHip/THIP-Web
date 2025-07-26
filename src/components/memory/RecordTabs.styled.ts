import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 28px;
  margin-bottom: 28px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  color: ${({ active }) => (active ? semanticColors.text.primary : semanticColors.text.tertiary)};
  font-size: ${typography.fontSize.lg};
  font-weight: ${({ active }) =>
    active ? typography.fontWeight.semibold : typography.fontWeight.medium};
  cursor: pointer;
  position: relative;

  ${({ active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${semanticColors.text.primary};
    }
  `}
`;
