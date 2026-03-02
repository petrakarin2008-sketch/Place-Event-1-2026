
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import CardDetails from './pages/CardDetails';
import Event from './pages/Event';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/cart-detail" element={<CardDetails />} />
          <Route path="/events" element={<Event />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
