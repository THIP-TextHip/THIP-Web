import type { SearchedBook } from '@/pages/search/Search';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { useNavigate } from 'react-router-dom';

interface BookSearchResultProps {
  type: 'searching' | 'searched';
  searchedBookList: SearchedBook[];
}

export function BookSearchResult({ type, searchedBookList }: BookSearchResultProps) {
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
        {type === 'searching' ? <></> : <ResultHeader>전체 {searchedBookList.length}</ResultHeader>}

        {isEmptySearchedBookList() ? (
          <EmptyWrapper>
            <MainText>현재 등록된 책이 없어요.</MainText>
            <SubText>원하는 책을 신청해주세요!</SubText>
            <RequestButton onClick={handleApplyBook}>책 신청하기</RequestButton>
          </EmptyWrapper>
        ) : (
          searchedBookList.map(book => (
            <BookItem key={book.id} onClick={() => navigate(`/search/book/${book.isbn}`)}>
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
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 72px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookItem = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.darkgrey.dark};
  padding: 12px 0;
  cursor: pointer;
`;

const ResultHeader = styled.div`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.darkgrey.dark};
`;

const Cover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
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

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const MainText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
`;

const SubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  margin-bottom: 20px;
`;

const RequestButton = styled.button`
  background-color: ${colors.purple.main};
  color: ${colors.white};
  padding: 10px 12px;
  font-size: ${typography.fontSize.base};
  border: none;
  border-radius: 12px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
`;
