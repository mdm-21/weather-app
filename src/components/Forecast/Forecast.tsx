import React, { useEffect, useState } from 'react';
import {
  ForecastData,
  IFormattedForecastData,
  IFormattedForecastList,
} from './IForecast';
import { APIKEY, baseForecastUrl } from '../../service/API';
import { Loader } from '../Loader';
import './Forecast.scss';
import { WeatherDetails } from '../WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { formatTimeAndTime } from '../../utils/formatDateAndTime.ts';
import { handleFormattedData } from './forecastUtils.ts';

interface ForecastCoord {
  lat: number;
  lon: number;
  unitsType: string; // Assuming you have a limited set of possible values for unitsType
}

export const Forecast: React.FC<ForecastCoord> = ({ lat, lon, unitsType }) => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [formattedForecastData, setFormattedForecastData] =
    useState<IFormattedForecastData | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tempType, setTempType] = useState<string>('°C');

  const [forecastDailyData, setForecastDailyData] =
    useState<IFormattedForecastData | null>(null);
  const [selectedDayData, setSelectedDayData] =
    useState<IFormattedForecastList | null>(null);
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
        setIsLoading(false);
        console.log(forecastData);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchForecastData();
  }, [lat, lon, unitsType]);

  useEffect(() => {
    if (forecastData) {
      const formattedData = handleFormattedData(forecastData);
      setFormattedForecastData(formattedData);
      console.log('FormattedData: ', formattedData);

      const forecastDailyData = formattedData.list.filter((item) => {
        return item.dt_txt.includes('15:00:00');
      });

      setForecastDailyData({ ...formattedData, list: forecastDailyData });
    }
  }, [forecastData]);

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

  const handleShowMoreClick = (
    selectedDay: IFormattedForecastList,
    index: number,
  ) => {
    if (activeItemIndex === index) {
      setSelectedDayData(null);
      setActiveItemIndex(-1);
    } else {
      setSelectedDayData(selectedDay);
      setActiveItemIndex(index);
    }
  };

  return (
    <section className="forecast">
      {isLoading ? (
        <div className="forecast__loader">
          <Loader />
        </div>
      ) : formattedForecastData && forecastDailyData ? (
        <div className="forecast__container">
          <HourlyForecast
            forecastData={formattedForecastData}
            tempType={tempType}
          />

          <DailyForecast
            forecastDailyData={forecastDailyData}
            tempType={tempType}
            activeItemIndex={activeItemIndex}
            handleShowMoreClick={handleShowMoreClick}
          />

          {selectedDayData && (
            <>
              <span className="forecast__selected-name">
                Weather for {formatTimeAndTime(selectedDayData.dt_txt).dayName}
              </span>

              <WeatherDetails
                feels_like={selectedDayData.feels_like}
                temp_min={selectedDayData.temp_min}
                temp_max={selectedDayData.temp_max}
                sunrise={formattedForecastData.sunrise}
                sunset={formattedForecastData.sunset}
                humidity={selectedDayData.humidity}
                pressure={selectedDayData.pressure}
                wind={selectedDayData.speed}
                visibility={formattedForecastData.list[0].visibility}
                timezone={formattedForecastData?.timezone || 0}
                unitsType={unitsType}
              />
            </>
          )}
        </div>
      ) : null}
    </section>
  );
};
