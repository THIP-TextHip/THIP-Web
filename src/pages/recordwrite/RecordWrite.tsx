import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import RecordContentSection from '../../components/recordwrite/RecordContentSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './RecordWrite.styled';
import { createRecord } from '../../api/record/createRecord';
import { updateRecord } from '../../api/record/updateRecord';
import type { CreateRecordRequest, UpdateRecordRequest } from '../../types/record';
import { getBookPage } from '../../api/rooms/getBookPage';
import { usePopupActions } from '../../hooks/usePopupActions';

const RecordWrite = () => {
  const navigate = useNavigate();
  const { roomId, recordId } = useParams<{ roomId: string; recordId: string }>();
  const [searchParams] = useSearchParams();

  const isEditMode = Boolean(recordId);
  const { openSnackbar } = usePopupActions();

  const [pageRange, setPageRange] = useState('');
  const [content, setContent] = useState('');
  const [isOverallEnabled, setIsOverallEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [lastRecordedPage, setLastRecordedPage] = useState(0);
  const [isOverviewPossible, setIsOverviewPossible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          const existingContent = searchParams.get('content');
          const existingPageRange = searchParams.get('pageRange');
          const existingRecordType = searchParams.get('recordType');

          if (existingContent) {
            setContent(decodeURIComponent(existingContent));
          }

          if (existingPageRange) {
            setPageRange(existingPageRange);
          }

          if (existingRecordType === 'overall') {
            setIsOverallEnabled(true);
          }

          const response = await getBookPage(parseInt(roomId));
          if (response.isSuccess) {
            setTotalPages(response.data.totalBookPage);
          }

          setIsLoading(false);
          return;
        }

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
        if (!recordId) {
          openSnackbar({
            message: '기록 정보를 찾을 수 없습니다.',
            variant: 'top',
            onClose: () => {},
          });
          setIsSubmitting(false);
          return;
        }

        const updateData: UpdateRecordRequest = {
          content: content.trim(),
        };

        const response = await updateRecord(parseInt(roomId), parseInt(recordId), updateData);

        if (response.isSuccess) {
          openSnackbar({
            message: '기록 수정을 완료했어요.',
            variant: 'top',
            onClose: () => {},
          });

          navigate(`/rooms/${roomId}/memory`, {
            replace: true,
          });
        } else {
          openSnackbar({
            message: response.message || '기록 수정에 실패했습니다.',
            variant: 'top',
            onClose: () => {},
          });
          setIsSubmitting(false);
        }
      } else {
        let finalPage: number;

        if (isOverallEnabled) {
          finalPage = totalPages;
        } else {
          if (pageRange.trim() !== '') {
            finalPage = parseInt(pageRange.trim());
          } else {
            finalPage = lastRecordedPage;
          }
        }

        if (finalPage <= 0 || finalPage > totalPages) {
          openSnackbar({
            message: `유효하지 않은 페이지입니다. (1-${totalPages} 사이의 값을 입력해주세요)`,
            variant: 'top',
            onClose: () => {},
          });
          setIsSubmitting(false);
          return;
        }

        const recordData: CreateRecordRequest = {
          page: finalPage,
          isOverview: isOverallEnabled,
          content: content.trim(),
        };

        const response = await createRecord(parseInt(roomId), recordData);

        if (response.isSuccess) {
          navigate(`/rooms/${roomId}/memory`, {
            replace: true,
          });
        } else {
          openSnackbar({
            message: response.message || '기록 작성에 실패했습니다.',
            variant: 'top',
            onClose: () => {},
          });
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      let errorMessage = isEditMode
        ? '기록 수정 중 오류가 발생했습니다.'
        : '기록 저장 중 오류가 발생했습니다.';

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
          errorMessage = '접근 권한이 없습니다.';
        } else if (axiosError.response?.data?.code === 404) {
          errorMessage = '존재하지 않는 데이터입니다.';
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

  if (isLoading) {
    return (
      <>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          title={isEditMode ? '기록 수정' : '기록 작성'}
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
        title={isEditMode ? '기록 수정' : '기록 작성'}
        rightButton={<div className="complete">완료</div>}
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={content.trim().length > 0 && !isSubmitting}
      />
      <Container>
        <PageRangeSection
          pageRange={pageRange}
          onPageRangeChange={setPageRange}
          totalPages={totalPages}
          lastRecordedPage={lastRecordedPage}
          isOverallEnabled={isOverallEnabled}
          onOverallToggle={() => setIsOverallEnabled(prev => !prev)}
          readingProgress={isOverviewPossible ? 80 : 70}
          isOverviewPossible={isOverviewPossible}
          isDisabled={isEditMode}
          hideToggle={isEditMode}
        />
        <RecordContentSection
          content={content}
          onContentChange={setContent}
          autoFocus={isEditMode}
        />
      </Container>
    </>
  );
};

export default RecordWrite;
