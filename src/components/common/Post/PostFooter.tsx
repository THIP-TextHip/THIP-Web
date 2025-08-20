import { useState } from 'react';
import styled from '@emotion/styled';
import like from '../../../assets/feed/like.svg';
import activeLike from '../../../assets/feed/activeLike.svg';
import comment from '../../../assets/feed/comment.svg';
import save from '../../../assets/feed/save.svg';
import activeSave from '../../../assets/feed/activeSave.svg';
import lockIcon from '../../../assets/feed/lockIcon.svg';
import { postSaveFeed } from '@/api/feeds/postSave';
import { postFeedLike } from '@/api/feeds/postFeedLike';

const Container = styled.div<{ isDetail: boolean }>`
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
      gap: 2px;

      &.comment img {
        cursor: ${({ isDetail }) => (isDetail ? 'default' : 'pointer')};
      }
    }
  }
`;

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
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [saved, setSaved] = useState(isSaved);

  const handleLike = async () => {
    try {
      const response = await postFeedLike(feedId, !liked);

      if (response.isSuccess) {
        // 성공 시 상태 업데이트
        setLiked(response.data.isLiked);
        setLikeCount(prev => (response.data.isLiked ? prev + 1 : prev - 1));
        console.log('좋아요 상태 변경 성공:', response.data.isLiked);
      } else {
        console.error('좋아요 상태 변경 실패:', response.message);
      }
    } catch (error) {
      console.error('좋아요 API 호출 실패:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await postSaveFeed(feedId, !saved);

      if (response.isSuccess) {
        const newSaveState = response.data?.isSaved ?? !saved;
        // 성공 시 상태 업데이트
        setSaved(newSaveState);
        console.log('저장 상태 변경 성공:', newSaveState);
        
        // 부모 컴포넌트에 알림
        if (onSaveToggle) {
          onSaveToggle(feedId, newSaveState);
        }
      } else {
        console.error('저장 상태 변경 실패:', response.message);
      }
    } catch (error) {
      console.error('저장 API 호출 실패:', error);
    }
  };

  const handleComment = () => {
    if (isDetail) return;
    window.open(`/feed/${feedId}`, '_blank');
  };

  return (
    <Container isDetail={isDetail}>
      <div className="left">
        <div className="count">
          <img src={liked ? activeLike : like} onClick={handleLike} />
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
          <img src={saved ? activeSave : save} onClick={handleSave} alt="저장" />
        )}
      </div>
    </Container>
  );
};

export default PostFooter;
