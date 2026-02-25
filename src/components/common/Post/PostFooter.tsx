import { useEffect, useRef, useState } from 'react';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import comment from '../../../assets/feed/comment.svg';
import save from '../../../assets/feed/save.svg';
import activeSave from '../../../assets/feed/activeSave.svg';
import lockIcon from '../../../assets/feed/lockIcon.svg';
import { postSaveFeed } from '@/api/feeds/postSave';
import { postFeedLike } from '@/api/feeds/postFeedLike';
import { usePreventDoubleClick } from '@/hooks/usePreventDoubleClick';
import { Container } from './PostFooter.styled';

interface PostFooterProps {
  likeCount: number;
  commentCount: number;
  feedId: number;
  isMyFeed: boolean;
  isSaved?: boolean;
  isLiked?: boolean;
  isPublic?: boolean;
  isDetail?: boolean;
  onSaveToggle?: (feedId: number, newSaveState: boolean) => void;
}

const PostFooter = ({
  likeCount: initialLikeCount,
  commentCount,
  feedId,
  isMyFeed,
  isSaved = false,
  isLiked = false,
  isPublic = true,
  isDetail = false,
  onSaveToggle,
}: PostFooterProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [saved, setSaved] = useState(isSaved);

  const likedRef = useRef(isLiked);
  const savedRef = useRef(isSaved);
  const { isLoading: isLikeLoading, run: runLike } = usePreventDoubleClick();
  const { isLoading: isSaveLoading, run: runSave } = usePreventDoubleClick();

  useEffect(() => {
    setLiked(isLiked);
    likedRef.current = isLiked;
  }, [isLiked]);

  useEffect(() => {
    setSaved(isSaved);
    savedRef.current = isSaved;
  }, [isSaved]);

  const handleLike = () => {
    runLike(async () => {
      const nextLiked = !likedRef.current;
      likedRef.current = nextLiked;
      setLiked(nextLiked);
      setLikeCount(prev => (nextLiked ? prev + 1 : prev - 1));

      try {
        const response = await postFeedLike(feedId, nextLiked);
        if (!response.isSuccess && likedRef.current === nextLiked) {
          const rollbackState = !nextLiked;
          likedRef.current = rollbackState;
          setLiked(rollbackState);
          setLikeCount(prev => (nextLiked ? prev - 1 : prev + 1));
        }
      } catch {
        if (likedRef.current === nextLiked) {
          const rollbackState = !nextLiked;
          likedRef.current = rollbackState;
          setLiked(rollbackState);
          setLikeCount(prev => (nextLiked ? prev - 1 : prev + 1));
        }
      }
    });
  };

  const handleSave = () => {
    runSave(async () => {
      const nextSaved = !savedRef.current;
      savedRef.current = nextSaved;
      setSaved(nextSaved);
      onSaveToggle?.(feedId, nextSaved);

      try {
        const response = await postSaveFeed(feedId, nextSaved);
        if (!response.isSuccess && savedRef.current === nextSaved) {
          const rollbackState = !nextSaved;
          savedRef.current = rollbackState;
          setSaved(rollbackState);
          onSaveToggle?.(feedId, rollbackState);
        }
      } catch {
        if (savedRef.current === nextSaved) {
          const rollbackState = !nextSaved;
          savedRef.current = rollbackState;
          setSaved(rollbackState);
          onSaveToggle?.(feedId, rollbackState);
        }
      }
    });
  };

  const handleComment = () => {
    if (isDetail) return;
    navigate(`/feed/${feedId}`);
  };

  return (
    <Container isDetail={isDetail}>
      <div className="left">
        <div className="count">
          <img src={liked ? activeLike : like} onClick={handleLike} style={{ opacity: isLikeLoading ? 0.6 : 1 }} />
          <div>{likeCount}</div>
        </div>
        <div className="count comment">
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
          <img
            src={saved ? activeSave : save}
            onClick={handleSave}
            alt="저장"
            style={{ opacity: isSaveLoading ? 0.6 : 1 }}
          />
        )}
      </div>
    </Container>
  );
};

export default PostFooter;
