import { useEffect } from 'react';
import { useModalStore } from '../../../stores/useModalStore';
import ConfirmModal from './ConfirmModal';
import MoreMenu from './MoreMenu';
import styled from '@emotion/styled';
import type { ConfirmModalProps, MoreMenuProps } from '../../../stores/useModalStore';

const ModalContainer = () => {
  const { modalType, modalProps, isModalOpen, closeModal } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  if (!modalType) return null;

  const renderModal = () => {
    switch (modalType) {
      case 'confirm':
        return <ConfirmModal {...(modalProps as ConfirmModalProps)} onClose={closeModal} />;
      case 'moremenu':
        return <MoreMenu {...(modalProps as MoreMenuProps)} onClose={closeModal} />;
      default:
        return null;
    }
  };

  return <Wrapper>{renderModal()}</Wrapper>;
};
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  background-color: rgba(18, 18, 18, 0.1);
  backdrop-filter: blur(2.5px);
  z-index: 1000;
`;

export default ModalContainer;
