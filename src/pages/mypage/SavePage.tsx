import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TitleHeader from '../../components/common/TitleHeader';
import TabBar from '@/components/feed/TabBar';
import FeedPost from '@/components/feed/FeedPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import save from '../../assets/feed/save.svg';
import activeSave from '../../assets/feed/activeSave.svg';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { mockBooks } from '@/data/bookData';
import { mockPosts } from '@/data/postData';

const tabs = ['피드', '책'];

const SavePage = () => {
  const hasPosts = mockPosts.length > 0;
  const hasBooks = mockBooks.length > 0;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [savedBooks, setSavedBooks] = useState<{ [isbn: string]: boolean }>({});

  const handleBack = () => {
    navigate('/mypage');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleSaveToggle = (isbn: string) => {
    setSavedBooks(prev => ({
      ...prev,
      [isbn]: !prev[isbn],
    }));
  };

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBack}
        title="저장"
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === '피드' ? (
        <>
          {hasPosts ? (
            <FeedContainer>
              {mockPosts.map(post => (
                <FeedPost key={post.feedId} showHeader={true} isMyFeed={false} {...post} />
              ))}
            </FeedContainer>
          ) : (
            <EmptyState>
              <div className="title">아직 저장한 피드가 없어요</div>
              <div className="sub-title">마음에 드는 책을 THIP 해보세요!</div>
            </EmptyState>
          )}
        </>
      ) : hasBooks ? (
        <>
          <BookList>
            {mockBooks.map(book => (
              <BookItem key={book.isbn}>
                <LeftSection>
                  <Cover src={book.coverUrl} alt={`${book.title} 커버`} />
                  <BookInfo>
                    <Title>{book.title}</Title>
                    <Subtitle>
                      {book.author} 저 · {book.publisher}
                    </Subtitle>
                  </BookInfo>
                </LeftSection>
                <SaveIcon onClick={() => handleSaveToggle(book.isbn)}>
                  <img
                    src={savedBooks[book.isbn] ? activeSave : save}
                    alt={savedBooks[book.isbn] ? '저장됨' : '저장'}
                  />
                </SaveIcon>
              </BookItem>
            ))}
          </BookList>
        </>
      ) : (
        <EmptyState>
          <div className="title">아직 저장한 책이 없어요</div>
          <div className="sub-title">마음에 드는 책을 THIP 해보세요!</div>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #121212;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  min-height: 100%;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 20px;
  gap: 8px;
  flex: 1;

  .title {
    color: ${colors.white};
    text-align: center;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 24px;
  }

  .sub-title {
    color: ${colors.grey[100]};
    text-align: center;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: normal;
  }
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 540px;
  padding-top: 32px;
  margin: 0 auto;
  width: 100%;
`;

const BookItem = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.darkgrey.dark};
  padding: 12px 20px;
  justify-content: space-between;
`;

const Cover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.white};
`;

const Subtitle = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[200]};
  margin-top: 8px;
`;

const SaveIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default SavePage;
