import { Dispatch, SetStateAction } from 'react';

export interface ICurrentWeatherOrForecastButtons {
	currentWeatherOrForecast: boolean;
	setCurrentWeatherOrForecast: Dispatch<SetStateAction<boolean>>;
}
