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
        roomName: roomTitle.trim(),
        description: roomDescription.trim(),
        progressStartDate: formatDate(startDate),
        progressEndDate: formatDate(endDate),
        recruitCount: memberLimit,
        password: isPrivate ? password.trim() : null,
        isPublic: !isPrivate, // isPrivate의 반대값
      };

      // 날짜 검증 추가
      const today = new Date();
      const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
      const endDateObj = new Date(endDate.year, endDate.month - 1, endDate.day);

      // 시작 날짜가 오늘 이후인지 확인
      if (startDateObj <= today) {
        alert('시작 날짜는 오늘 날짜 이후여야 합니다.');
        return;
      }

      // 종료 날짜가 시작 날짜 이후인지 확인
      if (endDateObj <= startDateObj) {
        alert('종료 날짜는 시작 날짜 이후여야 합니다.');
        return;
      }

      // 요청 데이터 검증
      const validation = {
        isbn: roomData.isbn.length > 0,
        category: roomData.category.length > 0,
        roomName: roomData.roomName.length > 0,
        description: roomData.description.length > 0,
        startDate: roomData.progressStartDate.length >= 8,
        endDate: roomData.progressEndDate.length >= 8,
        recruitCount: roomData.recruitCount >= 1 && roomData.recruitCount <= 30,
        password: !isPrivate || (roomData.password !== null && /^\d{4}$/.test(roomData.password)),
      };

      const invalidFields = Object.entries(validation)
        .filter(([, isValid]) => !isValid)
        .map(([field]) => field);

      if (invalidFields.length > 0) {
        alert(`다음 필드들을 확인해주세요: ${invalidFields.join(', ')}`);
        return;
      }

      // 방 생성 API 호출
      const response = await createRoom(roomData);

      // 두 가지 응답 형식 모두 확인
      const isSuccessful = response.isSuccess || response.isSuccess;

      if (isSuccessful) {
        // 성공 시 모집 중인 방 상세 페이지로 이동
        navigate('/group/detail', {
          replace: true,
          state: { roomId: response.data.roomId },
        });
      } else {
        alert(`방 생성에 실패했습니다: ${response.message} (코드: ${response.code})`);
      }
    } catch (error) {
      // 자세한 오류 정보 로깅
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

  // 폼 유효성 검사 - 4자리 숫자 비밀번호 검증 포함
  const isFormValid =
    selectedBook !== null &&
    selectedGenre !== '' &&
    roomTitle.trim() !== '' &&
    roomDescription.trim() !== '' &&
    (!isPrivate || (password.trim() !== '' && /^\d{4}$/.test(password.trim()))) && // 비공개방인 경우 4자리 숫자 필수
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
