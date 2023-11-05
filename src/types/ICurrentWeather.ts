import {WeatherData} from "./IWeather.ts";

export interface ICurrentWeather {
	weatherData: WeatherData | null;
	unitsType: string;
}