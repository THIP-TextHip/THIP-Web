import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import moreIcon from '../../../assets/common/more.svg';
import type { Message } from '../../../types/today';
import MessageActionBottomSheet from './MessageActionBottomSheet';
import { usePopupActions } from '../../../hooks/usePopupActions';
import { deleteDailyGreeting } from '../../../api/rooms/deleteDailyGreeting';
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
  roomId?: number;
}

export interface MessageListRef {
  addMessage: (content: string) => void;
}

const MessageList = forwardRef<MessageListRef, MessageListProps>(
  ({ messages: initialMessages, currentUserId = 'user.01', onMessageDelete, roomId }, ref) => {
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [messages, setMessages] = useState(initialMessages);
    const { openSnackbar } = usePopupActions();

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

    useImperativeHandle(ref, () => ({
      addMessage,
    }));

    const sortedMessages = messages.sort((a, b) => parseInt(a.id) - parseInt(b.id));

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

    const sortedDates = Object.keys(groupedMessages).sort((a, b) => a.localeCompare(b));

    const handleMoreClick = (messageId: string) => {
      setSelectedMessageId(messageId);
    };

    const handleCloseBottomSheet = () => {
      setSelectedMessageId(null);
    };

    const handleDelete = async () => {
      if (selectedMessageId && roomId) {
        try {
          const attendanceCheckId = parseInt(selectedMessageId);

          const result = await deleteDailyGreeting(roomId, attendanceCheckId);

          if (result.isSuccess) {
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== selectedMessageId));

            if (onMessageDelete) {
              onMessageDelete(selectedMessageId);
            }

            openSnackbar({
              message: '오늘의 한마디가 삭제되었습니다.',
              variant: 'top',
              isError: false,
              onClose: () => {},
            });
          } else {
            openSnackbar({
              message: result.message || '삭제에 실패했습니다.',
              variant: 'top',
              isError: true,
              onClose: () => {},
            });
          }
        } catch (error) {
          console.error('삭제 오류:', error);
          openSnackbar({
            message: '삭제 중 오류가 발생했습니다.',
            variant: 'top',
            isError: true,
            onClose: () => {},
          });
        }
      } else if (!roomId) {
        openSnackbar({
          message: '방 정보가 없습니다.',
          variant: 'top',
          isError: true,
          onClose: () => {},
        });
      }
      setSelectedMessageId(null);
    };

    const handleReport = () => {
      setSelectedMessageId(null);
    };

    const selectedMessage = messages.find(msg => msg.id === selectedMessageId);
    const isMyMessage = selectedMessage?.isWriter === true;

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
