import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import PostHeader from './PostHeader';
import type { ReplyData } from '@/api/comments/getComments';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import replyIcon from '../../../assets/feed/replyIcon.svg';
import { useReplyActions } from '@/hooks/useReplyActions';
import { usePopupActions } from '@/hooks/usePopupActions';
import { postLike } from '@/api/comments/postLike';
import { deleteComment } from '@/api/comments/deleteComment';

interface SubReplyProps extends ReplyData {
  onDelete?: () => void;
}

const SubReply = ({
  commentId,
  parentCommentCreatorNickname,
  creatorId,
  creatorProfileImageUrl,
  creatorNickname,
  alias,
  aliasColor,
  postDate,
  content,
  likeCount,
  isLike,
  isDeleted,
  onDelete,
}: SubReplyProps) => {
  const [liked, setLiked] = useState<boolean>(isLike);
  const [currentLikeCount, setCurrentLikeCount] = useState<number>(likeCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startReply } = useReplyActions();
  const { openMoreMenu, closePopup, openConfirm, openSnackbar } = usePopupActions();

  const handleReplyClick = () => {
    startReply(creatorNickname, commentId);
  };

  const handleLike = async () => {
    try {
      const response = await postLike(commentId, !liked);
      console.log('좋아요 상태 변경 성공:', response);

      // 서버 응답으로 상태 업데이트
      setLiked(response.data.isLiked);
      setCurrentLikeCount(prev => (response.data.isLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  // const handleMoreClick = () => {
  //   if (containerRef.current) {
  //     const rect = containerRef.current.getBoundingClientRect();
  //     openReplyModal({
  //       isOpen: true,
  //       userId: creatorId,
  //       commentId: commentId,
  //       position: {
  //         x: rect.right,
  //         y: rect.bottom,
  //       },
  //       onClose: closePopup,
  //     });
  //   }
  // };

  const handleDelete = async () => {
    try {
      const response = await deleteComment(commentId);
      // 먼저 현재 모달/메뉴를 닫아 UI를 정리
      closePopup();

      if (response.isSuccess) {
        setTimeout(() => {
          openSnackbar({
            message: '댓글이 삭제되었습니다.',
            variant: 'top',
            onClose: closePopup,
          });
        }, 100);
        if (onDelete) onDelete();
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
    openMoreMenu({
      onDelete: () => {
        openConfirm({
          title: '이 댓글을 삭제하시겠어요?',
          disc: '삭제 후에는 되돌릴 수 없어요',
          onConfirm: handleDelete,
          onClose: closePopup,
        });
      },
      onClose: closePopup,
    });
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
      <ReplyIcon>
        <img src={replyIcon} alt="대댓글 아이콘" />
      </ReplyIcon>
      <Content>
        <PostHeader
          creatorProfileImageUrl={creatorProfileImageUrl || ''}
          creatorNickname={creatorNickname}
          aliasName={alias}
          aliasColor={aliasColor}
          postDate={postDate}
          creatorId={creatorId}
          type="reply"
        />
        <ReplySection onClick={handleMoreClick}>
          <div className="left">
            <div className="reply">
              <span className="reply-nickname">@{parentCommentCreatorNickname}</span> {content}
            </div>
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
            <div className="count">{currentLikeCount}</div>
          </div>
        </ReplySection>
      </Content>
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
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

const ReplyIcon = styled.div`
  img {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
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

      .reply-nickname {
        color: ${colors.white};
        font-size: ${typography.fontSize.sm};
        font-weight: ${typography.fontWeight.regular};
        line-height: 20px;
      }
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

export default SubReply;
