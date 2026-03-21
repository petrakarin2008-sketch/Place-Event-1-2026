import { useState } from 'react';

import React from 'react';

const colors = ['yellow', 'blue', 'red'];
interface UpcomingCardProps {
  list: ps;
  isActive: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onRename: (id: string, arg2: string) => void;
}
interface ps {
  id: string;
  date: string;
  title: string;
  time: string;
  img:string,
  other: string;
}

const UpcomingCard = React.memo(
  ({ list, isActive, onToggle, onRemove, onRename }: UpcomingCardProps) => {
    const { title, time, date, other, id,img } = list;

    const [randomColor] = useState(() => colors[Math.floor(Math.random() * colors.length)]); //создастя только при рендере компонента

    const [inputVal, setInputVal] = useState(other.length !== 0 ? other : '');
    const [addOther, setAddOther] = useState(false);

    return (
      <div
        className={`upcoming-card ${randomColor}  ${isActive && 'active'}`}
        onClick={() => onToggle(id)}>
        <div className="upcoming-card__header">
          <img src={img} alt="Starbucks" className="brand-icon" />
          <span className="date">{date}</span>
        </div>
        <h4 className="upcoming-card__title">{title}</h4>
        <div className="upcoming-card__block">
          <p className="upcoming-card__time">{time}</p>
          <button
            className={`upcoming-card__btn ${addOther ? 'save' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (addOther) {
                onRename(id, inputVal);
              }
              setAddOther(!addOther);
            }}>
            {addOther ? 'Save' : 'Change'}
          </button>
          <button
            className="upcoming-card__btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}>
            Delete
          </button>
        </div>

        {addOther && (
          <div className={`input-container visible`}>
            <input
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              type="text"
              className="modern-input"
              placeholder="Add details..."
              autoFocus={addOther}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {other.length !== 0 && !addOther && <p className="other-text">{other}</p>}
      </div>
    );
  },
);

export default UpcomingCard;
