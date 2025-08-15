import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import PollCreationSection from '../../components/pollwrite/PollCreationSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './PollWrite.styled';
import type { Record } from '../memory/Memory';
import { createVote } from '../../api/record/createVote';
import type { CreateVoteRequest } from '../../types/record';

const PollWrite = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const [pageRange, setPageRange] = useState('');
  const [pollContent, setPollContent] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
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

      // 투표 옵션 필터링 (빈 옵션 제거)
      const validOptions = pollOptions.filter(option => option.trim() !== '');

      if (validOptions.length < 2) {
        alert('투표 옵션은 최소 2개 이상이어야 합니다.');
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

        // 투표 옵션 생성 (Memory 페이지 표시용)
        const pollOptionsData = validOptions.map((option, index) => ({
          id: `${index + 1}.`,
          text: option.trim(),
          percentage: index === 0 ? 90 : 10, // 첫 번째 옵션을 90%로 설정 (데모용)
          isHighest: index === 0, // 첫 번째 옵션이 최고값
        }));

        // 임시로 Memory 페이지용 투표 객체 생성 (기존 인터페이스 호환성을 위해)
        const newPollRecord: Record & { isUploading?: boolean } = {
          id: response.data.voteId.toString(),
          user: 'user.01', // TODO: 실제 사용자 정보로 변경
          userPoints: 132, // TODO: 실제 사용자 포인트로 변경
          content: pollContent,
          likeCount: 0,
          commentCount: 0,
          timeAgo: '방금 전',
          createdAt: new Date(),
          type: 'poll',
          recordType: isOverallEnabled ? 'overall' : 'page',
          pageRange: isOverallEnabled ? undefined : finalPage.toString(),
          pollOptions: pollOptionsData,
          isUploading: false, // API 호출이 완료되었으므로 false
        };

        // 성공 시 기록장으로 이동
        navigate('/memory', {
          state: { newRecord: newPollRecord },
          replace: true,
        });
      } else {
        // API 에러 응답 처리
        console.error('투표 생성 실패:', response.message);
        alert(`투표 생성에 실패했습니다: ${response.message}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('투표 저장 실패:', error);

      // 에러 타입에 따른 메시지 처리
      let errorMessage = '투표 저장 중 오류가 발생했습니다.';

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

  // 투표 내용과 최소 2개의 옵션이 필요
  const isFormValid =
    pollContent.trim() !== '' && pollOptions.filter(option => option.trim() !== '').length >= 2;

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        title="투표 생성"
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
