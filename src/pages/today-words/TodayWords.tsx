import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import EmptyState from '../../components/today-words/EmptyState';
import MessageList from '../../components/today-words/MessageList/MessageList';
import type { MessageListRef } from '../../components/today-words/MessageList/MessageList';
import MessageInput from '../../components/today-words/MessageInput';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container, ContentArea } from './TodayWords.styled';
import type { Message, TodayCommentItem } from '../../types/today';
import { createDailyGreeting } from '../../api/rooms/createDailyGreeting';
import { getDailyGreeting } from '../../api/rooms/getDailyGreeting';
import { getRoomPlaying } from '../../api/rooms/getRoomPlaying';
import { isRoomCompleted } from '../../utils/roomStatus';
import { usePopupActions } from '../../hooks/usePopupActions';

const TodayWords = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const messageListRef = useRef<MessageListRef>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const { openSnackbar } = usePopupActions();

  const DAILY_LIMIT = 5;

  const getTodayDateStrings = useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return [
      `${year}.${month}.${day}`,
      `${year}년 ${month}월 ${day}일`,
      `${year}-${month}-${day}`,
      `${month}/${day}/${year}`,
    ];
  }, []);

  const getTodayMyMessageCount = useCallback(() => {
    const todayFormats = getTodayDateStrings();

    return messages.filter(message => {
      if (!message.isWriter) return false;

      return todayFormats.includes(message.timestamp);
    }).length;
  }, [messages, getTodayDateStrings]);

  const todayMyMessageCount = getTodayMyMessageCount();

  const handleBackClick = () => {
    navigate(-1);
  };

  const convertToMessage = (item: TodayCommentItem): Message => {
    const timeAgo = item.postDate || '방금 전';

    const createdAt = new Date();

    return {
      id: item.attendanceCheckId.toString(),
      user: item.creatorNickname,
      content: item.todayComment,
      timestamp: item.date,
      timeAgo,
      createdAt,
      profileImageUrl: item.creatorProfileImageUrl,
      isWriter: item.isWriter,
    };
  };

  const loadMessages = useCallback(
    async (cursor?: string, isRefresh = false) => {
      if (!roomId) return;

      try {
        if (isRefresh) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const response = await getDailyGreeting({
          roomId: parseInt(roomId),
          cursor: cursor || undefined,
        });

        if (response.isSuccess) {
          const newMessages = response.data.todayCommentList.map(convertToMessage);

          if (isRefresh) {
            setMessages(newMessages);
          } else {
            setMessages(prev => [...prev, ...newMessages]);
          }

          setNextCursor(response.data.nextCursor);
          setIsLast(response.data.isLast);
          setHasInitiallyLoaded(true);

          if (isRefresh) {
            setTimeout(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
            }, 100);
          }
        } else {
          openSnackbar({
            message: response.message || '오늘의 한마디 목록을 불러오는데 실패했습니다.',
            variant: 'top',
            onClose: () => {},
          });
        }
      } catch (error) {
        console.error('오늘의 한마디 목록 조회 오류:', error);

        let errorMessage = '오늘의 한마디 목록을 불러오는 중 오류가 발생했습니다.';

        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
                code?: number;
              };
            };
          };

          if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          } else if (axiosError.response?.data?.code === 403) {
            errorMessage = '방 접근 권한이 없습니다.';
          } else if (axiosError.response?.data?.code === 404) {
            errorMessage = '존재하지 않는 방입니다.';
          }
        }

        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [roomId, convertToMessage, openSnackbar],
  );

  const loadMoreMessages = useCallback(() => {
    if (!isLoadingMore && !isLast && nextCursor && roomId) {
      loadMessages(nextCursor);
    }
  }, [isLoadingMore, isLast, nextCursor, roomId, loadMessages]);

  useEffect(() => {
    const checkRoomStatus = async () => {
      if (!roomId) return;

      try {
        const response = await getRoomPlaying(parseInt(roomId));
        if (response.isSuccess) {
          const completed = isRoomCompleted(response.data.progressEndDate);
          setRoomCompleted(completed);
        }
      } catch (error) {
        console.error('모임방 상태 확인 오류:', error);
      }
    };

    checkRoomStatus();
  }, [roomId]);

  useEffect(() => {
    if (roomId && !hasInitiallyLoaded) {
      loadMessages(undefined, true);
    }
  }, [roomId, hasInitiallyLoaded, loadMessages]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !isLoadingMore &&
        !isLast &&
        hasInitiallyLoaded
      ) {
        loadMoreMessages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreMessages, isLoadingMore, isLast, hasInitiallyLoaded]);

  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '' || isSubmitting) return;

    if (!roomId) {
      openSnackbar({
        message: '방 정보를 찾을 수 없습니다.',
        variant: 'top',
        onClose: () => {},
      });
      return;
    }

    if (todayMyMessageCount >= DAILY_LIMIT) {
      openSnackbar({
        message: '오늘의 한마디는 하루에 다섯번까지 작성할 수 있어요',
        variant: 'top',
        isError: true,
        onClose: () => {},
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createDailyGreeting(parseInt(roomId), inputValue.trim());

      if (response.isSuccess) {
        setInputValue('');

        setMessages([]);
        setNextCursor(null);
        setIsLast(false);
        setHasInitiallyLoaded(false);

        if (todayMyMessageCount + 1 >= DAILY_LIMIT) {
          openSnackbar({
            message: '오늘의 한마디는 하루에 다섯번까지 작성할 수 있어요',
            variant: 'top',
            isError: true,
            onClose: () => {},
          });
        } else if (todayMyMessageCount === 0) {
          openSnackbar({
            message: '오늘의 한마디가 작성되었습니다.',
            variant: 'top',
            onClose: () => {},
          });
        }

        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      } else {
        openSnackbar({
          message: response.message || '오늘의 한마디 작성에 실패했습니다.',
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('오늘의 한마디 작성 오류:', error);

      let errorMessage = '오늘의 한마디 작성 중 오류가 발생했습니다.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              code?: number;
            };
          };
        };

        if (axiosError.response?.data?.code === 400) {
          errorMessage = '오늘의 한마디는 하루에 다섯번까지 작성할 수 있어요';
        } else if (axiosError.response?.data?.code === 403) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (axiosError.response?.data?.code === 404) {
          errorMessage = '존재하지 않는 방입니다.';
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }

      openSnackbar({
        message: errorMessage,
        variant: 'top',
        onClose: () => {},
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [inputValue, roomId, isSubmitting, openSnackbar, todayMyMessageCount, DAILY_LIMIT]);

  const handleMessageDelete = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="오늘의 한마디"
        onLeftClick={handleBackClick}
      />
      <Container>
        <ContentArea>
          {isLoading && !hasInitiallyLoaded ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
              }}
            >
              <LoadingSpinner />
            </div>
          ) : messages.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <MessageList
                ref={messageListRef}
                messages={messages}
                roomId={roomId ? parseInt(roomId) : undefined}
                onMessageDelete={handleMessageDelete}
              />
              {isLoadingMore && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <LoadingSpinner />
                </div>
              )}
            </>
          )}
        </ContentArea>

        {!roomCompleted && (
          <MessageInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            placeholder="메이트들과 간단한 인사를 나눠 보세요!"
            disabled={isSubmitting}
          />
        )}
      </Container>
    </>
  );
};

export default TodayWords;
