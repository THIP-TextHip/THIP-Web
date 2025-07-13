import {
  Overlay,
  BottomSheet,
  ActionItem,
  DeleteActionItem,
  ReportActionItem,
  Divider,
} from './MessageActionBottomSheet.styled';

interface MessageActionBottomSheetProps {
  isOpen: boolean;
  isMyMessage: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

const MessageActionBottomSheet = ({
  isOpen,
  isMyMessage,
  onClose,
  onEdit,
  onDelete,
  onReport,
}: MessageActionBottomSheetProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <BottomSheet isOpen={isOpen}>
        {isMyMessage ? (
          // 내 댓글인 경우
          <>
            <ActionItem onClick={onEdit}>수정하기</ActionItem>
            <Divider />
            <DeleteActionItem onClick={onDelete}>삭제하기</DeleteActionItem>
          </>
        ) : (
          // 타인의 댓글인 경우
          <ReportActionItem onClick={onReport}>신고하기</ReportActionItem>
        )}
      </BottomSheet>
    </Overlay>
  );
};

export default MessageActionBottomSheet;
