import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from './Signup.styled';
import leftarrow from '../../assets/common/leftArrow.svg';
import TitleHeader from '../../components/common/TitleHeader';
import { postSignup } from '@/api/users/postSignup';
import { apiClient } from '@/api/index';

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

  // 쿠키에서 Authorization 토큰 추출
  const getAuthTokenFromCookie = () => {
    console.log('=== 쿠키 디버깅 ===');
    console.log('현재 페이지 URL:', window.location.href);
    console.log('현재 도메인:', window.location.hostname);
    console.log('전체 쿠키:', document.cookie);

    const cookies = document.cookie.split(';');
    console.log('분리된 쿠키들:', cookies);

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      console.log('쿠키 이름:', name, '값:', value);
      if (name === 'Authorization') {
        console.log('Authorization 토큰 발견:', value);
        return value;
      }
    }

    console.log('Authorization 토큰을 찾을 수 없습니다.');
    console.log('가능한 원인: 도메인 불일치, 경로 불일치, 쿠키 만료');
    return null;
  };

  // 토큰을 헤더에 설정
  const setAuthTokenToHeader = (token: string) => {
    // localStorage에 저장 (페이지 새로고침 시에도 유지)
    localStorage.setItem('authToken', token);

    // apiClient 기본 헤더에 설정
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

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

    // 쿠키에서 토큰 추출
    const authToken = getAuthTokenFromCookie();
    if (!authToken) {
      console.log('쿠키에서 Authorization 토큰을 찾을 수 없습니다.');
      console.log('토큰이 없어 회원가입을 진행할 수 없습니다.');
      return; // 토큰이 없으면 함수 종료하여 페이지에 머무름
    }

    // 토큰을 헤더에 설정
    setAuthTokenToHeader(authToken);
    console.log('Authorization 토큰을 헤더에 설정했습니다.');

    try {
      const result = await postSignup({
        aliasName: selectedAlias.subTitle,
        nickName: nickname,
      });

      if (result.success) {
        console.log('회원가입 성공! 사용자 ID:', result.data.userId);
        // 회원가입 완료 페이지로 이동
        navigate('/signupdone', {
          state: {
            aliasName: selectedAlias.subTitle,
            nickName: nickname,
          },
        });
      } else {
        console.error('회원가입 실패:', result.message);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
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
