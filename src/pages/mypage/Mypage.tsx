import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors, typography } from '@/styles/global/global';
import MenuButton from '@/components/Mypage/MenuButton';
import { usePopupActions } from '@/hooks/usePopupActions';
import alert from '../../assets/mypage/alert.svg';
import guide from '../../assets/mypage/guide.svg';
import save from '../../assets/mypage/save.svg';
import service from '../../assets/mypage/service.svg';
import ver from '../../assets/mypage/ver.svg';
import notice from '../../assets/mypage/notice.svg';
import terms from '../../assets/mypage/terms.svg';
import NavBar from '@/components/common/NavBar';

const mockProfile = {
  profileImgUrl: 'https://placehold.co/54x54',
  userName: '문학하는 고래',
  userTitle: '문학가',
  titleColor: '#a1d5ff',
};

const Mypage = () => {
  const { profileImgUrl, userName, userTitle, titleColor } = mockProfile;
  const { openConfirm, closePopup } = usePopupActions();
  const navigate = useNavigate();
  const onClickEdit = () => {};

  const handleLogout = () => {
    openConfirm({
      title: '로그아웃',
      disc: '또 THIP 해주실거죠?',
      onConfirm: () => {
        //실제 로그아웃 로직 구현
        console.log('로그아웃 실행');
        closePopup();
        //토큰 삭제, 메인 페이지로 이동
      },
      onClose: () => {
        console.log('로그아웃 취소');
        closePopup();
      },
    });
  };

  const handleNotice = () => {
    window.open('https://www.naver.com', '_blank');
  };

  const handleSave = () => {
    navigate('/mypage/save');
  };

  const handleAlert = () => {
    navigate('/mypage/alert');
  };

  const handleWithdraw = () => {
    navigate('/mypage/withdraw');
  };

  return (
    <Wrapper>
      <Header>마이페이지</Header>
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
          <div className="edit" onClick={onClickEdit}>
            편집
          </div>
        </UserProfile>
        <Section>
          <SectionTitle>내 활동</SectionTitle>
          <MenuGrid>
            <MenuButton src={save} name="저장" isButton onClick={handleSave} />
          </MenuGrid>
        </Section>
        <Section>
          <SectionTitle>메뉴</SectionTitle>
          <MenuGrid>
            <MenuButton src={alert} name="알림설정" isButton onClick={handleAlert} />
            <MenuButton src={service} name="고객센터" isButton />
            <MenuButton src={notice} name="공지사항" isButton />
            <MenuButton src={terms} name="이용약관" isButton onClick={handleNotice} />
            <MenuButton src={guide} name="가이드" isButton />
            <MenuButton src={ver} name="버젼 1.0" isButton={false} />
          </MenuGrid>
        </Section>
        <BottomMenu>
          <div className="logout" onClick={handleLogout}>
            로그아웃
          </div>
          <div className="withdraw" onClick={handleWithdraw}>
            회원탈퇴
          </div>
        </BottomMenu>
      </Container>
      <NavBar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #121212;
`;

const Header = styled.div`
  background-color: ${colors.black.main};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 767px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;

  color: ${colors.white};
  font-size: ${typography.fontSize['2xl']};
  font-style: normal;
  font-weight: ${typography.fontWeight.bold};
  line-height: 24px;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;

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

  .edit {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #888;

    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-medium, 500);
    line-height: normal;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 76px;
  gap: 40px;
`;

const Section = styled.div``;

const SectionTitle = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 12px;

  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 0 20px;

  @media (min-width: 612px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const BottomMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: auto;
  padding-bottom: 93px;

  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  cursor: pointer;
`;

export default Mypage;
