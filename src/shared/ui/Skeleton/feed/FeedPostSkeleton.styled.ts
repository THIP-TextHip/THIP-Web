import styled from '@emotion/styled';
import Skeleton from '../base/Skeleton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 16px;
  background-color: var(--color-black-main);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ImageSkeleton = styled(Skeleton.Box)`
  margin-top: 8px;
`;

export const Footer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;
