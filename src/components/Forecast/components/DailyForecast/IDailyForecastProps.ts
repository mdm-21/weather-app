import {
	IFormattedForecastData,
	IFormattedForecastList,
} from '../../IFormattedForecastData.ts';
import { TemperatureUnits } from '../../../../types/TemperatureUnits.ts';

export interface IDailyForecastProps {
	forecastDailyData: IFormattedForecastData;
	unitsType: TemperatureUnits;
	activeItemIndex: number;
	handleShowMoreClick: (item: IFormattedForecastList, index: number) => void;
}
