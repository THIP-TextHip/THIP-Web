import styled from '@emotion/styled';
import { semanticColors, colors, typography } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${semanticColors.background.primary};
  min-height: 100vh;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
  padding-bottom: 100px;
`;

export const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
`;

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

export const DevButton = styled.button`
  background-color: ${colors.red};
  color: ${semanticColors.text.primary};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  margin: 16px 0;
  align-self: flex-start;
  z-index: 1000;

  &:hover {
    opacity: 0.8;
  }
`;
