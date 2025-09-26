import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import PostHeader from './PostHeader';
import type { CommentData } from '@/api/comments/getComments';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import { useReplyActions } from '@/hooks/useReplyActions';
import { usePopupActions } from '@/hooks/usePopupActions';
import { postLike } from '@/api/comments/postLike';
import { deleteComment } from '@/api/comments/deleteComment';

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
        console.log('좋아요 상태 변경 성공:', response);
        setLiked(response.data.isLiked);
        setLikeCount(prev => (response.data.isLiked ? prev + 1 : prev - 1));
      } else {
        console.error('좋아요 상태 변경 실패:', response.message);
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
    // 답글 작성 시에는 현재 댓글 작성자의 이름을 사용
    startReply(creatorNickname, commentId);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteComment(commentId);
      closePopup();

      if (response.isSuccess) {
        // 약간의 지연 후 스낵바 오픈 → 진입 애니메이션이 확실히 보이도록
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
      // 작성자인 경우: 삭제하기만 표시
      openMoreMenu({
        onDelete: handleDelete,
        type: 'reply',
        isWriter: true,
        onClose: closePopup,
      });
    } else {
      // 작성자가 아닌 경우: 신고하기만 표시
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

  // 삭제된 댓글인 경우 처리
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
const DeletedContainer = styled.div`
  display: flex;
  width: 100%;

  .deleted-text {
    color: ${colors.grey[300]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const ReplySection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  .left {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .reply {
      color: ${colors.grey[100]};
      font-size: ${typography.fontSize.sm};
      font-weight: ${typography.fontWeight.regular};
      line-height: 20px;
    }
    .sub-reply {
      color: ${colors.grey[300]};
      font-size: ${typography.fontSize.xs};
      font-weight: ${typography.fontWeight.semibold};
      line-height: normal;
      cursor: pointer;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .count {
      text-align: center;
      color: ${colors.grey[100]};
      font-size: 10px;
      font-weight: ${typography.fontWeight.medium};
      line-height: normal;
    }
  }
`;

export default Reply;
