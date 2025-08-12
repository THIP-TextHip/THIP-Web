import Router from './pages';
import { Global } from '@emotion/react';
import { CookiesProvider } from 'react-cookie';
import { globalStyles } from './styles/global/global';
import PopupContainer from './components/common/Modal/PopupContainer';

const App = () => {
  return (
    <CookiesProvider>
      <Global styles={globalStyles} />
      <Router />
      <PopupContainer />
    </CookiesProvider>
  );
};

export default App;
