import type {
  ConfirmModalProps,
  MoreMenuProps,
  SnackbarProps,
  ReplyModalProps,
} from '@/stores/usePopupStore';
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
  // 댓글 더보기 모달
  const openReplyModal = (props: ReplyModalProps) => {
    openPopup('reply-modal', props);
  };

  return {
    openConfirm,
    openMoreMenu,
    openSnackbar,
    openReplyModal,
    closePopup,
  };
};
