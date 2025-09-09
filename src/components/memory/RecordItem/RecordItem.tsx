import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Record } from '../../../types/memory';
import TextRecord from './TextRecord';
import PollRecord from './PollRecord';
import { useCommentBottomSheetStore } from '@/stores/useCommentBottomSheetStore';
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
  const { openMoreMenu, openConfirm, openSnackbar, closePopup } = usePopupActions();

  const {
    id,
    user,
    profileImageUrl,
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

  // 전역 댓글 바텀시트
  const { openCommentBottomSheet } = useCommentBottomSheetStore();


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
    if (!roomId) return;
    
    // 바텀시트 닫기
    closePopup();
    
    // 기록 수정 페이지로 이동 (기록 정보를 쿼리 파라미터로 전달)
    const params = new URLSearchParams({
      content: content,
      pageRange: pageRange || '',
      recordType: recordType || 'normal'
    });
    
    navigate(`/memory/record/edit/${roomId}/${record.id}?${params.toString()}`);
  }, [roomId, record.id, content, pageRange, recordType, navigate, closePopup]);

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
        // 팝업 먼저 닫기
        closePopup();
        
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
            },
          },
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

        // 실패한 경우에도 팝업 닫기
        closePopup();
        
        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('핀하기 API 호출 실패:', error);
      
      // 네트워크 오류 시에도 팝업 닫기
      closePopup();
      
      openSnackbar({
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'top',
        onClose: () => {},
      });
    }
  }, [roomId, record.id, content, navigate, openSnackbar, closePopup]);

  // 핀하기 확인 팝업 핸들러
  const handlePinConfirm = useCallback(() => {
    openConfirm({
      title: '이 기록을 피드에 핀할까요?',
      disc: '핀하면 내 피드에 글을 옮길 수 있어요.',
      onConfirm: handlePinRecord,
      onClose: closePopup, // "아니오" 버튼 클릭 시 팝업 닫기
    });
  }, [openConfirm, handlePinRecord, closePopup]);

  // 댓글 버튼 클릭 핸들러
  const handleCommentClick = useCallback(() => {
    openCommentBottomSheet(parseInt(id), type === 'poll' ? 'VOTE' : 'RECORD');
  }, [openCommentBottomSheet, id, type]);


  const handleClick = useCallback((e: React.MouseEvent) => {
    // 블라인드된 상태에서는 클릭 이벤트 무시
    if (shouldBlur) {
      e.stopPropagation();
      return;
    }
    
    // 클릭으로 더보기 메뉴 표시
    if (isMyRecord) {
      const menuOptions: any = {
        onEdit: handleEdit,
        onDelete: handleDeleteConfirm,
        onClose: closePopup,
        type: 'post',
        isWriter: true,
      };
      
      // 기록(text)일 때만 핀하기 기능 추가
      if (type === 'text') {
        menuOptions.onPin = handlePinConfirm;
      }
      
      openMoreMenu(menuOptions);
    } else {
      openMoreMenu({
        onReport: handleReport,
        onClose: closePopup,
      });
    }
  }, [
    isMyRecord,
    type,
    openMoreMenu,
    handleReport,
    handleEdit,
    handleDeleteConfirm,
    handlePinConfirm,
    closePopup,
  ]);

  return (
    <Container
      onClick={handleClick}
      shouldBlur={shouldBlur}
      style={{
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {shouldBlur && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            cursor: 'default',
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      <UserSection>
        <UserAvatar src={profileImageUrl} />
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
            shouldBlur={shouldBlur}
            onVoteUpdate={updatedOptions => {
              // TODO: 부모 컴포넌트로 투표 결과 업데이트 전달
              console.log('투표 결과 업데이트:', updatedOptions);
            }}
          />
        )}
      </ContentSection>

      <ActionSection>
        <ActionButton
          onClick={
            shouldBlur
              ? undefined
              : e => {
                  e.stopPropagation();
                  handleLikeClick();
                }
          }
          style={{
            cursor: shouldBlur ? 'default' : 'pointer',
            pointerEvents: shouldBlur ? 'none' : 'auto',
          }}
        >
          <img
            src={isLiked ? heartFilledIcon : heartIcon}
            alt={isLiked ? '좋아요 취소' : '좋아요'}
          />
          <span>{currentLikeCount}</span>
        </ActionButton>
        <ActionButton
          onClick={
            shouldBlur
              ? undefined
              : e => {
                  e.stopPropagation();
                  handleCommentClick();
                }
          }
          style={{
            cursor: shouldBlur ? 'default' : 'pointer',
            pointerEvents: shouldBlur ? 'none' : 'auto',
          }}
        >
          <img src={commentIcon} alt="댓글" />
          <span>{commentCount}</span>
        </ActionButton>
        {isMyRecord && type === 'text' && (
          <ActionButton
            onClick={
              shouldBlur
                ? undefined
                : e => {
                    e.stopPropagation(); // 이벤트 버블링 방지
                    handlePinConfirm();
                  }
            }
            style={{
              cursor: shouldBlur ? 'default' : 'pointer',
              pointerEvents: shouldBlur ? 'none' : 'auto',
            }}
          >
            <img src={pinIcon} alt="피드에 핀하기" />
          </ActionButton>
        )}
      </ActionSection>
    </Container>
  );
};

export default RecordItem;
