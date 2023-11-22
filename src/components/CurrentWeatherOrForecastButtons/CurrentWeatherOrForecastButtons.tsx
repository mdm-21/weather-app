import { useCallback } from 'react';
import { ICurrentWeatherOrForecastButtons } from './ICurrentWeatherOrForecastButtons.ts';
import './CurrentWeatherOrForecastButtons.scss';

export const CurrentWeatherOrForecastButtons = ({
	currentWeatherOrForecast,
	setCurrentWeatherOrForecast,
}: ICurrentWeatherOrForecastButtons) => {
	const handleCurrentWeatherOrForecast = useCallback(() => {
		setCurrentWeatherOrForecast(!currentWeatherOrForecast);
	}, [currentWeatherOrForecast, setCurrentWeatherOrForecast]);

	const buttons = [
		{ label: 'Current Weather', value: true },
		{ label: 'Forecast', value: false },
	];

	return (
		<section className='weather-or-forecast'>
			{buttons.map(button => (
				<button
					key={button.label}
					onClick={handleCurrentWeatherOrForecast}
					className={
						currentWeatherOrForecast === button.value
							? 'weather-or-forecast__button weather-or-forecast__button--selected'
							: 'weather-or-forecast__button'
					}
				>
					{button.label}
				</button>
			))}
		</section>
	);
};
