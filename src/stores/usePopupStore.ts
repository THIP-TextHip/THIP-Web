import { create } from 'zustand';

// Popup 타입 정의
export type PopupType = 'confirm-modal' | 'moremenu' | 'snackbar' | null;

// 모달 & 스낵바 Props 타입
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

export interface SnackbarProps {
  message: string;
  actionText?: string;
  variant: 'top' | 'bottom';
  onActionClick?: () => void;
  onClose: () => void;
}

// 통합 상태 타입
interface PopupState {
  popupType: PopupType;
  popupProps?: ConfirmModalProps | MoreMenuProps | SnackbarProps;
  isOpen: boolean;
  openPopup: (type: PopupType, props?: ConfirmModalProps | MoreMenuProps | SnackbarProps) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>(set => ({
  popupType: null,
  popupProps: {},
  isOpen: false,
  openPopup: (type, props) => set({ popupType: type, popupProps: props, isOpen: true }),
  closePopup: () => set({ popupType: null, popupProps: {}, isOpen: false }),
}));
