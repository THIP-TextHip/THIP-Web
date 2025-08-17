import {
  BookList as StyledBookList,
  BookItem,
  BookCover,
  BookInfo,
  BookTitle,
} from './BookSearchBottomSheet.styled';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
}

interface BookListProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

const BookList = ({ books, onBookSelect }: BookListProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <StyledBookList>
      {books.map(book => (
        <BookItem key={book.id} onClick={() => onBookSelect(book)}>
          <BookCover>
            <img src={book.cover} alt={book.title} onError={handleImageError} />
          </BookCover>
          <BookInfo>
            <BookTitle>{book.title}</BookTitle>
          </BookInfo>
        </BookItem>
      ))}
    </StyledBookList>
  );
};

export default BookList;
