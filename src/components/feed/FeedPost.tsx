import styled from '@emotion/styled';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Container = styled.div`
  display: flex;
  min-width: 320px;
  margin: 0 auto;
  background-color: var(--color-black-main);
  width: 100%;
  max-width: 500px;
  height: auto;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const BorderBottom = styled.div`
  width: 100%;
  height: 10px;
  background-color: #282828;
`;

const postData = {
  profileImgUrl: 'https://placehold.co/24x24',
  userName: 'userName',
  userTitle: 'userTitle',
  titleColor: '#FF8BAC',
  createdAt: '12시간 전',

  bookTitle: '책글자수 테스트를 위한 제목입니다.책제목책제목책제목책제목',
  bookAuthor: '작가명 글자수 테스트를 위한 작가명입니다.',
  postContent:
    '글자수 제한 확인을 위한 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다',
  postId: '55',

  initialLikeCount: 125,
  commentCount: 125,

  images: [
    'https://placehold.co/100x100',
    'https://placehold.co/100x100',
    'https://placehold.co/100x100',
  ],
};

const FeedPost = () => {
  return (
    <>
      <Container>
        <PostHeader {...postData} />
        <PostBody {...postData} />
        <PostFooter {...postData} />
      </Container>
      <BorderBottom />
      {/* 페이징 처리에서 마지막 게시글인 경우 BorderBottom 안보이게 처리해야함 */}
    </>
  );
};

export default FeedPost;
