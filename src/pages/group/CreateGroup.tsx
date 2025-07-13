import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import BookSearchBottomSheet from '../../components/common/BookSearchBottomSheet/BookSearchBottomSheet';
import BookSelectionSection from './components/BookSelectionSection';
import GenreSelectionSection from './components/GenreSelectionSection';
import RoomInfoSection from './components/RoomInfoSection';
import ActivityPeriodSection from './components/ActivityPeriodSection/ActivityPeriodSection';
import MemberLimitSection from './components/MemberLimitSection';
import PrivacySettingSection from './components/PrivacySettingSection/PrivacySettingSection';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container } from './CreateGroup.styled';
import { Section } from './CommonSection.styled';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [startDate, setStartDate] = useState({ year: 2025, month: 1, day: 1 });
  const [endDate, setEndDate] = useState({ year: 2025, month: 1, day: 1 });
  const [memberLimit, setMemberLimit] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
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

  const handleChangeBook = () => {
    setIsBookSearchOpen(true);
  };

  const handleBookSearchClose = () => {
    setIsBookSearchOpen(false);
  };

  const handleBookSelect = (book: any) => {
    setSelectedBook(book);
    setBookTitle(book.title);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handlePrivacyToggle = () => {
    setIsPrivate(!isPrivate);
    // 비공개 설정을 끄면 비밀번호도 초기화
    if (isPrivate) {
      setPassword('');
    }
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handlePasswordClose = () => {
    setPassword('');
  };

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
        <BookSelectionSection
          selectedBook={selectedBook}
          onSearchClick={handleBookSearchOpen}
          onChangeClick={handleChangeBook}
        />

        <Section showDivider />

        <GenreSelectionSection selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />

        <Section showDivider />

        <RoomInfoSection
          roomTitle={roomTitle}
          roomDescription={roomDescription}
          onRoomTitleChange={setRoomTitle}
          onRoomDescriptionChange={setRoomDescription}
        />

        <Section showDivider />

        <ActivityPeriodSection
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <Section showDivider />

        <MemberLimitSection memberLimit={memberLimit} onMemberLimitChange={setMemberLimit} />

        <Section showDivider />

        <PrivacySettingSection
          isPrivate={isPrivate}
          password={password}
          onToggle={handlePrivacyToggle}
          onPasswordChange={handlePasswordChange}
          onPasswordClose={handlePasswordClose}
        />

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
