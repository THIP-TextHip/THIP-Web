import Router from './pages';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global/global';
import PopupContainer from './components/common/Modal/PopupContainer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from './lib/ga';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    sendPageView(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <Global styles={globalStyles} />
      <Router />
      <PopupContainer />
    </>
  );
};

export default App;
