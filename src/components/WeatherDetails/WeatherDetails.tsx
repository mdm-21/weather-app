import { weatherDetails } from '../../utils/weatherDetails.ts';

import './WeatherDetails.scss';

export interface IWeatherInfo {
  feels_like: number;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
  humidity: number;
  pressure: number;
  wind: number;
  visibility: number;
  timezone: number;
  unitsType: string;
}

export const WeatherDetails = ({
  feels_like,
  temp_min,
  temp_max,
  sunrise,
  sunset,
  humidity,
  pressure,
  wind,
  visibility,
  timezone,
  unitsType,
}: IWeatherInfo) => {
  const details = weatherDetails({
    feels_like,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    humidity,
    pressure,
    wind,
    visibility,
    timezone,
    unitsType,
  });

  return (
    <div className="weather-details">
      <div className="weather-details__container">
        {details.map((detail, index) => (
          <div className="weather-details__item" key={index}>
            <div className="weather-details__left">
              <span className="weather-details__item--name">
                {detail.label}
              </span>
              <span className="weather-details__item--value">
                {detail.value}
              </span>
            </div>

            <img
              src={detail.icon}
              alt="weather-icon"
              className="weather-details__item--icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
