import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import like from '../../assets/feed/like.svg';
import activeLike from '../../assets/feed/activeLike.svg';
import comment from '../../assets/feed/comment.svg';
import save from '../../assets/feed/save.svg';
import activeSave from '../../assets/feed/activeSave.svg';
import lockIcon from '../../assets/feed/lockIcon.svg';

const Container = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  img {
    cursor: pointer;
  }

  .left {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .count {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var(--color-white);
      font-size: var(--string-size-small03, 12px);
      font-weight: var(--string-weight-medium, 500);
      line-height: normal;
      letter-spacing: 0.012px;
    }
  }
`;

interface PostFooterProps {
  initialLikeCount: number;
  commentCount: number;
  postId: string;
  isMyFeed: boolean;
  isPublic?: boolean;
}

const PostFooter = ({
  initialLikeCount,
  commentCount,
  postId,
  isMyFeed,
  isPublic,
}: PostFooterProps) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleComment = () => {
    navigate(`/feed/${postId}`);
  };

  return (
    <Container>
      <div className="left">
        <div className="count">
          <img src={liked ? activeLike : like} onClick={handleLike} />
          <div>{likeCount}</div>
        </div>
        <div className="count">
          <img src={comment} onClick={handleComment} />
          <div>{commentCount}</div>
        </div>
      </div>
      <div className="right">
        {isMyFeed ? (
          isPublic ? (
            <div style={{ width: 24, height: 24 }} />
          ) : (
            <img src={lockIcon} alt="비공개" />
          )
        ) : (
          <img src={saved ? activeSave : save} onClick={handleSave} alt="저장" />
        )}
      </div>
    </Container>
  );
};

export default PostFooter;
