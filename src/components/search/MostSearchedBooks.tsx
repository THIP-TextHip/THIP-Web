import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMostSearchedBooks, type MostSearchedBook } from '@/api/books/getMostSearchedBooks';
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
  EmptyMessage,
  MainText,
  SubText,
} from './MostSearchedBooks.styled';
import { MostSearchedBooksSkeleton } from '@/shared/ui/Skeleton';

export default function MostSearchedBooks() {
  const [books, setBooks] = useState<MostSearchedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostSearchedBooks = async () => {
      try {
        setIsLoading(true);
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [response] = await Promise.all([
          getMostSearchedBooks(),
          minLoadingTime,
        ]);

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
  if (isLoading) {
    return <MostSearchedBooksSkeleton />;
  }

  return (
    <Container>
      <Header>
        <Title>가장 많이 검색된 책</Title>
        <DateText>{getCurrentDate()}</DateText>
      </Header>
      {error ? (
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
