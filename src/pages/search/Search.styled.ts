import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: ${colors.black.main};
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  max-width: 767px;
  margin: 0 auto;
  color: ${colors.white};
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight['bold']};
  padding: 16px 20px;
  background: ${colors.black.main};
  z-index: 1;
`;

export const SearchBarContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background: ${colors.black.main};
`;

export const Content = styled.div`
  margin-top: 132px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
`;
