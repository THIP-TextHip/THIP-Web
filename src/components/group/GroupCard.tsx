import { forwardRef } from 'react';
import styled from '@emotion/styled';
import peopleIcon from '@/assets/common/darkPeople.svg';
import type { Group } from './MyGroupBox';
import { colors, typography } from '@/styles/global/global';

interface Props {
  group: Group;
  isOngoing?: boolean;
  type?: 'main' | 'search' | 'modal';
}

export const GroupCard = forwardRef<HTMLDivElement, Props>(
  ({ group, isOngoing, type = 'main' }, ref) => {
    return (
      <Card ref={ref} cardType={type}>
        <Cover src={group.coverUrl} alt="cover" cardType={type} />
        <Info>
          <Title>{group.title}</Title>
          <Bottom>
            <Participant>
              <img src={peopleIcon} alt="people" />
              <p>{group.participants}</p>
              <MaximumParticipants>/ {group.maximumParticipants}명</MaximumParticipants>
            </Participant>
            {isOngoing === true ? (
              <RecruitingDeadline>{group.deadLine}일 뒤 모집 마감</RecruitingDeadline>
            ) : (
              <OngoingDeadline>{group.deadLine}일 뒤 종료</OngoingDeadline>
            )}
          </Bottom>
        </Info>
      </Card>
    );
  },
);

const Card = styled.div<{ cardType: 'main' | 'search' | 'modal' }>`
  display: flex;
  align-items: center;
  background: ${({ cardType }) =>
    cardType === 'search' ? 'var(--color-black-main)' : 'var(--color-darkgrey-main)'};
  border-radius: ${({ cardType }) => (cardType === 'search' ? `none` : '12px')};
  box-sizing: border-box;
  padding: ${({ cardType }) => (cardType === 'search' ? '24px 12px 12px 12px' : '12px')};
  gap: 12px;
  width: 100%;
  border: ${({ cardType }) => (cardType === 'main' ? '1px solid var(--color-grey-300)' : 'none')};
  border-top: ${({ cardType }) =>
    cardType === 'search' ? `1px solid ${colors.darkgrey.dark}` : ''};
`;

const Cover = styled.img<{ cardType: 'main' | 'search' | 'modal' }>`
  object-fit: cover;
  flex-shrink: 0;

  width: ${({ cardType }) => (cardType === 'search' ? '60px' : '80px')};
  height: ${({ cardType }) => (cardType === 'search' ? '80px' : '107px')};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
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
