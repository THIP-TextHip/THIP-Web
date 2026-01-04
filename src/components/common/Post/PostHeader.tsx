import { useNavigate } from 'react-router-dom';
import { Container } from './PostHeader.styled';
interface PostHeaderProps {
  creatorProfileImageUrl?: string;
  creatorNickname?: string;
  aliasName?: string;
  aliasColor?: string;
  postDate: string;
  creatorId?: number;
  type?: 'post' | 'reply';
  isWriter?: boolean;
}

const PostHeader = ({
  creatorProfileImageUrl,
  creatorNickname,
  aliasName,
  aliasColor,
  postDate,
  creatorId,
  type = 'post',
  isWriter,
}: PostHeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (creatorId) {
      // isWriter가 true면 MyFeedPage로, false면 OtherFeedPage로 이동
      if (isWriter) {
        navigate(`/myfeed/${creatorId}`);
      } else {
        navigate(`/otherfeed/${creatorId}`);
      }
    }
  };

  return (
    <Container type={type} onClick={handleClick}>
      <div className="headerInfo">
        <img src={creatorProfileImageUrl} alt="칭호 이미지" />
        <div className="infoBox">
          <div className="username">{creatorNickname}</div>
          <div className="usertitle" style={{ color: aliasColor }}>
            {aliasName}
          </div>
        </div>
      </div>
      <div className="timestamp">{postDate}</div>
    </Container>
  );
};

export default PostHeader;
