import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from './Signup.styled';
import leftarrow from '../../assets/common/leftArrow.svg';
import TitleHeader from '../../components/common/TitleHeader';
import { postSignup } from '@/api/users/postSignup';
import { useSocialLoginToken } from '@/hooks/useSocialLoginToken';

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

  useSocialLoginToken();

  const nickname = location.state?.nickname;

  useEffect(() => {
    if (!nickname) {
      navigate(-1);
      return;
    }
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

    try {
      const result = await postSignup({
        aliasName: selectedAlias.subTitle,
        nickname: nickname,
        isTokenRequired: false,
      });

      if (result.isSuccess) {
        if (result.data.accessToken) {
          localStorage.setItem('authToken', result.data.accessToken);
          localStorage.removeItem('preAuthToken');
        }

        navigate('/signup/guide', {
          state: {
            nickname: nickname,
            aliasName: selectedAlias.subTitle,
            aliasColor: genres.find(g => g.subTitle === selectedAlias.subTitle)?.color,
            aliasIconUrl: genres.find(g => g.subTitle === selectedAlias.subTitle)?.iconUrl,
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
