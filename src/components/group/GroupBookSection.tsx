import {
  GroupBookSection as StyledGroupBookSection,
  GroupBookSectionHeader,
  GroupBookSectionTitle,
  GroupBookSectionChevron,
  GroupBookSectionContent,
  BookInfo,
  BookCover,
  BookDetails,
  BookAuthor,
  BookDescription,
} from './GroupBookSection.styled';
import rightChevron from '../../assets/common/right-Chevron.svg';

interface GroupBookSectionProps {
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  onClick: () => void;
}

const GroupBookSection = ({
  title,
  author,
  coverUrl,
  description,
  onClick,
}: GroupBookSectionProps) => {
  return (
    <StyledGroupBookSection>
      <GroupBookSectionHeader onClick={onClick}>
        <GroupBookSectionTitle>{title}</GroupBookSectionTitle>
        <GroupBookSectionChevron src={rightChevron} alt="책 이동 버튼" />
      </GroupBookSectionHeader>
      <GroupBookSectionContent>
        <BookInfo>
          <BookCover src={coverUrl} alt={`${title} 커버`} />
          <BookDetails>
            <BookAuthor>{author}</BookAuthor>
            <BookDescription>
              도서 소개
              <br />
              <p>{description}</p>
            </BookDescription>
          </BookDetails>
        </BookInfo>
      </GroupBookSectionContent>
    </StyledGroupBookSection>
  );
};

export default GroupBookSection;
