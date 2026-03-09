import { useState } from 'react';
import { formateDate, formateTime } from '../utils';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/feature/calendarSlice';

interface UpcomingPanelProps {
  isVisible: () => void;
}

const NoteSection = ({ isVisible }: UpcomingPanelProps) => {
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputDescr, setInputDescr] = useState('');

  const dispatch = useDispatch();

  const isInvalid =
    inputDate.trim().length === 0 ||
    inputTime.trim().length === 0 ||
    inputDescr.trim().length === 0;

  function submit() {
    const array = {
      id: Math.floor(Math.random() * 1000),
      date: formateDate(inputDate),
      title: inputDescr,
      time: formateTime(inputTime),
      other: '',
    };
    dispatch(addEvent({ ...array }));

    setInputDate('');
    setInputDescr('');
    setInputTime('');

    isVisible();
  }

  return (
    <section className="note-section">
      <div className="note-form">
        <div className="note-header">
          <h3>Quick Event Note</h3>
          <p>Schedule a quick task or reminder</p>
        </div>

        <div className="note-inputs">
          <div className="input-field">
            <label>Date</label>
            <input
              type="date"
              className="note-date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label>Time</label>
            <input
              type="time"
              className="note-time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
          </div>

          <div className="input-field flex-grow">
            <label>Description</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              className="note-text"
              value={inputDescr}
              onChange={(e) => setInputDescr(e.target.value)}
            />
          </div>

          <button className="add-note-btn" disabled={isInvalid} onClick={() => submit()}>
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoteSection;
