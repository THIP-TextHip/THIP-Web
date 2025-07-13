import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';

interface Book {
  id: number;
  title: string;
  coverUrl: string;
}

const dummyBooks: Book[] = [
  {
    id: 1,
    title: '토마토 컵라면',
    coverUrl: 'https://cdn.imweb.me/upload/S20230204e049098f5e744/e6fd3d849546d.jpg',
  },
  {
    id: 2,
    title: '사슴',
    coverUrl: 'https://cdn.imweb.me/upload/S20230204e049098f5e744/e6fd3d849546d.jpg',
  },
  {
    id: 3,
    title: '호르몬 체인지지',
    coverUrl: 'https://cdn.imweb.me/upload/S20230204e049098f5e744/e6fd3d849546d.jpg',
  },
  {
    id: 4,
    title: '호르몬 체인지지',
    coverUrl: 'https://cdn.imweb.me/upload/S20230204e049098f5e744/e6fd3d849546d.jpg',
  },
  {
    id: 5,
    title: '호르몬 체인지지',
    coverUrl: 'https://cdn.imweb.me/upload/S20230204e049098f5e744/e6fd3d849546d.jpg',
  },
  {
    id: 6,
    title: '호르몬 체인지지',
    coverUrl: 'https://cdn.imweb.me/upload/S20230204e049098f5e744/e6fd3d849546d.jpg',
  },
];

export default function MostSearchedBooks() {
  return (
    <Container>
      <Header>
        <Title>가장 많이 검색된 책</Title>
        {/* 서버 응답 포맷을 모르기에 우선 하드 코딩 */}
        <DateText>01.12. 기준</DateText>
      </Header>
      <BookList>
        {dummyBooks.map((book, index) => (
          <BookItem key={book.id}>
            <Rank>{index + 1}.</Rank>
            <Cover src={book.coverUrl} alt={`${book.title} 커버`} />
            <BookTitle>{book.title}</BookTitle>
          </BookItem>
        ))}
      </BookList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 20px 0 20px;
  background-color: var(--color-black-main);
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
`;

const BookTitle = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
`;
