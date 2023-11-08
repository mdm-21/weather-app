import { useEffect, useState } from 'react';
import { ForecastData, ForecastList } from './IForecast.ts';
import { APIKEY, baseForecastUrl } from '../../service/API.ts';
import { weatherIcons } from '../../utils/weatherIcons.ts';
import { dayNames } from '../../utils/dayNames.ts';

import { Loader } from '../Loader';

import arrow_right from '../../assets/images/arrow_right.svg';
import arrow_left from '../../assets/images/arrow_left.svg';
import show_more from '../../assets/images/show_more.svg';

import './Forecast.scss';
import { WeatherDetails } from '../WeatherDetails';

interface ForecastCoord {
  lat: number;
  lon: number;
  unitsType: string;
}

export const Forecast = ({ lat, lon, unitsType }: ForecastCoord) => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [forecastDailyData, setForecastDailyData] =
    useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tempType, setTempType] = useState<string>('°C');
  const [removeVisibleItems, setRemoveVisibleItems] = useState(0);
  const [addVisibleItems, setAddVisibleItems] = useState(4);
  const [selectedDayData, setSelectedDayData] = useState<ForecastList | null>(
    null,
  );
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setIsLoading(true);
        const responseForecast = await fetch(
          `${baseForecastUrl}&units=${unitsType}&lat=${lat}&lon=${lon}&appid=${APIKEY}`,
        );

        if (!responseForecast.ok) {
          throw new Error('Прогноз погоди недоступний для цього місця');
        }

        const forecastData: ForecastData = await responseForecast.json();

        setForecastData(forecastData);

        const forecastDailyData = forecastData.list.filter((item) => {
          return item.dt_txt.includes('15:00:00');
        });

        setForecastDailyData({ ...forecastData, list: forecastDailyData });
        setIsLoading(false);
        console.log('Зміна прогнозу:', forecastData);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchForecastData();
  }, [lat, lon, unitsType]);

  useEffect(() => {
    if (unitsType === 'metric') {
      setTempType('°C');
    } else if (unitsType === 'imperial') {
      setTempType('°F');
    } else if (unitsType === 'standard') {
      setTempType('°K');
    } else {
      setTempType('°C');
    }
  }, [unitsType]);

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return `${dayNames[dayIndex]}, ${date.getDate()}.${date.getMonth() + 1}`;
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let period = 'AM';

    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    return `${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${period}, ${date.getDate()}.${date.getMonth() + 1}`;
  };

  const handleShowMoreClick = (selectedDay: ForecastList, index: number) => {
    if (activeItemIndex === index) {
      setSelectedDayData(null);
      setActiveItemIndex(-1);
    } else {
      setSelectedDayData(selectedDay);
      setActiveItemIndex(index);
    }
  };

  return (
    <div className="forecast">
      {isLoading ? (
        <div className="forecast__loader">
          <Loader />
        </div>
      ) : forecastData && forecastDailyData ? (
        <div className="forecast__container">
          <div className="forecast__container--top">
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
                    {formatDateTime(item.dt_txt)}
                  </span>
                  <span className="forecast__item--temp">
                    {Math.round(item.main.temp)}
                    {tempType}
                  </span>

                  <img
                    src={weatherIcons[item.weather[0].main]}
                    className="forecast__item--icon"
                    alt=""
                  />

                  <span className="forecast__item--weather">
                    {item.weather[0].main}
                  </span>
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
          </div>

          <span>5-day forecast</span>
          <div className="forecast__container--top">
            {forecastDailyData.list.map((item, index) => (
              <div key={index} className="forecast__item">
                <span className="forecast__item--time">
                  {index < 2
                    ? index === 0
                      ? 'Today'
                      : 'Tomorrow'
                    : getDayName(item.dt_txt)}
                </span>
                <span className="forecast__item--temp">
                  {Math.round(item.main.temp)}
                  {tempType}
                </span>

                <img
                  src={weatherIcons[item.weather[0].main]}
                  className="forecast__item--icon"
                  alt=""
                />

                <span className="forecast__item--weather">
                  {item.weather[0].main}
                </span>

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
          </div>

          {selectedDayData && (
            <WeatherDetails
              feels_like={selectedDayData.main.feels_like}
              temp_min={selectedDayData.main.temp_min}
              temp_max={selectedDayData.main.temp_max}
              sunrise={selectedDayData.main.feels_like}
              sunset={selectedDayData.main.feels_like}
              humidity={selectedDayData.main.humidity}
              pressure={selectedDayData.main.pressure}
              wind={selectedDayData.wind.speed}
              visibility={selectedDayData.visibility}
              timezone={selectedDayData.main.feels_like}
              unitsType={unitsType}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};
