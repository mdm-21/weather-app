export interface IFormattedWeatherData {
  lat: number;
  lon: number;
  dt: number;
  name: string;
  country: string;
  speed: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  visibility: number;
  description: string;
  main: string;
}
