import { semanticColors } from '../../styles/global/global';
import searchIcon from '../../assets/group/search.svg';
import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import {
  SearchBox,
  SearchIcon,
  SelectedBookContainer,
  SelectedBookCover,
  SelectedBookInfo,
  SelectedBookTitle,
  SelectedBookAuthor,
  ChangeButton,
} from './BookSelectionSection.styled';

interface BookSelectionSectionProps {
  selectedBook: { cover: string; title: string; author: string } | null;
  onSearchClick: () => void;
  onChangeClick: () => void;
  readOnly?: boolean;
}

const BookSelectionSection = ({
  selectedBook,
  onSearchClick,
  onChangeClick,
  readOnly = false,
}: BookSelectionSectionProps) => {
  return (
    <Section>
      <SectionTitle>책 선택</SectionTitle>
      <SearchBox
        hasSelectedBook={!!selectedBook}
        onClick={selectedBook || readOnly ? undefined : onSearchClick}
      >
        {selectedBook ? (
          <>
            <SelectedBookContainer>
              <SelectedBookCover>
                <img src={selectedBook.cover} alt={selectedBook.title} />
              </SelectedBookCover>
              <SelectedBookInfo>
                <SelectedBookTitle>{selectedBook.title}</SelectedBookTitle>
                <SelectedBookAuthor>{selectedBook.author} 저</SelectedBookAuthor>
              </SelectedBookInfo>
            </SelectedBookContainer>
            {!readOnly && <ChangeButton onClick={onChangeClick}>변경</ChangeButton>}
          </>
        ) : (
          <>
            <SearchIcon>
              <img src={searchIcon} alt="검색" />
            </SearchIcon>
            <span style={{ color: semanticColors.text.secondary }}>
              {readOnly ? '책 정보' : '검색해서 찾기'}
            </span>
          </>
        )}
      </SearchBox>
    </Section>
  );
};

export default BookSelectionSection;
