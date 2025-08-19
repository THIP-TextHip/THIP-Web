import Router from './pages';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global/global';
import PopupContainer from './components/common/Modal/PopupContainer';
import GlobalCommentBottomSheet from './components/common/CommentBottomSheet/GlobalCommentBottomSheet';

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Router />
      <PopupContainer />
      <GlobalCommentBottomSheet />
    </>
  );
};

export default App;
