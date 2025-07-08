import { forwardRef } from 'react';
import styled from '@emotion/styled';
import peopleIcon from '@/assets/common/darkPeople.svg';
import type { Group } from './MyGroupBox';

interface Props {
  group: Group;
  type?: 'recruiting' | 'ongoing';
}

export const GroupCard = forwardRef<HTMLDivElement, Props>(({ group, type }, ref) => {
  return (
    <Card ref={ref}>
      <Cover src={group.coverUrl} alt="cover" />
      <Info>
        <Title>{group.title}</Title>
        <Bottom>
          <Participant>
            <img src={peopleIcon} alt="people" />
            <p>{group.participants}</p>
            <MaximumParticipants>/ {group.maximumParticipants}명</MaximumParticipants>
          </Participant>
          {type === 'recruiting' ? (
            <RecruitingDeadline>{group.deadLine}일 뒤 모집 마감</RecruitingDeadline>
          ) : (
            <OngoingDeadline>{group.deadLine}일 뒤 종료</OngoingDeadline>
          )}
        </Bottom>
      </Info>
    </Card>
  );
});

const Card = styled.div`
  display: flex;
  align-items: center;
  background: var(--color-darkgrey-main);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 12px;
  gap: 12px;
  width: 100%;
  border: 1px solid var(--color-grey-300);
`;

const Cover = styled.img`
  width: 80px;
  height: 107px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h3`
  font-size: var(--font-size-large01);
  font-weight: var(--font-weight-bold);
  color: #ffffff;
  margin-bottom: 10px;
  line-height: 1.4;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const Participant = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-white);
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-medium);
  img {
    width: 16px;
    height: 16px;
  }
`;
const MaximumParticipants = styled.div`
  color: var(--color-grey-100);
  font-size: var(--font-size-small03);
`;

const RecruitingDeadline = styled.div`
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-semibold);
  color: var(--color-red);
`;

const OngoingDeadline = styled.div`
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
`;
