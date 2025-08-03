import { useEffect } from 'react';
import { usePopupStore } from '@/stores/usePopupStore';
import ConfirmModal from './ConfirmModal';
import MoreMenu from './MoreMenu';
import Snackbar from './Snackbar';
import styled from '@emotion/styled';
import type { ConfirmModalProps, MoreMenuProps, SnackbarProps } from '@/stores/usePopupStore';

const PopupContainer = () => {
  const { popupType, popupProps, isOpen } = usePopupStore();

  useEffect(() => {
    if (isOpen && popupType !== 'snackbar') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, popupType]);

  if (!isOpen || !popupType) return null;

  const renderPopup = () => {
    switch (popupType) {
      case 'confirm-modal': {
        return (
          <Wrapper>
            <ConfirmModal {...(popupProps as ConfirmModalProps)} />
          </Wrapper>
        );
      }
      case 'moremenu': {
        return (
          <Wrapper>
            <MoreMenu {...(popupProps as MoreMenuProps)} />
          </Wrapper>
        );
      }
      case 'snackbar':
        return (
          <SnackbarWrapper>
            <Snackbar {...(popupProps as SnackbarProps)} />
          </SnackbarWrapper>
        );
      default:
        return null;
    }
  };

  return <>{renderPopup()}</>;
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  background-color: rgba(18, 18, 18, 0.1);
  backdrop-filter: blur(2.5px);
  z-index: 1000;
`;

const SnackbarWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none; /* 배경 클릭 가능 */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  z-index: 1000;

  & > div {
    pointer-events: auto; /* Snackbar 자체 클릭 가능 */
  }
`;

export default PopupContainer;
