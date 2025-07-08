import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import BookSearchBottomSheet from '../../components/common/BookSearchBottomSheet/BookSearchBottomSheet';
import leftarrow from '../../assets/leftArrow.svg';
import searchIcon from '../../assets/group/search.svg';
import { semanticColors, typography } from '../../styles/global/global';
import {
  Container,
  Section,
  SectionTitle,
  SearchBox,
  SearchIcon,
  GenreButtonGroup,
  GenreButton,
  TextAreaBox,
  TextArea,
  CharacterCount,
  DatePickerContainer,
  DatePickerRow,
  DateSelector,
  DateText,
  MemberLimitContainer,
  MemberNumber,
  MemberText,
  PrivacyToggleContainer,
  PrivacyLabel,
  ToggleSwitch,
  ToggleSlider,
} from './CreateGroup.styled';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [description, setDescription] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [startDate, setStartDate] = useState({ year: 2025, month: 1, day: 1 });
  const [endDate, setEndDate] = useState({ year: 2025, month: 1, day: 1 });
  const [memberLimit, setMemberLimit] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    // 완료 로직 추후 구현
    console.log('모임 생성 완료');
  };

  const handleBookSearchOpen = () => {
    setIsBookSearchOpen(true);
  };

  const handleBookSearchClose = () => {
    setIsBookSearchOpen(false);
  };

  const handleBookSelect = (book: any) => {
    setSelectedBook(book);
    setBookTitle(book.title);
  };

  const genres = ['문학', '과학·IT', '사회과학', '인문학', '예술'];

  const isFormValid = (selectedBook || bookTitle.trim() !== '') && selectedGenre !== '';

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="모임 만들기"
        rightButton="완료"
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid}
      />
      <Container>
        <Section>
          <SectionTitle>책 선택</SectionTitle>
          <SearchBox onClick={handleBookSearchOpen}>
            <SearchIcon>
              <img src={searchIcon} alt="검색" />
            </SearchIcon>
            {selectedBook ? (
              <span style={{ color: semanticColors.text.primary }}>{selectedBook.title}</span>
            ) : (
              <span style={{ color: semanticColors.text.secondary }}>검색해서 찾기</span>
            )}
          </SearchBox>
        </Section>

        <Section showDivider></Section>

        <Section>
          <SectionTitle>책 장르</SectionTitle>
          <GenreButtonGroup>
            {genres.map(genre => (
              <GenreButton
                key={genre}
                active={selectedGenre === genre}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </GenreButton>
            ))}
          </GenreButtonGroup>
          <div
            style={{
              color: semanticColors.text.point.green,
              fontSize: typography.fontSize.xs,
              marginTop: '12px',
            }}
          >
            책을 가장 잘 설명하는 장르를 하나 골라주세요.
          </div>
        </Section>

        <Section>
          <SectionTitle>방 제목</SectionTitle>
          <TextAreaBox>
            <TextArea
              placeholder="방 제목을 입력해주세요."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={15}
              rows={1}
            />
            <CharacterCount>{description.length} / 15</CharacterCount>
          </TextAreaBox>
        </Section>

        <Section>
          <SectionTitle>한 줄 소개</SectionTitle>
          <TextAreaBox>
            <TextArea
              placeholder="방에 대한 짧은 소개를 작성해주세요."
              value={introduction}
              onChange={e => setIntroduction(e.target.value)}
              maxLength={75}
              rows={3}
            />
            <CharacterCount>{introduction.length} / 75</CharacterCount>
          </TextAreaBox>
        </Section>

        <Section>
          <SectionTitle>모임 활동기간</SectionTitle>
          <DatePickerContainer>
            <DatePickerRow>
              <DateSelector>
                <DateText>2025</DateText>
                <DateText>년</DateText>
                <DateText>1</DateText>
                <DateText>월</DateText>
                <DateText>1</DateText>
                <DateText>일</DateText>
                <DateText>-</DateText>
                <DateText>2025</DateText>
                <DateText>년</DateText>
                <DateText>1</DateText>
                <DateText>월</DateText>
                <DateText>1</DateText>
                <DateText>일</DateText>
              </DateSelector>
            </DatePickerRow>
            <DateText
              style={{
                marginTop: '12px',
                fontSize: typography.fontSize.xs,
                color: semanticColors.text.point.green,
              }}
            >
              모임 활동기간은 최대 3개월까지 설정가능합니다.
            </DateText>
          </DatePickerContainer>
        </Section>

        <Section>
          <SectionTitle>인원 제한</SectionTitle>
          <MemberLimitContainer>
            <MemberNumber>30</MemberNumber>
            <div>
              <MemberNumber style={{ fontSize: typography.fontSize.base }}>1</MemberNumber>
              <MemberText>명의 독서메이트를 모집합니다.</MemberText>
              <MemberNumber style={{ fontSize: typography.fontSize.base, marginLeft: '8px' }}>
                2
              </MemberNumber>
            </div>
          </MemberLimitContainer>
          <MemberText
            style={{
              marginTop: '12px',
              fontSize: typography.fontSize.xs,
              color: semanticColors.text.point.green,
            }}
          >
            모임 인원은 최대 30명까지 신청받을 수 있습니다.
          </MemberText>
        </Section>

        <Section>
          <SectionTitle>공개 설정</SectionTitle>
          <PrivacyToggleContainer>
            <PrivacyLabel>비공개로 설정하기</PrivacyLabel>
            <ToggleSwitch active={isPrivate} onClick={() => setIsPrivate(!isPrivate)}>
              <ToggleSlider active={isPrivate} />
            </ToggleSwitch>
          </PrivacyToggleContainer>
        </Section>

        <BookSearchBottomSheet
          isOpen={isBookSearchOpen}
          onClose={handleBookSearchClose}
          onSelectBook={handleBookSelect}
        />
      </Container>
    </>
  );
};

export default CreateGroup;
