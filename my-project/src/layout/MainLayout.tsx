import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const MainLayout = () => {
  return (
    <>
      <div className="posish">
        <SideBar />
        <div className="wrapper-content">
          <Header />

          <main className="container">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
