import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { deleteComment } from '@/api/comments/deleteComment';
import { usePopupActions } from '@/hooks/usePopupActions';
import type { ReplyModalProps } from '@/stores/usePopupStore';

const ReplyModal = ({ isOpen, userId, replyId, position, onClose }: ReplyModalProps) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const { openConfirm, openSnackbar, closePopup } = usePopupActions();

  useEffect(() => {
    const loadUser = () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          setCurrentUserId(Number(userId));
        }
      } catch (error) {
        console.error('localStorage에서 userId 로드 실패:', error);
      }
    };
    loadUser();
  }, []);

  const isMyReply = currentUserId === userId;

  const handleDelete = () => {
    closePopup();

    openConfirm({
      title: '이 댓글을 삭제하시겠어요?',
      disc: '삭제 후에는 되돌릴 수 없어요.',
      onConfirm: async () => {
        try {
          await deleteComment(replyId);
          console.log('댓글 삭제 성공:', replyId);

          openSnackbar({
            message: '댓글 삭제를 완료했어요.',
            variant: 'top',
            onClose: () => {
              closePopup();
            },
          });
        } catch (error) {
          console.error('댓글 삭제 실패:', error);

          openSnackbar({
            message: '댓글 삭제에 실패했습니다.',
            variant: 'top',
            onClose: () => {
              closePopup();
            },
          });
        }
      },
      onClose: closePopup,
    });
  };

  // const handleReport = () => {
  //   onClose();
  // };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        onClick={e => e.stopPropagation()}
        style={{
          left: position ? `${position.x - 144}px` : '0',
          top: position ? `${position.y}px` : '0',
        }}
      >
        <ModalContent>
          {/* 내 댓글이면 삭제하기, 다른 사람 댓글이면 신고하기 */}
          {isMyReply ? (
            <OptionItem className="report">
              <div className="option-text">신고하기</div>
            </OptionItem>
          ) : (
            <OptionItem onClick={handleDelete} className="delete">
              <div className="option-text">삭제하기</div>
            </OptionItem>
          )}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  width: 144px;
  height: 60px;
  padding: 20px 12px;
  border-radius: 16px;
  border: 1px solid ${colors.grey[200]};
  background-color: ${colors.black.main};
  z-index: 1001;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.delete {
    .option-text {
      color: ${colors.white};
      font-size: ${typography.fontSize.sm};
      font-weight: ${typography.fontWeight.regular};
      line-height: 20px;
    }
  }

  &.report {
    .option-text {
      color: ${colors.red};
      font-size: ${typography.fontSize.sm};
      font-weight: ${typography.fontWeight.regular};
      line-height: 20px;
    }
  }

  .option-text {
    color: ${colors.white};
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.medium};
    line-height: normal;
  }
`;

export default ReplyModal;
