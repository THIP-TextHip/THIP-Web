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
  const getAuthTokenFromCookie = async () => {
    console.log('=== 쿠키 디버깅 ===');
    console.log('현재 페이지 URL:', window.location.href);
    console.log('현재 도메인:', window.location.hostname);
    console.log('전체 쿠키:', document.cookie);

    // 방법 1: document.cookie 사용
    if (document.cookie) {
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
    }

    // 방법 2: 직접 쿠키 이름으로 검색
    const authCookie = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith('Authorization='));

    if (authCookie) {
      const token = authCookie.split('=')[1];
      console.log('직접 검색으로 Authorization 토큰 발견:', token);
      return token;
    }

    // 방법 3: 정규식으로 검색
    const cookieMatch = document.cookie.match(/Authorization=([^;]+)/);
    if (cookieMatch && cookieMatch[1]) {
      console.log('정규식으로 Authorization 토큰 발견:', cookieMatch[1]);
      return cookieMatch[1];
    }

    // 방법 4: 모든 쿠키를 순회하며 검색
    const allCookies = document.cookie.split(';');
    for (let i = 0; i < allCookies.length; i++) {
      const cookie = allCookies[i].trim();
      if (cookie.startsWith('Authorization=')) {
        const token = cookie.substring('Authorization='.length);
        console.log('순회 검색으로 Authorization 토큰 발견:', token);
        return token;
      }
    }

    // 방법 5: 쿠키가 비어있는지 확인
    if (!document.cookie || document.cookie.trim() === '') {
      console.log('document.cookie가 비어있습니다.');
    }

    // 방법 6: 쿠키 길이 확인
    console.log('쿠키 총 길이:', document.cookie.length);
    console.log('쿠키 원본 문자열:', JSON.stringify(document.cookie));

    // 방법 7: 서버에서 쿠키 정보 가져오기 (HttpOnly 쿠키일 경우)
    try {
      console.log('서버에서 쿠키 정보를 가져오는 중...');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include', // 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('서버 응답:', data);
        // 서버에서 토큰을 헤더로 보내주거나, 사용자 정보를 통해 인증 상태 확인
        if (data.data && data.data.userId) {
          console.log('서버에서 사용자 정보 확인됨, 인증 상태 유효');
          return 'VALID_AUTH'; // 특별한 값으로 인증 상태 표시
        }
      }
    } catch (error) {
      console.log('서버 쿠키 확인 실패:', error);
    }

    console.log('Authorization 토큰을 찾을 수 없습니다.');
    console.log('가능한 원인: 도메인 불일치, 경로 불일치, 쿠키 만료, HttpOnly 설정');
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
    const authToken = await getAuthTokenFromCookie();
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
