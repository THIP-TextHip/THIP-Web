import { useNavigate } from 'react-router-dom';
import rightArrow from '../../assets/common/rightArrow.svg';
import { BookContainer } from './BookInfoCard.styled';

interface BookInfoCardProps {
  bookTitle: string;
  bookAuthor: string;
  isbn: string;
}

const BookInfoCard = ({ bookTitle, bookAuthor, isbn }: BookInfoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/book/${isbn}`);
  };

  return (
    <BookContainer onClick={handleClick}>
      <div className="left">{bookTitle}</div>
      <div className="right">
        <div className="name">{bookAuthor}</div>
        <div className="author">저</div>
        <img src={rightArrow} />
      </div>
    </BookContainer>
  );
};
export default BookInfoCard;
