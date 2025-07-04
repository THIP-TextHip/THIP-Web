import { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import FollowList from '../../components/feed/FollowList';
import { Container, FeedSection } from '../../pages/feed/Feed.styled';
import FeedPost from '@/components/feed/FeedPost';

const Feed = () => {
  const [activeTab, setActiveTab] = useState<'피드' | '내 피드'>('피드');

  return (
    <Container>
      {/* MainHeader.tsx */}
      <TabBar activeTab={activeTab} onTabClick={setActiveTab} />
      <FollowList />
      <FeedSection>
        {activeTab === '피드' && <FeedPost />}
        {activeTab === '내 피드' && <div>내 피드 내용</div>}
      </FeedSection>
      <NavBar />
    </Container>
  );
};

export default Feed;
