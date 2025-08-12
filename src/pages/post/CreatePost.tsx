import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import BookSearchBottomSheet from '../../components/common/BookSearchBottomSheet/BookSearchBottomSheet';
import BookSelectionSection from '../../components/creategroup/BookSelectionSection';
import PostContentSection from '../../components/createpost/PostContentSection';
import PhotoSection from '../../components/createpost/PhotoSection';
import PrivacyToggleSection from '../../components/createpost/PrivacyToggleSection';
import TagSelectionSection from '../../components/createpost/TagSelectionSection';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container } from './CreatePost.styled';
import { Section } from '../group/CommonSection.styled';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import { usePopupActions } from '@/hooks/usePopupActions';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [postContent, setPostContent] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);

  const { openSnackbar, closePopup } = usePopupActions();
  const { createNewFeed, loading } = useCreateFeed({
    onSuccess: feedId => {
      console.log('피드 작성 성공! 피드 ID:', feedId);
      // 피드 페이지로 이동
      navigate('/feed');
    },
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  // 이미지 업로드 함수
  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    try {
      // 이미지 업로드 API 사용 (실제 구현 시 import 추가 필요)
      // import { uploadMultipleImages } from '@/api/images/uploadImage';
      // return await uploadMultipleImages(files);

      // 임시로 base64 변환 사용 (개발용)
      const promises = files.map(file => {
        return new Promise<string>(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      return Promise.all(promises);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleCompleteClick = async () => {
    // 필수 항목 검증
    if (!isFormValid) {
      openSnackbar({
        message: '책 선택과 글 내용을 입력해주세요.',
        variant: 'top',
        onClose: closePopup,
      });
      return;
    }

    try {
      // 선택된 사진들을 업로드
      let imageUrls: string[] = [];
      if (selectedPhotos.length > 0) {
        imageUrls = await uploadImages(selectedPhotos);
        console.log('이미지 업로드 완료:', imageUrls.length, '개');
      }

      const feedData = {
        request: {
          isbn: selectedBook.isbn,
          contentBody: postContent.trim(),
          isPublic: !isPrivate, // UI에서는 "비공개" 토글이므로 반대로 처리
          tagList: selectedTags,
        },
        images: imageUrls,
      };

      console.log('피드 작성 요청 데이터:', feedData);

      // 피드 작성 API 호출
      await createNewFeed(feedData);
    } catch (error) {
      console.error('피드 작성 실패:', error);
      openSnackbar({
        message: '피드 작성 중 오류가 발생했습니다.',
        variant: 'top',
        onClose: closePopup,
      });
    }
  };

  const handleBookSearchOpen = () => {
    setIsBookSearchOpen(true);
  };

  const handleChangeBook = () => {
    setIsBookSearchOpen(true);
  };

  const handleBookSearchClose = () => {
    setIsBookSearchOpen(false);
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsBookSearchOpen(false);
  };

  const handlePhotoAdd = (files: File[]) => {
    setSelectedPhotos(prev => [...prev, ...files].slice(0, 3)); // 최대 3개까지
  };

  const handlePhotoRemove = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handlePrivacyToggle = () => {
    setIsPrivate(!isPrivate);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // 책 선택과 글 내용만 필수, 나머지는 선택사항
  const isFormValid = !!selectedBook && postContent.trim() !== '';

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="새 글"
        rightButton={loading ? '작성 중...' : '완료'}
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid && !loading}
      />
      <Container>
        <BookSelectionSection
          selectedBook={selectedBook}
          onSearchClick={handleBookSearchOpen}
          onChangeClick={handleChangeBook}
        />

        <Section showDivider />

        <PostContentSection content={postContent} onContentChange={setPostContent} />

        <Section showDivider />

        <PhotoSection
          photos={selectedPhotos}
          onPhotoAdd={handlePhotoAdd}
          onPhotoRemove={handlePhotoRemove}
        />

        <Section showDivider />

        <PrivacyToggleSection isPrivate={isPrivate} onToggle={handlePrivacyToggle} />

        <Section showDivider />

        <TagSelectionSection selectedTags={selectedTags} onTagToggle={handleTagToggle} />

        <BookSearchBottomSheet
          isOpen={isBookSearchOpen}
          onClose={handleBookSearchClose}
          onSelectBook={handleBookSelect}
        />
      </Container>
    </>
  );
};

export default CreatePost;
