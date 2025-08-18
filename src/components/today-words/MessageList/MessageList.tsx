import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import moreIcon from '../../../assets/common/more.svg';
import type { Message } from '../../../types/today';
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
  onMessageDelete?: (messageId: string) => void;
  isRealTimeMode?: boolean;
}

export interface MessageListRef {
  addMessage: (content: string) => void;
}

const MessageList = forwardRef<MessageListRef, MessageListProps>(
  (
    {
      messages: initialMessages,
      currentUserId = 'user.01',
      onMessageDelete,
      isRealTimeMode = false,
    },
    ref,
  ) => {
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
      setMessages(initialMessages);
    }, [initialMessages]);

    const addMessage = (content: string) => {
      const now = new Date();
      const newMessage: Message = {
        id: Date.now().toString(),
        user: currentUserId,
        content: content,
        timestamp: now
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\. /g, '.')
          .replace(/\.$/, ''),
        timeAgo: '방금 전',
        createdAt: now,
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    // ref를 통해 외부에서 addMessage 함수에 접근할 수 있도록 함
    useImperativeHandle(ref, () => ({
      addMessage,
    }));

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

    const handleDelete = () => {
      if (selectedMessageId) {
        if (isRealTimeMode && onMessageDelete) {
          // 실시간 모드일 때는 부모 컴포넌트의 상태를 업데이트
          onMessageDelete(selectedMessageId);
        } else {
          // 더미 모드일 때는 내부 상태만 업데이트
          setMessages(prevMessages =>
            prevMessages.filter(message => message.id !== selectedMessageId),
          );
        }
        console.log(`메시지 ID ${selectedMessageId} 삭제됨`);
      }
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
                      <UserAvatar profileImageUrl={message.profileImageUrl} />
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
          onDelete={handleDelete}
          onReport={handleReport}
        />
      </>
    );
  },
);

MessageList.displayName = 'MessageList';

export default MessageList;
