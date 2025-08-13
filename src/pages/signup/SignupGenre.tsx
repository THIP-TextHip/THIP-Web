import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from './Signup.styled';
import leftarrow from '../../assets/common/leftArrow.svg';
import TitleHeader from '../../components/common/TitleHeader';
import { postSignup } from '@/api/users/postSignup';

const SignupGenre = () => {
  const [genres, setGenres] = useState<
    Array<{
      id: string;
      title: string;
      subTitle: string;
      iconUrl: string;
      color: string;
    }>
  >([]);
  const [selectedAlias, setSelectedAlias] = useState<{
    id: string;
    subTitle: string;
  } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // SignupNickname에서 넘어온 nickname 받기
  const nickname = location.state?.nickname;

  // 페이지 로드 시 간단한 확인
  useEffect(() => {
    console.log('=== 🔍 SignupGenre 페이지 로드 ===');
    console.log('📍 현재 페이지:', window.location.pathname);
    console.log('👤 받은 nickname:', nickname);

    // nickname이 없으면 이전 페이지로 돌아가기
    if (!nickname) {
      console.log('❌ nickname이 전달되지 않았습니다.');
      console.log('❌ 이전 페이지로 돌아갑니다.');
      navigate(-1);
      return;
    }

    console.log('✅ nickname이 정상적으로 전달되었습니다.');
    console.log('✅ 쿠키는 브라우저가 자동으로 처리합니다.');
  }, [nickname, navigate]);

  useEffect(() => {
    fetch('/genres.json')
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(console.error);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = async () => {
    if (!selectedAlias || !nickname) return;

    console.log('=== 🚀 다음 버튼 클릭 ===');
    console.log('🎭 선택된 alias:', selectedAlias);
    console.log('👤 nickname:', nickname);

    try {
      console.log('🚀 postSignup API 호출 시작...');
      // ✅ 쿠키는 브라우저가 자동으로 전송
      const result = await postSignup({
        aliasName: selectedAlias.subTitle,
        nickname: nickname,
      });

      if (result.success) {
        console.log('🎉 회원가입 성공! 사용자 ID:', result.data.userId);
        navigate('/signupdone', {
          state: {
            aliasName: selectedAlias.subTitle,
            nickname: nickname,
          },
        });
      } else {
        console.error('❌ 회원가입 실패:', result.message);
      }
    } catch (error) {
      console.error('💥 회원가입 중 오류 발생:', error);
    }
  };

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="설정 2/2"
        rightButton={<div className="next">다음</div>}
        onLeftClick={handleBackClick}
        onRightClick={handleNextClick}
        isNextActive={!!selectedAlias}
      />
      <Container>
        <div className="title">관심있는 장르를 선택해주세요.</div>
        <div className="subtitle">이후 마이페이지에서 변경이 가능해요.</div>
        <div className="notice">아래에서 하나를 선택해주세요.</div>
        <div className="genreGrid">
          {genres.map(g => (
            <div
              key={g.id}
              className={`genreCard ${g.id === selectedAlias?.id ? 'active' : ''}`}
              onClick={() => setSelectedAlias({ id: g.id, subTitle: g.subTitle })}
            >
              <img className="bg" src={g.iconUrl} alt={g.title} />
              <div className="textbox">
                <div className="genreTitle">{g.title}</div>
                <div className="genreSub" style={{ color: g.color }}>
                  {g.subTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default SignupGenre;
