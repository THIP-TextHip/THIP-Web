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
  height: 48px;
  background-color: ${semanticColors.background.cardDark};
  border: ${props => (props.hasError ? '1px solid #FF9496' : 'none')};
  border-radius: 12px;
  padding: 18px 52px 18px 20px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
`;

export const PageInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  width: 30px;
  padding: 0;
  margin: 0;

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const PageSuffix = styled.span`
  color: ${semanticColors.text.ghost};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  margin: 0;
  padding: 0;
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
    width: 24px;
    height: 24px;
  }

  &:hover img {
    opacity: 1;
  }
`;

export const ErrorMessage = styled.div`
  color: ${semanticColors.text.warning};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  margin-top: -5px;
  margin-left: 4px;
`;
