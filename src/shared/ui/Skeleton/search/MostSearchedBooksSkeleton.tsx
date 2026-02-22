import Skeleton from '../base/Skeleton';
import {
  Container,
  Header,
  Title,
  DateText,
  BookList,
  BookItem,
  Rank,
  Cover,
  BookTitle,
} from '@/components/search/MostSearchedBooks.styled';

const MostSearchedBooksSkeleton = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${month}.${day}. 기준`;
  };

  return (
    <Container>
      <Header>
        <Title>가장 많이 검색된 책</Title>
        <DateText>{getCurrentDate()}</DateText>
      </Header>
      <BookList>
        {Array.from({ length: 5 }).map((_, i) => (
          <BookItem key={i} style={{ cursor: 'default', pointerEvents: 'none' }}>
            <Rank>
              <Skeleton.Text width={16} height={16} />
            </Rank>
            <Cover as="div" style={{ background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Skeleton.Box width={45} height={60} />
            </Cover>
            <BookTitle as="div" style={{ marginLeft: '8px' }}>
              <Skeleton.Text width="100%" height={14} />
            </BookTitle>
          </BookItem>
        ))}
      </BookList>
    </Container>
  );
};

export default MostSearchedBooksSkeleton;
