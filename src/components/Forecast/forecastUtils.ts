import { ForecastData } from './IForecastData.ts';
import {
	IFormattedForecastData,
	IFormattedForecastList,
} from './IFormattedForecastData.ts';

export const handleFormattedForecast = (
	data: ForecastData,
): IFormattedForecastData => {
	const {
		city: {
			coord: { lat, lon },
			sunset,
			timezone,
			name,
			country,
			sunrise,
		},
		list,
	} = data;

	const formattedList: IFormattedForecastList[] = list.map(forecastItem => {
		const {
			dt,
			dt_txt,
			visibility,
			main: { temp_min, temp_max, temp, humidity, pressure, feels_like },
			weather: [{ description, main }],
			wind: { speed },
		} = forecastItem;

		return {
			dt,
			dt_txt,
			visibility,
			temp_min,
			temp_max,
			temp,
			humidity,
			pressure,
			feels_like,
			speed,
			description,
			main,
		};
	});

	return {
		lat,
		lon,
		name,
		country,
		sunrise,
		sunset,
		timezone,
		list: formattedList,
	};
};
