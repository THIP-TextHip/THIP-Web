import { create } from 'zustand';

export type ModalType = 'confirm' | 'moremenu' | null;

// 모달별 Props 정의
export interface ConfirmModalProps {
  title: string;
  disc: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface MoreMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

interface ModalState {
  modalType: ModalType;
  modalProps?: ConfirmModalProps | MoreMenuProps;
  isModalOpen: boolean;
  openModal: (type: ModalType, props?: ConfirmModalProps | MoreMenuProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  modalType: null,
  modalProps: {},
  isModalOpen: false,
  openModal: (type, props) => set({ modalType: type, modalProps: props, isModalOpen: true }),
  closeModal: () => set({ modalType: null, modalProps: {}, isModalOpen: false }),
}));
