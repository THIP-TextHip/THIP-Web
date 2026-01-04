import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Card = styled.div`
  flex: 0 0 80%;
  scroll-snap-align: center;
  background: linear-gradient(to right, #fff 0%, #989898 100%);
  border-radius: 12px;
  display: flex;
  padding: 34px 12px;
  box-sizing: border-box;
  transition: transform 0.35s ease-out;
  will-change: transform;
  transform: translateZ(0);
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 107px;
  border-radius: 8px;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin: 6px 0;
  min-width: 0;
`;

export const CardTitle = styled.h2`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: #000;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Participants = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[300]};
  margin: 8px 0;
  > span {
    line-height: 20px;
  }
`;

export const ProgressText = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.grey[300]};
  margin: 12px 0;
`;

export const Percent = styled.span`
  font-size: ${typography.fontSize.base};
  color: ${colors.purple.main};
  font-weight: ${typography.fontWeight.semibold};
`;

export const DeadlineText = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.grey[300]};
  margin: 12px 0;
`;

export const DeadlineValue = styled.span`
  font-size: ${typography.fontSize.base};
  color: ${colors.purple.main};
  font-weight: ${typography.fontWeight.semibold};
  margin-left: 4px;
`;

export const Bar = styled.div`
  width: 100%;
  height: 6px;
  background: ${colors.grey[300]};
  border-radius: 4px;
  margin-top: 4px;
`;

export const Fill = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${colors.purple.main};
  border-radius: 4px;
`;
