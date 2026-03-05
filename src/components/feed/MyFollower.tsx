import { useNavigate } from 'react-router-dom';
import people from '../../assets/feed/people.svg';
import rightArrow from '../../assets/feed/rightArrow.svg';
import { Container } from './MyFollower.styled';

interface MyFollowerProps {
  followerCount: number;
  latestFollowerProfileImageUrls?: string[];
  userId?: number;
}

const MyFollower = ({
  followerCount = 0,
  latestFollowerProfileImageUrls = [],
  userId,
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
          <div className="disc">이 띱하는 중</div>
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
