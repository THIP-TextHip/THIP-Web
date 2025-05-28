import Router from './pages';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global/global';

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Router />
    </>
  );
};

export default App;
