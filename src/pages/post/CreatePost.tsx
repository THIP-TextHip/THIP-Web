import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import type { CreateFeedBody } from '@/api/feeds/createFeed';
import { ensureIsbn13 } from '@/utils/isbn';

const normalizeIsbn = (raw: string) => raw.replace(/[^0-9Xx]/g, '').toUpperCase();
const isIsbn10 = (isbn: string) => /^[0-9]{9}[0-9X]$/.test(isbn);

const makeIsbnCandidates = (raw: string) => {
  const candidates: string[] = [];
  const normalized = normalizeIsbn(raw);
  const isbn13 = ensureIsbn13(raw);
  if (isbn13) candidates.push(isbn13);
  if (isIsbn10(normalized)) candidates.push(normalized);
  if (!candidates.includes(normalized)) candidates.push(normalized);
  return Array.from(new Set(candidates));
};

interface Book {
  id?: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pinData = location.state?.pinData;

  function convertBookInfoToBook(bookInfo: Book): Book | null {
    if (!bookInfo) return null;
    return {
      title: bookInfo.title,
      author: bookInfo.author,
      cover: bookInfo.cover,
      isbn: bookInfo.isbn,
    };
  }

  const [selectedBook, setSelectedBook] = useState<Book | null>(
    pinData
      ? {
          title: pinData.bookTitle,
          author: pinData.authorName,
          cover: pinData.bookImageUrl,
          isbn: pinData.isbn,
        }
      : convertBookInfoToBook(location.state?.selectedBook),
  );

  const [postContent, setPostContent] = useState(pinData?.recordContent || '');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);

  const isFromPin = !!pinData;

  const { openSnackbar, closePopup } = usePopupActions();
  const { createNewFeed, loading } = useCreateFeed({
    onSuccess: () => {
      navigate('/feed');
    },
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = async () => {
    if (!isFormValid) {
      openSnackbar({
        message: '책 선택과 글 내용을 입력해주세요.',
        variant: 'top',
        onClose: closePopup,
      });
      return;
    }

    const candidates = makeIsbnCandidates(selectedBook!.isbn);

    const filesOrUndefined = selectedPhotos.length ? selectedPhotos : undefined;

    for (let i = 0; i < Math.min(candidates.length, 3); i++) {
      const isbnToSend = candidates[i];
      const body: CreateFeedBody = {
        isbn: isbnToSend,
        contentBody: postContent.trim(),
        isPublic: !isPrivate,
        ...(selectedTags.length ? { tagList: selectedTags } : {}),
      };

      try {
        const result = await createNewFeed(body, filesOrUndefined);
        if (result?.success) {
          return;
        }
      } catch (error) {
        console.error(`[CreatePost] Try #${i + 1} failed:`, error);
        break;
      }
    }

    openSnackbar({
      message:
        'ISBN으로 책이 조회되지 않아요. ISBN-13(하이픈 없이)으로 다시 선택하시거나 다른 책으로 시도해 주세요.',
      variant: 'top',
      onClose: closePopup,
    });
  };

  const handleBookSearchOpen = () => setIsBookSearchOpen(true);
  const handleChangeBook = () => setIsBookSearchOpen(true);
  const handleBookSearchClose = () => setIsBookSearchOpen(false);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsBookSearchOpen(false);
  };

  const handlePhotoAdd = (files: File[]) => {
    setSelectedPhotos(prev => [...prev, ...files].slice(0, 3));
  };

  const handlePhotoRemove = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handlePrivacyToggle = () => setIsPrivate(v => !v);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const isFormValid = !!selectedBook && postContent.trim() !== '';

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="새 글"
        rightButton="완료"
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid && !loading}
      />
      <Container>
        <BookSelectionSection
          selectedBook={selectedBook}
          onSearchClick={handleBookSearchOpen}
          onChangeClick={handleChangeBook}
          readOnly={isFromPin}
        />

        <Section showDivider />

        <PostContentSection
          content={postContent}
          onContentChange={setPostContent}
          readOnly={false}
        />

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
