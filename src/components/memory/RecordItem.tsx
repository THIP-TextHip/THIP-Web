import type { Record } from '../../pages/memory/Memory';
import heartIcon from '../../assets/memory/heart.svg';
import commentIcon from '../../assets/memory/comment.svg';
import {
  Container,
  UserSection,
  UserAvatar,
  UserInfo,
  UserName,
  UserPoints,
  TimeStamp,
  ContentSection,
  TextContent,
  PollSection,
  PollQuestion,
  PollOptions,
  PollOption,
  PollNumber,
  PollText,
  PollPercentage,
  PollBar,
  PollBarFill,
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
          <TextContent>{content}</TextContent>
        ) : (
          <PollSection>
            <PollQuestion>{content}</PollQuestion>
            <PollOptions>
              {pollOptions?.map(option => (
                <PollOption key={option.id} isHighest={option.isHighest}>
                  <PollNumber>{option.id}</PollNumber>
                  <PollText>{option.text}</PollText>
                  <PollPercentage>{option.percentage}%</PollPercentage>
                  <PollBar>
                    <PollBarFill percentage={option.percentage} isHighest={option.isHighest} />
                  </PollBar>
                </PollOption>
              ))}
            </PollOptions>
          </PollSection>
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
