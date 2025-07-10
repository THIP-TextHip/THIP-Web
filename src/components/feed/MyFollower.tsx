import styled from '@emotion/styled';
import people from '../../assets/feed/people.svg';
import rightArrow from '../../assets/feed/rightArrow.svg';

const Container = styled.div`
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

      .followerNum {
        color: var(--color-white);
        font-size: var(--font-size-xs);
        font-weight: var(--string-weight-semibold, 600);
        line-height: normal;
      }

      .disc {
        color: var(--color-grey-100);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        line-height: normal;
        letter-spacing: 0.012px;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    .profileImg {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      border: 0.5px solid var(--color-grey-300);
    }
  }
`;

const MyFollower = () => {
  const followers = [
    { id: '1', profileImageUrl: 'https://placehold.co/24x24' },
    { id: '2', profileImageUrl: 'https://placehold.co/24x24' },
    { id: '3', profileImageUrl: 'https://placehold.co/24x24' },
    { id: '4', profileImageUrl: 'https://placehold.co/24x24' },
    { id: '5', profileImageUrl: 'https://placehold.co/24x24' },
    { id: '6', profileImageUrl: 'https://placehold.co/24x24' },
  ];

  return (
    <Container>
      <div className="left">
        <img src={people} />
        <div className="textContainer">
          <div className="followerNum">{followers.length}명</div>
          <div className="disc">이 구독중</div>
        </div>
      </div>
      <div className="right">
        {followers.slice(0, 5).map(f => (
          <img className="profileImg" key={f.id} src={f.profileImageUrl} alt="구독자" />
        ))}
        <img src={rightArrow} />
      </div>
    </Container>
  );
};

export default MyFollower;
