import type { SearchedBook } from '@/pages/search/Search';
import { useNavigate } from 'react-router-dom';
import {
  Wrapper,
  List,
  BookItem,
  ResultHeader,
  Cover,
  BookInfo,
  Title,
  Subtitle,
  EmptyWrapper,
  MainText,
  SubText,
  RequestButton,
} from './BookSearchResult.styled';

interface BookSearchResultProps {
  type: 'searching' | 'searched';
  searchedBookList: SearchedBook[];
  hasMore?: boolean;
  isLoading?: boolean;
  lastBookElementCallback?: (node: HTMLDivElement | null) => void;
  totalElements?: number;
}

export function BookSearchResult({
  type,
  searchedBookList,
  hasMore = false,
  isLoading = false,
  lastBookElementCallback,
  totalElements,
}: BookSearchResultProps) {
  const navigate = useNavigate();

  const isEmptySearchedBookList = () => {
    if (searchedBookList.length === 0) return true;
    else return false;
  };

  const handleApplyBook = () => {
    navigate('/search/applybook');
  };

  return (
    <Wrapper>
      <List>
        {type === 'searching' ? <></> : <ResultHeader>전체 {totalElements}</ResultHeader>}

        {isEmptySearchedBookList() ? (
          <EmptyWrapper>
            <MainText>현재 등록된 책이 없어요.</MainText>
            <SubText>원하는 책을 신청해주세요!</SubText>
            <RequestButton onClick={handleApplyBook}>책 신청하기</RequestButton>
          </EmptyWrapper>
        ) : (
          searchedBookList.map((book, index) => (
            <BookItem
              key={`book-${book.isbn}-${index}`}
              onClick={() => navigate(`/search/book/${book.isbn}`)}
              ref={
                index === searchedBookList.length - 1 && lastBookElementCallback
                  ? lastBookElementCallback
                  : undefined
              }
            >
              <Cover src={book.coverUrl} alt={`${book.title} 커버`} />
              <BookInfo>
                <Title>{book.title}</Title>
                <Subtitle>
                  {book.author} 저 · {book.publisher}
                </Subtitle>
              </BookInfo>
            </BookItem>
          ))
        )}

        {isLoading && searchedBookList.length > 0 && <></>}

        {!hasMore && searchedBookList.length > 0 && <></>}
      </List>
    </Wrapper>
  );
}
