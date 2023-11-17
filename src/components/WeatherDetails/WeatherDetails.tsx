import React from 'react';
import { weatherDetails } from '../../utils/weatherDetails.ts';
import { IWeatherInfo } from './IWeatherInfo.ts';

import './WeatherDetails.scss';

export const WeatherDetails: React.FC<IWeatherInfo> = React.memo(
  ({
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
  }) => {
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
  },
);
