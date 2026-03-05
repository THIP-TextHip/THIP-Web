import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  padding-top: 76px;
  background-color: #121212;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  gap: 30px;
  padding: 40px 20px 105px 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${colors.darkgrey.dark};
`;

export const ContentTitle = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

export const ContentText = styled.div`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;

  .danger {
    color: #ff9496;
  }
`;

export const CheckSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.grey[200]};
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

export const CheckLabel = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 24px;
`;

export const WithdrawButton = styled.div<{ isActive: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 8px;
  width: 100%;
  max-width: 767px;
  min-width: 320px;
  height: 50px;
  background-color: ${props => (props.isActive ? colors.purple.main : colors.grey[300])};
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  z-index: 2000;
`;

export const ButtonText = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 24px;
`;
