import React from 'react';

const Toast = () => {
  return (
    <div id="toast" className="toast">
      <div className="toast__content">
        <div className="toast__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
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
