import { useRef } from 'react';
import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import {
  PhotoContainer,
  PhotoGrid,
  AddPhotoButton,
  PhotoImage,
  RemoveButton,
  PhotoCount,
} from './PhotoSection.styled';
import plusIcon from '../../assets/post/plus.svg';
import plusDisabledIcon from '../../assets/post/plus-disabled.svg';
import closeIcon from '../../assets/post/close.svg';

interface PhotoSectionProps {
  photos: File[];
  onPhotoAdd: (files: File[]) => void;
  onPhotoRemove: (index: number) => void;
}

const PhotoSection = ({ photos, onPhotoAdd, onPhotoRemove }: PhotoSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onPhotoAdd(files);
    }
    // input 값 초기화 (같은 파일을 다시 선택할 수 있도록)
    e.target.value = '';
  };

  const createImageUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const isDisabled = photos.length >= 3;

  return (
    <Section>
      <SectionTitle>사진 추가</SectionTitle>
      <PhotoContainer>
        <PhotoGrid>
          <AddPhotoButton onClick={handleFileInputClick} disabled={isDisabled}>
            <img src={isDisabled ? plusDisabledIcon : plusIcon} alt="사진 추가" />
          </AddPhotoButton>
          {photos.map((photo, index) => (
            <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
              <PhotoImage src={createImageUrl(photo)} alt={`선택된 사진 ${index + 1}`} />
              <RemoveButton onClick={() => onPhotoRemove(index)}>
                <img src={closeIcon} alt="삭제" />
              </RemoveButton>
            </div>
          ))}
        </PhotoGrid>
        <PhotoCount>{photos.length}/3개</PhotoCount>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </PhotoContainer>
    </Section>
  );
};

export default PhotoSection;
