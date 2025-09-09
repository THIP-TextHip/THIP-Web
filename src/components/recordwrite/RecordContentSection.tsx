import { useRef, useEffect } from 'react';
import {
  Section,
  SectionTitle,
  TextAreaBox,
  TextArea,
  CharacterCount,
} from './RecordContentSection.styled';

interface RecordContentSectionProps {
  content: string;
  onContentChange: (value: string) => void;
  autoFocus?: boolean; // 자동 포커스 및 커서 위치 설정 여부
}

const RecordContentSection = ({
  content,
  onContentChange,
  autoFocus = false,
}: RecordContentSectionProps) => {
  const maxLength = 500;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트 변경 시 높이 자동 조절
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 높이를 초기화한 후 scrollHeight로 설정
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // content가 변경될 때마다 높이 조절
  useEffect(() => {
    adjustHeight();
  }, [content]);

  // 컴포넌트 마운트 시 초기 높이 설정 및 autoFocus 처리
  useEffect(() => {
    adjustHeight();
    
    // autoFocus가 true이고 textarea가 있으면 포커스 및 커서를 끝으로 이동
    if (autoFocus && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      // 커서를 텍스트 끝으로 이동
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  return (
    <Section>
      <SectionTitle>지금 읽은 그 부분, 어땠나요?</SectionTitle>
      <TextAreaBox>
        <TextArea
          ref={textareaRef}
          placeholder="...한 생각이 들었어요. 🤔"
          value={content}
          onChange={handleChange}
          maxLength={maxLength}
          rows={1}
        />
        <CharacterCount>
          {content.length} / {maxLength}
        </CharacterCount>
      </TextAreaBox>
    </Section>
  );
};

export default RecordContentSection;
