import { formatTemperature } from '../../utils/weatherUtils.ts';
import { ICurrentWeather } from '../../types/ICurrentWeather.ts';
import './CurrentWeather.scss';
import { weatherIcons } from '../../utils/weatherIcons.ts';
import { DateTime, FixedOffsetZone } from 'luxon';

export const CurrentWeather = ({ weatherData, unitsType }: ICurrentWeather) => {
  const getFormattedDate = (
    secs: number | undefined,
    zone: number | undefined,
  ) => {
    if (secs !== undefined && zone !== undefined) {
      const offsetInMinutes = zone / 60;
      const customZone = FixedOffsetZone.instance(offsetInMinutes);
      const dateTime = DateTime.fromSeconds(secs).setZone(customZone);

      const date = dateTime.toFormat('cccc, dd.LL.yyyy');
      const time = dateTime.toFormat('hh:mm a');

      return { date, time };
    }
    return { date: 'Unknown Date', time: 'Unknown Time' };
  };

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
            {weatherData.weather[0].description}
          </span>

          <div className="current-weather__location-info">
            <span>
              {getFormattedDate(weatherData?.dt, weatherData?.timezone).date}
            </span>
            <span>
              {weatherData.name}, {weatherData.sys.country}
            </span>
            <span>
              {getFormattedDate(weatherData?.dt, weatherData?.timezone).time}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
