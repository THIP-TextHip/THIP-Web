import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import PageRangeSection from '../../components/recordwrite/PageRangeSection';
import RecordContentSection from '../../components/recordwrite/RecordContentSection';
import VoiceToggleSection from '../../components/recordwrite/VoiceToggleSection';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Container } from './RecordWrite.styled';

const RecordWrite = () => {
  const navigate = useNavigate();
  const [pageRange, setPageRange] = useState('');
  const [content, setContent] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // TODO: 실제로는 백엔드에서 받아온 책 정보에서 전체 페이지 수를 가져와야 함
  const totalPages = 600; // 임시 값

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    // 기록 작성 완료 로직
    console.log('기록 작성 완료');
    console.log('페이지 범위:', pageRange);
    console.log('내용:', content);
    console.log('종명 설정:', isVoiceEnabled);

    // TODO: API 호출하여 기록 등록
    // 완료 후 이전 페이지로 이동
    navigate(-1);
  };

  // 페이지 범위와 내용이 모두 입력되어야 완료 버튼 활성화
  const isFormValid = pageRange.trim() !== '' && content.trim() !== '';

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
        />

        <VoiceToggleSection
          isVoiceEnabled={isVoiceEnabled}
          onToggle={() => setIsVoiceEnabled(!isVoiceEnabled)}
        />

        <RecordContentSection content={content} onContentChange={setContent} />
      </Container>
    </>
  );
};

export default RecordWrite;
