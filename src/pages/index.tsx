import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/Signup';
import SignupGenre from './signup/SignupGenre';
import SignupNickname from './signup/SignupNickname';
import SignupDone from './signup/SignupDone';
import CreateGroup from './group/CreateGroup';
import Group from './group/Group';
import Feed from './feed/Feed';
import GroupSearch from './groupSearch/GroupSearch';
import Search from './search/Search';
import ApplyBook from './search/ApplyBook';
import OtherFeedPage from './feed/OtherFeedPage';
import FollowerListPage from './feed/FollowerListPage';
import TodayWords from './today-words/TodayWords';
import SearchBook from './searchBook/SearchBook';
import SearchBookGroup from './searchBook/SearchBookGroup';
import GroupDetail from './groupDetail/GroupDetail';
import FeedDetailPage from './feed/FeedDetailPage';
import ScrollToTop from '@/components/common/ScrollToTop';
import UserSearch from './feed/UserSearch';
import Mypage from './mypage/Mypage';
import SavePage from './mypage/SavePage';
import AlertPage from './mypage/AlertPage';
import WithdrawPage from './mypage/WithdrawPage';
import WithdrawDonePage from './mypage/WithdrawDonePage';
import EditPage from './mypage/EditPage';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />}>
          <Route index element={<SignupNickname />} />
          <Route path="genre" element={<SignupGenre />} />
        </Route>
        <Route path="signupdone" element={<SignupDone />} />
        <Route path="group" element={<Group />} />
        <Route path="group/create" element={<CreateGroup />} />
        <Route path="group/search" element={<GroupSearch />} />
        <Route path="group/detail" element={<GroupDetail />} />
        <Route path="feed" element={<Feed />} />
        <Route path="feed/search" element={<UserSearch />} />
        <Route path="feed/:feedId" element={<FeedDetailPage />} />
        <Route path="search" element={<Search />} />
        <Route path="search/applybook" element={<ApplyBook />} />
        <Route path="search/book" element={<SearchBook />} />
        <Route path="search/book/group" element={<SearchBookGroup />} />
        <Route path="otherfeed/:userId" element={<OtherFeedPage />} />
        <Route path="follow/:type" element={<FollowerListPage />} />
        <Route path="today-words" element={<TodayWords />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="mypage/save" element={<SavePage />} />
        <Route path="mypage/alert" element={<AlertPage />} />
        <Route path="mypage/withdraw" element={<WithdrawPage />} />
        <Route path="mypage/withdraw/done" element={<WithdrawDonePage />} />
        <Route path="mypage/edit" element={<EditPage />} />
      </>,
    ),
  );
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
