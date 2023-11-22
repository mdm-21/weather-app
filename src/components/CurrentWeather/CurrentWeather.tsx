import React from 'react';
import {
	formatDateAndTime,
	formatTemperature,
	weatherIcons,
} from '../../utils';
import { ICurrentWeatherProps } from './ICurrentWeatherProps.ts';
import './CurrentWeather.scss';

export const CurrentWeather: React.FC<ICurrentWeatherProps> = React.memo(
	({ weatherData, unitsType, isLoading }) => {
		return (
			<section className='current-weather'>
				{weatherData && (
					<>
						<img
							src={weatherIcons[weatherData.main]}
							className='current-weather__icon'
							alt=''
							loading='lazy'
						/>
						<span className='current-weather__temp-number'>
							{isLoading ? (
								<span className='loader-small'></span>
							) : (
								formatTemperature(weatherData.temp, unitsType)
							)}
							{/*{formatTemperature(weatherData.temp, unitsType)}*/}
						</span>
						<span className='current-weather__name'>
							{weatherData.description}
						</span>

						<span className='current-weather__city'>
							{weatherData.name}, {weatherData.country}
						</span>

						<div className='current-weather__location-info'>
							<span>
								{formatDateAndTime(weatherData?.dt, weatherData?.timezone).date}
							</span>
							<span>
								{formatDateAndTime(weatherData?.dt, weatherData?.timezone).time}
							</span>
						</div>
					</>
				)}
			</section>
		);
	},
);
