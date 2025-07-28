import { useState } from 'react';
import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import PostHeader from './PostHeader';
import type { SubReplyDataProps } from '@/types/post';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import replyIcon from '../../../assets/feed/replyIcon.svg';
import { useReplyActions } from '@/hooks/useReplyActions';

const SubReply = ({
  replyCommentUserName,
  replyCommentUserTitle,
  replyCommentContent,
  replyCommentUserId,
  replyCommentId,
  replyCommentimgUrl,
  titleColor,
  postDate,
  likeCount,
  isLike,
}: SubReplyDataProps) => {
  const [liked, setLiked] = useState<boolean>(isLike);
  const [currentLikeCount, setCurrentLikeCount] = useState<number>(likeCount);

  const { startReply } = useReplyActions();

  const handleReplyClick = () => {
    startReply(replyCommentUserName, replyCommentId);
  };

  const handleLike = () => {
    setLiked(prev => !prev);
    setCurrentLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Container>
      <ReplyIcon>
        <img src={replyIcon} alt="대댓글 아이콘" />
      </ReplyIcon>
      <Content>
        <PostHeader
          profileImgUrl={replyCommentimgUrl}
          userName={replyCommentUserName}
          userTitle={replyCommentUserTitle}
          titleColor={titleColor}
          createdAt={postDate}
          userId={replyCommentUserId}
          type="reply"
        />
        <ReplySection>
          <div className="left">
            <div className="reply">{replyCommentContent}</div>
            <div className="sub-reply" onClick={handleReplyClick}>
              답글작성
            </div>
          </div>
          <div className="right">
            <img src={liked ? activeLike : like} onClick={handleLike} alt="좋아요" />
            <div className="count">{currentLikeCount}</div>
          </div>
        </ReplySection>
      </Content>
    </Container>
  );
};

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
