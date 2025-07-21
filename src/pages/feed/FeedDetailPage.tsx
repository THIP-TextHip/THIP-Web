import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import FeedPost from '@/components/feed/FeedPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import ReplyList from '@/components/common/Post/ReplyList';
import { mockFeedPost, mockCommentList } from '@/data/postData';
import MessageInput from '@/components/today-words/MessageInput';

const FeedDetailPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleMoreClick = () => {};

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('작성한 댓글 내용:', message);
    // 댓글 등록 API 호출 추가
    setMessage('');
  };

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
        rightIcon={<img src={moreIcon} alt="더보기" />}
        onRightClick={handleMoreClick}
      />
      <FeedPost {...mockFeedPost} />
      <ReplyList commentList={mockCommentList} />
      <MessageInput
        placeholder="여러분의 생각을 남겨주세요"
        value={message}
        onChange={setMessage}
        onSend={handleSend}
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
