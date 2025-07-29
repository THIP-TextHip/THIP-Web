import { useState } from 'react';
import type { Record } from '../../../pages/memory/Memory';
import TextRecord from './TextRecord';
import PollRecord from './PollRecord';
import heartIcon from '../../../assets/memory/heart.svg';
import heartFilledIcon from '../../../assets/memory/heart-filled.svg';
import commentIcon from '../../../assets/memory/comment.svg';
import {
  Container,
  UserSection,
  UserAvatar,
  UserInfo,
  UserName,
  PageInfo,
  TimeStamp,
  ContentSection,
  ActionSection,
  ActionButton,
} from './RecordItem.styled';

interface RecordItemProps {
  record: Record;
  shouldBlur?: boolean;
}

const RecordItem = ({ record, shouldBlur = false }: RecordItemProps) => {
  const {
    user,
    content,
    likeCount,
    commentCount,
    timeAgo,
    type,
    pollOptions,
    pageRange,
    recordType,
  } = record;

  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  const handleLikeClick = () => {
    if (isLiked) {
      // 좋아요 취소
      setIsLiked(false);
      setCurrentLikeCount(prev => prev - 1);
    } else {
      // 좋아요 추가
      setIsLiked(true);
      setCurrentLikeCount(prev => prev + 1);
    }
  };

  // 페이지 정보 표시 함수
  const renderPageInfo = () => {
    if (recordType === 'overall') {
      return '총평';
    } else if (pageRange) {
      return `${pageRange}p`;
    }
    return '0p'; // 기본값
  };

  return (
    <Container shouldBlur={shouldBlur}>
      <UserSection>
        <UserAvatar />
        <UserInfo>
          <UserName>{user}</UserName>
          <PageInfo>{renderPageInfo()}</PageInfo>
        </UserInfo>
        <TimeStamp>{timeAgo}</TimeStamp>
      </UserSection>

      <ContentSection>
        {type === 'text' ? (
          <TextRecord content={content} />
        ) : (
          <PollRecord content={content} pollOptions={pollOptions || []} />
        )}
      </ContentSection>

      <ActionSection>
        <ActionButton onClick={handleLikeClick}>
          <img
            src={isLiked ? heartFilledIcon : heartIcon}
            alt={isLiked ? '좋아요 취소' : '좋아요'}
          />
          <span>{currentLikeCount}</span>
        </ActionButton>
        <ActionButton>
          <img src={commentIcon} alt="댓글" />
          <span>{commentCount}</span>
        </ActionButton>
      </ActionSection>
    </Container>
  );
};

export default RecordItem;
