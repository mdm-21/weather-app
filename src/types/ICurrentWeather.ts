import { IFormattedWeatherData } from '../pages/HomePage/IFormattedWeatherData.ts';

export interface ICurrentWeather {
  weatherData: IFormattedWeatherData | null;
  unitsType: string;
}
