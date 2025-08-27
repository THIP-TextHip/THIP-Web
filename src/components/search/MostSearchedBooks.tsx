import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMostSearchedBooks, type MostSearchedBook } from '@/api/books/getMostSearchedBooks';

export default function MostSearchedBooks() {
  const [books, setBooks] = useState<MostSearchedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostSearchedBooks = async () => {
      try {
        setIsLoading(true);
        const response = await getMostSearchedBooks();

        if (response.isSuccess) {
          setBooks(response.data.bookList);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error('인기 검색 도서 조회 오류:', error);
        setError('인기 검색 도서를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMostSearchedBooks();
  }, []);

  const handleBookClick = (isbn: string) => {
    navigate(`/search/book/${isbn}`);
  };

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
      {isLoading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : error ? (
        <EmptyMessage>
          <MainText>데이터를 불러올 수 없어요.</MainText>
          <SubText>{error}</SubText>
        </EmptyMessage>
      ) : books.length === 0 ? (
        <EmptyMessage>
          <MainText>아직 순위가 집계되지 않았어요.</MainText>
          <SubText>조금만 기다려주세요!</SubText>
        </EmptyMessage>
      ) : (
        <BookList>
          {books.map(book => (
            <BookItem key={book.isbn} onClick={() => handleBookClick(book.isbn)}>
              <Rank>{book.rank}.</Rank>
              <Cover src={book.imageUrl} alt={`${book.title} 커버`} />
              <BookTitle>{book.title}</BookTitle>
            </BookItem>
          ))}
        </BookList>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 20px 0 20px;
  background-color: var(--color-black-main);
  margin-bottom: 72px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: ${typography.fontSize.lg};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.semibold};
`;

const DateText = styled.span`
  font-size: ${typography.fontSize.xs};
  color: ${colors.grey[300]};
  font-weight: ${typography.fontWeight.regular};
`;

const BookList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const BookItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.darkgrey.dark};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.darkgrey.main};
  }
`;

const Rank = styled.span`
  font-size: ${typography.fontSize.base};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.medium};
  width: 24px;
`;

const Cover = styled.img`
  width: 45px;
  height: 60px;
  object-fit: cover;
  flex-shrink: 0;
`;

const BookTitle = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  flex: 1 1 0%;
  min-width: 0;
  max-width: calc(100% - 77px);
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const MainText = styled.div`
  font-size: ${typography.fontSize.lg};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
`;

const SubText = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.grey[100]};
  font-weight: ${typography.fontWeight.regular};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${typography.fontSize.base};
  color: ${colors.grey[200]};
  font-weight: ${typography.fontWeight.regular};
`;
