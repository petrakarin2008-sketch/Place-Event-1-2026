import React from 'react';

const Weather = () => {
  return (
    <section className="weather-widget">
      <div className="weather-widget__main">
        <div className="weather-widget__info">
          <h2 className="weather-widget__city">San Francisco</h2>
          <p className="weather-widget__date">September 25, 2015</p>
          <div className="weather-widget__condition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4834/4834559.png"
              alt="Cloudy"
              className="weather-widget__icon"
            />
            <span className="weather-widget__status">Cloudy</span>
          </div>
        </div>

        <div className="weather-widget__temp-block">
          <span className="weather-widget__current-temp">72°</span>
          <div className="weather-widget__range">
            <span className="high">81°</span> / <span className="low">57°</span>
          </div>
        </div>
      </div>

      <nav className="weather-widget__nav">
        <a href="#" className="active">
          Hourly
        </a>
        <a href="#">Daily</a>
      </nav>

      <div className="weather-widget__hourly">
        <div className="forecast-item">
          <span className="forecast-item__time">NOW</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4834/4834559.png"
            alt="Sun"
            className="forecast-item__icon"
          />
          <span className="forecast-item__temp">72°</span>
        </div>
      </div>
    </section>
  );
};

export default Weather;
