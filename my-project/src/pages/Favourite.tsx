
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import EventCard from '../components/EventCard';
import CartLoader from '../components/CartLoader';

const Favourite = () => {
  const { favouriteEv, isLoading } = useSelector((state: RootState) => state.eventsApi);
  const events =
    Object.keys(favouriteEv).length !== 0
      ? Object.entries(favouriteEv).map(([id, data]) => ({
          id,
          ...data,
        }))
      : [];

      console.log(events)
  return (
    <>
      <h1 className="title_coming" style={{ marginBottom: '1rem' }}>
        Favourites
      </h1>
      <section className="container">
        <div className="seeAll-cart">
          {isLoading ? (
            Array(4)
              .fill(null)
              .map((_, i) => <CartLoader key={i} />)
          ) : events.length > 0 ? (
            events.map((el) => <EventCard key={el.id} el={el} />)
          ) : (
            <p>No likes events found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Favourite;
