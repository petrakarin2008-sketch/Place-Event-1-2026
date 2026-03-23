import { useCallback, useMemo } from 'react';
import UpcomingCard from './UpcomingCard';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import dayjs from 'dayjs';
import { removeEvent, renameEvent } from '../redux/feature/calendarSlice';
import { updateIsClickBut } from '../redux/feature/comEventApiSlice';

const UpcomingPanel = () => {
  const dispatch = useDispatch();

  const event = useSelector((state: RootState) => state.calendar.event);

  // 1. Готовим строки для сравнения ОДИН раз
  // const { todayStr, tomorrowStr } = useMemo(() => {
  //   const now = dayjs();
  //   return {
  //     todayStr: now.format('YYYY-MM-DD'),
  //     tomorrowStr: now.add(1, 'day').format('YYYY-MM-DD')
  //   };
  // }, []);

  const isToday = useMemo(() => {
    return event.filter((el) => dayjs(el.date).isSame(dayjs(), 'day'));
  }, [event]);

  const isTomorow = useMemo(() => {
    return event.filter((el) => dayjs(el.date).isSame(dayjs().add(1, 'day'), 'day'));
  }, [event]);

  // const { todayEvents, tomorrowEvents } = useMemo(() => {
  //   const todayList: typeof event = [];
  //   const tomorrowList: typeof event = [];

  //   event.forEach((el) => {
  //     if (el.date.startsWith(todayStr)) {
  //       todayList.push(el);
  //     } else if (el.date.startsWith(tomorrowStr)) {
  //       tomorrowList.push(el);
  //     }
  //   });

  //   return { todayEvents: todayList, tomorrowEvents: tomorrowList };
  // }, [event, todayStr, tomorrowStr]);

  const allEvent = event.filter((el) => {
    const isNotToday = !isToday.some((todayEl) => todayEl.date === el.date);

    const isNotTomorrow = !isTomorow.some((tomorrowEl) => tomorrowEl.date === el.date);

    return isNotToday && isNotTomorrow;
  });

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeEvent({ id }));
      dispatch(updateIsClickBut(id));
    },
    [dispatch],
  );

  const handleRename = useCallback(
    (id: string, newTitle: string) => {
      dispatch(
        renameEvent({
          id: id,
          newTitle: newTitle,
        }),
      );
    },
    [dispatch],
  );

  return (
    <aside className="upcoming-panel">
      <h2 className="upcoming-panel__title">Upcoming</h2>
      <div className="upcoming-section">
        <h3 className="upcoming-section__date">All Events</h3>

        {allEvent.length !== 0 ? (
          allEvent.map((el) => (
            <UpcomingCard
              key={el.id}
              list={el}
              color={'yellow'}
              onRemove={handleRemove}
              onRename={handleRename}
            />
          ))
        ) : (
          <p>пока нет событий</p>
        )}
      </div>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Today</h3>

        {isToday.length !== 0 ? (
          isToday.map((el) => (
            <UpcomingCard
              key={el.id}
              list={el}
              color={'blue'}
              onRemove={handleRemove}
              onRename={handleRename}
            />
          ))
        ) : (
          <p>пока нет событий</p>
        )}
      </div>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Tomorrow</h3>
        {isTomorow.length !== 0 ? (
          isTomorow.map((el) => (
            <UpcomingCard
              key={el.id}
              list={el}
              color={'red'}
              onRename={handleRename}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p>пока нет событий</p>
        )}
      </div>
    </aside>
  );
};

export default UpcomingPanel;
