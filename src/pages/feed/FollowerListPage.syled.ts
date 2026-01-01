import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  padding: 0 20px;
  margin: 0 auto;
  background-color: var(--color-black-main);
`;

export const TotalBar = styled.div`
  position: fixed;
  top: 0;
  width: 94.8%;
  max-width: 727px;
  min-width: 320px;
  padding: 76px 0px 4px 0px;
  border-bottom: 1px solid var(--color-darkgrey-dark);
  background-color: var(--color-black-main);

  color: var(--color-grey-100);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 24px;
`;

export const UserProfileList = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-black-main);
  padding-top: 105px;
  padding-bottom: 20px;
`;
