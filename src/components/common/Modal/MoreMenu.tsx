import type { MoreMenuProps } from '@/stores/usePopupStore';
import { Overlay, ReportContainer, RecordContainer, Button } from './MoreMenu.styled';

const MoreMenu = ({ onEdit, onDelete, onClose, onReport, isWriter, type }: MoreMenuProps) => {
  return (
    <Overlay onClick={() => onClose?.()}>
      {type === 'post' ? (
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
