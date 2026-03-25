import { useEffect, useState } from 'react';

type pr = {
  onClose: () => void;
};

const Toast = ({ onClose }: pr) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);

    const hideTimer = setTimeout(() => setVisible(false), 1000);

    const removeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 1500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);
  return (
    <div id="toast" className={`toast ${visible ? 'toast--active' : ''}`}>
      <div className="toast__content">
        <div className="toast__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="toast__message">
          <span className="toast__title">Успешно!</span>
          <span className="toast__text">Изменения сохранены.</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
