import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Record } from '../../../types/memory';
import TextRecord from './TextRecord';
import PollRecord from './PollRecord';
import CommentModal from '../CommentModal/CommentModal';
import heartIcon from '../../../assets/memory/heart.svg';
import heartFilledIcon from '../../../assets/memory/heart-filled.svg';
import commentIcon from '../../../assets/memory/comment.svg';
import pinIcon from '../../../assets/feed/pin.svg';
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
import { postRoomPostLike } from '@/api/roomPosts/postRoomPostLike';
import { pinRecordToFeed } from '@/api/record/pinRecordToFeed';

interface RecordItemProps {
  record: Record;
  shouldBlur?: boolean;
}

const RecordItem = ({ record, shouldBlur = false }: RecordItemProps) => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { openMoreMenu, openConfirm, openSnackbar } = usePopupActions();

  const {
    id,
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

  // 좋아요 상태 관리 - record 객체에서 isLiked 속성 가져오기
  const [isLiked, setIsLiked] = useState(record.isLiked || false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  
  // 댓글 모달 상태 관리
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // 길게 누르기 상태 관리
  const [isPressed, setIsPressed] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasTriggeredLongPress = useRef(false);

  // API에서 받은 isWriter 속성으로 내 기록인지 판단
  const isMyRecord = isWriter ?? false;

  // 좋아요 클릭 핸들러 - API 연동
  const handleLikeClick = async () => {
    try {
      const postId = parseInt(id);
      const roomPostType = type === 'poll' ? 'VOTE' : 'RECORD';

      const response = await postRoomPostLike(postId, {
        type: !isLiked, // 현재 상태 반대로 전송
        roomPostType,
      });

      if (response.isSuccess) {
        // 서버 응답으로 상태 업데이트
        setIsLiked(response.data.isLiked);
        setCurrentLikeCount((prev: number) => (response.data.isLiked ? prev + 1 : prev - 1));
        console.log('좋아요 상태 변경 성공:', response.data.isLiked);
      } else {
        console.error('좋아요 상태 변경 실패:', response.message);

        // 에러 메시지에 따른 사용자 알림
        let errorMessage = '좋아요 처리 중 오류가 발생했습니다.';

        if (response.code === 140011) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (response.code === 185001) {
          errorMessage = '이미 좋아요한 게시물입니다.';
        } else if (response.code === 185002) {
          errorMessage = '좋아요하지 않은 게시물은 취소할 수 없습니다.';
        } else if (response.code === 100009) {
          errorMessage = '잘못된 게시물 타입입니다.';
        } else if (response.code === 110009) {
          errorMessage = '존재하지 않는 게시물입니다.';
        } else if (response.code === 40500) {
          errorMessage = '허용되지 않는 HTTP 메소드입니다.';
        }

        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('좋아요 API 호출 실패:', error);
      openSnackbar({
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'top',
        onClose: () => {},
      });
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

  // 기록을 피드에 핀하기 핸들러
  const handlePinRecord = useCallback(async () => {
    const currentRoomId = roomId || '1';
    const recordId = parseInt(record.id);

    try {
      const response = await pinRecordToFeed(parseInt(currentRoomId), recordId);
      
      if (response.isSuccess) {
        // 피드 작성 페이지로 이동하면서 데이터 전달
        navigate('/feed/write', {
          state: {
            pinData: {
              bookTitle: response.data.bookTitle,
              authorName: response.data.authorName,
              bookImageUrl: response.data.bookImageUrl,
              isbn: response.data.isbn,
              recordContent: content,
              roomId: currentRoomId,
              recordId: record.id,
            }
          }
        });
      } else {
        let errorMessage = '핀하기에 실패했습니다.';
        
        if (response.code === 130000) {
          errorMessage = '존재하지 않는 기록입니다.';
        } else if (response.code === 130003) {
          errorMessage = '기록 접근 권한이 없습니다.';
        } else if (response.code === 140011) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (response.code === 80010) {
          errorMessage = '존재하지 않는 책입니다.';
        }

        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('핀하기 API 호출 실패:', error);
      openSnackbar({
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'top',
        onClose: () => {},
      });
    }
  }, [roomId, record.id, content, navigate, openSnackbar]);

  // 핀하기 확인 팝업 핸들러
  const handlePinConfirm = useCallback(() => {
    openConfirm({
      title: '기록을 피드에 핀하시겠어요?',
      disc: '기록의 내용으로 피드 글 작성 페이지가 열립니다.',
      onConfirm: handlePinRecord,
    });
  }, [openConfirm, handlePinRecord]);

  // 댓글 버튼 클릭 핸들러
  const handleCommentClick = useCallback(() => {
    setIsCommentModalOpen(true);
  }, []);

  // 댓글 모달 닫기 핸들러
  const handleCommentModalClose = useCallback(() => {
    setIsCommentModalOpen(false);
  }, []);

  // 길게 누르기 이벤트 핸들러
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isMyRecord) return;

      setIsPressed(true);
      hasTriggeredLongPress.current = false;
      pressStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      longPressTimer.current = setTimeout(() => {
        hasTriggeredLongPress.current = true;
        setIsPressed(false);

        openMoreMenu({
          onReport: handleReport,
        });
      }, 800);
    },
    [isMyRecord, openMoreMenu, handleReport],
  );

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!longPressTimer.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - pressStartPos.current.x);
    const deltaY = Math.abs(currentY - pressStartPos.current.y);

    if (deltaX > 10 || deltaY > 10) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      setIsPressed(false);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsPressed(false);
  }, []);

  const handleClick = useCallback(() => {
    if (hasTriggeredLongPress.current) {
      hasTriggeredLongPress.current = false;
      return;
    }

    if (isMyRecord) {
      openMoreMenu({
        onEdit: handleEdit,
        onDelete: handleDeleteConfirm,
        onPin: handlePinConfirm,
        type: 'post', // 중요: post 타입으로 설정해야 핀하기 버튼이 표시됨
        isWriter: true, // 내 기록임을 명시
      });
    }
  }, [isMyRecord, openMoreMenu, handleEdit, handleDeleteConfirm, handlePinConfirm]);

  return (
    <Container
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        filter: shouldBlur ? 'blur(4px)' : 'none',
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
          <PollRecord 
            content={content} 
            pollOptions={pollOptions || []} 
            postId={parseInt(id)}
            onVoteUpdate={(updatedOptions) => {
              // TODO: 부모 컴포넌트로 투표 결과 업데이트 전달
              console.log('투표 결과 업데이트:', updatedOptions);
            }}
          />
        )}
      </ContentSection>

      <ActionSection>
        <ActionButton onClick={(e) => {
          e.stopPropagation();
          handleLikeClick();
        }}>
          <img
            src={isLiked ? heartFilledIcon : heartIcon}
            alt={isLiked ? '좋아요 취소' : '좋아요'}
          />
          <span>{currentLikeCount}</span>
        </ActionButton>
        <ActionButton onClick={(e) => {
          e.stopPropagation();
          handleCommentClick();
        }}>
          <img src={commentIcon} alt="댓글" />
          <span>{commentCount}</span>
        </ActionButton>
        {isMyRecord && (
          <ActionButton 
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지
              handlePinConfirm();
            }}
          >
            <img src={pinIcon} alt="피드에 핀하기" />
          </ActionButton>
        )}
      </ActionSection>

      {/* 댓글 모달 */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={handleCommentModalClose}
        postId={parseInt(id)}
        postType={type === 'poll' ? 'VOTE' : 'RECORD'}
      />
    </Container>
  );
};

export default RecordItem;
