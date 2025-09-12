import Router from './pages';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global/global';
import PopupContainer from './components/common/Modal/PopupContainer';

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Router />
      <PopupContainer />
    </>
  );
};

export default App;
