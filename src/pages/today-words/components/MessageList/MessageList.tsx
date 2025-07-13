import { useState } from 'react';
import moreIcon from '../../../../assets/common/more.svg';
import type { Message } from '../../types';
import MessageActionBottomSheet from './MessageActionBottomSheet';
import {
  MessageList as StyledMessageList,
  DateGroup,
  MessageItem,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  TimeStamp,
  MessageContent,
  DateDivider,
  DateDividerContainer,
  Separator,
  MoreButton,
} from './MessageList.styled';

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

const MessageList = ({ messages, currentUserId = 'user.01' }: MessageListProps) => {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  // 먼저 모든 메시지를 시간순으로 정렬
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  // 날짜별로 메시지 그룹화
  const groupedMessages = sortedMessages.reduce(
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

  // 날짜를 최신순으로 정렬
  const sortedDates = Object.keys(groupedMessages).sort((a, b) => a.localeCompare(b));

  const handleMoreClick = (messageId: string) => {
    setSelectedMessageId(messageId);
  };

  const handleCloseBottomSheet = () => {
    setSelectedMessageId(null);
  };

  const handleEdit = () => {
    console.log('메시지 수정');
    setSelectedMessageId(null);
  };

  const handleDelete = () => {
    console.log('메시지 삭제');
    setSelectedMessageId(null);
  };

  const handleReport = () => {
    console.log('메시지 신고');
    setSelectedMessageId(null);
  };

  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);
  const isMyMessage = selectedMessage?.user === currentUserId;

  return (
    <>
      <StyledMessageList>
        {sortedDates.map((date, groupIndex) => (
          <div key={date}>
            <DateDividerContainer>
              <DateDivider>{date}</DateDivider>
            </DateDividerContainer>

            <DateGroup>
              {groupedMessages[date].map(message => (
                <MessageItem key={message.id}>
                  <UserInfo>
                    <UserAvatar />
                    <UserDetails>
                      <UserName>{message.user}</UserName>
                      <TimeStamp>{message.timeAgo}</TimeStamp>
                    </UserDetails>
                    <MoreButton onClick={() => handleMoreClick(message.id)}>
                      <img src={moreIcon} alt="더보기" />
                    </MoreButton>
                  </UserInfo>
                  <MessageContent>{message.content}</MessageContent>
                </MessageItem>
              ))}
            </DateGroup>

            {/* 마지막 그룹이 아닐 때만 구분선 표시 */}
            {groupIndex < sortedDates.length - 1 && <Separator />}
          </div>
        ))}
      </StyledMessageList>

      <MessageActionBottomSheet
        isOpen={!!selectedMessageId}
        isMyMessage={isMyMessage}
        onClose={handleCloseBottomSheet}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReport={handleReport}
      />
    </>
  );
};

export default MessageList;
