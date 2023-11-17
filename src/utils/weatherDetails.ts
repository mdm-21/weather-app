import feels_icon from '../assets/images/feels_like.png';
import { formatTemperature } from './weatherUtils.ts';
import minTemp_icon from '../assets/images/cold.png';
import maxTemp_icon from '../assets/images/warm.png';
import humidity_icon from '../assets/images/humidity.png';
import pressure_icon from '../assets/images/pressure.png';
import wind_icon from '../assets/images/windy.png';
import sunrise_icon from '../assets/images/sunrise.png';
import sunset_icon from '../assets/images/sunset.png';
import { IWeatherInfo } from '../components/WeatherDetails/IWeatherInfo.ts';

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
}: IWeatherInfo) => {
  const formatLocalTime = (timestamp: number, timezoneOffset: number) => {
    const utcTime = new Date(timestamp * 1000);
    const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
    return localTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formattedSunrise = formatLocalTime(sunrise, timezone);
  const formattedSunset = formatLocalTime(sunset, timezone);

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
    { label: 'Sunrise', icon: sunrise_icon, value: formattedSunrise },
    { label: 'Sunset', icon: sunset_icon, value: formattedSunset },
    {
      label: 'Visibility',
      icon: feels_icon,
      value: `${visibility} m`,
    },
  ];
};
