import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MessageInput from '@/components/today-words/MessageInput';
import ReplyList from '@/components/common/Post/ReplyList';
import { getComments, type CommentData } from '@/api/comments/getComments';
import { postReply } from '@/api/comments/postReply';
import { useReplyActions } from '@/hooks/useReplyActions';
import { useReplyStore } from '@/stores/useReplyStore';
import { useCommentBottomSheetStore } from '@/stores/useCommentBottomSheetStore';
import { usePopupActions } from '@/hooks/usePopupActions';
import { getRoomPlaying } from '@/api/rooms/getRoomPlaying';
import { isRoomCompleted } from '@/utils/roomStatus';
import {
  Overlay,
  BottomSheet,
  Header,
  Title,
  Content,
  LoadingState,
  InputSection,
} from './GlobalCommentBottomSheet.styled';

const GlobalCommentBottomSheet = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { isOpen, postId, postType, closeCommentBottomSheet } = useCommentBottomSheetStore();

  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [roomCompleted, setRoomCompleted] = useState(false);
  
  const { nickname, isReplying, cancelReply } = useReplyActions();
  const { parentId } = useReplyStore();
  const { openSnackbar } = usePopupActions();

  // 댓글 목록 로드
  const loadComments = useCallback(async () => {
    if (!isOpen || !postId || !postType) return;

    setIsLoading(true);
    try {
      const response = await getComments(postId, {
        postType,
        size: 20,
      });

      if (response.data) {
        setCommentList(response.data.commentList);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, postId, postType]);

  // 댓글 전송
  const handleSendComment = async () => {
    if (!inputValue.trim() || isSending || !postId || !postType) return;

    setIsSending(true);
    try {
      const requestData = {
        content: inputValue.trim(),
        isReplyRequest: isReplying,
        parentId: isReplying ? parentId : null,
        postType: postType as 'FEED' | 'RECORD' | 'VOTE'
      };

      const response = await postReply(postId, requestData);

      if (response.isSuccess) {
        setInputValue('');
        cancelReply(); // 답글 상태 초기화
        // 댓글 목록 새로고침
        await loadComments();
      } else {
        // 서버에서 받은 에러 메시지 표시
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

  // 답글 취소
  const handleCancelReply = () => {
    cancelReply();
  };

  // Overlay 클릭 처리
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCommentBottomSheet();
    }
  };

  // 모임방 상태 확인
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

  // 바텀시트가 열릴 때 댓글 로드
  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, postId, loadComments]);

  // 바텀시트가 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
      cancelReply();
      setCommentList([]);
    }
  }, [isOpen, cancelReply]);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <BottomSheet isOpen={isOpen}>
        <Header>
          <Title>댓글</Title>
        </Header>
        
        <Content>
          {isLoading ? (
            <LoadingState>댓글을 불러오는 중...</LoadingState>
          ) : (
            <ReplyList 
              commentList={commentList} 
              onReload={loadComments}
            />
          )}
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