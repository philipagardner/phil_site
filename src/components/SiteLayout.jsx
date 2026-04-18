import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

function SiteLayout() {
  return (
    <div className="site-shell">
      <Header />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;