import moreIcon from '../../../assets/common/more.svg';
import type { Message } from '../types';
import {
  MessageList as StyledMessageList,
  TopBorderText,
  MessageItem,
  UserInfo,
  UserAvatar,
  UserName,
  TimeStamp,
  MessageContent,
  DateDivider,
  MoreButton,
} from './MessageList.styled';

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  // 날짜별로 메시지 그룹화
  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = message.timestamp;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {} as Record<string, Message[]>,
  );

  return (
    <StyledMessageList>
      {/* 상단 경계선 텍스트 */}
      <TopBorderText>⋯ ⋯ ⋯ ⋯ ⋯ 포함 글자 입력입니다. ⋯ ⋯ ⋯ ⋯ ⋯</TopBorderText>

      {Object.entries(groupedMessages).map(([date, messagesInDate], groupIndex) => (
        <div key={date}>
          {messagesInDate.map(message => (
            <MessageItem key={message.id}>
              <UserInfo>
                <UserAvatar />
                <div>
                  <UserName>{message.user}</UserName>
                  <TimeStamp>{message.timeAgo}</TimeStamp>
                </div>
                <MoreButton>
                  <img src={moreIcon} alt="더보기" />
                </MoreButton>
              </UserInfo>
              <MessageContent>{message.content}</MessageContent>
            </MessageItem>
          ))}

          {/* 마지막 그룹이 아닐 때 날짜 구분선 표시 */}
          {groupIndex < Object.keys(groupedMessages).length - 1 && (
            <DateDivider>{date}</DateDivider>
          )}
        </div>
      ))}
    </StyledMessageList>
  );
};

export default MessageList;
