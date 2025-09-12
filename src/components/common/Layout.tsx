import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './ScrollToTop';
import { sendPageView } from '@/lib/ga';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    sendPageView(location.pathname + location.search + location.hash);
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default Layout;
