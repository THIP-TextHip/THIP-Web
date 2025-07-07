import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .headerInfo {
    display: flex;
    flex-direction: row;
    gap: 8px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 36px;
      border: 0.5px solid var(--color-grey-300);
    }

    .infoBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 4px;
      .username {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-weight: 500;
        line-height: normal;
      }
      .usertitle {
        color: var(--color-character-pink);
        font-size: var(--font-size-xs);
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

interface PostHeaderProps {
  profileImgUrl: string;
  userName: string;
  userTitle: string;
  titleColor: string;
  createdAt: string;
}

const PostHeader = ({
  profileImgUrl,
  userName,
  userTitle,
  titleColor,
  createdAt,
}: PostHeaderProps) => {
  return (
    <Container>
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

export default PostHeader;
