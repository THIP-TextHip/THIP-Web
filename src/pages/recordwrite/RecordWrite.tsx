import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import RecordContentSection from '../../components/recordwrite/RecordContentSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './RecordWrite.styled';

const RecordWrite = () => {
  const navigate = useNavigate();
  const [pageRange, setPageRange] = useState('');
  const [content, setContent] = useState('');
  const [isOverallEnabled, setIsOverallEnabled] = useState(false);

  // TODO: 실제로는 백엔드에서 받아온 책 정보에서 전체 페이지 수를 가져와야 함
  const totalPages = 600; // 임시 값
  // TODO: 실제로는 백엔드에서 받아온 가장 마지막 기록 페이지를 가져와야 함
  const lastRecordedPage = 456; // 임시 값 (기록이 없으면 0)

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    // 기록 작성 완료 로직
    console.log('기록 작성 완료');
    console.log('페이지 범위:', isOverallEnabled ? '전체범위' : pageRange);
    console.log('내용:', content);
    console.log('총평 설정:', isOverallEnabled);

    // TODO: API 호출하여 기록 등록
    // 완료 후 이전 페이지로 이동
    navigate(-1);
  };

  // 총평이 켜져있으면 항상 유효, 아니면 페이지 범위와 내용이 모두 입력되어야 완료 버튼 활성화
  const isFormValid = isOverallEnabled
    ? content.trim() !== ''
    : pageRange.trim() !== '' && content.trim() !== '';

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        title="기록 작성"
        rightButton="완료"
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid}
      />
      <Container>
        <PageRangeSection
          pageRange={pageRange}
          onPageRangeChange={setPageRange}
          totalPages={totalPages}
          lastRecordedPage={lastRecordedPage}
          isOverallEnabled={isOverallEnabled}
          onOverallToggle={() => setIsOverallEnabled(!isOverallEnabled)}
        />

        <RecordContentSection content={content} onContentChange={setContent} />
      </Container>
    </>
  );
};

export default RecordWrite;
