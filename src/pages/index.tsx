import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from '../components/common/Layout';
import Login from './login/Login';
// import Signup from './signup/Signup';
import SignupGenre from './signup/SignupGenre';
import SignupNickname from './signup/SignupNickname';
import SignupDone from './signup/SignupDone';
import CreateGroup from './group/CreateGroup';
import CreatePost from './post/CreatePost';
import UpdatePost from './post/UpdatePost';
import Group from './group/Group';
import Feed from './feed/Feed';
import GroupSearch from './groupSearch/GroupSearch';
import Search from './search/Search';
import ApplyBook from './search/ApplyBook';
import OtherFeedPage from './feed/OtherFeedPage';
import MyFeedPage from './feed/MyFeedPage';
import FollowerListPage from './feed/FollowerListPage';
import TodayWords from './today-words/TodayWords';
import SearchBook from './searchBook/SearchBook';
import SearchBookGroup from './searchBook/SearchBookGroup';
import GroupDetail from './groupDetail/GroupDetail';
import FeedDetailPage from './feed/FeedDetailPage';
import UserSearch from './feed/UserSearch';
import Memory from './memory/Memory';
import RecordWrite from './recordwrite/RecordWrite';
import PollWrite from './pollwrite/PollWrite';
import Mypage from './mypage/Mypage';
import SavePage from './mypage/SavePage';
import AlertPage from './mypage/AlertPage';
import WithdrawPage from './mypage/WithdrawPage';
import WithdrawDonePage from './mypage/WithdrawDonePage';
import EditPage from './mypage/EditPage';
import Notice from './notice/Notice';
import ParticipatedGroupDetail from './groupDetail/ParticipatedGroupDetail';
import GroupMembers from './groupMembers/GroupMembers';
import Guide from './Guide';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<SignupNickname />} />
        <Route path="signup/genre" element={<SignupGenre />} />
        <Route path="signup/guide" element={<Guide />} />
        <Route path="signup/done" element={<SignupDone />} />
        <Route path="post/create" element={<CreatePost />} />
        <Route path="feed/write" element={<CreatePost />} />
        <Route path="group" element={<Group />} />
        <Route path="group/create" element={<CreateGroup />} />
        <Route path="post/update/:feedId" element={<UpdatePost />} />
        <Route path="group/search" element={<GroupSearch />} />
        <Route path="group/detail/:roomId" element={<GroupDetail />} />
        <Route path="group/detail/joined/:roomId" element={<ParticipatedGroupDetail />} />
        <Route path="group/:roomId/members" element={<GroupMembers />} />
        <Route path="memory" element={<Memory />} />
        <Route path="rooms/:roomId/memory" element={<Memory />} />
        <Route path="memory/record/write/:roomId" element={<RecordWrite />} />
        <Route path="memory/record/edit/:roomId/:recordId" element={<RecordWrite />} />
        <Route path="memory/poll/write/:roomId" element={<PollWrite />} />
        <Route path="memory/poll/edit/:roomId/:voteId" element={<PollWrite />} />
        <Route path="feed" element={<Feed />} />
        <Route path="feed/search" element={<UserSearch />} />
        <Route path="feed/:feedId" element={<FeedDetailPage />} />
        <Route path="search" element={<Search />} />
        <Route path="search/applybook" element={<ApplyBook />} />
        <Route path="search/book/:isbn" element={<SearchBook />} />
        <Route path="search/book/group" element={<SearchBookGroup />} />
        <Route path="otherfeed/:userId" element={<OtherFeedPage />} />
        <Route path="myfeed/:userId" element={<MyFeedPage />} />
        <Route path="follow/:type/:userId" element={<FollowerListPage />} />
        <Route path="follow/:type" element={<FollowerListPage />} />
        <Route path="today-words/:roomId" element={<TodayWords />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="mypage/save" element={<SavePage />} />
        <Route path="mypage/alert" element={<AlertPage />} />
        <Route path="mypage/withdraw" element={<WithdrawPage />} />
        <Route path="mypage/withdraw/done" element={<WithdrawDonePage />} />
        <Route path="mypage/edit" element={<EditPage />} />
        <Route path="notice" element={<Notice />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
