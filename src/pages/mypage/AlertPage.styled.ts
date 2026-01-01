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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 24px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

export const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const SettingTitle = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

export const SubSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SettingDesc = styled.div`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
`;

export const Toggle = styled.div<{ isActive: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => (props.isActive ? colors.purple.main : colors.grey[300])};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const ToggleSlider = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${colors.white};
  position: absolute;
  top: 2px;
  left: ${props => (props.isActive ? '22px' : '2px')};
  transition: left 0.3s ease;
`;
