import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { lazy, Suspense } from 'react';
import GlobalLoader from './skeletons/GlobalLoader';


const Home = lazy(() => import('./pages/Home'));
const Favourite = lazy(() => import('./pages/Favourite'));
const CardDetails = lazy(() => import('./pages/CardDetails'));
const Event = lazy(() => import('./pages/Event'));
const SeeAll = lazy(() => import('./pages/SeeAll'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
   <Suspense fallback={<GlobalLoader/>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> 
          <Route path="favourites" element={<Favourite />} />
          <Route path="cart-detail/:id" element={<CardDetails />} />
          <Route path="events" element={<Event />} />
          <Route path="see-all" element={<SeeAll />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
