import React from 'react';
import UpcomingCard from './UpcomingCard';

const UpcomingPanel = () => {
  return (
    <aside className="upcoming-panel">
      <h2 className="upcoming-panel__title">Upcoming</h2>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Today</h3>
      {/* blue,yellow,red */}
       <UpcomingCard/>

        <div className="upcoming-card blue">
          <div className="upcoming-card__header">
            <img src="nike.png" alt="Nike" className="brand-icon" />
            <span className="date">Nov 01, 2022</span>
          </div>
          <h4 className="upcoming-card__title">Draft submission</h4>
          <p className="upcoming-card__time">02:00pm - 03:30pm</p>
        </div>
      </div>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Tomorrow</h3>
        <div className="upcoming-card red">
          <h4 className="upcoming-card__title">Make Content Live</h4>
          <p className="upcoming-card__time">10:00pm - 11:00pm</p>
        </div>
        <UpcomingCard/>
      </div>
    </aside>
  );
};

export default UpcomingPanel;
