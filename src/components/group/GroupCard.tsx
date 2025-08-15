import { forwardRef } from 'react';
import styled from '@emotion/styled';
import peopleIcon from '@/assets/common/darkPeople.svg';
import type { Group } from './MyGroupBox';
import { colors, typography } from '@/styles/global/global';

interface Props {
  group: Group;
  isOngoing?: boolean;
  type?: 'main' | 'search' | 'modal';
  isRecommend?: boolean;
  onClick?: () => void;
}

export const GroupCard = forwardRef<HTMLDivElement, Props>(
  ({ group, isOngoing, type = 'main', isRecommend = false, onClick }, ref) => {
    return (
      <Card ref={ref} cardType={type} onClick={onClick}>
        <Cover src={group.coverUrl} alt="cover" cardType={type} isRecommend={isRecommend} />
        <Info>
          <Title isRecommend={isRecommend}>{group.title}</Title>
          <Bottom>
            <Participant isRecommend={isRecommend}>
              <img src={peopleIcon} alt="people" />
              <p>{group.participants}</p>
              <MaximumParticipants>/ {group.maximumParticipants}명</MaximumParticipants>
            </Participant>
            {isOngoing === true ? (
              <RecruitingDeadline isRecommend={isRecommend}>
                {group.deadLine}일 뒤 모집 마감
              </RecruitingDeadline>
            ) : (
              <OngoingDeadline isRecommend={isRecommend}>
                {group.deadLine}일 뒤 종료
              </OngoingDeadline>
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
    cardType === 'search' ? colors.black.main : colors.darkgrey.main};
  border-top: ${({ cardType }) =>
    cardType === 'search' ? `1px solid ${colors.darkgrey.dark}` : 'none'};
  border: ${({ cardType }) => (cardType === 'main' ? `1px solid ${colors.grey[300]}` : 'none')};
  border-radius: ${({ cardType }) => (cardType === 'search' ? `none` : '12px')};
  box-sizing: border-box;
  padding: ${({ cardType }) => (cardType === 'search' ? '24px 12px 12px 12px' : '12px')};
  gap: 12px;
  width: 100%;
`;

const Cover = styled.img<{ cardType: 'main' | 'search' | 'modal'; isRecommend?: boolean }>`
  object-fit: cover;
  flex-shrink: 0;
  width: ${({ cardType, isRecommend }) => (cardType === 'search' || isRecommend ? '60px' : '80px')};
  height: ${({ cardType, isRecommend }) =>
    cardType === 'search' || isRecommend ? '80px' : '107px'};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h3<{ isRecommend: boolean }>`
  font-size: ${({ isRecommend }) =>
    isRecommend ? typography.fontSize.sm : typography.fontSize.lg};
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

const Participant = styled.div<{ isRecommend: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  img {
    width: 16px;
    height: 16px;
  }
`;

const MaximumParticipants = styled.div`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.xs};
`;

const RecruitingDeadline = styled.div<{ isRecommend: boolean }>`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.red};
`;

const OngoingDeadline = styled.div<{ isRecommend: boolean }>`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
`;
