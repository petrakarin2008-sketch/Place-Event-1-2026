import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../redux/store';
import type { ICartDetail } from '../types';
import dayjs from 'dayjs';
import { FetchWeather } from '../redux/feature/weatherSlice';
import {
  removeCartDetail,
  updateIsClickBut,
  useLazyGetCartDetailIdQuery,
} from '../redux/feature/comEventApiSlice';
import { useParams } from 'react-router-dom';
import Weather from '../components/Weather';
import { formateDate, formateTime, getDaysDifference } from '../utils';
import Toast from '../components/Toast';
import { addEvent, removeEvent } from '../redux/feature/calendarSlice';

const CardDetails = () => {
  const cartDetail = useSelector((state: RootState) => state.eventsApi.cartDetail);

  const { id } = useParams();
  const isClicked = useSelector(
    (state: RootState) => state.eventsApi.isClickBut[id || ''] || false,
  );
  const types = useRef<'today' | 'future'>('today');
  const willDay = useRef<number>(1);
  const [isToast, setIsToast] = useState(false);

  const event = (cartDetail || null) as ICartDetail;

  const date = dayjs(event.dates?.start?.localDate).format('DD MMMM, YYYY') || '10 March 2026';
  const day = dayjs(event.dates?.start?.localDate).format('dddd') || 'monday';
  const time = event.dates?.start?.localTime?.slice(0, 5) || '19.00';
  const state = event._embedded?.venues?.[0].state?.name || '';

  const [trigger, { isLoading }] = useLazyGetCartDetailIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      trigger(id);
    }

    return () => {
      dispatch(removeCartDetail());
    };
  }, []);

  useEffect(() => {
    if (cartDetail && cartDetail._embedded?.venues?.[0].city?.name) {
      const city = event._embedded?.venues?.[0].city?.name;
      const date = event.dates?.start?.localDate;

      const daysAway = getDaysDifference(date);

      if (daysAway > 14) {
        types.current = 'future';
      } else {
        types.current = 'today';
        willDay.current = daysAway + 1;
      }

      dispatch(FetchWeather({ city, date, types: types.current, willDay: willDay.current }));
    }
  }, [cartDetail]);

  function addToEvent() {
    dispatch(updateIsClickBut(event.id));

    if (!isClicked) {
      const images = event.images?.find((el) => el.height <= 115) || event.images?.[0];
      const array = {
        id: event.id,
        date: formateDate(event?.dates?.start?.localDate),
        title: event.name,
        time: formateTime(event?.dates?.start?.localTime),
        img: images.url,
        other: '',
      };
      dispatch(addEvent({ ...array }));
    } else {
      dispatch(removeEvent({ id: event.id }));
    }
  }

  if (isLoading) return <p>Loading...</p>;
  const mainImage = event.images?.find((el) => el.height >= 500) || event.images?.[0];

  return (
    <>
      {isToast && <Toast onClose={() => setIsToast(false)} />}
      <main className="travel-detail wrapper">
        <section className="container_info">
          <header className="trip-info">
            <h1 className="trip-name">{event.name}</h1>
            <div className="info-pills">
              <div className="info-pill">
                <img src={event.seatmap?.staticUrl || '/vite.svg'} alt="location" />
                <span>{`${event._embedded?.venues?.[0].country?.name}, ${state}${state && ','} ${event._embedded?.venues?.[0].city?.name}`}</span>
              </div>
            </div>
          </header>

          <section className="gallery">
            {event.images?.[0]?.url ? (
              <img src={mainImage?.url} alt="Main Event" className="gallery-img main" />
            ) : (
              <div className="gallery-placeholder">
                <span>Изображение загружается...</span>
              </div>
            )}
          </section>

          <section className="meta-row">
            <div className="chip-list">
              <span className="chip bg-blue">
                {event.classifications?.[0].segment?.name || 'sport'}
              </span>
              <span className="chip bg-green">
                {event.classifications?.[0].genre?.name || 'sport'}
              </span>
            </div>
          </section>

          <div className="event-info-grid">
            <div className="info-item">
              <div className="info-icon calendar-bg">📅</div>
              <div className="info-text">
                <span className="main">{date}</span>
                <span className="sub">
                  {day}, {time}
                </span>
              </div>
            </div>

            <Weather />

            <div className="event-description">
              <h3>About Event</h3>
              <p>{event.info || 'информация отсутсвует'}</p>
            </div>

            <button
              className={`btn-primary-large ${isClicked ? 'remove' : 'default-clas'}`}
              disabled={isToast}
              onClick={() => {
                setIsToast(true);
                addToEvent();
              }}>
              {!isClicked ? 'Add to calendar' : 'delete from calendar'}
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CardDetails;
