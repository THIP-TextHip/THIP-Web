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
  const [selectedPhotos] = useState<File[]>([]);
  const [remainImageUrls, setRemainImageUrls] = useState<string[]>([]);
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
          cover: data.bookImageUrl,
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
  }, [feedId]);

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
      remainImageUrls, // 이미지가 없어도 빈 배열로 전송하여 삭제 처리
    };

    const result = await updateExistingFeed(Number(feedId), body);

    if (!result?.success) {
      return;
    }
  };

  const handlePhotoAdd = () => {
    return;
  };

  const handlePhotoRemove = () => {
    return;
  };

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
        rightButton="완료"
        onLeftClick={handleBackClick}
        onRightClick={handleCompleteClick}
        isNextActive={isFormValid && !updateLoading}
      />
      <Container>
        <BookSelectionSection
          selectedBook={selectedBook}
          onSearchClick={() => {}}
          onChangeClick={() => {}}
          readOnly={true}
        />

        <Section showDivider />

        <PostContentSection content={postContent} onContentChange={setPostContent} />

        <Section showDivider />

        <PhotoSection
          photos={selectedPhotos}
          onPhotoAdd={handlePhotoAdd}
          onPhotoRemove={handlePhotoRemove}
          existingImageUrls={remainImageUrls}
          onExistingImageRemove={handleExistingImageRemove}
          isEditMode={true}
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
