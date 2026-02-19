import styled from '@emotion/styled';

export const SkeletonContainer = styled.div<{ paddingTop?: number }>`
  padding-top: ${({ paddingTop }) => (paddingTop !== undefined ? `${paddingTop}px` : '56px')};
  background-color: var(--color-black-main);
  min-height: 100vh;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 20px 0;
`;

export const UserProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const UserText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FollowerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 40px;
`;

export const FollowerAvatars = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const TotalBarContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 4px;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 12px;
`;

export const PostFooter = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
`;
