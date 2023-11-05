import { useEffect, useState } from 'react';
import { ForecastData } from './IForecast.ts';
import { APIKEY, baseForecastUrl } from '../../service/API.ts';
import { weatherIcons } from '../../utils/weatherIcons.ts';
import { dayNames } from '../../utils/dayNames.ts';

import { Loader } from '../Loader';

import './Forecast.scss';

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
    return dayNames[dayIndex];
  };

  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}, ${day}.${month} `;
  }

  return (
    <div className="forecast">
      {isLoading ? (
        <div className="forecast__loader">
          <Loader />
        </div>
      ) : forecastData && forecastDailyData ? (
        <div className="forecast__container">
          <div className="forecast__b">
            <button
              onClick={() => {
                if (removeVisibleItems > 0) {
                  setRemoveVisibleItems(removeVisibleItems - 4);
                  setAddVisibleItems(addVisibleItems - 4);
                }
              }}
              // disabled={removeVisibleItems === 0}
            >
              Попередні
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
              onClick={() => {
                if (addVisibleItems < forecastData.list.length) {
                  setRemoveVisibleItems(removeVisibleItems + 4);
                  setAddVisibleItems(addVisibleItems + 4);
                }
              }}
              // disabled={addVisibleItems >= forecastData.list.length}
            >
              Наступні
            </button>
          </div>

          <div className="forecast__b">
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
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
