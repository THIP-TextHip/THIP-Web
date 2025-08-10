import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import BookSearchBottomSheet from '../../components/common/BookSearchBottomSheet/BookSearchBottomSheet';
import BookSelectionSection from '../../components/creategroup/BookSelectionSection';
import GenreSelectionSection from '../../components/creategroup/GenreSelectionSection';
import RoomInfoSection from '../../components/creategroup/RoomInfoSection';
import ActivityPeriodSection from '../../components/creategroup/ActivityPeriodSection/ActivityPeriodSection';
import MemberLimitSection from '../../components/creategroup/MemberLimitSection';
import PrivacySettingSection from '../../components/creategroup//PrivacySettingSection/PrivacySettingSection';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container } from './CreateGroup.styled';
import { createRoom } from '../../api/rooms/createRoom';
import type { CreateRoomRequest } from '@/types/room';

// Book 타입 정의
interface Book {
  id?: number;
  title: string;
  author: string;
  cover: string;
  isbn?: string;
}

const CreateGroup = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [startDate, setStartDate] = useState({ year: 2025, month: 1, day: 1 });
  const [endDate, setEndDate] = useState({ year: 2025, month: 1, day: 1 });
  const [memberLimit, setMemberLimit] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = async () => {
    if (isSubmitting) return; // 중복 실행 방지

    setIsSubmitting(true);

    try {
      // 날짜 형식 변환 (YYYY.MM.DD)
      const formatDate = (date: { year: number; month: number; day: number }) => {
        const month = date.month.toString().padStart(2, '0');
        const day = date.day.toString().padStart(2, '0');
        return `${date.year}.${month}.${day}`;
      };

      // 방 생성 요청 데이터 구성
      const roomData: CreateRoomRequest = {
        isbn: selectedBook?.isbn || '9788936434632', // 선택된 책의 ISBN 또는 기본값
        category: selectedGenre,
        roomName: roomTitle,
        description: roomDescription,
        progressStartDate: formatDate(startDate),
        progressEndDate: formatDate(endDate),
        recruitCount: memberLimit,
        password: isPrivate ? password : '', // 공개방이면 빈 문자열
        isPublic: !isPrivate, // isPrivate의 반대값
      };

      console.log('방 생성 요청 데이터:', roomData);

      // 방 생성 API 호출
      const response = await createRoom(roomData);

      if (response.isSuccess) {
        console.log('방 생성 성공:', response.data.roomId);

        // 성공 시 생성된 방 상세 페이지로 이동
        navigate(`/group/${response.data.roomId}`, { replace: true });
      } else {
        console.error('방 생성 실패:', response.message);
        alert(`방 생성에 실패했습니다: ${response.message}`);
      }
    } catch (error) {
      console.error('방 생성 중 오류 발생:', error);
      alert('방 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
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

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
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

  const isFormValid =
    selectedBook !== null &&
    selectedGenre !== '' &&
    roomTitle.trim() !== '' &&
    roomDescription.trim() !== '' &&
    (!isPrivate || password.trim() !== '') && // 비공개방인 경우 비밀번호 필수
    !isSubmitting;

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="모임 만들기"
        rightButton={isSubmitting ? '생성 중...' : '완료'}
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

        <GenreSelectionSection selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />

        <RoomInfoSection
          roomTitle={roomTitle}
          roomDescription={roomDescription}
          onRoomTitleChange={setRoomTitle}
          onRoomDescriptionChange={setRoomDescription}
        />

        <ActivityPeriodSection
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <MemberLimitSection memberLimit={memberLimit} onMemberLimitChange={setMemberLimit} />

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
