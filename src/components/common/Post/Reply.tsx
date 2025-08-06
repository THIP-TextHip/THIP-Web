import { useState } from 'react';
import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import PostHeader from './PostHeader';
import type { ReplyDataProps } from '@/types/post';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import { useReplyActions } from '@/hooks/useReplyActions';

const Reply = ({
  commentId,
  userId,
  imageUrl,
  nickName,
  userTitle,
  aliasColor,
  postDate,
  content,
  isLike,
  likeCount: initialLikeCount,
}: ReplyDataProps) => {
  const [liked, setLiked] = useState(isLike);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);

  const { startReply } = useReplyActions();

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleReplyClick = () => {
    startReply(nickName, commentId);
  };

  return (
    <Container>
      <PostHeader
        creatorProfileImageUrl={imageUrl}
        creatorNickname={nickName}
        alias={userTitle}
        aliasColor={aliasColor}
        postDate={postDate}
        creatorId={userId}
        type="reply"
      />
      <ReplySection>
        <div className="left">
          <div className="reply">{content}</div>
          <div className="sub-reply" onClick={handleReplyClick}>
            답글작성
          </div>
        </div>
        <div className="right">
          <img src={liked ? activeLike : like} onClick={handleLike} alt="좋아요" />
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
