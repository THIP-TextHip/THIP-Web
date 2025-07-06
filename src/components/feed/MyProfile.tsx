import styled from '@emotion/styled';
import people from '../../assets/feed/people.svg';
import rightArrow from '../../assets/feed/rightArrow.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  padding: 0 20px;
  margin: 0 auto;
  height: 200px;

  .userProfile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 32px;

    .userInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;

      img {
        width: 54px;
        height: 54px;
        border-radius: 54px;
        border: 0.5px solid #fefefe;
      }

      .user {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .username {
          color: var(--color-text-primary_white, #fefefe);
          font-size: var(--string-size-large01, 18px);
          font-weight: var(--string-weight-semibold, 600);
          line-height: 24px;
          letter-spacing: 0.018px;
        }

        .usertitle {
          color: var(--color-text-literature_mint, #a0f8e8);
          font-size: var(--string-size-medium01, 14px);
          font-weight: var(--string-weight-regular, 400);
          line-height: 20px;
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
  }

  .myFollower {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0 40px 0;

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2px;

      .textContainer {
        display: flex;
        flex-direction: row;
        gap: 2px;

        .followerNum {
          color: var(--color-text-primary_white, #fefefe);
          font-size: var(--string-size-small03, 12px);
          font-weight: var(--string-weight-semibold, 600);
          line-height: normal;
        }

        .disc {
          color: var(--color-text-secondary_grey00, #dadada);
          font-size: var(--string-size-small03, 12px);
          font-weight: var(--string-weight-medium, 500);
          line-height: normal;
          letter-spacing: 0.012px;
        }
      }
    }

    .right {
      img {
        width: 24px;
        height: 24px;
        border-radius: 24px;
        border: 0.5px solid #888;
      }
    }
  }

  .totalBar {
    display: flex;
    flex-direction: row;
    gap: 2px;
    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-medium, 500);
    line-height: var(--string-lineheight-height24, 24px);
    padding-bottom: 4px;
    border-bottom: 1px solid #282828;

    .total {
    }

    .count {
      text-align: right;
    }
  }
`;

const MyProfile = () => {
  return (
    <Container>
      <div className="userProfile">
        <div className="userInfo">
          <img src="https://placehold.co/54x54" />
          <div className="user">
            <div className="username">userName</div>
            <div className="usertitle">userTitle</div>
          </div>
        </div>
        {/* <div className="followbutton">구독</div> */}
      </div>
      <div className="myFollower">
        <div className="left">
          <img src={people} />
          <div className="textContainer">
            <div className="followerNum">22명</div>
            <div className="disc">이 구독중</div>
          </div>
        </div>
        <div className="right">
          <img />
          <img src={rightArrow} />
        </div>
      </div>
      <div className="totalBar">
        <div className="total">전체</div>
        <div className="count">4</div>
      </div>
    </Container>
  );
};

export default MyProfile;
