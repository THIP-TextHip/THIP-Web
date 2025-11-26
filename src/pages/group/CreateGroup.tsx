import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import BookSearchBottomSheet from '../../components/common/BookSearchBottomSheet/BookSearchBottomSheet';
import BookSelectionSection from '../../components/creategroup/BookSelectionSection';
import GenreSelectionSection from '../../components/creategroup/GenreSelectionSection';
import RoomInfoSection from '../../components/creategroup/RoomInfoSection';
import ActivityPeriodSection from '../../components/creategroup/ActivityPeriodSection/ActivityPeriodSection';
import MemberLimitSection from '../../components/creategroup/MemberLimitSection';
import PrivacySettingSection from '../../components/creategroup/PrivacySettingSection/PrivacySettingSection';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container } from './CreateGroup.styled';
import { createRoom } from '../../api/rooms/createRoom';
import type { CreateRoomRequest } from '@/types/room';

interface Book {
  id?: number;
  title: string;
  author: string;
  cover: string;
  isbn?: string;
}

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function convertBookInfoToBook(bookInfo: Book): Book | null {
    if (!bookInfo) return null;
    return {
      title: bookInfo.title,
      author: bookInfo.author,
      cover: bookInfo.cover,
      isbn: bookInfo.isbn,
    };
  }

  const [selectedBook, setSelectedBook] = useState<Book | null>(
    convertBookInfoToBook(location.state?.selectedBook ?? location.state?.bookInfo),
  );
  const [selectedGenre, setSelectedGenre] = useState('');
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const oneMonthLater = new Date(today);
    oneMonthLater.setDate(today.getDate() + 1);

    return {
      start: {
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth() + 1,
        day: tomorrow.getDate(),
      },
      end: {
        year: oneMonthLater.getFullYear(),
        month: oneMonthLater.getMonth() + 1,
        day: oneMonthLater.getDate(),
      },
    };
  };

  const defaultDates = getDefaultDates();
  const [startDate, setStartDate] = useState(defaultDates.start);
  const [endDate, setEndDate] = useState(defaultDates.end);

  const [memberLimit, setMemberLimit] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formatDate = (date: { year: number; month: number; day: number }) => {
        const month = date.month.toString().padStart(2, '0');
        const day = date.day.toString().padStart(2, '0');
        return `${date.year}.${month}.${day}`;
      };

      const roomData: CreateRoomRequest = {
        isbn: selectedBook?.isbn || '9788936434632',
        category: selectedGenre,
        roomName: roomTitle.trim(),
        description: roomDescription.trim(),
        progressStartDate: formatDate(startDate),
        progressEndDate: formatDate(endDate),
        recruitCount: memberLimit,
        password: isPrivate ? password.trim() : null,
        isPublic: !isPrivate,
      };

      const response = await createRoom(roomData);

      const isSuccessful = response.isSuccess || response.isSuccess;

      if (isSuccessful) {
        navigate(`/group/detail/${response.data.roomId}`, {
          replace: true,
        });
      } else {
        alert(`방 생성에 실패했습니다: ${response.message} (코드: ${response.code})`);
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            status: number;
            data?: { message?: string };
            headers: unknown;
          };
          request?: unknown;
          message: string;
        };

        if (axiosError.response) {
          const errorMessage = axiosError.response.data?.message || axiosError.message;
          alert(`방 생성 실패: ${errorMessage} (상태: ${axiosError.response.status})`);
        } else if (axiosError.request) {
          alert('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
        } else {
          alert(`오류가 발생했습니다: ${axiosError.message}`);
        }
      } else {
        const errorMessage =
          error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        alert(`오류가 발생했습니다: ${errorMessage}`);
      }
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
    isDateValid &&
    (!isPrivate || (password.trim() !== '' && /^\d{4}$/.test(password.trim()))) &&
    !isSubmitting;

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
          onValidationChange={setIsDateValid}
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
          showGroupTab={false}
        />
      </Container>
    </>
  );
};

export default CreateGroup;
