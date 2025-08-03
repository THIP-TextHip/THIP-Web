import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';
import type { Record } from '../../../pages/memory/Memory';

interface RecordItemWithProgressProps {
  record: Record & { isUploading?: boolean };
  onUploadComplete: (recordId: string) => void;
}

const RecordItemWithProgress = ({ record, onUploadComplete }: RecordItemWithProgressProps) => {
  const [progress, setProgress] = useState(0);
  const {
    id,
    user,
    userPoints,
    content,
    likeCount,
    commentCount,
    timeAgo,
    type,
    pollOptions,
    pageRange,
    recordType,
    isUploading = false,
  } = record;

  // 업로드 프로그레스 시뮬레이션
  useEffect(() => {
    if (!isUploading) return;

    const duration = 3000; // 3초
    const interval = 50; // 50ms마다 업데이트
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + increment, 100);
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onUploadComplete(id);
          }, 500); // 0.5초 후 완료
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isUploading, onUploadComplete, id]);

  // 페이지 정보 표시 함수
  const renderPageInfo = () => {
    if (recordType === 'overall') {
      return '총평';
    } else if (pageRange) {
      return `${pageRange}p`;
    }
    return '0p'; // 기본값
  };

  // 투표 옵션 렌더링
  const renderPollOptions = () => {
    if (type !== 'poll' || !pollOptions) return null;

    return (
      <PollContainer>
        {pollOptions.map(option => (
          <PollOption key={option.id} isHighest={option.isHighest}>
            <PollText>
              {option.id} {option.text}
            </PollText>
            <PollPercentage>{option.percentage}%</PollPercentage>
          </PollOption>
        ))}
      </PollContainer>
    );
  };

  return (
    <Container>
      <UserSection>
        <UserAvatar />
        <UserInfo>
          <UserName>{user}</UserName>
          <UserPoints>{userPoints}p</UserPoints>
        </UserInfo>
        <TimeStamp>{timeAgo}</TimeStamp>
      </UserSection>

      <ContentSection>
        <TextContent>{content}</TextContent>
        {renderPollOptions()}
      </ContentSection>

      {/* 업로드 중일 때만 프로그레스 바 표시 */}
      {isUploading && (
        <ProgressSection>
          <ProgressText>기록을 게시 중입니다...</ProgressText>
          <ProgressBarContainer>
            <ProgressBarFill progress={progress} />
          </ProgressBarContainer>
        </ProgressSection>
      )}

      <ActionSection>
        <ActionButton>
          <ActionIcon>♡</ActionIcon>
          <ActionCount>{likeCount}</ActionCount>
        </ActionButton>
        <ActionButton>
          <ActionIcon>💬</ActionIcon>
          <ActionCount>{commentCount}</ActionCount>
        </ActionButton>
        <ActionButton>
          <ActionIcon>📌</ActionIcon>
        </ActionButton>
      </ActionSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid ${colors.darkgrey.dark};
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #c4c4c4 100%);
  border: 1px solid ${colors.grey[300]};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const UserName = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
`;

const UserPoints = styled.div`
  color: ${semanticColors.text.point.purple};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

const TimeStamp = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TextContent = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
`;

const PollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PollOption = styled.div<{ isHighest?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ isHighest }) =>
    isHighest ? semanticColors.button.fill.primary : colors.grey[400]};
`;

const PollText = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

const PollPercentage = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressText = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${colors.grey[300]};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${semanticColors.text.point.green};
  border-radius: 3px;
  transition: width 0.1s ease-out;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ActionIcon = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.base};
`;

const ActionCount = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export default RecordItemWithProgress;
