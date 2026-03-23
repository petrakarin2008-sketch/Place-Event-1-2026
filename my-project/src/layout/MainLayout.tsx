import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Fetch, FetchEvents } from '../redux/feature/comEventApiSlice';
import { useAppDispatch, type RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const errorCom = useSelector((state: RootState) => state.eventsApi.errorCom);
  const errorAllEv = useSelector((state: RootState) => state.eventsApi.errorAllEv);
  const [retryCount, setRetryCount] = useState(0);
  const { pathname } = useLocation();
  const scroll = pathname === '/see-all' || pathname === '/events';
  const ComSonStart = `${dayjs().format('YYYY-MM-DD')}T00:00:00Z`;
  const ComSonEnd = `${dayjs().add(10, 'day').format('YYYY-MM-DD')}T00:00:00Z`;

  useEffect(() => {
    dispatch(FetchEvents({ start: ComSonStart, end: ComSonEnd, page: 0 }));
    dispatch(Fetch({ classificationName: 'Music' }));
    
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let All: ReturnType<typeof setTimeout> | undefined;
    if (retryCount < 3) {
      if (errorCom) {
        timer = setTimeout(() => {
          console.log('Повторная попытка запроса...', retryCount);
          setRetryCount((prev) => prev + 1);
          dispatch(FetchEvents({ start: ComSonStart, end: ComSonEnd, page: 0 }));
        }, 5000);
      }

      if (errorAllEv) {
        All = setTimeout(() => {
          console.log('Повторная попытка запроса...', retryCount);
          setRetryCount((prev) => prev + 1);
          dispatch(Fetch({ classificationName: 'Music' }));
        }, 5000);
      }
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(All);
    };
  }, [errorCom, errorAllEv,ComSonEnd]);

  useEffect(() => {
    const scrollableElement = document.querySelector('.container');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname]);

  return (
    <>
      <div className="posish">
        <SideBar />
        <div className="wrapper-content">
          <Header />

          <main className="container" style={scroll ? { padding: '0' } : {}}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
