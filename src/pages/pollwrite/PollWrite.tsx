import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import PollCreationSection from '../../components/pollwrite/PollCreationSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './PollWrite.styled';
import { createVote } from '../../api/record/createVote';
import type { CreateVoteRequest } from '../../types/record';
import { getBookPage } from '../../api/rooms/getBookPage';
import { usePopupActions } from '../../hooks/usePopupActions';

const PollWrite = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { openSnackbar } = usePopupActions();

  const [pageRange, setPageRange] = useState('');
  const [pollContent, setPollContent] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [isOverallEnabled, setIsOverallEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API에서 받아올 데이터
  const [totalPages, setTotalPages] = useState(0);
  const [lastRecordedPage, setLastRecordedPage] = useState(0);
  const [isOverviewPossible, setIsOverviewPossible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 책 페이지 정보 조회
  useEffect(() => {
    const fetchBookPageInfo = async () => {
      if (!roomId) {
        openSnackbar({
          message: '방 정보를 찾을 수 없습니다.',
          variant: 'top',
          onClose: () => {},
        });
        navigate(-1);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getBookPage(parseInt(roomId));

        if (response.isSuccess) {
          setTotalPages(response.data.totalBookPage);
          setLastRecordedPage(response.data.recentBookPage);
          setIsOverviewPossible(response.data.isOverviewPossible);
        } else {
          openSnackbar({
            message: response.message || '책 정보를 불러오는데 실패했습니다.',
            variant: 'top',
            onClose: () => {},
          });
        }
      } catch (error) {
        console.error('책 페이지 정보 조회 오류:', error);

        let errorMessage = '책 정보를 불러오는 중 오류가 발생했습니다.';

        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
                code?: number;
              };
            };
          };

          if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          } else if (axiosError.response?.data?.code === 400) {
            errorMessage = '파라미터 값 중 유효하지 않은 값이 있습니다.';
          } else if (axiosError.response?.data?.code === 403) {
            errorMessage = '방 접근 권한이 없습니다.';
          } else if (axiosError.response?.data?.code === 404) {
            errorMessage = '존재하지 않는 방입니다.';
          }
        }

        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookPageInfo();
  }, [roomId]);

  // 총평 모드가 변경될 때 isOverviewPossible 체크
  useEffect(() => {
    if (isOverallEnabled && !isOverviewPossible) {
      setIsOverallEnabled(false);
      openSnackbar({
        message: '총평 작성 조건을 만족하지 않습니다.',
        variant: 'top',
        onClose: () => {},
      });
    }
  }, [isOverallEnabled, isOverviewPossible]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = async () => {
    if (isSubmitting || !roomId) return;

    setIsSubmitting(true);

    try {
      // 페이지 범위 결정: 총평이 아닌 경우 페이지 번호 필요
      const finalPage = isOverallEnabled
        ? 0 // 총평인 경우 페이지는 0
        : pageRange.trim() !== ''
          ? parseInt(pageRange.trim())
          : lastRecordedPage; // 입력값이 없으면 마지막 기록 페이지 사용

      // 투표 옵션 필터링 (빈 옵션 제거)
      const validOptions = pollOptions.filter(option => option.trim() !== '');

      if (validOptions.length < 2) {
        openSnackbar({
          message: '투표 옵션은 최소 2개 이상이어야 합니다.',
          variant: 'top',
          onClose: () => {},
        });
        setIsSubmitting(false);
        return;
      }

      // API 요청 데이터 생성
      const voteData: CreateVoteRequest = {
        page: finalPage,
        isOverview: isOverallEnabled,
        content: pollContent.trim(),
        voteItemList: validOptions.map(option => ({ itemName: option.trim() })),
      };

      console.log('투표 생성 API 호출:', voteData);
      console.log('roomId:', roomId);

      // API 호출
      const response = await createVote(parseInt(roomId), voteData);

      if (response.isSuccess) {
        console.log('투표 생성 성공:', response.data);

        // 성공 시 기록장으로 이동
        navigate(`/rooms/${roomId}/memory`, {
          replace: true,
        });
      } else {
        // API 에러 응답 처리
        console.error('투표 생성 실패:', response.message);
        openSnackbar({
          message: response.message || '투표 생성에 실패했습니다.',
          variant: 'top',
          onClose: () => {},
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('투표 저장 실패:', error);

      // 에러 타입에 따른 메시지 처리
      let errorMessage = '투표 저장 중 오류가 발생했습니다.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              code?: number;
            };
          };
        };

        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.code === 400) {
          errorMessage = '입력값을 확인해 주세요.';
        } else if (axiosError.response?.data?.code === 403) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (axiosError.response?.data?.code === 404) {
          errorMessage = '존재하지 않는 방입니다.';
        }
      }

      openSnackbar({
        message: errorMessage,
        variant: 'top',
        onClose: () => {},
      });
      setIsSubmitting(false);
    }
  };

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          title="투표 작성"
          onLeftClick={handleBackClick}
        />
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              color: '#fff',
            }}
          >
            로딩 중...
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        title="투표 작성"
        rightButton={<div className="complete">완료</div>}
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={pollContent.trim().length > 0 && !isSubmitting}
      />
      <Container>
        <PageRangeSection
          pageRange={pageRange}
          onPageRangeChange={setPageRange}
          totalPages={totalPages}
          lastRecordedPage={lastRecordedPage}
          isOverallEnabled={isOverallEnabled}
          onOverallToggle={() => setIsOverallEnabled(prev => !prev)}
          readingProgress={isOverviewPossible ? 80 : 70} // 총평 가능하면 80% 이상으로 표시
          isOverviewPossible={isOverviewPossible}
        />
        <PollCreationSection
          content={pollContent}
          onContentChange={setPollContent}
          options={pollOptions}
          onOptionsChange={setPollOptions}
        />
      </Container>
    </>
  );
};

export default PollWrite;
