import { useEffect } from 'react';
import { usePopupStore } from '@/stores/popupStore';
import ConfirmModal from './ConfirmModal';
import MoreMenu from './MoreMenu';
import Snackbar from './Snackbar';
import ReplyModal from './ReplyModal';
import CountingBar from './CountingBar';
import type {
  ConfirmModalProps,
  MoreMenuProps,
  SnackbarProps,
  ReplyModalProps,
  CountingBarProps,
} from '@/stores/popupStore';
import { Wrapper, SnackbarWrapper, PassThroughOverlay } from './PopupContainer.styled';

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
          <Wrapper onClick={closePopup}>
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

export default PopupContainer;
