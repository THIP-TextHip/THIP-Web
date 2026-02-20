import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #121212;
`;

export const Header = styled.div`
  background-color: ${colors.black.main};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 767px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;

  color: ${colors.white};
  font-size: ${typography.fontSize['2xl']};
  font-style: normal;
  font-weight: ${typography.fontWeight.bold};
  line-height: 24px;
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    img {
      width: 54px;
      height: 54px;
      border-radius: 54px;
      border: 0.5px solid var(--color-white);
    }

    .user {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .username {
        color: var(--color-text-primary_white, #fefefe);
        font-size: var(--string-size-large01, 18px);
        font-weight: var(--string-weight-semibold, 600);
        line-height: var(--string-lineheight-height24, 24px); /* 133.333% */
        letter-spacing: 0.018px;
      }

      .usertitle {
        font-size: var(--string-size-medium01, 14px);
        font-weight: var(--string-weight-regular, 400);
        line-height: var(--string-lineheight-feedcontent_height20, 20px); /* 142.857% */
      }
    }
  }

  .edit {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #888;

    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-medium, 500);
    line-height: normal;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-top: 76px;
  gap: 40px;
`;

export const Section = styled.div``;

export const SectionTitle = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 12px;

  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 0 20px;

  @media (min-width: 612px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export const BottomMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: auto;
  padding-bottom: 93px;

  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  cursor: pointer;
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
`;

export const ProfileSkeletonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

export const ProfileSkeletonLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ProfileSkeletonText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MenuItemSkeleton = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 12px;
`;
