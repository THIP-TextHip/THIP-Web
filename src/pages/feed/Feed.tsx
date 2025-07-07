import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import type { PostData } from '../../types/post';

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
  },
  // …다른 포스트들…
];

const Feed = () => {
  const [activeTab, setActiveTab] = useState<'피드' | '내 피드'>('피드');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <Container>
      {/* MainHeader.tsx */}
      <TabBar activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === '피드' ? (
        <TotalFeed showHeader={true} posts={mockPosts} />
      ) : (
        <MyFeed showHeader={false} posts={mockPosts} />
      )}
      <NavBar />
    </Container>
  );
};

export default Feed;
