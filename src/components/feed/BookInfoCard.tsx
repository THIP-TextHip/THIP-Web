import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import rightArrow from '../../assets/common/rightArrow.svg';

const BookContainer = styled.div`
  display: flex;
  height: 44px;
  padding: 8px 4px 8px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: var(--color-darkgrey-main);
  cursor: pointer;

  .left {
    overflow: hidden;
    max-width: 340px;
    white-space: nowrap;
    color: var(--color-white);
    text-overflow: ellipsis;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    line-height: 24px;
  }

  .right {
    display: flex;
    flex-direction: row;
    gap: 4px;
    overflow: hidden;
    color: var(--color-grey-100);
    text-align: right;
    text-overflow: ellipsis;
    font-size: var(--font-size-xs);
    font-style: normal;
    font-weight: var(--font-weight-regular);
    line-height: 24px;

    .name {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

interface BookInfoCardProps {
  bookTitle: string;
  bookAuthor: string;
  isbn: number;
}

const BookInfoCard = ({ bookTitle, bookAuthor, isbn }: BookInfoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${isbn}`);
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
