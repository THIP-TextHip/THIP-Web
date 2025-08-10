import { useNavigate } from 'react-router-dom';
import type { KeyboardEvent } from 'react';
import rightChevron from '../../assets/member/right-chevron.svg';
import type { Member } from '../../mocks/members.mock';
import {
  Container,
  MemberItem,
  ProfileSection,
  ProfileImage,
  MemberInfo,
  MemberName,
  MemberRole,
  MemberStatus,
  ChevronIcon,
} from './MemberList.styled';

interface MemberListProps {
  members: Member[];
  onMemberClick?: (memberId: string) => void;
}

const MemberList = ({ members, onMemberClick }: MemberListProps) => {
  const navigate = useNavigate();

  const handleMemberClick = (memberId: string) => {
    if (onMemberClick) {
      onMemberClick(memberId);
    } else {
      // 기본 동작: 개별 유저 페이지로 이동
      navigate(`/otherfeed/${memberId}`);
    }
  };

  return (
    <Container>
      {members.map(member => (
        <MemberItem
          key={member.id}
          role="button"
          tabIndex={0}
          onClick={() => handleMemberClick(member.id)}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleMemberClick(member.id);
            }
          }}
        >
          <ProfileSection>
            <ProfileImage />
            <MemberInfo>
              <MemberName>{member.nickname}</MemberName>
              <MemberRole>{member.role}</MemberRole>
            </MemberInfo>
          </ProfileSection>
          <MemberStatus>{member.followers}</MemberStatus>
          <ChevronIcon src={rightChevron} alt="이동" />
        </MemberItem>
      ))}
    </Container>
  );
};

export default MemberList;
