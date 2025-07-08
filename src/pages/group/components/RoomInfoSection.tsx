import { Section, SectionTitle } from '../CommonSection.styled';
import { TextAreaBox, TextArea, CharacterCount } from './RoomInfoSection.styled';

interface RoomInfoSectionProps {
  roomTitle: string;
  roomDescription: string;
  onRoomTitleChange: (value: string) => void;
  onRoomDescriptionChange: (value: string) => void;
}

const RoomInfoSection = ({
  roomTitle,
  roomDescription,
  onRoomTitleChange,
  onRoomDescriptionChange,
}: RoomInfoSectionProps) => {
  return (
    <>
      <Section>
        <SectionTitle>방 제목</SectionTitle>
        <TextAreaBox>
          <TextArea
            placeholder="방 제목을 입력합니다."
            value={roomTitle}
            onChange={e => onRoomTitleChange(e.target.value)}
            maxLength={15}
            rows={1}
          />
          <CharacterCount>{roomTitle.length} / 15</CharacterCount>
        </TextAreaBox>
      </Section>

      <Section showDivider />

      <Section>
        <SectionTitle>한 줄 소개</SectionTitle>
        <TextAreaBox>
          <TextArea
            placeholder="방에 대한 소개 입력입니다."
            value={roomDescription}
            onChange={e => onRoomDescriptionChange(e.target.value)}
            maxLength={75}
            rows={3}
          />
          <CharacterCount>{roomDescription.length} / 75</CharacterCount>
        </TextAreaBox>
      </Section>
    </>
  );
};

export default RoomInfoSection;
