interface Coord {
  lat: number;
  lon: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '3h': number;
}

interface Sys {
  pod: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastList[];
  city: {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastList {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain | null;
  sys: Sys;
  dt_txt: string;
}

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
