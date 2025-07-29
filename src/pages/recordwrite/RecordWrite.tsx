import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import RecordContentSection from '../../components/recordwrite/RecordContentSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './RecordWrite.styled';
import type { Record } from '../memory/Memory';

const RecordWrite = () => {
  const navigate = useNavigate();
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
    if (isSubmitting) return; // 중복 실행 방지

    setIsSubmitting(true);

    try {
      // 페이지 범위 결정: 입력값이 없으면 마지막 기록 페이지 사용
      const finalPageRange = isOverallEnabled
        ? undefined
        : pageRange.trim() !== ''
          ? pageRange
          : lastRecordedPage.toString();

      // 새 기록 객체 생성
      const newRecord: Record = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유한 ID
        user: '내가', // TODO: 실제 사용자 이름으로 변경
        userPoints: 0, // TODO: 실제 사용자 포인트로 변경
        content: content,
        likeCount: 0,
        commentCount: 0,
        timeAgo: '방금 전',
        createdAt: new Date(),
        type: 'text',
        recordType: isOverallEnabled ? 'overall' : 'page',
        pageRange: finalPageRange, // 최종 페이지 범위 저장
      };

      console.log('기록 작성 완료', newRecord);
      console.log('페이지 범위:', isOverallEnabled ? '전체범위' : `${finalPageRange}p`);
      console.log('내용:', content);
      console.log('총평 설정:', isOverallEnabled);

      // TODO: API 호출하여 서버에 기록 저장
      // await api.createRecord(newRecord);

      navigate('/memory', {
        state: { newRecord },
        replace: true,
      });
    } catch (error) {
      console.error('기록 저장 실패:', error);
      setIsSubmitting(false);
    }
  };

  // 총평이 켜져있으면 내용만 필요, 아니면 내용은 필수 (페이지는 기본값 사용 가능)
  const isFormValid = content.trim() !== '';

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
