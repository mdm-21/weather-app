import React from 'react';
import show_more from '../../../../assets/images/show_more.svg';
import { formatTimeAndTime } from '../../../../utils/formatDateAndTime.ts';
import { weatherIcons } from '../../../../utils/weatherIcons.ts';
import {
  IFormattedForecastData,
  IFormattedForecastList,
} from '../../IForecast.ts';

interface DailyForecastProps {
  forecastDailyData: IFormattedForecastData;
  tempType: string;
  activeItemIndex: number;
  handleShowMoreClick: (item: IFormattedForecastList, index: number) => void;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  forecastDailyData,
  tempType,
  activeItemIndex,
  handleShowMoreClick,
}) => {
  return (
    <>
      <span className="forecast__container--name">5-day Forecast</span>

      <section className="forecast__container--item">
        {forecastDailyData.list.map((item, index) => (
          <div key={index} className="forecast__item">
            <span className="forecast__item--time">
              {index < 2
                ? index === 0
                  ? 'Today'
                  : 'Tomorrow'
                : formatTimeAndTime(item.dt_txt).dayName}
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

            <button
              className={`forecast__item--button ${
                activeItemIndex === index
                  ? 'forecast__item--button--active'
                  : ''
              }`}
              onClick={() => handleShowMoreClick(item, index)}
            >
              <img
                src={show_more}
                className="forecast__item--show-more"
                alt="show more"
              />
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
