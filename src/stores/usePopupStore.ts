// usePopupStore.ts
import { create } from 'zustand';

export type PopupType =
  | 'confirm-modal'
  | 'moremenu'
  | 'snackbar'
  | 'reply-modal'
  | 'counting-bar'
  | null;

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
  onReport?: () => void;
  onPin?: () => void;
  isWriter?: boolean;
  type?: 'post' | 'reply';
}

export interface SnackbarProps {
  message: string;
  actionText?: string;
  variant: 'top' | 'bottom';
  isError?: boolean;
  onActionClick?: () => void;
  onClose: () => void;
}

export interface ReplyModalProps {
  isOpen: boolean;
  userId: number;
  commentId: number;
  position?: { x: number; y: number };
  onClose: () => void;
}

/* 추가 */
export interface CountingBarProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

type PopupPropsUnion =
  | ConfirmModalProps
  | MoreMenuProps
  | SnackbarProps
  | ReplyModalProps
  | CountingBarProps;

interface PopupState {
  popupType: PopupType;
  popupProps?: PopupPropsUnion;
  isOpen: boolean;
  openPopup: (type: PopupType, props?: PopupPropsUnion) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>(set => ({
  popupType: null,
  popupProps: {} as PopupPropsUnion,
  isOpen: false,
  openPopup: (type, props) => set({ popupType: type, popupProps: props, isOpen: true }),
  closePopup: () => set({ popupType: null, popupProps: {} as PopupPropsUnion, isOpen: false }),
}));
