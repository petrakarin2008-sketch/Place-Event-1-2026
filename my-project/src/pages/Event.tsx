import { useState } from 'react';
import NoteSection from '../components/NoteSection';
import UpcomingPanel from '../components/UpcomingPanel';
import Calendar from '../components/Calendar';
import Toast from '../components/Toast';


const Event = () => {
  const [isToast, setIsToast] = useState(false);
  
  return (
    <>
      {isToast && <Toast onClose={() => setIsToast(false)} />}
      <main className="container__dashboard">
        <div className="dashboard">
          <main className="calendar-section">
            <div className="calendar-page">
              <Calendar />
            </div>
             <NoteSection
            isVisible={() => setIsToast(true)}
            
          />
          </main>

          <UpcomingPanel  />

         
        </div>
      </main>
    </>
  );
};

export default Event;
