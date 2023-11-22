export interface IFormattedForecastData {
  lat: number;
  lon: number;
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  list: IFormattedForecastList[];
}

export interface IFormattedForecastList {
  dt: number;
  dt_txt: string;
  visibility: number;
  temp_min: number;
  temp_max: number;
  temp: number;
  humidity: number;
  pressure: number;
  feels_like: number;
  speed: number;
  description: string;
  main: string;
}
