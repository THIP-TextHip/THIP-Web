import { useNavigate } from 'react-router-dom';
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
    cursor: pointer;

    .profileImg {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      border: 0.5px solid var(--color-grey-300);
    }
  }
`;

interface MyFollowerProps {
  userId?: number;
  followerCount: number;
  latestFollowerProfileImageUrls?: string[];
}

const MyFollower = ({
  userId,
  followerCount = 0,
  latestFollowerProfileImageUrls = [],
}: MyFollowerProps) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    if (userId) {
      navigate(`/follow/followerlist/${userId}`);
    }
  };

  return (
    <Container>
      <div className="left">
        <img src={people} />
        <div className="textContainer">
          <div className="followerNum">{followerCount}명</div>
          <div className="disc">이 구독중</div>
        </div>
      </div>
      {followerCount > 0 && (
        <div className="right" onClick={handleMoreClick}>
          {latestFollowerProfileImageUrls.slice(0, 5).map((imageUrl, index) => (
            <img className="profileImg" key={index} src={imageUrl} alt="나를 띱한 유저들" />
          ))}
          <img src={rightArrow} />
        </div>
      )}
    </Container>
  );
};

export default MyFollower;
