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
import OtherFeedPage from './feed/OtherFeedPage';
import FollowerListPage from './feed/FollowerListPage';
import GroupSearch from './groupSearch/GroupSearch';
import TodayWords from './today-words/TodayWords';
import FeedDetailPage from './feed/FeedDetailPage';

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
        <Route path="group/create" element={<CreateGroup />} />
        <Route path="group" element={<Group />} />
        <Route path="groupsearch" element={<GroupSearch />} />
        <Route path="feed" element={<Feed />} />
        <Route path="feed/:feedId" element={<FeedDetailPage />} />
        <Route path="otherfeed/:userId" element={<OtherFeedPage />} />
        <Route path="follow/:type" element={<FollowerListPage />} />
        <Route path="today-words" element={<TodayWords />} />
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
