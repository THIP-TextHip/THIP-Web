import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import FeedDetailPost from '@/components/feed/FeedDetailPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import ReplyList from '@/components/common/Post/ReplyList';
import { mockCommentList } from '@/data/postData';
import MessageInput from '@/components/today-words/MessageInput';
import { usePopupActions } from '@/hooks/usePopupActions';
import { useReplyActions } from '@/hooks/useReplyActions';
import { getFeedDetail, type FeedDetailData } from '@/api/feeds/getFeedDetail';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { feedId } = useParams<{ feedId: string }>();
  const [feedData, setFeedData] = useState<FeedDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { openMoreMenu, openConfirm, openSnackbar, closePopup } = usePopupActions();
  const { isReplying, targetUserName, replyContent, setReplyContent, submitComment, cancelReply } =
    useReplyActions();

  // 피드 상세 정보 로드
  useEffect(() => {
    const loadFeedDetail = async () => {
      if (!feedId) {
        setError('피드 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getFeedDetail(Number(feedId));
        setFeedData(response.data);
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

  const handleMoreClick = () => {
    openMoreMenu({
      onEdit: () => console.log('수정하기 클릭'),
      onDelete: () => {
        openConfirm({
          title: '이 피드를 삭제하시겠어요?',
          disc: '삭제 후에는 되돌릴 수 없어요',
          onConfirm: async () => {
            console.log('API 호출: 피드 삭제');
            closePopup();
            openSnackbar({
              message: '피드가 삭제되었습니다.',
              variant: 'top',
              onClose: closePopup,
            });
          },
          onClose: closePopup,
        });
      },
      onClose: closePopup,
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <Wrapper>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          onLeftClick={handleBackClick}
        />
        <LoadingMessage>피드 글 로딩 중...</LoadingMessage>
      </Wrapper>
    );
  }

  // 에러가 있을 때
  if (error || !feedData) {
    return (
      <Wrapper>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          onLeftClick={handleBackClick}
        />
        <ErrorMessage>{error || '피드 글을 찾을 수 없어요.'}</ErrorMessage>
      </Wrapper>
    );
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
      <ReplyList commentList={mockCommentList} />
      <MessageInput
        value={replyContent}
        onChange={setReplyContent}
        onSend={() => {
          submitComment({ postId: Number(feedId), postType: 'feed' });
        }}
        placeholder="댓글을 입력하세요"
        isReplying={isReplying}
        targetUserName={targetUserName}
        onCancelReply={cancelReply}
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

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-white);
  font-size: var(--font-size-base);
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-red);
  font-size: var(--font-size-base);
  text-align: center;
`;

export default FeedDetailPage;
