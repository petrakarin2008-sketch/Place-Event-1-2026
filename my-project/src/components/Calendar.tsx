import dayjs, { Dayjs } from 'dayjs';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface allDays {
  date: Dayjs;
  current: boolean;
}

const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [fullCalendar, setFullCalendar] = useState<allDays[]>();

  const event = useSelector((state: RootState) => state.calendar.event);

  const eventsMap = useMemo(() => {
    return event.reduce(
      (acc, el) => {
        const dateKey = dayjs(el.date).format('YYYY-MM-DD');

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push({
          id: el.id,
          title: el.title,
        });

        return acc;
      },
      {} as Record<string, { id: number; title: string }[]>,
    );
  }, [event]);

  console.log(eventsMap);

  const generateCalendar = () => {
    const firstDayOfMonth = currentMonth.startOf('month').day(); //31

    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');

    const allDays = [];

    // 1. Добавляем прошлый месяц (серые)

    for (let i = 0; i < firstDayIndex; i++) {
      allDays.push({
        date: startOfMonth.subtract(firstDayIndex - i, 'day'),
        current: false,
      });
    }

    // 2. Добавляем текущий месяц
    for (let i = 1; i <= currentMonth.daysInMonth(); i++) {
      allDays.push({
        date: startOfMonth.date(i),
        current: true,
      });
    }

    // 3. Добавляем будущий месяц (дозабиваем до кратного 7 или до 35 ячеек)
    // const remainingSlots = 35 - allDays.length;
    // for (let i = 1; i <= remainingSlots; i++) {
    //   allDays.push({
    //     date: endOfMonth.add(i, 'day'),
    //     current: false,
    //   });
    // }

    if (currentMonth.endOf('month').day() != 0) {
      for (let i = 1; i < 8 - endOfMonth.day(); i++) {
        allDays.push({
          date: endOfMonth.add(i, 'day'),
          current: false,
        });
      }
    }

    setFullCalendar(allDays);
  };

  function changeMonth(type: string) {
    if (type === 'next') {
      setCurrentMonth(currentMonth.add(1, 'month'));
    } else {
      setCurrentMonth(currentMonth.subtract(1, 'month'));
    }
  }

  console.log(fullCalendar);
  // console.log(eventsMap['2026-03-08'].map((el)=> el.title))
  useEffect(() => {
    generateCalendar();
  }, [currentMonth]);

  return (
    <>
      <header className="calendar-header">
        <div className="calendar-header__title">
          <h1>{`${currentMonth.format('MMMM')} ${currentMonth.format('YYYY')}`}</h1>
          <div className="calendar-nav">
            <button className="filter-btn" onClick={() => setCurrentMonth(dayjs())}>
              Today
            </button>
            <button className="filter-btn" onClick={() => changeMonth('prev')}>
              ❮
            </button>
            <button className="filter-btn" onClick={() => changeMonth('next')}>
              ❯
            </button>
          </div>
        </div>

        <div className="calendar-weekdays">
          {dayOfWeek.map((el, id) => (
            <div key={id}>{el}</div>
          ))}
        </div>
      </header>

      <div className="calendar-grid">
        {fullCalendar &&
          fullCalendar.map((item, idx) => (
            <div
              key={idx}
              className={`day-cell ${!item.current ? 'next-month' : ''} ${item.date.isSame(dayjs(), 'day') ? 'active' : ''}`}>
              {item.date.date()}
              {}
              <div className="event-dots">
                {eventsMap[item.date.format('YYYY-MM-DD')]
                  ? eventsMap[item.date.format('YYYY-MM-DD')].map((el) => (
                      <p className="dot orange">{el.title}</p>
                    ))
                  : null}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Calendar;
