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
import type { CreateFeedBody } from '@/api/feeds/createFeed';
import { ensureIsbn13 } from '@/utils/isbn';

// 🔧 보조 유틸: 하이픈/공백 제거 + 대문자 X 유지
const normalizeIsbn = (raw: string) => raw.replace(/[^0-9Xx]/g, '').toUpperCase();
const isIsbn10 = (isbn: string) => /^[0-9]{9}[0-9X]$/.test(isbn);

// ISBN 후보군 생성: 13자리(우선) → 원본정규화 → (가능하면) 10자리
const makeIsbnCandidates = (raw: string) => {
  const candidates: string[] = [];
  const normalized = normalizeIsbn(raw);
  const isbn13 = ensureIsbn13(raw); // 13으로 변환 성공 시
  if (isbn13) candidates.push(isbn13);
  // 혹시 서버가 10자리로만 붙는 경우 대비(일부 API 환경에서 존재)
  if (isIsbn10(normalized)) candidates.push(normalized);
  // 마지막으로 raw 정규화 값(13도 10도 아니면 그래도 시도)
  if (!candidates.includes(normalized)) candidates.push(normalized);
  // 중복 제거
  return Array.from(new Set(candidates));
};

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
    console.log('[CreatePost] ISBN candidates:', candidates);

    // images: 선택값 (없으면 undefined 전달 → FormData에 미첨부)
    const filesOrUndefined = selectedPhotos.length ? selectedPhotos : undefined;

    // 최대 2회까지(총 3회) 재시도: 13 → (10) → (정규화원본)
    for (let i = 0; i < Math.min(candidates.length, 3); i++) {
      const isbnToSend = candidates[i];
      const body: CreateFeedBody = {
        isbn: isbnToSend,
        contentBody: postContent.trim(),
        isPublic: !isPrivate,
        ...(selectedTags.length ? { tagList: selectedTags } : {}),
      };

      console.log(`[CreatePost] Try #${i + 1} with ISBN:`, isbnToSend);

      try {
        const result = await createNewFeed(body, filesOrUndefined);
        if (result?.success) {
          // onSuccess에서 이동 처리됨
          return;
        } else {
          // useCreateFeed에서 서버 메시지를 스낵바로 띄움
          // 80009면 다음 후보로 자동 재시도, 그 외면 바로 중단
          // (result.errorCode를 반환하도록 훅을 확장했다면 여기서 체크)
          // 현재 훅은 errorCode를 안 주니, 다음 후보가 있으면 조용히 다음 루프 진행
        }
      } catch (error) {
        console.error(`[CreatePost] Try #${i + 1} failed:`, error);
        // 네트워크/타임아웃 등은 바로 중단
        break;
      }
    }

    // 여기까지 왔다면 모든 시도가 실패
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
