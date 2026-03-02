import React from 'react';
import NoteSection from '../components/NoteSection';
import UpcomingPanel from '../components/UpcomingPanel';
import Calendar from '../components/Calendar';

const Event = () => {
  return (
    <main className="container__dashboard">
      <div className="dashboard">
        <main className="calendar-section">
          <div className="calendar-page">
            <Calendar/>
          </div>
        </main>

       <UpcomingPanel/>

       <NoteSection/>
      </div>
    </main>
  );
};

export default Event;
