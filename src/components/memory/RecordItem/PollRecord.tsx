import type { PollOption } from '../../../pages/memory/Memory';
import {
  PollSection,
  PollQuestion,
  PollOptions,
  PollOption as PollOptionStyled,
  PollNumber,
  PollText,
  PollPercentage,
  PollBar,
  PollBarFill,
} from './PollRecord.styled';

interface PollRecordProps {
  content: string;
  pollOptions: PollOption[];
}

const PollRecord = ({ content, pollOptions }: PollRecordProps) => {
  return (
    <PollSection>
      <PollQuestion>{content}</PollQuestion>
      <PollOptions>
        {pollOptions.map(option => (
          <PollOptionStyled key={option.id} isHighest={option.isHighest}>
            <PollNumber>{option.id}</PollNumber>
            <PollText>{option.text}</PollText>
            <PollPercentage>{option.percentage}%</PollPercentage>
            <PollBar>
              <PollBarFill percentage={option.percentage} isHighest={option.isHighest} />
            </PollBar>
          </PollOptionStyled>
        ))}
      </PollOptions>
    </PollSection>
  );
};

export default PollRecord;
