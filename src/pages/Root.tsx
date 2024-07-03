import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './root.scss'

import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className="root">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
