import { useNavigate } from 'react-router-dom';
import {
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  EmptyContainer,
  EmptyText,
  ApplyButton,
} from './BookSearchBottomSheet.styled';

interface BookSearchStatesProps {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  activeTab: 'saved' | 'group';
  onClose: () => void;
}

const BookSearchStates = ({ isLoading, error, isEmpty, onClose }: BookSearchStatesProps) => {
  const navigate = useNavigate();

  const handleApplyBook = () => {
    navigate('/search/applybook');
    onClose();
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingText>책 목록을 불러오는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
      </ErrorContainer>
    );
  }

  if (isEmpty) {
    return (
      <EmptyContainer>
        <EmptyText>현재 등록된 책이 아닙니다.</EmptyText>
        <EmptyText>원하시는 책을 신청해주세요.</EmptyText>
        <ApplyButton onClick={handleApplyBook}>책 신청하기</ApplyButton>
      </EmptyContainer>
    );
  }

  return null;
};

export default BookSearchStates;
