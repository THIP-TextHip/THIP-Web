import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { usePopupActions } from '@/hooks/usePopupActions';
import { deleteRecord } from '@/api/record/deleteRecord';
import { deleteVote } from '@/api/record/deleteVote';

interface RecordItemProps {
  record: Record;
  shouldBlur?: boolean;
}

const RecordItem = ({ record, shouldBlur = false }: RecordItemProps) => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { openMoreMenu, openConfirm, openSnackbar, closePopup } = usePopupActions();

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
    isWriter,
  } = record;

  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  // 길게 누르기 상태 관리
  const [isPressed, setIsPressed] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasTriggeredLongPress = useRef(false);

  // API에서 받은 isWriter 속성으로 내 기록인지 판단
  const isMyRecord = isWriter ?? false;

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

  const handleEdit = useCallback(() => {
    const currentRoomId = roomId || '1';

    if (type === 'poll') {
      navigate(`/memory/poll/edit/${currentRoomId}/${record.id}`);
    } else {
      navigate(`/memory/record/edit/${currentRoomId}/${record.id}`);
    }
  }, [roomId, type, record.id, navigate]);

  const handleDelete = useCallback(async () => {
    const currentRoomId = roomId || '1';
    const recordId = parseInt(record.id);

    try {
      let response;

      if (type === 'poll') {
        response = await deleteVote(parseInt(currentRoomId), recordId);
      } else {
        response = await deleteRecord(parseInt(currentRoomId), recordId);
      }

      if (response.isSuccess) {
        const recordTypeName = type === 'poll' ? '투표' : '기록';
        openSnackbar({
          message: `${recordTypeName}가 삭제되었습니다.`,
          variant: 'top',
          onClose: () => {},
        });

        // TODO: 목록에서 해당 기록 제거 (부모 컴포넌트 업데이트 필요)
        // 현재는 페이지 새로고침으로 임시 처리
        window.location.reload();
      } else {
        openSnackbar({
          message: '삭제에 실패했습니다. 다시 시도해주세요.',
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      openSnackbar({
        message: '삭제 중 오류가 발생했습니다.',
        variant: 'top',
        onClose: () => {},
      });
    }
  }, [roomId, record.id, type, openSnackbar]);

  const handleDeleteConfirm = useCallback(() => {
    const recordTypeName = type === 'poll' ? '투표' : '기록';

    openConfirm({
      title: `${recordTypeName}을 삭제하시겠어요?`,
      disc: `삭제된 ${recordTypeName}은 복구할 수 없습니다.`,
      onConfirm: handleDelete,
    });
  }, [type, openConfirm, handleDelete]);

  const handleReport = useCallback(() => {
    openSnackbar({
      message: '신고가 접수되었습니다.',
      variant: 'top',
      onClose: () => {},
    });
  }, [openSnackbar]);

  const handleLongPress = useCallback(() => {
    if (isMyRecord) {
      // 내 기록: 수정하기, 삭제하기
      openMoreMenu({
        onEdit: handleEdit,
        onDelete: handleDeleteConfirm,
        onClose: closePopup,
      });
    } else {
      // 다른 사람 기록: 신고하기
      handleReport();
    }
  }, [isMyRecord, openMoreMenu, handleEdit, handleDeleteConfirm, handleReport, closePopup]);

  const handleLongPressStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ('touches' in e) {
        e.preventDefault();
      }

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      pressStartPos.current = { x: clientX, y: clientY };
      hasTriggeredLongPress.current = false;
      setIsPressed(true);

      longPressTimer.current = setTimeout(() => {
        if (!hasTriggeredLongPress.current) {
          hasTriggeredLongPress.current = true;
          handleLongPress();
        }
      }, 500);
    },
    [handleLongPress],
  );

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsPressed(false);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!longPressTimer.current) return;

      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;

      const deltaX = Math.abs(clientX - pressStartPos.current.x);
      const deltaY = Math.abs(clientY - pressStartPos.current.y);

      if (deltaX > 10 || deltaY > 10) {
        handleLongPressEnd();
      }
    },
    [handleLongPressEnd],
  );

  return (
    <Container
      shouldBlur={shouldBlur}
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onMouseLeave={handleLongPressEnd}
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}
      onTouchMove={handleTouchMove}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease',
        touchAction: 'manipulation',
      }}
    >
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
