import React from 'react';
import {
	CurrentWeatherOrForecastButtons,
	Forecast,
	WeatherDetails,
} from '../../../../components';
import { IRightSideProps } from './IRightSideProps.ts';
import './RightSide.scss';

export const RightSide: React.FC<IRightSideProps> = ({
	currentWeatherOrForecast,
	setCurrentWeatherOrForecast,
	weatherData,
	unitsType,
}) => (
	<section className='right-side'>
		<CurrentWeatherOrForecastButtons
			currentWeatherOrForecast={currentWeatherOrForecast}
			setCurrentWeatherOrForecast={setCurrentWeatherOrForecast}
		/>
		{!currentWeatherOrForecast ? (
			<Forecast
				lat={weatherData?.lat || 0}
				lon={weatherData?.lon || 0}
				unitsType={unitsType}
			/>
		) : (
			<WeatherDetails
				feels_like={weatherData?.feels_like || 0}
				temp_min={weatherData?.temp_min || 0}
				temp_max={weatherData?.temp_max || 0}
				sunrise={weatherData?.sunrise || 0}
				sunset={weatherData?.sunset || 0}
				humidity={weatherData?.humidity || 0}
				pressure={weatherData?.pressure || 0}
				wind={weatherData?.speed || 0}
				visibility={weatherData?.visibility || 0}
				timezone={weatherData?.timezone || 0}
				unitsType={unitsType}
			/>
		)}
	</section>
);
