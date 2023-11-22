import { TemperatureUnits } from '../../types/TemperatureUnits.ts';

export interface IWeatherDetailsProps {
	city?: {
		sunrise?: number;
		sunset?: number;
	};
	feels_like: number;
	temp_min: number;
	temp_max: number;
	sunrise: number;
	sunset: number;
	humidity: number;
	pressure: number;
	wind: number;
	visibility: number;
	timezone: number;
	unitsType: TemperatureUnits;
}
