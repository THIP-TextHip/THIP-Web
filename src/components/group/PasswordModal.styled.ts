import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  background-color: ${colors.black.main};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2000;
`;
export const Title = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-top: 217px;
  text-align: center;
`;
export const PasswordInputContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;
export const PasswordInput = styled.input<{ hasError: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: ${colors.darkgrey.main};
  border: ${p => (p.hasError ? `1px solid ${colors.red}` : 'none')};
  outline: none;
  text-align: center;
  color: ${colors.white};
  caret-color: ${colors.neongreen};
  font-family: ${typography.fontFamily.secondary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
`;
export const ErrorMessage = styled.div`
  color: ${colors.red};
  font-size: ${typography.fontSize.sm};
  text-align: center;
  margin-top: 12px;
`;
