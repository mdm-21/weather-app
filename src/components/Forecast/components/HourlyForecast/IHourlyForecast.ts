import { IFormattedForecastData } from '../../IFormattedForecastData.ts';
import { TemperatureUnits } from '../../../../types/TemperatureUnits.ts';

export interface IHourlyForecast {
	forecastData: IFormattedForecastData;
	unitsType: TemperatureUnits;
}
