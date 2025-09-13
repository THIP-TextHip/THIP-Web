import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  position: relative;

  &:focus-visible {
    outline: 2px solid ${semanticColors.text.point.green};
    outline-offset: -2px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background-color: ${colors.darkgrey.dark};
  }

  &:last-child::after {
    display: none;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${colors.grey['400']};
  flex-shrink: 0;
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MemberName = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const MemberRole = styled.div<{ roleType?: string }>`
  color: ${({ roleType }) => {
    if (!roleType) return semanticColors.text.point.green;

    const role = roleType.toLowerCase();

    if (role.includes('예술') || role.includes('art')) {
      return semanticColors.text.character.pink;
    }
    if (role.includes('인문') || role.includes('humanities') || role.includes('철학')) {
      return semanticColors.text.character.mint;
    }
    if (role.includes('사회') || role.includes('sociology')) {
      return semanticColors.text.character.orange;
    }
    if (role.includes('인문') || role.includes('humanities')) {
      return semanticColors.text.character.skyblue;
    }
    if (role.includes('과학') || role.includes('science')) {
      return semanticColors.text.character.lavender;
    }

    return semanticColors.text.point.green;
  }};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

export const MemberStatus = styled.div`
  color: white;
  font-size: 11px;
  font-weight: ${typography.fontWeight.regular};
`;

export const ChevronIcon = styled.img`
  width: 24px;
  height: 24px;
`;
