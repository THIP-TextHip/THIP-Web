import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

interface UploadItem {
  id: string;
  user: string;
  userPoints: number;
  content: string;
  timeAgo: string;
  type: 'text' | 'poll';
  recordType?: 'page' | 'overall';
  pageRange?: string;
  pollOptions?: Array<{
    id: string;
    text: string;
    percentage: number;
    isHighest?: boolean;
  }>;
  progress: number; // 0-100
}

interface RecordUploadProgressProps {
  uploadItems: UploadItem[];
  onUploadComplete: (itemId: string) => void;
}

const RecordUploadProgress = ({ uploadItems, onUploadComplete }: RecordUploadProgressProps) => {
  const [items, setItems] = useState<UploadItem[]>(uploadItems);

  useEffect(() => {
    setItems(uploadItems);
  }, [uploadItems]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    items.forEach(item => {
      if (item.progress < 100) {
        const timer = setInterval(() => {
          setItems(prevItems =>
            prevItems.map(prevItem => {
              if (prevItem.id === item.id && prevItem.progress < 100) {
                const newProgress = Math.min(prevItem.progress + 2, 100);
                if (newProgress === 100) {
                  setTimeout(() => onUploadComplete(item.id), 500);
                }
                return { ...prevItem, progress: newProgress };
              }
              return prevItem;
            }),
          );
        }, 60); // 60ms마다 2%씩 증가 (약 3초)
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [items, onUploadComplete]);

  const renderPollOptions = (options: UploadItem['pollOptions']) => {
    if (!options) return null;

    return (
      <PollContainer>
        {options.map((option, index) => (
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
      {items.map(item => (
        <RecordItem key={item.id}>
          <UserProfile>
            <ProfileImage />
            <UserInfo>
              <UserName>{item.user}</UserName>
              <UserPoints>{item.userPoints}p</UserPoints>
            </UserInfo>
            <TimeStamp>{item.timeAgo}</TimeStamp>
          </UserProfile>

          <RecordContent>
            {item.type === 'text' ? (
              <TextContent>{item.content}</TextContent>
            ) : (
              <>
                <TextContent>{item.content}</TextContent>
                {renderPollOptions(item.pollOptions)}
              </>
            )}
          </RecordContent>

          <ProgressSection>
            <ProgressText>기록을 게시 중입니다...</ProgressText>
            <ProgressBarContainer>
              <ProgressBarFill progress={item.progress} />
            </ProgressBarContainer>
          </ProgressSection>

          <ActionBar>
            <ActionButton>
              <ActionIcon>♡</ActionIcon>
              <ActionCount>123</ActionCount>
            </ActionButton>
            <ActionButton>
              <ActionIcon>💬</ActionIcon>
              <ActionCount>123</ActionCount>
            </ActionButton>
            <ActionButton>
              <ActionIcon>📌</ActionIcon>
            </ActionButton>
          </ActionBar>
        </RecordItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding: 0 20px;
`;

const RecordItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${semanticColors.background.primary};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.div`
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

const RecordContent = styled.div`
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

const ActionBar = styled.div`
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

export default RecordUploadProgress;
