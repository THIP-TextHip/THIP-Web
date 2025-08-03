import type { ConfirmModalProps, MoreMenuProps, SnackbarProps } from '@/stores/usePopupStore';
import { usePopupStore } from '@/stores/usePopupStore';

export const usePopupActions = () => {
  const { openPopup, closePopup } = usePopupStore();
  // 다이얼로그(Y/N) 모달
  const openConfirm = (props: ConfirmModalProps) => {
    openPopup('confirm-modal', props);
  };
  // 더보기 모달
  const openMoreMenu = (props: MoreMenuProps) => {
    openPopup('moremenu', props);
  };
  // 스낵바
  const openSnackbar = (props: SnackbarProps) => {
    openPopup('snackbar', props);
  };

  return {
    openConfirm,
    openMoreMenu,
    openSnackbar,
    closePopup,
  };
};
