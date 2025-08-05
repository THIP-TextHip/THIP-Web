import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
interface PostHeaderProps {
  creatorProfileImageUrl?: string;
  creatorNickname?: string;
  alias?: string;
  aliasColor?: string;
  postDate: string;
  creatorId?: number;
  type?: 'post' | 'reply';
}

const PostHeader = ({
  creatorProfileImageUrl,
  creatorNickname,
  alias,
  aliasColor = '#FFFFFF', // 기본값 설정
  postDate,
  creatorId,
  type = 'post',
}: PostHeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (creatorId) {
      navigate(`/otherfeed/${creatorId}`);
    }
  };

  return (
    <Container type={type} onClick={handleClick}>
      <div className="headerInfo">
        <img src={creatorProfileImageUrl} alt="칭호 이미지" />
        <div className="infoBox">
          <div className="username">{creatorNickname}</div>
          <div className="usertitle" style={{ color: aliasColor }}>
            {alias}
          </div>
        </div>
      </div>
      <div className="timestamp">{postDate}</div>
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
