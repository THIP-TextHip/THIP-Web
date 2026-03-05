import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 20px;
  margin: 76px 0 20px 0;
`;

export const Tab = styled.button<{ selected: boolean }>`
  padding: 8px 12px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) => (selected ? colors.purple.main : colors.darkgrey.main)};
  color: ${colors.white};
  cursor: pointer;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 20px 20px;
  width: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NotificationCard = styled.div<{ read: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${colors.darkgrey.dark};
  border-radius: 12px;
  padding: 16px;
  color: ${colors.grey[300]};
  position: relative;
  width: 100%;
  opacity: ${({ read }) => (read ? '0.5' : '1')};
  cursor: pointer;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
`;

export const Badge = styled.span`
  flex-shrink: 0;
  color: ${colors.grey[100]};
  border-radius: 40px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  padding: 4px 10px;
  border: 1px solid ${colors.grey[200]};
  white-space: nowrap;
`;

export const Title = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
`;

export const Time = styled.div`
  flex-shrink: 0;
  font-size: ${typography.fontSize['2xs']};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[200]};
  white-space: nowrap;
`;

export const Description = styled.div`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[200]};
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EmptyState = styled.div`
  margin-top: 300px;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  padding: 40px 0px;
  text-align: center;
  color: ${colors.white};
`;

export const UnreadDot = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 6px;
  height: 6px;
  background-color: #ff9496;
  border-radius: 50%;
`;

export const Sentinel = styled.div`
  width: 100%;
  height: 1px;
`;
