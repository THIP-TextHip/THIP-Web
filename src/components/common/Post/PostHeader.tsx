import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface PostHeaderProps {
  profileImgUrl: string;
  userName: string;
  userTitle: string;
  titleColor: string;
  createdAt: string;
  userId: number;
  type?: 'post' | 'reply';
}

const PostHeader = ({
  profileImgUrl,
  userName,
  userTitle,
  titleColor,
  createdAt,
  userId,
  type = 'post',
}: PostHeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/otherfeed/${userId}`);
  };
  return (
    <Container type={type} onClick={handleClick}>
      <div className="headerInfo">
        <img src={profileImgUrl} alt="칭호 이미지" />
        <div className="infoBox">
          <div className="username">{userName}</div>
          <div className="usertitle" style={{ color: titleColor }}>
            {userTitle}
          </div>
        </div>
      </div>
      <div className="timestamp">{createdAt}</div>
    </Container>
  );
};

const Container = styled.div<{ type?: 'post' | 'reply' }>`
  width: 100%;
  height: ${({ type }) => (type === 'reply' ? '29px' : '36px')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .headerInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ type }) => (type === 'reply' ? '4px' : '8px')};
    img {
      width: ${({ type }) => (type === 'reply' ? '24px' : '36px')};
      height: ${({ type }) => (type === 'reply' ? '24px' : '36px')};
      border-radius: ${({ type }) => (type === 'reply' ? '24px' : '36px')};
      border: 0.5px solid var(--color-grey-300);
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 4px;
      .username {
        color: var(--color-white);
        font-size: ${({ type }) => (type === 'reply' ? '12px' : 'var(--font-size-sm)')};
        font-weight: var(--font-weight-medium);
        line-height: normal;
      }
      .usertitle {
        color: var(--color-character-pink);
        font-size: ${({ type }) => (type === 'reply' ? '11px' : 'var(--font-size-xs)')};
        font-weight: var(--font-weight-regular);
        line-height: normal;
      }
    }
  }

  .timestamp {
    color: var(--color-grey-200);
    font-size: 11px;
    font-weight: var(--font-weight-regular);
    line-height: normal;
  }
`;

export default PostHeader;
