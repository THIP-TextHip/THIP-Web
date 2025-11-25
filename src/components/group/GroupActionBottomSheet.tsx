import {
  Overlay,
  BottomSheet,
  DeleteGroupActionItem,
  LeaveGroupActionItem,
  ReportGroupActionItem,
  ActionItemsContainer,
} from './GroupActionBottomSheet.styled';

interface GroupActionBottomSheetProps {
  isOpen: boolean;
  isGroupOwner: boolean;
  onClose: () => void;
  onDeleteGroup?: () => void;
  onLeaveGroup?: () => void;
  onReportGroup?: () => void;
}

const GroupActionBottomSheet = ({
  isOpen,
  isGroupOwner,
  onClose,
  onDeleteGroup,
  onLeaveGroup,
  onReportGroup,
}: GroupActionBottomSheetProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteGroup = () => {
    onDeleteGroup?.();
    onClose();
  };

  const handleLeaveGroup = () => {
    onLeaveGroup?.();
    onClose();
  };

  const handleReportGroup = () => {
    onReportGroup?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <BottomSheet isOpen={isOpen}>
        <ActionItemsContainer>
          {isGroupOwner ? (
            <DeleteGroupActionItem onClick={handleDeleteGroup}>방 삭제하기</DeleteGroupActionItem>
          ) : (
            <>
              <LeaveGroupActionItem onClick={handleLeaveGroup}>방 나가기</LeaveGroupActionItem>
              <ReportGroupActionItem onClick={handleReportGroup}>방 신고하기</ReportGroupActionItem>
            </>
          )}
        </ActionItemsContainer>
      </BottomSheet>
    </Overlay>
  );
};

export default GroupActionBottomSheet;
