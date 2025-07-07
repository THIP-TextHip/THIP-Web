import { forwardRef } from 'react';
import styled from '@emotion/styled';
import peopleImg from '../../assets/common/people.svg';
import type { Group } from './MyGroup';

interface MyGroupCardProps {
  group: Group;
}

export const MyGroupCard = forwardRef<HTMLDivElement, MyGroupCardProps>(({ group }, ref) => {
  return (
    <Card ref={ref}>
      <Thumbnail src={group.coverUrl} alt="책 표지" />
      <Info>
        <div>
          <CardTitle>{group.title}</CardTitle>
          <Participants>
            <img src={peopleImg} alt="" />
            <span>{group.participants}명 참여</span>
          </Participants>
        </div>
        <div>
          <ProgressText>
            {group.userName}님의 진행도 <Percent>{group.progress}%</Percent>
          </ProgressText>
          <Bar>
            <Fill width={group.progress} />
          </Bar>
        </div>
      </Info>
    </Card>
  );
});

const Card = styled.div`
  flex: 0 0 80%;
  scroll-snap-align: center;
  background: linear-gradient(to right, #fff 0%, #989898 100%);
  border-radius: 12px;
  display: flex;
  padding: 34px 12px;
  box-sizing: border-box;
  transition: transform 0.35s ease-out;
  will-change: transform;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 107px;
  border-radius: 8px;
  margin-right: 12px;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin: 6px 0;
  min-width: 0;
`;

const CardTitle = styled.h2`
  font-size: var(--font-size-large01);
  font-weight: var(--font-weight-semibold);
  color: #000;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Participants = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-300);
  margin: 8px 0;
  > span {
    line-height: 20px;
  }
`;

const ProgressText = styled.p`
  font-size: var(--font-size-medium01);
  color: var(--color-grey-300);
  margin: 12px 0;
`;

const Percent = styled.span`
  font-size: var(--font-size-medium02);
  color: var(--color-purple-main);
  font-weight: var(--font-weight-semibold);
  margin-left: 4px;
`;

const Bar = styled.div`
  width: 100%;
  height: 6px;
  background: var(--color-grey-300);
  border-radius: 4px;
  margin-top: 4px;
`;

const Fill = styled.div<{ width?: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: var(--color-purple-main);
  border-radius: 4px;
`;
