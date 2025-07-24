import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import FeedDetailPost from '@/components/feed/FeedDetailPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import ReplyList from '@/components/common/Post/ReplyList';
import { mockFeedPost, mockCommentList } from '@/data/postData';
import MessageInput from '@/components/today-words/MessageInput';
import { usePopupActions } from '@/hooks/usePopupActions';
import { useReplyActions } from '@/hooks/useReplyActions';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { openMoreMenu, openConfirm, openSnackbar, closePopup } = usePopupActions();
  const { isReplying, targetUserName, replyContent, setReplyContent, submitComment, cancelReply } =
    useReplyActions();
  const feedId = mockFeedPost.feedId;

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

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
        rightIcon={<img src={moreIcon} alt="더보기" />}
        onRightClick={handleMoreClick}
      />
      <FeedDetailPost {...mockFeedPost} />
      <ReplyList commentList={mockCommentList} />
      <MessageInput
        value={replyContent}
        onChange={setReplyContent}
        onSend={() => {
          submitComment({ postId: feedId, postType: 'feed' });
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

export default FeedDetailPage;
