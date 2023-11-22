import { IFormattedWeatherData } from '../../types/IFormattedWeatherData.ts';
import { TemperatureUnits } from '../../types/TemperatureUnits.ts';

export interface ICurrentWeatherProps {
	weatherData: IFormattedWeatherData | null;
	unitsType: TemperatureUnits;
	isLoading: boolean;
}
