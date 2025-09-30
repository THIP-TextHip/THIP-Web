import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './ScrollToTop';
import { sendPageView } from '@/lib/ga';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // 라우트별 페이지 타이틀 설정 (첫 세그먼트 기준으로 그룹핑)
    const path = location.pathname;
    const titleRules: Array<[RegExp, string]> = [
      [/^\/$/, 'THIP - 로그인'],
      [/^\/feed(\/|$)/, 'THIP - 피드'],
      [/^\/notice(\/|$)/, 'THIP - 알림'],
      [/^\/group(\/|$)/, 'THIP - 모임 상세 페이지'],
      [/^\/rooms\/[^/]+\/memory(\/|$)/, 'THIP - 기록장'],
      [/^\/mypage(\/|$)/, 'THIP - 마이페이지'],
      [/^\/search(\/|$)/, 'THIP - 책 검색'],
      [/^\/signup(\/|$)/, 'THIP - 회원가입'],
      [/^\/post(\/|$)/, 'THIP - 글 작성 및 수정'],
      [/^\/otherfeed(\/|$)/, 'THIP - 다른 유저 피드'],
      [/^\/myfeed(\/|$)/, 'THIP - 내 피드'],
      [/^\/follow(\/|$)/, 'THIP - 팔로워 및 팔로잉 조회'],
      [/^\/today-words(\/|$)/, 'THIP - 오늘의 한마디'],
    ];

    const matched = titleRules.find(([regex]) => regex.test(path));
    if (matched) {
      document.title = matched[1];
    } else {
      document.title = 'THIP';
    }

    sendPageView(path + location.search + location.hash);
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default Layout;
