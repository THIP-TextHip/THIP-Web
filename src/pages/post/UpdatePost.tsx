import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import BookSelectionSection from '../../components/creategroup/BookSelectionSection';
import PostContentSection from '../../components/createpost/PostContentSection';
import PhotoSection from '../../components/createpost/PhotoSection';
import PrivacyToggleSection from '../../components/createpost/PrivacyToggleSection';
import TagSelectionSection from '../../components/createpost/TagSelectionSection';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container } from './CreatePost.styled';
import { Section } from '../group/CommonSection.styled';
import { useUpdateFeed } from '@/hooks/useUpdateFeed';
import { usePopupActions } from '@/hooks/usePopupActions';
import { getFeedDetail } from '@/api/feeds/getFeedDetail';
import type { UpdateFeedBody } from '@/api/feeds/updateFeed';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
}

const UpdatePost = () => {
  const navigate = useNavigate();
  const { feedId } = useParams<{ feedId: string }>();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [postContent, setPostContent] = useState('');
  const [selectedPhotos] = useState<File[]>([]); // 수정 모드에서는 사용하지 않음
  const [remainImageUrls, setRemainImageUrls] = useState<string[]>([]); // 유지할 기존 이미지들
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { openSnackbar, closePopup } = usePopupActions();
  const { updateExistingFeed, loading: updateLoading } = useUpdateFeed({
    onSuccess: feedId => {
      console.log('피드 수정 성공! 피드 ID:', feedId);
      navigate(`/feed/${feedId}`);
    },
  });

  // 피드 상세 정보 로드
  useEffect(() => {
    const loadFeedDetail = async () => {
      if (!feedId) {
        openSnackbar({
          message: '잘못된 피드 ID입니다.',
          variant: 'top',
          onClose: closePopup,
        });
        navigate(-1);
        return;
      }

      try {
        setLoading(true);
        const response = await getFeedDetail(Number(feedId));
        const data = response.data;

        // 기존 데이터로 폼 초기화
        setSelectedBook({
          id: 0,
          title: data.bookTitle,
          author: data.bookAuthor,
          cover: '',
          isbn: data.isbn,
        });

        setPostContent(data.contentBody);
        setIsPrivate(!data.isPublic);
        setSelectedTags(data.tagList || []);
        setRemainImageUrls(data.contentUrls || []);
      } catch (error) {
        console.error('피드 상세 정보 로드 실패:', error);
        openSnackbar({
          message: '피드 정보를 불러오는데 실패했습니다.',
          variant: 'top',
          onClose: closePopup,
        });
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadFeedDetail();
  }, [feedId]); // 의존성 배열에서 함수들 제거

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = async () => {
    if (!isFormValid) {
      openSnackbar({
        message: '글 내용을 입력해주세요.',
        variant: 'top',
        onClose: closePopup,
      });
      return;
    }

    if (!feedId) return;

    const body: UpdateFeedBody = {
      contentBody: postContent.trim(),
      isPublic: !isPrivate,
      ...(selectedTags.length ? { tagList: selectedTags } : {}),
      ...(remainImageUrls.length ? { remainImageUrls } : {}),
    };

    // API 요청 전 데이터 확인
    console.log('수정 요청 데이터:', {
      feedId: Number(feedId),
      body: body,
    });

    const result = await updateExistingFeed(Number(feedId), body);

    if (!result?.success) {
      return;
    }
  };

  // 새로 추가할 이미지 핸들러 (수정 모드에서는 사용하지 않음)
  const handlePhotoAdd = () => {
    // 수정 모드에서는 새 이미지 추가 불가
    return;
  };

  // 새로 추가한 이미지 제거 (수정 모드에서는 사용하지 않음)
  const handlePhotoRemove = () => {
    // 수정 모드에서는 새 이미지 추가 불가
    return;
  };

  // 기존 이미지 제거 (remainImageUrls에서 제외)
  const handleExistingImageRemove = (imageUrl: string) => {
    setRemainImageUrls(prev => prev.filter(url => url !== imageUrl));
  };

  const handlePrivacyToggle = () => setIsPrivate(v => !v);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const isFormValid = postContent.trim() !== '';

  // 로딩 중
  if (loading) {
    return (
      <div style={{ padding: '56px 0', textAlign: 'center', color: 'white' }}>
        피드 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="글 수정"
        rightButton={updateLoading ? '수정 중...' : '완료'}
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid && !updateLoading}
      />
      <Container>
        {/* 책 정보는 수정할 수 없음 (읽기 전용으로 표시) */}
        <BookSelectionSection
          selectedBook={selectedBook}
          onSearchClick={() => {}} // 비활성화
          onChangeClick={() => {}} // 비활성화
          readOnly={true} // 읽기 전용 모드
        />

        <Section showDivider />

        <PostContentSection content={postContent} onContentChange={setPostContent} />

        <Section showDivider />

        {/* 기존 이미지 삭제만 가능, 추가는 불가 */}
        <PhotoSection
          photos={selectedPhotos}
          onPhotoAdd={handlePhotoAdd}
          onPhotoRemove={handlePhotoRemove}
          existingImageUrls={remainImageUrls}
          onExistingImageRemove={handleExistingImageRemove}
          isEditMode={true} // 수정 모드로 설정하여 추가 버튼 숨김
        />

        <Section showDivider />

        <PrivacyToggleSection isPrivate={isPrivate} onToggle={handlePrivacyToggle} />

        <Section showDivider />

        <TagSelectionSection selectedTags={selectedTags} onTagToggle={handleTagToggle} />
      </Container>
    </>
  );
};

export default UpdatePost;
