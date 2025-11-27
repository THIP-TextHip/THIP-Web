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

  const [isLiked, setIsLiked] = useState(record.isLiked || false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  const { openCommentBottomSheet } = useCommentBottomSheetStore();

  const isMyRecord = isWriter ?? false;

  const handleLikeClick = async () => {
    try {
      const postId = parseInt(id);
      const roomPostType = type === 'poll' ? 'VOTE' : 'RECORD';

      const response = await postRoomPostLike(postId, {
        type: !isLiked,
        roomPostType,
      });

      if (response.isSuccess) {
        setIsLiked(response.data.isLiked);
        setCurrentLikeCount((prev: number) => (response.data.isLiked ? prev + 1 : prev - 1));
      } else {
        openSnackbar({
          message: response.message || '좋아요 처리 중 오류가 발생했습니다.',
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

  const renderPageInfo = () => {
    if (recordType === 'overall') {
      return '총평';
    } else if (pageRange) {
      return `${pageRange}p`;
    }
    return '0p';
  };

  const handleEdit = useCallback(() => {
    if (!roomId) return;

    closePopup();

    if (type === 'poll') {
      const params = new URLSearchParams({
        content: content,
        pageRange: pageRange || '',
        recordType: recordType || 'normal',
        options: JSON.stringify(pollOptions?.map(option => option.text) || []),
      });

      navigate(`/memory/poll/edit/${roomId}/${record.id}?${params.toString()}`);
    } else {
      const params = new URLSearchParams({
        content: content,
        pageRange: pageRange || '',
        recordType: recordType || 'normal',
      });

      navigate(`/memory/record/edit/${roomId}/${record.id}?${params.toString()}`);
    }
  }, [roomId, record.id, content, pageRange, recordType, type, pollOptions, navigate, closePopup]);

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

  const handlePinRecord = useCallback(async () => {
    const currentRoomId = roomId || '1';
    const recordId = parseInt(record.id);

    try {
      const response = await pinRecordToFeed(parseInt(currentRoomId), recordId);

      if (response.isSuccess) {
        closePopup();

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

        closePopup();

        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('핀하기 API 호출 실패:', error);

      closePopup();

      openSnackbar({
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'top',
        onClose: () => {},
      });
    }
  }, [roomId, record.id, content, navigate, openSnackbar, closePopup]);

  const handlePinConfirm = useCallback(() => {
    openConfirm({
      title: '이 기록을 피드에 핀할까요?',
      disc: '핀하면 내 피드에 글을 옮길 수 있어요.',
      onConfirm: handlePinRecord,
      onClose: closePopup,
    });
  }, [openConfirm, handlePinRecord, closePopup]);

  const handleCommentClick = useCallback(() => {
    openCommentBottomSheet(parseInt(id), type === 'poll' ? 'VOTE' : 'RECORD');
  }, [openCommentBottomSheet, id, type]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (shouldBlur) {
        e.stopPropagation();
        return;
      }

      if (isMyRecord) {
        if (type === 'text') {
          openMoreMenu({
            onEdit: handleEdit,
            onDelete: handleDeleteConfirm,
            onClose: closePopup,
            onPin: handlePinConfirm,
            type: 'post' as const,
            isWriter: true,
          });
        } else {
          openMoreMenu({
            onEdit: handleEdit,
            onDelete: handleDeleteConfirm,
            onClose: closePopup,
            type: 'post' as const,
            isWriter: true,
          });
        }
      } else {
        openMoreMenu({
          onReport: handleReport,
          onClose: closePopup,
        });
      }
    },
    [
      isMyRecord,
      type,
      openMoreMenu,
      handleReport,
      handleEdit,
      handleDeleteConfirm,
      handlePinConfirm,
      closePopup,
      shouldBlur,
    ],
  );

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
          onClick={e => {
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
            onVoteUpdate={() => {}}
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
                    e.stopPropagation();
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
