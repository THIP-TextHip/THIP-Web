import styled from '@emotion/styled';
import MyFollower from './MyFollower';

const mockProfile = {
  profileImgUrl: 'https://placehold.co/54x54',
  userName: '문학하는 고래',
  userTitle: '문학가',
  titleColor: '#a1d5ff',
};

const MyProfile = () => {
  const { profileImgUrl, userName, userTitle, titleColor } = mockProfile;

  return (
    <Container>
      <UserProfile>
        <div className="userInfo">
          <img src={profileImgUrl} />
          <div className="user">
            <div className="username">{userName}</div>
            <div className="usertitle" style={{ color: titleColor }}>
              {userTitle}
            </div>
          </div>
        </div>
        {/* <div className="followbutton">구독</div> */}
      </UserProfile>
      <MyFollower />
      <TotalBar>
        <div className="total">전체</div>
        <div className="count">4</div>
        {/* 피드 글 개수에 맞춰서 count 세야할듯 */}
      </TotalBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  height: 200px;
  padding: 0 20px;
  padding-top: 32px;
  margin: 0 auto;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

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
        color: var(--color-white);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        line-height: normal;
      }

      .usertitle {
        color: var(--color-text-humanities_skyblue, #a1d5ff);
        font-size: var(--font-size-xs);
        font-weight: var(--string-weight-regular, 400);
        line-height: normal;
      }
    }
  }

  .followbutton {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #888;

    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-medium, 500);
    line-height: normal;
  }
`;

const TotalBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4px;
  border-bottom: 1px solid #282828;
  gap: 2px;
  color: var(--color-grey-100);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 24px;

  .total {
  }

  .count {
    text-align: right;
  }
`;

export default MyProfile;
