import { useState, useRef } from 'react';
import PostHeader from './PostHeader';
import type { CommentData } from '@/api/comments/getComments';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import { useReplyActions } from '@/hooks/useReplyActions';
import { usePopupActions } from '@/hooks/usePopupActions';
import { postLike } from '@/api/comments/postLike';
import { deleteComment } from '@/api/comments/deleteComment';
import { DeletedContainer, Container, ReplySection } from './Reply.styled';

interface ReplyProps extends CommentData {
  onDelete?: () => void;
  isWriter?: boolean;
}

const Reply = ({
  commentId,
  creatorId,
  creatorProfileImageUrl,
  creatorNickname,
  aliasName,
  aliasColor,
  postDate,
  content,
  isLike,
  likeCount: initialLikeCount,
  isDeleted,
  onDelete,
  isWriter,
}: ReplyProps) => {
  const [liked, setLiked] = useState(isLike);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startReply } = useReplyActions();
  const { openMoreMenu, closePopup, openSnackbar } = usePopupActions();

  const handleLike = async () => {
    try {
      const response = await postLike(commentId, !liked);

      if (response.isSuccess) {
        setLiked(response.data.isLiked);
        setLikeCount(prev => (response.data.isLiked ? prev + 1 : prev - 1));
      } else {
        openSnackbar({
          message: response.message || '좋아요 처리 중 오류가 발생했습니다.',
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  const handleReplyClick = () => {
    startReply(creatorNickname, commentId);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteComment(commentId);
      closePopup();

      if (response.isSuccess) {
        setTimeout(() => {
          openSnackbar({
            message: '댓글이 삭제되었습니다.',
            variant: 'top',
            onClose: closePopup,
          });
        }, 100);
        if (onDelete) {
          onDelete();
        }
      } else {
        setTimeout(() => {
          openSnackbar({
            message: '댓글 삭제에 실패했습니다.',
            variant: 'top',
            onClose: closePopup,
          });
        }, 100);
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      closePopup();
      setTimeout(() => {
        openSnackbar({
          message: '댓글 삭제에 실패했습니다.',
          variant: 'top',
          onClose: closePopup,
        });
      }, 100);
    }
  };

  const handleMoreClick = () => {
    if (isWriter) {
      openMoreMenu({
        onDelete: handleDelete,
        type: 'reply',
        isWriter: true,
        onClose: closePopup,
      });
    } else {
      openMoreMenu({
        onReport: () => {
          closePopup();
          openSnackbar({
            message: '신고가 접수되었어요.',
            variant: 'top',
            onClose: closePopup,
          });
        },
        type: 'reply',
        isWriter: false,
        onClose: closePopup,
      });
    }
  };

  if (isDeleted) {
    return (
      <DeletedContainer>
        <div className="deleted-text">삭제된 댓글이에요</div>
      </DeletedContainer>
    );
  }

  return (
    <Container ref={containerRef}>
      <PostHeader
        creatorProfileImageUrl={creatorProfileImageUrl || undefined}
        creatorNickname={creatorNickname}
        aliasName={aliasName}
        aliasColor={aliasColor}
        postDate={postDate}
        creatorId={creatorId}
        isWriter={isWriter}
        type="reply"
      />
      <ReplySection onClick={handleMoreClick}>
        <div className="left">
          <div className="reply">{content}</div>
          <div
            className="sub-reply"
            onClick={e => {
              e.stopPropagation();
              handleReplyClick();
            }}
          >
            답글작성
          </div>
        </div>
        <div className="right">
          <img
            src={liked ? activeLike : like}
            onClick={e => {
              e.stopPropagation();
              handleLike();
            }}
            alt="좋아요"
          />
          <div className="count">{likeCount}</div>
        </div>
      </ReplySection>
    </Container>
  );
};
export default Reply;
