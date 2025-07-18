import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import NavBar from '../../components/common/NavBar';
import type { PostData } from '../../types/post';
import TitleHeader from '@/components/common/TitleHeader';
import writefab from '../../assets/common/writefab.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import OtherFeed from '@/components/feed/OtherFeed';

const Container = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
`;

const mockPosts: PostData[] = [
  {
    profileImgUrl: 'https://placehold.co/24x24',
    userName: 'userName',
    userTitle: 'userTitle',
    titleColor: '#FF8BAC',
    createdAt: '12시간 전',
    bookTitle: '제목입니다',
    bookAuthor: '작가입니다',
    postContent: '내용입니다…',
    postId: '55',
    initialLikeCount: 125,
    commentCount: 125,
    images: ['https://placehold.co/100x100', 'https://placehold.co/100x100'],
    isPublic: true,
  },
  {
    profileImgUrl: 'https://placehold.co/24x24',
    userName: 'userName',
    userTitle: 'userTitle',
    titleColor: '#FF8BAC',
    createdAt: '12시간 전',
    bookTitle: '제목입니다제목입니다제목입니다',
    bookAuthor: '작가입니다',
    postContent:
      '내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다',
    postId: '56',
    initialLikeCount: 125,
    commentCount: 125,
    isPublic: false,
  },
  // …다른 포스트들…
];

const OtherFeedPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
      />
      <OtherFeed showHeader={false} posts={mockPosts} isMyFeed={false} />
      <NavBar src={writefab} path="/" />
    </Container>
  );
};

export default OtherFeedPage;
