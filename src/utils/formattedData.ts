import { WeatherData } from '../types/IWeather.ts';

export const formattedData = (data: WeatherData) => {
	const {
		coord: { lat, lon },
		main: { temp, temp_max, temp_min, humidity, pressure, feels_like },
		name,
		dt,
		sys: { country, sunrise, sunset },
		timezone,
		visibility,
		weather,
		wind: { speed },
	} = data;

	const { description, main } = weather[0];

	return {
		lat,
		lon,
		dt,
		name,
		country,
		speed,
		temp,
		feels_like,
		temp_min,
		temp_max,
		humidity,
		pressure,
		sunrise,
		sunset,
		timezone,
		visibility,
		description,
		main,
	};
};
