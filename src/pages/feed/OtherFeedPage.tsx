import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import NavBar from '../../components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import writefab from '../../assets/common/writefab.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import OtherFeed from '@/components/feed/OtherFeed';
import { mockPosts } from '@/data/postData';

const Container = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
`;

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
