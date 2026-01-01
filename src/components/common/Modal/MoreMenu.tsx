import type { MoreMenuProps } from '@/stores/usePopupStore';
import { Overlay, ReportContainer, RecordContainer, Button } from './MoreMenu.styled';

const MoreMenu = ({ onEdit, onDelete, onClose, onReport, isWriter, type }: MoreMenuProps) => {
  return (
    <Overlay onClick={() => onClose?.()}>
      {type === 'post' ? (
        // post 타입: 기존 로직 유지
        <>
          {isWriter ? (
            <>
              <RecordContainer onClick={e => e.stopPropagation()}>
                <Button variant="edit" onClick={onEdit}>
                  수정하기
                </Button>
                <Button variant="delete" onClick={onDelete}>
                  삭제하기
                </Button>
              </RecordContainer>
            </>
          ) : (
            <ReportContainer onClick={e => e.stopPropagation()}>
              <Button variant="report" onClick={onReport}>
                신고하기
              </Button>
            </ReportContainer>
          )}
        </>
      ) : (
        // reply 타입: isWriter에 따라 삭제하기 또는 신고하기만 표시
        <>
          {isWriter ? (
            <ReportContainer onClick={e => e.stopPropagation()}>
              <Button variant="delete" onClick={onDelete}>
                삭제하기
              </Button>
            </ReportContainer>
          ) : (
            <ReportContainer onClick={e => e.stopPropagation()}>
              <Button variant="report" onClick={onReport}>
                신고하기
              </Button>
            </ReportContainer>
          )}
        </>
      )}
    </Overlay>
  );
};

export default MoreMenu;
