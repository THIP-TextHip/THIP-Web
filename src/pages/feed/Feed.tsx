import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import MainHeader from '@/components/common/MainHeader';
import writefab from '../../assets/common/writefab.svg';
import { mockPosts } from '@/data/postData';


const Container = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
`;

const tabs = ['피드', '내 피드'];

const Feed = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <Container>
      <MainHeader type="home" />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === '피드' ? (
        <TotalFeed showHeader={true} posts={mockPosts} isMyFeed={false} />
      ) : (
        <MyFeed showHeader={false} posts={mockPosts} isMyFeed={true} />
      )}
      <NavBar src={writefab} path="/" />
    </Container>
  );
};

export default Feed;
