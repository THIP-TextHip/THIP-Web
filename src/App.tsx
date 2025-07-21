import Router from './pages';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global/global';
import ModalContainer from './components/common/Modal/ModalContainer';

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Router />
      <ModalContainer />
    </>
  );
};

export default App;
