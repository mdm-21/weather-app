import feels_icon from '../assets/images/feels_like.png';
import { formatTemperature } from './weatherUtils.ts';
import minTemp_icon from '../assets/images/cold.png';
import maxTemp_icon from '../assets/images/warm.png';
import humidity_icon from '../assets/images/humidity.png';
import pressure_icon from '../assets/images/pressure.png';
import wind_icon from '../assets/images/windy.png';
import sunrise_icon from '../assets/images/sunrise.png';
import sunset_icon from '../assets/images/sunset.png';
import { WeatherData } from '../types/IWeather.ts';

export const weatherDetails = (
  weatherData: WeatherData | null,
  unitsType: string,
) => {
  const formatLocalTime = (timestamp: number, timezoneOffset: number) => {
    const utcTime = new Date(timestamp * 1000);
    const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
    return localTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sunrise = weatherData
    ? formatLocalTime(weatherData.sys.sunrise, weatherData.timezone)
    : '';
  const sunset = weatherData
    ? formatLocalTime(weatherData.sys.sunset, weatherData.timezone)
    : '';

  return weatherData
    ? [
        {
          label: 'Feels like',
          icon: feels_icon,
          value: formatTemperature(weatherData.main.feels_like, unitsType),
        },
        {
          label: 'Min Temp',
          icon: minTemp_icon,
          value: formatTemperature(weatherData.main.temp_min, unitsType),
        },
        {
          label: 'Max Temp',
          icon: maxTemp_icon,
          value: formatTemperature(weatherData.main.temp_max, unitsType),
        },
        {
          label: 'Humidity',
          icon: humidity_icon,
          value: `${weatherData.main.humidity}%`,
        },
        {
          label: 'Pressure',
          icon: pressure_icon,
          value: `${weatherData.main.pressure}mb`,
        },
        {
          label: 'Wind',
          icon: wind_icon,
          value: `${weatherData.wind.speed} km/h`,
        },
        { label: 'Sunrise', icon: sunrise_icon, value: `${sunrise}` },
        { label: 'Sunset', icon: sunset_icon, value: `${sunset}` },
        {
          label: 'Visibility',
          icon: feels_icon,
          value: `${weatherData.visibility} m`,
        },
      ]
    : [];
};
