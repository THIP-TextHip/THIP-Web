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
  photos: File[]; // 새로 추가할 이미지들
  onPhotoAdd: (files: File[]) => void;
  onPhotoRemove: (index: number) => void;
  existingImageUrls?: string[]; // 기존 이미지 URL들 (수정 시에만 사용)
  onExistingImageRemove?: (imageUrl: string) => void; // 기존 이미지 제거 함수 (수정 시에만 사용)
  readOnly?: boolean; // 읽기 전용 모드
  isEditMode?: boolean; // 수정 모드 (사진 추가 버튼 숨김)
}

const PhotoSection = ({
  photos,
  onPhotoAdd,
  onPhotoRemove,
  existingImageUrls = [],
  onExistingImageRemove,
  readOnly = false,
  isEditMode = false,
}: PhotoSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (readOnly || isEditMode) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || isEditMode) return;

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

  const totalImageCount = existingImageUrls.length + photos.length;
  const isDisabled = totalImageCount >= 3 || readOnly || isEditMode;

  return (
    <Section>
      <SectionTitle>사진 추가</SectionTitle>
      <PhotoContainer>
        <PhotoGrid>
          {/* 새 이미지 추가 버튼 - 수정 모드에서는 숨김 */}
          {!readOnly && !isEditMode && (
            <AddPhotoButton onClick={handleFileInputClick} disabled={isDisabled}>
              <img src={isDisabled ? plusDisabledIcon : plusIcon} alt="사진 추가" />
            </AddPhotoButton>
          )}

          {/* 기존 이미지들 (수정 모드에서만 표시) */}
          {existingImageUrls.map((imageUrl, index) => (
            <div
              key={`existing-${index}`}
              style={{ position: 'relative', width: '80px', height: '80px' }}
            >
              <PhotoImage src={imageUrl} alt={`기존 이미지 ${index + 1}`} />
              {!readOnly && onExistingImageRemove && (
                <RemoveButton onClick={() => onExistingImageRemove(imageUrl)}>
                  <img src={closeIcon} alt="삭제" />
                </RemoveButton>
              )}
            </div>
          ))}

          {/* 새로 추가된 이미지들 */}
          {photos.map((photo, index) => (
            <div
              key={`new-${index}`}
              style={{ position: 'relative', width: '80px', height: '80px' }}
            >
              <PhotoImage src={createImageUrl(photo)} alt={`새 이미지 ${index + 1}`} />
              {!readOnly && (
                <RemoveButton onClick={() => onPhotoRemove(index)}>
                  <img src={closeIcon} alt="삭제" />
                </RemoveButton>
              )}
            </div>
          ))}
        </PhotoGrid>

        <PhotoCount>{totalImageCount}/3개</PhotoCount>

        {!readOnly && !isEditMode && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        )}
      </PhotoContainer>
    </Section>
  );
};

export default PhotoSection;
