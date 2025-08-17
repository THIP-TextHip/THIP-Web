import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import RecordContentSection from '../../components/recordwrite/RecordContentSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './RecordWrite.styled';
import type { Record } from '../memory/Memory';
import { createRecord } from '../../api/record/createRecord';
import type { CreateRecordRequest } from '../../types/record';

const RecordWrite = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const [pageRange, setPageRange] = useState('');
  const [content, setContent] = useState('');
  const [isOverallEnabled, setIsOverallEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: 실제로는 백엔드에서 받아온 책 정보에서 전체 페이지 수를 가져와야 함
  const totalPages = 600; // 임시 값
  // TODO: 실제로는 백엔드에서 받아온 가장 마지막 기록 페이지를 가져와야 함
  const lastRecordedPage = 456; // 임시 값 (기록이 없으면 0)
  // TODO: 실제로는 백엔드에서 받아온 읽기 진행도를 가져와야 함
  const readingProgress = 70; // 임시 값 (80% 미만이므로 총평 비활성화)

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = async () => {
    if (isSubmitting || !roomId) return; // 중복 실행 방지 및 roomId 체크

    setIsSubmitting(true);

    try {
      // 페이지 범위 결정: 총평이 아닌 경우 페이지 번호 필요
      const finalPage = isOverallEnabled
        ? 0 // 총평인 경우 페이지는 0
        : pageRange.trim() !== ''
          ? parseInt(pageRange.trim())
          : lastRecordedPage; // 입력값이 없으면 마지막 기록 페이지 사용

      // API 요청 데이터 생성
      const recordData: CreateRecordRequest = {
        page: finalPage,
        isOverview: isOverallEnabled,
        content: content.trim(),
      };

      console.log('기록 생성 API 호출:', recordData);
      console.log('roomId:', roomId);

      // API 호출
      const response = await createRecord(parseInt(roomId), recordData);

      if (response.isSuccess) {
        console.log('기록 생성 성공:', response.data);

        // 임시로 Memory 페이지용 기록 객체 생성 (기존 인터페이스 호환성을 위해)
        const newRecord: Record & { isUploading?: boolean } = {
          id: response.data.recordId.toString(),
          user: 'user.01', // TODO: 실제 사용자 정보로 변경
          userPoints: 132, // TODO: 실제 사용자 포인트로 변경
          content: content,
          likeCount: 0,
          commentCount: 0,
          timeAgo: '방금 전',
          createdAt: new Date(),
          type: 'text',
          recordType: isOverallEnabled ? 'overall' : 'page',
          pageRange: isOverallEnabled ? undefined : finalPage.toString(),
          isUploading: false, // API 호출이 완료되었으므로 false
        };

        // 성공 시 기록장으로 이동
        navigate(`/rooms/${roomId}/memory`, {
          state: { newRecord },
          replace: true,
        });
      } else {
        // API 에러 응답 처리
        console.error('기록 생성 실패:', response.message);
        alert(`기록 생성에 실패했습니다: ${response.message}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('기록 저장 실패:', error);

      // 에러 타입에 따른 메시지 처리
      let errorMessage = '기록 저장 중 오류가 발생했습니다.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            status: number;
            data?: { message?: string };
          };
        };

        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.status) {
          errorMessage = `서버 오류 (${axiosError.response.status})`;
        }
      }

      alert(errorMessage);
      setIsSubmitting(false);
    }
  };

  // 폼 유효성 검사: 내용은 필수, 총평이 아닌 경우 페이지 번호도 확인
  const isFormValid =
    content.trim() !== '' && (isOverallEnabled || pageRange.trim() !== '' || lastRecordedPage > 0);

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        title="기록 작성"
        rightButton="완료"
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid && !isSubmitting}
      />
      <Container>
        <PageRangeSection
          pageRange={pageRange}
          onPageRangeChange={setPageRange}
          totalPages={totalPages}
          lastRecordedPage={lastRecordedPage}
          isOverallEnabled={isOverallEnabled}
          onOverallToggle={() => setIsOverallEnabled(!isOverallEnabled)}
          readingProgress={readingProgress}
        />

        <RecordContentSection content={content} onContentChange={setContent} />
      </Container>
    </>
  );
};

export default RecordWrite;
