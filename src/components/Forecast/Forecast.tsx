import React, { useCallback, useEffect, useState } from 'react';
import { ForecastData } from './IForecastData.ts';
import { APIKEY, baseForecastUrl } from '../../service/API';
import { Loader } from '../Loader';
import './Forecast.scss';
import { WeatherDetails } from '../WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { handleFormattedForecast } from './forecastUtils.ts';
import {
	IFormattedForecastData,
	IFormattedForecastList,
} from './IFormattedForecastData.ts';
import { IForecastProps } from './IForecastProps.ts';
import { selectedDayName } from '../../utils/dayNames.ts';

export const Forecast: React.FC<IForecastProps> = ({ lat, lon, unitsType }) => {
	const [forecastData, setForecastData] = useState<ForecastData | null>(null);
	const [formattedForecastData, setFormattedForecastData] =
		useState<IFormattedForecastData | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);

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
					throw new Error('No weather forecast is available for this location');
				}

				const forecastData: ForecastData = await responseForecast.json();

				setForecastData(forecastData);
				console.log('Forecast Data: ', forecastData);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchForecastData();
	}, [lat, lon, unitsType]);

	const handleShowMoreClick = useCallback(
		(selectedDay: IFormattedForecastList, index: number) => {
			if (activeItemIndex === index) {
				setSelectedDayData(null);
				setActiveItemIndex(-1);
			} else {
				setSelectedDayData(selectedDay);
				setActiveItemIndex(index);
			}
		},
		[activeItemIndex],
	);

	useEffect(() => {
		if (forecastData) {
			const formattedData = handleFormattedForecast(forecastData);
			setFormattedForecastData(formattedData);
			console.log('FormattedData: ', formattedData);

			const forecastDailyData = formattedData.list.filter(item => {
				return item.dt_txt.includes('15:00:00');
			});

			setForecastDailyData({ ...formattedData, list: forecastDailyData });
		}
	}, [forecastData]);

	return (
		<section className='forecast'>
			{isLoading ? (
				<div className='forecast__loader'>
					<Loader />
				</div>
			) : formattedForecastData && forecastDailyData ? (
				<div className='forecast__container'>
					<HourlyForecast
						forecastData={formattedForecastData}
						unitsType={unitsType}
					/>

					<DailyForecast
						forecastDailyData={forecastDailyData}
						unitsType={unitsType}
						activeItemIndex={activeItemIndex}
						handleShowMoreClick={handleShowMoreClick}
					/>

					{selectedDayData && (
						<>
							<span className='forecast__selected-day'>
								Weather for {selectedDayName(selectedDayData.dt_txt)}
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
