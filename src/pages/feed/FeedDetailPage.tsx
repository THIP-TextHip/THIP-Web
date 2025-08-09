import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import FeedDetailPost from '@/components/feed/FeedDetailPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import ReplyList from '@/components/common/Post/ReplyList';
import MessageInput from '@/components/today-words/MessageInput';
import { usePopupActions } from '@/hooks/usePopupActions';
import { useReplyActions } from '@/hooks/useReplyActions';
import { getFeedDetail, type FeedDetailData } from '@/api/feeds/getFeedDetail';
import { getComments, type CommentData } from '@/api/comments/getComments';
import { deleteFeedPost } from '@/api/feeds/deleteFeedPost';
import { useReplyStore } from '@/stores/useReplyStore';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { feedId } = useParams<{ feedId: string }>();
  const [feedData, setFeedData] = useState<FeedDetailData | null>(null);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { openMoreMenu, openConfirm, openSnackbar, closePopup } = usePopupActions();
  const { isReplying, replyContent, setReplyContent, submitComment, cancelReply } =
    useReplyActions();
  const { nickname } = useReplyStore();
  // 댓글 목록을 다시 로드하는 함수
  const reloadComments = useCallback(async () => {
    if (!feedId) return;

    try {
      const commentsResponse = await getComments(Number(feedId), { postType: 'FEED' });
      setCommentList(commentsResponse.data.commentList);
    } catch (err) {
      console.error('댓글 목록 다시 로드 실패:', err);
    }
  }, [feedId]);

  // 페이지를 떠날 때 답글 상태 초기화
  useEffect(() => {
    return () => {
      cancelReply();
    };
  }, [cancelReply]);

  // 피드 상세 정보와 댓글 목록 로드
  useEffect(() => {
    const loadFeedDetailAndComments = async () => {
      if (!feedId) {
        setError('피드 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 피드 상세 정보와 댓글 목록을 병렬로 로드
        const [feedResponse, commentsResponse] = await Promise.all([
          getFeedDetail(Number(feedId)),
          getComments(Number(feedId), { postType: 'FEED' }),
        ]);

        setFeedData(feedResponse.data);
        setCommentList(commentsResponse.data.commentList);
        setError(null);
      } catch (err) {
        console.error('피드 상세 정보 또는 댓글 로드 실패:', err);
        setError('피드 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadFeedDetailAndComments();
  }, [feedId]);

  const handleCommentSubmit = async () => {
    await submitComment({
      postId: Number(feedId),
      postType: 'FEED',
      onSuccess: reloadComments,
    });
  };

  const handleMoreClick = () => {
    openMoreMenu({
      onEdit: () => console.log('수정하기 클릭'),
      onClose: () => {
        closePopup();
      },
      onDelete: () => {
        openConfirm({
          title: '이 피드를 삭제하시겠어요?',
          disc: '삭제 후에는 되돌릴 수 없어요',
          onClose: closePopup,
          onConfirm: async () => {
            try {
              if (!feedId) return;
              const resp = await deleteFeedPost(Number(feedId));
              if (resp.isSuccess) {
                closePopup();
                openSnackbar({
                  message: '피드 삭제를 완료했어요.',
                  variant: 'top',
                  onClose: () => {
                    closePopup();
                    navigate('/feed', { state: { initialTab: '내 피드' } });
                  },
                });
              } else {
                openSnackbar({
                  message: '피드 삭제를 실패했어요.',
                  variant: 'top',
                  onClose: closePopup,
                });
              }
            } catch (e) {
              console.error('피드 삭제 실패:', e);
              openSnackbar({
                message: '피드 삭제 중 오류가 발생했어요.',
                variant: 'top',
                onClose: closePopup,
              });
            }
          },
        });
      },
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  if (!feedData) {
    return <></>;
  }

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
        rightIcon={<img src={moreIcon} alt="더보기" />}
        onRightClick={handleMoreClick}
      />
      <FeedDetailPost {...feedData} />
      <ReplyList commentList={commentList} onReload={reloadComments} />
      <MessageInput
        placeholder="여러분의 생각을 남겨주세요."
        value={replyContent}
        onChange={setReplyContent}
        onSend={handleCommentSubmit}
        isReplying={isReplying}
        onCancelReply={cancelReply}
        nickname={nickname}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  padding-top: 56px;
  margin: 0 auto;
  background-color: #121212;
`;

export default FeedDetailPage;
