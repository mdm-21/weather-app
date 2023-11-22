import React from 'react';
import { Coord } from '../../../../types/IWeather.ts';
import { IFormattedWeatherData } from '../../../../types/IFormattedWeatherData.ts';
import { TemperatureUnits } from '../../../../types/TemperatureUnits.ts';

export interface ILeftSideProps {
	searchHistory: string[];
	handleHistoryCityClick: (city: string) => void;
	locationSearch: () => void;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	city: string;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	fetchWeatherData: (
		cityOrLocation: string | Coord,
		newUnitsType?: TemperatureUnits,
	) => void;
	unitsType: TemperatureUnits;
	handleTemperatureUnitChange: (unitType: TemperatureUnits) => void;
	isLoading: boolean;
	cityNotFound: boolean;
	weatherData: IFormattedWeatherData | null;
}
