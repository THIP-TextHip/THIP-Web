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

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [postContent, setPostContent] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    // 필수 항목 검증
    if (!isFormValid) {
      console.log('필수 항목을 입력해주세요.');
      return;
    }

    // 글 작성 완료 로직
    console.log('글 작성 완료');
    console.log('필수 - 선택된 책:', selectedBook);
    console.log('필수 - 글 내용:', postContent);
    console.log('선택 - 선택된 사진:', selectedPhotos);
    console.log('선택 - 공개 설정:', isPrivate ? '비공개' : '공개');
    console.log('선택 - 선택된 태그:', selectedTags);

    // TODO: API 호출하여 글 등록
    // 완료 후 이전 페이지로 이동
    navigate(-1);
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
        rightButton="완료"
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid}
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
