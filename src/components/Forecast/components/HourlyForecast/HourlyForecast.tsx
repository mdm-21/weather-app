import React, { useState } from 'react';
import { formatTimeAndTime } from '../../../../utils/formatDateAndTime.ts';
import { weatherIcons } from '../../../../utils/weatherIcons.ts';
import arrow_right from '../../../../assets/images/arrow_right.svg';
import arrow_left from '../../../../assets/images/arrow_left.svg';

import { IFormattedForecastData } from '../../IForecast.ts';

interface HourlyForecastProps {
  forecastData: IFormattedForecastData;
  tempType: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  forecastData,
  tempType,
}) => {
  const [removeVisibleItems, setRemoveVisibleItems] = useState(0);
  const [addVisibleItems, setAddVisibleItems] = useState(4);

  return (
    <>
      <span className="forecast__container--name">Hourly Forecast</span>

      <section className="forecast__container--item">
        <button
          className={
            removeVisibleItems === 0
              ? 'forecast__buttons forecast__buttons--disabled'
              : 'forecast__buttons'
          }
          onClick={() => {
            if (removeVisibleItems > 0) {
              setRemoveVisibleItems(removeVisibleItems - 4);
              setAddVisibleItems(addVisibleItems - 4);
            }
          }}
        >
          <img
            src={arrow_left}
            alt="swipe-left"
            className="forecast__buttons--item"
          />
        </button>
        {forecastData.list
          .slice(removeVisibleItems, addVisibleItems)
          .map((item, index) => (
            <div key={index} className="forecast__item">
              <span className="forecast__item--time">
                {formatTimeAndTime(item.dt_txt).formattedHours}
                <br />
                {formatTimeAndTime(item.dt_txt).formattedDate}
              </span>
              <span className="forecast__item--temp">
                {Math.round(item.temp)}
                {tempType}
              </span>

              <img
                src={weatherIcons[item.main]}
                className="forecast__item--icon"
                alt=""
              />

              <span className="forecast__item--weather">{item.main}</span>
            </div>
          ))}
        <button
          className={
            addVisibleItems >= forecastData.list.length
              ? 'forecast__buttons forecast__buttons--disabled'
              : 'forecast__buttons'
          }
          onClick={() => {
            if (addVisibleItems < forecastData.list.length) {
              setRemoveVisibleItems(removeVisibleItems + 4);
              setAddVisibleItems(addVisibleItems + 4);
            }
          }}
        >
          <img
            src={arrow_right}
            alt="swipe-right"
            className="forecast__buttons--item"
          />
        </button>
      </section>
    </>
  );
};
