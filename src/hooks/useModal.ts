import { useModalStore } from '@/stores/useModalStore';
import type { ConfirmModalProps, MoreMenuProps } from '@/stores/useModalStore';

export const useModal = () => {
  const { openModal, closeModal } = useModalStore();

  const openConfirm = (props: ConfirmModalProps) => {
    openModal('confirm', props);
  };

  const openMoreMenu = (props: MoreMenuProps) => {
    openModal('moremenu', props);
  };

  return {
    openConfirm,
    openMoreMenu,
    closeModal,
  };
};
