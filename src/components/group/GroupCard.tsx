import { forwardRef } from 'react';
import peopleIcon from '@/assets/common/darkPeople.svg';
import lockedBookImg from '@/assets/books/lockedBook.svg';
import type { Group } from './MyGroupBox';
import {
  Card,
  CoverWrapper,
  Cover,
  LockedOverlay,
  Info,
  Title,
  Bottom,
  Participant,
  MaximumParticipants,
  RecruitingDeadline,
  OngoingDeadline,
} from './GroupCard.styled';

interface Props {
  group: Group;
  isOngoing?: boolean;
  type?: 'main' | 'search' | 'modal';
  isRecommend?: boolean;
  onClick?: () => void;
  isFirstCard?: boolean;
  isPublic?: boolean;
  isCompleted?: boolean;
}

export const GroupCard = forwardRef<HTMLDivElement, Props>(
  (
    { group, isOngoing, type = 'main', isRecommend = false, onClick, isFirstCard, isCompleted },
    ref,
  ) => {
    return (
      <Card ref={ref} cardType={type} isFirstCard={isFirstCard} onClick={onClick}>
        <CoverWrapper>
          <Cover src={group.coverUrl} alt="cover" cardType={type} isRecommend={isRecommend} />
          {group.isPublic === false && (
            <LockedOverlay>
              <img src={lockedBookImg} alt="locked" />
            </LockedOverlay>
          )}
        </CoverWrapper>
        <Info>
          <Title isRecommend={isRecommend}>{group.title}</Title>
          <Bottom>
            <Participant isRecommend={isRecommend}>
              <img src={peopleIcon} alt="people" />
              <p>{group.participants}</p>
              {!isCompleted && (
                <MaximumParticipants>/ {group.maximumParticipants}명</MaximumParticipants>
              )}
              {isCompleted && <MaximumParticipants>명</MaximumParticipants>}
            </Participant>
            {!isCompleted &&
              (type !== 'modal' || group.type !== 'expired') &&
              (isOngoing === true ? (
                <RecruitingDeadline isRecommend={isRecommend}>
                  {group.deadLine} 종료
                </RecruitingDeadline>
              ) : (
                <OngoingDeadline isRecommend={isRecommend}>
                  {group.deadLine} 모집 마감
                </OngoingDeadline>
              ))}
          </Bottom>
        </Info>
      </Card>
    );
  },
);
