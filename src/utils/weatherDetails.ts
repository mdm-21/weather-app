import { formatTemperature } from './weatherUtils.ts';
import { formatDateAndTime } from './formatDateAndTime.ts';

import { IWeatherDetailsProps } from '../components/WeatherDetails/IWeatherDetailsProps.ts';

import feels_icon from '../assets/images/feels_like.png';
import minTemp_icon from '../assets/images/cold.png';
import maxTemp_icon from '../assets/images/warm.png';
import humidity_icon from '../assets/images/humidity.png';
import pressure_icon from '../assets/images/pressure.png';
import wind_icon from '../assets/images/windy.png';
import sunrise_icon from '../assets/images/sunrise.png';
import sunset_icon from '../assets/images/sunset.png';

export const weatherDetails = ({
	feels_like,
	temp_min,
	temp_max,
	sunrise,
	sunset,
	humidity,
	pressure,
	wind,
	visibility,
	timezone,
	unitsType,
}: IWeatherDetailsProps) => {
	return [
		{
			label: 'Feels like',
			icon: feels_icon,
			value: formatTemperature(feels_like, unitsType),
		},
		{
			label: 'Min Temp',
			icon: minTemp_icon,
			value: formatTemperature(temp_min, unitsType),
		},
		{
			label: 'Max Temp',
			icon: maxTemp_icon,
			value: formatTemperature(temp_max, unitsType),
		},
		{
			label: 'Humidity',
			icon: humidity_icon,
			value: `${humidity}%`,
		},
		{
			label: 'Pressure',
			icon: pressure_icon,
			value: `${pressure}mb`,
		},
		{
			label: 'Wind',
			icon: wind_icon,
			value: `${wind} km/h`,
		},
		{
			label: 'Sunrise',
			icon: sunrise_icon,
			value: formatDateAndTime(sunrise, timezone).time,
		},
		{
			label: 'Sunset',
			icon: sunset_icon,
			value: formatDateAndTime(sunset, timezone).time,
		},
		{
			label: 'Visibility',
			icon: feels_icon,
			value: `${visibility} m`,
		},
	];
};
