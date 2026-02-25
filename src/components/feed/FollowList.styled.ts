import styled from '@emotion/styled';
import { typography } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 20px;
  background-color: var(--color-black-main);

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    color: var(--color-white);
    font-size: ${typography.fontSize['2xs']};
    font-weight: var(--font-weight-medium);
    line-height: 20px;

    img {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  }

  .titleSkeletonIcon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .titleSkeletonText {
    display: flex;
    align-items: center;
    height: 20px;
  }
`;

export const FollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 58px;

  img {
    cursor: pointer;
  }

  .followerList {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 12px;

    /* ✅ 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */
    .followerList::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }

    .followers {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;

      .username {
        width: 36px;
        overflow: hidden;
        color: #fff;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
        font-size: ${typography.fontSize['2xs']};
        font-weight: var(--string-weight-regular, 400);
        line-height: 20px;
      }

      img {
        display: flex;
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        border-radius: 36px;
        border: 0.5px solid #888;
      }
    }

    .skeletonItem {
      cursor: default;
    }
  }

  .arrowSkeleton {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

export const FollowListLoading = styled.div`
  display: flex;
  align-items: center;
  min-height: 58px;

  .placeholderList {
    display: flex;
    gap: 12px;
  }

  .placeholderItem {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--color-darkgrey-dark);
  }
`;

export const EmptyFollowerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 12px;
  margin: 12px 0;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: var(--color-darkgrey-dark);

  color: var(--color-grey-100);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: 20px;
  cursor: pointer;
`;
