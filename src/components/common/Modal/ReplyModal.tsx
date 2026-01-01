import { useState, useEffect } from 'react';
import { deleteComment } from '@/api/comments/deleteComment';
import { usePopupActions } from '@/hooks/usePopupActions';
import type { ReplyModalProps } from '@/stores/usePopupStore';
import { Overlay, ModalContainer, ModalContent, OptionItem } from './ReplyModal.styled';

const ReplyModal = ({ isOpen, userId, commentId, position, onClose }: ReplyModalProps) => {
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
          await deleteComment(commentId);
          console.log('댓글 삭제 성공:', commentId);

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

export default ReplyModal;
