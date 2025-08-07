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
  isGroupOwner: boolean; // 모임방 생성자인지 여부
  onClose: () => void;
  onDeleteGroup?: () => void; // 방 삭제하기
  onLeaveGroup?: () => void; // 방 나가기
  onReportGroup?: () => void; // 방 신고하기
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
            // 모임방 생성자인 경우 - 방 삭제하기만 표시
            <DeleteGroupActionItem onClick={handleDeleteGroup}>방 삭제하기</DeleteGroupActionItem>
          ) : (
            // 참여자인 경우 - 방 나가기, 방 신고하기 표시
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
