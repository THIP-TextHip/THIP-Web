import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Card = styled.div<{ cardType: 'main' | 'search' | 'modal'; isFirstCard?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ cardType }) =>
    cardType === 'search' ? colors.black.main : colors.darkgrey.main};
  border-top: ${({ cardType, isFirstCard }) =>
    cardType === 'search' && isFirstCard
      ? 'none'
      : cardType === 'search'
        ? `1px solid ${colors.darkgrey.dark}`
        : 'none'};
  border: ${({ cardType }) => (cardType === 'main' ? `1px solid ${colors.grey[300]}` : '')};
  border-radius: ${({ cardType }) => (cardType === 'search' ? `none` : '12px')};
  box-sizing: border-box;
  padding: ${({ cardType }) => (cardType === 'search' ? '24px 12px' : '12px')};
  gap: 12px;
  min-width: 232px;
  cursor: pointer;
`;

export const CoverWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Cover = styled.img<{ cardType: 'main' | 'search' | 'modal'; isRecommend?: boolean }>`
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
  width: ${({ cardType, isRecommend }) => (cardType === 'search' || isRecommend ? '60px' : '80px')};
  height: ${({ cardType, isRecommend }) =>
    cardType === 'search' || isRecommend ? '80px' : '107px'};
  display: block;
`;

export const LockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.3);
  img {
    object-fit: cover;
    opacity: 0.75;
    z-index: 2;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3<{ isRecommend: boolean }>`
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
  width: 100%;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const Participant = styled.div<{ isRecommend: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.white};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  img {
    width: 16px;
    height: 16px;
  }
`;

export const MaximumParticipants = styled.div`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.xs};
`;

export const RecruitingDeadline = styled.div<{ isRecommend: boolean }>`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
`;

export const OngoingDeadline = styled.div<{ isRecommend: boolean }>`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.red};
`;
