import { useNavigate } from 'react-router-dom';
import type { KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import rightChevron from '../../assets/member/right-chevron.svg';
import type { Member } from '@/api/rooms/getRoomMembers';
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

  const handleMemberClick = (member: Member) => {
    if (onMemberClick) {
      onMemberClick(member.id);
    } else {
      // isMyself가 true면 본인 프로필 페이지로, 아니면 다른 유저 페이지로 이동
      if (member.isMyself) {
        navigate(`/myfeed/${member.id}`);
      } else {
        navigate(`/otherfeed/${member.id}`);
      }
    }
  };

  return (
    <Container>
      {members.map(member => (
        <MemberItem
          key={member.id}
          role="button"
          tabIndex={0}
          onClick={() => handleMemberClick(member)}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleMemberClick(member);
            }
          }}
        >
          <ProfileSection>
            {member.profileImageUrl ? (
              <ProfileImageWithSrc src={member.profileImageUrl} alt={`${member.nickname} 프로필`} />
            ) : (
              <ProfileImage />
            )}
            <MemberInfo>
              <MemberName>{member.nickname}</MemberName>
              <MemberRole roleType={member.role}>{member.role}</MemberRole>
            </MemberInfo>
          </ProfileSection>
          <MemberStatus>
            {`${(member.followersCount ?? 0).toLocaleString()}명이 띱 하는 중`}
          </MemberStatus>
          <ChevronIcon src={rightChevron} alt="이동" />
        </MemberItem>
      ))}
    </Container>
  );
};

// 프로필 이미지가 있을 때 사용하는 스타일드 컴포넌트
const ProfileImageWithSrc = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-grey-400);
  border: 1px solid #888;
  flex-shrink: 0;
  object-fit: cover;
`;

export default MemberList;
