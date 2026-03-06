import React, { useState } from 'react';

const UpcomingCard = () => {
  const [isActive,setIsActive] = useState(false)
  return (
    <div className={`upcoming-card yellow  ${isActive && 'active'}`} onClick={()=> setIsActive(!isActive)}>
      <div className="upcoming-card__header">
        <img src="starbucks.png" alt="Starbucks" className="brand-icon" />
        <span className="date">Nov 01, 2022</span>
      </div>
      <h4 className="upcoming-card__title">Meeting with brand</h4>
      <div className="upcoming-card__block">
        <p className="upcoming-card__time">10:00am - 11:00am</p>
        <button className="upcoming-card__btn active">dopss</button>
      </div>
    </div>
  );
};

export default UpcomingCard;
