import { useNavigate } from 'react-router-dom';
import MenuButton from '@/components/Mypage/MenuButton';
import { usePopupActions } from '@/hooks/usePopupActions';
import { useLogout } from '@/hooks/useLogout';
import alert from '../../assets/mypage/alert.svg';
import guide from '../../assets/mypage/guide.svg';
import save from '../../assets/mypage/save.svg';
import service from '../../assets/mypage/service.svg';
import ver from '../../assets/mypage/ver.svg';
import notice from '../../assets/mypage/notice.svg';
import terms from '../../assets/mypage/terms.svg';
import NavBar from '@/components/common/NavBar';
import { getMyProfile, type GetMyProfileResponse } from '@/api/users/getMyProfile';
import { useEffect, useState } from 'react';
import Skeleton from '@/shared/ui/Skeleton';
import {
  Wrapper,
  Header,
  UserProfile,
  Container,
  Section,
  SectionTitle,
  MenuGrid,
  BottomMenu,
  ProfileSkeletonContainer,
  ProfileSkeletonLeft,
  ProfileSkeletonText,
} from './Mypage.styled';

const Mypage = () => {
  const [profile, setProfile] = useState<GetMyProfileResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const { openConfirm, closePopup } = usePopupActions();
  const navigate = useNavigate();
  const { handleLogout: logout } = useLogout();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [profile] = await Promise.all([getMyProfile(), minLoadingTime]);
        setProfile(profile);
      } catch (error) {
        console.error('프로필 정보 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    if (!profile) return;
    navigate('/mypage/edit', { state: { profile } });
  };

  const handleLogout = () => {
    openConfirm({
      title: '로그아웃',
      disc: '또 THIP 해주실거죠?',
      onConfirm: () => {
        closePopup();
        logout();
      },
      onClose: () => {
        closePopup();
      },
    });
  };

  const handleNotice = () => {
    window.open('https://slashpage.com/thip/7vgjr4m1nynpy2dwpy86', '_blank');
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

  const handleGuide = () => {
    window.open('https://slashpage.com/thip/ywk9j72989p6rmgpqvnd', '_blank');
  };

  const handleService = () => {
    window.open('https://slashpage.com/thip/dk58wg2e6yy3zmnqevxz', '_blank');
  };

  const handleTerms = () => {
    window.open('https://slashpage.com/thip/7916x82r8y74n24kpyg3', '_blank');
  };

  const handleVersion = () => {
    window.open('https://slashpage.com/thip/1q3vdn2p9w93pmxy49pr', '_blank');
  };

  return (
    <Wrapper>
      <Header>내 정보</Header>
      <Container>
        {loading || !profile ? (
          <ProfileSkeletonContainer>
            <ProfileSkeletonLeft>
              <Skeleton.Circle width={54} />
              <ProfileSkeletonText>
                <Skeleton.Text width={80} height={18} />
                <Skeleton.Text width={60} height={14} />
              </ProfileSkeletonText>
            </ProfileSkeletonLeft>
            <Skeleton.Box width={52} height={34} borderRadius={20} />
          </ProfileSkeletonContainer>
        ) : (
          <UserProfile>
            <div className="userInfo">
              <img src={profile.profileImageUrl} />
              <div className="user">
                <div className="username">{profile.nickname}</div>
                <div className="usertitle" style={{ color: profile.aliasColor }}>
                  {profile.aliasName}
                </div>
              </div>
            </div>
            <div className="edit" onClick={handleEditClick}>
              편집
            </div>
          </UserProfile>
        )}
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
            <MenuButton src={service} name="고객센터" isButton onClick={handleService} />
            <MenuButton src={notice} name="공지사항" isButton onClick={handleNotice} />
            <MenuButton
              src={terms}
              name="개인정보처리방침 & 이용약관"
              isButton
              onClick={handleTerms}
            />
            <MenuButton src={guide} name="가이드" isButton onClick={handleGuide} />
            <MenuButton src={ver} name="버젼 1.3.0" isButton onClick={handleVersion} />
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

export default Mypage;
