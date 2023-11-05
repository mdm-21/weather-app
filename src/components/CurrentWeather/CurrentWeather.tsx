import { formatTemperature } from '../../utils/weatherUtils.ts';
import { ICurrentWeather } from '../../types/ICurrentWeather.ts';
import './CurrentWeather.scss';
import { weatherIcons } from '../../utils/weatherIcons.ts';

export const CurrentWeather = ({ weatherData, unitsType }: ICurrentWeather) => {
  return (
    <div className="current-weather">
      {weatherData && (
        <>
          <img
            src={weatherIcons[weatherData.weather[0].main]}
            className="current-weather__icon"
            alt=""
          />
          <span className="current-weather__temp-number">
            {formatTemperature(weatherData.main.temp, unitsType)}
          </span>
          <span className="current-weather__name">
            {weatherData.weather[0].main}
          </span>

          <div className="current-weather__location-info">
            <span>3.10.2023</span>
            <span>
              {weatherData.name}, {weatherData.sys.country}
            </span>
            <span>Monday, 10:10</span>
          </div>
        </>
      )}
    </div>
  );
};
