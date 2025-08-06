import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import PostHeader from './PostHeader';
import type { ReplyDataProps } from '@/types/post';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import { useReplyActions } from '@/hooks/useReplyActions';
import { usePopupActions } from '@/hooks/usePopupActions';
import { postLike } from '@/api/comments/postLike';

const Reply = ({
  commentId,
  creatorId,
  creatorProfileImageUrl,
  creatorNickname,
  alias,
  aliasColor,
  postDate,
  content,
  isLike,
  likeCount: initialLikeCount,
}: ReplyDataProps) => {
  const [liked, setLiked] = useState(isLike);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startReply } = useReplyActions();
  const { openReplyModal, closePopup } = usePopupActions();

  const handleLike = async () => {
    try {
      const response = await postLike(commentId, !liked);
      console.log('좋아요 상태 변경 성공:', response);

      // 서버 응답으로 상태 업데이트
      setLiked(response.data.isLiked);
      setLikeCount(prev => (response.data.isLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  const handleReplyClick = () => {
    startReply(creatorNickname, commentId);
  };

  // 더보기 버튼 클릭 핸들러
  const handleMoreClick = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      openReplyModal({
        isOpen: true,
        userId: creatorId,
        replyId: commentId,
        position: {
          x: rect.right,
          y: rect.bottom,
        },
        onClose: closePopup,
      });
    }
  };

  return (
    <Container ref={containerRef}>
      <PostHeader
        creatorProfileImageUrl={creatorProfileImageUrl || undefined}
        creatorNickname={creatorNickname}
        alias={alias}
        aliasColor={aliasColor}
        postDate={postDate}
        creatorId={creatorId}
        type="reply"
      />
      <ReplySection onClick={handleMoreClick}>
        <div className="left">
          <div className="reply">{content}</div>
          <div className="sub-reply" onClick={handleReplyClick}>
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
