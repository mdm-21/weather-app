import React from 'react';
import { IFormattedWeatherData } from '../../../../types/IFormattedWeatherData.ts';
import { TemperatureUnits } from '../../../../types/TemperatureUnits.ts';

export interface IRightSideProps {
	currentWeatherOrForecast: boolean;
	setCurrentWeatherOrForecast: React.Dispatch<React.SetStateAction<boolean>>;
	weatherData: IFormattedWeatherData | null;
	cityNotFound: boolean;
	unitsType: TemperatureUnits;
}
