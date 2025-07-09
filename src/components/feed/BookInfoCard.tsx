import styled from '@emotion/styled';
import rightArrow from '../../assets/common/rightArrow.svg';

const BookContainer = styled.div`
  display: flex;
  height: 44px;
  padding: 8px 4px 8px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--number-radius-button, 12px);
  background: var(--color-button-color_fill-button_fill_tertiary01_darkgrey, #3d3d3d);

  .left {
    overflow: hidden;
    max-width: 340px;
    white-space: nowrap;
    color: var(--color-white);
    text-overflow: ellipsis;
    font-size: var(--string-size-medium02, 16px);
    font-weight: var(--string-weight-semibold, 600);
    line-height: var(--string-lineheight-height24, 24px);
  }

  .right {
    display: flex;
    flex-direction: row;
    gap: 4px;
    overflow: hidden;
    color: var(--color-text-secondary_grey00, #dadada);
    text-align: right;
    text-overflow: ellipsis;
    font-size: var(--string-size-small03, 12px);
    font-style: normal;
    font-weight: var(--string-weight-regular, 400);
    line-height: var(--string-lineheight-height24, 24px);

    .name {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--color-text-secondary_grey00, #dadada);
      font-size: var(--string-size-small03, 12px);
      font-weight: var(--string-weight-regular, 400);
      line-height: var(--string-lineheight-height24, 24px);
    }
  }
`;

interface BookInfoCardProps {
  bookTitle: string;
  bookAuthor: string;
}

const BookInfoCard = ({ bookTitle, bookAuthor }: BookInfoCardProps) => {
  return (
    <BookContainer>
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
