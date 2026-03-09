import { useState } from 'react';
import UpcomingCard from './UpcomingCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import dayjs from 'dayjs';

const UpcomingPanel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const event = useSelector((state: RootState) => state.calendar.event);

  return (
    <aside className="upcoming-panel">
      <h2 className="upcoming-panel__title">Upcoming</h2>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Today</h3>

        {event.length !== 0 ? (
          event
            .filter((el) => {
              return dayjs(el.date).isSame(dayjs(), 'day');
            })
            .map((el) => (
              <UpcomingCard
                key={el.id}
                list={el}
                isActive={activeId === el.id}
                onToggle={() => setActiveId(activeId === el.id ? null : el.id)}
              />
            ))
        ) : (
          <p>пока нет событий</p>
        )}
      </div>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Tomorrow</h3>
        {event.length !== 0 ? (
          event
            .filter((el) => {
              return dayjs(el.date).isAfter(dayjs(), 'day') ;
            })
            .map((el) => (
              <UpcomingCard
                key={el.id}
                list={el}
                isActive={activeId === el.id}
                onToggle={() => setActiveId(activeId === el.id ? null : el.id)}
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
