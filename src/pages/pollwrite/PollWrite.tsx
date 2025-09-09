import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import PollCreationSection from '../../components/pollwrite/PollCreationSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './PollWrite.styled';
import { createVote } from '../../api/record/createVote';
import { updateVote } from '../../api/record/updateVote';
import type { CreateVoteRequest, UpdateVoteRequest } from '../../types/record';
import { getBookPage } from '../../api/rooms/getBookPage';
import { usePopupActions } from '../../hooks/usePopupActions';

const PollWrite = () => {
  const navigate = useNavigate();
  const { roomId, voteId } = useParams<{ roomId: string; voteId: string }>();
  const [searchParams] = useSearchParams();
  
  // 수정 모드인지 판단
  const isEditMode = Boolean(voteId);
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

  // 컴포넌트 마운트 시 책 페이지 정보 조회 (생성 모드) 또는 투표 내용 로드 (수정 모드)
  useEffect(() => {
    const initializeData = async () => {
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
        
        if (isEditMode) {
          // 수정 모드: 쿼리 파라미터에서 기존 내용과 페이지 정보, 투표 옵션 로드
          const existingContent = searchParams.get('content');
          const existingPageRange = searchParams.get('pageRange');
          const existingRecordType = searchParams.get('recordType');
          const existingOptions = searchParams.get('options');
          
          if (existingContent) {
            setPollContent(decodeURIComponent(existingContent));
          }
          
          if (existingPageRange) {
            setPageRange(existingPageRange);
          }
          
          if (existingRecordType === 'overall') {
            setIsOverallEnabled(true);
          }
          
          if (existingOptions) {
            try {
              const options = JSON.parse(decodeURIComponent(existingOptions));
              setPollOptions(options);
            } catch (e) {
              console.error('투표 옵션 파싱 오류:', e);
            }
          }
          
          // 수정 모드에서도 전체 페이지 수는 필요하므로 책 정보 조회
          const response = await getBookPage(parseInt(roomId));
          if (response.isSuccess) {
            setTotalPages(response.data.totalBookPage);
          }
          
          setIsLoading(false);
          return;
        }
        
        // 생성 모드: 책 페이지 정보 조회
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
        console.error('데이터 로드 오류:', error);

        let errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';

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

    initializeData();
  }, [roomId, isEditMode]);

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
      if (isEditMode) {
        // 수정 모드: 내용만 수정
        if (!voteId) {
          openSnackbar({
            message: '투표 정보를 찾을 수 없습니다.',
            variant: 'top',
            onClose: () => {},
          });
          setIsSubmitting(false);
          return;
        }

        const updateData: UpdateVoteRequest = {
          content: pollContent.trim(),
        };

        console.log('투표 수정 API 호출:', updateData);
        console.log('roomId:', roomId, 'voteId:', voteId);

        const response = await updateVote(parseInt(roomId), parseInt(voteId), updateData);

        if (response.isSuccess) {
          console.log('투표 수정 성공:', response.data);
          
          openSnackbar({
            message: '투표 수정을 완료했어요.',
            variant: 'top',
            onClose: () => {},
          });

          // 성공 시 기록장으로 이동
          navigate(`/rooms/${roomId}/memory`, {
            replace: true,
          });
        } else {
          console.error('투표 수정 실패:', response.message);
          openSnackbar({
            message: response.message || '투표 수정에 실패했습니다.',
            variant: 'top',
            onClose: () => {},
          });
          setIsSubmitting(false);
        }
      } else {
        // 생성 모드: 기존 로직 유지
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

        // 페이지 범위 결정
        let finalPage: number;

        if (isOverallEnabled) {
          // 총평인 경우: 책의 마지막 페이지 또는 전체 페이지 수 사용
          finalPage = totalPages;
        } else {
          // 일반 투표인 경우
          if (pageRange.trim() !== '') {
            finalPage = parseInt(pageRange.trim());
          } else {
            finalPage = lastRecordedPage;
          }
        }

        // 페이지 유효성 검사
        if (finalPage <= 0 || finalPage > totalPages) {
          openSnackbar({
            message: `유효하지 않은 페이지입니다. (1-${totalPages} 사이의 값을 입력해주세요)`,
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
      }
    } catch (error) {
      console.error('투표 저장 실패:', error);

      // 에러 타입에 따른 메시지 처리
      let errorMessage = isEditMode ? '투표 수정 중 오류가 발생했습니다.' : '투표 저장 중 오류가 발생했습니다.';

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
          title={isEditMode ? "투표 수정" : "투표 작성"}
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
        title={isEditMode ? "투표 수정" : "투표 작성"}
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
          isDisabled={isEditMode} // 수정 모드일 때 비활성화
          hideToggle={isEditMode} // 수정 모드일 때 총평 토글 숨김
        />
        <PollCreationSection
          content={pollContent}
          onContentChange={setPollContent}
          options={pollOptions}
          onOptionsChange={setPollOptions}
          isEditMode={isEditMode}
          autoFocus={isEditMode}
        />
      </Container>
    </>
  );
};

export default PollWrite;
