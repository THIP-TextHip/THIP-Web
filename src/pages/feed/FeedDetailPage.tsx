import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TitleHeader from '@/components/common/TitleHeader';
import FeedDetailPost from '@/components/feed/FeedDetailPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import ReplyList from '@/components/common/Post/ReplyList';
import MessageInput from '@/components/today-words/MessageInput';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { usePopupActions } from '@/hooks/usePopupActions';
import { useReplyActions } from '@/hooks/useReplyActions';
import { getFeedDetail, type FeedDetailData } from '@/api/feeds/getFeedDetail';
import { deleteFeedPost } from '@/api/feeds/deleteFeedPost';
import Skeleton, { FeedPostSkeleton } from '@/shared/ui/Skeleton';
import { Wrapper, SkeletonWrapper, CommentSkeletonItem } from './FeedDetailPage.styled';
import { useReplyStore } from '@/stores/replyStore';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { feedId } = useParams<{ feedId: string }>();
  const [feedData, setFeedData] = useState<FeedDetailData | null>(null);
  const [replyReloadKey, setReplyReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { openMoreMenu, openConfirm, openSnackbar, closePopup } = usePopupActions();
  const { isReplying, replyContent, setReplyContent, submitComment, cancelReply } =
    useReplyActions();
  const { nickname } = useReplyStore();

  useEffect(() => {
    return () => {
      cancelReply();
    };
  }, [cancelReply]);

  useEffect(() => {
    const loadFeedDetail = async () => {
      if (!feedId) {
        setError('피드 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const feedResponse = await getFeedDetail(Number(feedId));
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [feedResponse, commentsResponse] = await Promise.all([
          getFeedDetail(Number(feedId)),
          getComments(Number(feedId), { postType: 'FEED' }),
        ]);
        await minLoadingTime;

        setFeedData(feedResponse.data);
        setError(null);
      } catch (err) {
        console.error('피드 상세 정보 로드 실패:', err);
        setError('피드 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadFeedDetail();
  }, [feedId]);

  const handleCommentSubmit = async () => {
    await submitComment({
      postId: Number(feedId),
      postType: 'FEED',
      onSuccess: () => setReplyReloadKey(prev => prev + 1),
    });
  };

  const handleMoreClick = () => {
    if (feedData?.isWriter) {
      openMoreMenu({
        onEdit: () => {
          closePopup();
          navigate(`/post/update/${feedId}`);
        },
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
                    onClose: closePopup,
                  });
                  navigate('/feed', { state: { initialTab: '내 피드' } });
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
        isWriter: true,
        type: 'post',
      });
    } else {
      openMoreMenu({
        onClose: () => {
          closePopup();
        },
        onReport: () => {
          closePopup();
          openSnackbar({
            message: '신고가 접수되었어요.',
            variant: 'top',
            onClose: closePopup,
          });
        },
        isWriter: false,
        type: 'post',
      });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Wrapper>
        <LoadingSpinner size="large" fullHeight={true} />
      </Wrapper>
    );
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          onLeftClick={handleBackClick}
        />
        <SkeletonWrapper>
          <FeedPostSkeleton />
          {Array.from({ length: 5 }).map((_, index) => (
            <CommentSkeletonItem key={index}>
              <Skeleton.Circle width={36} />
              <div style={{ flex: 1 }}>
                <Skeleton.Text width={80} height={14} />
                <Skeleton.Text lines={2} height={14} gap={6} />
              </div>
            </CommentSkeletonItem>
          ))}
        </SkeletonWrapper>
      </Wrapper>
    );
  }

  if (error) {
    return <></>;
  }

  if (error || !feedData) {
    return <Wrapper />;
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
      <ReplyList postId={Number(feedId)} postType="FEED" reloadKey={`${replyReloadKey}`} />
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

export default FeedDetailPage;
