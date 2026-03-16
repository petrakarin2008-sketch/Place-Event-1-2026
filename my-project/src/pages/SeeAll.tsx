import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import EventCard from '../components/EventCard';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../redux/store';
import CartLoader from '../components/CartLoader';
import dayjs from 'dayjs';
import { FetchEvents } from '../redux/feature/comEventApiSlice';

const SeeAll = () => {
  const { comingEvents, isLoading } = useSelector((state: RootState) => state.eventsApi);
  const dispatch = useAppDispatch();
  const ComSonStart = `${dayjs().format('YYYY-MM-DD')}T00:00:00Z`;
  const ComSonEnd = `${dayjs().add(10, 'day').format('YYYY-MM-DD')}T00:00:00Z`;

  const handlePageChange = (selectedPage: number) => {
    dispatch(
      FetchEvents({
        start: ComSonStart,
        end: ComSonEnd,
        page: selectedPage - 1, 
      }),
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const events = comingEvents?._embedded?.events || [];

  if (events.length === 0) return <p>No events found.</p>;
  const page = comingEvents?.page?.number || 0;
  const size = comingEvents?.page?.size || 20;
  const tottal = Math.min(comingEvents?.page?.totalElements || 0, 1000);

  return (
    <div className="container">
      <div className="seeAll-cart">
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, i) => <CartLoader key={i} />)
        ) : events.length > 0 ? (
          events.map((el) => <EventCard key={el.id} el={el} />)
        ) : (
          <p>No events found.</p>
        )}
      </div>
      {tottal > size && (
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            current={page + 1}
            pageSize={size}
            total={tottal}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SeeAll;
