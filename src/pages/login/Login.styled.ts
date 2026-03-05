import styled from '@emotion/styled';

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 130px;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  color: var(--color-black-main);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 24px;
`;

export const SocialButton = styled.div<{ bg: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  gap: 8px;
  background-color: ${({ bg }) => bg};
  color: var(--color-black-main);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 24px;
  cursor: pointer;
`;
