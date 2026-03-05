import { forwardRef } from 'react';
import peopleImg from '../../assets/common/people.svg';
import type { Group } from './MyGroupBox';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Thumbnail,
  Info,
  CardTitle,
  Participants,
  ProgressText,
  Percent,
  DeadlineText,
  DeadlineValue,
  Bar,
  Fill,
} from './MyGroupCard.styled';

interface MyGroupCardProps {
  group: Group;
  onClick?: () => void;
  isMine?: boolean;
}

export const MyGroupCard = forwardRef<HTMLDivElement, MyGroupCardProps>((props, ref) => {
  const { group, onClick, isMine } = props;
  const navigate = useNavigate();
  const hasDeadline = group.deadLine != null;

  const handleClick = () => {
    if (hasDeadline) {
      navigate(`/group/detail/${group.id}`);
    } else {
      onClick?.();
    }
  };

  return (
    <Card ref={ref} onClick={handleClick}>
      <Thumbnail src={group.coverUrl} alt="책 표지" />
      <Info>
        <div>
          <CardTitle>{group.title}</CardTitle>
          <Participants>
            <img src={peopleImg} alt="" />
            <span>{group.participants}명</span>
          </Participants>
        </div>
        <div>
          {hasDeadline ? (
            <DeadlineText>
              시작까지 <DeadlineValue>{group.deadLine}</DeadlineValue>
            </DeadlineText>
          ) : (
            <>
              <ProgressText>
                {isMine ? '내 진행도' : `${group.userName}님의 진행도`}{' '}
                <Percent>{Math.floor(group.progress || 0)}%</Percent>
              </ProgressText>
              <Bar>
                <Fill width={group.progress || 0} />
              </Bar>
            </>
          )}
        </div>
      </Info>
    </Card>
  );
});
