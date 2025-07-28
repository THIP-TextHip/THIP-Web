import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import { TextAreaBox, TextArea, CharacterCount } from './PostContentSection.styled';

interface PostContentSectionProps {
  content: string;
  onContentChange: (value: string) => void;
}

const PostContentSection = ({ content, onContentChange }: PostContentSectionProps) => {
  const maxLength = 2000;

  return (
    <Section>
      <SectionTitle>글 작성</SectionTitle>
      <TextAreaBox>
        <TextArea
          placeholder="...한 생각이 들었어요. 🤔"
          value={content}
          onChange={e => onContentChange(e.target.value)}
          maxLength={maxLength}
          rows={4}
        />
        <CharacterCount>
          {content.length} / {maxLength}
        </CharacterCount>
      </TextAreaBox>
    </Section>
  );
};

export default PostContentSection;
