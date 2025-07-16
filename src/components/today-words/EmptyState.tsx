import { EmptyStateContainer, EmptyMessage, EmptySubMessage } from './EmptyState.styled';

const EmptyState = () => {
  return (
    <EmptyStateContainer>
      <EmptyMessage>아직 대화가 없어요</EmptyMessage>
      <EmptySubMessage>첫번째 한마디를 남겨보세요!</EmptySubMessage>
    </EmptyStateContainer>
  );
};

export default EmptyState;
