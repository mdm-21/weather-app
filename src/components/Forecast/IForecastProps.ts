import { TemperatureUnits } from '../../types/TemperatureUnits.ts';

export interface IForecastProps {
	lat: number;
	lon: number;
	unitsType: TemperatureUnits;
}
