import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import like from '../../assets/feed/like.svg';
import activeLike from '../../assets/feed/activeLike.svg';
import comment from '../../assets/feed/comment.svg';
import save from '../../assets/feed/save.svg';
import activeSave from '../../assets/feed/activeSave.svg';

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
      color: var(--color-text-primary_white, #fefefe);
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
}

const PostFooter = ({ initialLikeCount, commentCount, postId }: PostFooterProps) => {
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
      <img src={saved ? activeSave : save} onClick={handleSave} />
    </Container>
  );
};

export default PostFooter;
