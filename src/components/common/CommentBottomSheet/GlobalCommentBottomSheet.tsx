import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MessageInput from '@/components/today-words/MessageInput';
import ReplyList from '@/components/common/Post/ReplyList';
import { postReply } from '@/api/comments/postReply';
import { useReplyActions } from '@/hooks/useReplyActions';
import { useReplyStore } from '@/stores/replyStore';
import { useCommentBottomSheetStore } from '@/stores/commentBottomSheetStore';
import { usePopupActions } from '@/hooks/usePopupActions';
import { getRoomPlaying } from '@/api/rooms/getRoomPlaying';
import { isRoomCompleted } from '@/utils/roomStatus';
import {
  Overlay,
  BottomSheet,
  Header,
  Title,
  Content,
  InputSection,
} from './GlobalCommentBottomSheet.styled';

const GlobalCommentBottomSheet = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { isOpen, postId, postType, closeCommentBottomSheet } = useCommentBottomSheetStore();

  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [replyReloadKey, setReplyReloadKey] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { nickname, isReplying, cancelReply } = useReplyActions();
  const { parentId } = useReplyStore();
  const { openSnackbar } = usePopupActions();

  const handleSendComment = async () => {
    if (!inputValue.trim() || isSending || !postId || !postType) return;

    setIsSending(true);
    try {
      const requestData = {
        content: inputValue.trim(),
        isReplyRequest: isReplying,
        parentId: isReplying ? parentId : null,
        postType: postType as 'FEED' | 'RECORD' | 'VOTE',
      };

      const response = await postReply(postId, requestData);

      if (response.isSuccess) {
        setInputValue('');
        cancelReply();
        setReplyReloadKey(prev => prev + 1);
      } else {
        openSnackbar({
          message: response.message || '댓글 작성 중 오류가 발생했습니다.',
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('댓글 전송 실패:', error);
      openSnackbar({
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'top',
        onClose: () => {},
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCancelReply = () => {
    cancelReply();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCommentBottomSheet();
    }
  };

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

    if (isOpen) {
      checkRoomStatus();
    }
  }, [isOpen, roomId]);

  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
      cancelReply();
      setReplyReloadKey(0);
    }
  }, [isOpen, cancelReply]);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <BottomSheet isOpen={isOpen}>
        <Header>
          <Title>댓글</Title>
        </Header>

        <Content ref={contentRef}>
          {postId && postType ? (
            <ReplyList
              postId={postId}
              postType={postType}
              reloadKey={`${replyReloadKey}-${isOpen ? 'open' : 'closed'}`}
              rootRef={contentRef}
            />
          ) : null}
        </Content>

        {!roomCompleted && (
          <InputSection>
            <MessageInput
              placeholder={
                isReplying ? `@${nickname}님에게 답글을 남겨보세요` : '댓글을 남겨보세요'
              }
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendComment}
              isReplying={isReplying}
              onCancelReply={handleCancelReply}
              nickname={nickname}
              disabled={isSending}
            />
          </InputSection>
        )}
      </BottomSheet>
    </Overlay>
  );
};

export default GlobalCommentBottomSheet;
