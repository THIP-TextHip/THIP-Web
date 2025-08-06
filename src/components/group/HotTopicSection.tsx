import {
  HotTopicSection as StyledHotTopicSection,
  HotTopicSectionHeader,
  HotTopicSectionTitle,
  HotTopicContent,
  HotTopicText,
  VoteOptionsList,
  VoteOption,
  VoteOptionNumber,
  VoteOptionText,
  Pagination,
  PaginationDot,
} from './HotTopicSection.styled';

export interface VoteOption {
  id: string;
  text: string;
}

interface HotTopicSectionProps {
  topicText: string;
  voteOptions: VoteOption[];
  currentPage: number;
  totalPages: number;
  onClick: () => void;
}

const HotTopicSection = ({
  topicText,
  voteOptions,
  currentPage,
  totalPages,
  onClick,
}: HotTopicSectionProps) => {
  return (
    <StyledHotTopicSection>
      <HotTopicSectionHeader onClick={onClick}>
        <HotTopicSectionTitle>모임방의 뜨거운 감자</HotTopicSectionTitle>
      </HotTopicSectionHeader>
      <HotTopicContent>
        <HotTopicText>{topicText}</HotTopicText>
        <VoteOptionsList>
          {voteOptions.map((option, index) => (
            <VoteOption key={option.id}>
              <VoteOptionNumber>{index + 1}.</VoteOptionNumber>
              <VoteOptionText>{option.text}</VoteOptionText>
            </VoteOption>
          ))}
        </VoteOptionsList>
        {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationDot key={index} active={index === currentPage} />
            ))}
          </Pagination>
        )}
      </HotTopicContent>
    </StyledHotTopicSection>
  );
};

export default HotTopicSection;
