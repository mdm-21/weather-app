import { formatTemperature } from '../../utils/weatherUtils.ts';
import { ICurrentWeather } from '../../types/ICurrentWeather.ts';
import './CurrentWeather.scss';
import { weatherIcons } from '../../utils/weatherIcons.ts';
import { getFormattedDate } from '../../utils/formatDataAndTimeLuxon.ts';

export const CurrentWeather = ({ weatherData, unitsType }: ICurrentWeather) => {
  return (
    <section className="current-weather">
      {weatherData && (
        <>
          <img
            src={weatherIcons[weatherData.main]}
            className="current-weather__icon"
            alt=""
          />
          <span className="current-weather__temp-number">
            {formatTemperature(weatherData.temp, unitsType)}
          </span>
          <span className="current-weather__name">
            {weatherData.description}
          </span>

          <div className="current-weather__location-info">
            <span>
              {getFormattedDate(weatherData?.dt, weatherData?.timezone).date}
            </span>
            <span>
              {weatherData.name}, {weatherData.country}
            </span>
            <span>
              {getFormattedDate(weatherData?.dt, weatherData?.timezone).time}
            </span>
          </div>
        </>
      )}
    </section>
  );
};
