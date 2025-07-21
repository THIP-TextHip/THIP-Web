import { useState } from 'react';
import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import PostHeader from './PostHeader';
import type { ReplyDataProps } from '@/types/post';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';

const Reply = ({
  profileImgUrl,
  userName,
  userId,
  userTitle,
  titleColor,
  createdAt,
  initialLikeCount,
  replyContent,
}: ReplyDataProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Container>
      <PostHeader
        profileImgUrl={profileImgUrl}
        userName={userName}
        userTitle={userTitle}
        titleColor={titleColor}
        createdAt={createdAt}
        userId={userId}
        type="reply"
      />
      <ReplySection>
        <div className="left">
          <div className="reply">{replyContent}</div>
          <div className="sub-reply">답글작성</div>
        </div>
        <div className="right">
          <img src={liked ? activeLike : like} onClick={handleLike} />
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
