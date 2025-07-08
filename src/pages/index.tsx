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
import Group from './group/Group';
import MyGroup from './group/MyGroup';

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
        <Route path="group" element={<Group />}>
          <Route path="mygroup" element={<MyGroup />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
