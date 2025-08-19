import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, ${props => (props.isOpen ? '0.5' : '0')});
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: background-color 0.3s ease;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
`;

export const BottomSheet = styled.div<{ isOpen: boolean }>`
  width: 100%;
  max-width: 540px;
  min-width: 360px;
  background: ${colors.darkgrey.main};
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  min-height: 50vh;
  transform: translateY(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 20px;
  padding-bottom: 10px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  color: ${colors.white};
  font-size: 20px;
  font-weight: ${typography.fontWeight.bold};
  line-height: 24px;
  margin: 0;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const InputSection = styled.div`
  padding: 20px;
  border-top: 1px solid ${colors.grey[400]};
  flex-shrink: 0;
  background: ${colors.darkgrey.main};
`;
