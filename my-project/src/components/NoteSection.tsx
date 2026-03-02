import React from 'react';

const NoteSection = () => {
  return (
    <section className="note-section">
      <form className="note-form">
        <div className="note-header">
          <h3>Quick Event Note</h3>
          <p>Schedule a quick task or reminder</p>
        </div>

        <div className="note-inputs">
          <div className="input-field">
            <label>Date</label>
            <input type="date" className="note-date" />
          </div>

          <div className="input-field">
            <label>Time</label>
            <input type="time" className="note-time" />
          </div>

          <div className="input-field flex-grow">
            <label>Description</label>
            <input type="text" placeholder="What needs to be done?" className="note-text" />
          </div>

          <button type="submit" className="add-note-btn">
            <span>Save Note</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoteSection;
