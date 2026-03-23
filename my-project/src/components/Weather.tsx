import { type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import CurrentWeather from './weather/CurrentWeather';
import FutureWeather from './weather/FutureWeather';
import type { IFutureWeather, IWeather } from '../types';

const Weather = () => {
  const { weather, weatherHour, isLoading, viewType } = useSelector(
    (state: RootState) => state.weather,
  );

  if (isLoading) return <section className="weather-widget" style={{height:'33.5rem'}}><p>Загрузка...</p></section>;

  if (viewType === 'error' && !weather) return  <section className="weather-widget" style={{height:'33.5rem'}}><p>Нет данных</p></section>;

  if (viewType === 'current')
    return <CurrentWeather weather={weather as IWeather} weatherHour={weatherHour} />;
  if (viewType === 'future')
    return <FutureWeather weather={weather as IFutureWeather} weatherHour={weatherHour} />;
};

export default Weather;
