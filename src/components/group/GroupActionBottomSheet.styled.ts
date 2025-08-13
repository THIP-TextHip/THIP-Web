import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const BottomSheet = styled.div<{ isOpen: boolean }>`
  background-color: ${colors.darkgrey.main};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 767px;
  min-width: 320px;
  padding: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.3s ease-in-out;
`;

export const DeleteGroupActionItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 13px 12px;
  color: ${colors.red};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.darkgrey.main};
  }
`;

export const LeaveGroupActionItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 13px 12px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.darkgrey.main};
  }
`;

export const ReportGroupActionItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 13px 12px;
  color: ${colors.red};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  text-align: left;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.darkgrey.main};
  }
`;

export const ActionItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > button:not(:last-child) {
    border-bottom: 1px solid ${colors.grey[400]};
    margin-bottom: 8px;
    padding-bottom: 20px;
  }
`;
