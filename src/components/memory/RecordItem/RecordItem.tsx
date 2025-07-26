import type { Record } from '../../../pages/memory/Memory';
import TextRecord from './TextRecord';
import PollRecord from './PollRecord';
import heartIcon from '../../../assets/memory/heart.svg';
import commentIcon from '../../../assets/memory/comment.svg';
import {
  Container,
  UserSection,
  UserAvatar,
  UserInfo,
  UserName,
  UserPoints,
  TimeStamp,
  ContentSection,
  ActionSection,
  ActionButton,
} from './RecordItem.styled';

interface RecordItemProps {
  record: Record;
}

const RecordItem = ({ record }: RecordItemProps) => {
  const { user, userPoints, content, likeCount, commentCount, timeAgo, type, pollOptions } = record;

  return (
    <Container>
      <UserSection>
        <UserAvatar />
        <UserInfo>
          <UserName>{user}</UserName>
          <UserPoints>{userPoints}p</UserPoints>
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
        <ActionButton>
          <img src={heartIcon} alt="좋아요" />
          <span>{likeCount}</span>
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
