import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const PageRangeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PageInputContainer = styled.div<{ hasError?: boolean }>`
  width: 100%;
  height: 56px;
  background-color: ${semanticColors.background.card};
  border: ${props => (props.hasError ? '1px solid #FF9496' : 'none')};
  border-radius: 16px;
  padding: 18px 52px 18px 20px;
  display: flex;
  align-items: center;
  position: relative;

  &:focus-within {
    border: ${props =>
      props.hasError ? '1px solid #FF9496' : `1px solid ${semanticColors.button.fill.primary}`};
  }
`;

export const PageInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  width: auto;
  min-width: 20px;
  flex-shrink: 0;

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const PageSuffix = styled.span`
  color: ${semanticColors.text.ghost};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  margin-left: 2px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
    opacity: 0.6;
  }

  &:hover img {
    opacity: 1;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff9496;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  margin-top: 8px;
`;
