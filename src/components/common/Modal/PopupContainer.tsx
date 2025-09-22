import { useEffect } from 'react';
import { usePopupStore } from '@/stores/usePopupStore';
import ConfirmModal from './ConfirmModal';
import MoreMenu from './MoreMenu';
import Snackbar from './Snackbar';
import ReplyModal from './ReplyModal';
import CountingBar from './CountingBar';
import styled from '@emotion/styled';
import type {
  ConfirmModalProps,
  MoreMenuProps,
  SnackbarProps,
  ReplyModalProps,
  CountingBarProps,
} from '@/stores/usePopupStore';

const PopupContainer = () => {
  const { popupType, popupProps, isOpen, closePopup } = usePopupStore();

  useEffect(() => {
    if (isOpen && popupType !== 'snackbar' && popupType !== 'counting-bar') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, popupType]);

  useEffect(() => {
    if (isOpen && popupType === 'snackbar') {
      const timer = setTimeout(() => closePopup(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, popupType, closePopup]);

  if (!isOpen || !popupType) return null;

  const renderPopup = () => {
    switch (popupType) {
      case 'confirm-modal':
        return (
          <Wrapper>
            <ConfirmModal {...(popupProps as ConfirmModalProps)} onClose={closePopup} />
          </Wrapper>
        );
      case 'moremenu':
        return <MoreMenu {...(popupProps as MoreMenuProps)} onClose={closePopup} />;
      case 'reply-modal':
        return <ReplyModal {...(popupProps as ReplyModalProps)} />;
      case 'snackbar':
        return (
          <SnackbarWrapper>
            <Snackbar {...(popupProps as SnackbarProps)} />
          </SnackbarWrapper>
        );
      case 'counting-bar':
        return (
          <PassThroughOverlay>
            <CountingBar {...(popupProps as CountingBarProps)} />
          </PassThroughOverlay>
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
  background-color: rgba(18, 18, 18, 0.3);
  backdrop-filter: blur(2.5px);
  z-index: 1000;
`;

const SnackbarWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  z-index: 1000;

  & > div {
    pointer-events: auto;
  }
`;

const PassThroughOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  z-index: 1000;
`;

export default PopupContainer;
